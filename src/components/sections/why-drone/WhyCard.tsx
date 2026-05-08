import { motion, useReducedMotion } from "motion/react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { Reason } from "@/lib/whyReasons";

interface Props {
  reason: Reason;
  delay?: number;
}

const WhyCard = ({ reason, delay = 0 }: Props) => {
  const reduced = useReducedMotion();

  return (
    <FadeInWhenVisible delay={delay}>
      <motion.article
        whileHover={reduced ? undefined : { y: -4 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="hover-border-card group relative p-7 lg:p-10 rounded-3xl bg-surface-card border border-border-subtle shadow-soft-md hover:shadow-soft-lg transition-all duration-300 ease-out h-full overflow-hidden flex flex-col"
      >
        {/* Stat hero */}
        <div className="relative flex flex-col gap-3 mb-8">
          <span
            className="font-display text-text-primary"
            style={{
              fontWeight: 800,
              fontSize: "clamp(56px, 6vw, 88px)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {reason.statValue}
          </span>
          <span className="font-mono text-[11px] font-bold tracking-[0.18em] uppercase text-text-muted">
            {reason.statQualifier}
          </span>
        </div>

        {/* Divider */}
        <div className="relative h-px bg-border-subtle w-full mb-6" />

        {/* Title */}
        <h3 className="relative font-display text-[24px] lg:text-[26px] font-semibold tracking-[-0.025em] leading-[1.15] text-text-primary mb-4">
          {reason.title}
        </h3>

        {/* Description */}
        <p className="relative text-[15px] leading-relaxed text-text-secondary">
          {reason.description}
        </p>
      </motion.article>
    </FadeInWhenVisible>
  );
};

export default WhyCard;
