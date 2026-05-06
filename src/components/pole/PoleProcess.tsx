import { motion, useReducedMotion } from "motion/react";
import type { ProcessStep } from "@/lib/poles";

interface Props {
  steps: ProcessStep[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

const TimelineStep = ({ step, index }: { step: ProcessStep; index: number }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: reduced ? 0.2 : 0.6,
        delay: reduced ? 0 : index * 0.1,
        ease: EASE,
      }}
      className="relative grid grid-cols-[auto_1fr] gap-4 md:gap-8 items-start"
    >
      <div
        className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-soft-md border-2 bg-surface-card"
        style={{ borderColor: "var(--pole-color)" }}
        aria-hidden="true"
      >
        <span
          className="font-display font-bold text-base"
          style={{ color: "var(--pole-color)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="bg-surface-card border border-border-subtle rounded-2xl p-6 lg:p-7 shadow-soft-sm hover:shadow-soft-md transition-shadow duration-300">
        <span
          className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase mb-2 block"
          style={{ color: "var(--pole-color)" }}
        >
          {step.number}
        </span>
        <h3 className="font-display text-xl lg:text-[22px] font-semibold text-text-primary mb-2 tracking-[-0.02em]">
          {step.title}
        </h3>
        <p className="text-text-secondary leading-relaxed text-[15px]">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

const PoleProcess = ({ steps }: Props) => {
  return (
    <section
      role="region"
      aria-labelledby="pole-process-title"
      className="relative bg-surface-elevated py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="text-center mb-20 lg:mb-24">
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
            className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary max-w-[800px] mx-auto"
            style={{ fontSize: "clamp(36px, 4.4vw, 56px)" }}
          >
            De l'étude{" "}
            <span style={{ color: "var(--pole-color)" }}>à la livraison.</span>
          </h2>
        </div>

        <div className="max-w-[920px] mx-auto relative">
          <div
            className="absolute left-6 md:left-7 top-7 bottom-7 w-[2px]"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, rgba(var(--pole-color-rgb), 0.30) 8%, rgba(var(--pole-color-rgb), 0.30) 92%, transparent 100%)",
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-8 lg:gap-10">
            {steps.map((step, i) => (
              <TimelineStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoleProcess;
