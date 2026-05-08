import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLenis } from "@/components/SmoothScrollProvider";
import { type Pole } from "@/lib/poles";
import { LaunchAlertPopup } from "@/components/popups/LaunchAlertPopup";

interface Props {
  pole: Pole;
}

const PoleHero = ({ pole }: Props) => {
  const lenis = useLenis();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const ctaHref = pole.isInDevelopment
    ? `#`
    : `/contact?expertise=${pole.key}`;
  const ctaLabel = pole.isInDevelopment ? "Être prévenu du lancement" : "Demander un devis";

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

  return (
    <section
      role="region"
      aria-labelledby="pole-hero-title"
      className="relative isolate overflow-hidden bg-surface-bg pt-32 pb-24 lg:pt-48 lg:pb-32"
    >
      {/* Full-bleed bg image */}
      {pole.heroImage && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src={pole.heroImage}
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition: pole.mobileImagePosition || "center" }}
          />
        </div>
      )}

      {/* Light gradient overlay — stronger on mobile for legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none lg:hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,247,250,0.94) 0%, rgba(245,247,250,0.82) 50%, rgba(245,247,250,0.70) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="hidden lg:block absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,247,250,0.95) 0%, rgba(245,247,250,0.80) 45%, rgba(245,247,250,0.55) 100%)",
        }}
      />

      {/* Pole-color mesh */}
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
        <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-8">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--pole-color)", boxShadow: "0 0 8px var(--pole-color)" }}
            aria-hidden="true"
          />
          <span style={{ color: "var(--pole-color)" }}>
            {pole.isInDevelopment ? "DÉVELOPPEMENT EN COURS" : "DISPONIBLE"}
          </span>
        </span>

        {/* Title — STATIC */}
        <h1
          id="pole-hero-title"
          className="relative z-10 font-display font-semibold tracking-[-0.035em] leading-[0.98] mb-6 max-w-[1080px] text-text-primary text-[44px] sm:text-[56px] lg:text-[clamp(56px,8vw,112px)]"
        >
          {pole.label}
        </h1>

        {pole.pitch && (
          <p
            className="font-display font-semibold tracking-[-0.01em] mb-6 max-w-[820px]"
            style={{
              fontSize: "clamp(20px, 2.2vw, 30px)",
              color: "var(--pole-color)",
            }}
          >
            {pole.pitch}
          </p>
        )}

        {pole.heroPitch && (
          <p
            className="text-text-secondary max-w-[720px] leading-relaxed mb-10"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)" }}
          >
            {pole.heroPitch}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
          <Link
            to={ctaHref}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white text-text-primary font-semibold text-[15px] px-7 py-4 sm:py-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 motion-reduce:hover:transform-none whitespace-nowrap w-full sm:w-auto"
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
              className="inline-flex items-center justify-center gap-2 rounded-full sm:border sm:border-border-default text-text-primary font-medium text-[14px] sm:text-[15px] px-7 py-2 sm:py-3.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 sm:hover:bg-surface-card motion-reduce:hover:transform-none whitespace-nowrap"
              style={{ color: "var(--pole-color)" }}
            >
              Voir les sous-services
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default PoleHero;
