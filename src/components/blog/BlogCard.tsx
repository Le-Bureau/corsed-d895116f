import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/mockBlogData";
import { getCategory } from "@/data/mockBlogData";
import BlogCategoryPill from "./BlogCategoryPill";
import BlogAuthorMeta from "./BlogAuthorMeta";

interface Props {
  post: BlogPost;
  variant?: "default" | "related";
}

const BlogCard = ({ post, variant = "default" }: Props) => {
  const cat = getCategory(post.categoryId);
  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`card ${variant === "related" ? "card-related" : ""}`}
      style={{ ["--current-cat" as string]: cat.color }}
      aria-label={post.title}
    >
      <div className="card__cover">
        <img src={post.coverImageUrl} alt={post.title} loading="lazy" />
      </div>
      <div className="card__body">
        <BlogCategoryPill categoryId={post.categoryId} />
        <h3 className="card__title">{post.title}</h3>
        {variant === "default" && <p className="card__excerpt">{post.excerpt}</p>}
        <div className="card__meta">
          <BlogAuthorMeta
            authorId={post.authorId}
            publishedAt={post.publishedAt}
            readingTimeMinutes={variant === "default" ? post.readingTimeMinutes : undefined}
            size="sm"
            showFullName={false}
            short
          />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
