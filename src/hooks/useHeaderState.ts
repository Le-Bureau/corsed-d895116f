import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export type HeaderState = "top" | "scrolled-dark" | "scrolled-light";
export type SectionBg = "dark" | "light";

/**
 * Adaptive header state hook.
 *
 * Convention: any major section in pages must set `data-header-bg="dark" | "light"`
 * on its outermost <section> wrapper.
 *
 * Behavior:
 *  - rAF-coalesced scroll listener (one computation per frame, no-op on equal scrollY)
 *  - Directional hysteresis: enter 'scrolled' at y > 60, exit at y < 30
 *  - While in 'top', activeBg updates are suppressed so the morph transition
 *    is not clobbered by a simultaneous dark↔light color change
 *  - IntersectionObserver entries are coalesced to the latest one per frame
 */
export function useHeaderState(): HeaderState {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(
    typeof window !== "undefined" ? window.scrollY > 60 : false,
  );
  const [activeBg, setActiveBg] = useState<SectionBg>("light");

  const scrolledRef = useRef(scrolled);
  scrolledRef.current = scrolled;

  // rAF-coalesced scroll listener with directional hysteresis
  useEffect(() => {
    let rafId: number | null = null;
    let lastY = -1;

    const tick = () => {
      rafId = null;
      const y = window.scrollY;
      if (y === lastY) return;
      lastY = y;

      const current = scrolledRef.current;
      if (!current && y > 60) {
        scrolledRef.current = true;
        setScrolled(true);
      } else if (current && y < 30) {
        scrolledRef.current = false;
        setScrolled(false);
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // IntersectionObserver — re-query on route change
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-bg]"),
    );

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
      setActiveBg(readBg(chosen));
    };

    pickInitial();

    let pendingBg: SectionBg | null = null;
    let rafId: number | null = null;

    const flush = () => {
      rafId = null;
      // Suppress activeBg updates while at top — returned state is 'top' regardless,
      // and committing now would cascade an extra render mid-morph.
      if (!scrolledRef.current) {
        pendingBg = null;
        return;
      }
      if (pendingBg !== null) {
        const next = pendingBg;
        pendingBg = null;
        setActiveBg((prev) => (prev === next ? prev : next));
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const target = intersecting[intersecting.length - 1].target;
        pendingBg = readBg(target);
        if (rafId === null) rafId = requestAnimationFrame(flush);
      },
      { rootMargin: "-80px 0px -85% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => {
      observer.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  if (!scrolled) return "top";
  return activeBg === "dark" ? "scrolled-dark" : "scrolled-light";
}
