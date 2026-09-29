import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapCategory } from "./mappers";
import type { BlogCategory } from "@/types/blog";

export const fetchBlogCategories = async (): Promise<BlogCategory[]> => {
  const { data, error } = await supabase
    .from("blog_categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapCategory);
};

export const useBlogCategories = () =>
  useQuery<BlogCategory[]>({
    queryKey: ["blog", "categories"],
    staleTime: Infinity,
    queryFn: fetchBlogCategories,
  });
