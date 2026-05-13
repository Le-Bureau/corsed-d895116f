import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { toast } from "sonner";
import type { BlogCategory } from "@/types/blog";
import { Events, trackEvent } from "@/lib/analytics";

interface Props {
  categories: BlogCategory[];
  counts: Record<string, number>;
  total: number;
  search: string;
  onSearchChange: (s: string) => void;
}

const BlogSidebar = ({ categories, counts, total, search, onSearchChange }: Props) => {
  const [params] = useSearchParams();
  const activeSlug = params.get("cat");

  return (
    <aside className="blog-sidebar">
      <div className="blog-search">
        <Search aria-hidden />
        <label htmlFor="blog-search-input" className="sr-only">
          Rechercher un article
        </label>
        <input
          id="blog-search-input"
          type="search"
          placeholder="Rechercher un article..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="sidebar-section">
        <div className="sidebar-heading">Catégories</div>
        <div className="category-list" role="list">
          <Link
            to="/blog"
            className={`category-item ${activeSlug === null ? "active" : ""}`}
            onClick={() => {
              const from = activeSlug ?? "all";
              if (from !== "all") {
                trackEvent(Events.CATEGORY_FILTER, { from, to: "all" });
              }
            }}
          >
            <span className="category-label">
              <span className="category-dot" style={{ background: "var(--blog-text)" }} />
              <span>Tous les articles</span>
            </span>
            <span className="category-count">{total}</span>
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/blog?cat=${c.slug}`}
              className={`category-item ${activeSlug === c.slug ? "active" : ""}`}
              onClick={() => {
                const from = activeSlug ?? "all";
                if (from !== c.slug) {
                  trackEvent(Events.CATEGORY_FILTER, { from, to: c.slug });
                }
              }}
            >
              <span className="category-label">
                <span className="category-dot" style={{ background: c.color }} />
                <span>{c.name}</span>
              </span>
              <span className="category-count">{counts[c.slug] ?? 0}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <a href="#" aria-disabled>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path d="M4 4a16 16 0 0 1 16 16" />
            <path d="M4 11a9 9 0 0 1 9 9" />
            <circle cx="5" cy="19" r="1.5" fill="currentColor" />
          </svg>
          Flux RSS
        </a>
        <a href="#" aria-disabled>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Newsletter&nbsp;
        </a>
      </div>
    </aside>
  );
};

export default BlogSidebar;
