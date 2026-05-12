import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import BlogContent from "@/components/blog/BlogContent";
import BlogCategoryPill from "@/components/blog/BlogCategoryPill";
import BlogAuthorBio from "@/components/blog/BlogAuthorBio";
import { formatBlogDate, getReadingTime } from "@/lib/blogHelpers";
import type { BlogPostFormValues } from "@/lib/admin/blogPostSchema";
import type { BlogAuthor, BlogCategory } from "@/types/blog";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formValues: BlogPostFormValues;
  authors: BlogAuthor[];
  categories: BlogCategory[];
}

const ArticlePreviewModal = ({ open, onOpenChange, formValues, authors, categories }: Props) => {
  const author = authors.find((a) => a.id === formValues.author_id) ?? null;
  const category = categories.find((c) => c.id === formValues.category_id) ?? null;
  const title = formValues.title?.trim();
  const excerpt = formValues.excerpt?.trim();
  const content = formValues.content_md ?? "";
  const readingTime = getReadingTime(content || "");
  const dateLabel = formatBlogDate(new Date().toISOString());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[1100px] w-[95vw] max-h-[90vh] overflow-hidden p-0 bg-[#FCFAF7] gap-0"
      >
        <DialogTitle className="sr-only">Aperçu de l'article</DialogTitle>

        {/* Sticky preview banner + close */}
        <div className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 py-2 bg-amber-100/90 backdrop-blur-sm border-b border-amber-200 text-amber-900 text-xs font-medium">
          <span>Aperçu — version non publiée</span>
          <DialogClose
            className="inline-flex items-center justify-center h-7 w-7 rounded hover:bg-amber-200/70 transition-colors"
            aria-label="Fermer l'aperçu"
          >
            <X className="h-4 w-4" />
          </DialogClose>
        </div>

        <div
          className="blog-scope overflow-y-auto max-h-[calc(90vh-40px)]"
          style={{ ["--current-cat" as string]: category?.color ?? "#5082AC" }}
        >
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Fil d'Ariane">
            <span>Accueil</span>
            <span className="breadcrumb-sep">/</span>
            <span>Blog</span>
            {category && (
              <>
                <span className="breadcrumb-sep">/</span>
                <span>{category.name}</span>
              </>
            )}
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">
              {title
                ? title.length > 60
                  ? title.slice(0, 60) + "…"
                  : title
                : "(Sans titre)"}
            </span>
          </nav>

          {/* Hero */}
          <header className="article-hero">
            {category ? (
              <BlogCategoryPill category={category} />
            ) : (
              <span className="text-xs text-muted-foreground">(Catégorie non définie)</span>
            )}
            <h1
              className="article-hero__title"
              style={!title ? { opacity: 0.5 } : undefined}
            >
              {title || "(Sans titre)"}
            </h1>
            {excerpt && <p className="article-hero__excerpt">{excerpt}</p>}
            <div className="article-hero__meta">
              {author ? (
                <div className="meta-author-block">
                  <div className={`meta-avatar author-${author.initials}`} aria-hidden>
                    {author.initials}
                  </div>
                  <span>{author.name}</span>
                </div>
              ) : (
                <span>(Auteur non défini)</span>
              )}
              <span className="meta-sep" />
              <span>{dateLabel}</span>
              <span className="meta-sep" />
              <span>{readingTime} min de lecture</span>
            </div>
          </header>

          {/* Cover */}
          {formValues.cover_image_url ? (
            <div className="article-cover">
              <div className="article-cover__inner">
                <img src={formValues.cover_image_url} alt={title || "Aperçu"} />
              </div>
            </div>
          ) : (
            <div className="article-cover">
              <div
                className="article-cover__inner"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0,0,0,0.04)",
                  border: "1px dashed rgba(0,0,0,0.15)",
                  minHeight: 200,
                  color: "var(--blog-text-muted)",
                  fontSize: 14,
                }}
              >
                Aucune image de couverture
              </div>
            </div>
          )}

          {/* Body */}
          <div className="article-body-layout">
            <div />
            {content.trim() ? (
              <BlogContent markdown={content} />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 0",
                  color: "var(--blog-text-muted)",
                  fontSize: 14,
                }}
              >
                (Aucun contenu)
              </div>
            )}
          </div>

          {/* Author bio */}
          {author && (
            <div className="article-body-layout">
              <div />
              <div className="article-footer">
                <BlogAuthorBio author={author} />
              </div>
            </div>
          )}

          <div style={{ height: 60 }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticlePreviewModal;
