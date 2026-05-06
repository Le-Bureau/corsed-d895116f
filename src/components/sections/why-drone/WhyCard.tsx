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
        className="group relative p-7 lg:p-10 rounded-3xl backdrop-blur-[28px] saturate-[1.8] border border-white/10 bg-[rgba(10,14,26,0.4)] overflow-hidden transition-[border-color,box-shadow] duration-[400ms] ease-out-expo hover:border-white/[0.18] hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] h-full"
      >
        {/* Top accent gradient */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[200px] pointer-events-none transition-opacity duration-[400ms] ease-out-expo opacity-15 group-hover:opacity-25"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, #A8C0D4 0%, transparent 70%)",
          }}
        />

        {/* Index */}
        <span className="absolute top-6 right-7 font-mono text-[11px] font-medium tracking-[0.1em] text-white/30">
          {reason.index}
        </span>

        {/* Icon */}
        <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/[0.12] text-logo-base mb-6">
          <Icon className="w-[22px] h-[22px]" aria-hidden="true" />
        </div>

        {/* Title */}
        <h3 className="relative font-display text-[28px] font-semibold tracking-[-0.025em] leading-[1.1] text-text-on-dark mb-4">
          {reason.title}
        </h3>

        {/* Description */}
        <p className="relative text-[15px] leading-relaxed text-text-on-dark-muted mb-7">
          {reason.description}
        </p>

        {/* Proof point */}
        <div className="relative flex items-baseline gap-2 pt-6 border-t border-white/[0.08] w-full">
          <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-logo-base leading-none">
            {reason.proofValue}
          </span>
          <span className="text-[13px] text-text-on-dark-muted">
            {reason.proofLabel}
          </span>
        </div>
      </motion.article>
    </FadeInWhenVisible>
  );
};

export default WhyCard;
