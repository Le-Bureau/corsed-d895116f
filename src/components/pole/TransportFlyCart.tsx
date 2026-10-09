import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

// Manufacturer figures, from dji.com/flycart-100/specs (Universal Edition).
const SPECS = [
  {
    value: "100",
    unit: "kg",
    label: "de charge utile max",
    detail: "85 kg en exploitation courante",
  },
  {
    value: "12",
    unit: "km",
    label: "de portée",
    detail: "en bi-batterie, selon charge",
  },
  {
    value: "30",
    unit: "m",
    label: "de treuil",
    detail: "pesée intégrée, largage d'urgence",
  },
  {
    value: "9",
    unit: "min",
    label: "de recharge",
    detail: "de 30 à 95 % sur site",
  },
  {
    value: "12",
    unit: "m/s",
    label: "de vent max",
    detail: "au décollage et à l'atterrissage",
  },
  {
    value: "IP55",
    unit: "",
    label: "résistance pluie",
    detail: "de -20 à 40 °C",
  },
];

const COMPARISON: Array<{ criterion: string; drone: string; heli: string }> = [
  {
    criterion: "Charge par rotation",
    drone: "Jusqu'à 100 kg (85 kg en courant)",
    heli: "Plusieurs centaines de kilos",
  },
  {
    criterion: "Dépose",
    drone: "Au treuil, jusqu'à 30 m, sans se poser",
    heli: "À l'élingue, aire de dépose sécurisée",
  },
  {
    criterion: "Mobilisation",
    drone: "Une équipe de deux, un véhicule",
    heli: "Appareil, pilote et créneau à réserver",
  },
  {
    criterion: "Pertinent pour",
    drone: "Charges réparties, rotations répétées, petits volumes",
    heli: "Charges lourdes d'un seul tenant, gros tonnages",
  },
];

const TransportFlyCart = () => {
  return (
    <section
      role="region"
      aria-labelledby="transport-flycart-title"
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
              Notre appareil
            </span>
            <h2
              id="transport-flycart-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary mb-5"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Le DJI FlyCart 100,{" "}
              <span style={{ color: "var(--pole-color)" }}>
                drone cargo lourd.
              </span>
            </h2>
            <p className="text-[17px] leading-[1.65] text-text-secondary">
              Le plus gros drone de transport de DJI. Il est pensé pour les
              terrains où un véhicule ne passe pas : montagne, crêtes, chantiers
              isolés, sites côtiers escarpés. Chiffres constructeur, la charge
              réelle de chaque mission est calculée selon le dénivelé et la
              météo.
            </p>
            <p className="mt-6 inline-flex items-center gap-3 rounded-full border border-border-subtle bg-white px-4 py-2 shadow-soft-sm font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-text-primary">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              Autorisation DGAC (SORA) en cours d'instruction
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
                    {s.unit && (
                      <span className="ml-1 text-[0.45em] tracking-normal">
                        {s.unit}
                      </span>
                    )}
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
          <h3 className="font-display font-semibold tracking-[-0.03em] leading-[1.1] text-text-primary text-[clamp(26px,2.8vw,38px)] mb-3">
            Drone ou hélicoptère ?
          </h3>
          <p className="text-[16px] leading-[1.65] text-text-secondary max-w-[680px] mb-8">
            Les deux se complètent. Le drone ne remplace pas l'hélicoptère sur
            les gros tonnages, mais il évite de le mobiliser pour quelques
            centaines de kilos répartis en rotations.
          </p>

          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-soft-sm">
            <table className="w-full text-left text-[15px]">
              <thead>
                <tr className="border-b border-border-subtle bg-surface-elevated">
                  <th
                    scope="col"
                    className="sr-only sm:not-sr-only px-5 py-4 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-text-muted"
                  >
                    Critère
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase"
                    style={{ color: "var(--pole-color)" }}
                  >
                    Drone FlyCart 100
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-text-muted"
                  >
                    Hélicoptère
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr
                    key={row.criterion}
                    className="border-b border-border-subtle last:border-0 align-top"
                  >
                    <th
                      scope="row"
                      className="hidden sm:table-cell px-5 py-4 font-semibold text-text-primary w-[22%]"
                    >
                      {row.criterion}
                    </th>
                    <td className="px-5 py-4 text-text-primary">
                      <span className="sm:hidden block font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-text-muted mb-1">
                        {row.criterion}
                      </span>
                      {row.drone}
                    </td>
                    <td className="px-5 py-4 text-text-secondary">
                      <span
                        className="sm:hidden block font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-transparent mb-1 select-none"
                        aria-hidden="true"
                      >
                        ·
                      </span>
                      {row.heli}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default TransportFlyCart;
