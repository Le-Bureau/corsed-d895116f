import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapPost, type PostRow } from "@/hooks/blog/mappers";
import type { BlogPost } from "@/types/blog";
import type { BlogPostFormValues } from "@/lib/admin/blogPostSchema";

interface UpdateArgs {
  id: string;
  values: BlogPostFormValues;
  previousSlug?: string;
}

export const useUpdateBlogPost = () => {
  const qc = useQueryClient();
  return useMutation<BlogPost, Error, UpdateArgs>({
    mutationFn: async ({ id, values }) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .update({
          title: values.title,
          slug: values.slug,
          excerpt: values.excerpt,
          content_md: values.content_md,
          cover_image_url: values.cover_image_url ?? null,
          hero_image_url: values.hero_image_url ?? null,
          author_id: values.author_id,
          category_id: values.category_id,
          status: values.status,
          featured_on_home: values.featured_on_home,
          meta_title: values.meta_title?.trim() ? values.meta_title : null,
          meta_description: values.meta_description?.trim() ? values.meta_description : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select(`*, author:blog_authors(*), category:blog_categories(*)`)
        .single();
      if (error) throw error;
      return mapPost(data as unknown as PostRow);
    },
    onSuccess: (post, { id, previousSlug }) => {
      qc.invalidateQueries({ queryKey: ["blog", "posts"] });
      qc.invalidateQueries({ queryKey: ["blog", "post", "id", id] });
      qc.invalidateQueries({ queryKey: ["blog", "post", post.slug] });
      if (previousSlug && previousSlug !== post.slug) {
        qc.invalidateQueries({ queryKey: ["blog", "post", previousSlug] });
      }
    },
  });
};
