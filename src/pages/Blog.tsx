import { useEffect, useMemo, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortKey = "recent" | "oldest" | "title";
const SORT_LABELS: Record<SortKey, string> = {
  recent: "Plus récents",
  oldest: "Plus anciens",
  title: "Titre (A-Z)",
};

const Blog = () => {
  const [params] = useSearchParams();
  const catSlug = params.get("cat") ?? undefined;
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");

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
  const sortedAll = useMemo(() => {
    const arr = [...allPosts];
    if (sort === "recent") {
      arr.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
    } else if (sort === "oldest") {
      arr.sort((a, b) => (a.publishedAt ?? "").localeCompare(b.publishedAt ?? ""));
    } else if (sort === "title") {
      arr.sort((a, b) => a.title.localeCompare(b.title, "fr", { sensitivity: "base" }));
    }
    return arr;
  }, [allPosts, sort]);
  const searched = q
    ? sortedAll.filter(
        (p) =>
          p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q),
      )
    : sortedAll;

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
                <span
                  aria-hidden
                  className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--blog-text-muted)] px-1 py-0.5 opacity-60"
                >
                  Trier par : {SORT_LABELS[sort]}
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </span>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-[13px] text-[color:var(--blog-text-muted)] hover:text-[color:var(--blog-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 py-0.5"
                    >
                      Trier par : {SORT_LABELS[sort]}
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                        <polyline points="6,9 12,15 18,9" />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="font-body">
                    {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                      <DropdownMenuItem
                        key={key}
                        onClick={() => setSort(key)}
                        className={sort === key ? "font-semibold" : ""}
                      >
                        {SORT_LABELS[key]}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
