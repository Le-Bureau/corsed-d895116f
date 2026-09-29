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
        name: "Corse Drone",
        image: "https://corse-drone.com/og-default.jpg",
        url: "https://corse-drone.com",
        telephone: CONTACT.phoneLink.replace("tel:", ""),
        address: {
          "@type": "PostalAddress",
          streetAddress: "Marine d'Albo, 44 Strada di a Torra",
          addressLocality: "Ogliastro",
          postalCode: "20217",
          addressRegion: "Corse",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 42.7028,
          longitude: 9.4503,
        },
        areaServed: { "@type": "AdministrativeArea", name: "Corse" },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "19:00",
          },
        ],
        priceRange: "€€",
        sameAs: ["https://www.instagram.com/corsedrone/"],
      },
    }),
  component: Index,
});
