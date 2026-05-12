import { getAuthor } from "@/data/mockBlogData";

const BlogAuthorBio = ({ authorId }: { authorId: string }) => {
  const a = getAuthor(authorId);
  return (
    <div className="author-bio">
      <div className={`meta-avatar author-${a.initials}`} aria-hidden>
        {a.initials}
      </div>
      <div className="author-bio__content">
        <div className="author-bio__name">{a.name}</div>
        <div className="author-bio__role">{a.role} · Corse Drone</div>
        <p className="author-bio__text">{a.bio}</p>
      </div>
    </div>
  );
};

export default BlogAuthorBio;
