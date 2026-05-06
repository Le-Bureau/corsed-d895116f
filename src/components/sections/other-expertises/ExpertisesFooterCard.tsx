import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

const ExpertisesFooterCard = () => {
  return (
    <FadeInWhenVisible>
      <div className="mt-20 p-7 lg:p-10 rounded-3xl bg-surface-card border border-border-subtle shadow-soft-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex-1">
          <h3 className="font-display text-2xl lg:text-3xl font-semibold tracking-[-0.02em] text-text-primary mb-2">
            Un besoin spécifique en tête ?
          </h3>
          <p className="text-base text-text-muted">
            Toutes nos prestations s'adaptent à votre cahier des charges.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-logo-base-deep text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 flex-shrink-0"
          style={{ boxShadow: "0 0 0 1px rgba(168,192,212,0.4), 0 8px 28px rgba(168,192,212,0.30)" }}
        >
          Demander un devis
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </FadeInWhenVisible>
  );
};

export default ExpertisesFooterCard;
