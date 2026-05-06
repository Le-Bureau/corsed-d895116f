import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import StaggerChildren, { fadeUpItem } from "@/components/animations/StaggerChildren";

const CTAFinalSection = () => {
  return (
    <section
      data-header-bg="dark"
      role="region"
      aria-labelledby="cta-final-title"
      className="relative bg-surface-darker text-text-on-dark overflow-hidden isolate py-28 lg:py-36"
    >
      {/* Mesh ambient — 4 pole colors */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 15% 30%, rgba(80,130,172,0.30) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 85% 25%, rgba(244,166,12,0.20) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 80% 80%, rgba(163,51,51,0.22) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 20% 85%, rgba(63,122,56,0.22) 0%, transparent 55%)",
        }}
      />
      {/* Noise overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, white 0 1px, transparent 1px 3px)," +
            "repeating-linear-gradient(90deg, white 0 1px, transparent 1px 3px)",
        }}
      />

      <StaggerChildren staggerDelay={0.08} className="relative z-[5] max-w-[900px] mx-auto px-5 sm:px-10 text-center">
        <motion.span
          variants={fadeUpItem}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.12] backdrop-blur-md font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-on-dark-muted mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-logo-base shadow-[0_0_12px_rgba(168,192,212,0.8)]" />
          Passons à l'action
        </motion.span>

        <motion.h2
          variants={fadeUpItem}
          id="cta-final-title"
          className="font-display font-semibold text-text-on-dark text-[clamp(44px,6vw,76px)] leading-[1.05] tracking-[-0.035em] mb-6"
        >
          Prêt à prendre{" "}
          <span className="text-logo-base">de la hauteur ?</span>
        </motion.h2>

        <motion.p
          variants={fadeUpItem}
          className="text-lg leading-relaxed text-text-on-dark-muted max-w-[600px] mx-auto mb-10"
        >
          Que vous soyez particulier ou professionnel, nous avons une
          solution drone adaptée à vos besoins.
        </motion.p>

        <motion.div
          variants={fadeUpItem}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white text-surface-darker text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{
              boxShadow:
                "0 0 0 1px rgba(168,192,212,0.4), 0 0 32px rgba(168,192,212,0.4), 0 8px 28px rgba(168,192,212,0.25)",
            }}
          >
            Demander un devis gratuit
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/partenaires"
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/[0.05] border border-white/[0.16] text-text-on-dark text-sm font-medium backdrop-blur-md hover:bg-white/[0.12] transition-all duration-300"
          >
            Devenir partenaire
          </Link>
        </motion.div>
      </StaggerChildren>
    </section>
  );
};

export default CTAFinalSection;
