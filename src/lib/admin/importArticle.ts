import { parse as parseYaml } from "yaml";
import { getReadingTime } from "@/lib/blogHelpers";
import type { BlogAuthor, BlogCategory } from "@/types/blog";

export interface ParsedArticle {
  title: string;
  slug: string;
  excerpt: string;
  content_md: string;
  category_slug: string;
  author_initials: string;
  status: "draft" | "published";
  featured_on_home: boolean;
  cover_image_url: string | null;
  hero_image_url: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationOk {
  parsed: ParsedArticle;
  category: BlogCategory;
  author: BlogAuthor;
  slugAvailable: boolean;
  wordCount: number;
  readingTime: number;
  warnings: string[];
}

export interface ValidationResult {
  ok: boolean;
  data?: ValidationOk;
  errors?: ValidationError[];
}

export const ARTICLE_TEMPLATE_MD = `---
title: ""
slug: ""
excerpt: ""
category: "diagnostic"   # nettoyage | diagnostic | agriculture | transport | cas-clients | actualites-drone | actualites-boite
author: "PF"             # PF | LG | JC
status: "draft"          # draft | published
featured_on_home: false
cover_image_url: ""
hero_image_url: ""
meta_title: ""
meta_description: ""
---

## Contexte

Premier paragraphe ici.

## Méthodologie

...

## Résultats

...
`;

export const downloadTemplate = () => {
  const blob = new Blob([ARTICLE_TEMPLATE_MD], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "modele-article-corse-drone.md";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const REQUIRED_FIELDS: Array<keyof ParsedArticle | "category" | "author"> = [
  "title",
  "slug",
  "excerpt",
  "category",
  "author",
  "status",
];

const coerceBool = (v: unknown, field: string, errors: ValidationError[]): boolean => {
  if (typeof v === "boolean") return v;
  if (v === undefined || v === null || v === "") return false;
  if (typeof v === "string") {
    if (v.toLowerCase() === "true") return true;
    if (v.toLowerCase() === "false") return false;
  }
  errors.push({ field, message: `Champ '${field}' doit être true ou false.` });
  return false;
};

const isValidUrl = (s: string) => {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
};

export async function validateImport(
  source: string,
  categories: BlogCategory[],
  authors: BlogAuthor[],
  checkSlug: (slug: string) => Promise<boolean>,
): Promise<ValidationResult> {
  const errors: ValidationError[] = [];
  const warnings: string[] = [];

  const trimmed = source.trim();
  if (!trimmed.startsWith("---")) {
    return {
      ok: false,
      errors: [
        {
          field: "format",
          message:
            "Aucun frontmatter trouvé. Ajoutez un en-tête YAML entre deux lignes '---' au début du fichier.",
        },
      ],
    };
  }

  // Split frontmatter and body. Match opening --- (with optional BOM/whitespace) and the next --- on its own line.
  const fmMatch = source.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!fmMatch) {
    return {
      ok: false,
      errors: [
        {
          field: "format",
          message:
            "Frontmatter YAML invalide : impossible de trouver la délimitation '---' de fermeture.",
        },
      ],
    };
  }

  let fm: Record<string, unknown>;
  try {
    const parsedYaml = parseYaml(fmMatch[1]);
    fm = (parsedYaml ?? {}) as Record<string, unknown>;
    if (typeof fm !== "object" || Array.isArray(fm)) {
      throw new Error("le frontmatter doit être un objet clé/valeur");
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "erreur inconnue";
    return {
      ok: false,
      errors: [{ field: "format", message: `Frontmatter YAML invalide : ${msg}` }],
    };
  }

  const content = (fmMatch[2] ?? "").trim();

  if (content.length > 500_000) {
    warnings.push("Article volumineux, traitement plus long.");
  }

  for (const f of REQUIRED_FIELDS) {
    const v = fm[f as string];
    if (v === undefined || v === null || (typeof v === "string" && v.trim() === "")) {
      errors.push({ field: f as string, message: `Champ requis manquant : ${f}` });
    }
  }

  if (!content) {
    errors.push({ field: "content", message: "Contenu vide après le frontmatter." });
  }

  const status = fm.status as string | undefined;
  if (status && status !== "draft" && status !== "published") {
    errors.push({
      field: "status",
      message: `Statut invalide : '${status}'. Valeurs acceptées : draft, published.`,
    });
  }

  let category: BlogCategory | undefined;
  if (typeof fm.category === "string" && fm.category.trim()) {
    category = categories.find((c) => c.slug === fm.category);
    if (!category) {
      errors.push({
        field: "category",
        message: `Catégorie inconnue : '${fm.category}'. Catégories disponibles : ${categories
          .map((c) => c.slug)
          .join(", ")}.`,
      });
    }
  }

  let author: BlogAuthor | undefined;
  if (typeof fm.author === "string" && fm.author.trim()) {
    author = authors.find((a) => a.initials === fm.author);
    if (!author) {
      errors.push({
        field: "author",
        message: `Auteur inconnu : '${fm.author}'. Initiales disponibles : ${authors
          .map((a) => a.initials)
          .join(", ")}.`,
      });
    }
  }

  const featured_on_home =
    fm.featured_on_home === undefined
      ? false
      : coerceBool(fm.featured_on_home, "featured_on_home", errors);

  const coverRaw = typeof fm.cover_image_url === "string" ? fm.cover_image_url.trim() : "";
  const heroRaw = typeof fm.hero_image_url === "string" ? fm.hero_image_url.trim() : "";
  if (coverRaw && !isValidUrl(coverRaw)) {
    warnings.push("URL de cover_image_url invalide, à corriger dans l'éditeur.");
  }
  if (heroRaw && !isValidUrl(heroRaw)) {
    warnings.push("URL de hero_image_url invalide, à corriger dans l'éditeur.");
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const parsedArticle: ParsedArticle = {
    title: String(fm.title).trim(),
    slug: String(fm.slug).trim(),
    excerpt: String(fm.excerpt).trim(),
    content_md: content,
    category_slug: String(fm.category),
    author_initials: String(fm.author),
    status: status as "draft" | "published",
    featured_on_home,
    cover_image_url: coverRaw && isValidUrl(coverRaw) ? coverRaw : null,
    hero_image_url: heroRaw && isValidUrl(heroRaw) ? heroRaw : null,
    meta_title:
      typeof fm.meta_title === "string" && fm.meta_title.trim() ? fm.meta_title.trim() : null,
    meta_description:
      typeof fm.meta_description === "string" && fm.meta_description.trim()
        ? fm.meta_description.trim()
        : null,
  };

  let slugTaken = false;
  try {
    slugTaken = await checkSlug(parsedArticle.slug);
  } catch {
    // fail open
  }

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = getReadingTime(content);

  return {
    ok: true,
    data: {
      parsed: parsedArticle,
      category: category!,
      author: author!,
      slugAvailable: !slugTaken,
      wordCount,
      readingTime,
      warnings,
    },
  };
}
