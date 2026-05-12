import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEO from "@/components/seo/SEO";
import BlogPostSEO from "@/components/seo/BlogPostSEO";
import BlogTOC from "@/components/blog/BlogTOC";
import BlogContent, { extractToc } from "@/components/blog/BlogContent";
import BlogAuthorBio from "@/components/blog/BlogAuthorBio";
import BlogArticleCTA from "@/components/blog/BlogArticleCTA";
import BlogRelatedPosts from "@/components/blog/BlogRelatedPosts";
import BlogPostSkeleton from "@/components/blog/skeletons/BlogPostSkeleton";
import { useBlogPost } from "@/hooks/blog/useBlogPost";
import { formatBlogDate } from "@/lib/blogHelpers";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useBlogPost(slug);

  const tocItems = useMemo(
    () => (post ? extractToc(post.contentMd) : []),
    [post],
  );

  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 1500);
      return () => clearTimeout(t);
    }
  }, [copied]);

  if (isLoading) return <BlogPostSkeleton />;

  if (isError || !post) {
    return (
      <div className="blog-scope">
        <SEO
          title="Article introuvable | Corse Drone"
          description="Cet article n'existe pas ou n'est plus publié."
          canonicalPath={`/blog/${slug ?? ""}`}
        />
        <div style={{ maxWidth: 640, margin: "120px auto", padding: "0 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: 32, marginBottom: 16 }}>Article introuvable</h1>
          <p style={{ color: "var(--blog-text-muted)", marginBottom: 24 }}>
            Cet article n'existe pas ou n'est plus publié.
          </p>
          <Link to="/blog" style={{ textDecoration: "underline" }}>
            Voir le blog
          </Link>
        </div>
      </div>
    );
  }

  const cat = post.category;
  const author = post.author;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    }
  };

  return (
    <div
      className="blog-scope"
      style={{ ["--current-cat" as string]: cat?.color ?? "#5082AC" }}
    >
      <BlogPostSEO post={post} />

      <nav className="breadcrumb" aria-label="Fil d'Ariane">
        <Link to="/">Accueil</Link>
        <span className="breadcrumb-sep">/</span>
        <Link to="/blog">Blog</Link>
        {cat && (
          <>
            <span className="breadcrumb-sep">/</span>
            <Link to={`/blog?cat=${cat.slug}`}>{cat.name}</Link>
          </>
        )}
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">{post.title}</span>
      </nav>

      <header className="article-hero">
        {cat && <span className="article-hero__pill">{cat.name}</span>}
        <h1 className="article-hero__title">{post.title}</h1>
        <p className="article-hero__excerpt">{post.excerpt}</p>
        <div className="article-hero__meta">
          {author && (
            <div className="meta-author-block">
              <div className={`meta-avatar author-${author.initials}`} aria-hidden>
                {author.initials}
              </div>
              <span>{author.name}</span>
            </div>
          )}
          {post.publishedAt && (
            <>
              <span className="meta-sep" />
              <span>{formatBlogDate(post.publishedAt)}</span>
            </>
          )}
          <span className="meta-sep" />
          <span>{post.readingTimeMinutes} min de lecture</span>
          <div className="share-row">
            <button
              type="button"
              className="share-btn"
              aria-label="Partager sur LinkedIn"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
                  "_blank",
                )
              }
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </button>
            <button
              type="button"
              className="share-btn"
              aria-label="Partager sur X"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`,
                  "_blank",
                )
              }
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button
              type="button"
              className="share-btn"
              aria-label={copied ? "Lien copié" : "Copier le lien"}
              onClick={handleCopy}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
                <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
                <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {post.coverImageUrl && (
        <div className="article-cover">
          <div className="article-cover__inner">
            <img src={post.coverImageUrl} alt={post.title} />
          </div>
        </div>
      )}

      <div className="article-body-layout">
        <BlogTOC items={tocItems} />
        <BlogContent markdown={post.contentMd} />
      </div>

      <div className="article-body-layout">
        <div />
        <div className="article-footer">
          <BlogAuthorBio author={author} />
        </div>
      </div>

      <BlogArticleCTA />
      <BlogRelatedPosts currentPostId={post.id} categoryId={cat?.id ?? null} />
    </div>
  );
};

export default BlogPost;
