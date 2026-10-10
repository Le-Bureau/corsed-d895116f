import { ArrowRight, Check, Lock } from "lucide-react";
import { Link } from "@/lib/router-compat";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import axioVisuel from "@/assets/tools/axio-visuel.webp";
import spectraThermique from "@/assets/tools/spectra-thermique.webp";

interface Tool {
  key: string;
  logo: string;
  logoClass: string;
  name: string;
  domain: string;
  pitch: string;
  features: string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  service: { label: string; href: string }[];
}

const TOOLS: Tool[] = [
  {
    key: "axio",
    logo: "/outils/axio-logo.svg",
    logoClass: "h-10",
    name: "Axio",
    domain: "Inspection visuelle d'ouvrages et de bâtiments",
    pitch:
      "Le bâtiment restitué en maquette 3D, consultable en ligne. Chaque anomalie relevée est épinglée à sa position exacte sur l'ouvrage, avec ses photos en haute résolution.",
    features: [
      "Maquette 3D navigable en ligne",
      "Anomalies placées sur la maquette",
      "Photo haute résolution de chaque anomalie",
      "Rapport PDF téléchargeable",
    ],
    image: axioVisuel,
    imageAlt: "Interface Axio : maquette 3D d'un bâtiment avec anomalies localisées",
    imageWidth: 2000,
    imageHeight: 1152,
    service: [{ label: "Inspection visuelle", href: "/pole/diagnostic/visuel" }],
  },
  {
    key: "spectra",
    logo: "/outils/spectra-logo.svg",
    logoClass: "h-[30.6px]",
    name: "Spectra",
    domain: "Thermographie solaire et bâtiment",
    pitch:
      "Deux volets dans une même plateforme : le photovoltaïque et le diagnostic thermique du bâtiment. Chaque point chaud est numéroté, classé par criticité et positionné sur l'orthomosaïque du site.",
    features: [
      "Volet solaire : modules, points chauds, boîtes de jonction",
      "Volet bâtiment : ponts thermiques, défauts d'isolation, infiltrations",
      "Anomalies classées et localisées sur l'orthomosaïque",
      "Rapport PDF, orthophoto et export JSON",
    ],
    image: spectraThermique,
    imageAlt: "Interface Spectra : orthomosaïque thermique d'une installation avec points chauds classés",
    imageWidth: 2000,
    imageHeight: 1137,
    service: [
      { label: "Thermographie", href: "/pole/diagnostic/thermique" },
      { label: "Panneaux solaires", href: "/pole/nettoyage/panneaux-solaires" },
    ],
  },
];

const Outils = () => {
  return (
    <main className="bg-surface-bg text-text-primary">
      <section
        aria-labelledby="outils-title"
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
        <div className="hero-enter max-w-[1280px] mx-auto px-5 sm:px-10">
          <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-logo-base" aria-hidden="true" />
            Nos outils
          </span>
          <h1
            id="outils-title"
            className="font-display font-semibold tracking-[-0.03em] leading-[0.98] mb-8 max-w-[1000px] text-[clamp(40px,6vw,84px)]"
          >
            Vos rapports,{" "}
            <span className="text-logo-base-deep">en ligne et en 3D.</span>
          </h1>
          <p className="text-text-secondary max-w-[660px] leading-relaxed mb-10 text-[clamp(17px,1.5vw,21px)]">
            Nous avons développé nos propres plateformes pour livrer nos
            inspections. Pas une pile de photos ni un PDF qu'on oublie : un
            espace sécurisé où chaque anomalie est localisée et documentée.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <img src="/outils/axio-logo.svg" alt="Axio" width={95} height={34} className="h-9 w-auto" />
            <img src="/outils/spectra-logo.svg" alt="Spectra" width={127} height={26} className="h-[27.5px] w-auto" />
          </div>
        </div>
      </section>

      {TOOLS.map((tool, i) => (
        <section
          key={tool.key}
          aria-labelledby={`outil-${tool.key}`}
          className={`py-20 lg:py-28 ${i % 2 === 0 ? "bg-surface-elevated" : ""}`}
        >
          <div className="max-w-[1280px] mx-auto px-5 sm:px-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
            <FadeInWhenVisible className={i % 2 ? "lg:order-2" : ""}>
              <div className="h-10 flex items-center mb-6">
                <img src={tool.logo} alt={tool.name} className={`${tool.logoClass} w-auto`} />
              </div>
              <h2
                id={`outil-${tool.key}`}
                className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary mb-3 text-[clamp(30px,3.6vw,48px)]"
              >
                <span className="sr-only">{tool.name} : </span>
                {tool.domain}
              </h2>
              <p className="text-[17px] leading-[1.65] text-text-secondary mb-6">
                {tool.pitch}
              </p>
              <ul className="flex flex-col gap-3 mb-6">
                {tool.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] leading-[1.55]">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-logo-base-deep" aria-hidden="true" />
                    {f}
                  </li>
                ))}
                <li className="flex items-start gap-3 text-[15px] leading-[1.55]">
                  <Lock className="mt-0.5 h-4 w-4 flex-shrink-0 text-logo-base-deep" aria-hidden="true" />
                  Accès sécurisé, connecté à votre compte
                </li>
              </ul>
              <p className="text-sm text-text-secondary">
                Livré avec :{" "}
                {tool.service.map((s, j) => (
                  <span key={s.href}>
                    {j > 0 && ", "}
                    <Link
                      to={s.href}
                      className="font-semibold text-text-primary underline decoration-border-subtle underline-offset-4 hover:decoration-logo-base-deep"
                    >
                      {s.label}
                    </Link>
                  </span>
                ))}
              </p>
            </FadeInWhenVisible>

            <FadeInWhenVisible className={i % 2 ? "lg:order-1" : ""}>
              <div className="rounded-2xl overflow-hidden border border-border-subtle shadow-soft-lg bg-surface-card">
                <div className="h-9 flex items-center px-4 gap-2 bg-surface-bg border-b border-border-subtle" aria-hidden="true">
                  <span className="w-[10px] h-[10px] rounded-full bg-border-subtle" />
                  <span className="w-[10px] h-[10px] rounded-full bg-border-subtle" />
                  <span className="w-[10px] h-[10px] rounded-full bg-border-subtle" />
                </div>
                <img
                  src={tool.image}
                  alt={tool.imageAlt}
                  width={tool.imageWidth}
                  height={tool.imageHeight}
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto"
                />
              </div>
            </FadeInWhenVisible>
          </div>
        </section>
      ))}

      <section aria-labelledby="outils-cta" className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="rounded-3xl bg-white border border-border-subtle shadow-soft-sm px-7 py-12 sm:px-12 sm:py-16 text-center">
            <div className="flex justify-center gap-4 mb-6" aria-hidden="true">
              <img src="/outils/axio-symbole.svg" alt="" width={44} height={44} className="h-11 w-11" />
              <span className="h-11 w-11 flex items-center justify-center"><img src="/outils/spectra-signe.svg" alt="" width={24} height={26} className="h-[33.6px] w-auto" /></span>
            </div>
            <h2 id="outils-cta" className="font-display font-semibold tracking-[-0.03em] leading-[1.1] text-[clamp(28px,3.4vw,44px)] mb-4">
              Une inspection à livrer sur Axio ou Spectra ?
            </h2>
            <p className="text-[16px] leading-[1.65] text-text-secondary max-w-[600px] mx-auto mb-8">
              Toiture, façade, ouvrage, centrale solaire : décrivez-nous votre
              site, on vous dit quelle inspection et quel livrable conviennent.
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

export default Outils;
