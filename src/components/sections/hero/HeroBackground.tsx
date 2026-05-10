import { useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useAnimationControls,
  useReducedMotion,
} from "motion/react";
import type { CarouselDirection } from "@/hooks/useHeroCarousel";
import { POLES } from "@/lib/poles";

const EASE = [0.16, 1, 0.3, 1] as const;

interface HeroBackgroundProps {
  currentIndex: number;
  direction: CarouselDirection;
}

const HeroBackground = ({ currentIndex, direction }: HeroBackgroundProps) => {
  const reduced = useReducedMotion();
  const meshControls = useAnimationControls();

  // Preload all hero images once
  useEffect(() => {
    POLES.forEach((p) => {
      if (p.heroImage) {
        const img = new Image();
        img.src = p.heroImage;
      }
    });
  }, []);

  useEffect(() => {
    if (reduced) return;
    const sign = direction === "next" ? -1 : 1;
    meshControls.start({
      scale: [1, 1.04, 1],
      x: [`0%`, `${sign * 1.5}%`, `0%`],
      transition: { duration: 1.2, ease: EASE, times: [0, 0.5, 1] },
    });
  }, [currentIndex, direction, meshControls, reduced]);

  const pathTransition = reduced
    ? { duration: 0 }
    : { duration: 2.2, ease: EASE };

  const currentPole = POLES[currentIndex];
  const heroImage = currentPole?.heroImage;

  const imageVariants = {
    enter: (dir: CarouselDirection) => ({
      opacity: 0,
      x: reduced ? "0%" : dir === "next" ? "3%" : "-3%",
      scale: reduced ? 1 : 1.05,
    }),
    center: {
      opacity: 1,
      x: "0%",
      scale: 1,
      transition: reduced
        ? { opacity: { duration: 1.1, ease: EASE } }
        : {
            opacity: { duration: 1.1, ease: EASE },
            x: { duration: 1.5, ease: EASE },
            scale: { duration: 1.5, ease: EASE },
          },
    },
    exit: (dir: CarouselDirection) => ({
      opacity: 0,
      x: reduced ? "0%" : dir === "next" ? "-3%" : "3%",
      scale: reduced ? 1 : 1.05,
      transition: reduced
        ? { opacity: { duration: 1.1, ease: EASE } }
        : {
            opacity: { duration: 1.1, ease: EASE },
            x: { duration: 1.5, ease: EASE },
            scale: { duration: 1.5, ease: EASE },
          },
    }),
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Layer 0 — Pole photo (when available), with directional drift crossfade */}
      <AnimatePresence custom={direction} initial={false}>
        {heroImage && (
          <motion.img
            key={currentPole.key}
            src={heroImage}
            alt=""
            aria-hidden
            // @ts-expect-error fetchpriority is a valid HTML attribute, supported by browsers
            fetchpriority="high"
            decoding="async"
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ willChange: "transform, opacity" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </AnimatePresence>

      {/* Layer 1 — Mesh gradient (only when no hero image) */}
      <motion.div
        animate={meshControls}
        className="absolute"
        style={{
          inset: "-5%",
          opacity: heroImage ? 0 : 0.85,
          display: heroImage ? "none" : undefined,
          background:
            "radial-gradient(at 20% 30%, var(--pole-base) 0%, transparent 55%)," +
            "radial-gradient(at 80% 20%, var(--pole-deep) 0%, transparent 50%)," +
            "radial-gradient(at 70% 80%, var(--pole-base) 0%, transparent 60%)," +
            "radial-gradient(at 30% 70%, var(--pole-deep) 0%, transparent 55%)," +
            "var(--surface-darker)",
        }}
      />

      {/* Layer 2 — Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,8,17,0.55) 0%, rgba(5,8,17,0.15) 30%, rgba(5,8,17,0.85) 100%)," +
            "radial-gradient(ellipse at center, transparent 0%, rgba(5,8,17,0.4) 100%)",
        }}
      />

      {/* Layer 3 — Noise */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.03,
          mixBlendMode: "overlay",
          backgroundImage:
            "repeating-linear-gradient(0deg, white 0, white 1px, transparent 1px, transparent 3px)," +
            "repeating-linear-gradient(90deg, white 0, white 1px, transparent 1px, transparent 3px)",
        }}
      />

    </div>
  );
};

export default HeroBackground;
