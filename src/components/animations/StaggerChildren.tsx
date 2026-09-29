import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const ENTER_OFFSET = 36;

interface Props {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export const fadeUpItem: Variants = {
  // Plain function variant: offset is dropped when the user prefers reduced
  // motion (read from the media query at animation time — client only).
  hidden: () => ({
    opacity: 0,
    y: prefersReducedMotion() ? 0 : ENTER_OFFSET,
    transition: { duration: 0 },
  }),
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function prefersReducedMotion() {
  return typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export const fadeOnlyItem: Variants = {
  hidden: { opacity: 0, transition: { duration: 0 } },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

const StaggerChildren = ({
  children,
  className,
  staggerDelay = 0.08,
  initialDelay = 0,
}: Props) => {
  const reduced = useReducedMotion();
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={container}
      initial={false}
      animate={isVisible ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export default StaggerChildren;
