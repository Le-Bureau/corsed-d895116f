import { useEffect, useState } from "react";
import { Events, trackEvent } from "@/lib/analytics";
import { Link, useSearchParams } from "react-router-dom";
import BlogIndexSEO from "@/components/seo/BlogIndexSEO";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogFeaturedCard from "@/components/blog/BlogFeaturedCard";
import BlogCard from "@/components/blog/BlogCard";
import BlogFeaturedSkeleton from "@/components/blog/skeletons/BlogFeaturedSkeleton";
import BlogCardSkeleton from "@/components/blog/skeletons/BlogCardSkeleton";
import { useBlogCategories } from "@/hooks/blog/useBlogCategories";
import { useBlogPosts } from "@/hooks/blog/useBlogPosts";
import { useBlogCategoryCounts } from "@/hooks/blog/useBlogCategoryCounts";

const Blog = () => {
  const [params] = useSearchParams();
  const catSlug = params.get("cat") ?? undefined;
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = search.trim();
    if (q.length < 3) return;
    const t = setTimeout(() => {
      trackEvent(Events.SEARCH_PERFORMED, { query_length: q.length });
    }, 800);
    return () => clearTimeout(t);
  }, [search]);

  const { data: categories = [] } = useBlogCategories();
  const { data: counts = {}, total } = useBlogCategoryCounts();
  const {
    data: posts,
    isLoading,
    isError,
  } = useBlogPosts({ categorySlug: catSlug });

  const q = search.trim().toLowerCase();
  const allPosts = posts ?? [];
  const searched = q
    ? allPosts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q),
      )
    : allPosts;

  // Featured only when no filter / search
  const featured = !catSlug && !q ? searched.find((p) => p.featuredOnHome) : undefined;
  const grid = featured ? searched.filter((p) => p.id !== featured.id) : searched;

  const activeCategoryName =
    catSlug && categories.find((c) => c.slug === catSlug)?.name;

  return (
    <div className="blog-scope">
      <BlogIndexSEO
        activeCategory={
          catSlug ? categories.find((c) => c.slug === catSlug) ?? null : null
        }
      />

      <div className="blog-layout">
        <BlogSidebar
          categories={categories}
          counts={counts}
          total={total}
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

          {isLoading ? (
            <>
              <BlogFeaturedSkeleton />
              <div className="section-heading">
                <h2>Tous les articles</h2>
              </div>
              <section className="blog-grid">
                {Array.from({ length: 6 }).map((_, i) => (
                  <BlogCardSkeleton key={i} />
                ))}
              </section>
            </>
          ) : isError || (allPosts.length === 0 && !catSlug && !q) ? (
            <p style={{ color: "var(--blog-text-muted)" }}>
              Le blog est en cours de mise en route.{" "}
              <Link to="/" style={{ textDecoration: "underline" }}>
                Retourner à l'accueil
              </Link>
            </p>
          ) : (
            <>
              {featured && <BlogFeaturedCard post={featured} />}

              <div className="section-heading">
                <h2>
                  {activeCategoryName
                    ? activeCategoryName
                    : q
                      ? "Résultats"
                      : "Tous les articles"}
                </h2>
                <span>
                  Trier par : Plus récents
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </span>
              </div>

              <section className="blog-grid">
                {grid.length === 0 ? (
                  <p style={{ color: "var(--blog-text-muted)" }}>
                    Aucun article dans cette catégorie pour le moment.{" "}
                    <Link to="/blog" style={{ textDecoration: "underline" }}>
                      Voir tous les articles
                    </Link>
                  </p>
                ) : (
                  grid.map((p) => <BlogCard key={p.id} post={p} />)
                )}
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Blog;
