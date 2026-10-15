import { CONTACT } from "@/lib/contact";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";

const SITE_URL = "https://corse-drone.com";

/**
 * The business and the website, emitted on every page from the root route so
 * that the `@id` references made by services, articles and local pages resolve
 * on the page itself. Keep these facts identical to the Google Business Profile.
 */
export const SITE_ENTITY_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": LOCAL_BUSINESS_ID,
      name: CONTACT.name,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/apple-touch-icon.png`,
      image: `${SITE_URL}/og-default.jpg`,
      description:
        "Opérateur drone professionnel en Corse : nettoyage de toitures, façades et panneaux solaires, thermographie, inspection, photogrammétrie, transport et agriculture.",
      telephone: CONTACT.phoneLink.replace("tel:", ""),
      email: CONTACT.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.streetAddress,
        postalCode: CONTACT.postalCode,
        addressLocality: CONTACT.city,
        addressRegion: "Corse",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: CONTACT.geo.latitude,
        longitude: CONTACT.geo.longitude,
      },
      ...(CONTACT.googleBusinessUrl
        ? { hasMap: CONTACT.googleBusinessUrl }
        : {}),
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: CONTACT.opens,
          closes: CONTACT.closes,
        },
      ],
      priceRange: "€€",
      areaServed: [
        { "@type": "AdministrativeArea", name: "Haute-Corse" },
        { "@type": "AdministrativeArea", name: "Corse-du-Sud" },
        { "@type": "City", name: "Bastia" },
        { "@type": "City", name: "Ajaccio" },
        { "@type": "City", name: "Porto-Vecchio" },
        { "@type": "City", name: "Calvi" },
        { "@type": "City", name: "Corte" },
        { "@type": "City", name: "Propriano" },
      ],
      sameAs: [
        "https://www.instagram.com/corsedrone/",
        ...(CONTACT.googleBusinessUrl ? [CONTACT.googleBusinessUrl] : []),
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: CONTACT.name,
      inLanguage: "fr-FR",
      publisher: { "@id": LOCAL_BUSINESS_ID },
    },
  ],
} as const;
