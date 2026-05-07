import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useHeroCarousel } from "@/hooks/useHeroCarousel";
import { POLES } from "@/lib/poles";
import HeroBackground from "./hero/HeroBackground";
import HeroSlideContent from "./hero/HeroSlideContent";
import HeroPagination from "./hero/HeroPagination";
import HeroNavButtons from "./hero/HeroNavButtons";
import HeroStatCard from "./hero/HeroStatCard";
import HeroProgressBar from "./hero/HeroProgressBar";
import BrandLogo from "@/components/layout/BrandLogo";

const EASE = [0.65, 0, 0.35, 1] as const;
const TOTAL = POLES.length;

function getTitleProps(
  index: number,
  currentIndex: number,
  viewportWidth: number,
  isMobile: boolean,
  ghostShiftPx: number,
) {
  let diff = index - currentIndex;
  if (diff > TOTAL / 2) diff -= TOTAL;
  if (diff < -TOTAL / 2) diff += TOTAL;

  const shiftLeftOut = viewportWidth * 0.6;
  const ghostScale = isMobile ? 0.5 : 0.55;
  const fallbackShift = isMobile ? viewportWidth * 2 : viewportWidth * 0.42;

  if (diff === 0) {
    return { x: 0, opacity: 1, scale: 1, isGhost: false };
  }
  if (diff === 1) {
    return {
      x: isMobile ? viewportWidth * 2 : ghostShiftPx || fallbackShift,
      opacity: isMobile ? 0 : 0.28,
      scale: ghostScale,
      isGhost: !isMobile,
    };
  }
  if (diff === -1) {
    return { x: -shiftLeftOut, opacity: 0, scale: 0.9, isGhost: false };
  }
  return { x: fallbackShift * 1.5, opacity: 0, scale: ghostScale, isGhost: false };
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
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [ghostShifts, setGhostShifts] = useState<number[]>([]);

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

  // Compute per-pole ghost x so the (scaled) ghost ends at the same right padding
  // as the active title's left padding inside the track wrapper.
  useEffect(() => {
    const compute = () => {
      const track = trackRef.current;
      if (!track) return;
      const trackWidth = track.getBoundingClientRect().width;
      const ghostScale = viewport.isMobile ? 0.5 : 0.55;
      const next = POLES.map((_, i) => {
        const el = titleRefs.current[i];
        if (!el) return 0;
        const labelWidth = el.scrollWidth;
        // Ghost is anchored left:0 inside track; after scale (origin left bottom),
        // its visual right edge sits at labelWidth * scale.
        // We want right edge = trackWidth, so x = trackWidth - labelWidth * scale.
        return Math.max(0, trackWidth - labelWidth * ghostScale);
      });
      setGhostShifts(next);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [viewport]);

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

      <div className="absolute top-24 md:top-28 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:block">
        <BrandLogo className="h-32 md:h-44 lg:h-52 w-auto ml-0" />
      </div>

      {/* Title rotation track — all titles always mounted, animated together.
          Mirrors HeroSlideContent's full layout (eyebrow + title + mb-8 + pitch + mb-12 + CTAs)
          with invisible spacers so flex items-center aligns the title slot
          exactly with HeroSlideContent's title slot. */}
      <div className="absolute inset-0 z-20 flex items-center pointer-events-none">
        <div className="w-full px-5 md:pl-[clamp(120px,11vw,180px)] md:pr-[clamp(120px,11vw,180px)]">
          <div className="w-full max-w-[780px]">
            {/* Spacer matches eyebrow: text-[13px] line-height ~1.2 + py-2 (1rem) + mb-7 (1.75rem) */}
            <div aria-hidden="true" style={{ height: "calc(13px * 1.2 + 1rem + 1.75rem)" }} />
            <div
              className="relative w-full"
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
                className={`absolute inset-0 flex items-center left-0 whitespace-nowrap font-display font-semibold text-text-on-dark ${
                  isGhost
                    ? "cursor-pointer pointer-events-auto"
                    : "pointer-events-none"
                }`}
                style={{
                  fontSize: "clamp(42px, 7vw, 110px)",
                  letterSpacing: "-0.035em",
                  lineHeight: 1,
                  transformOrigin: isGhost ? "left bottom" : "left center",
                  textShadow:
                    "0 2px 20px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.4)",
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
            {/* Spacers below title to mirror HeroSlideContent's flex centering:
                mb-8 (2rem) + subtitle (~3 lines text-lg leading-relaxed ≈ 5.25rem) + mb-12 (3rem)
                + CTAs (py-4 + 15px text ≈ 3.125rem) */}
            <div aria-hidden="true" style={{ height: "calc(2rem + 5.25rem + 3rem + 3.125rem)" }} />
          </div>
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

      <HeroNavButtons currentIndex={currentIndex} onPrev={goToPrev} onNext={goToNext} />
      <HeroPagination currentIndex={currentIndex} onSelect={goToIndex} />
      <HeroProgressBar currentIndex={currentIndex} total={POLES.length} />
    </div>
  );
};

export default HeroCarousel;
