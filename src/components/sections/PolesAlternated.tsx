import { POLES } from "@/lib/poles";
import PoleRow from "./poles-alternated/PoleRow";

const PolesAlternated = () => {
  return (
    <section className="py-32 lg:py-48 bg-surface-bg">
      <div className="container max-w-[1280px] mx-auto px-5 lg:px-10">
        <div className="text-center mb-24 lg:mb-32">
          <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-logo-base shadow-[0_0_12px_rgba(168,192,212,0.5)]" />
            Nos pôles d'expertise
          </span>

          <h2 className="font-display font-semibold text-[clamp(36px,4.4vw,56px)] leading-[1.05] tracking-[-0.035em] mb-5 max-w-[800px] mx-auto text-text-primary">
            Quatre solutions,{" "}
            <span className="text-logo-base-deep">une seule flotte.</span>
          </h2>

          <p className="text-[17px] leading-[1.55] text-text-muted max-w-[640px] mx-auto">
            De l'entretien de bâtiments à la logistique de chantier, en passant
            par le diagnostic technique et l'agriculture de précision, nos
            quatre pôles couvrent l'essentiel des usages drone professionnels
            en Corse.
          </p>
        </div>

        <div>
          {POLES.map((pole, i) => (
            <PoleRow
              key={pole.key}
              pole={pole}
              index={i}
              isReversed={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolesAlternated;
