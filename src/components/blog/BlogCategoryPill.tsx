import { getCategory } from "@/data/mockBlogData";

interface Props {
  categoryId: string;
  size?: "sm" | "md";
  className?: string;
}

const BlogCategoryPill = ({ categoryId, size = "sm", className = "" }: Props) => {
  const cat = getCategory(categoryId);
  const cls = size === "md" ? "pill pill-lg" : "pill";
  return (
    <span className={`${cls} ${className}`} style={{ background: cat.color }}>
      {cat.name}
    </span>
  );
};

export default BlogCategoryPill;
