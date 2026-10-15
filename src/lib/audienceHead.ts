import { seoHead } from "@/lib/seo-head";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";
import type { AudiencePageData } from "@/lib/audiences";

const SITE_URL = "https://corse-drone.com";

export function audienceHead(page: AudiencePageData) {
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
        provider: { "@id": LOCAL_BUSINESS_ID },
        audience: { "@type": "Audience", audienceType: page.label },
        areaServed: { "@type": "AdministrativeArea", name: "Corse" },
        // Services already offered; the ones waiting for an authorisation are left out.
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: page.servicesTitle,
          itemListElement: page.services
            .filter((s) => !s.soon)
            .map((s) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: s.label,
                url: `${SITE_URL}${s.href}`,
              },
            })),
        },
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
          { "@type": "ListItem", position: 2, name: page.label, item: url },
        ],
      },
    ],
  });
}
