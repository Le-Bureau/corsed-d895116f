import { isValidElement, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
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

interface Slide {
  src: string;
  alt?: string;
  description?: string;
}

const getNodeText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  if (isValidElement(node)) return getNodeText(node.props.children);
  return "";
};

const BlogContent = ({ markdown }: Props) => {
  const components = useMemo(
    () => ({
      h2: ({ children, ...props }: any) => (
        <h2 {...props} id={slugify(getNodeText(children))}>
          {children}
        </h2>
      ),
      h3: ({ children, ...props }: any) => (
        <h3 {...props} id={slugify(getNodeText(children))}>
          {children}
        </h3>
      ),
    }),
    [],
  );
  const rootRef = useRef<HTMLElement>(null);

  const [lightbox, setLightbox] = useState<{
    open: boolean;
    index: number;
    slides: Slide[];
  }>({ open: false, index: 0, slides: [] });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const galleries = Array.from(
      root.querySelectorAll<HTMLElement>(".image-gallery"),
    );
    if (galleries.length === 0) return;

    const cleanups: Array<() => void> = [];

    galleries.forEach((gallery) => {
      const figures = Array.from(gallery.querySelectorAll<HTMLElement>("figure"));
      const slides: Slide[] = figures.map((fig) => {
        const img = fig.querySelector<HTMLImageElement>("img");
        const cap = fig.querySelector<HTMLElement>("figcaption");
        return {
          src: img?.getAttribute("src") ?? "",
          alt: img?.getAttribute("alt") ?? "",
          description: cap?.textContent?.trim() || undefined,
        };
      }).filter((s) => s.src);

      figures.forEach((fig, idx) => {
        fig.style.cursor = "zoom-in";
        const img = fig.querySelector<HTMLImageElement>("img");
        if (img) img.setAttribute("loading", "lazy");
        const handler = (e: Event) => {
          e.preventDefault();
          setLightbox({ open: true, index: idx, slides });
        };
        fig.addEventListener("click", handler);
        cleanups.push(() => fig.removeEventListener("click", handler));
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [markdown]);

  return (
    <>
      <article ref={rootRef} className="article-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components}
        >
          {markdown}
        </ReactMarkdown>
      </article>

      <Lightbox
        open={lightbox.open}
        close={() => setLightbox((s) => ({ ...s, open: false }))}
        index={lightbox.index}
        slides={lightbox.slides}
        controller={{ closeOnBackdropClick: true }}
        styles={{
          container: {
            backgroundColor: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(4px)",
          },
        }}
      />
    </>
  );
};

export default BlogContent;
