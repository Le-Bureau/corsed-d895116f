import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { useBlogPosts } from "@/hooks/blog/useBlogPosts";
import { Events, trackEvent } from "@/lib/analytics";

interface Props {
  currentPostId: string;
  currentSlug: string;
  categoryId: string | null;
}

const BlogRelatedPosts = ({ currentPostId, currentSlug, categoryId }: Props) => {
  const { data: posts } = useBlogPosts();
  const related = (posts ?? [])
    .filter((p) => p.id !== currentPostId && p.category?.id === categoryId)
    .slice(0, 3);

  if (related.length === 0) return null;
  return (
    <section className="related" aria-label="Articles similaires">
      <div className="related__heading">
        <h2>Articles similaires</h2>
        <Link to="/blog">
          Tous les articles
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12,5 19,12 12,19" />
          </svg>
        </Link>
      </div>
      <div className="blog-grid-related">
        {related.map((p) => (
          <div
            key={p.id}
            onClickCapture={() =>
              trackEvent(Events.RELATED_ARTICLE_CLICKED, {
                from_slug: currentSlug,
                to_slug: p.slug,
              })
            }
          >
            <BlogCard post={p} variant="related" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogRelatedPosts;
