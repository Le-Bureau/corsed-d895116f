import { useState, useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";

const SECTIONS = [
  { id: "editeur", label: "Éditeur du site" },
  { id: "directeur", label: "Directeur de la publication" },
  { id: "concepteur", label: "Concepteur du site" },
  { id: "hebergeur", label: "Hébergeur" },
  { id: "rgpd", label: "Protection des données" },
  { id: "cookies", label: "Cookies" },
  { id: "ip", label: "Propriété intellectuelle" },
  { id: "credits", label: "Crédits" },
  { id: "responsabilite-contenu", label: "Responsabilité contenu" },
  { id: "responsabilite-tech", label: "Responsabilité technique" },
  { id: "sites-tiers", label: "Sites tiers" },
  { id: "liens", label: "Liens vers ce site" },
  { id: "droit", label: "Droit applicable" },
];

const LAST_UPDATE = "8 mai 2026";

export default function MentionsLegales() {
  const [activeSection, setActiveSection] = useState("editeur");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0% -60% 0%" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-surface-bg">
      <SEO
        title="Mentions légales"
        description="Mentions légales de Corse Drone : éditeur, hébergeur, protection des données personnelles, propriété intellectuelle."
        canonicalPath="/mentions-legales"
      />
      {/* Page header */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 border-b border-border-subtle">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--logo-base)" }}
              aria-hidden="true"
            />
            Informations légales
          </span>
          <h1 className="font-display font-semibold tracking-[-0.035em] leading-[1.02] text-text-primary mb-6 text-[44px] sm:text-[56px] lg:text-[72px]">
            Mentions légales
          </h1>
          <p className="text-text-secondary max-w-[760px] text-[16px] leading-relaxed">
            Conformément aux dispositions des articles 6-III et 19 de la Loi
            pour la Confiance dans l'Économie Numérique, il est porté à la
            connaissance des utilisateurs du Site les présentes mentions
            légales.
          </p>
          <p className="text-text-muted text-[13px] mt-4 font-mono">
            Dernière mise à jour : {LAST_UPDATE}
          </p>
        </div>
      </section>

      {/* TOC + Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-16">
            {/* TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                <p className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-4">
                  Sommaire
                </p>
                <nav>
                  {SECTIONS.map(({ id, label }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`block py-1.5 text-[13px] transition-colors duration-200 ${
                        activeSection === id
                          ? "text-text-primary font-semibold"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="max-w-[760px]">
              <Section id="editeur" title="Éditeur du site">
                <p>
                  Le présent site, accessible à l'URL{" "}
                  <strong>www.corse-drone.com</strong>, est édité par :
                </p>
                <p>
                  <strong>SAS Corse Drone</strong>, Société par Actions
                  Simplifiée au capital de 3&nbsp;000,00&nbsp;euros, inscrite
                  au Registre du Commerce et des Sociétés de Bastia sous le
                  numéro RCS Bastia 102&nbsp;589&nbsp;231 (immatriculée le 19
                  mars 2026), dont le siège social est situé au Marine d'Albo,
                  44 Strada di a Torra, 20217 Ogliastro.
                </p>
                <ul>
                  <li>SIREN : 102 589 231</li>
                  <li>SIRET (siège) : 102 589 231 00012</li>
                  <li>Code APE / NAF : 74.20Z (Activités photographiques)</li>
                  <li>Forme juridique : SAS, société par actions simplifiée</li>
                  <li>TVA intracommunautaire : FR91102589231</li>
                  <li>Date de création : 18/01/2026</li>
                </ul>
                <p>
                  <strong>Représentants légaux :</strong> Pierre-François
                  Morganti (Président) et Joan Perrin-Cacciari (Directeur
                  Général).
                </p>
                <p>
                  <strong>Contact :</strong>{" "}
                  <a href="mailto:contact@corse-drone.com">
                    contact@corse-drone.com
                  </a>
                </p>
              </Section>

              <Section id="directeur" title="Directeur de la publication">
                <p>
                  Le directeur de la publication du Site est{" "}
                  <strong>Pierre-François Morganti</strong>, en sa qualité de
                  Président de la SAS Corse Drone.
                </p>
              </Section>

              <Section id="concepteur" title="Concepteur du site">
                <p>Le présent site a été conçu et réalisé par :</p>
                <p>
                  <strong>SAS Le Bureau</strong>
                  <br />
                  7 Cours Favale, 20200 Bastia
                  <br />
                  SIRET : 910 638 485 00011
                  <br />
                  Contact :{" "}
                  <a href="mailto:contact@lebureaubastia.fr">
                    contact@lebureaubastia.fr
                  </a>
                  <br />
                  Site :{" "}
                  <a
                    href="https://www.lebureaubastia.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.lebureaubastia.fr
                  </a>
                </p>
              </Section>

              <Section id="hebergeur" title="Hébergeur">
                <p>Le Site est hébergé par :</p>
                <p>
                  <strong>Vercel Inc.</strong>
                  <br />
                  340 S Lemon Ave #4133
                  <br />
                  Walnut, CA 91789, États-Unis
                  <br />
                  Site :{" "}
                  <a
                    href="https://vercel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    vercel.com
                  </a>
                </p>
              </Section>

              <Section id="rgpd" title="Protection des données personnelles">
                <p>
                  Conformément au Règlement Général sur la Protection des
                  Données (RGPD – Règlement UE 2016/679) et à la loi française
                  du 6 janvier 1978 modifiée, Corse Drone s'engage à assurer
                  la protection et la confidentialité des données
                  personnelles collectées via le présent Site.
                </p>
                <p>
                  Le responsable du traitement est{" "}
                  <strong>SAS Corse Drone</strong>, représentée par
                  Pierre-François Morganti.
                </p>
                <p>
                  Pour le détail complet sur les données collectées, leurs
                  finalités, leur durée de conservation, vos droits et
                  comment les exercer, consultez notre{" "}
                  <Link to="/politique-confidentialite">
                    politique de confidentialité
                  </Link>
                  .
                </p>
                <p>
                  Pour toute question relative à vos données personnelles :{" "}
                  <a href="mailto:contact@corse-drone.com">
                    contact@corse-drone.com
                  </a>
                  .
                </p>
              </Section>

              <Section id="cookies" title="Cookies">
                <p>
                  Le Site n'utilise actuellement aucun cookie de suivi, de
                  cookie publicitaire ni de cookie d'analyse de trafic.
                </p>
                <p>
                  Seuls des cookies strictement nécessaires au bon
                  fonctionnement technique du Site (cookies de session,
                  cookies de sécurité) peuvent être déposés. Ces cookies ne
                  nécessitent pas le recueil du consentement préalable de
                  l'utilisateur conformément à la réglementation en vigueur.
                </p>
                <p>
                  Cette politique pourra évoluer en cas d'ajout d'outils
                  d'analyse de trafic ou de mesure d'audience. Les
                  utilisateurs seront alors informés et invités à donner leur
                  consentement.
                </p>
              </Section>

              <Section id="ip" title="Propriété intellectuelle">
                <p>
                  L'ensemble du contenu du présent Site (textes, images,
                  photographies, logos, icônes, éléments graphiques, vidéos,
                  mises en page, base de données, code source, etc.) est
                  protégé par la législation française et internationale
                  relative au droit d'auteur et à la propriété intellectuelle.
                  Ce contenu est la propriété exclusive de la SAS Corse Drone
                  ou fait l'objet d'une autorisation d'utilisation.
                </p>
                <p>
                  Tous les droits de reproduction sont réservés, y compris
                  pour les documents téléchargeables et les représentations
                  iconographiques et photographiques.
                </p>
                <p>
                  Toute représentation, reproduction, adaptation ou
                  exploitation partielle ou totale du contenu du Site, par
                  quelque procédé que ce soit, sans l'autorisation écrite et
                  préalable de la SAS Corse Drone, est strictement interdite
                  et constituerait une contrefaçon sanctionnée par les
                  articles L.335-2 et suivants du Code de la propriété
                  intellectuelle.
                </p>
              </Section>

              <Section id="credits" title="Crédits">
                <p>
                  <strong>Conception et réalisation du site :</strong>
                  <br />
                  SAS Le Bureau –{" "}
                  <a
                    href="https://www.lebureaubastia.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.lebureaubastia.fr
                  </a>
                </p>
                <p>
                  <strong>
                    Contenus rédactionnels, visuels et iconographiques :
                  </strong>
                  <br />
                  SAS Corse Drone. L'ensemble des textes, photographies,
                  illustrations et éléments graphiques présents sur le Site
                  ont été produits en interne par la société Corse Drone.
                </p>
              </Section>

              <Section
                id="responsabilite-contenu"
                title="Responsabilité relative au contenu"
              >
                <p>
                  Corse Drone s'efforce d'assurer au mieux l'exactitude et la
                  mise à jour des informations diffusées sur le présent Site.
                  Toutefois, Corse Drone ne peut garantir l'exactitude, la
                  précision ou l'exhaustivité des informations mises à
                  disposition.
                </p>
                <p>
                  En conséquence, Corse Drone décline toute responsabilité
                  pour toute imprécision, inexactitude ou omission portant sur
                  des informations disponibles sur ce Site. Les descriptions
                  de prestations, références et informations contenues sur ce
                  Site sont susceptibles d'être modifiées sans préavis.
                </p>
              </Section>

              <Section
                id="responsabilite-tech"
                title="Responsabilité technique"
              >
                <p>
                  Corse Drone décline toute responsabilité en cas de
                  difficulté d'accès au Site ou d'interruptions dans la
                  connexion, quelles qu'en soient les causes. Corse Drone ne
                  saurait être tenu responsable d'un quelconque dommage, y
                  compris mais sans s'y limiter, la perte de données, la
                  détérioration ou la contamination par des virus qui
                  pourraient affecter l'équipement informatique de
                  l'utilisateur à la suite d'un accès au Site, d'une
                  navigation sur celui-ci ou du téléchargement de contenus
                  provenant du Site.
                </p>
                <p>
                  Corse Drone se réserve le droit d'interrompre temporairement
                  l'accès au Site pour des raisons de maintenance ou de mise à
                  jour, sans que cela puisse donner lieu à une quelconque
                  indemnisation.
                </p>
              </Section>

              <Section id="sites-tiers" title="Sites tiers">
                <p>
                  Le Site peut contenir des liens hypertextes renvoyant vers
                  des sites Internet tiers. Ces liens sont fournis à titre
                  informatif et ne sauraient engager la responsabilité de
                  Corse Drone quant au contenu de ces sites, aux modifications
                  qui pourraient y être apportées ou aux liens qu'ils
                  contiennent.
                </p>
                <p>
                  Corse Drone n'exerce aucun contrôle sur ces sites tiers et
                  décline toute responsabilité quant à leur contenu, leurs
                  pratiques en matière de protection des données personnelles
                  ou leur disponibilité.
                </p>
              </Section>

              <Section id="liens" title="Liens vers ce site">
                <p>
                  Tout site Internet est autorisé à établir, sans autorisation
                  préalable, un lien hypertexte vers le présent Site, sous
                  réserve de ne pas utiliser la technique du « framing »
                  (insertion dans des cadres) ou toute autre technique
                  susceptible de porter atteinte à l'image de Corse Drone ou
                  de créer une confusion dans l'esprit de l'utilisateur quant
                  à l'origine du contenu consulté.
                </p>
                <p>
                  Corse Drone se réserve le droit de demander la suppression
                  de tout lien qui ne serait pas conforme à ses intérêts.
                </p>
              </Section>

              <Section id="droit" title="Droit applicable et juridiction">
                <p>
                  Le présent Site et l'ensemble de son contenu sont régis par
                  le droit français.
                </p>
                <p>
                  En cas de litige relatif à l'interprétation, l'exécution ou
                  la validité des présentes mentions légales, et à défaut de
                  résolution amiable, compétence exclusive est attribuée au
                  Tribunal compétent de Bastia, nonobstant pluralité de
                  défendeurs ou appel en garantie.
                </p>
              </Section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 mb-14 last:mb-0">
      <h2 className="font-display font-semibold tracking-[-0.02em] text-text-primary text-[26px] sm:text-[30px] mb-5 leading-tight">
        {title}
      </h2>
      <div className="space-y-4 text-text-secondary text-[15px] leading-[1.7] [&_strong]:text-text-primary [&_strong]:font-semibold [&_a]:text-logo-deep [&_a]:underline [&_a:hover]:text-text-primary [&_h3]:font-display [&_h3]:font-semibold [&_h3]:text-text-primary [&_h3]:text-[17px] [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        {children}
      </div>
    </section>
  );
}
