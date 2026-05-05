import { useCallback, useEffect, useRef, useState } from "react";
import type { PoleKey } from "@/lib/poles";

export function useActivePole(initial: PoleKey = "nettoyage") {
  const [activePoleKey, setActivePoleKey] = useState<PoleKey>(initial);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const mapRef = useRef<Map<PoleKey, HTMLElement>>(new Map());

  if (typeof window !== "undefined" && !observerRef.current) {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter(
          (e) =>
            e.isIntersecting &&
            e.target instanceof HTMLElement &&
            e.target.dataset.poleKey,
        );
        if (intersecting.length === 0) return;

        const viewportCenter = window.innerHeight / 2;
        let best: IntersectionObserverEntry | null = null;
        let bestDistance = Infinity;
        for (const entry of intersecting) {
          const rect = entry.boundingClientRect;
          const center = rect.top + rect.height / 2;
          const distance = Math.abs(center - viewportCenter);
          if (distance < bestDistance) {
            bestDistance = distance;
            best = entry;
          }
        }
        if (best && best.target instanceof HTMLElement) {
          const key = best.target.dataset.poleKey as PoleKey;
          setActivePoleKey(key);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
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
