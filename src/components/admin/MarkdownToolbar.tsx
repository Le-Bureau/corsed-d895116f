import { type RefObject } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Link as LinkIcon,
  List,
  Quote,
  Code,
  Image as ImageIconLucide,
  LayoutGrid,
  Maximize2,
  Info,
} from "lucide-react";
import { applySnippet, type SnippetKind } from "@/lib/admin/markdownSnippets";
import { cn } from "@/lib/utils";

interface Props {
  textareaRef: RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (next: string) => void;
}

interface ToolDef {
  kind: SnippetKind;
  label: string;
  Icon: typeof Bold;
}

const tools: ToolDef[] = [
  { kind: "bold", label: "Gras", Icon: Bold },
  { kind: "italic", label: "Italique", Icon: Italic },
  { kind: "h2", label: "Titre H2", Icon: Heading2 },
  { kind: "h3", label: "Titre H3", Icon: Heading3 },
  { kind: "link", label: "Lien", Icon: LinkIcon },
  { kind: "ul", label: "Liste", Icon: List },
  { kind: "quote", label: "Citation", Icon: Quote },
  { kind: "code", label: "Code", Icon: Code },
  { kind: "figure", label: "Image + légende", Icon: ImageIconLucide },
  { kind: "figureWide", label: "Image pleine largeur", Icon: Maximize2 },
  { kind: "imageGrid", label: "Grille d'images", Icon: LayoutGrid },
  { kind: "callout", label: "Encadré (callout)", Icon: Info },
];

const MarkdownToolbar = ({ textareaRef, value, onChange }: Props) => {
  const handle = (kind: SnippetKind) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const result = applySnippet(kind, value, start, end);
    onChange(result.next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border border-border/60 border-b-0 rounded-t-md bg-muted/40">
      {tools.map(({ kind, label, Icon }, idx) => (
        <>
          {(idx === 4 || idx === 8) && (
            <span key={`sep-${idx}`} className="w-px h-5 bg-border/60 mx-1" aria-hidden />
          )}
          <button
            key={kind}
            type="button"
            onClick={() => handle(kind)}
            title={label}
            aria-label={label}
            className={cn(
              "h-8 w-8 inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            )}
          >
            <Icon className="h-4 w-4" />
          </button>
        </>
      ))}
    </div>
  );
};

export default MarkdownToolbar;
