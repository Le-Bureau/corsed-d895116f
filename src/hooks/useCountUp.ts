import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  decimals?: number;
  threshold?: number;
}

export function useCountUp({
  end,
  duration = 1500,
  decimals = 0,
  threshold = 0.4,
}: UseCountUpOptions) {
  const [value, setValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (hasStarted || !elementRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted, threshold]);

  useEffect(() => {
    if (!hasStarted) return;
    if (prefersReducedMotion) {
      setValue(end);
      return;
    }
    const startTime = performance.now();
    let raf = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(end * eased);
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, end, duration, prefersReducedMotion]);

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  return { value: formatted, ref: elementRef };
}

export function formatWithSpaces(num: number | string): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Parse a stat value string for count-up.
 * Returns null if the value is a range / non-animatable text.
 * Returns { number, prefix, suffix } if it can be animated.
 *
 * Examples:
 *  "30"        → { number: 30, prefix: "", suffix: "" }
 *  "-90"       → { number: 90, prefix: "-", suffix: "" }
 *  "5000"      → { number: 5000, prefix: "", suffix: "" }
 *  "5 000"     → { number: 5000, prefix: "", suffix: "" }
 *  "120+"      → { number: 120, prefix: "", suffix: "+" }
 *  "+10 à 15"  → null (range)
 *  "2-3"       → null (range)
 *  "0"         → null (zero, skip)
 */
export function parseAnimatableStat(
  value: string,
): { number: number; prefix: string; suffix: string } | null {
  if (/à/.test(value)) return null;
  const cleaned = value.replace(/\s/g, "");
  if (/\d-\d/.test(cleaned)) return null;
  const match = cleaned.match(/^([+-]?)(\d+(?:\.\d+)?)([+a-zA-Z%]*)$/);
  if (!match) return null;
  const n = parseFloat(match[2]);
  if (n === 0) return null;
  return { number: n, prefix: match[1], suffix: match[3] };
}
