import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

// Manufacturer figures: ag.dji.com/t100/specs and ag.dji.com/mavic-3-m/specs.
const SPECS = [
  { value: "150", unit: "L", label: "réservoir d'épandage", detail: "engrais granulés, semences" },
  { value: "400", unit: "kg/min", label: "débit d'épandage max", detail: "donnée constructeur, conditions DJI" },
  { value: "100", unit: "L", label: "réservoir de pulvérisation", detail: "largeur de 5 à 13 m" },
  { value: "100", unit: "kg", label: "en levage", detail: "câble de 10 m, 10 à 15 m recommandés" },
  { value: "9", unit: "min", label: "de recharge", detail: "de 30 à 95 % sur site" },
  { value: "1", unit: "cm", label: "de précision RTK", detail: "cartographie multispectrale" },
];

// Ministry notice of 10/06/2026 (loi 2025-365, texts published 31/05/2026).
const RULES = [
  "Parcelles en pente d'au moins 20 %, bananeraies et vignes-mères de porte-greffes conduites au sol",
  "Uniquement des produits de biocontrôle, utilisables en agriculture biologique ou à faible risque, inscrits sur la liste drone",
  "Autorisation du préfet de région pour chaque programme de traitement",
  "Matériel anti-dérive agréé, vol à 18 km/h et 3 m au-dessus de la végétation au maximum",
  "Au moins 20 m des lieux habités et des lieux fréquentés",
];

const AgricultureT100 = () => {
  return (
    <section
      role="region"
      aria-labelledby="agri-t100-title"
      className="relative bg-surface-bg py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              Notre matériel
            </span>
            <h2
              id="agri-t100-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary mb-5"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Le DJI Agras T100,{" "}
              <span style={{ color: "var(--pole-color)" }}>
                et un drone multispectral.
              </span>
            </h2>
            <p className="text-[17px] leading-[1.65] text-text-secondary">
              Un drone multispectral pour lire vos parcelles, et le plus gros
              drone agricole de DJI pour épandre, semer et lever. Chiffres
              constructeur : chaque mission est calibrée selon la parcelle, la
              pente et la météo.
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <dl className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-20">
            {SPECS.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-surface-card border border-border-subtle shadow-soft-sm px-5 py-6 sm:px-7 sm:py-7"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span
                    className="block font-display font-semibold tracking-[-0.03em] leading-none text-[clamp(32px,4vw,52px)]"
                    style={{ color: "var(--pole-color)" }}
                  >
                    {s.value}
                    <span className="ml-1 text-[0.45em] tracking-normal">
                      {s.unit}
                    </span>
                  </span>
                  <span className="mt-3 block text-[15px] font-semibold text-text-primary">
                    {s.label}
                  </span>
                  <span className="mt-1 block text-[13px] leading-snug text-text-muted">
                    {s.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="rounded-3xl border border-border-subtle bg-surface-card shadow-soft-sm p-7 sm:p-10 lg:p-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-14">
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-text-muted mb-4">
                Pulvérisation par drone
              </p>
              <h3 className="font-display font-semibold tracking-[-0.03em] leading-[1.1] text-text-primary text-[clamp(26px,2.8vw,38px)] mb-4">
                Ce que dit la loi en 2026.
              </h3>
              <p className="text-[16px] leading-[1.65] text-text-secondary">
                La pulvérisation aérienne de produits phytopharmaceutiques est
                interdite en France. Depuis les textes du 29 mai 2026, une
                dérogation existe pour le drone, très encadrée. Nous
                proposerons les traitements en biocontrôle dès que toutes les
                conditions seront réunies, pas avant.
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {RULES.map((rule) => (
                <li
                  key={rule}
                  className="flex items-start gap-3 rounded-2xl bg-surface-bg border border-border-subtle px-5 py-4 text-[15px] leading-[1.55] text-text-primary"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: "var(--pole-color)" }}
                    aria-hidden="true"
                  />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default AgricultureT100;
