import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { ProcessStep } from "@/lib/poles";

interface Props {
  steps: ProcessStep[];
}

const PoleProcess = ({ steps }: Props) => {
  return (
    <section
      role="region"
      aria-labelledby="pole-process-title"
      className="relative bg-surface-elevated py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              Notre processus
            </span>
            <h2
              id="pole-process-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              De l'étude{" "}
              <span style={{ color: "var(--pole-color)" }}>à la livraison.</span>
            </h2>
          </div>
        </FadeInWhenVisible>

        <ol className="max-w-[920px] space-y-3 list-none p-0">
          {steps.map((step) => (
            <li key={step.number}>
              <FadeInWhenVisible>
                <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8 p-6 lg:p-7 rounded-2xl bg-surface-card border border-border-subtle shadow-soft-sm hover:shadow-soft-md transition-all duration-300">
                  <div
                    className="font-mono text-[11px] tracking-[0.18em] uppercase font-semibold md:w-24 flex-shrink-0 md:pt-1"
                    style={{ color: "var(--pole-color)" }}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-[20px] lg:text-[22px] font-semibold tracking-[-0.01em] mb-2 text-text-primary">
                      {step.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeInWhenVisible>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default PoleProcess;
