import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapAuthor } from "./mappers";
import type { BlogAuthor } from "@/types/blog";

export const useBlogAuthors = () =>
  useQuery<BlogAuthor[]>({
    queryKey: ["blog", "authors"],
    staleTime: Infinity,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_authors")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map(mapAuthor);
    },
  });
