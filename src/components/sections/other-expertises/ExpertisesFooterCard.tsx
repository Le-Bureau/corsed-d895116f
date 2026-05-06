import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

const ExpertisesFooterCard = () => {
  return (
    <FadeInWhenVisible>
      <div className="mt-20 p-7 lg:p-10 rounded-3xl glass-light-strong flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold tracking-[-0.02em] mb-1.5">
            Un besoin spécifique en tête ?
          </h3>
          <p className="text-sm text-text-on-dark-muted">
            Toutes nos prestations s'adaptent à votre cahier des charges.
          </p>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-text-on-dark text-surface-darker text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 flex-shrink-0"
        >
          Demander un devis
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </FadeInWhenVisible>
  );
};

export default ExpertisesFooterCard;
