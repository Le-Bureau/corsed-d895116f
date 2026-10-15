import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "@/lib/router-compat";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { LOCAL_AREAS, ZONE_ORDER } from "@/lib/localAreas";
import { LOCAL_SERVICE_PAGES } from "@/lib/localServicePages";
import { CONTACT } from "@/lib/contact";

const cities = [...new Set(LOCAL_SERVICE_PAGES.map((p) => p.city))];

const ZonesHub = () => (
  <div className="bg-surface-bg text-text-primary">
    <section
      aria-labelledby="zones-title"
      className="relative isolate overflow-hidden pt-36 pb-12 lg:pt-44 lg:pb-16"
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
            { label: "Zones d'intervention" },
          ]}
          className="mb-5"
        />
        <h1
          id="zones-title"
          className="font-display font-semibold tracking-[-0.03em] leading-[1.02] mb-6 max-w-[1000px] text-[clamp(38px,5.5vw,76px)]"
        >
          Zones d'intervention en Corse
        </h1>
        <p className="text-text-secondary max-w-[680px] leading-relaxed text-[clamp(17px,1.5vw,20px)]">
          Notre base est à {CONTACT.city}, dans le Cap Corse. Nous intervenons
          dans toute l'île, en Haute-Corse comme en Corse-du-Sud. Les missions
          éloignées sont planifiées à l'avance et regroupées par secteur.
        </p>
      </div>
    </section>

    <section aria-label="Les zones" className="pb-16 lg:pb-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none">
          {ZONE_ORDER.map((k) => {
            const a = LOCAL_AREAS[k];
            return (
              <li key={k} className="list-none">
                <Link
                  to={a.path}
                  className="group flex h-full flex-col gap-3 rounded-2xl bg-white border border-border-subtle shadow-soft-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md motion-reduce:transform-none"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2.5 font-display text-[21px] font-semibold tracking-[-0.02em]">
                      <MapPin
                        className="w-4 h-4 text-logo-base-deep"
                        aria-hidden="true"
                      />
                      {a.breadcrumb}
                    </span>
                    <ArrowRight
                      className="w-4 h-4 text-text-muted transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-text-secondary">
                    {a.areas.map((z) => z.zone).join(" · ")}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>

    <section
      aria-labelledby="zones-detail"
      className="py-16 lg:py-20 bg-surface-elevated"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <h2
          id="zones-detail"
          className="font-display font-semibold tracking-[-0.03em] leading-[1.1] mb-8 text-[clamp(26px,3vw,40px)]"
        >
          Nos prestations, ville par ville
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {cities.map((city) => (
            <div key={city}>
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-4">
                {city}
              </h3>
              <ul className="flex flex-col gap-2 list-none">
                {LOCAL_SERVICE_PAGES.filter((p) => p.city === city).map((p) => (
                  <li key={p.path} className="list-none">
                    <Link
                      to={p.path}
                      className="text-[16px] font-semibold text-text-primary underline decoration-border-default underline-offset-4 hover:decoration-logo-base-deep"
                    >
                      {p.h1}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section aria-labelledby="zones-cta" className="py-20 lg:py-28">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="rounded-3xl bg-white border border-border-subtle shadow-soft-sm px-7 py-12 sm:px-12 sm:py-16 text-center">
          <h2
            id="zones-cta"
            className="font-display font-semibold tracking-[-0.03em] leading-[1.1] text-[clamp(28px,3.4vw,44px)] mb-4"
          >
            Votre commune n'est pas listée ?
          </h2>
          <p className="text-[16px] leading-[1.65] text-text-secondary max-w-[600px] mx-auto mb-8">
            Nous intervenons partout en Corse. Envoyez-nous l'adresse et
            quelques photos du site, nous vous répondons avec la méthode adaptée
            et un devis.
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
      </div>
    </section>
  </div>
);

export default ZonesHub;
