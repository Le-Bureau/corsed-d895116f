import { motion, useReducedMotion } from "motion/react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { Reason } from "@/lib/whyReasons";

interface Props {
  reason: Reason;
  delay?: number;
}

const WhyCard = ({ reason, delay = 0 }: Props) => {
  const reduced = useReducedMotion();
  const Icon = reason.icon;

  return (
    <FadeInWhenVisible delay={delay}>
      <motion.article
        whileHover={reduced ? undefined : { y: -4 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="hover-border-card group relative p-7 lg:p-10 rounded-3xl bg-surface-card border border-border-subtle shadow-soft-md hover:shadow-soft-lg transition-all duration-300 ease-out h-full overflow-hidden"
      >
        {/* Index */}
        <span className="absolute top-6 right-7 font-mono text-[11px] font-medium tracking-[0.1em] text-text-muted/60">
          {reason.index}
        </span>

        {/* Icon tile */}
        <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-logo-base/10 border border-logo-base/25 text-logo-base-deep mb-6">
          <Icon className="w-[22px] h-[22px]" aria-hidden="true" />
        </div>

        {/* Title */}
        <h3 className="relative font-display text-[28px] font-semibold tracking-[-0.025em] leading-[1.1] text-text-primary mb-4">
          {reason.title}
        </h3>

        {/* Description */}
        <p className="relative text-[15px] leading-relaxed text-text-secondary mb-7">
          {reason.description}
        </p>

        {/* Proof point */}
        <div className="relative flex items-baseline gap-2 pt-6 border-t border-border-subtle w-full">
          <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-logo-base-deep leading-none">
            {reason.proofValue}
          </span>
          <span className="text-[13px] text-text-muted">
            {reason.proofLabel}
          </span>
        </div>
      </motion.article>
    </FadeInWhenVisible>
  );
};

export default WhyCard;
