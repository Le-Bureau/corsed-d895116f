import { createFileRoute, notFound } from "@tanstack/react-router";
import PoleDetail, { POLE_META } from "@/pages/PoleDetail";
import { seoHead } from "@/lib/seo-head";
import { POLES } from "@/lib/poles";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";

export const Route = createFileRoute("/_public/pole/$slug/")({
  loader: ({ params }) => {
    if (!POLES.some((p) => p.key === params.slug)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const pole = POLES.find((p) => p.key === params.slug);
    if (!pole) {
      return seoHead({
        title: "Page introuvable",
        description: "Solutions professionnelles par drone en Corse.",
        canonicalPath: "/",
        noindex: true,
      });
    }
    return seoHead({
      title: `${pole.label} par drone en Corse`,
      description:
        POLE_META[pole.key] ||
        (pole.heroPitch || pole.pitch || "").slice(0, 160),
      canonicalPath: `/pole/${pole.key}`,
      ogImage: pole.showcaseImage
        ? `https://corse-drone.com${pole.showcaseImage}`
        : undefined,
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: pole.label,
          name: `${pole.label} par drone, Corse Drone`,
          description: pole.heroPitch || pole.pitch,
          provider: { "@id": LOCAL_BUSINESS_ID },
          areaServed: { "@type": "AdministrativeArea", name: "Corse" },
          url: `https://corse-drone.com/pole/${pole.key}`,
        },
        ...(pole.poleFAQ?.length
          ? [
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: pole.poleFAQ.map((f) => ({
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
  component: PoleDetail,
});
