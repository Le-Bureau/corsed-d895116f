import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const FadeInWhenVisible = ({ children, className, delay = 0, duration = 0.6 }: Props) => {
  const { ref, isVisible, reduced } = useScrollReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={isVisible ? (reduced ? { opacity: 1 } : { opacity: 1, y: 0 }) : reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
