import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

const EASE = [0.16, 1, 0.3, 1] as const;

const FooterCtaBlock = () => {
  const reduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0 } },
  };

  const make = (y: number, delay: number): Variants => ({
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE, delay: reduced ? 0 : delay },
    },
  });

  return (
    <FadeInWhenVisible className="border-b border-white/[0.08] pb-16 md:pb-20 mb-12 md:mb-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12"
      >
        <div className="max-w-[600px]">
          <motion.div
            variants={make(8, 0.05)}
            className="inline-flex items-center gap-2.5 text-xs uppercase tracking-[0.18em] text-text-on-dark-muted mb-6"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: "var(--primary)",
                boxShadow: "0 0 12px var(--primary)",
              }}
            />
            <span>Prêt à prendre de la hauteur ?</span>
          </motion.div>
          <motion.h2
            variants={make(16, 0.15)}
            className="font-display font-semibold text-[clamp(38px,5vw,64px)] leading-[1.05] tracking-[-0.035em] text-text-on-dark"
          >
            Particulier ou professionnel, parlons de votre projet.
          </motion.h2>
        </div>

        <motion.div variants={make(12, 0.3)} className="flex-shrink-0 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-text-on-dark px-7 py-4 text-[15px] font-semibold text-surface-darker transition-transform duration-200 hover:-translate-y-0.5"
          >
            Demander un devis
            <ArrowRight size={16} />
          </Link>
          <a
            href="tel:0604501120"
            className="glass-light hover:bg-white/[0.14] inline-flex items-center rounded-full px-7 py-4 text-[15px] font-medium text-text-on-dark transition-all duration-200 hover:-translate-y-0.5"
          >
            06 04 50 11 20
          </a>
        </motion.div>
      </motion.div>
    </FadeInWhenVisible>
  );
};

export default FooterCtaBlock;
