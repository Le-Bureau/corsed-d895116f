import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { BlogPost } from "@/data/mockBlogData";
import { getCategory } from "@/data/mockBlogData";
import BlogCategoryPill from "./BlogCategoryPill";
import BlogAuthorMeta from "./BlogAuthorMeta";

const HomeFeaturedCard = ({ post }: { post: BlogPost }) => {
  const cat = getCategory(post.categoryId);

  return (
    <Link
      to={`/blog/${post.slug}`}
      aria-label={`À la une : ${post.title}`}
      className="home-featured group"
      style={{ ["--current-cat" as string]: cat.color }}
    >
      <div className="home-featured__cover">
        <span className="home-featured__badge">
          <svg width="10" height="10" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
          </svg>
          À la une
        </span>
        <img src={post.coverImageUrl} alt={post.title} loading="lazy" />
      </div>
      <div className="home-featured__content">
        <BlogCategoryPill categoryId={post.categoryId} className="mb-4" />
        <h3 className="home-featured__title font-display">{post.title}</h3>
        <p className="home-featured__excerpt">{post.excerpt}</p>
        <div className="home-featured__footer">
          <div className="home-featured__meta">
            <BlogAuthorMeta
              authorId={post.authorId}
              publishedAt={post.publishedAt}
              readingTimeMinutes={post.readingTimeMinutes}
              size="sm"
              showFullName
              short
            />
          </div>
          <span className="home-featured__cta">
            Lire l'article
            <ArrowRight className="w-4 h-4 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HomeFeaturedCard;
