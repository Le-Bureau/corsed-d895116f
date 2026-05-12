import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { mapPost, type PostRow } from "@/hooks/blog/mappers";
import type { BlogPost } from "@/types/blog";
import type { BlogPostFormValues } from "@/lib/admin/blogPostSchema";

const toRow = (v: BlogPostFormValues) => ({
  title: v.title,
  slug: v.slug,
  excerpt: v.excerpt,
  content_md: v.content_md,
  cover_image_url: v.cover_image_url ?? null,
  hero_image_url: v.hero_image_url ?? null,
  author_id: v.author_id,
  category_id: v.category_id,
  status: v.status,
  featured_on_home: v.featured_on_home,
  meta_title: v.meta_title?.trim() ? v.meta_title : null,
  meta_description: v.meta_description?.trim() ? v.meta_description : null,
});

export const useCreateBlogPost = () => {
  const qc = useQueryClient();
  return useMutation<BlogPost, Error, BlogPostFormValues>({
    mutationFn: async (values) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert(toRow(values))
        .select(`*, author:blog_authors(*), category:blog_categories(*)`)
        .single();
      if (error) throw error;
      return mapPost(data as unknown as PostRow);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog", "posts"] });
    },
  });
};
