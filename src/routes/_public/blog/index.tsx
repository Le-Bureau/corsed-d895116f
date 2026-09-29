import { createFileRoute } from "@tanstack/react-router";
import Blog from "@/pages/Blog";
import { blogIndexHead } from "@/lib/seo-head";
import { fetchAllPublishedPosts } from "@/hooks/blog/useBlogPosts";
import { fetchBlogCategories } from "@/hooks/blog/useBlogCategories";

export const Route = createFileRoute("/_public/blog/")({
  validateSearch: (search: Record<string, unknown>) => ({
    cat: typeof search["cat"] === "string" ? search["cat"] : undefined,
  }),
  loader: async ({ context }) => {
    const [posts, categories] = await Promise.all([
      context.queryClient.ensureQueryData({
        queryKey: ["blog", "posts", "published"],
        queryFn: fetchAllPublishedPosts,
        staleTime: 5 * 60 * 1000,
      }),
      context.queryClient.ensureQueryData({
        queryKey: ["blog", "categories"],
        queryFn: fetchBlogCategories,
        staleTime: Infinity,
      }),
    ]);
    return { posts, categories };
  },
  head: ({ loaderData, match }) => {
    const catSlug = match.search.cat;
    const category = catSlug
      ? loaderData?.categories.find((c) => c.slug === catSlug)
      : undefined;
    return blogIndexHead(category?.name);
  },
  component: Blog,
});
