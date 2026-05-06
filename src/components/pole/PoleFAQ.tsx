import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { PoleFAQItem } from "@/lib/poles";

interface Props {
  items: PoleFAQItem[];
}

const PoleFAQ = ({ items }: Props) => {
  return (
    <section
      role="region"
      aria-labelledby="pole-faq-title"
      className="relative bg-surface-elevated py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid lg:grid-cols-[400px_1fr] xl:grid-cols-[440px_1fr] gap-12 lg:gap-20 items-start">
          {/* Left column - sticky */}
          <FadeInWhenVisible>
            <div className="lg:sticky lg:top-32">
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--pole-color)" }}
                  aria-hidden="true"
                />
                Questions fréquentes
              </span>
              <h2
                id="pole-faq-title"
                className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary mb-5"
                style={{ fontSize: "clamp(36px, 4vw, 52px)" }}
              >
                Vos questions,{" "}
                <span style={{ color: "var(--pole-color)" }}>
                  nos réponses.
                </span>
              </h2>
              <p className="text-[16px] leading-[1.6] text-text-muted mb-8">
                Tout ce qu'il faut savoir avant de lancer un projet. Si votre
                question n'est pas listée, on en parle directement par
                téléphone.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md"
                style={
                  {
                    color: "var(--pole-color)",
                    "--tw-ring-color": "rgba(var(--pole-color-rgb), 0.40)",
                  } as React.CSSProperties
                }
              >
                <span>Une autre question ?</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </FadeInWhenVisible>

          {/* Right column - accordions */}
          <div className="flex flex-col gap-3">
            {items.map(({ question, answer }) => (
              <details
                key={question}
                className="group/accordion bg-surface-card border border-border-subtle rounded-2xl shadow-soft-sm overflow-hidden transition-all duration-200 hover:shadow-soft-md"
                onToggle={(e) => {
                  const el = e.currentTarget as HTMLDetailsElement;
                  el.style.borderColor = el.open
                    ? "rgba(var(--pole-color-rgb), 0.30)"
                    : "";
                }}
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 font-display text-[16px] font-semibold text-text-primary tracking-[-0.01em] transition-colors duration-200 [&::-webkit-details-marker]:hidden">
                  <span>{question}</span>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-open/accordion:rotate-180"
                    strokeWidth={2}
                    style={{ color: "var(--pole-color)" }}
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-6 pb-5 pt-1">
                  <p className="text-[15px] leading-[1.65] text-text-secondary">
                    {answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoleFAQ;
