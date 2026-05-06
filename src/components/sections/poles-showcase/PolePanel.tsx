import { useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { POLES, type Pole, type PoleKey } from "@/lib/poles";

interface Props {
  pole: Pole;
  isActive: boolean;
  registerPanel: (key: PoleKey, el: HTMLElement | null) => void;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const PANEL_TITLES: Record<Pole["key"], string> = {
  nettoyage: "Nettoyage par drone",
  diagnostic: "Diagnostic & inspection",
  agriculture: "Agriculture de précision",
  transport: "Transport aérien",
};

const PolePanel = ({ pole, isActive, registerPanel }: Props) => {
  const reduced = useReducedMotion();
  const indexZeroPad = String(
    POLES.findIndex((p) => p.key === pole.key) + 1,
  ).padStart(2, "0");

  const setRef = useCallback(
    (el: HTMLElement | null) => registerPanel(pole.key, el),
    [registerPanel, pole.key],
  );

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-darker";

  return (
    <article
      ref={setRef}
      data-pole-key={pole.key}
      aria-current={isActive || undefined}
      className="min-h-0 py-6 lg:min-h-screen lg:flex lg:items-center lg:py-20"
    >
      <motion.div
        animate={
          reduced
            ? { scale: 1 }
            : {
                scale: isActive ? 1 : 0.99,
                boxShadow: isActive
                  ? `0 0 0 1px ${pole.baseColorOnDark}4D, 0 30px 80px ${pole.baseColorOnDark}26, 0 30px 80px rgba(0, 0, 0, 0.3)`
                  : `0 0 0 1px rgba(255, 255, 255, 0.06), 0 10px 30px -10px rgba(0, 0, 0, 0.4)`,
              }
        }
        transition={{ duration: 0.6, ease: EASE }}
        className="glass-light-strong relative w-full rounded-[28px] p-8 lg:p-12 overflow-hidden"
      >
        {/* Mobile-only image at top of card */}
        {pole.showcaseImage && (
          <div className="lg:hidden -mx-8 -mt-8 mb-6 h-[320px] relative">
            <img
              src={pole.showcaseImage}
              alt={pole.label}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ objectPosition: pole.mobileImagePosition ?? "center" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, transparent 70%, rgba(10,14,26,0.6) 100%)",
              }}
            />
          </div>
        )}
        {/* Eyebrow */}
        <div className="glass-light inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 mb-6 text-[11px] font-semibold tracking-[0.18em] uppercase text-text-on-dark-muted">
          <span
            className="block h-2 w-2 rounded-full"
            style={{
              background: pole.baseColorOnDark,
              boxShadow: `0 0 8px ${pole.baseColorOnDark}cc`,
            }}
          />
          <span>
            Pôle {indexZeroPad} — {pole.comingSoon ? "Prochainement" : "Disponible"}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display font-semibold text-text-on-dark text-[clamp(36px,4.2vw,56px)] leading-[1.05] tracking-[-0.035em] mb-3">
          {PANEL_TITLES[pole.key]}
        </h3>

        {/* Pitch */}
        <p className="text-[19px] leading-relaxed text-text-on-dark opacity-90 mb-5">
          {pole.pitch}
        </p>

        {/* Description */}
        <p className="text-[15px] leading-relaxed text-text-on-dark-muted mb-7">
          {pole.description}
        </p>

        {/* Highlights */}
        <ul className="flex flex-wrap gap-2 mb-7">
          {pole.highlights.map((h) => (
            <li
              key={h}
              className="glass-light inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium text-text-on-dark"
            >
              <Check size={14} style={{ color: pole.baseColorOnDark }} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Sub-services */}
        <div className="mb-8 py-[18px] border-t border-b border-white/10">
          <div className="text-[11px] font-semibold tracking-[0.18em] uppercase text-text-on-dark-muted mb-3">
            {pole.comingSoon ? "Sous-services prévus" : "Sous-services"}
          </div>
          <ul className="flex flex-col gap-0.5">
            {pole.subServices.map((s) => {
              const content = (
                <>
                  <span className="text-sm font-medium text-text-on-dark">
                    {s.name}
                  </span>
                  {s.slug && (
                    <ArrowRight
                      size={16}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-text-on-dark-muted group-hover:text-text-on-dark"
                    />
                  )}
                </>
              );
              if (s.slug) {
                return (
                  <li key={s.name}>
                    <Link
                      to={`/pole/${pole.slug}/${s.slug}`}
                      className={`group flex justify-between items-center px-3 py-2.5 -mx-3 rounded-lg hover:bg-white/[0.04] transition-colors ${focusRing}`}
                    >
                      {content}
                    </Link>
                  </li>
                );
              }
              return (
                <li key={s.name}>
                  <div className="flex justify-between items-center px-3 py-2.5 -mx-3 rounded-lg">
                    {content}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex gap-3 flex-wrap">
          <Link
            to="/contact"
            className={`group inline-flex items-center gap-2 rounded-full bg-text-on-dark text-surface-darker px-6 py-3.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${focusRing}`}
          >
            <span>
              {pole.comingSoon ? "Être informé du lancement" : "Demander un devis"}
            </span>
            <ArrowRight size={14} />
          </Link>
          {!pole.comingSoon && (
            <Link
              to={`/pole/${pole.slug}`}
              className={`glass-light inline-flex items-center gap-2 rounded-full border border-white/[0.16] px-6 py-3.5 text-sm font-medium text-text-on-dark transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.13] ${focusRing}`}
            >
              Découvrir le pôle
            </Link>
          )}
        </div>
      </motion.div>
    </article>
  );
};

export default PolePanel;
