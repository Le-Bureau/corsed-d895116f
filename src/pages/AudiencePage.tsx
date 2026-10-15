import { ArrowRight, Check } from "lucide-react";
import { Link } from "@/lib/router-compat";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import PoleFAQ from "@/components/pole/PoleFAQ";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import ReferenceCard from "@/components/seo/ReferenceCard";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { POLES } from "@/lib/poles";
import { CONTACT } from "@/lib/contact";
import { hexToRgb } from "@/lib/utils";
import { AUDIENCE_PAGES, type AudiencePageData } from "@/lib/audiences";

const colorOf = (key: string) =>
  POLES.find((p) => p.key === key)?.baseColorOnLight ?? "#5082AC";

const AudiencePage = ({ page }: { page: AudiencePageData }) => {
  const color = colorOf(page.pole);
  const faqStyle = {
    "--pole-color": color,
    "--pole-color-rgb": hexToRgb(color),
  } as React.CSSProperties;
  // Three per row only when the cards fill the rows; otherwise two.
  const cols = page.services.length % 3 === 0 ? "lg:grid-cols-3" : "";
  const others = AUDIENCE_PAGES.filter((p) => p.path !== page.path);

  return (
    <div
      className="bg-surface-bg text-text-primary"
      style={{ ["--card-color" as string]: color }}
    >
      <section
        aria-labelledby="au-title"
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
        <div className="hero-enter max-w-[1280px] mx-auto px-5 sm:px-10">
          <Breadcrumbs
            items={[{ label: "Accueil", href: "/" }, { label: page.label }]}
            className="mb-5"
          />
          <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--card-color)" }}
              aria-hidden="true"
            />
            Secteur · {page.label}
          </span>
          <h1
            id="au-title"
            className="font-display font-semibold tracking-[-0.03em] leading-[1.02] mb-6 max-w-[1000px] text-[clamp(38px,5.5vw,76px)]"
          >
            {page.h1}
          </h1>
          <p className="text-text-secondary max-w-[680px] leading-relaxed mb-10 text-[clamp(17px,1.5vw,20px)]">
            {page.intro}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              to={`/contact?expertise=${page.pole}`}
              className="group inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold text-[15px] px-7 py-3.5 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
              style={{ background: "var(--card-color)" }}
            >
              Demander un devis
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </Link>
            <a
              href={CONTACT.phoneLink}
              className="inline-flex items-center justify-center rounded-full font-semibold text-[15px] px-7 py-3.5 border-2 bg-surface-card text-text-primary border-border-subtle transition-colors duration-300"
            >
              {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="au-services"
        className="py-16 lg:py-24 bg-surface-elevated"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <FadeInWhenVisible>
            <h2
              id="au-services"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.08] mb-10 text-[clamp(28px,3.4vw,46px)]"
            >
              {page.servicesTitle}
            </h2>
          </FadeInWhenVisible>
          <ul className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-4 list-none`}>
            {page.services.map((s) => (
              <li key={s.href} className="list-none">
                <Link
                  to={s.href}
                  className="group flex h-full flex-col gap-3 rounded-2xl bg-white border border-border-subtle shadow-soft-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md motion-reduce:transform-none"
                  style={{ ["--svc-color" as string]: colorOf(s.pole) }}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span
                        className="font-display text-[20px] font-semibold tracking-[-0.02em]"
                        style={{ color: "var(--svc-color)" }}
                      >
                        {s.label}
                      </span>
                      {s.soon && (
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 font-semibold">
                          Bientôt
                        </span>
                      )}
                    </span>
                    <ArrowRight
                      className="mt-1.5 w-4 h-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
                      style={{ color: "var(--svc-color)" }}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-[15px] leading-relaxed text-text-secondary">
                    {s.text}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="au-points" className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2
              id="au-points"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.08] mb-6 text-[clamp(28px,3.4vw,46px)]"
            >
              {page.pointsTitle}
            </h2>
            <ul className="flex flex-col gap-4 list-none">
              {page.points.map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-3 text-[16px] leading-[1.6] list-none"
                >
                  <Check
                    className="mt-1 h-4 w-4 flex-shrink-0"
                    style={{ color: "var(--card-color)" }}
                    aria-hidden="true"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <ReferenceCard reference={page.reference} title={page.referenceTitle} />
        </div>
      </section>

      <div style={faqStyle}>
        <PoleFAQ items={page.faq} />
      </div>

      <RelatedLinks
        servicesTitle="Nos autres secteurs"
        services={[
          ...others.map((p) => ({ label: p.label, href: p.path })),
          { label: "Zones d'intervention", href: "/zones-d-intervention" },
          { label: "Nos réalisations", href: "/realisations" },
        ]}
        articles={page.articles}
      />

      <section aria-labelledby="au-cta" className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="rounded-3xl bg-white border border-border-subtle shadow-soft-sm px-7 py-12 sm:px-12 sm:py-16 text-center">
            <h2
              id="au-cta"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.1] text-[clamp(28px,3.4vw,44px)] mb-4"
            >
              {page.ctaTitle}
            </h2>
            <p className="text-[16px] leading-[1.65] text-text-secondary max-w-[600px] mx-auto mb-8">
              {page.ctaText}
            </p>
            <Link
              to={`/contact?expertise=${page.pole}`}
              className="group inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold text-[15px] px-7 py-3.5 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
              style={{ background: "var(--card-color)" }}
            >
              Demander un devis
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AudiencePage;
