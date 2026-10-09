import { createFileRoute } from "@tanstack/react-router";
import Realisations from "@/pages/Realisations";
import { seoHead } from "@/lib/seo-head";
import { REALISATIONS } from "@/lib/realisations";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";

const SITE_URL = "https://corse-drone.com";

export const Route = createFileRoute("/_public/realisations")({
  head: () =>
    seoHead({
      title: "Réalisations drone en Corse",
      description:
        "Nos missions drone en Corse, chiffres à l'appui : inspection de toitures pour la CAB à Bastia, fixation amiante à Canari avec Térélian (Vinci).",
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
            url: `${SITE_URL}/blog/${r.articleSlug}`,
          })),
        },
      },
    }),
  component: Realisations,
});
