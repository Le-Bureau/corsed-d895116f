import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const CHIPS = [
  "Commission sur chaque mission concrétisée",
  "Tarifs préférentiels sur nos prestations",
  "Accord simple, sans exclusivité",
];

const PartnersContent = () => {
  return (
    <div className="flex flex-col">
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-logo-base" aria-hidden="true" />
        <span className="text-[11px] font-medium tracking-[0.18em] uppercase text-text-on-dark-muted">
          Programme partenaires
        </span>
      </div>

      {/* Title */}
      <h2
        id="partners-section-title"
        className="font-display text-[40px] lg:text-[52px] font-semibold tracking-[-0.03em] leading-[1.05] mb-6"
      >
        <span className="text-text-on-dark">Votre réseau,</span>
        <br />
        <span className="text-logo-base">notre expertise</span>
      </h2>

      {/* Pitch */}
      <p className="text-[16px] lg:text-[17px] leading-relaxed text-text-on-dark-muted mb-8 max-w-[560px]">
        Vous êtes couvreur, commercial indépendant, agent immobilier ou
        architecte ? Rejoignez le réseau Corse Drone et touchez une commission
        sur chaque affaire que vous nous apportez.
      </p>

      {/* Chips */}
      <ul className="flex flex-col gap-3 mb-10">
        {CHIPS.map((chip) => (
          <li
            key={chip}
            className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[14px] text-text-on-dark w-fit"
          >
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-logo-base/15 text-logo-base flex-shrink-0">
              <Check className="w-3 h-3" aria-hidden="true" strokeWidth={3} />
            </span>
            {chip}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        to="/partenaires"
        aria-label="En savoir plus sur le programme partenaires"
        className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-text-on-dark text-surface-darker text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 w-fit"
      >
        En savoir plus
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
};

export default PartnersContent;
