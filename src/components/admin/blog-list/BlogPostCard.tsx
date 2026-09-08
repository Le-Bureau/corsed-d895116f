import { Link } from "react-router-dom";
import { ExternalLink, MoreVertical, Pencil, Star, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BlogCategoryPill from "@/components/blog/BlogCategoryPill";
import { formatBlogDate } from "@/lib/blogHelpers";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

interface Props {
  post: BlogPost;
  onDelete: (post: BlogPost) => void;
}

const BlogPostCard = ({ post, onDelete }: Props) => {
  const dateStr = post.publishedAt ?? null;
  return (
    <div className="rounded-lg border border-border/60 bg-white p-3">
      <div className="flex items-start gap-3">
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt=""
            className="h-14 w-20 rounded object-cover bg-muted shrink-0"
            loading="lazy"
          />
        ) : (
          <div
            className="h-14 w-20 rounded shrink-0"
            style={{
              background: `linear-gradient(135deg, ${post.author?.gradientFrom ?? "#5082AC"}, ${post.author?.gradientTo ?? "#3F6A8E"})`,
            }}
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Link
              to={`/admin/blog/${post.id}/edit`}
              className="font-medium text-sm text-foreground hover:text-primary font-body line-clamp-2"
            >
              {post.title}
            </Link>
            {post.featuredOnHome && (
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" aria-label="À la une" />
            )}
          </div>
          <p className="text-xs text-muted-foreground font-mono truncate mt-0.5">/{post.slug}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            className="h-8 w-8 inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-foreground/5 shrink-0"
            aria-label="Actions"
          >
            <MoreVertical className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="font-body">
            <DropdownMenuItem asChild>
              <Link to={`/admin/blog/${post.id}/edit`}>
                <Pencil className="h-4 w-4" />
                Modifier
              </Link>
            </DropdownMenuItem>
            {post.status === "published" && (
              <DropdownMenuItem asChild>
                <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Voir l'article
                </a>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(post)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center flex-wrap gap-2 mt-3">
        <span
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider",
            post.status === "published"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-muted text-muted-foreground",
          )}
        >
          {post.status === "published" ? "Publié" : "Brouillon"}
        </span>
        <span className="blog-scope contents">
          <BlogCategoryPill category={post.category} />
        </span>
        {post.author && (
          <span
            className="inline-flex h-6 w-6 items-center justify-center rounded-full text-white text-[10px] font-semibold"
            style={{
              background: `linear-gradient(135deg, ${post.author.gradientFrom}, ${post.author.gradientTo})`,
            }}
            title={post.author.name}
          >
            {post.author.initials}
          </span>
        )}
        <span className="text-xs text-muted-foreground font-body ml-auto">
          {dateStr ? formatBlogDate(dateStr) : "—"}
        </span>
      </div>
    </div>
  );
};

export default BlogPostCard;
