import { Check } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { SubPoleFormula } from "@/lib/sub-poles";

interface Props {
  formulas: SubPoleFormula[];
}

const SubPoleFormules = ({ formulas }: Props) => {
  return (
    <section
      role="region"
      aria-labelledby="sub-pole-formules-title"
      className="relative bg-surface-bg py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mx-auto text-center mb-14">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              Nos solutions
            </span>
            <h2
              id="sub-pole-formules-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary"
              style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
            >
              Des formules{" "}
              <span style={{ color: "var(--pole-color)" }}>adaptées à vos besoins.</span>
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {formulas.map((f) => (
            <FadeInWhenVisible key={f.title}>
              <div
                className={`relative rounded-3xl border shadow-soft-md p-8 h-full transition-all duration-300 ${
                  f.isHighlighted
                    ? "lg:scale-105 shadow-soft-lg"
                    : "bg-surface-card border-border-subtle hover:shadow-soft-lg"
                }`}
                style={
                  f.isHighlighted
                    ? {
                        background: "rgba(var(--pole-color-rgb), 0.05)",
                        borderColor: "rgba(var(--pole-color-rgb), 0.4)",
                      }
                    : undefined
                }
              >
                {f.badge && (
                  <span
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-semibold"
                    style={{ background: "var(--pole-color)" }}
                  >
                    {f.badge}
                  </span>
                )}
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-muted mb-3">
                  {f.category}
                </div>
                <h3 className="font-display text-xl font-semibold text-text-primary mb-3">
                  {f.title}
                </h3>
                <p className="text-text-secondary text-[15px] leading-relaxed mb-6">
                  {f.description}
                </p>
                <ul className="space-y-3 list-none p-0">
                  {f.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-[14px] text-text-secondary">
                      <Check
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: "var(--pole-color)" }}
                        aria-hidden="true"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubPoleFormules;
