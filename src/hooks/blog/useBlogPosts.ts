import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapPost, type PostRow } from "./mappers";
import type { BlogPost } from "@/types/blog";

const fetchAllPublishedPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`*, author:blog_authors(*), category:blog_categories(*)`)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw error;
  return ((data ?? []) as unknown as PostRow[]).map(mapPost);
};

export const useAllBlogPosts = () =>
  useQuery<BlogPost[]>({
    queryKey: ["blog", "posts", "published"],
    staleTime: 5 * 60 * 1000,
    queryFn: fetchAllPublishedPosts,
  });

interface Options {
  categorySlug?: string;
}

export const useBlogPosts = ({ categorySlug }: Options = {}) => {
  const query = useAllBlogPosts();
  const filtered = useMemo(() => {
    if (!query.data) return query.data;
    if (!categorySlug) return query.data;
    return query.data.filter((p) => p.category?.slug === categorySlug);
  }, [query.data, categorySlug]);

  return { ...query, data: filtered };
};
