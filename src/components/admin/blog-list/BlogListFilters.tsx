import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { BlogAuthor, BlogCategory } from "@/types/blog";

export type StatusFilter = "all" | "draft" | "published";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  status: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;
  categoryId: string;
  onCategoryChange: (v: string) => void;
  authorId: string;
  onAuthorChange: (v: string) => void;
  categories: BlogCategory[];
  authors: BlogAuthor[];
}

const statusTabs: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "draft", label: "Brouillons" },
  { value: "published", label: "Publiés" },
];

const BlogListFilters = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  categoryId,
  onCategoryChange,
  authorId,
  onAuthorChange,
  categories,
  authors,
}: Props) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3 font-body">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par titre…"
          className="pl-9 pr-9"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded"
            aria-label="Effacer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="inline-flex p-0.5 rounded-md bg-muted border border-border/60">
        {statusTabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => onStatusChange(t.value)}
            className={cn(
              "px-3 py-1.5 text-xs rounded-sm transition-colors",
              status === t.value
                ? "bg-white text-foreground shadow-sm font-medium"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <Select value={categoryId} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full lg:w-[200px]">
          <SelectValue placeholder="Toutes les catégories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toutes les catégories</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                {c.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={authorId} onValueChange={onAuthorChange}>
        <SelectTrigger className="w-full lg:w-[180px]">
          <SelectValue placeholder="Tous les auteurs" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les auteurs</SelectItem>
          {authors.map((a) => (
            <SelectItem key={a.id} value={a.id}>
              {a.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BlogListFilters;
