import { createFileRoute } from "@tanstack/react-router";
import ZonesHub from "@/pages/ZonesHub";
import { seoHead } from "@/lib/seo-head";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";
import { ZONE_ORDER, LOCAL_AREAS } from "@/lib/localAreas";

const SITE_URL = "https://corse-drone.com";

export const Route = createFileRoute("/_public/zones-d-intervention")({
  head: () =>
    seoHead({
      title: "Zones d'intervention en Corse",
      description:
        "Corse Drone intervient dans toute la Corse depuis Ogliastro : Cap Corse, Bastia, Balagne, centre Corse, plaine orientale, Ajaccio, Valinco et Extrême-Sud.",
      canonicalPath: "/zones-d-intervention",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Zones d'intervention de Corse Drone",
          url: `${SITE_URL}/zones-d-intervention`,
          publisher: { "@id": LOCAL_BUSINESS_ID },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: ZONE_ORDER.map((k, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: LOCAL_AREAS[k].breadcrumb,
              url: `${SITE_URL}${LOCAL_AREAS[k].path}`,
            })),
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: `${SITE_URL}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Zones d'intervention",
              item: `${SITE_URL}/zones-d-intervention`,
            },
          ],
        },
      ],
    }),
  component: ZonesHub,
});
