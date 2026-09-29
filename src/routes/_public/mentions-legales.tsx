import { createFileRoute } from "@tanstack/react-router";
import MentionsLegales from "@/pages/MentionsLegales";
import { seoHead } from "@/lib/seo-head";

export const Route = createFileRoute("/_public/mentions-legales")({
  head: () =>
    seoHead({
      title: "Mentions légales",
      description:
        "Mentions légales de Corse Drone : éditeur, hébergeur, protection des données personnelles, propriété intellectuelle.",
      canonicalPath: "/mentions-legales",
    }),
  component: MentionsLegales,
});
