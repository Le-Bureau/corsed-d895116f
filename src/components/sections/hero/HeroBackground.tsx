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
      <AnimatePresence mode="popLayout" custom={direction} initial={false}>
        {heroImage && (
          <motion.img
            key={currentPole.key}
            src={heroImage}
            alt=""
            aria-hidden
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

      {/* Layer 1 — Mesh gradient */}
      <motion.div
        animate={meshControls}
        className="absolute"
        style={{
          inset: "-5%",
          opacity: heroImage ? 0.55 : 0.85,
          mixBlendMode: heroImage ? "multiply" : undefined,
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

      {/* Layer 4 — SVG flight paths */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 1920 1080"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
        >
          <motion.path
            key={`p1-${currentIndex}`}
            d="M -100 700 Q 480 200, 960 480 T 2020 380"
            stroke="white"
            strokeOpacity={0.4}
            strokeWidth={1.2}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition}
          />
          <motion.path
            d="M 1920 100 Q 1440 600, 800 700 T -100 950"
            stroke="white"
            strokeOpacity={0.5}
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeDasharray="4 8"
            fill="none"
            initial={{ opacity: 0 }}
            animate={
              reduced
                ? { opacity: 1 }
                : { opacity: 1, strokeDashoffset: [0, -200] }
            }
            transition={
              reduced
                ? { duration: 0 }
                : {
                    opacity: { duration: 1, ease: EASE },
                    strokeDashoffset: {
                      duration: 30,
                      ease: "linear",
                      repeat: Infinity,
                    },
                  }
            }
          />
          <motion.path
            key={`p3-${currentIndex}`}
            d="M 200 950 Q 600 880, 900 920 T 1500 880"
            stroke="white"
            strokeOpacity={0.25}
            strokeWidth={1.2}
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={pathTransition}
          />
          <circle cx={960} cy={480} r={3} fill="white" opacity={0.9} />
          <circle cx={800} cy={700} r={2} fill="white" opacity={0.5} />
        </svg>
      </div>
    </div>
  );
};

export default HeroBackground;
