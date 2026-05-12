import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { mapAuthor } from "@/hooks/blog/mappers";
import type { BlogAuthor } from "@/types/blog";

export const useCurrentAuthor = () => {
  const { user } = useAuth();
  const userId = user?.id;

  return useQuery<BlogAuthor | null>({
    queryKey: ["blog", "author", "current", userId],
    enabled: !!userId,
    staleTime: 30_000,
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("blog_authors")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();
      if (error) throw error;
      return data ? mapAuthor(data) : null;
    },
  });
};
