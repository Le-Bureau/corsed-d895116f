import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "@/lib/router-compat";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import PoleFAQ from "@/components/pole/PoleFAQ";
import { POLES } from "@/lib/poles";
import { CONTACT } from "@/lib/contact";
import {
  BASTIA_AREAS,
  BASTIA_CLIMATE,
  BASTIA_FAQ,
  BASTIA_REFERENCES,
  BASTIA_SERVICES,
} from "@/lib/localBastia";

const colorOf = (key: string) =>
  POLES.find((p) => p.key === key)?.baseColorOnLight ?? "#5082AC";

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
    <span className="w-1.5 h-1.5 rounded-full bg-logo-base" aria-hidden="true" />
    {children}
  </span>
);

const H2 = ({ id, children }: { id: string; children: React.ReactNode }) => (
  <h2
    id={id}
    className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary mb-5 text-[clamp(32px,4vw,56px)]"
  >
    {children}
  </h2>
);

const DroneBastia = () => {
  const faqStyle = {
    "--pole-color": "#2F5F8A",
    "--pole-color-rgb": "47, 95, 138",
  } as React.CSSProperties;

  return (
    <main className="bg-surface-bg text-text-primary">
      {/* Hero */}
      <section
        aria-labelledby="bastia-title"
        className="relative isolate overflow-hidden pt-36 pb-16 lg:pt-44 lg:pb-24"
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
          <Eyebrow>Zone d'intervention · Haute-Corse</Eyebrow>
          <h1
            id="bastia-title"
            className="font-display font-semibold tracking-[-0.03em] leading-[0.98] mb-8 max-w-[1080px] text-[clamp(40px,6vw,84px)]"
          >
            Drone professionnel à Bastia{" "}
            <span className="text-logo-base-deep">et en Haute-Corse.</span>
          </h1>
          <p className="text-text-secondary max-w-[680px] leading-relaxed mb-10 text-[clamp(17px,1.5vw,21px)]">
            Basés à Ogliastro, dans le Cap Corse, nous intervenons à Bastia et
            dans toute la Haute-Corse : nettoyage de toitures et de façades,
            panneaux solaires, thermographie, inspection et relevés 3D. Sans
            échafaudage, sans nacelle, avec des références locales.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-logo-base-deep text-white font-semibold text-[15px] px-7 py-3.5 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              Demander un devis
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
            </Link>
            <a
              href={CONTACT.phoneLink}
              className="inline-flex items-center justify-center rounded-full font-semibold text-[15px] px-7 py-3.5 border-2 bg-surface-card text-text-primary border-border-subtle hover:border-logo-base-deep transition-colors duration-300"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="bastia-services" className="py-20 lg:py-28 bg-surface-elevated">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <FadeInWhenVisible>
            <div className="max-w-[760px] mb-12">
              <Eyebrow>Nos prestations</Eyebrow>
              <H2 id="bastia-services">Ce qu'on fait à Bastia et en Haute-Corse.</H2>
            </div>
          </FadeInWhenVisible>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
            {BASTIA_SERVICES.map((s) => (
              <li key={s.href} className="list-none">
                <Link
                  to={s.href}
                  className="group flex h-full flex-col gap-3 rounded-2xl bg-white border border-border-subtle shadow-soft-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md motion-reduce:transform-none"
                  style={{ ["--card-color" as string]: colorOf(s.pole) }}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-display text-[20px] font-semibold tracking-[-0.02em]" style={{ color: "var(--card-color)" }}>
                      {s.label}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" style={{ color: "var(--card-color)" }} aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-text-secondary">{s.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Climate */}
      <section aria-labelledby="bastia-climate" className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <FadeInWhenVisible>
            <div className="max-w-[760px] mb-12">
              <Eyebrow>Le terrain</Eyebrow>
              <H2 id="bastia-climate">Ce que le climat bastiais fait à vos bâtiments.</H2>
              <p className="text-[17px] leading-[1.65] text-text-secondary">
                Entre la mer, le sirocco et les versants du Cap, les bâtiments de
                Haute-Corse s'encrassent plus vite qu'ailleurs. C'est pour ça
                qu'un entretien régulier, et une méthode qui n'abîme pas, comptent
                autant ici.
              </p>
            </div>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BASTIA_CLIMATE.map((c) => (
              <FadeInWhenVisible key={c.title}>
                <div className="h-full rounded-2xl bg-surface-card border border-border-subtle shadow-soft-sm p-7">
                  <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em] mb-2">{c.title}</h3>
                  <p className="text-[15px] leading-[1.65] text-text-secondary">{c.text}</p>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* References */}
      <section aria-labelledby="bastia-refs" className="py-20 lg:py-28 bg-surface-elevated">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <FadeInWhenVisible>
            <div className="max-w-[760px] mb-12">
              <Eyebrow>Références locales</Eyebrow>
              <H2 id="bastia-refs">Ils nous ont confié leurs chantiers.</H2>
            </div>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BASTIA_REFERENCES.map((r) => (
              <Link
                key={r.href}
                to={r.href}
                className="group flex h-full flex-col rounded-2xl bg-white border border-border-subtle shadow-soft-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md motion-reduce:transform-none"
              >
                <span className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-text-muted mb-4">
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  {r.place}
                </span>
                <span className="font-display text-[22px] font-semibold tracking-[-0.02em] leading-tight mb-2">{r.title}</span>
                <span className="text-[15px] font-semibold text-text-primary mb-1">{r.client}</span>
                <span className="text-[15px] text-text-secondary mb-6">{r.figures}</span>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-logo-base-deep">
                  Lire le retour de mission
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-text-secondary">
            Toutes nos missions :{" "}
            <Link to="/realisations" className="font-semibold text-text-primary underline decoration-border-subtle underline-offset-4">
              voir les réalisations
            </Link>
          </p>
        </div>
      </section>

      {/* Areas */}
      <section aria-labelledby="bastia-areas" className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <FadeInWhenVisible>
            <div className="max-w-[760px] mb-12">
              <Eyebrow>Communes desservies</Eyebrow>
              <H2 id="bastia-areas">De Bastia au Cap, de la Balagne à la plaine.</H2>
              <p className="text-[17px] leading-[1.65] text-text-secondary">
                Notre base est à Ogliastro, au cœur du Cap Corse. Voici les secteurs où nous intervenons le plus souvent, la liste
                n'est pas exhaustive.
              </p>
            </div>
          </FadeInWhenVisible>
          <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BASTIA_AREAS.map((a) => (
              <div key={a.zone} className="rounded-2xl bg-surface-card border border-border-subtle shadow-soft-sm p-6">
                <dt className="font-display text-[18px] font-semibold tracking-[-0.02em] mb-2">{a.zone}</dt>
                <dd className="text-[15px] leading-[1.6] text-text-secondary">{a.towns}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div style={faqStyle}>
        <PoleFAQ items={[...BASTIA_FAQ]} />
      </div>

      {/* CTA */}
      <section aria-labelledby="bastia-cta" className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="rounded-3xl bg-white border border-border-subtle shadow-soft-sm px-7 py-12 sm:px-12 sm:py-16 text-center">
            <h2 id="bastia-cta" className="font-display font-semibold tracking-[-0.03em] leading-[1.1] text-[clamp(28px,3.4vw,44px)] mb-4">
              Un chantier à Bastia ou en Haute-Corse ?
            </h2>
            <p className="text-[16px] leading-[1.65] text-text-secondary max-w-[600px] mx-auto mb-8">
              Envoyez-nous l'adresse et quelques photos du site. On vous dit
              franchement si le drone est le bon outil, et on vous envoie un devis.
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-logo-base-deep text-white font-semibold text-[15px] px-7 py-3.5 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
            >
              Demander un devis
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DroneBastia;
