import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useHeroCarousel } from "@/hooks/useHeroCarousel";
import { POLES } from "@/lib/poles";
import HeroBackground from "./hero/HeroBackground";
import HeroSlideContent from "./hero/HeroSlideContent";
import HeroPagination from "./hero/HeroPagination";
import HeroNavButtons from "./hero/HeroNavButtons";
import HeroStatCard from "./hero/HeroStatCard";
import HeroProgressBar from "./hero/HeroProgressBar";

const EASE = [0.16, 1, 0.3, 1] as const;

const HeroCarousel = () => {
  const {
    currentIndex,
    currentPole,
    direction,
    goToNext,
    goToPrev,
    goToIndex,
  } = useHeroCarousel();
  const reduced = useReducedMotion();

  // Continuous horizontal title track: each slot = 70% of container,
  // active slot left-aligned to content (no centering shift).
  const slotPct = 70; // % of container width per slot
  const trackOffsetPct = -currentIndex * slotPct;

  return (
    <div
      role="region"
      aria-label="Présentation des pôles d'expertise"
      className="relative w-full h-screen min-h-[100dvh] overflow-hidden bg-surface-darker text-text-on-dark"
      style={
        {
          "--pole-base": currentPole.baseColorOnDark,
          "--pole-deep": currentPole.deepColor,
          transition:
            "--pole-base 1500ms cubic-bezier(0.16,1,0.3,1), --pole-deep 1500ms cubic-bezier(0.16,1,0.3,1)",
        } as React.CSSProperties
      }
    >
      <HeroBackground currentIndex={currentIndex} direction={direction} />

      {/* Persistent horizontal title TRACK (carousel rotation feel) */}
      <div
        className="absolute inset-x-0 z-[8] pointer-events-none flex items-center"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          height: "clamp(120px, 16vw, 200px)",
        }}
        aria-hidden="true"
      >
        <div className="relative w-full h-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full flex items-center"
            style={{ width: `${POLES.length * slotPct}%` }}
            animate={{ x: reduced ? 0 : `${trackOffsetPct}%` }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            {POLES.map((pole, i) => {
              const isActive = i === currentIndex;
              return (
                <div
                  key={pole.key}
                  className="flex-shrink-0 h-full flex items-center px-5 md:px-10"
                  style={{ width: `${100 / POLES.length}%` }}
                >
                  <span
                    className={`font-display font-semibold tracking-[-0.035em] leading-[0.95] whitespace-nowrap text-text-on-dark text-[clamp(56px,8vw,128px)] transition-opacity duration-700 ease-out ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 lg:opacity-[0.18]"
                    }`}
                    style={{
                      textShadow: isActive
                        ? "none"
                        : "0 2px 18px rgba(0,0,0,0.45)",
                    }}
                  >
                    {pole.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <HeroSlideContent
          key={currentPole.key}
          pole={currentPole}
          index={currentIndex}
          direction={direction}
        />
      </AnimatePresence>

      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <HeroStatCard key={currentPole.key} pole={currentPole} direction={direction} />
      </AnimatePresence>

      <HeroNavButtons onPrev={goToPrev} onNext={goToNext} />
      <HeroPagination currentIndex={currentIndex} onSelect={goToIndex} />
      <HeroProgressBar currentIndex={currentIndex} total={POLES.length} />
    </div>
  );
};

export default HeroCarousel;
