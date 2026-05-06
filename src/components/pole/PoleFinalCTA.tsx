import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { Pole } from "@/lib/poles";

interface Props {
  pole: Pole;
}

const PoleFinalCTA = ({ pole }: Props) => {
  const href = pole.isInDevelopment
    ? `/contact?type=alerte-lancement&pole=${pole.key}`
    : `/contact?expertise=${pole.key}`;
  const label = pole.finalCTAButtonLabel || "Demander un devis";
  const title = pole.finalCTATitle || "Un projet en tête ?";
  const subtitle =
    pole.finalCTASubtitle || "Parlons-en. Nous revenons vers vous rapidement.";

  return (
    <section
      role="region"
      aria-labelledby="pole-finalcta-title"
      className="relative bg-surface-bg py-24 lg:py-32 overflow-hidden isolate"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(var(--pole-color-rgb), 0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-[5] max-w-[800px] mx-auto px-5 sm:px-10 text-center">
        <FadeInWhenVisible>
          <div className="rounded-3xl bg-surface-card border border-border-subtle shadow-soft-lg p-10 lg:p-16">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              {pole.isInDevelopment ? "Bientôt disponible" : "On en parle ?"}
            </span>
            <h2
              id="pole-finalcta-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] mb-5 text-text-primary"
              style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
            >
              {title}
            </h2>
            <p
              className="text-text-secondary mx-auto leading-relaxed mb-10 max-w-[560px]"
              style={{ fontSize: "clamp(15px, 1.3vw, 18px)" }}
            >
              {subtitle}
            </p>
            <Link
              to={href}
              className="group inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold text-[15px] px-7 py-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 motion-reduce:hover:transform-none"
              style={{
                background: "var(--pole-color)",
                boxShadow:
                  "0 0 0 1px rgba(var(--pole-color-rgb), 0.4), 0 0 24px rgba(var(--pole-color-rgb), 0.35), 0 8px 24px rgba(var(--pole-color-rgb), 0.25)",
              }}
            >
              {label}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default PoleFinalCTA;
