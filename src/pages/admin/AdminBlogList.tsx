import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Upload } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import BlogListFilters, { type StatusFilter } from "@/components/admin/blog-list/BlogListFilters";
import BlogPostsTable from "@/components/admin/blog-list/BlogPostsTable";
import { useAdminBlogPosts } from "@/hooks/admin/useAdminBlogPosts";
import { useBlogCategories } from "@/hooks/blog/useBlogCategories";
import { useBlogAuthors } from "@/hooks/blog/useBlogAuthors";
import { useDeleteBlogPost } from "@/hooks/admin/useDeleteBlogPost";
import type { BlogPost } from "@/types/blog";
import ImportArticleDialog from "@/components/admin/ImportArticleDialog";

const AdminBlogList = () => {
  const { data: posts, isLoading } = useAdminBlogPosts();
  const { data: categories } = useBlogCategories();
  const { data: authors } = useBlogAuthors();
  const del = useDeleteBlogPost();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [categoryId, setCategoryId] = useState("all");
  const [authorId, setAuthorId] = useState("all");
  const [toDelete, setToDelete] = useState<BlogPost | null>(null);

  const counts = useMemo(() => {
    const drafts = posts?.filter((p) => p.status === "draft").length ?? 0;
    const published = posts?.filter((p) => p.status === "published").length ?? 0;
    return { drafts, published };
  }, [posts]);

  const filtered = useMemo(() => {
    if (!posts) return [];
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (categoryId !== "all" && p.category?.id !== categoryId) return false;
      if (authorId !== "all" && p.author?.id !== authorId) return false;
      if (q && !p.title.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [posts, search, status, categoryId, authorId]);

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await del.mutateAsync({ id: toDelete.id, slug: toDelete.slug });
      toast.success("Article supprimé");
    } catch (e) {
      toast.error("Une erreur s'est produite. Réessaie ou contacte le support.");
    } finally {
      setToDelete(null);
    }
  };

  const totalPosts = posts?.length ?? 0;
  const isFiltered = search || status !== "all" || categoryId !== "all" || authorId !== "all";

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl text-foreground">Articles du blog</h1>
          <p className="text-muted-foreground font-body mt-1">
            {counts.drafts} brouillon{counts.drafts > 1 ? "s" : ""} · {counts.published} publié
            {counts.published > 1 ? "s" : ""}
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/blog/new">
            <Plus className="h-4 w-4" />
            Nouvel article
          </Link>
        </Button>
      </header>

      <BlogListFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        categoryId={categoryId}
        onCategoryChange={setCategoryId}
        authorId={authorId}
        onAuthorChange={setAuthorId}
        categories={categories ?? []}
        authors={authors ?? []}
      />

      {isLoading ? (
        <p className="text-muted-foreground font-body text-sm">Chargement…</p>
      ) : totalPosts === 0 ? (
        <div className="text-center py-16 border border-dashed border-border/60 rounded-lg bg-white">
          <p className="text-muted-foreground font-body mb-4">Aucun article pour le moment.</p>
          <Button asChild>
            <Link to="/admin/blog/new">
              <Plus className="h-4 w-4" />
              Créer le premier article
            </Link>
          </Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border/60 rounded-lg bg-white">
          <p className="text-muted-foreground font-body text-sm">
            Aucun article ne correspond aux filtres.
          </p>
        </div>
      ) : (
        <BlogPostsTable posts={filtered} onDelete={setToDelete} />
      )}

      <AlertDialog open={!!toDelete} onOpenChange={(o) => !o && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cet article&nbsp;?</AlertDialogTitle>
            <AlertDialogDescription>
              {toDelete?.title} sera supprimé définitivement. Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminBlogList;
