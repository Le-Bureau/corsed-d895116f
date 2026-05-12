import type { BlogCategory } from "@/types/blog";

interface Props {
  category: BlogCategory | null;
  size?: "sm" | "md";
  className?: string;
}

const BlogCategoryPill = ({ category, size = "sm", className = "" }: Props) => {
  if (!category) return null;
  const cls = size === "md" ? "pill pill-lg" : "pill";
  return (
    <span className={`${cls} ${className}`} style={{ background: category.color }}>
      {category.name}
    </span>
  );
};

export default BlogCategoryPill;
