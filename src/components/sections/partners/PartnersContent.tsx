import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "motion/react";
import StaggerChildren, { fadeUpItem } from "@/components/animations/StaggerChildren";

const HIGHLIGHTS = [
  "Commission sur chaque mission concrétisée",
  "Tarifs préférentiels sur nos prestations",
  "Accord simple, sans exclusivité",
];

const PartnersContent = () => {
  return (
    <StaggerChildren staggerDelay={0.08} className="flex flex-col items-start text-left max-w-[640px] mx-auto">
      {/* Eyebrow */}
      <motion.span
        variants={fadeUpItem}
        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-logo-base shadow-[0_0_12px_rgba(168,192,212,0.5)]" />
        Programme partenaires
      </motion.span>

      {/* Title */}
      <motion.h2
        variants={fadeUpItem}
        id="partners-section-title"
        className="font-display text-[40px] lg:text-[52px] font-semibold tracking-[-0.03em] leading-[1.05] mb-6 text-text-primary"
      >
        Votre réseau,{" "}
        <span className="text-logo-base-deep">notre expertise.</span>
      </motion.h2>

      {/* Pitch */}
      <motion.p
        variants={fadeUpItem}
        className="text-[16px] lg:text-[17px] leading-relaxed text-text-secondary mb-8"
      >
        Vous êtes couvreur, commercial indépendant, agent immobilier ou
        architecte ? Rejoignez le réseau Corse Drone et touchez une commission
        sur chaque affaire que vous nous apportez.
      </motion.p>

      {/* Highlights */}
      <ul className="flex flex-col gap-3 mb-10 w-full">
        {HIGHLIGHTS.map((h) => (
          <motion.li
            key={h}
            variants={fadeUpItem}
            className="inline-flex items-center gap-3 text-[15px] text-text-primary"
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-logo-base/15 text-logo-base-deep flex-shrink-0">
              <Check className="w-3.5 h-3.5" aria-hidden="true" strokeWidth={3} />
            </span>
            {h}
          </motion.li>
        ))}
      </ul>

      {/* CTA */}
      <motion.div variants={fadeUpItem}>
        <Link
          to="/partenaires"
          aria-label="En savoir plus sur le programme partenaires"
          className="group inline-flex items-center gap-2 px-7 py-4 rounded-full bg-logo-base-deep text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
          style={{ boxShadow: "0 0 0 1px rgba(168,192,212,0.4), 0 8px 28px rgba(168,192,212,0.30)" }}
        >
          En savoir plus
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </StaggerChildren>
  );
};

export default PartnersContent;
