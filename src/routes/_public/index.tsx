import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { seoHead } from "@/lib/seo-head";
import { fetchAllPublishedPosts } from "@/hooks/blog/useBlogPosts";

export const Route = createFileRoute("/_public/")({
  // Articles in the server HTML so crawlers find them from the home page.
  // Never block the home page on the blog: on failure the section loads
  // its articles in the browser, as before.
  loader: async ({ context }) => {
    try {
      await context.queryClient.ensureQueryData({
        queryKey: ["blog", "posts", "published"],
        queryFn: fetchAllPublishedPosts,
        staleTime: 5 * 60 * 1000,
      });
    } catch {
      // Drop the failed query so the browser fetches the articles itself.
      context.queryClient.removeQueries({ queryKey: ["blog", "posts", "published"] });
    }
  },
  head: () =>
    seoHead({
      title: "Corse Drone | Drone professionnel en Corse",
      description:
        "Nettoyage, diagnostic, agriculture, transport : 4 expertises drone pour les professionnels en Corse. Sans nacelle, sans échafaudage, sans immobilisation de site.",
      canonicalPath: "/",
    }),
  component: Index,
});
