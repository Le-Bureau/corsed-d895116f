import { ArrowRight, Check, MapPin } from "lucide-react";
import { Link } from "@/lib/router-compat";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import PoleFAQ from "@/components/pole/PoleFAQ";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import RelatedLinks from "@/components/seo/RelatedLinks";
import { POLES } from "@/lib/poles";
import { CONTACT } from "@/lib/contact";
import { hexToRgb } from "@/lib/utils";
import {
  LOCAL_SERVICE_PAGES,
  type LocalServicePageData,
} from "@/lib/localServicePages";

const LocalServicePage = ({ page }: { page: LocalServicePageData }) => {
  const pole = POLES.find((p) => p.key === page.pole);
  const color = pole?.baseColorOnLight ?? "#5082AC";
  const faqStyle = {
    "--pole-color": color,
    "--pole-color-rgb": hexToRgb(color),
  } as React.CSSProperties;

  const siblings = LOCAL_SERVICE_PAGES.filter(
    (p) =>
      p.path !== page.path &&
      (p.serviceHref === page.serviceHref || p.city === page.city),
  );

  return (
    <div
      className="bg-surface-bg text-text-primary"
      style={{ ["--card-color" as string]: color }}
    >
      <section
        aria-labelledby="ls-title"
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
            items={[
              { label: "Accueil", href: "/" },
              { label: page.zoneLabel, href: page.zonePath },
              { label: page.h1 },
            ]}
            className="mb-5"
          />
          <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--card-color)" }}
              aria-hidden="true"
            />
            {page.serviceLabel} · {page.city}
          </span>
          <h1
            id="ls-title"
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
        aria-labelledby="ls-method"
        className="py-16 lg:py-24 bg-surface-elevated"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <FadeInWhenVisible>
            <h2
              id="ls-method"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.08] mb-10 text-[clamp(28px,3.4vw,46px)]"
            >
              {page.methodTitle}
            </h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.method.map((m) => (
              <div
                key={m.title}
                className="rounded-2xl bg-white border border-border-subtle shadow-soft-sm p-6"
              >
                <h3 className="font-display text-[19px] font-semibold tracking-[-0.02em] mb-2">
                  {m.title}
                </h3>
                <p className="text-[15px] leading-[1.65] text-text-secondary">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[15px] text-text-secondary">
            Tout le détail de la prestation :{" "}
            <Link
              to={page.serviceHref}
              className="font-semibold text-text-primary underline decoration-border-default underline-offset-4"
            >
              {page.serviceLabel}
            </Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="ls-local" className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2
              id="ls-local"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.08] mb-6 text-[clamp(28px,3.4vw,46px)]"
            >
              {page.localTitle}
            </h2>
            <ul className="flex flex-col gap-4 list-none">
              {page.local.map((l) => (
                <li
                  key={l}
                  className="flex items-start gap-3 text-[16px] leading-[1.6] list-none"
                >
                  <Check
                    className="mt-1 h-4 w-4 flex-shrink-0"
                    style={{ color: "var(--card-color)" }}
                    aria-hidden="true"
                  />
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-8 flex items-start gap-2 text-[15px] leading-[1.6] text-text-secondary">
              <MapPin
                className="mt-1 h-4 w-4 flex-shrink-0 text-text-muted"
                aria-hidden="true"
              />
              <span>
                <span className="font-semibold text-text-primary">
                  Communes desservies :{" "}
                </span>
                {page.towns}.{" "}
                <Link
                  to={page.zonePath}
                  className="underline underline-offset-4"
                >
                  Toute la zone {page.zoneLabel}
                </Link>
              </span>
            </p>
          </div>
          {page.reference && (
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-text-muted mb-4">
                {page.referenceTitle ?? "Notre référence"}
              </p>
              {page.reference.href ? (
                <Link
                  to={page.reference.href}
                  className="group flex flex-col rounded-2xl bg-white border border-border-subtle shadow-soft-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md motion-reduce:transform-none"
                >
                  <ReferenceBody reference={page.reference} withLink />
                </Link>
              ) : (
                <div className="flex flex-col rounded-2xl bg-white border border-border-subtle shadow-soft-sm p-7">
                  <ReferenceBody reference={page.reference} />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <div style={faqStyle}>
        <PoleFAQ items={page.faq} />
      </div>

      <RelatedLinks
        servicesTitle="Près de chez vous"
        services={[
          { label: page.serviceLabel, href: page.serviceHref },
          ...siblings.map((p) => ({ label: p.h1, href: p.path })),
          { label: page.zoneLabel, href: page.zonePath },
        ]}
        articles={page.articles}
      />

      <section aria-labelledby="ls-cta" className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="rounded-3xl bg-white border border-border-subtle shadow-soft-sm px-7 py-12 sm:px-12 sm:py-16 text-center">
            <h2
              id="ls-cta"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.1] text-[clamp(28px,3.4vw,44px)] mb-4"
            >
              {page.ctaTitle}
            </h2>
            <p className="text-[16px] leading-[1.65] text-text-secondary max-w-[600px] mx-auto mb-8">
              Envoyez-nous l'adresse et quelques photos. Nous vous répondons
              avec la méthode adaptée et un devis.
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

const ReferenceBody = ({
  reference,
  withLink = false,
}: {
  reference: NonNullable<LocalServicePageData["reference"]>;
  withLink?: boolean;
}) => (
  <>
    <span className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-text-muted mb-4">
      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
      {reference.place}
    </span>
    <span className="font-display text-[22px] font-semibold tracking-[-0.02em] leading-tight mb-2">
      {reference.title}
    </span>
    <span className="text-[15px] font-semibold text-text-primary mb-1">
      {reference.client}
    </span>
    {reference.figures && (
      <span className="text-[15px] text-text-secondary">
        {reference.figures}
      </span>
    )}
    {withLink && (
      <span
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
        style={{ color: "var(--card-color)" }}
      >
        Lire le retour de mission
        <ArrowRight
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
          aria-hidden="true"
        />
      </span>
    )}
  </>
);

export default LocalServicePage;
