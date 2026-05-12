import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/mockBlogData";
import { getCategory } from "@/data/mockBlogData";
import BlogCategoryPill from "./BlogCategoryPill";
import BlogAuthorMeta from "./BlogAuthorMeta";

const BlogFeaturedCard = ({ post }: { post: BlogPost }) => {
  const cat = getCategory(post.categoryId);
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="featured"
      style={{ ["--current-cat" as string]: cat.color }}
      aria-label={`À la une : ${post.title}`}
    >
      <div className="featured__cover">
        <div className="featured__badge">
          <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
          </svg>
          À la une
        </div>
        <img src={post.coverImageUrl} alt={post.title} />
      </div>
      <div className="featured__content">
        <BlogCategoryPill categoryId={post.categoryId} size="md" />
        <h2 className="featured__title">{post.title}</h2>
        <p className="featured__excerpt">{post.excerpt}</p>
        <div className="featured__meta">
          <BlogAuthorMeta
            authorId={post.authorId}
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
