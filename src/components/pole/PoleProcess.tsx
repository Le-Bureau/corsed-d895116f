import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { ProcessStep } from "@/lib/poles";

interface Props {
  steps: ProcessStep[];
}

const PoleProcess = ({ steps }: Props) => {
  return (
    <section
      data-header-bg="dark"
      role="region"
      aria-labelledby="pole-process-title"
      className="relative bg-surface-dark text-text-on-dark py-16 lg:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <div className="inline-flex items-center gap-2 mb-5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-on-dark-muted">
                Notre processus
              </span>
            </div>
            <h2
              id="pole-process-title"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.05] mb-5"
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
                <div
                  className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8 p-6 lg:p-7 rounded-2xl border border-white/10 transition-colors duration-300"
                  style={{
                    background: "rgba(10,14,26,0.4)",
                    backdropFilter: "blur(28px) saturate(180%)",
                    WebkitBackdropFilter: "blur(28px) saturate(180%)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--pole-color-rgb), 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                  }}
                >
                  <div
                    className="font-mono text-[11px] tracking-[0.18em] uppercase md:w-24 flex-shrink-0 md:pt-1"
                    style={{ color: "var(--pole-color)" }}
                  >
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-[20px] lg:text-[22px] font-semibold tracking-[-0.01em] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-text-on-dark-muted">
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
