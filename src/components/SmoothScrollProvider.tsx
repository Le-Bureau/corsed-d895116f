import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import Lenis from "lenis";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Reduced motion: no Lenis — native scrolling (useLenis() returns null,
    // callers fall back to native scrollIntoView / scrollTo).
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      // Let scrollable elements (textareas, modals, lists) scroll natively
      // instead of Lenis hijacking the wheel to scroll the page.
      allowNestedScroll: true,
      prevent: (node) => node.closest("textarea, select") !== null,
    });
    lenisRef.current = instance;
    setLenis(instance);

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
