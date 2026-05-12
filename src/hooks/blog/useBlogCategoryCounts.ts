import { useMemo } from "react";
import { useAllBlogPosts } from "./useBlogPosts";

export const useBlogCategoryCounts = () => {
  const query = useAllBlogPosts();
  const counts = useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    for (const p of query.data ?? []) {
      const slug = p.category?.slug;
      if (!slug) continue;
      map[slug] = (map[slug] ?? 0) + 1;
    }
    return map;
  }, [query.data]);

  return { ...query, data: counts, total: query.data?.length ?? 0 };
};
