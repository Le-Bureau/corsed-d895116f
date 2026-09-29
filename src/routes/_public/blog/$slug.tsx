import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import { blogPostHead } from "@/lib/seo-head";
import { fetchBlogPost } from "@/hooks/blog/useBlogPost";

export const Route = createFileRoute("/_public/blog/$slug")({
  loader: async ({ params, context }) => {
    const post = await context.queryClient.ensureQueryData({
      queryKey: ["blog", "post", params.slug],
      queryFn: () => fetchBlogPost(params.slug),
      staleTime: 5 * 60 * 1000,
    });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) =>
    loaderData
      ? blogPostHead(loaderData)
      : {
          meta: [
            { title: "Article introuvable | Corse Drone" },
            { name: "robots", content: "noindex,nofollow" },
          ],
        },
  component: BlogPost,
});
