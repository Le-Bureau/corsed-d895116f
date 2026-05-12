import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapCategory } from "./mappers";
import type { BlogCategory } from "@/types/blog";

export const useBlogCategories = () =>
  useQuery<BlogCategory[]>({
    queryKey: ["blog", "categories"],
    staleTime: Infinity,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []).map(mapCategory);
    },
  });
