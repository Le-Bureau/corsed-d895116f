import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router-compat";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { POLES } from "@/lib/poles";
import { REALISATIONS, type Realisation } from "@/lib/realisations";

const poleOf = (r: Realisation) => POLES.find((p) => p.key === r.pole);

const RealisationCard = ({ r, index }: { r: Realisation; index: number }) => {
  const pole = poleOf(r);
  const color = pole?.baseColorOnLight ?? "#5082AC";

  return (
    <FadeInWhenVisible>
      <article
        aria-labelledby={`realisation-${r.slug}`}
        className="grid lg:grid-cols-[1.05fr_1fr] gap-0 overflow-hidden rounded-3xl bg-white border border-border-subtle shadow-soft-sm"
        style={{ ["--card-color" as string]: color }}
      >
        <div
          className={`relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] bg-surface-elevated ${index % 2 ? "lg:order-2" : ""}`}
        >
          <img
            src={r.image}
            alt={r.imageAlt}
            width={1600}
            height={900}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col p-7 sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase">
            <span style={{ color: "var(--card-color)" }}>{pole?.label}</span>
            <span className="text-text-muted" aria-hidden="true">
              ·
            </span>
            <span className="text-text-muted">{r.date}</span>
            <span className="text-text-muted" aria-hidden="true">
              ·
            </span>
            <span className="text-text-muted">{r.location}</span>
          </div>

          <h2
            id={`realisation-${r.slug}`}
            className="font-display font-semibold tracking-[-0.03em] leading-[1.08] text-text-primary text-[clamp(26px,2.6vw,36px)] mb-3"
          >
            {r.title}
          </h2>
          <p className="text-[15px] font-semibold text-text-primary mb-4">
            {r.client}
          </p>
          <p className="text-[16px] leading-[1.65] text-text-secondary mb-8">
            {r.summary}
          </p>

          <dl className="grid grid-cols-3 gap-3 mb-8">
            {r.figures.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl bg-surface-bg border border-border-subtle px-4 py-4"
              >
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span
                    className="block font-display font-semibold tracking-[-0.03em] leading-none text-[clamp(24px,2.4vw,32px)]"
                    style={{ color: "var(--card-color)" }}
                  >
                    {f.value}
                  </span>
                  <span className="mt-2 block text-[12px] leading-snug text-text-muted">
                    {f.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              to={`/blog/${r.articleSlug}`}
              className="group inline-flex items-center gap-2 rounded-full text-white font-semibold text-[15px] px-6 py-3 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
              style={{ background: "var(--card-color)" }}
            >
              Lire le retour de mission
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </Link>
            <Link
              to={r.serviceHref}
              className="text-sm font-semibold text-text-primary underline decoration-border-subtle underline-offset-4 hover:decoration-[var(--card-color)]"
            >
              {r.service}
            </Link>
          </div>
        </div>
      </article>
    </FadeInWhenVisible>
  );
};

const Realisations = () => {
  return (
    <main className="bg-surface-bg text-text-primary">
      <section
        aria-labelledby="realisations-title"
        className="relative isolate overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-20"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 30%, rgba(168,192,212,0.20) 0%, transparent 55%)," +
              "radial-gradient(ellipse at 80% 70%, rgba(80,130,172,0.12) 0%, transparent 55%)",
          }}
        />
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-8">
            <span
              className="w-1.5 h-1.5 rounded-full bg-logo-base"
              aria-hidden="true"
            />
            Réalisations
          </span>
          <h1
            id="realisations-title"
            className="font-display font-semibold tracking-[-0.03em] leading-[0.98] mb-8 max-w-[1000px] text-[clamp(44px,6.5vw,88px)]"
          >
            Nos missions,{" "}
            <span className="text-logo-base-deep">chiffres à l'appui.</span>
          </h1>
          <p className="text-text-secondary max-w-[640px] leading-relaxed text-[clamp(17px,1.5vw,21px)]">
            Chaque mission est documentée : le contexte, la méthode, ce qu'on a
            mesuré. Voici nos interventions de référence en Corse, pour des
            collectivités comme pour des industriels.
          </p>
        </div>
      </section>

      <section aria-label="Liste des réalisations" className="pb-24 lg:pb-32">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 flex flex-col gap-8 lg:gap-10">
          {REALISATIONS.map((r, i) => (
            <RealisationCard key={r.slug} r={r} index={i} />
          ))}

          <FadeInWhenVisible>
            <div className="rounded-3xl border-2 border-dashed border-border-subtle px-7 py-10 sm:px-12 sm:py-14 text-center">
              <p className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-4">
                Prochaine réalisation
              </p>
              <h2 className="font-display font-semibold tracking-[-0.03em] leading-[1.1] text-[clamp(26px,3vw,40px)] mb-4 max-w-[760px] mx-auto">
                Et si c'était votre chantier ?
              </h2>
              <p className="text-[16px] leading-[1.65] text-text-secondary max-w-[600px] mx-auto mb-8">
                Toiture, façade, panneaux solaires, inspection ou relevé 3D :
                décrivez-nous votre site, on vous dit franchement si le drone
                est le bon outil.
              </p>
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-logo-base-deep text-white font-semibold text-[15px] px-7 py-3.5 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
              >
                Demander un devis
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </main>
  );
};

export default Realisations;
