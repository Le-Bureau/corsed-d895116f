import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { mapAuthor } from "@/hooks/blog/mappers";
import type { BlogAuthor } from "@/types/blog";

export interface UpdateAuthorValues {
  name: string;
  initials: string;
  role: string;
  bio: string | null;
  avatar_url: string | null;
  gradient_from: string;
  gradient_to: string;
}

export const useUpdateCurrentAuthor = () => {
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation<BlogAuthor, Error, UpdateAuthorValues>({
    mutationFn: async (values) => {
      if (!user) throw new Error("Non authentifié");
      const { data, error } = await supabase
        .from("blog_authors")
        .update(values)
        .eq("user_id", user.id)
        .select("*")
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("Profil introuvable");
      return mapAuthor(data);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog", "author", "current"] });
      qc.invalidateQueries({ queryKey: ["blog", "authors"] });
      qc.invalidateQueries({ queryKey: ["blog", "posts"] });
      toast.success("Profil mis à jour");
    },
    onError: (e) => {
      toast.error(e.message || "Erreur lors de la mise à jour");
    },
  });
};
