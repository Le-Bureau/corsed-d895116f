import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapPost, type PostRow } from "@/hooks/blog/mappers";
import type { BlogPost } from "@/types/blog";

export const ADMIN_POSTS_QUERY_KEY = ["blog", "posts", "admin"] as const;

export const useAdminBlogPosts = () =>
  useQuery<BlogPost[]>({
    queryKey: ADMIN_POSTS_QUERY_KEY,
    staleTime: 30 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`*, author:blog_authors(*), category:blog_categories(*)`)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return ((data ?? []) as unknown as PostRow[]).map(mapPost);
    },
  });
