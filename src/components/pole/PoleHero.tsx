import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Pole } from "@/lib/poles";

interface Props {
  pole: Pole;
}

const PoleHero = ({ pole }: Props) => {
  const ctaHref = pole.isInDevelopment
    ? `/contact?type=alerte-lancement&pole=${pole.key}`
    : `/contact?expertise=${pole.key}`;
  const ctaLabel = pole.isInDevelopment ? "Être prévenu du lancement" : "Demander un devis";

  return (
    <section
      data-header-bg="dark"
      role="region"
      aria-labelledby="pole-hero-title"
      className="relative isolate overflow-hidden bg-surface-darker text-text-on-dark pt-40 pb-24 lg:pt-48 lg:pb-32 min-h-[80vh] flex items-center"
    >
      {/* Background image */}
      {pole.heroImage && (
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img
            src={pole.heroImage}
            alt=""
            className="w-full h-full object-cover opacity-40"
            style={{ objectPosition: pole.mobileImagePosition || "center" }}
          />
        </div>
      )}
      {/* Dark gradient overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,14,26,0.6) 0%, rgba(10,14,26,0.85) 60%, rgba(10,14,26,0.95) 100%)",
        }}
      />
      {/* Pole color mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none mix-blend-overlay"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(var(--pole-color-rgb), 0.5) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 80% 70%, rgba(var(--pole-color-rgb), 0.35) 0%, transparent 55%)",
        }}
      />
      {/* Decorative SVG flight path */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 z-[3] w-full h-full pointer-events-none opacity-30"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M -50 600 Q 360 200 720 400 T 1500 250"
          stroke="rgba(var(--pole-color-rgb), 0.6)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <path
          d="M -50 700 Q 480 500 900 600 T 1500 450"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      </svg>

      <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10 w-full">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-8">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--pole-color)" }}
            aria-hidden="true"
          />
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-on-dark-muted">
            {pole.heroPoleNumber || `PÔLE`}
            {" — "}
            <span style={{ color: "var(--pole-color)" }}>
              {pole.isInDevelopment ? "DÉVELOPPEMENT EN COURS" : "DISPONIBLE"}
            </span>
          </span>
        </div>

        <h1
          id="pole-hero-title"
          className="font-display font-semibold tracking-[-0.03em] leading-[0.98] mb-6 max-w-[1080px]"
          style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
        >
          {pole.label}
        </h1>

        {pole.pitch && (
          <p
            className="font-display tracking-[-0.01em] mb-6 max-w-[820px]"
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
            className="text-text-on-dark-muted max-w-[720px] leading-relaxed mb-10"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)" }}
          >
            {pole.heroPitch}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={ctaHref}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white text-surface-darker font-semibold text-[15px] px-7 py-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 motion-reduce:hover:transform-none whitespace-nowrap"
            style={{
              boxShadow:
                "0 0 0 1px rgba(var(--pole-color-rgb), 0.4), 0 0 24px rgba(var(--pole-color-rgb), 0.35), 0 8px 24px rgba(var(--pole-color-rgb), 0.25)",
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
              className="inline-flex items-center justify-center gap-2 rounded-full glass-light text-text-on-dark font-medium text-[15px] px-7 py-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 motion-reduce:hover:transform-none whitespace-nowrap"
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
