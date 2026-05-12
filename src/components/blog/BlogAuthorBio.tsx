import type { BlogAuthor } from "@/types/blog";

const BlogAuthorBio = ({ author }: { author: BlogAuthor | null }) => {
  if (!author) return null;
  return (
    <div className="author-bio">
      <div className={`meta-avatar author-${author.initials}`} aria-hidden>
        {author.initials}
      </div>
      <div className="author-bio__content">
        <div className="author-bio__name">{author.name}</div>
        <div className="author-bio__role">{author.role} · Corse Drone</div>
        {author.bio && <p className="author-bio__text">{author.bio}</p>}
      </div>
    </div>
  );
};

export default BlogAuthorBio;
