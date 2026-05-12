import { getAuthor, getCategory } from "@/data/mockBlogData";
import { formatBlogDate } from "@/lib/blogHelpers";

interface Props {
  authorId: string;
  publishedAt: string;
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
  authorId,
  publishedAt,
  readingTimeMinutes,
  size = "md",
  showFullName = true,
  short = false,
}: Props) => {
  const author = getAuthor(authorId);
  const { w, font } = sizeMap[size];
  const display = showFullName
    ? author.name
    : `${author.name.split(" ")[0][0]}. ${author.name.split(" ").slice(1).join(" ")}`;

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
      <span className="meta-sep" />
      <span>{formatBlogDate(publishedAt)}</span>
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

// silence unused warning helper
export const __unused = getCategory;
