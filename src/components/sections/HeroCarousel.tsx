import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useHeroCarousel } from "@/hooks/useHeroCarousel";
import { POLES } from "@/lib/poles";
import HeroBackground from "./hero/HeroBackground";
import HeroSlideContent from "./hero/HeroSlideContent";
import HeroPagination from "./hero/HeroPagination";
import HeroNavButtons from "./hero/HeroNavButtons";
import HeroStatCard from "./hero/HeroStatCard";
import HeroProgressBar from "./hero/HeroProgressBar";

const EASE = [0.65, 0, 0.35, 1] as const;
const TOTAL = POLES.length;

function getTitleProps(
  index: number,
  currentIndex: number,
  viewportWidth: number,
  isMobile: boolean,
) {
  let diff = index - currentIndex;
  if (diff > TOTAL / 2) diff -= TOTAL;
  if (diff < -TOTAL / 2) diff += TOTAL;

  const shiftRight = isMobile ? viewportWidth * 2 : viewportWidth * 0.78;
  const shiftLeftOut = viewportWidth * 0.6;
  const ghostScale = isMobile ? 0.5 : 0.55;

  if (diff === 0) {
    return { x: 0, opacity: 1, scale: 1, isGhost: false };
  }
  if (diff === 1) {
    return {
      x: shiftRight,
      opacity: isMobile ? 0 : 0.28,
      scale: ghostScale,
      isGhost: !isMobile,
    };
  }
  if (diff === -1) {
    return { x: -shiftLeftOut, opacity: 0, scale: 0.9, isGhost: false };
  }
  return { x: shiftRight * 1.5, opacity: 0, scale: ghostScale, isGhost: false };
}

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

  const [viewport, setViewport] = useState({ width: 1200, isMobile: false });

  useEffect(() => {
    const update = () =>
      setViewport({
        width: window.innerWidth,
        isMobile: window.innerWidth < 768,
      });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const duration = reduced ? 0.3 : 1.2;

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

      {/* Title rotation track — all titles always mounted, animated together.
          Positioned to align with HeroSlideContent's title placeholder. */}
      <div
        className="absolute inset-x-0 z-[8] px-5 md:px-10 pointer-events-none"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <div
          className="relative w-full max-w-[780px] mx-auto md:mx-0"
          style={{ height: "clamp(70px, 14vw, 180px)" }}
        >
          {POLES.map((pole, i) => {
            const { x, opacity, scale, isGhost } = getTitleProps(
              i,
              currentIndex,
              viewport.width,
              viewport.isMobile,
            );
            const isActive = i === currentIndex;
            return (
              <motion.div
                key={pole.key}
                role={isGhost ? "button" : undefined}
                tabIndex={isGhost ? 0 : -1}
                aria-hidden={!isActive ? "true" : undefined}
                aria-label={isGhost ? `Aller au pôle ${pole.label}` : undefined}
                onClick={isGhost ? () => goToIndex(i) : undefined}
                onKeyDown={
                  isGhost
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          goToIndex(i);
                        }
                      }
                    : undefined
                }
                onMouseEnter={(e) => {
                  if (!isGhost) return;
                  e.currentTarget.style.setProperty("--ghost-underline", "100%");
                  e.currentTarget.style.setProperty("--ghost-arrow-opacity", "0.9");
                  e.currentTarget.style.setProperty("--ghost-arrow-x", "0px");
                }}
                onMouseLeave={(e) => {
                  if (!isGhost) return;
                  e.currentTarget.style.setProperty("--ghost-underline", "0%");
                  e.currentTarget.style.setProperty("--ghost-arrow-opacity", "0");
                  e.currentTarget.style.setProperty("--ghost-arrow-x", "-12px");
                }}
                className={`absolute top-1/2 left-0 whitespace-nowrap font-display font-semibold text-text-on-dark ${
                  isGhost
                    ? "cursor-pointer pointer-events-auto"
                    : "pointer-events-none"
                }`}
                style={{
                  fontSize: "clamp(42px, 7vw, 110px)",
                  letterSpacing: "-0.035em",
                  lineHeight: 1,
                  transformOrigin: "left center",
                  textShadow:
                    "0 2px 20px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.4)",
                  y: "-50%",
                }}
                animate={{
                  x: reduced ? 0 : x,
                  opacity,
                  scale: reduced ? 1 : scale,
                }}
                transition={{ duration, ease: EASE }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25em", position: "relative" }}>
                  <span style={{ position: "relative", display: "inline-block" }}>
                    {pole.label}
                    {isGhost && (
                      <span
                        aria-hidden="true"
                        className="absolute left-0 bg-text-on-dark"
                        style={{
                          bottom: "0.08em",
                          height: "2px",
                          width: "var(--ghost-underline, 0%)",
                          transition: "width 0.45s cubic-bezier(0.65, 0, 0.35, 1)",
                        }}
                      />
                    )}
                  </span>
                  {isGhost && (
                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: "0.4em",
                        fontWeight: 400,
                        opacity: "var(--ghost-arrow-opacity, 0)",
                        transform: "translateX(var(--ghost-arrow-x, -12px))",
                        transition: "opacity 0.35s ease, transform 0.45s cubic-bezier(0.65, 0, 0.35, 1)",
                      }}
                    >
                      →
                    </span>
                  )}
                </span>
              </motion.div>
            );
          })}
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
