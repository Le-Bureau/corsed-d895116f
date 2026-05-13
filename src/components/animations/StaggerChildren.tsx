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
  hidden: { opacity: 0, y: ENTER_OFFSET },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const fadeOnlyItem: Variants = {
  hidden: { opacity: 0 },
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
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

export default StaggerChildren;
