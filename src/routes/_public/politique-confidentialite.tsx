import { createFileRoute } from "@tanstack/react-router";
import PolitiqueConfidentialite from "@/pages/PolitiqueConfidentialite";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/_public/politique-confidentialite")({
  head: () =>
    seoHead({
      title: "Politique de confidentialité",
      description:
        "Politique de confidentialité de Corse Drone : données collectées, finalités, durée de conservation, vos droits RGPD et comment les exercer.",
      canonicalPath: "/politique-confidentialite",
    }),
  component: PolitiqueConfidentialite,
});
