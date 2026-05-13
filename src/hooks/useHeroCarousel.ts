import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { POLES, type Pole } from "@/lib/poles";

export type CarouselDirection = "next" | "prev";

const TOTAL = POLES.length;
const AUTOROTATE_MS = 6000;

export interface UseHeroCarousel {
  currentIndex: number;
  currentPole: Pole;
  direction: CarouselDirection;
  goToNext: () => void;
  goToPrev: () => void;
  goToIndex: (i: number) => void;
  isPaused: boolean;
}

export function useHeroCarousel(): UseHeroCarousel {
  const prefersReduced = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<CarouselDirection>("next");

  const goToNext = useCallback(() => {
    setDirection("next");
    setCurrentIndex((i) => (i + 1) % TOTAL);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection("prev");
    setCurrentIndex((i) => (i - 1 + TOTAL) % TOTAL);
  }, []);

  const goToIndex = useCallback((target: number) => {
    setCurrentIndex((current) => {
      if (target === current) return current;
      const forward = (target - current + TOTAL) % TOTAL;
      const backward = (current - target + TOTAL) % TOTAL;
      setDirection(forward <= backward ? "next" : "prev");
      return target;
    });
  }, []);

  const isPaused = !!prefersReduced;

  // Auto-rotate — restarts on every index/pause change.
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = window.setInterval(goToNext, AUTOROTATE_MS);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isPaused, currentIndex, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTypingTarget =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (isTypingTarget) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goToNext, goToPrev]);

  return {
    currentIndex,
    currentPole: POLES[currentIndex],
    direction,
    goToNext,
    goToPrev,
    goToIndex,
    isPaused,
  };
}
