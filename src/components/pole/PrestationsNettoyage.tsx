import { Check, AlertTriangle } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

const prestations = [
  {
    number: "01",
    title: "Nettoyage rapide",
    target: "Panneaux solaires · Vitrages",
    description:
      "Pulvérisation à l'eau chaude ou à l'eau osmosée pure, basse pression. Idéal quand vous avez besoin d'un résultat immédiat sans traitement de fond — pour restaurer la production d'une centrale photovoltaïque ou nettoyer des surfaces vitrées encrassées.",
    specs: [
      "Eau chaude ou osmosée selon le support",
      "Sans produit chimique",
      "Effet ponctuel, à renouveler selon exposition",
      "Idéal panneaux PV (12-18 mois) et vitrages",
    ],
  },
  {
    number: "02",
    title: "Démoussage curatif",
    target: "Toitures · Façades",
    description:
      "Pulvérisation d'un produit anti-mousse professionnel adapté au support. Le traitement reste actif 6 à 10 mois et se réactive à chaque pluie pour éliminer les mousses, lichens et micro-algues en profondeur. Action longue durée invisible.",
    specs: [
      "Produits adaptés au support, conformes aux normes",
      "Effet curatif réactivé à chaque pluie",
      "Action 6 à 10 mois en profondeur",
      "Photos avant/après et rapport d'intervention",
    ],
  },
  {
    number: "03",
    title: "Protection hydrofuge",
    target: "À appliquer après démoussage",
    description:
      "Application d'un bouclier hydrofuge invisible sur surface propre. Protège la toiture ou la façade contre l'eau, les salissures et la repousse des mousses pendant 5 à 10 ans. La meilleure stratégie pour espacer durablement les entretiens.",
    specs: [
      "Bouclier invisible repoussant l'eau",
      "Protection durable 5 à 10 ans",
      "Évite la repousse des mousses",
      "Espacement maximal des entretiens",
    ],
  },
];

const PrestationsNettoyage = () => {
  return (
    <section
      role="region"
      aria-labelledby="prestations-nettoyage-title"
      className="relative bg-surface-elevated py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mx-auto text-center mb-14">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              Nos prestations
            </span>
            <h2
              id="prestations-nettoyage-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary mb-5"
              style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
            >
              Trois prestations,{" "}
              <span style={{ color: "var(--pole-color)" }}>une logique simple.</span>
            </h2>
            <p className="text-text-secondary text-[16px] leading-relaxed">
              Selon votre surface et votre objectif, on adapte la méthode. Souvent, deux
              prestations s'enchaînent dans le même chantier pour un résultat optimal et
              durable.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {prestations.map((p) => (
            <FadeInWhenVisible key={p.number}>
              <article className="hover-border-card flex flex-col h-full rounded-2xl bg-surface-card border border-border-subtle shadow-soft-md hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 p-7" style={{ ["--accent-color" as never]: "var(--pole-color)" }}>
                <div className="flex items-baseline gap-3 mb-5">
                  <span
                    className="font-display text-4xl font-bold leading-none"
                    style={{ color: "var(--pole-color)" }}
                  >
                    {p.number}
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-muted">
                    Prestation
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                  {p.title}
                </h3>
                <div
                  className="font-mono text-[11px] tracking-[0.14em] uppercase font-semibold mb-4"
                  style={{ color: "var(--pole-color)" }}
                >
                  {p.target}
                </div>
                <p className="text-text-secondary text-[15px] leading-relaxed mb-6 flex-1">
                  {p.description}
                </p>
                <ul className="list-none p-0 pt-5 mt-auto border-t border-border-subtle space-y-2.5">
                  {p.specs.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-3 text-[14px] text-text-secondary"
                    >
                      <Check
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: "var(--pole-color)" }}
                        aria-hidden="true"
                      />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible>
          <aside
            role="note"
            aria-label="Information importante : nettoyage choc"
            className="max-w-[1100px] mx-auto rounded-2xl border p-6 lg:p-8 flex flex-col lg:flex-row items-start gap-5 lg:gap-7"
            style={{
              background: "rgba(244, 166, 12, 0.06)",
              borderColor: "rgba(244, 166, 12, 0.30)",
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(244, 166, 12, 0.15)" }}
            >
              <AlertTriangle
                className="w-6 h-6"
                style={{ color: "#B57708" }}
                aria-hidden="true"
              />
            </div>
            <div className="flex-1">
              <div
                className="font-mono text-[11px] tracking-[0.18em] uppercase font-semibold mb-2"
                style={{ color: "#B57708" }}
              >
                Sur demande uniquement
              </div>
              <h3 className="font-display text-lg lg:text-xl font-semibold text-text-primary mb-3">
                Besoin d'un résultat immédiat ? Parlons d'abord du nettoyage choc.
              </h3>
              <p className="text-text-secondary text-[15px] leading-relaxed">
                Pour les cas urgents, nous pouvons appliquer une méthode plus agressive
                avec un résultat visible immédiat. Mais soyons transparents : si elle
                marche vite, elle peut abîmer les surfaces fragiles, et les saletés
                reviennent plus rapidement qu'avec un démoussage classique. Nous ne la
                conseillons que si vous n'avez pas d'autre option et nous la proposerons
                après en avoir discuté ensemble.
              </p>
            </div>
          </aside>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default PrestationsNettoyage;
