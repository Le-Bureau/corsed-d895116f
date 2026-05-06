import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { OTHER_EXPERTISES } from "@/lib/otherExpertises";

const ExpertisesHeader = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end mb-16 lg:mb-20">
      <FadeInWhenVisible>
        <div>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-light-strong text-xs uppercase tracking-[0.18em] text-text-on-dark-muted mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full bg-logo-base"
              style={{ boxShadow: "0 0 12px var(--logo-base)" }}
            />
            <span>Autres expertises</span>
          </div>
          <h2
            id="other-expertises-title"
            className="font-display font-semibold text-[clamp(40px,5.2vw,68px)] leading-[1.05] tracking-[-0.035em]"
          >
            La gamme complète au service du projet.
          </h2>
        </div>
      </FadeInWhenVisible>

      <FadeInWhenVisible>
        <div className="flex flex-col gap-4">
          <p className="text-[17px] leading-relaxed text-text-on-dark-muted">
            En plus des quatre pôles d'expertise, nous intervenons sur une gamme de prestations
            spécialisées disponibles sur devis. Chaque mission est cadrée selon vos besoins
            techniques.
          </p>
          <div className="inline-flex items-baseline gap-2 font-mono text-xs tracking-wider text-text-on-dark-muted mt-2">
            <span className="text-logo-base font-semibold">
              {String(OTHER_EXPERTISES.length).padStart(2, "0")}
            </span>
            <span className="opacity-40">/</span>
            <span>prestations actuellement disponibles</span>
          </div>
        </div>
      </FadeInWhenVisible>
    </div>
  );
};

export default ExpertisesHeader;
