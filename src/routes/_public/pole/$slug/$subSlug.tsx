import { createFileRoute, notFound } from "@tanstack/react-router";
import SubPoleDetail from "@/pages/SubPoleDetail";
import { seoHead } from "@/lib/seo-head";
import { POLES } from "@/lib/poles";
import { SUB_POLE_CONTENT } from "@/lib/sub-poles";
import { SUB_POLE_META, LOCAL_BUSINESS_ID } from "@/lib/poleMeta";

export const Route = createFileRoute("/_public/pole/$slug/$subSlug")({
  loader: ({ params }) => {
    const pole = POLES.some((p) => p.key === params.slug);
    const content = SUB_POLE_CONTENT[params.slug]?.[params.subSlug];
    if (!pole || !content) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const pole = POLES.find((p) => p.key === params.slug);
    const content = SUB_POLE_CONTENT[params.slug]?.[params.subSlug];
    if (!pole || !content) {
      return seoHead({
        title: "Page introuvable",
        description: "Solutions professionnelles par drone en Corse.",
        canonicalPath: "/",
        noindex: true,
      });
    }
    return seoHead({
      title: content.seoTitle,
      description:
        SUB_POLE_META[params.subSlug] || (content.heroPitch || "").slice(0, 160),
      canonicalPath: `/pole/${params.slug}/${params.subSlug}`,
      ogImage: content.heroImage
        ? `https://corse-drone.com${content.heroImage}`
        : pole.showcaseImage
          ? `https://corse-drone.com${pole.showcaseImage}`
          : undefined,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: content.seoTitle,
          name: content.seoTitle,
          description: content.heroPitch,
          provider: { "@id": LOCAL_BUSINESS_ID },
          areaServed: { "@type": "AdministrativeArea", name: "Corse" },
          url: `https://corse-drone.com/pole/${params.slug}/${params.subSlug}`,
          isPartOf: {
            "@type": "Service",
            name: pole.label,
            url: `https://corse-drone.com/pole/${params.slug}`,
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
              item: "https://corse-drone.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: pole.label,
              item: `https://corse-drone.com/pole/${params.slug}`,
            },
            {
              "@type": "ListItem",
              position: 3,
              name: content.seoTitle,
              item: `https://corse-drone.com/pole/${params.slug}/${params.subSlug}`,
            },
          ],
        },
        ...(content.faq.length
          ? [
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: content.faq.map((f) => ({
                  "@type": "Question",
                  name: f.question,
                  acceptedAnswer: { "@type": "Answer", text: f.answer },
                })),
              },
            ]
          : []),
      ],
    });
  },
  component: SubPoleDetail,
});
