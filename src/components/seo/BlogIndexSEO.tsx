import { Helmet } from "react-helmet-async";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";
import type { BlogCategory } from "@/types/blog";

const SITE_URL = "https://corse-drone.com";
const SITE_NAME = "Corse Drone";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;
const DEFAULT_DESC =
  "Retours de chantiers, expertises drone et actualités du secteur. Le journal de bord de Corse Drone, écrit depuis Bastia.";

interface Props {
  activeCategory?: BlogCategory | null;
}

const BlogIndexSEO = ({ activeCategory }: Props) => {
  const canonical = `${SITE_URL}/blog`;
  const title = activeCategory
    ? `${activeCategory.name} | Blog | ${SITE_NAME}`
    : `Blog | ${SITE_NAME}`;
  const description = activeCategory
    ? `Articles dans la catégorie ${activeCategory.name} — ${SITE_NAME}.`
    : DEFAULT_DESC;

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Le journal de bord de Corse Drone",
    url: canonical,
    description: DEFAULT_DESC,
    publisher: { "@id": LOCAL_BUSINESS_ID },
    inLanguage: "fr-FR",
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta name="robots" content="index,follow" />
      <html lang="fr" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

      <link
        rel="alternate"
        type="application/rss+xml"
        title="Corse Drone — Le journal de bord"
        href={`${SITE_URL}/rss.xml`}
      />

      <script type="application/ld+json">{JSON.stringify(blogLd)}</script>
    </Helmet>
  );
};

export default BlogIndexSEO;
