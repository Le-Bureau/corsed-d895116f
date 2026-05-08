import { useState, useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/seo/SEO";

const SECTIONS = [
  { id: "introduction", label: "Introduction" },
  { id: "responsable", label: "Responsable du traitement" },
  { id: "donnees-collectees", label: "Données collectées" },
  { id: "finalites", label: "Finalités du traitement" },
  { id: "base-legale", label: "Base légale" },
  { id: "destinataires", label: "Destinataires des données" },
  { id: "duree", label: "Durée de conservation" },
  { id: "transferts", label: "Transferts hors UE" },
  { id: "cookies", label: "Cookies et traceurs" },
  { id: "droits", label: "Vos droits" },
  { id: "exercer-droits", label: "Comment exercer vos droits" },
  { id: "cnil", label: "Réclamation CNIL" },
  { id: "securite", label: "Sécurité des données" },
  { id: "modifications", label: "Modifications" },
];

const LAST_UPDATE = "8 mai 2026";

export default function PolitiqueConfidentialite() {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0% -60% 0%" },
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
        title="Politique de confidentialité"
        description="Politique de confidentialité de Corse Drone : données collectées, finalités, durée de conservation, vos droits RGPD et comment les exercer."
        canonicalPath="/politique-confidentialite"
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
            Confidentialité
          </span>
          <h1 className="font-display font-semibold tracking-[-0.035em] leading-[1.02] text-text-primary mb-6 text-[44px] sm:text-[56px] lg:text-[72px]">
            Politique de confidentialité
          </h1>
          <p className="text-text-secondary max-w-[760px] text-[16px] leading-relaxed">
            Chez Corse Drone, nous prenons la protection de vos données
            personnelles très au sérieux. Cette politique explique en clair
            comment nous collectons, utilisons et protégeons vos données.
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
              <Section id="introduction" title="Introduction">
                <p>
                  La présente politique de confidentialité s'applique au site{" "}
                  <strong>www.corse-drone.com</strong> et décrit la manière dont
                  SAS Corse Drone collecte, utilise et protège les données
                  personnelles des utilisateurs du Site.
                </p>
                <p>
                  Cette politique respecte le Règlement Général sur la
                  Protection des Données (RGPD – Règlement UE 2016/679) et la
                  loi française n° 78-17 du 6 janvier 1978 modifiée, dite
                  « Informatique et Libertés ».
                </p>
                <p>
                  Pour les informations légales générales (éditeur, hébergeur,
                  propriété intellectuelle), consultez nos{" "}
                  <Link to="/mentions-legales">mentions légales</Link>.
                </p>
              </Section>

              <Section id="responsable" title="Responsable du traitement">
                <p>
                  Le responsable du traitement des données personnelles est :
                </p>
                <p>
                  <strong>SAS Corse Drone</strong>
                  <br />
                  Représentée par Pierre-François Morganti, Président
                  <br />
                  Marine d'Albo, 44 Strada di a Torra
                  <br />
                  20217 Ogliastro, France
                  <br />
                  Email :{" "}
                  <a href="mailto:contact@corse-drone.com">
                    contact@corse-drone.com
                  </a>
                  <br />
                  Téléphone :{" "}
                  <a href="tel:+33769977700">07 69 97 77 00</a>
                </p>
                <p>
                  Pour toute question relative à la protection de vos données
                  personnelles, vous pouvez nous contacter à l'adresse
                  ci-dessus.
                </p>
              </Section>

              <Section id="donnees-collectees" title="Données collectées">
                <p>
                  Nous collectons uniquement les données strictement
                  nécessaires à la fourniture de nos services. Ces données
                  sont collectées via les formulaires présents sur le Site.
                </p>
                <h3>Formulaire de contact</h3>
                <ul>
                  <li>
                    <strong>Nom</strong> : obligatoire — pour personnaliser
                    notre réponse
                  </li>
                  <li>
                    <strong>Email</strong> : obligatoire — pour vous répondre
                  </li>
                  <li>
                    <strong>Téléphone</strong> : optionnel — si vous préférez
                    un échange téléphonique
                  </li>
                  <li>
                    <strong>Entreprise</strong> : optionnel — pour adapter
                    notre proposition à votre contexte
                  </li>
                  <li>
                    <strong>Pôle d'intérêt</strong> : optionnel — pour orienter
                    votre demande
                  </li>
                  <li>
                    <strong>Message</strong> : obligatoire — votre demande
                  </li>
                </ul>
                <h3>Formulaire candidature partenaire</h3>
                <ul>
                  <li>
                    <strong>Nom, email, téléphone</strong> : pour vous
                    recontacter
                  </li>
                  <li>
                    <strong>Entreprise et activité</strong> : pour évaluer la
                    pertinence du partenariat
                  </li>
                  <li>
                    <strong>Message</strong> : votre proposition de
                    collaboration
                  </li>
                </ul>
                <h3>Alerte de lancement de pôle</h3>
                <ul>
                  <li>
                    <strong>Nom et email</strong> : obligatoires — pour vous
                    notifier au lancement
                  </li>
                  <li>
                    <strong>Entreprise</strong> : optionnel — pour
                    contextualiser votre intérêt
                  </li>
                  <li>
                    <strong>Pôle d'intérêt</strong> : automatique — selon le
                    pôle où vous avez cliqué
                  </li>
                </ul>
                <h3>Données techniques (collecte automatique minimale)</h3>
                <p>
                  Lors de votre navigation, des informations techniques sont
                  automatiquement collectées par notre infrastructure :
                </p>
                <ul>
                  <li>Adresse IP (anonymisée si possible)</li>
                  <li>Type de navigateur et système d'exploitation</li>
                  <li>
                    Pages consultées et durée des visites (si outil d'analytics
                    activé)
                  </li>
                </ul>
                <p>
                  Ces données sont utilisées uniquement à des fins techniques
                  (sécurité, fonctionnement du site) et statistiques anonymes.
                </p>
              </Section>

              <Section id="finalites" title="Finalités du traitement">
                <p>
                  Vos données personnelles sont traitées exclusivement pour
                  les finalités suivantes :
                </p>
                <ul>
                  <li>
                    Répondre à vos demandes de devis ou de renseignements
                    envoyées via le formulaire de contact
                  </li>
                  <li>
                    Évaluer et donner suite aux candidatures de partenariat
                    reçues
                  </li>
                  <li>
                    Vous notifier du lancement de nouveaux pôles d'expertise
                    auxquels vous avez souscrit
                  </li>
                  <li>
                    Assurer la sécurité et le bon fonctionnement du Site (logs
                    techniques)
                  </li>
                  <li>
                    Mesurer l'audience du Site de manière anonymisée
                    (statistiques)
                  </li>
                </ul>
                <p>
                  Vos données ne sont utilisées à aucune autre fin. Elles ne
                  sont ni revendues, ni cédées à des tiers à des fins
                  commerciales.
                </p>
              </Section>

              <Section id="base-legale" title="Base légale">
                <p>
                  Conformément à l'article 6 du RGPD, chaque traitement repose
                  sur une base légale clairement identifiée :
                </p>
                <ul>
                  <li>
                    <strong>Consentement (art. 6.1.a)</strong> : formulaires
                    de contact, partenariat, alerte de lancement (validation
                    volontaire et explicite par l'envoi du formulaire)
                  </li>
                  <li>
                    <strong>Intérêt légitime (art. 6.1.f)</strong> : sécurité
                    du Site, prévention des abus, statistiques anonymes
                  </li>
                  <li>
                    <strong>Obligation légale (art. 6.1.c)</strong> :
                    conservation de certaines données si requise par la loi
                  </li>
                </ul>
              </Section>

              <Section id="destinataires" title="Destinataires des données">
                <p>
                  Vos données personnelles sont accessibles uniquement aux
                  personnes habilitées au sein de SAS Corse Drone et à nos
                  sous-traitants techniques.
                </p>
                <h3>Sous-traitants techniques</h3>
                <p>
                  Les prestataires suivants traitent vos données pour notre
                  compte :
                </p>
                <ul>
                  <li>
                    <strong>Vercel Inc.</strong> — hébergement du Site
                    (États-Unis, certifié Data Privacy Framework UE-USA)
                  </li>
                  <li>
                    <strong>Supabase</strong> — base de données et stockage des
                    formulaires (région Europe)
                  </li>
                  <li>
                    <strong>Resend</strong> — envoi des emails de notification
                    (UE/USA, certifié RGPD)
                  </li>
                </ul>
                <p>
                  Tous nos sous-traitants sont liés par un contrat de
                  sous-traitance conforme à l'article 28 du RGPD.
                </p>
                <p>
                  Aucune donnée n'est cédée, vendue ou louée à des tiers à des
                  fins commerciales.
                </p>
              </Section>

              <Section id="duree" title="Durée de conservation">
                <p>
                  Vos données sont conservées pour une durée strictement
                  nécessaire aux finalités du traitement :
                </p>
                <ul>
                  <li>
                    <strong>Demandes de contact</strong> : 36 mois à compter
                    du dernier contact
                  </li>
                  <li>
                    <strong>Candidatures partenaires</strong> : 36 mois à
                    compter du dépôt de la candidature
                  </li>
                  <li>
                    <strong>Alertes de lancement</strong> : jusqu'au lancement
                    effectif du pôle, puis 6 mois supplémentaires (vous pouvez
                    vous désinscrire à tout moment)
                  </li>
                  <li>
                    <strong>Logs techniques</strong> : 12 mois maximum
                  </li>
                </ul>
                <p>
                  À l'expiration de ces délais, les données sont supprimées de
                  nos systèmes.
                </p>
              </Section>

              <Section id="transferts" title="Transferts hors UE">
                <p>
                  Certains de nos sous-traitants peuvent traiter vos données
                  hors de l'Union Européenne (notamment Vercel et Resend,
                  basés aux États-Unis).
                </p>
                <p>
                  Ces transferts sont encadrés par des garanties appropriées
                  conformément aux articles 44 à 49 du RGPD :
                </p>
                <ul>
                  <li>
                    Adhésion au Data Privacy Framework (cadre de protection
                    des données UE-USA)
                  </li>
                  <li>
                    Application de clauses contractuelles types approuvées par
                    la Commission européenne
                  </li>
                </ul>
                <p>
                  Pour Supabase, vos données sont stockées dans la région
                  Europe (centres de données européens).
                </p>
              </Section>

              <Section id="cookies" title="Cookies et traceurs">
                <p>
                  Le Site utilise un nombre minimal de cookies, strictement
                  nécessaires à son fonctionnement.
                </p>
                <h3>Cookies essentiels</h3>
                <p>
                  Ces cookies sont indispensables au bon fonctionnement du
                  Site et ne nécessitent pas votre consentement préalable :
                </p>
                <ul>
                  <li>Cookies de session (gestion de votre navigation)</li>
                  <li>Cookies de sécurité (prévention des abus)</li>
                </ul>
                <h3>Cookies de mesure d'audience</h3>
                <p>
                  Le Site n'utilise actuellement aucun cookie de mesure
                  d'audience ni de cookie publicitaire ou de tracking.
                </p>
                <p>
                  Si à l'avenir nous mettons en place un outil d'analytics, il
                  sera privacy-friendly et sans collecte de données
                  personnelles (type Plausible Analytics ou Vercel Analytics,
                  sans cookies de tracking et conformes RGPD par défaut).
                  Cette politique sera alors mise à jour.
                </p>
              </Section>

              <Section id="droits" title="Vos droits">
                <p>
                  Conformément aux articles 15 à 22 du RGPD, vous disposez des
                  droits suivants sur vos données personnelles :
                </p>
                <ul>
                  <li>
                    <strong>Droit d'accès (art. 15)</strong> : obtenir la
                    confirmation que vos données sont traitées et en obtenir
                    une copie.
                  </li>
                  <li>
                    <strong>Droit de rectification (art. 16)</strong> : faire
                    corriger des données inexactes ou incomplètes.
                  </li>
                  <li>
                    <strong>Droit à l'effacement (art. 17)</strong> : demander
                    la suppression de vos données (sauf obligation légale
                    contraire).
                  </li>
                  <li>
                    <strong>Droit à la limitation (art. 18)</strong> : limiter
                    temporairement le traitement de vos données.
                  </li>
                  <li>
                    <strong>Droit à la portabilité (art. 20)</strong> :
                    recevoir vos données dans un format structuré et lisible
                    par machine.
                  </li>
                  <li>
                    <strong>Droit d'opposition (art. 21)</strong> : vous
                    opposer au traitement de vos données pour des motifs
                    légitimes.
                  </li>
                  <li>
                    <strong>Droit de retirer votre consentement</strong> : à
                    tout moment, sans que cela compromette la licéité du
                    traitement effectué avant le retrait.
                  </li>
                  <li>
                    <strong>Droit de définir des directives post-mortem</strong>{" "}
                    : indiquer ce qu'il advient de vos données après votre
                    décès.
                  </li>
                </ul>
              </Section>

              <Section
                id="exercer-droits"
                title="Comment exercer vos droits"
              >
                <p>
                  Pour exercer l'un de ces droits, adressez votre demande par
                  email à{" "}
                  <a href="mailto:contact@corse-drone.com">
                    contact@corse-drone.com
                  </a>{" "}
                  ou par courrier à l'adresse :
                </p>
                <p>
                  <strong>SAS Corse Drone</strong>
                  <br />
                  Marine d'Albo, 44 Strada di a Torra
                  <br />
                  20217 Ogliastro, France
                </p>
                <p>
                  Précisez l'objet de votre demande et joignez si possible une
                  copie d'une pièce d'identité (recto seulement) pour nous
                  permettre de vérifier votre identité.
                </p>
                <p>
                  Nous nous engageons à répondre à toute demande dans un délai
                  d'<strong>un (1) mois</strong> à compter de sa réception. Ce
                  délai peut être prolongé de deux mois supplémentaires en
                  raison de la complexité ou du nombre de demandes (vous serez
                  alors informé de cette prolongation).
                </p>
                <p>L'exercice de ces droits est gratuit.</p>
              </Section>

              <Section id="cnil" title="Réclamation CNIL">
                <p>
                  Si vous estimez que le traitement de vos données
                  personnelles n'est pas conforme à la réglementation, vous
                  avez le droit d'introduire une réclamation auprès de la
                  Commission Nationale de l'Informatique et des Libertés
                  (CNIL) :
                </p>
                <p>
                  <strong>CNIL</strong>
                  <br />
                  3 Place de Fontenoy - TSA 80715
                  <br />
                  75334 PARIS CEDEX 07
                  <br />
                  Téléphone : 01 53 73 22 22
                  <br />
                  Site :{" "}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    www.cnil.fr
                  </a>
                </p>
                <p>
                  Vous pouvez également formuler votre réclamation directement
                  en ligne via le site de la CNIL.
                </p>
              </Section>

              <Section id="securite" title="Sécurité des données">
                <p>
                  Nous mettons en œuvre les mesures techniques et
                  organisationnelles appropriées pour garantir la sécurité de
                  vos données personnelles :
                </p>
                <ul>
                  <li>Chiffrement des communications (HTTPS / TLS)</li>
                  <li>Authentification sécurisée des accès aux données</li>
                  <li>Sauvegardes régulières</li>
                  <li>Limitation des accès aux personnes habilitées</li>
                  <li>Sélection de prestataires conformes au RGPD</li>
                </ul>
                <p>
                  En cas de violation de données susceptible d'engendrer un
                  risque élevé pour vos droits et libertés, vous serez informé
                  dans les meilleurs délais conformément à l'article 34 du
                  RGPD.
                </p>
              </Section>

              <Section id="modifications" title="Modifications">
                <p>
                  Cette politique de confidentialité peut être mise à jour
                  pour refléter des évolutions de notre activité, de nos
                  outils techniques ou de la réglementation.
                </p>
                <p>
                  La date de dernière mise à jour est indiquée en haut de
                  cette page. Nous vous invitons à consulter régulièrement
                  cette page pour rester informé.
                </p>
                <p>
                  En cas de modifications substantielles, nous vous
                  informerons par email (si vous nous en avez communiqué un
                  récemment) ou par un avis bien visible sur le Site.
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
