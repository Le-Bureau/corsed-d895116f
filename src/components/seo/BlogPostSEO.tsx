import { Helmet } from "react-helmet-async";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";
import type { BlogPost } from "@/types/blog";

const SITE_URL = "https://corse-drone.com";
const SITE_NAME = "Corse Drone";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

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
  const tokens = stripped.split(/\s+/).filter(Boolean);
  return tokens.length;
};

interface Props {
  post: BlogPost;
}

const BlogPostSEO = ({ post }: Props) => {
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

  const blogPostingLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [ogImage],
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          jobTitle: author.role,
        }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      "@id": LOCAL_BUSINESS_ID,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    articleSection: category?.name,
    wordCount: countWords(post.contentMd),
    inLanguage: "fr-FR",
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.item,
    })),
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index,follow" />
      <html lang="fr" />

      <meta property="og:type" content="article" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {modifiedAt && (
        <meta property="article:modified_time" content={modifiedAt} />
      )}
      {author && <meta property="article:author" content={author.name} />}
      {category && (
        <meta property="article:section" content={category.name} />
      )}
      {category && <meta property="article:tag" content={category.name} />}

      <link
        rel="alternate"
        type="application/rss+xml"
        title="Corse Drone — Le journal de bord"
        href={`${SITE_URL}/rss.xml`}
      />

      <script type="application/ld+json">
        {JSON.stringify(blogPostingLd)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbLd)}
      </script>
    </Helmet>
  );
};

export default BlogPostSEO;
