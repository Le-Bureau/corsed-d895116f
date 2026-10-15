import { seoHead } from "@/lib/seo-head";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";
import type { LocalServicePageData } from "@/lib/localServicePages";

const SITE_URL = "https://corse-drone.com";

export function localServiceHead(page: LocalServicePageData) {
  const url = `${SITE_URL}${page.path}`;
  return seoHead({
    title: page.metaTitle,
    description: page.metaDescription,
    canonicalPath: page.path,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: page.h1,
        serviceType: page.serviceLabel,
        provider: { "@id": LOCAL_BUSINESS_ID },
        areaServed: { "@type": "City", name: page.city },
        url,
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
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
            name: page.zoneLabel,
            item: `${SITE_URL}${page.zonePath}`,
          },
          { "@type": "ListItem", position: 3, name: page.h1, item: url },
        ],
      },
    ],
  });
}
