import { motion, useReducedMotion, type Variants } from "motion/react";
import type { Pole } from "@/lib/poles";
import type { CarouselDirection } from "@/hooks/useHeroCarousel";

const EASE = [0.16, 1, 0.3, 1] as const;

interface HeroStatCardProps {
  pole: Pole;
  direction: CarouselDirection;
}

const HeroStatCard = ({ pole, direction }: HeroStatCardProps) => {
  const reduced = useReducedMotion();

  const variants: Variants = {
    enter: (dir: CarouselDirection) => ({
      x: reduced ? 0 : dir === "next" ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: EASE, delay: 0.15 },
    },
    exit: (dir: CarouselDirection) => ({
      x: reduced ? 0 : dir === "next" ? -30 : 30,
      opacity: 0,
      transition: { duration: 0.4 },
    }),
  };

  return (
    <motion.div
      key={pole.key}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="hidden md:block absolute bottom-8 right-5 md:right-10 z-[15] glass-light-strong rounded-2xl px-6 py-4 min-w-[220px]"
    >
      <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-text-on-dark-muted mb-2">
        {pole.statLabel}
      </div>
      <div
        className="font-display text-[38px] font-semibold leading-none tracking-[-0.03em] mb-1"
        style={{
          color: "var(--pole-base)",
          transition: "color 1500ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {pole.statValue}
      </div>
      <div className="text-xs text-text-on-dark-muted leading-snug">
        {pole.statDetail}
      </div>
    </motion.div>
  );
};

export default HeroStatCard;
