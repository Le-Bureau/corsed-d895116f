import { seoHead } from "@/lib/seo-head";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";
import type { LocalArea } from "@/lib/localAreas";

const SITE_URL = "https://corse-drone.com";

export function localAreaHead(area: LocalArea) {
  const url = `${SITE_URL}${area.path}`;
  return seoHead({
    title: area.metaTitle,
    description: area.metaDescription,
    canonicalPath: area.path,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `Services de drone professionnel : ${area.breadcrumb}`,
        serviceType: "Nettoyage, inspection et diagnostic par drone",
        provider: { "@id": LOCAL_BUSINESS_ID },
        url,
        areaServed: [
          ...area.areaServed.map((a) => ({ "@type": a.type, name: a.name })),
          ...area.areas.map((a) => ({ "@type": "Place", name: a.zone })),
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: area.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: area.breadcrumb, item: url },
        ],
      },
    ],
  });
}
