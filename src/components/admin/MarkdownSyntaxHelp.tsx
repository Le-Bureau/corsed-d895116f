import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { HelpCircle } from "lucide-react";
import {
  CALLOUT_SNIPPET,
  FIGURE_SNIPPET,
  FIGURE_WIDE_SNIPPET,
  IMAGE_GRID_SNIPPET,
} from "@/lib/admin/markdownSnippets";

const Block = ({ title, description, code }: { title: string; description: string; code: string }) => (
  <div className="space-y-1.5">
    <h3 className="text-sm font-semibold text-foreground font-body">{title}</h3>
    <p className="text-xs text-muted-foreground font-body">{description}</p>
    <pre className="text-[11px] bg-muted rounded-md p-3 overflow-x-auto font-mono leading-relaxed border border-border/50">
{code}
    </pre>
  </div>
);

const MarkdownSyntaxHelp = () => {
  return (
    <Sheet>
      <SheetTrigger className="text-xs text-primary hover:underline inline-flex items-center gap-1 font-body">
        <HelpCircle className="h-3.5 w-3.5" />
        Légende de la syntaxe
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display">Syntaxe de l'éditeur</SheetTitle>
          <SheetDescription className="font-body">
            Markdown standard + quelques blocs HTML personnalisés pour les images et encadrés.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6 font-body">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Markdown standard</h3>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
              <li><code className="bg-muted px-1 rounded">## Titre</code> · <code className="bg-muted px-1 rounded">### Sous-titre</code></li>
              <li><code className="bg-muted px-1 rounded">**gras**</code> · <code className="bg-muted px-1 rounded">*italique*</code> · <code className="bg-muted px-1 rounded">`code`</code></li>
              <li><code className="bg-muted px-1 rounded">[texte](https://url)</code></li>
              <li><code className="bg-muted px-1 rounded">- élément</code> pour une liste</li>
              <li><code className="bg-muted px-1 rounded">&gt; citation</code></li>
            </ul>
          </div>

          <Block
            title="Image avec légende"
            description="Image dans la largeur du texte avec une légende sous l'image."
            code={FIGURE_SNIPPET}
          />
          <Block
            title="Image pleine largeur"
            description="Déborde sur les marges pour un effet plus impactant. À réserver aux belles photos."
            code={FIGURE_WIDE_SNIPPET}
          />
          <Block
            title="Grille de 2 images"
            description="Affiche deux images côte à côte (par exemple : avant / après, visible / thermique)."
            code={IMAGE_GRID_SNIPPET}
          />
          <Block
            title="Encadré (callout)"
            description="Mise en avant d'une note ou d'un conseil au sein du texte."
            code={CALLOUT_SNIPPET}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MarkdownSyntaxHelp;
