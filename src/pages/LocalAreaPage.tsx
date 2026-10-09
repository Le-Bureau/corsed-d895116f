import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "@/lib/router-compat";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import PoleFAQ from "@/components/pole/PoleFAQ";
import { POLES } from "@/lib/poles";
import { CONTACT } from "@/lib/contact";
import { LOCAL_SERVICES, type LocalArea } from "@/lib/localAreas";

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

const LocalAreaPage = ({ area }: { area: LocalArea }) => {
  const faqStyle = {
    "--pole-color": "#2F5F8A",
    "--pole-color-rgb": "47, 95, 138",
  } as React.CSSProperties;

  return (
    <main className="bg-surface-bg text-text-primary">
      {/* Hero */}
      <section
        aria-labelledby="local-title"
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
          <Eyebrow>{area.eyebrow}</Eyebrow>
          <h1
            id="local-title"
            className="font-display font-semibold tracking-[-0.03em] leading-[0.98] mb-8 max-w-[1080px] text-[clamp(40px,6vw,84px)]"
          >
            {area.titleStart}{" "}
            <span className="text-logo-base-deep">{area.titleAccent}</span>
          </h1>
          <p className="text-text-secondary max-w-[680px] leading-relaxed mb-10 text-[clamp(17px,1.5vw,21px)]">
            {area.intro}
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
      <section aria-labelledby="local-services" className="py-20 lg:py-28 bg-surface-elevated">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <FadeInWhenVisible>
            <div className="max-w-[760px] mb-12">
              <Eyebrow>Nos prestations</Eyebrow>
              <H2 id="local-services">{area.servicesTitle}</H2>
            </div>
          </FadeInWhenVisible>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none">
            {LOCAL_SERVICES.map((s) => (
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
      <section aria-labelledby="local-climate" className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <FadeInWhenVisible>
            <div className="max-w-[760px] mb-12">
              <Eyebrow>Le terrain</Eyebrow>
              <H2 id="local-climate">{area.climateTitle}</H2>
              <p className="text-[17px] leading-[1.65] text-text-secondary">{area.climateIntro}</p>
            </div>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {area.climate.map((c) => (
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
      <section aria-labelledby="local-refs" className="py-20 lg:py-28 bg-surface-elevated">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <FadeInWhenVisible>
            <div className="max-w-[760px] mb-12">
              <Eyebrow>Références locales</Eyebrow>
              <H2 id="local-refs">{area.referencesTitle}</H2>
            </div>
          </FadeInWhenVisible>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${area.references.length > 2 ? "lg:grid-cols-3" : ""}`}>
            {area.references.map((r) => {
              const body = (
                <>
                  <span className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-text-muted mb-4">
                    <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    {r.place}
                  </span>
                  <span className="font-display text-[22px] font-semibold tracking-[-0.02em] leading-tight mb-2">{r.title}</span>
                  <span className="text-[15px] font-semibold text-text-primary mb-1">{r.client}</span>
                  {r.figures && <span className="text-[15px] text-text-secondary mb-6">{r.figures}</span>}
                  {r.href && (
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-logo-base-deep">
                      Lire le retour de mission
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" aria-hidden="true" />
                    </span>
                  )}
                </>
              );
              const cls = "group flex h-full flex-col rounded-2xl bg-white border border-border-subtle shadow-soft-sm p-7";
              return r.href ? (
                <Link
                  key={r.title}
                  to={r.href}
                  className={`${cls} transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md motion-reduce:transform-none`}
                >
                  {body}
                </Link>
              ) : (
                <div key={r.title} className={cls}>
                  {body}
                </div>
              );
            })}
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
      <section aria-labelledby="local-areas" className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <FadeInWhenVisible>
            <div className="max-w-[760px] mb-12">
              <Eyebrow>Communes desservies</Eyebrow>
              <H2 id="local-areas">{area.areasTitle}</H2>
              <p className="text-[17px] leading-[1.65] text-text-secondary">{area.areasIntro}</p>
            </div>
          </FadeInWhenVisible>
          <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {area.areas.map((a) => (
              <div key={a.zone} className="rounded-2xl bg-surface-card border border-border-subtle shadow-soft-sm p-6">
                <dt className="font-display text-[18px] font-semibold tracking-[-0.02em] mb-2">{a.zone}</dt>
                <dd className="text-[15px] leading-[1.6] text-text-secondary">{a.towns}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div style={faqStyle}>
        <PoleFAQ items={area.faq} />
      </div>

      {/* CTA */}
      <section aria-labelledby="local-cta" className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="rounded-3xl bg-white border border-border-subtle shadow-soft-sm px-7 py-12 sm:px-12 sm:py-16 text-center">
            <h2 id="local-cta" className="font-display font-semibold tracking-[-0.03em] leading-[1.1] text-[clamp(28px,3.4vw,44px)] mb-4">
              {area.ctaTitle}
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

export default LocalAreaPage;
