import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import type { Pole } from "@/lib/poles";
import type { CarouselDirection } from "@/hooks/useHeroCarousel";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const EASE_IN = [0.7, 0, 0.84, 0] as const;

interface HeroSlideContentProps {
  pole: Pole;
  index: number;
  direction: CarouselDirection;
}

const HeroSlideContent = ({ pole, index, direction }: HeroSlideContentProps) => {
  const reduced = useReducedMotion();

  const slideVariants: Variants = {
    enter: (dir: CarouselDirection) => ({
      x: reduced ? 0 : dir === "next" ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: EASE_OUT,
        staggerChildren: reduced ? 0 : 0.08,
        delayChildren: 0,
        when: "beforeChildren",
      },
    },
    exit: (dir: CarouselDirection) => ({
      x: reduced ? 0 : dir === "next" ? -60 : 60,
      opacity: 0,
      transition: { duration: 0.35, ease: EASE_IN },
    }),
  };

  const childVariants: Variants = {
    enter: { y: reduced ? 0 : 20, opacity: 0 },
    center: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: EASE_OUT },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const titleContainerVariants: Variants = {
    enter: (dir: CarouselDirection) => ({
      x: reduced ? 0 : dir === "next" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: EASE_OUT },
    },
    exit: (dir: CarouselDirection) => ({
      x: reduced ? 0 : dir === "next" ? "-100%" : "100%",
      opacity: 0,
      transition: { duration: 0.5, ease: EASE_IN },
    }),
  };

  const paddedIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      key={pole.key}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      aria-live="polite"
      className="absolute inset-0 z-10 flex items-center"
    >
      <div className="w-full px-5 md:pl-[clamp(120px,11vw,180px)] md:pr-[clamp(120px,11vw,180px)]">
        <div className="w-full max-w-[780px]">
          {/* Compensating spacer for eyebrow moved to title track (md+ only) */}
          <div
            aria-hidden="true"
            className="hidden md:block"
            style={{ height: "calc(13px * 1.2 + 1rem + 0.75rem)" }}
          />

          {/* Title rendered by HeroCarousel's persistent track. Reserve space. */}
          <div
            aria-hidden="true"
            style={{ height: "clamp(70px, 14vw, 180px)" }}
            className="mb-14 md:mb-8"
          />
          <h1 className="sr-only">{pole.label}</h1>

          {/* Subtitle */}
          <motion.p
            variants={childVariants}
            className="text-lg leading-relaxed text-text-on-dark-muted max-w-[580px] mb-12"
          >
            {pole.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:flex-wrap items-stretch sm:items-center"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-text-on-dark px-8 py-4 text-[15px] font-semibold text-surface-darker transition-transform duration-200 hover:-translate-y-0.5 w-full sm:w-auto"
            >
              Demander un devis
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to={`/pole/${pole.slug}`}
              className="group inline-flex items-center justify-center sm:justify-start gap-2 text-[14px] sm:text-[15px] font-medium text-text-on-dark py-3 px-6 rounded-full border border-white/40 sm:border-0 sm:py-4 sm:px-8 sm:glass-light sm:hover:bg-white/[0.14] transition-all duration-200 sm:hover:-translate-y-0.5"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
            >
              Découvrir le pôle
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSlideContent;
