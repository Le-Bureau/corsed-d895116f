import { useEffect, useState } from "react";

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

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? Math.min(100, Math.max(0, (h.scrollTop / total) * 100)) : 0;
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
