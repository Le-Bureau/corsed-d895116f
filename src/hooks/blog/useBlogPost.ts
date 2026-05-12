import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapPost, type PostRow } from "./mappers";
import type { BlogPost } from "@/types/blog";

export const useBlogPost = (slug: string | undefined) =>
  useQuery<BlogPost | null>({
    queryKey: ["blog", "post", slug],
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`*, author:blog_authors(*), category:blog_categories(*)`)
        .eq("slug", slug!)
        .eq("status", "published")
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return mapPost(data as unknown as PostRow);
    },
  });
