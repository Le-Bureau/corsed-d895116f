import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface DeleteArgs {
  id: string;
  slug?: string;
}

export const useDeleteBlogPost = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, DeleteArgs>({
    mutationFn: async ({ id }) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_v, { id, slug }) => {
      qc.invalidateQueries({ queryKey: ["blog", "posts"] });
      qc.removeQueries({ queryKey: ["blog", "post", "id", id] });
      if (slug) qc.removeQueries({ queryKey: ["blog", "post", slug] });
    },
  });
};
