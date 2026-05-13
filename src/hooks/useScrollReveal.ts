import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface UseScrollRevealOptions {
  amount?: number;
  rootMargin?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>({
  amount = 0.08,
  rootMargin = "0px 0px -8% 0px",
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) {
      setIsVisible(true);
      return;
    }

    let frame = 0;
    let observer: IntersectionObserver | null = null;

    const reveal = () => {
      setIsVisible(true);
      observer?.disconnect();
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
      if (frame) cancelAnimationFrame(frame);
    };

    const checkPosition = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const triggerLine = viewportHeight * (1 - amount);

      if (rect.top <= triggerLine && rect.bottom >= 0) {
        reveal();
      }
    };

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      {
        root: null,
        rootMargin,
        threshold: Math.min(Math.max(amount, 0), 0.35),
      },
    );

    observer.observe(node);
    frame = requestAnimationFrame(checkPosition);
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [amount, reduced, rootMargin]);

  return { ref, isVisible: reduced || isVisible, reduced };
}
