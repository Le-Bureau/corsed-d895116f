import { useEffect, useState } from "react";
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

interface SlotState {
  url: string | null;
  alt: string;
  caption: string;
}

const emptySlot = (): SlotState => ({ url: null, alt: "", caption: "" });

const figureBlock = (slot: SlotState) => {
  const safeAlt = slot.alt.replace(/"/g, "&quot;");
  const captionLine = slot.caption.trim()
    ? `\n    <figcaption>${slot.caption.trim()}</figcaption>`
    : "";
  return `  <figure>\n    <img src="${slot.url}" alt="${safeAlt}" />${captionLine}\n  </figure>`;
};

const InsertImageGridDialog = ({ open, onOpenChange, onInsert, postId }: Props) => {
  const [slot1, setSlot1] = useState<SlotState>(emptySlot());
  const [slot2, setSlot2] = useState<SlotState>(emptySlot());

  useEffect(() => {
    if (!open) {
      setSlot1(emptySlot());
      setSlot2(emptySlot());
    }
  }, [open]);

  const canInsert =
    !!slot1.url && slot1.alt.trim().length > 0 && !!slot2.url && slot2.alt.trim().length > 0;

  const handleInsert = () => {
    if (!canInsert) return;
    const snippet = `<div class="image-grid">\n${figureBlock(slot1)}\n${figureBlock(slot2)}\n</div>`;
    onInsert(snippet);
    onOpenChange(false);
  };

  const renderSlot = (
    label: string,
    slot: SlotState,
    setSlot: (next: SlotState) => void,
    idx: number,
  ) => (
    <div className="space-y-2 rounded-md border border-border/60 p-3 bg-muted/20">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <ImageUploader
        value={slot.url}
        onChange={(url) => setSlot({ ...slot, url })}
        folder="inline-images"
        postId={postId}
      />
      <div className="space-y-1">
        <Label htmlFor={`grid-alt-${idx}`}>
          Texte alternatif <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`grid-alt-${idx}`}
          value={slot.alt}
          onChange={(e) => setSlot({ ...slot, alt: e.target.value })}
          placeholder="Description"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor={`grid-cap-${idx}`}>Légende</Label>
        <Input
          id={`grid-cap-${idx}`}
          value={slot.caption}
          onChange={(e) => setSlot({ ...slot, caption: e.target.value })}
          placeholder="Légende facultative"
        />
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl font-body">
        <DialogHeader>
          <DialogTitle className="font-display">Insérer une grille d'images</DialogTitle>
          <DialogDescription>
            Deux images côte à côte (utile pour les comparaisons visible / thermique, avant /
            après, etc.)
          </DialogDescription>
        </DialogHeader>

        <div className="grid sm:grid-cols-2 gap-3">
          {renderSlot("Image 1", slot1, setSlot1, 1)}
          {renderSlot("Image 2", slot2, setSlot2, 2)}
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

export default InsertImageGridDialog;
