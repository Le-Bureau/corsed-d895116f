import { useMemo, useState } from "react";
import SEO from "@/components/seo/SEO";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogFeaturedCard from "@/components/blog/BlogFeaturedCard";
import BlogCard from "@/components/blog/BlogCard";
import { BLOG_POSTS } from "@/data/mockBlogData";

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const featured = useMemo(() => BLOG_POSTS.find((p) => p.featured), []);
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return BLOG_POSTS.filter((p) => !p.featured)
      .filter((p) => (activeCategory ? p.categoryId === activeCategory : true))
      .filter((p) =>
        q
          ? p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
          : true,
      );
  }, [activeCategory, search]);

  return (
    <div className="blog-scope">
      <SEO
        title="Le blog | Corse Drone"
        description="Expertise drone en Corse, retours de chantiers et actualités du secteur — par l'équipe Corse Drone à Bastia."
        canonicalPath="/blog"
      />

      <div className="blog-layout">
        <BlogSidebar
          activeCategoryId={activeCategory}
          onCategoryChange={setActiveCategory}
          search={search}
          onSearchChange={setSearch}
        />

        <main>
          <section className="blog-hero">
            <h1>
              Le <em>journal</em> de bord
            </h1>
            <p>
              Retours de chantiers, expertises drone et actualités du secteur. Écrit
              depuis Bastia par Pierre-François, Logan et Joan.
            </p>
          </section>

          {featured && !activeCategory && search.trim() === "" && (
            <BlogFeaturedCard post={featured} />
          )}

          <div className="section-heading">
            <h2>{activeCategory || search ? "Résultats" : "Tous les articles"}</h2>
            <span>
              Trier par : Plus récents
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </span>
          </div>

          <section className="blog-grid">
            {filtered.length === 0 ? (
              <p style={{ color: "var(--blog-text-muted)" }}>
                Aucun article ne correspond à votre recherche.
              </p>
            ) : (
              filtered.map((p) => <BlogCard key={p.id} post={p} />)
            )}
          </section>

          {filtered.length > 0 && (
            <nav className="pagination" aria-label="Pagination">
              <button type="button" aria-label="Page précédente">‹</button>
              <button type="button" className="active" aria-current="page">1</button>
              <button type="button">2</button>
              <button type="button">3</button>
              <button type="button" aria-label="Page suivante">›</button>
            </nav>
          )}
        </main>
      </div>
    </div>
  );
};

export default Blog;
