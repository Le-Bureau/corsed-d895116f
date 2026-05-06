import { AnimatePresence, motion } from "motion/react";
import { useHeroCarousel } from "@/hooks/useHeroCarousel";
import { POLES } from "@/lib/poles";
import HeroBackground from "./hero/HeroBackground";
import HeroSlideContent from "./hero/HeroSlideContent";
import HeroPagination from "./hero/HeroPagination";
import HeroNavButtons from "./hero/HeroNavButtons";
import HeroStatCard from "./hero/HeroStatCard";
import HeroProgressBar from "./hero/HeroProgressBar";

const HeroCarousel = () => {
  const {
    currentIndex,
    currentPole,
    direction,
    goToNext,
    goToPrev,
    goToIndex,
  } = useHeroCarousel();

  const nextPole = POLES[(currentIndex + 1) % POLES.length];

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

      {/* Ghost of next pole — peeks from the right edge */}
      <div className="hidden lg:flex absolute inset-0 z-[5] items-center justify-end pr-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={nextPole.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display font-semibold tracking-[-0.04em] leading-[0.95] whitespace-nowrap select-none text-text-on-dark"
            style={{
              fontSize: "clamp(80px, 11vw, 180px)",
              transform: "translateX(18%)",
              textShadow: "0 2px 18px rgba(0,0,0,0.45)",
            }}
            aria-hidden="true"
          >
            {nextPole.label}
          </motion.span>
        </AnimatePresence>
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
