import type { BlogPost } from "@/types/blog";
import BlogPostRow from "./BlogPostRow";

interface Props {
  posts: BlogPost[];
  onDelete: (post: BlogPost) => void;
}

const BlogPostsTable = ({ posts, onDelete }: Props) => (
  <div className="overflow-x-auto rounded-lg border border-border/60 bg-white">
    <table className="w-full">
      <thead className="bg-muted/40 border-b border-border/60">
        <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground font-body">
          <th className="py-2.5 pl-4 pr-3 font-semibold">Article</th>
          <th className="py-2.5 px-3 font-semibold">Statut</th>
          <th className="py-2.5 px-3 font-semibold">Catégorie</th>
          <th className="py-2.5 px-3 font-semibold">Auteur</th>
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
);

export default BlogPostsTable;
