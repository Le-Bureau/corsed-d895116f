import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useLenis } from "@/components/SmoothScrollProvider";
import { POLES, type Pole } from "@/lib/poles";
import { hexToRgb } from "@/lib/utils";

interface Props {
  pole: Pole;
}

function getPoleIndex(key: string): number {
  return POLES.findIndex((p) => p.key === key);
}
function getNextPole(key: string): Pole {
  const i = getPoleIndex(key);
  return POLES[(i + 1) % POLES.length];
}
function getPrevPole(key: string): Pole {
  const i = getPoleIndex(key);
  return POLES[(i - 1 + POLES.length) % POLES.length];
}

const EASE = [0.16, 1, 0.3, 1] as const;

const PoleHero = ({ pole }: Props) => {
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const ctaHref = pole.isInDevelopment
    ? `/contact?type=alerte-lancement&pole=${pole.key}`
    : `/contact?expertise=${pole.key}`;
  const ctaLabel = pole.isInDevelopment ? "Être prévenu du lancement" : "Demander un devis";

  const currentIndex = getPoleIndex(pole.key);
  const nextPole = getNextPole(pole.key);
  const prevPole = getPrevPole(pole.key);

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.6, offset: -80 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    history.replaceState(null, "", `#${id}`);
  };

  const initialX = reduced ? 0 : 200;
  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, x: initialX },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.9, delay: 0.3 + delay, ease: EASE },
  });

  const prevColor = prevPole.baseColorOnLight;
  const nextColor = nextPole.baseColorOnLight;

  return (
    <section
      role="region"
      aria-labelledby="pole-hero-title"
      className="relative isolate overflow-hidden bg-surface-bg pt-28 pb-16 lg:pt-48 lg:pb-32"
    >
      {/* MOBILE-ONLY: image zone on top */}
      {pole.heroImage && (
        <div className="lg:hidden relative w-full aspect-[4/3] overflow-hidden -mt-28 mb-8">
          <img
            src={pole.heroImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: pole.mobileImagePosition || "center" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, hsl(var(--surface-bg)) 100%)",
            }}
          />
        </div>
      )}

      {/* DESKTOP-ONLY: full-bleed bg image */}
      {pole.heroImage && (
        <div className="hidden lg:block absolute inset-0 z-0" aria-hidden="true">
          <img
            src={pole.heroImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: pole.mobileImagePosition || "center" }}
          />
        </div>
      )}

      {/* DESKTOP-ONLY: diagonal light gradient for legibility */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,247,250,0.95) 0%, rgba(245,247,250,0.80) 45%, rgba(245,247,250,0.55) 100%)",
        }}
      />

      {/* Pole-color mesh (both layouts) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(var(--pole-color-rgb), 0.10) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 80% 70%, rgba(var(--pole-color-rgb), 0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10 w-full">
        {/* Eyebrow */}
        <motion.span
          key={`${pole.key}-eyebrow`}
          {...fadeIn(0.05)}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-8"
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--pole-color)", boxShadow: "0 0 8px var(--pole-color)" }}
            aria-hidden="true"
          />
          {pole.heroPoleNumber || "PÔLE"}
          {" — "}
          <span style={{ color: "var(--pole-color)" }}>
            {pole.isInDevelopment ? "DÉVELOPPEMENT EN COURS" : "DISPONIBLE"}
          </span>
        </motion.span>

        {/* Title block with ghost of next pole */}
        <div className="relative overflow-visible">
          {/* Ghost of next pole */}
          <span
            aria-hidden="true"
            className="hidden lg:block absolute left-[min(42vw,560px)] top-1/2 z-0 pointer-events-none font-display font-bold tracking-[-0.04em] leading-[0.95] whitespace-nowrap select-none"
            style={{
              fontSize: "clamp(84px, 11vw, 168px)",
              color: "var(--pole-color)",
              opacity: 0.24,
              transform: "translateY(-50%)",
              textShadow: "0 2px 18px rgba(255, 255, 255, 0.55)",
              mixBlendMode: "multiply",
            }}
          >
            {nextPole.label}
          </span>

          <motion.h1
            key={`${pole.key}-title`}
            {...fadeIn(0.1)}
            id="pole-hero-title"
            className="relative z-10 font-display font-semibold tracking-[-0.035em] leading-[0.98] mb-6 max-w-[1080px] text-text-primary text-[44px] sm:text-[56px] lg:text-[clamp(56px,8vw,112px)]"
          >
            {pole.label}
          </motion.h1>
        </div>

        {pole.pitch && (
          <motion.p
            key={`${pole.key}-pitch`}
            {...fadeIn(0.2)}
            className="font-display font-semibold tracking-[-0.01em] mb-6 max-w-[820px]"
            style={{
              fontSize: "clamp(20px, 2.2vw, 30px)",
              color: "var(--pole-color)",
            }}
          >
            {pole.pitch}
          </motion.p>
        )}

        {pole.heroPitch && (
          <motion.p
            key={`${pole.key}-heropitch`}
            {...fadeIn(0.25)}
            className="text-text-secondary max-w-[720px] leading-relaxed mb-10"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)" }}
          >
            {pole.heroPitch}
          </motion.p>
        )}

        <motion.div
          key={`${pole.key}-ctas`}
          {...fadeIn(0.3)}
          className="flex flex-wrap items-center gap-3"
        >
          <Link
            to={ctaHref}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white text-text-primary font-semibold text-[15px] px-7 py-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 motion-reduce:hover:transform-none whitespace-nowrap"
            style={{
              boxShadow:
                "0 0 0 1px rgba(var(--pole-color-rgb), 0.4), 0 0 24px rgba(var(--pole-color-rgb), 0.25), 0 8px 24px rgba(var(--pole-color-rgb), 0.18)",
            }}
          >
            {ctaLabel}
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              style={{ color: "var(--pole-color)" }}
            />
          </Link>

          {pole.subServices && pole.subServices.length > 0 && (
            <a
              href="#sous-services"
              onClick={(e) => handleAnchor(e, "sous-services")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-default text-text-primary font-medium text-[15px] px-7 py-3.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-surface-card motion-reduce:hover:transform-none whitespace-nowrap"
            >
              Voir les sous-services
            </a>
          )}
        </motion.div>

        {/* Prev / Next pole navigation */}
        <motion.nav
          key={`${pole.key}-nav`}
          {...fadeIn(0.4)}
          aria-label="Navigation entre pôles"
          className="mt-16 lg:mt-24 pt-8 border-t border-border-subtle flex items-center justify-between gap-4"
        >
          <Link
            to={`/pole/${prevPole.key}`}
            className="group flex items-center gap-3 sm:gap-4 min-w-0 flex-1 max-w-[45%]"
            style={{ ["--pole-prev" as never]: prevColor, ["--pole-prev-rgb" as never]: hexToRgb(prevColor) }}
          >
            <span
              className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-border-default bg-white/60 backdrop-blur-sm transition-all duration-300 group-hover:-translate-x-1 group-hover:border-[var(--pole-prev)]"
            >
              <ArrowLeft className="w-4 h-4 text-text-primary transition-colors group-hover:text-[var(--pole-prev)]" />
            </span>
            <span className="min-w-0 flex flex-col text-left">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Précédent
              </span>
              <span className="truncate font-display font-semibold text-[15px] sm:text-[17px] text-text-primary group-hover:text-[var(--pole-prev)] transition-colors">
                {prevPole.label}
              </span>
            </span>
          </Link>

          <div className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted whitespace-nowrap">
            Pôle {String(currentIndex + 1).padStart(2, "0")} / {String(POLES.length).padStart(2, "0")}
          </div>

          <Link
            to={`/pole/${nextPole.key}`}
            className="group flex items-center justify-end gap-3 sm:gap-4 min-w-0 flex-1 max-w-[45%]"
            style={{ ["--pole-next" as never]: nextColor, ["--pole-next-rgb" as never]: hexToRgb(nextColor) }}
          >
            <span className="min-w-0 flex flex-col text-right">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Suivant
              </span>
              <span className="truncate font-display font-semibold text-[15px] sm:text-[17px] text-text-primary group-hover:text-[var(--pole-next)] transition-colors">
                {nextPole.label}
              </span>
            </span>
            <span
              className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center border border-border-default bg-white/60 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-1 group-hover:border-[var(--pole-next)]"
            >
              <ArrowRight className="w-4 h-4 text-text-primary transition-colors group-hover:text-[var(--pole-next)]" />
            </span>
          </Link>
        </motion.nav>
      </div>
    </section>
  );
};

export default PoleHero;
