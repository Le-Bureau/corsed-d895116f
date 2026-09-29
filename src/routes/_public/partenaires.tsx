import { createFileRoute } from "@tanstack/react-router";
import Partenaires from "@/pages/Partenaires";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/_public/partenaires")({
  head: () =>
    seoHead({
      title: "Devenir partenaire de Corse Drone",
      description:
        "Rejoignez le réseau de partenaires Corse Drone. Programme dédié aux professionnels du BTP, de l'industrie et de l'agriculture corses.",
      canonicalPath: "/partenaires",
    }),
  component: Partenaires,
});
