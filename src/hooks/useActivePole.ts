import { useCallback, useEffect, useRef, useState } from "react";
import type { PoleKey } from "@/lib/poles";

export function useActivePole(initial: PoleKey = "nettoyage") {
  const [activePoleKey, setActivePoleKey] = useState<PoleKey>(initial);
  const panelsRef = useRef<Map<PoleKey, HTMLElement>>(new Map());
  const rafRef = useRef<number | null>(null);
  const lastKeyRef = useRef<PoleKey>(initial);

  const registerPanel = useCallback(
    (key: PoleKey, el: HTMLElement | null) => {
      if (el) {
        panelsRef.current.set(key, el);
      } else {
        panelsRef.current.delete(key);
      }
    },
    [],
  );

  useEffect(() => {
    const update = () => {
      rafRef.current = null;

      if (panelsRef.current.size === 0) return;

      const viewportCenter = window.innerHeight / 2;
      let closestKey: PoleKey | null = null;
      let closestDistance = Infinity;

      panelsRef.current.forEach((el, key) => {
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestKey = key;
        }
      });

      if (closestKey !== null && closestKey !== lastKeyRef.current) {
        lastKeyRef.current = closestKey;
        setActivePoleKey(closestKey);
      }
    };

    const onScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    const initialTimer = setTimeout(onScroll, 0);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(initialTimer);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { activePoleKey, registerPanel };
}
