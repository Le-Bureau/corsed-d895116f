import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { Pole } from "@/lib/poles";
import { LaunchAlertPopup } from "@/components/popups/LaunchAlertPopup";

interface Props {
  pole: Pole;
}

const PoleFinalCTA = ({ pole }: Props) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const href = pole.isInDevelopment
    ? `#`
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
      {/* Ambient pole-color mesh background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 20% 30%, rgba(var(--pole-color-rgb), 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 80% 50% at 80% 70%, rgba(var(--pole-color-rgb), 0.06) 0%, transparent 60%)
          `,
        }}
      />

      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div
            className="relative max-w-[1100px] mx-auto bg-surface-card border border-border-subtle rounded-[32px] shadow-soft-xl px-8 py-14 lg:px-20 lg:py-24 overflow-hidden isolate"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--surface-card)) 0%, rgba(var(--pole-color-rgb), 0.04) 100%)",
            }}
          >
            {/* Inner subtle pole-color glow */}
            <div
              aria-hidden="true"
              className="absolute -top-20 -right-20 w-[400px] h-[400px] -z-10 rounded-full opacity-40 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(var(--pole-color-rgb), 0.20) 0%, transparent 70%)",
              }}
            />

            <div className="text-center max-w-[720px] mx-auto relative">
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-7">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--pole-color)" }}
                  aria-hidden="true"
                />
                {pole.isInDevelopment ? "Bientôt disponible" : "On en parle ?"}
              </span>
              <h2
                id="pole-finalcta-title"
                className="font-display font-semibold tracking-[-0.035em] leading-[1.05] mb-6 text-text-primary"
                style={{ fontSize: "clamp(36px, 4.4vw, 56px)" }}
              >
                {title}
              </h2>
              <p className="text-[18px] leading-[1.55] text-text-muted mb-10 max-w-[600px] mx-auto">
                {subtitle}
              </p>
              <Link
                to={href}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-[15px] font-semibold text-white transition-all duration-300 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={
                  {
                    background: "var(--pole-color)",
                    boxShadow:
                      "0 4px 14px rgba(var(--pole-color-rgb), 0.30), 0 12px 32px rgba(var(--pole-color-rgb), 0.20)",
                    "--tw-ring-color": "rgba(var(--pole-color-rgb), 0.40)",
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(var(--pole-color-rgb), 0.40), 0 20px 48px rgba(var(--pole-color-rgb), 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow =
                    "0 4px 14px rgba(var(--pole-color-rgb), 0.30), 0 12px 32px rgba(var(--pole-color-rgb), 0.20)";
                }}
              >
                <span>{label}</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </Link>
              <p className="text-xs text-text-muted mt-6">
                Réponse sous 24h ouvrées. Visite et devis offerts.
              </p>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default PoleFinalCTA;
