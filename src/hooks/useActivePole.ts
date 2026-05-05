import { useCallback, useEffect, useRef, useState } from "react";
import type { PoleKey } from "@/lib/poles";

export function useActivePole(initial: PoleKey = "nettoyage") {
  const [activePoleKey, setActivePoleKey] = useState<PoleKey>(initial);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mapRef = useRef<Map<PoleKey, HTMLElement>>(new Map());

  if (typeof window !== "undefined" && !observerRef.current) {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const key = (entry.target as HTMLElement).dataset.poleKey as
              | PoleKey
              | undefined;
            if (key) setActivePoleKey(key);
          }
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0 },
    );
  }

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  const registerPanel = useCallback(
    (key: PoleKey, el: HTMLElement | null) => {
      const map = mapRef.current;
      const observer = observerRef.current;
      const prev = map.get(key);
      if (el) {
        if (prev === el) return;
        if (prev) observer?.unobserve(prev);
        map.set(key, el);
        observer?.observe(el);
      } else if (prev) {
        observer?.unobserve(prev);
        map.delete(key);
      }
    },
    [],
  );

  return { activePoleKey, registerPanel };
}
