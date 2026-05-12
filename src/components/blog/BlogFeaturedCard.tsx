import { Link } from "react-router-dom";
import type { BlogPost } from "@/types/blog";
import BlogCategoryPill from "./BlogCategoryPill";
import BlogAuthorMeta from "./BlogAuthorMeta";

const BlogFeaturedCard = ({ post }: { post: BlogPost }) => {
  const catColor = post.category?.color ?? "#5082AC";
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="featured"
      style={{ ["--current-cat" as string]: catColor }}
      aria-label={`À la une : ${post.title}`}
    >
      <div className="featured__cover">
        <div className="featured__badge">
          <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
          </svg>
          À la une
        </div>
        {post.coverImageUrl && <img src={post.coverImageUrl} alt={post.title} />}
      </div>
      <div className="featured__content">
        <BlogCategoryPill category={post.category} size="md" />
        <h2 className="featured__title">{post.title}</h2>
        <p className="featured__excerpt">{post.excerpt}</p>
        <div className="featured__meta">
          <BlogAuthorMeta
            author={post.author}
            publishedAt={post.publishedAt}
            readingTimeMinutes={post.readingTimeMinutes}
            size="md"
          />
        </div>
      </div>
    </Link>
  );
};

export default BlogFeaturedCard;
