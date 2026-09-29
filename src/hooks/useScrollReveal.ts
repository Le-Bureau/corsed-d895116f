import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface UseScrollRevealOptions {
  amount?: number;
  rootMargin?: string;
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Server render and first client render: element is in its final (visible) state,
 * so the SSR HTML never contains hidden text. After hydration, only elements still
 * fully below the viewport are switched to hidden (instantly, before paint) and
 * revealed with their animation when scrolled into view.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>({
  amount = 0.08,
  rootMargin = "0px 0px -8% 0px",
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);

  useIsoLayoutEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    if (node.getBoundingClientRect().top <= viewportHeight) return; // already on screen or above: stay visible

    setIsVisible(false);

    let frame = 0;
    let observer: IntersectionObserver | null = null;

    const cleanup = () => {
      observer?.disconnect();
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
      if (frame) cancelAnimationFrame(frame);
    };

    const reveal = () => {
      setIsVisible(true);
      cleanup();
    };

    const checkPosition = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= vh * (1 - amount) && rect.bottom >= 0) reveal();
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) reveal();
      },
      { root: null, rootMargin, threshold: Math.min(Math.max(amount, 0), 0.35) },
    );
    observer.observe(node);
    frame = requestAnimationFrame(checkPosition);
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition, { passive: true });

    return cleanup;
  }, [amount, reduced, rootMargin]);

  return { ref, isVisible: reduced || isVisible, reduced };
}
