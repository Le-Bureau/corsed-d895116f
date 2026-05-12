import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/admin/ImageUploader";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (snippet: string) => void;
  postId?: string;
}

const buildSnippet = (url: string, alt: string, caption: string, wide: boolean) => {
  const safeAlt = alt.replace(/"/g, "&quot;");
  const cls = wide ? ' class="wide"' : "";
  const captionLine = caption.trim() ? `\n  <figcaption>${caption.trim()}</figcaption>` : "";
  return `<figure${cls}>\n  <img src="${url}" alt="${safeAlt}" />${captionLine}\n</figure>`;
};

const InsertImageDialog = ({ open, onOpenChange, onInsert, postId }: Props) => {
  const [tab, setTab] = useState<"upload" | "url">("upload");
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [wide, setWide] = useState(false);

  const reset = () => {
    setTab("upload");
    setUploadedUrl(null);
    setUrlInput("");
    setAlt("");
    setCaption("");
    setWide(false);
  };

  useEffect(() => {
    if (!open) reset();
  }, [open]);

  const finalUrl = tab === "upload" ? uploadedUrl : urlInput.trim();
  const canInsert = !!finalUrl && alt.trim().length > 0;
  const isValidUrlPreview = /^https?:\/\/\S+/i.test(urlInput.trim());

  const handleInsert = () => {
    if (!finalUrl || !alt.trim()) return;
    onInsert(buildSnippet(finalUrl, alt.trim(), caption, wide));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg font-body">
        <DialogHeader>
          <DialogTitle className="font-display">Insérer une image</DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "upload" | "url")}>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="upload">Téléverser</TabsTrigger>
            <TabsTrigger value="url">URL</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="pt-3">
            <ImageUploader
              value={uploadedUrl}
              onChange={setUploadedUrl}
              folder="inline-images"
              postId={postId}
              helperText="L'image sera stockée dans ton espace de fichiers."
            />
          </TabsContent>
          <TabsContent value="url" className="pt-3 space-y-2">
            <Label htmlFor="image-url">Coller l'URL de l'image</Label>
            <Input
              id="image-url"
              type="url"
              placeholder="https://…"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            {isValidUrlPreview && (
              <div className="rounded-md border border-border/60 overflow-hidden bg-muted">
                <img
                  src={urlInput.trim()}
                  alt="Aperçu"
                  className="w-full max-h-48 object-contain"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="space-y-3 pt-2">
          <div className="space-y-1">
            <Label htmlFor="image-alt">
              Texte alternatif <span className="text-destructive">*</span>
            </Label>
            <Input
              id="image-alt"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Description de l'image"
            />
            <p className="text-xs text-muted-foreground">Pour l'accessibilité et le SEO</p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="image-caption">Légende</Label>
            <Input
              id="image-caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Légende facultative"
            />
            <p className="text-xs text-muted-foreground">S'affiche sous l'image</p>
          </div>

          <div className="flex items-start justify-between gap-3 pt-1">
            <div>
              <Label htmlFor="image-wide">Pleine largeur</Label>
              <p className="text-xs text-muted-foreground">
                L'image déborde sur les côtés du texte (mise en avant)
              </p>
            </div>
            <Switch id="image-wide" checked={wide} onCheckedChange={setWide} />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button type="button" onClick={handleInsert} disabled={!canInsert}>
            Insérer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InsertImageDialog;
