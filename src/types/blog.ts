export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  initials: string;
  bio: string | null;
  avatarUrl: string | null;
  gradientFrom: string;
  gradientTo: string;
  sortOrder: number;
}

export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  color: string;
  description: string | null;
  sortOrder: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentMd: string;
  coverImageUrl: string | null;
  heroImageUrl: string | null;
  status: "draft" | "published";
  featuredOnHome: boolean;
  publishedAt: string | null;
  readingTimeMinutes: number;
  metaTitle: string | null;
  metaDescription: string | null;
  author: BlogAuthor | null;
  category: BlogCategory | null;
}
