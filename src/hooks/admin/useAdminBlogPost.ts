import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapPost, type PostRow } from "@/hooks/blog/mappers";
import type { BlogPost } from "@/types/blog";

export const useAdminBlogPost = (id: string | undefined) =>
  useQuery<BlogPost | null>({
    queryKey: ["blog", "post", "id", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`*, author:blog_authors(*), category:blog_categories(*)`)
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      return data ? mapPost(data as unknown as PostRow) : null;
    },
  });
