import type { BlogPost } from "@/types/blog";
import BlogPostRow from "./BlogPostRow";
import BlogPostCard from "./BlogPostCard";

interface Props {
  posts: BlogPost[];
  onDelete: (post: BlogPost) => void;
}

const BlogPostsTable = ({ posts, onDelete }: Props) => (
  <>
    {/* Table — écrans md et + */}
    <div className="hidden md:block rounded-lg border border-border/60 bg-white overflow-hidden">
      <table className="w-full table-fixed">
        <colgroup>
          <col />
          <col className="w-24" />
          <col className="w-32" />
          <col className="w-16" />
          <col className="w-28" />
          <col className="w-12" />
        </colgroup>
        <thead className="bg-muted/40 border-b border-border/60">
          <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-body">
            <th className="py-2.5 pl-4 pr-3 font-semibold">Article</th>
            <th className="py-2.5 px-3 font-semibold">Statut</th>
            <th className="py-2.5 px-3 font-semibold hidden lg:table-cell">Catégorie</th>
            <th className="py-2.5 px-3 font-semibold hidden lg:table-cell">Auteur</th>
            <th className="py-2.5 px-3 font-semibold">Publié le</th>
            <th className="py-2.5 pl-3 pr-4" />
          </tr>
        </thead>
        <tbody>
          {posts.map((p) => (
            <BlogPostRow key={p.id} post={p} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>

    {/* Cartes — petits écrans */}
    <div className="md:hidden space-y-3">
      {posts.map((p) => (
        <BlogPostCard key={p.id} post={p} onDelete={onDelete} />
      ))}
    </div>
  </>
);

export default BlogPostsTable;
