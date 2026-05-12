import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import type { TocItem } from "./BlogTOC";
import { slugify } from "@/lib/blogHelpers";

interface Props {
  markdown: string;
  onTocReady?: (items: TocItem[]) => void;
}

/** Extract h2/h3 from markdown source (skipping headings inside fenced code). */
export const extractToc = (md: string): TocItem[] => {
  const items: TocItem[] = [];
  let inFence = false;
  for (const raw of md.split("\n")) {
    const line = raw;
    if (/^```/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (m) {
      const level = m[1].length as 2 | 3;
      const text = m[2].replace(/[#*_`]/g, "").trim();
      items.push({ id: slugify(text), text, level });
    }
  }
  return items;
};

const BlogContent = ({ markdown }: Props) => {
  const components = useMemo(
    () => ({
      // ensure react-router would be ideal but external links / hash links are fine here
    }),
    [],
  );

  return (
    <article className="article-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
};

export default BlogContent;
