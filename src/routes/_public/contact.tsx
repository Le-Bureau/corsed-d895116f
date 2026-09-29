import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/_public/contact")({
  head: () =>
    seoHead({
      title: "Contact et devis drone en Corse",
      description:
        "Contactez Corse Drone pour un devis de prestation drone en Corse. Réponse sous 24h ouvrées. Nettoyage, diagnostic, agriculture, transport.",
      canonicalPath: "/contact",
    }),
  component: Contact,
});
