import { createFileRoute } from "@tanstack/react-router";
import Realisations from "@/pages/Realisations";
import { seoHead } from "@/lib/seo-head";
import { REALISATIONS } from "@/lib/realisations";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";
import { supabase } from "@/integrations/supabase/client";

const SITE_URL = "https://corse-drone.com";

export const Route = createFileRoute("/_public/realisations")({
  // Covers are read from the linked articles so that images optimised from
  // the admin ("Optimiser les images") are picked up without a redeploy.
  loader: async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("slug, cover_image_url")
      .in(
        "slug",
        REALISATIONS.flatMap((r) => (r.articleSlug ? [r.articleSlug] : [])),
      );
    const covers: Record<string, string> = {};
    for (const row of data ?? []) {
      if (row.cover_image_url) covers[row.slug] = row.cover_image_url;
    }
    return { covers };
  },
  head: () =>
    seoHead({
      title: "Réalisations drone en Corse",
      description:
        "Nos missions drone en Corse, chiffres à l'appui : toitures de la CAB à Bastia, centrale solaire Tenergie, fixation amiante à Canari avec Térélian (Vinci).",
      canonicalPath: "/realisations",
      ogImage: REALISATIONS[0]?.image,
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Réalisations Corse Drone",
        url: `${SITE_URL}/realisations`,
        publisher: { "@id": LOCAL_BUSINESS_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: REALISATIONS.map((r, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: r.title,
            url: r.articleSlug
              ? `${SITE_URL}/blog/${r.articleSlug}`
              : `${SITE_URL}/realisations`,
          })),
        },
      },
    }),
  component: Realisations,
});
