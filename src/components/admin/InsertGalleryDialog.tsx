import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/admin/ImageUploader";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsert: (snippet: string) => void;
  postId?: string;
}

interface Slot {
  key: string;
  url: string | null;
  alt: string;
  caption: string;
}

const newSlot = (): Slot => ({
  key: crypto.randomUUID(),
  url: null,
  alt: "",
  caption: "",
});

const figureBlock = (slot: Slot) => {
  const safeAlt = slot.alt.replace(/"/g, "&quot;");
  const captionLine = slot.caption.trim()
    ? `\n    <figcaption>${slot.caption.trim()}</figcaption>`
    : "";
  return `  <figure>\n    <img src="${slot.url}" alt="${safeAlt}" />${captionLine}\n  </figure>`;
};

const InsertGalleryDialog = ({ open, onOpenChange, onInsert, postId }: Props) => {
  const [slots, setSlots] = useState<Slot[]>([newSlot(), newSlot(), newSlot()]);

  useEffect(() => {
    if (!open) setSlots([newSlot(), newSlot(), newSlot()]);
  }, [open]);

  const update = (key: string, patch: Partial<Slot>) =>
    setSlots((prev) => prev.map((s) => (s.key === key ? { ...s, ...patch } : s)));

  const remove = (key: string) =>
    setSlots((prev) => (prev.length <= 1 ? prev : prev.filter((s) => s.key !== key)));

  const move = (idx: number, dir: -1 | 1) => {
    setSlots((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const add = () => setSlots((prev) => [...prev, newSlot()]);

  const filled = slots.filter((s) => s.url && s.alt.trim().length > 0);
  const canInsert = filled.length >= 3;

  const handleInsert = () => {
    if (!canInsert) return;
    const snippet = `<div class="image-gallery">\n${filled
      .map(figureBlock)
      .join("\n")}\n</div>`;
    onInsert(snippet);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto font-body">
        <DialogHeader>
          <DialogTitle className="font-display">Insérer une galerie d'images</DialogTitle>
          <DialogDescription>
            Ajoutez 3 images ou plus. Elles s'afficheront en grille dans l'article, avec un
            agrandissement au clic.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {slots.map((slot, idx) => (
            <div
              key={slot.key}
              className="rounded-md border border-border/60 p-3 bg-muted/20 grid sm:grid-cols-[1fr_1.2fr] gap-3"
            >
              <ImageUploader
                value={slot.url}
                onChange={(url) => update(slot.key, { url })}
                folder="gallery-images"
                postId={postId}
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Image {idx + 1}
                  </p>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => move(idx, -1)}
                      disabled={idx === 0}
                      aria-label="Monter"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => move(idx, 1)}
                      disabled={idx === slots.length - 1}
                      aria-label="Descendre"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    {slots.length > 1 && (
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 text-destructive hover:text-destructive"
                        onClick={() => remove(slot.key)}
                        aria-label="Supprimer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`gal-alt-${slot.key}`}>
                    Texte alternatif <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id={`gal-alt-${slot.key}`}
                    value={slot.alt}
                    onChange={(e) => update(slot.key, { alt: e.target.value })}
                    placeholder="Description de l'image"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor={`gal-cap-${slot.key}`}>Légende</Label>
                  <Input
                    id={`gal-cap-${slot.key}`}
                    value={slot.caption}
                    onChange={(e) => update(slot.key, { caption: e.target.value })}
                    placeholder="Légende facultative"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={add} className="w-full">
            <Plus className="h-4 w-4" />
            Ajouter une image
          </Button>

          <p className="text-xs text-muted-foreground">
            {filled.length} / 3 image{filled.length > 1 ? "s" : ""} prête
            {filled.length > 1 ? "s" : ""} — il faut au moins 3 images (avec URL + alt) pour
            insérer une galerie.
          </p>
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

export default InsertGalleryDialog;
