import { createFileRoute } from "@tanstack/react-router";
import Expertises from "@/pages/Expertises";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/_public/expertises")({
  head: () =>
    seoHead({
      title: "Nos expertises drone",
      description:
        "Toutes les expertises drone de Corse Drone : nettoyage, diagnostic, agriculture, transport et prestations sur devis en Corse.",
      canonicalPath: "/expertises",
    }),
  component: Expertises,
});
