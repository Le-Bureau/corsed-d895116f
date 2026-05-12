import { Link } from "react-router-dom";
import type { BlogPost } from "@/data/mockBlogData";
import BlogCard from "./BlogCard";

interface Props {
  posts: BlogPost[];
}

const BlogRelatedPosts = ({ posts }: Props) => {
  if (posts.length === 0) return null;
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
        {posts.map((p) => (
          <BlogCard key={p.id} post={p} variant="related" />
        ))}
      </div>
    </section>
  );
};

export default BlogRelatedPosts;
