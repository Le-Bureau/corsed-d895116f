import { Fragment, useState, type RefObject } from "react";
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
  Info,
} from "lucide-react";
import { applySnippet, type SnippetKind } from "@/lib/admin/markdownSnippets";
import { cn } from "@/lib/utils";
import InsertImageDialog from "@/components/admin/InsertImageDialog";
import InsertImageGridDialog from "@/components/admin/InsertImageGridDialog";

type Action = SnippetKind | "image" | "imageGridDialog";

interface Props {
  textareaRef: RefObject<HTMLTextAreaElement>;
  value: string;
  onChange: (next: string) => void;
  postId?: string;
}

interface ToolDef {
  action: Action;
  label: string;
  Icon: typeof Bold;
}

const tools: ToolDef[] = [
  { action: "bold", label: "Gras", Icon: Bold },
  { action: "italic", label: "Italique", Icon: Italic },
  { action: "h2", label: "Titre H2", Icon: Heading2 },
  { action: "h3", label: "Titre H3", Icon: Heading3 },
  { action: "link", label: "Lien", Icon: LinkIcon },
  { action: "ul", label: "Liste", Icon: List },
  { action: "quote", label: "Citation", Icon: Quote },
  { action: "code", label: "Code", Icon: Code },
  { action: "image", label: "Image", Icon: ImageIconLucide },
  { action: "imageGridDialog", label: "Image en grille", Icon: LayoutGrid },
  { action: "callout", label: "Encadré (callout)", Icon: Info },
];

const MarkdownToolbar = ({ textareaRef, value, onChange, postId }: Props) => {
  const [imageOpen, setImageOpen] = useState(false);
  const [gridOpen, setGridOpen] = useState(false);

  const insertSnippetKind = (kind: SnippetKind) => {
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

  const insertRawBlock = (snippet: string) => {
    const ta = textareaRef.current;
    const start = ta?.selectionStart ?? value.length;
    const end = ta?.selectionEnd ?? value.length;
    const before = value.slice(0, start);
    const after = value.slice(end);
    const needsBeforeBlank = before.length > 0 && !before.endsWith("\n\n");
    const needsAfterBlank = after.length > 0 && !after.startsWith("\n\n");
    const prefix = needsBeforeBlank ? (before.endsWith("\n") ? "\n" : "\n\n") : "";
    const suffix = needsAfterBlank ? (after.startsWith("\n") ? "\n" : "\n\n") : "";
    const next = before + prefix + snippet + suffix + after;
    const cursor = before.length + prefix.length + snippet.length;
    onChange(next);
    requestAnimationFrame(() => {
      if (!ta) return;
      ta.focus();
      ta.setSelectionRange(cursor, cursor);
    });
  };

  const handle = (action: Action) => {
    if (action === "image") {
      setImageOpen(true);
      return;
    }
    if (action === "imageGridDialog") {
      setGridOpen(true);
      return;
    }
    insertSnippetKind(action);
  };

  return (
    <>
      <div className="flex flex-wrap items-center gap-1 px-2 py-1.5 border border-border/60 border-b-0 rounded-t-md bg-muted/40">
        {tools.map(({ action, label, Icon }, idx) => (
          <Fragment key={action}>
            {(idx === 4 || idx === 8) && (
              <span className="w-px h-5 bg-border/60 mx-1" aria-hidden />
            )}
            <button
              type="button"
              onClick={() => handle(action)}
              title={label}
              aria-label={label}
              className={cn(
                "h-8 w-8 inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          </Fragment>
        ))}
      </div>

      <InsertImageDialog
        open={imageOpen}
        onOpenChange={setImageOpen}
        onInsert={insertRawBlock}
        postId={postId}
      />
      <InsertImageGridDialog
        open={gridOpen}
        onOpenChange={setGridOpen}
        onInsert={insertRawBlock}
        postId={postId}
      />
    </>
  );
};

export default MarkdownToolbar;
