import { useMemo } from "react";
import { useAllBlogPosts } from "./useBlogPosts";
import type { BlogPost } from "@/types/blog";

export interface HomeBlogSelection {
  featured: BlogPost | null;
  secondary: BlogPost[];
}

export const useHomeBlogSelection = () => {
  const query = useAllBlogPosts();
  const selection = useMemo<HomeBlogSelection>(() => {
    const posts = query.data ?? [];
    if (posts.length === 0) return { featured: null, secondary: [] };
    const featured = posts.find((p) => p.featuredOnHome) ?? posts[0];
    const secondary = posts.filter((p) => p.id !== featured.id).slice(0, 2);
    return { featured, secondary };
  }, [query.data]);

  return { ...query, data: selection };
};
