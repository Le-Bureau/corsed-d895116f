import { AnimatePresence } from "motion/react";
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
