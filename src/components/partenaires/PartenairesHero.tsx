import { ArrowRight } from "lucide-react";
import { useLenis } from "@/components/SmoothScrollProvider";

const STATS = [
  { value: "Sans", accent: "·", suffix: "engagement", label: "Aucune exclusivité, aucun quota" },
  { value: "Conditions", accent: "·", suffix: "claires", label: "Discutées en amont, signées avant" },
  { value: "Toute", accent: "·", suffix: "la Corse", label: "Couverture île entière" },
];

const PartenairesHero = () => {
  const lenis = useLenis();

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, { duration: 1.6, offset: -80 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <section
      role="region"
      aria-labelledby="partenaires-hero-title"
      className="relative isolate overflow-hidden bg-surface-bg pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      {/* Subtle ambient mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(168,192,212,0.20) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 80% 70%, rgba(80,130,172,0.12) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10">
        {/* Eyebrow */}
        <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-logo-base shadow-[0_0_12px_rgba(168,192,212,0.5)]" />
          Programme partenaires
        </span>

        {/* Title */}
        <h1
          id="partenaires-hero-title"
          className="font-display font-semibold tracking-[-0.03em] leading-[0.98] mb-8 max-w-[1080px] text-text-primary"
          style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
        >
          Recommandez,
          <br />
          <span className="text-logo-base-deep">on s'occupe du reste.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-text-secondary max-w-[640px] leading-relaxed mb-10"
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
            onClick={(event) => handleAnchorClick(event, "candidature")}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-logo-base-deep text-white font-semibold text-[15px] px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
            style={{
              boxShadow:
                "0 0 0 1px rgba(168,192,212,0.4), 0 8px 28px rgba(168,192,212,0.30)",
            }}
          >
            Nous rejoindre
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>

          <a
            href="#fonctionnement"
            onClick={(event) => handleAnchorClick(event, "fonctionnement")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border-default bg-transparent text-text-primary font-medium text-[15px] px-7 py-3.5 transition-all duration-300 hover:bg-surface-card hover:border-text-primary hover:-translate-y-0.5 whitespace-nowrap"
          >
            Comment ça marche
          </a>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-12 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-[760px]">
          {STATS.map((s) => (
            <div key={s.suffix}>
              <div
                className="font-display font-semibold leading-[1.05] tracking-[-0.02em] text-text-primary mb-2"
                style={{ fontSize: "clamp(28px, 3.4vw, 40px)" }}
              >
                {s.value} <span className="text-logo-base-deep">{s.accent}</span> {s.suffix}
              </div>
              <div className="text-[13px] text-text-muted leading-relaxed">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartenairesHero;
