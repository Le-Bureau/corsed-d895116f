import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const STATS = [
  { value: "Sans", accent: "·", suffix: "engagement", label: "Aucune exclusivité, aucun quota" },
  { value: "Conditions", accent: "·", suffix: "claires", label: "Discutées en amont, signées avant" },
  { value: "Toute", accent: "·", suffix: "la Corse", label: "Couverture île entière" },
];

const PartenairesHero = () => {
  return (
    <section data-header-bg="dark"
      role="region"
      aria-labelledby="partenaires-hero-title"
      className="relative isolate overflow-hidden bg-surface-darker text-text-on-dark pt-40 pb-24 lg:pt-48 lg:pb-32"
    >
      {/* Ambient mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(168,192,212,0.28) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 80% 70%, rgba(79,111,142,0.32) 0%, transparent 55%)",
        }}
      />
      {/* Subtle grid noise */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, white 0 1px, transparent 1px 3px)," +
            "repeating-linear-gradient(90deg, white 0 1px, transparent 1px 3px)",
        }}
      />

      <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-logo-base" aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-on-dark-muted">
            Programme partenaires
          </span>
        </div>

        {/* Title */}
        <h1
          id="partenaires-hero-title"
          className="font-display font-semibold tracking-[-0.03em] leading-[0.98] mb-8 max-w-[1080px]"
          style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
        >
          <span className="text-text-on-dark">Recommandez,</span>
          <br />
          <span className="text-logo-base">on s'occupe du reste.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-text-on-dark-muted max-w-[640px] leading-relaxed mb-10"
          style={{ fontSize: "clamp(17px, 1.5vw, 21px)" }}
        >
          Vous croisez régulièrement des clients qui auraient besoin d'un service drone
          professionnel ? Présentez-les-nous. Pour chaque mission signée grâce à votre
          recommandation, vous touchez une commission, sans engagement de votre part.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#candidature"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white text-surface-darker font-semibold text-[15px] px-7 py-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 whitespace-nowrap"
            style={{
              boxShadow:
                "0 0 0 1px rgba(168,192,212,0.4), 0 0 24px rgba(168,192,212,0.35), 0 8px 24px rgba(168,192,212,0.25)",
            }}
          >
            Nous rejoindre
            <ArrowRight className="w-4 h-4 text-logo-deep transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>

          <a
            href="#fonctionnement"
            className="inline-flex items-center justify-center gap-2 rounded-full glass-light text-text-on-dark font-medium text-[15px] px-7 py-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 whitespace-nowrap"
          >
            Comment ça marche
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-12 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-[760px]">
          {STATS.map((s) => (
            <div key={s.suffix}>
              <div
                className="font-display font-semibold leading-[1.05] tracking-[-0.02em] mb-2"
                style={{ fontSize: "clamp(28px, 3.4vw, 40px)" }}
              >
                {s.value} <span className="text-logo-base">{s.accent}</span> {s.suffix}
              </div>
              <div className="text-[13px] text-text-on-dark-muted leading-relaxed">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartenairesHero;
