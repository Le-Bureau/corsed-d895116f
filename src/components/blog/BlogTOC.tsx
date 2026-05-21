import { useEffect, useState } from "react";
import { useLenis } from "@/components/SmoothScrollProvider";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface Props {
  items: TocItem[];
}

const BlogTOC = ({ items }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const computeActive = () => {
      const headerOffset = 88;
      const activationLine = Math.min(window.innerHeight * 0.36, 360);
      const visibleSection = elements.find((el, index) => {
        const currentTop = el.getBoundingClientRect().top;
        const nextTop = elements[index + 1]?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
        return currentTop <= activationLine && nextTop > headerOffset;
      });

      setActiveId(visibleSection?.id ?? elements[0].id);
    };

    computeActive();

    const observer = new IntersectionObserver(computeActive, {
      rootMargin: "-80px 0px -66% 0px",
      threshold: 0,
    });
    elements.forEach((el) => observer.observe(el));

    window.addEventListener("scroll", computeActive, { passive: true });
    window.addEventListener("resize", computeActive);

    let unsubLenis: (() => void) | undefined;
    if (lenis) {
      lenis.on("scroll", computeActive);
      unsubLenis = () => lenis.off("scroll", computeActive);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", computeActive);
      window.removeEventListener("resize", computeActive);
      unsubLenis?.();
    };
  }, [items, lenis]);

  useEffect(() => {
    const compute = () => {
      const article = document.querySelector(".article-content") as HTMLElement | null;
      const viewportH = window.innerHeight;
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      let start = 0;
      let end = document.documentElement.scrollHeight - viewportH;

      if (article) {
        const rect = article.getBoundingClientRect();
        start = rect.top + scrollY;
        const articleBottom = start + article.offsetHeight;
        end = Math.max(start + 1, articleBottom - viewportH);
      }

      const p = end > start ? ((scrollY - start) / (end - start)) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, p)));
    };
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    compute();

    let unsubLenis: (() => void) | undefined;
    if (lenis) {
      lenis.on("scroll", compute);
      unsubLenis = () => lenis.off("scroll", compute);
    }

    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
      unsubLenis?.();
    };
  }, [lenis]);

  if (items.length === 0) return null;

  return (
    <aside className="toc" aria-label="Sommaire">
      <div className="toc__heading">Sommaire</div>
      <nav className="toc__list">
        {items.map((it) => (
          <a
            key={it.id}
            href={`#${it.id}`}
            className={`toc__item ${it.level === 3 ? "subitem" : ""} ${
              activeId === it.id ? "active" : ""
            }`}
          >
            {it.text}
          </a>
        ))}
      </nav>
      <div className="reading-progress">
        <span>Progression de lecture</span>
        <div className="progress-bar">
          <div className="progress-bar__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </aside>
  );
};

export default BlogTOC;
