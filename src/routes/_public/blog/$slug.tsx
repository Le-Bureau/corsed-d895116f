import { createFileRoute, notFound } from "@tanstack/react-router";
import BlogPost from "@/pages/BlogPost";
import { blogPostHead } from "@/lib/seo-head";
import { fetchBlogPost } from "@/hooks/blog/useBlogPost";
import { fetchAllPublishedPosts } from "@/hooks/blog/useBlogPosts";

export const Route = createFileRoute("/_public/blog/$slug")({
  loader: async ({ params, context }) => {
    const [post] = await Promise.all([
      context.queryClient.ensureQueryData({
        queryKey: ["blog", "post", params.slug],
        queryFn: () => fetchBlogPost(params.slug),
        staleTime: 5 * 60 * 1000,
      }),
      // Related posts: same key as useAllBlogPosts, so the client doesn't refetch.
      context.queryClient.ensureQueryData({
        queryKey: ["blog", "posts", "published"],
        queryFn: fetchAllPublishedPosts,
        staleTime: 5 * 60 * 1000,
      }),
    ]);
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
