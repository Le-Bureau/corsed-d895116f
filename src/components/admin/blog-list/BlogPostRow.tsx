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

const BlogPostRow = ({ post, onDelete }: Props) => {
  const dateStr = post.publishedAt ?? null;
  return (
    <tr className="border-b border-border/40 hover:bg-muted/30 transition-colors">
      <td className="py-3 pl-4 pr-3">
        <div className="flex items-center gap-3">
          {post.coverImageUrl ? (
            <img
              src={post.coverImageUrl}
              alt=""
              className="h-12 w-16 rounded object-cover bg-muted shrink-0"
              loading="lazy"
            />
          ) : (
            <div
              className="h-12 w-16 rounded shrink-0"
              style={{
                background: `linear-gradient(135deg, ${post.author?.gradientFrom ?? "#5082AC"}, ${post.author?.gradientTo ?? "#3F6A8E"})`,
              }}
            />
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <Link
                to={`/admin/blog/${post.id}/edit`}
                className="font-medium text-sm text-foreground hover:text-primary truncate font-body"
              >
                {post.title}
              </Link>
              {post.featuredOnHome && (
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" aria-label="À la une" />
              )}
            </div>
            <p className="text-xs text-muted-foreground font-mono truncate">/{post.slug}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-3">
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
      </td>
      <td className="py-3 px-3">
        <span className="blog-scope inline-block">
          <BlogCategoryPill category={post.category} />
        </span>
      </td>
      <td className="py-3 px-3">
        {post.author && (
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-white text-[10px] font-semibold"
            style={{
              background: `linear-gradient(135deg, ${post.author.gradientFrom}, ${post.author.gradientTo})`,
            }}
            title={post.author.name}
          >
            {post.author.initials}
          </span>
        )}
      </td>
      <td className="py-3 px-3 text-xs text-muted-foreground whitespace-nowrap font-body">
        {dateStr ? formatBlogDate(dateStr) : "—"}
      </td>
      <td className="py-3 pl-3 pr-4 w-10">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="h-8 w-8 inline-flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-foreground/5"
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
      </td>
    </tr>
  );
};

export default BlogPostRow;
