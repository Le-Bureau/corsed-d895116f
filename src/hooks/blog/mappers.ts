import type { BlogAuthor, BlogCategory, BlogPost } from "@/types/blog";

type AuthorRow = {
  id: string;
  name: string;
  role: string;
  initials: string;
  bio: string | null;
  avatar_url: string | null;
  gradient_from: string;
  gradient_to: string;
  sort_order: number;
};

type CategoryRow = {
  id: string;
  slug: string;
  name: string;
  color: string;
  description: string | null;
  sort_order: number;
};

type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content_md: string;
  cover_image_url: string | null;
  hero_image_url: string | null;
  status: "draft" | "published";
  featured_on_home: boolean;
  published_at: string | null;
  reading_time_minutes: number;
  meta_title: string | null;
  meta_description: string | null;
  author?: AuthorRow | null;
  category?: CategoryRow | null;
};

export const mapAuthor = (r: AuthorRow): BlogAuthor => ({
  id: r.id,
  name: r.name,
  role: r.role,
  initials: r.initials,
  bio: r.bio,
  avatarUrl: r.avatar_url,
  gradientFrom: r.gradient_from,
  gradientTo: r.gradient_to,
  sortOrder: r.sort_order,
});

export const mapCategory = (r: CategoryRow): BlogCategory => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  color: r.color,
  description: r.description,
  sortOrder: r.sort_order,
});

export const mapPost = (r: PostRow): BlogPost => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  excerpt: r.excerpt,
  contentMd: r.content_md,
  coverImageUrl: r.cover_image_url,
  heroImageUrl: r.hero_image_url,
  status: r.status,
  featuredOnHome: r.featured_on_home,
  publishedAt: r.published_at,
  readingTimeMinutes: r.reading_time_minutes,
  metaTitle: r.meta_title,
  metaDescription: r.meta_description,
  author: r.author ? mapAuthor(r.author) : null,
  category: r.category ? mapCategory(r.category) : null,
});

export type { AuthorRow, CategoryRow, PostRow };
