import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { seoHead } from "@/lib/seo-head";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/_public/")({
  head: () =>
    seoHead({
      title: "Corse Drone | Drone professionnel en Corse",
      description:
        "Nettoyage, diagnostic, agriculture, transport : 4 expertises drone pour les professionnels en Corse. Sans nacelle, sans échafaudage, sans immobilisation de site.",
      canonicalPath: "/",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": LOCAL_BUSINESS_ID,
        name: CONTACT.name,
        image: "https://corse-drone.com/og-default.jpg",
        url: "https://corse-drone.com",
        telephone: CONTACT.phoneLink.replace("tel:", ""),
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.streetAddress,
          addressLocality: CONTACT.city,
          postalCode: CONTACT.postalCode,
          addressRegion: "Corse",
          addressCountry: "FR",
        },
        areaServed: { "@type": "AdministrativeArea", name: "Corse" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: CONTACT.opens,
            closes: CONTACT.closes,
          },
        ],
        priceRange: "€€",
        sameAs: ["https://www.instagram.com/corsedrone/"],
      },
    }),
  component: Index,
});
