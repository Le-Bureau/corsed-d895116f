import { createFileRoute } from "@tanstack/react-router";
import DroneBastia from "@/pages/DroneBastia";
import { seoHead } from "@/lib/seo-head";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";
import { BASTIA_AREAS, BASTIA_FAQ } from "@/lib/localBastia";

const URL = "https://corse-drone.com/drone-bastia-haute-corse";

export const Route = createFileRoute("/_public/drone-bastia-haute-corse")({
  head: () =>
    seoHead({
      title: "Drone professionnel à Bastia et en Haute-Corse",
      description:
        "Nettoyage de toitures et façades, panneaux solaires, thermographie et inspection par drone à Bastia, dans le Cap Corse et toute la Haute-Corse. Devis rapide.",
      canonicalPath: "/drone-bastia-haute-corse",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Services de drone professionnel à Bastia et en Haute-Corse",
          serviceType: "Nettoyage, inspection et diagnostic par drone",
          provider: { "@id": LOCAL_BUSINESS_ID },
          url: URL,
          areaServed: [
            { "@type": "City", name: "Bastia" },
            { "@type": "AdministrativeArea", name: "Haute-Corse" },
            ...BASTIA_AREAS.map((a) => ({ "@type": "Place", name: a.zone })),
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: BASTIA_FAQ.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://corse-drone.com/" },
            { "@type": "ListItem", position: 2, name: "Bastia et Haute-Corse", item: URL },
          ],
        },
      ],
    }),
  component: DroneBastia,
});
