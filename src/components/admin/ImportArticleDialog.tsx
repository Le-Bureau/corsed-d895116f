import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  Copy,
  Download,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";

import { useBlogAuthors } from "@/hooks/blog/useBlogAuthors";
import { useBlogCategories } from "@/hooks/blog/useBlogCategories";
import { slugExists } from "@/hooks/admin/useSlugExists";
import {
  validateImport,
  ARTICLE_TEMPLATE_MD,
  downloadTemplate,
  type ValidationResult,
  type ValidationOk,
} from "@/lib/admin/importArticle";

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}

const PLACEHOLDER = `---
title: "Mon article"
slug: "mon-article"
excerpt: "Résumé court..."
category: "diagnostic"
author: "PF"
status: "draft"
---

## Contexte

Contenu markdown ici...
`;

const ImportArticleDialog = ({ open, onOpenChange }: Props) => {
  const navigate = useNavigate();
  const { data: categories } = useBlogCategories();
  const { data: authors } = useBlogAuthors();

  const [stage, setStage] = useState<"input" | "validation">("input");
  const [tab, setTab] = useState("paste");
  const [text, setText] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [showFormat, setShowFormat] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const reset = () => {
    setStage("input");
    setTab("paste");
    setText("");
    setResult(null);
    setShowFormat(false);
  };

  const handleClose = (o: boolean) => {
    if (!o) reset();
    onOpenChange(o);
  };

  const handleFile = async (file: File) => {
    if (!file.name.toLowerCase().match(/\.(md|markdown)$/)) {
      toast.error("Format non supporté. Choisis un fichier .md");
      return;
    }
    if (file.size > 200 * 1024) {
      toast.error("Fichier trop volumineux (200 KB max)");
      return;
    }
    const content = await file.text();
    setText(content);
    setTab("paste");
    toast.success(`Fichier '${file.name}' chargé`);
  };

  const handleAnalyze = async () => {
    if (!categories || !authors) return;
    setAnalyzing(true);
    try {
      const r = await validateImport(text, categories, authors, (slug) => slugExists(slug));
      setResult(r);
      setStage("validation");
    } catch (e) {
      toast.error("Erreur lors de l'analyse");
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleProceed = () => {
    if (!result?.ok || !result.data) return;
    onOpenChange(false);
    const payload = result.data;
    reset();
    navigate("/admin/blog/new", { state: { imported: payload } });
  };

  const copyTemplate = async () => {
    await navigator.clipboard.writeText(ARTICLE_TEMPLATE_MD);
    toast.success("Modèle copié");
  };

  const canAnalyze = text.trim().length > 0 && !!categories && !!authors;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        {stage === "input" && (
          <>
            <DialogHeader>
              <DialogTitle>Importer un article</DialogTitle>
              <DialogDescription>
                Collez ou téléversez un fichier .md avec en-tête YAML (frontmatter). Le contenu
                sera pré-rempli dans l'éditeur pour relecture avant publication.
              </DialogDescription>
            </DialogHeader>

            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="paste">Coller le texte</TabsTrigger>
                <TabsTrigger value="upload">Téléverser un fichier</TabsTrigger>
              </TabsList>

              <TabsContent value="paste" className="space-y-2">
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={PLACEHOLDER}
                  rows={12}
                  className="font-mono text-xs"
                />
              </TabsContent>

              <TabsContent value="upload">
                <div
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer.files?.[0];
                    if (f) handleFile(f);
                  }}
                  className="border-2 border-dashed border-border rounded-lg p-10 text-center cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">
                    Clique ou dépose un fichier .md ici
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Taille max : 200 KB
                  </p>
                  {text && (
                    <p className="text-xs text-primary mt-3">
                      ✓ Contenu chargé ({text.length} caractères)
                    </p>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".md,.markdown,text/markdown"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(f);
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Collapsible open={showFormat} onOpenChange={setShowFormat}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <FileText className="h-4 w-4" />
                  {showFormat ? "Masquer" : "Voir"} le format attendu
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2">
                <pre className="text-xs bg-muted/50 p-3 rounded-md overflow-x-auto font-mono">
                  {ARTICLE_TEMPLATE_MD}
                </pre>
                <div className="flex gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={copyTemplate}>
                    <Copy className="h-4 w-4" />
                    Copier le modèle
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={downloadTemplate}>
                    <Download className="h-4 w-4" />
                    Télécharger le modèle .md
                  </Button>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <DialogFooter>
              <Button variant="outline" onClick={() => handleClose(false)}>
                Annuler
              </Button>
              <Button onClick={handleAnalyze} disabled={!canAnalyze || analyzing}>
                {analyzing && <Loader2 className="h-4 w-4 animate-spin" />}
                Analyser
              </Button>
            </DialogFooter>
          </>
        )}

        {stage === "validation" && result && (
          <ValidationStage
            result={result}
            onBack={() => setStage("input")}
            onProceed={handleProceed}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

const ValidationStage = ({
  result,
  onBack,
  onProceed,
}: {
  result: ValidationResult;
  onBack: () => void;
  onProceed: () => void;
}) => {
  if (!result.ok) {
    return (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Article non valide
          </DialogTitle>
          <DialogDescription>
            Corrige les points ci-dessous puis recommence.
          </DialogDescription>
        </DialogHeader>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {result.errors?.map((e, i) => (
            <li key={i}>
              <span className="font-mono text-xs text-muted-foreground">{e.field}</span> —{" "}
              {e.message}
            </li>
          ))}
        </ul>
        <DialogFooter>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </DialogFooter>
      </>
    );
  }

  const d = result.data!;
  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-primary">
          <CheckCircle2 className="h-5 w-5" />
          Article valide, prêt à importer
        </DialogTitle>
      </DialogHeader>

      <dl className="grid grid-cols-[140px_1fr] gap-y-3 gap-x-4 text-sm">
        <dt className="text-muted-foreground">Titre</dt>
        <dd className="font-medium">{d.parsed.title}</dd>

        <dt className="text-muted-foreground">Slug</dt>
        <dd className="flex items-center gap-2">
          <span className="font-mono text-xs">{d.parsed.slug}</span>
          {d.slugAvailable ? (
            <Badge variant="outline" className="text-xs">
              ✓ disponible
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-xs">
              ⚠ déjà utilisé
            </Badge>
          )}
        </dd>

        <dt className="text-muted-foreground">Catégorie</dt>
        <dd>
          <Badge style={{ background: d.category.color, color: "white" }}>
            {d.category.name}
          </Badge>
        </dd>

        <dt className="text-muted-foreground">Auteur</dt>
        <dd className="flex items-center gap-2">
          <span
            className="h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-medium text-white"
            style={{
              background: `linear-gradient(135deg, ${d.author.gradientFrom}, ${d.author.gradientTo})`,
            }}
          >
            {d.author.initials}
          </span>
          {d.author.name}
        </dd>

        <dt className="text-muted-foreground">Statut</dt>
        <dd>{d.parsed.status === "published" ? "Publié" : "Brouillon"}</dd>

        <dt className="text-muted-foreground">À la une</dt>
        <dd>{d.parsed.featured_on_home ? "Oui" : "Non"}</dd>

        <dt className="text-muted-foreground">Cover</dt>
        <dd>
          {d.parsed.cover_image_url ? (
            <img
              src={d.parsed.cover_image_url}
              alt=""
              className="h-16 w-24 object-cover rounded border border-border"
            />
          ) : (
            <span className="text-muted-foreground text-xs">
              Non fournie — à ajouter dans l'éditeur
            </span>
          )}
        </dd>

        <dt className="text-muted-foreground">Contenu</dt>
        <dd>
          {d.wordCount} mots · ~{d.readingTime} min de lecture
        </dd>

        <dt className="text-muted-foreground">SEO</dt>
        <dd className="text-xs text-muted-foreground">
          {d.parsed.meta_title || d.parsed.meta_description ? "Override présent" : "Absent"}
        </dd>
      </dl>

      {!d.slugAvailable && (
        <div className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Le slug original est déjà utilisé. Un nouveau slug sera généré automatiquement à partir
          du titre dans l'éditeur — vérifie-le avant de publier.
        </div>
      )}

      {d.warnings.length > 0 && (
        <ul className="list-disc pl-5 space-y-1 text-xs text-amber-700">
          {d.warnings.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>
      )}

      <DialogFooter>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <Button onClick={onProceed}>Ouvrir dans l'éditeur</Button>
      </DialogFooter>
    </>
  );
};

export default ImportArticleDialog;
