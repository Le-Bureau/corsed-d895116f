import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

const PolesIntro = () => {
  return (
    <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10 pt-24 lg:pt-32 pb-16 lg:pb-20">
      <FadeInWhenVisible>
        <div className="glass-light-strong inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6">
          <span
            className="block h-1.5 w-1.5 rounded-full bg-logo-base"
            style={{ boxShadow: "0 0 8px rgba(168,192,212,0.8)" }}
          />
          <span className="text-xs uppercase tracking-[0.18em] text-text-on-dark-muted">
            4 pôles d'expertise
          </span>
        </div>
        <h2 className="font-display font-semibold text-text-on-dark text-[clamp(40px,5.5vw,76px)] leading-[1.05] tracking-[-0.035em] max-w-[880px] mb-6">
          Une réponse spécifique à chaque besoin aérien.
        </h2>
        <p className="text-lg leading-relaxed text-text-on-dark-muted max-w-[600px]">
          De l'entretien de bâtiments à la logistique de chantier, en passant
          par le diagnostic technique et l'agriculture de précision, nos quatre
          pôles couvrent l'essentiel des usages drone professionnels en Corse.
        </p>
      </FadeInWhenVisible>
    </div>
  );
};

export default PolesIntro;
