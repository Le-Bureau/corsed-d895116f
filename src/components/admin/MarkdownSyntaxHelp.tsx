import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BookOpen, Check, Copy } from "lucide-react";
import BlogContent from "@/components/blog/BlogContent";
import { useToast } from "@/hooks/use-toast";
import {
  CALLOUT_SNIPPET,
  FIGURE_SNIPPET,
  FIGURE_WIDE_SNIPPET,
  IMAGE_GRID_SNIPPET,
} from "@/lib/admin/markdownSnippets";

const PLACEHOLDER_IMG_1 =
  "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=900&q=80";
const PLACEHOLDER_IMG_2 =
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&q=80";

const FIGURE_DEMO = FIGURE_SNIPPET.replace("https://", PLACEHOLDER_IMG_1).replace(
  "Description de l'image",
  "Toiture inspectée par drone à Bastia",
);
const FIGURE_WIDE_DEMO = FIGURE_WIDE_SNIPPET.replace(
  "https://",
  PLACEHOLDER_IMG_1,
).replace("Description de l'image", "Vue d'ensemble du chantier");
const IMAGE_GRID_DEMO = IMAGE_GRID_SNIPPET.replace(
  /https:\/\/(?=")/g,
  "",
)
  .replace('src=""', `src="${PLACEHOLDER_IMG_1}"`)
  .replace('src=""', `src="${PLACEHOLDER_IMG_2}"`)
  .replace("Image 1", "Avant")
  .replace("Image 2", "Après");

const CALLOUT_DEMO = CALLOUT_SNIPPET.replace(
  "Texte du callout.",
  "Cette mission a nécessité une autorisation préfectorale spécifique.",
);

interface SourceProps {
  code: string;
  language?: string;
}

const SourceBlock = ({ code }: SourceProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast({ description: "Copié dans le presse-papier" });
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast({ description: "Impossible de copier", variant: "destructive" });
    }
  };

  return (
    <div className="relative">
      <pre className="text-[12px] bg-muted/60 rounded-md p-3 pr-10 overflow-x-auto font-mono leading-relaxed border border-border/60 whitespace-pre-wrap break-words">
{code}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copier"
        className="absolute top-2 right-2 inline-flex items-center justify-center h-7 w-7 rounded-md bg-background/80 hover:bg-background border border-border/60 text-muted-foreground hover:text-foreground transition-colors"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
};

interface RowProps {
  source: string;
  children: React.ReactNode;
}

/** Two-column row: left = source code, right = rendu. */
const Row = ({ source, children }: RowProps) => (
  <div className="grid md:grid-cols-2 gap-3 items-start">
    <SourceBlock code={source} />
    <div className="rounded-md border border-border/60 bg-[#FCFAF7] p-4 overflow-hidden">
      <div className="blog-scope syntax-help-preview">{children}</div>
    </div>
  </div>
);

interface SectionProps {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const Section = ({ id, title, description, children }: SectionProps) => (
  <section id={id} className="scroll-mt-40 space-y-3">
    <div>
      <h2
        className="text-foreground"
        style={{ fontFamily: "Fraunces, Georgia, serif", fontSize: 22, fontWeight: 600 }}
      >
        {title}
      </h2>
      {description && (
        <p className="text-sm text-muted-foreground font-body mt-1">{description}</p>
      )}
    </div>
    {children}
  </section>
);

const TOC: Array<{ id: string; label: string }> = [
  { id: "titres", label: "Titres" },
  { id: "mise-en-forme", label: "Mise en forme" },
  { id: "liens", label: "Liens" },
  { id: "listes", label: "Listes" },
  { id: "citations", label: "Citations" },
  { id: "images", label: "Images" },
  { id: "callouts", label: "Callouts" },
  { id: "code", label: "Blocs de code" },
  { id: "astuces", label: "Astuces" },
];

const MarkdownSyntaxHelp = () => {
  return (
    <Sheet>
      <SheetTrigger className="text-xs text-primary hover:underline inline-flex items-center gap-1 font-body">
        <BookOpen className="h-3.5 w-3.5" />
        Guide d'écriture
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl lg:max-w-3xl overflow-y-auto p-0"
      >
        <div className="px-6 pt-6 pb-3 border-b border-border/60 sticky top-0 bg-background z-10">
          <SheetHeader>
            <SheetTitle className="font-display text-2xl">Guide d'écriture</SheetTitle>
            <SheetDescription className="font-body">
              Tout ce qu'il faut pour écrire un article propre. Cliquez sur l'icône{" "}
              <Copy className="inline h-3 w-3 align-text-top" /> pour copier un exemple.
            </SheetDescription>
          </SheetHeader>
          <nav className="flex flex-wrap gap-x-3 gap-y-1 mt-4 text-xs font-body">
            {TOC.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="text-muted-foreground hover:text-foreground hover:underline"
              >
                {t.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="px-6 py-6 space-y-12 font-body">
          {/* 1. TITRES */}
          <Section
            id="titres"
            title="Titres"
            description="Utilisez ## pour les sections principales, ### pour les sous-sections. Le titre de l'article (H1) est géré automatiquement."
          >
            <Row source={`## Titre de niveau 2\n\n### Titre de niveau 3`}>
              <BlogContent markdown={`## Titre de niveau 2\n\n### Titre de niveau 3`} />
            </Row>
          </Section>

          {/* 2. MISE EN FORME */}
          <Section
            id="mise-en-forme"
            title="Mise en forme"
            description="Le minimum vital pour structurer une phrase."
          >
            <div className="space-y-3">
              <Row source={`**texte en gras**`}>
                <BlogContent markdown={`**texte en gras**`} />
              </Row>
              <Row source={`*texte en italique*`}>
                <BlogContent markdown={`*texte en italique*`} />
              </Row>
              <Row source={`Phrase avec du \`code inline\` au milieu.`}>
                <BlogContent markdown={`Phrase avec du \`code inline\` au milieu.`} />
              </Row>
            </div>
          </Section>

          {/* 3. LIENS */}
          <Section
            id="liens"
            title="Liens"
            description="Pour un lien interne au site, vous pouvez omettre le domaine : [contact](/contact)."
          >
            <Row
              source={`[En savoir plus sur nos services](https://corse-drone.com)\n\n[Nous contacter](/contact)`}
            >
              <BlogContent
                markdown={`[En savoir plus sur nos services](https://corse-drone.com)\n\n[Nous contacter](/contact)`}
              />
            </Row>
          </Section>

          {/* 4. LISTES */}
          <Section id="listes" title="Listes">
            <div className="space-y-3">
              <Row
                source={`- Premier point\n- Deuxième point\n- Troisième point`}
              >
                <BlogContent
                  markdown={`- Premier point\n- Deuxième point\n- Troisième point`}
                />
              </Row>
              <Row
                source={`1. Préparation du chantier\n2. Vol et acquisition\n3. Livraison du rapport`}
              >
                <BlogContent
                  markdown={`1. Préparation du chantier\n2. Vol et acquisition\n3. Livraison du rapport`}
                />
              </Row>
            </div>
          </Section>

          {/* 5. CITATIONS */}
          <Section
            id="citations"
            title="Citations"
            description="Pour mettre en avant un témoignage ou une parole client."
          >
            <Row
              source={`> Le drone nous a fait gagner trois jours sur l'inspection.\n> — Jean Dupont, gestionnaire`}
            >
              <BlogContent
                markdown={`> Le drone nous a fait gagner trois jours sur l'inspection.\n> — Jean Dupont, gestionnaire`}
              />
            </Row>
          </Section>

          {/* 6. IMAGES */}
          <Section
            id="images"
            title="Images"
            description="Le plus simple : cliquez sur les boutons image dans la barre d'outils pour téléverser ou coller une URL. Si vous préférez taper à la main :"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-2">Image classique</h3>
                <Row source={FIGURE_SNIPPET}>
                  <BlogContent markdown={FIGURE_DEMO} />
                </Row>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Image pleine largeur</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Utilisez la classe <code className="bg-muted px-1 rounded">wide</code> pour faire
                  déborder l'image sur les côtés du texte. Idéal pour les vues d'ensemble.
                </p>
                <Row source={FIGURE_WIDE_SNIPPET}>
                  <BlogContent markdown={FIGURE_WIDE_DEMO} />
                </Row>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-2">Grille de 2 images</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Deux images côte à côte. Parfait pour les comparaisons (avant/après,
                  visible/thermique, etc.).
                </p>
                <Row source={IMAGE_GRID_SNIPPET}>
                  <BlogContent markdown={IMAGE_GRID_DEMO} />
                </Row>
              </div>
            </div>
          </Section>

          {/* 7. CALLOUTS */}
          <Section
            id="callouts"
            title="Callouts"
            description="Encadrés colorés pour mettre en valeur une info importante ou une note pratique."
          >
            <Row source={CALLOUT_SNIPPET}>
              <BlogContent markdown={CALLOUT_DEMO} />
            </Row>
          </Section>

          {/* 8. CODE */}
          <Section
            id="code"
            title="Blocs de code"
            description="Précisez le langage après les trois backticks pour la coloration syntaxique (si activée)."
          >
            <Row
              source={"```javascript\nconst altitude = 42;\nconsole.log(altitude);\n```"}
            >
              <BlogContent
                markdown={"```javascript\nconst altitude = 42;\nconsole.log(altitude);\n```"}
              />
            </Row>
          </Section>

          {/* 9. ASTUCES */}
          <Section id="astuces" title="Astuces">
            <ul className="list-disc pl-5 text-sm space-y-2 text-foreground/90">
              <li>Sautez une ligne entre chaque paragraphe.</li>
              <li>
                Les images doivent toujours avoir un texte alternatif (<code className="bg-muted px-1 rounded">alt</code>) pour
                l'accessibilité et le SEO.
              </li>
              <li>
                Pour les figures pleine largeur, choisissez des photos d'au moins{" "}
                <strong>1600px de large</strong>.
              </li>
              <li>
                Pas de cadre pour l'introduction : les premiers paragraphes posent le contexte,
                puis <code className="bg-muted px-1 rounded">## Méthodologie</code> pour le cœur de l'article.
              </li>
            </ul>
          </Section>
        </div>

        {/* Local style overrides so previews fit nicely in the sheet (no breadcrumb,
            no full-page paddings) */}
        <style>{`
          .syntax-help-preview .article-content { font-size: 15px; }
          .syntax-help-preview .article-content > *:first-child { margin-top: 0; }
          .syntax-help-preview .article-content > *:last-child { margin-bottom: 0; }
          .syntax-help-preview .article-content figure,
          .syntax-help-preview .article-content figure.wide,
          .syntax-help-preview .article-content .image-grid {
            margin-left: 0;
            margin-right: 0;
            width: 100%;
            max-width: 100%;
          }
          .syntax-help-preview .article-content figure img {
            max-height: 220px;
            object-fit: cover;
          }
        `}</style>
      </SheetContent>
    </Sheet>
  );
};

export default MarkdownSyntaxHelp;
