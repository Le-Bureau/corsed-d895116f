import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().trim().min(1, "Titre requis").max(120, "Titre trop long (max 120)"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug requis")
    .max(120, "Slug trop long (max 120)")
    .regex(/^[a-z0-9-]+$/, "Slug : lettres minuscules, chiffres et tirets uniquement"),
  excerpt: z.string().trim().min(1, "Résumé requis").max(220, "Résumé trop long (max 220)"),
  content_md: z.string().min(1, "Contenu requis"),
  cover_image_url: z.string().url("URL invalide").nullable().optional(),
  hero_image_url: z.string().url("URL invalide").nullable().optional(),
  author_id: z.string().uuid("Auteur requis"),
  category_id: z.string().uuid("Catégorie requise"),
  status: z.enum(["draft", "published"]),
  featured_on_home: z.boolean(),
  meta_title: z.string().max(70, "Max 70 caractères").nullable().optional(),
  meta_description: z.string().max(160, "Max 160 caractères").nullable().optional(),
  published_at: z.string().datetime().nullable().optional(),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;
