import { useCallback, useEffect, useRef, useState } from "react";
import type { PoleKey } from "@/lib/poles";

export function useActivePole(initial: PoleKey = "nettoyage") {
  const [activePoleKey, setActivePoleKey] = useState<PoleKey>(initial);
  const [version, setVersion] = useState(0);
  const mapRef = useRef<Map<PoleKey, HTMLElement>>(new Map());

  const registerPanel = useCallback(
    (key: PoleKey, el: HTMLElement | null) => {
      const map = mapRef.current;
      if (el) {
        if (map.get(key) === el) return;
        map.set(key, el);
      } else {
        if (!map.has(key)) return;
        map.delete(key);
      }
      setVersion((v) => v + 1);
    },
    [],
  );

  useEffect(() => {
    const elements = Array.from(mapRef.current.entries());
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
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
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 },
    );

    elements.forEach(([, el]) => observer.observe(el));
    return () => observer.disconnect();
  }, [version]);

  return { activePoleKey, registerPanel };
}
