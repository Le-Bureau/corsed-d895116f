import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import {
  uploadBlogImage,
  type ImageFolder,
} from "@/hooks/admin/useImageUpload";
import type { BlogPost } from "@/types/blog";

// Images heavier than this are worth re-encoding.
const HEAVY_BYTES = 300 * 1024;
const BUCKET_MARKER = "/storage/v1/object/public/blog-covers/";
const MD_IMAGE = /!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g;

type Kind = "cover" | "hero" | "inline";

interface Candidate {
  key: string;
  post: BlogPost;
  kind: Kind;
  url: string;
  bytes: number | null;
  status: "pending" | "done" | "skipped" | "error";
  newBytes?: number | undefined;
}

const FOLDER: Record<Kind, ImageFolder> = {
  cover: "covers",
  hero: "heroes",
  inline: "inline-images",
};

const LABEL: Record<Kind, string> = {
  cover: "Couverture",
  hero: "Bannière",
  inline: "Image dans l'article",
};

const fmt = (b: number | null | undefined) =>
  b == null
    ? "?"
    : b >= 1024 * 1024
      ? `${(b / 1024 / 1024).toFixed(1)} Mo`
      : `${Math.round(b / 1024)} Ko`;

const collect = (posts: BlogPost[]) => {
  const out: Omit<Candidate, "bytes" | "status">[] = [];
  for (const post of posts) {
    const add = (kind: Kind, url: string | null | undefined) => {
      if (url && url.includes(BUCKET_MARKER)) {
        out.push({ key: `${post.id}:${kind}:${url}`, post, kind, url });
      }
    };
    add("cover", post.coverImageUrl);
    add("hero", post.heroImageUrl);
    for (const m of post.contentMd.matchAll(MD_IMAGE)) add("inline", m[1]);
  }
  // The same file can appear twice (cover reused as hero): measure it once.
  return out.filter((c, i) => out.findIndex((o) => o.key === c.key) === i);
};

const headSize = async (url: string) => {
  try {
    const r = await fetch(url, { method: "HEAD" });
    const len = r.headers.get("content-length");
    return len ? Number(len) : null;
  } catch {
    return null;
  }
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  posts: BlogPost[];
}

const OptimizeImagesDialog = ({ open, onOpenChange, posts }: Props) => {
  const qc = useQueryClient();
  const [items, setItems] = useState<Candidate[] | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setItems(null);
    void (async () => {
      const base = collect(posts);
      const sized = await Promise.all(
        base.map(async (c) => ({
          ...c,
          bytes: await headSize(c.url),
          status: "pending" as const,
        })),
      );
      if (!cancelled) {
        setItems(
          sized
            .filter((c) => (c.bytes ?? 0) > HEAVY_BYTES)
            .sort((a, b) => (b.bytes ?? 0) - (a.bytes ?? 0)),
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, posts]);

  const total = useMemo(
    () => items?.reduce((s, c) => s + (c.bytes ?? 0), 0) ?? 0,
    [items],
  );
  const saved = useMemo(
    () =>
      items?.reduce(
        (s, c) =>
          c.status === "done" ? s + (c.bytes ?? 0) - (c.newBytes ?? 0) : s,
        0,
      ) ?? 0,
    [items],
  );
  const pending = items?.filter((c) => c.status === "pending").length ?? 0;

  const patch = (key: string, p: Partial<Candidate>) =>
    setItems(
      (prev) => prev?.map((c) => (c.key === key ? { ...c, ...p } : c)) ?? prev,
    );

  const run = async () => {
    if (!items) return;
    setRunning(true);
    // Markdown edits must stack per post, so keep the latest content locally.
    const content = new Map<string, string>();
    let errors = 0;
    for (const c of items) {
      if (c.status !== "pending") continue;
      try {
        const blob = await (await fetch(c.url)).blob();
        const newUrl = await uploadBlogImage(blob, FOLDER[c.kind], c.post.id);
        const newBytes = await headSize(newUrl);
        if (newBytes != null && c.bytes != null && newBytes > c.bytes * 0.9) {
          // Not worth it: keep the original reference.
          patch(c.key, { status: "skipped", newBytes });
          continue;
        }
        let update: {
          cover_image_url?: string;
          hero_image_url?: string;
          content_md?: string;
        };
        if (c.kind === "cover") update = { cover_image_url: newUrl };
        else if (c.kind === "hero") update = { hero_image_url: newUrl };
        else {
          const md = (content.get(c.post.id) ?? c.post.contentMd)
            .split(c.url)
            .join(newUrl);
          content.set(c.post.id, md);
          update = { content_md: md };
        }
        // updated_at is left alone on purpose: this is not an editorial change.
        const { error } = await supabase
          .from("blog_posts")
          .update(update)
          .eq("id", c.post.id);
        if (error) throw error;
        patch(c.key, { status: "done", newBytes: newBytes ?? undefined });
      } catch (e) {
        errors += 1;
        console.error(e);
        patch(c.key, { status: "error" });
      }
    }
    setRunning(false);
    qc.invalidateQueries({ queryKey: ["blog"] });
    if (errors) toast.error(`${errors} image(s) n'ont pas pu être optimisées.`);
    else toast.success("Images optimisées");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !running && onOpenChange(o)}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Optimiser les images</DialogTitle>
          <DialogDescription>
            Les images de plus de {fmt(HEAVY_BYTES)} sont redimensionnées et
            converties en WebP, puis les articles pointent vers la nouvelle
            version. Les originaux restent dans le stockage.
          </DialogDescription>
        </DialogHeader>

        {!items ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <Loader2 className="h-4 w-4 animate-spin" /> Analyse des images…
          </p>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground font-body">
            Toutes les images sont déjà légères.
          </p>
        ) : (
          <div className="max-h-[50vh] overflow-y-auto rounded border border-border/60">
            <table className="w-full text-sm font-body">
              <tbody>
                {items.map((c) => (
                  <tr
                    key={c.key}
                    className="border-b border-border/40 last:border-0"
                  >
                    <td className="py-2 px-3">
                      <div className="truncate max-w-[22rem] font-medium">
                        {c.post.title}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {LABEL[c.kind]}
                      </div>
                    </td>
                    <td className="py-2 px-3 text-right whitespace-nowrap tabular-nums">
                      {fmt(c.bytes)}
                      {c.newBytes != null && <> → {fmt(c.newBytes)}</>}
                    </td>
                    <td className="py-2 px-3 text-right whitespace-nowrap text-xs">
                      {c.status === "done" && (
                        <span className="text-emerald-600">Optimisée</span>
                      )}
                      {c.status === "skipped" && (
                        <span className="text-muted-foreground">Inchangée</span>
                      )}
                      {c.status === "error" && (
                        <span className="text-destructive">Erreur</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <DialogFooter className="items-center gap-2 sm:justify-between">
          <span className="text-xs text-muted-foreground font-body">
            {items &&
              items.length > 0 &&
              (saved > 0 ? `${fmt(saved)} gagnés` : `${fmt(total)} au total`)}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={running}
            >
              Fermer
            </Button>
            <Button onClick={run} disabled={running || pending === 0}>
              {running && <Loader2 className="h-4 w-4 animate-spin" />}
              Optimiser {pending > 0 ? `(${pending})` : ""}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OptimizeImagesDialog;
