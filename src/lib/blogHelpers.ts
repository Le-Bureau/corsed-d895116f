import type { BlogPost } from "@/data/mockBlogData";

export const getReadingTime = (markdown: string): number => {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

export const formatBlogDate = (iso: string): string => {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
};

export const getRelatedPosts = (
  current: BlogPost,
  all: BlogPost[],
  n = 3,
): BlogPost[] =>
  all
    .filter((p) => p.id !== current.id && p.categoryId === current.categoryId)
    .slice(0, n);

export const getLatestPosts = (allPosts: BlogPost[], n: number = 3): BlogPost[] =>
  [...allPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, n);

export interface HomeBlogSelection {
  featured: BlogPost;
  secondary: BlogPost[];
}

export function getHomeBlogSelection(allPosts: BlogPost[]): HomeBlogSelection {
  const sorted = [...allPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const featured = sorted.find((p) => p.featured) ?? sorted[0];
  const secondary = sorted.filter((p) => p.id !== featured.id).slice(0, 2);
  return { featured, secondary };
}

export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
