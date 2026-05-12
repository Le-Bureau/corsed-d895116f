import { useRef, useState } from "react";
import { ImageIcon, Loader2, RefreshCw, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImageUpload } from "@/hooks/admin/useImageUpload";
import { cn } from "@/lib/utils";

interface Props {
  value: string | null | undefined;
  onChange: (url: string | null) => void;
  folder: "covers" | "heroes" | "inline-images";
  postId?: string;
  helperText?: string;
}

const ImageUploader = ({ value, onChange, folder, postId, helperText }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const { upload, isUploading, error } = useImageUpload({ folder, postId });

  const handleFile = async (file: File) => {
    const url = await upload(file);
    if (url) onChange(url);
  };

  const onPick = () => inputRef.current?.click();

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void handleFile(f);
          e.target.value = "";
        }}
      />

      {value ? (
        <div className="relative group rounded-lg overflow-hidden border border-border/60 bg-muted">
          <img
            src={value}
            alt="Aperçu"
            className="w-full aspect-[16/10] object-cover"
            loading="lazy"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 p-2 flex gap-2 bg-gradient-to-t from-black/60 to-transparent">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={onPick}
              disabled={isUploading}
              className="font-body"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Remplacer
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => onChange(null)}
              disabled={isUploading}
              className="font-body"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Supprimer
            </Button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={onPick}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            const f = e.dataTransfer.files?.[0];
            if (f) void handleFile(f);
          }}
          className={cn(
            "w-full aspect-[16/10] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors font-body",
            dragActive
              ? "border-primary bg-primary/5"
              : "border-border/70 bg-muted/40 hover:border-primary/40 hover:bg-muted/60",
            isUploading && "pointer-events-none opacity-70",
          )}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-xs text-muted-foreground">Téléversement…</span>
            </>
          ) : (
            <>
              <span className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Upload className="h-4 w-4" />
              </span>
              <span className="text-sm text-foreground">Cliquer ou déposer une image</span>
              <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                <ImageIcon className="h-3 w-3" />
                JPG, PNG, WEBP — 5 Mo max
              </span>
            </>
          )}
        </button>
      )}

      {error && <p className="text-xs text-destructive font-body">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-muted-foreground font-body">{helperText}</p>
      )}
    </div>
  );
};

export default ImageUploader;
