import { createFileRoute } from "@tanstack/react-router";
import Outils from "@/pages/Outils";
import { seoHead } from "@/lib/seo-head";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";

const SITE_URL = "https://corse-drone.com";

export const Route = createFileRoute("/_public/outils")({
  head: () =>
    seoHead({
      title: "Axio et Spectra, nos plateformes de rapport drone",
      description:
        "Axio et Spectra, les plateformes Corse Drone : rapports d'inspection visuelle en 3D et de thermographie solaire et bâtiment, anomalies localisées, accès sécurisé.",
      canonicalPath: "/outils",
      jsonLd: [
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Axio",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "Visualisation 3D en ligne des rapports d'inspection visuelle d'ouvrages et de bâtiments, anomalies placées sur la maquette avec photos haute résolution.",
          image: `${SITE_URL}/outils/axio-logo.svg`,
          url: `${SITE_URL}/outils`,
          publisher: { "@id": LOCAL_BUSINESS_ID },
        },
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Spectra",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description:
            "Plateforme de rapports de thermographie par drone, volet photovoltaïque et volet bâtiment, anomalies classées et localisées sur l'orthomosaïque.",
          image: `${SITE_URL}/outils/spectra-logo.svg`,
          url: `${SITE_URL}/outils`,
          publisher: { "@id": LOCAL_BUSINESS_ID },
        },
      ],
    }),
  component: Outils,
});
