import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";
import type { BlogPost } from "@/types/blog";

const SITE_URL = "https://corse-drone.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;
const SITE_NAME = "Corse Drone";

type JsonLd = Record<string, unknown>;

export interface SeoHeadOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string | undefined;
  ogType?: "website" | "article";
  noindex?: boolean;
  jsonLd?: JsonLd | JsonLd[];
  extraMeta?: Array<Record<string, string>>;
  extraLinks?: Array<Record<string, string>>;
}

export function seoHead({
  title,
  description,
  canonicalPath = "",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  jsonLd,
  extraMeta = [],
  extraLinks = [],
}: SeoHeadOptions) {
  const fullTitle = title.includes(SITE_NAME)
    ? title
    : `${title} | ${SITE_NAME}`;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const jsonLdList = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return {
    meta: [
      { title: fullTitle },
      { name: "title", content: fullTitle },
      { name: "description", content: description },
      { name: "robots", content: noindex ? "noindex,nofollow" : "index,follow" },
      { property: "og:type", content: ogType },
      { property: "og:url", content: canonical },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: canonical },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      ...extraMeta,
    ],
    links: [{ rel: "canonical", href: canonical }, ...extraLinks],
    scripts: jsonLdList.map((ld) => ({
      type: "application/ld+json",
      children: JSON.stringify(ld),
    })),
  };
}

// ---------- Blog index ----------

const BLOG_DEFAULT_DESC =
  "Retours de chantiers, expertises drone et actualités du secteur. Le journal de bord de Corse Drone, écrit depuis Bastia.";

const RSS_LINK = {
  rel: "alternate",
  type: "application/rss+xml",
  title: "Le journal de bord",
  href: `${SITE_URL}/rss.xml`,
};

export function blogIndexHead(activeCategoryName?: string | null) {
  const title = activeCategoryName
    ? `${activeCategoryName} | Blog | ${SITE_NAME}`
    : `Blog | ${SITE_NAME}`;
  const description = activeCategoryName
    ? `Articles dans la catégorie ${activeCategoryName}, ${SITE_NAME}.`
    : BLOG_DEFAULT_DESC;

  return seoHead({
    title,
    description,
    canonicalPath: "/blog",
    extraLinks: [RSS_LINK],
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Le journal de bord de Corse Drone",
      url: `${SITE_URL}/blog`,
      description: BLOG_DEFAULT_DESC,
      publisher: { "@id": LOCAL_BUSINESS_ID },
      inLanguage: "fr-FR",
    },
  });
}

// ---------- Blog post ----------

const resolveOgImage = (raw: string | null | undefined): string => {
  if (!raw) return DEFAULT_OG_IMAGE;
  if (raw.includes("images.unsplash.com")) {
    const sep = raw.includes("?") ? "&" : "?";
    return `${raw}${sep}w=1200&h=630&fit=crop&q=85`;
  }
  return raw;
};

const countWords = (md: string): number => {
  const stripped = md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`~\-]+/g, " ");
  return stripped.split(/\s+/).filter(Boolean).length;
};

export function blogPostHead(post: BlogPost) {
  const canonical = `${SITE_URL}/blog/${post.slug}`;
  const titleBase = post.metaTitle?.trim() || `${post.title} | ${SITE_NAME}`;
  const fullTitle = titleBase.includes(SITE_NAME)
    ? titleBase
    : `${titleBase} | ${SITE_NAME}`;
  const description = post.metaDescription?.trim() || post.excerpt;
  const ogImage = resolveOgImage(post.heroImageUrl ?? post.coverImageUrl);

  const author = post.author;
  const category = post.category;
  const publishedAt = post.publishedAt ?? undefined;
  const modifiedAt = post.updatedAt ?? publishedAt;

  const breadcrumbItems: Array<{ name: string; item: string }> = [
    { name: "Accueil", item: `${SITE_URL}/` },
    { name: "Blog", item: `${SITE_URL}/blog` },
  ];
  if (category) {
    breadcrumbItems.push({
      name: category.name,
      item: `${SITE_URL}/blog?cat=${category.slug}`,
    });
  }
  breadcrumbItems.push({ name: post.title, item: canonical });

  const blogPostingLd: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [ogImage],
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: author
      ? { "@type": "Person", name: author.name, jobTitle: author.role }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      "@id": LOCAL_BUSINESS_ID,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    articleSection: category?.name,
    wordCount: countWords(post.contentMd),
    inLanguage: "fr-FR",
  };

  const breadcrumbLd: JsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.item,
    })),
  };

  const extraMeta: Array<Record<string, string>> = [
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
  ];
  if (publishedAt)
    extraMeta.push({ property: "article:published_time", content: publishedAt });
  if (modifiedAt)
    extraMeta.push({ property: "article:modified_time", content: modifiedAt });
  if (author) extraMeta.push({ property: "article:author", content: author.name });
  if (category) {
    extraMeta.push({ property: "article:section", content: category.name });
    extraMeta.push({ property: "article:tag", content: category.name });
  }

  return seoHead({
    title: fullTitle,
    description,
    canonicalPath: `/blog/${post.slug}`,
    ogImage,
    ogType: "article",
    extraMeta,
    extraLinks: [RSS_LINK],
    jsonLd: [blogPostingLd, breadcrumbLd],
  });
}

export { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE };
