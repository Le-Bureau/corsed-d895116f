import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export type HeaderState = "top" | "scrolled-dark" | "scrolled-light";
export type SectionBg = "dark" | "light";

/**
 * Adaptive header state hook.
 *
 * Convention: any major section in pages must set `data-header-bg="dark" | "light"`
 * on its outermost <section> wrapper. Example: the home hero uses
 * `data-header-bg="dark"`, a stats section on white bg uses `data-header-bg="light"`.
 *
 * Returns:
 *  - 'top'              when window.scrollY < 50
 *  - 'scrolled-dark'    when the active section under the header is dark
 *  - 'scrolled-light'   otherwise (default if no section is detected)
 */
export function useHeaderState(): HeaderState {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(
    typeof window !== "undefined" ? window.scrollY >= 50 : false,
  );
  const [activeBg, setActiveBg] = useState<SectionBg>("light");
  const activeRef = useRef<Element | null>(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver — re-query on route change
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-bg]"),
    );
    activeRef.current = null;

    if (sections.length === 0) {
      setActiveBg("light");
      return;
    }

    const readBg = (el: Element): SectionBg => {
      const v = el.getAttribute("data-header-bg");
      return v === "dark" ? "dark" : "light";
    };

    // Initial pick: first section whose rect intersects ~80px below viewport top
    const pickInitial = () => {
      const probe = 80;
      let chosen: Element | null = null;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          chosen = s;
          break;
        }
      }
      if (!chosen) chosen = sections[0];
      activeRef.current = chosen;
      setActiveBg(readBg(chosen));
    };

    pickInitial();

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the latest entry that is intersecting
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length > 0) {
          const target = intersecting[intersecting.length - 1].target;
          activeRef.current = target;
          setActiveBg(readBg(target));
        }
      },
      { rootMargin: "-80px 0px -85% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  if (!scrolled) return "top";
  return activeBg === "dark" ? "scrolled-dark" : "scrolled-light";
}
