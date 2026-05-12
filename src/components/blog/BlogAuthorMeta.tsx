import type { BlogAuthor } from "@/types/blog";
import { formatBlogDate } from "@/lib/blogHelpers";

interface Props {
  author: BlogAuthor | null;
  publishedAt: string | null;
  readingTimeMinutes?: number;
  size?: "sm" | "md" | "lg";
  showFullName?: boolean;
  short?: boolean;
}

const sizeMap = {
  sm: { w: 22, font: 9 },
  md: { w: 28, font: 11 },
  lg: { w: 32, font: 12 },
};

const BlogAuthorMeta = ({
  author,
  publishedAt,
  readingTimeMinutes,
  size = "md",
  showFullName = true,
  short = false,
}: Props) => {
  const { w, font } = sizeMap[size];
  if (!author) return null;
  const parts = author.name.split(" ");
  const display = showFullName
    ? author.name
    : `${parts[0][0]}. ${parts.slice(1).join(" ")}`;

  return (
    <>
      <div
        className={`meta-avatar author-${author.initials}`}
        style={{ width: w, height: w, fontSize: font }}
        aria-hidden
      >
        {author.initials}
      </div>
      <span>{display}</span>
      {publishedAt && (
        <>
          <span className="meta-sep" />
          <span>{formatBlogDate(publishedAt)}</span>
        </>
      )}
      {readingTimeMinutes != null && (
        <>
          <span className="meta-sep" />
          <span>
            {readingTimeMinutes} min{short ? "" : " de lecture"}
          </span>
        </>
      )}
    </>
  );
};

export default BlogAuthorMeta;
