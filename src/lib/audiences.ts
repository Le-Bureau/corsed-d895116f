// Pages by type of client (/collectivites, /exploitants-solaires, …). Each one
// gathers the services that client buys, its real reference and the practical
// points it asks about. Only facts already established on the site.

import {
  CAB_REF,
  CANARI_REF,
  TENERGIE_REF,
  type LocalReference,
} from "@/lib/localAreas";
import { DELAY } from "@/lib/localServicePages";
import { FAQ_PRICE_SOLAR_PRO } from "@/lib/prices";
import { ARTICLES as A, type RelatedArticle } from "@/lib/relatedContent";

export interface AudienceService {
  label: string;
  href: string;
  pole: "nettoyage" | "diagnostic" | "transport";
  text: string;
  /** Pole still waiting for its authorisation. */
  soon?: boolean;
}

export interface AudiencePageData {
  path: string;
  /** Breadcrumb, footer and eyebrow label. */
  label: string;
  /** Label of the link from the service pages. */
  linkLabel: string;
  /** Page colour and contact form preselection. */
  pole: "nettoyage" | "diagnostic";
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  servicesTitle: string;
  services: AudienceService[];
  pointsTitle: string;
  points: string[];
  reference: LocalReference;
  referenceTitle: string;
  faq: { question: string; answer: string }[];
  articles: RelatedArticle[];
  ctaTitle: string;
  ctaText: string;
}

const TRANSPORT_LOAD =
  "jusqu'à 100 kg par rotation, 85 kg en exploitation courante";

const REGULATED_ZONES =
  "Centres-villes et abords d'aéroports sont des zones réglementées : nous vérifions chaque adresse et faisons les déclarations nécessaires.";

export const AUDIENCE_PAGES: AudiencePageData[] = [
  {
    path: "/collectivites",
    label: "Collectivités",
    linkLabel: "Pour les collectivités",
    pole: "diagnostic",
    h1: "Drone pour les collectivités et les bâtiments publics",
    metaTitle: "Drone pour les collectivités en Corse",
    metaDescription:
      "Inspection, thermographie, relevés 3D et entretien des bâtiments publics par drone en Corse, sans nacelle ni fermeture du site. Référence : la CAB à Bastia.",
    intro:
      "Communes, intercommunalités, services techniques : nous inspectons, diagnostiquons et entretenons vos bâtiments et vos ouvrages par drone, sans nacelle ni échafaudage, et sans fermer le bâtiment. Pour la Communauté d'Agglomération de Bastia, nous avons inspecté les toitures de deux bâtiments publics en une journée.",
    servicesTitle: "Ce que nous faisons pour les collectivités.",
    services: [
      {
        label: "Inspection visuelle",
        href: "/pole/diagnostic/visuel",
        pole: "diagnostic",
        text: "Toitures et façades d'écoles, de gymnases, de mairies ou d'édifices classés : chaque anomalie photographiée et positionnée sur une maquette 3D dans Axio.",
      },
      {
        label: "Thermographie",
        href: "/pole/diagnostic/thermique",
        pole: "diagnostic",
        text: "Déperditions, ponts thermiques et infiltrations d'un patrimoine souvent ancien, pour prioriser les rénovations.",
      },
      {
        label: "Photogrammétrie",
        href: "/pole/diagnostic/photogrammetrie",
        pole: "diagnostic",
        text: "Orthophotos à jour pour un PLU, un projet d'aménagement, le suivi du trait de côte ou la gestion du domaine public.",
      },
      {
        label: "Nettoyage de façades",
        href: "/pole/nettoyage/facades",
        pole: "nettoyage",
        text: "Enduits, pierre et bâtiments hauts nettoyés sans échafaudage ni nacelle sur la voie publique.",
      },
      {
        label: "Fixation d'amiante",
        href: "/pole/nettoyage/fixation-amiante",
        pole: "nettoyage",
        text: "Toitures en fibrociment d'avant 1997, gymnases, écoles, hangars : fixation des fibres par drone, équipe hors de la zone.",
      },
      {
        label: "Transport de matériel",
        href: "/pole/transport/alternative-helicoptere",
        pole: "transport",
        soon: true,
        text: `Captages, réservoirs et canalisations en montagne ou en maquis dense : ${TRANSPORT_LOAD}.`,
      },
    ],
    pointsTitle: "Ce qui change pour vos services techniques.",
    points: [
      "Le bâtiment reste ouvert : seul un périmètre au sol est sécurisé pendant le vol.",
      "Pas d'échafaudage ni de nacelle à installer sur la voie publique.",
      "Pour une inspection, un rapport PDF et un accès sécurisé à la maquette 3D dans Axio, chaque anomalie positionnée avec sa photo.",
      "Bâtiments classés et secteurs sauvegardés : inspection sans échafaudage ni emprise au sol.",
      REGULATED_ZONES,
      DELAY,
    ],
    reference: CAB_REF,
    referenceTitle: "Notre référence",
    faq: [
      {
        question: "Faut-il fermer le bâtiment pendant l'intervention ?",
        answer:
          "Non. Le drone vole au-dessus du bâtiment et l'activité continue. Seul un périmètre au sol est sécurisé pendant le vol.",
      },
      {
        question: "Qu'avez-vous livré à la CAB ?",
        answer:
          "L'inspection des toitures de deux bâtiments publics, réalisée en une journée : toitures couvertes à 100 %, modèle 3D et anomalies localisées. Le retour de mission est détaillé sur notre blog.",
      },
      {
        question: "La thermographie aide-t-elle à monter un dossier de subvention ?",
        answer:
          "Elle localise les déperditions de chaque bâtiment : de quoi prioriser les rénovations et documenter les demandes de subvention.",
      },
      {
        question: "Intervenez-vous dans toute la Corse ?",
        answer:
          "Oui, en Haute-Corse et en Corse-du-Sud, depuis notre base d'Ogliastro, dans le Cap Corse.",
      },
    ],
    articles: [A.cab, A.thermique],
    ctaTitle: "Un bâtiment ou un ouvrage public à inspecter ?",
    ctaText:
      "Décrivez le site et ce que vous cherchez à savoir : nous revenons vers vous avec la méthode adaptée et un devis.",
  },
  {
    path: "/exploitants-solaires",
    label: "Exploitants solaires",
    linkLabel: "Pour les exploitants solaires",
    pole: "diagnostic",
    h1: "Contrôle et entretien des installations solaires par drone",
    metaTitle: "Centrales solaires en Corse : thermographie et nettoyage",
    metaDescription:
      "Thermographie IEC TS 62446-3 et nettoyage par drone des centrales et toitures solaires en Corse. Rapport dans Spectra. Référence : 1 MWc pour Tenergie.",
    intro:
      "Centrales au sol, toitures et ombrières : nous contrôlons vos installations par thermographie aérienne, selon la méthodologie IEC TS 62446-3, et nous nettoyons les modules par drone, sans que personne marche dessus. Pour Tenergie, nous avons inspecté une centrale au sol de 1 MWc à Propriano en une heure de vol.",
    servicesTitle: "Deux prestations pour vos installations.",
    services: [
      {
        label: "Thermographie photovoltaïque",
        href: "/pole/diagnostic/thermique",
        pole: "diagnostic",
        text: "Points chauds, diodes by-pass et boîtes de jonction relevés à la caméra radiométrique Zenmuse H30T (1280 × 1024).",
      },
      {
        label: "Nettoyage de panneaux solaires",
        href: "/pole/nettoyage/panneaux-solaires",
        pole: "nettoyage",
        text: "Sel, sable du Sahara, pollens : une production restaurée sans contact mécanique et sans personne sur les modules.",
      },
    ],
    pointsTitle: "Ce que vous recevez.",
    points: [
      "Chaque anomalie numérotée, classée et positionnée sur l'orthomosaïque du site, dans Spectra.",
      "Un rapport PDF et un export exploitable par la maintenance.",
      "Point chaud avéré au-delà de 10 K d'écart avec les cellules voisines, boîte de jonction ou sous-réseau anormal au-delà de 4 K.",
      "Une mesure en pleine production : irradiance d'au moins 600 W/m², installation en charge.",
      "Un document utile à la maintenance, à une réclamation de garantie constructeur, à une expertise après sinistre ou au contrôle d'une installation neuve.",
    ],
    reference: TENERGIE_REF,
    referenceTitle: "Notre référence",
    faq: [
      {
        question: "Quand faire la thermographie d'une installation solaire ?",
        answer:
          "En pleine production, par temps clair : la méthodologie demande une irradiance d'au moins 600 W/m². L'été est la meilleure période.",
      },
      {
        question: "Combien de temps faut-il sur site ?",
        answer:
          "Pour la centrale au sol de 1 MWc de Tenergie, une heure de vol, puis une demi-journée de traitement des données.",
      },
      {
        question: "Comment consulte-t-on les résultats ?",
        answer:
          "Dans Spectra, notre plateforme de rapports en ligne, avec un accès sécurisé : les anomalies sont positionnées sur l'orthomosaïque du site, avec le rapport PDF et un export pour la maintenance.",
      },
      {
        question: "Combien coûte le nettoyage d'une installation professionnelle ?",
        answer: FAQ_PRICE_SOLAR_PRO,
      },
      {
        question: "Le nettoyage par drone annule-t-il la garantie des panneaux ?",
        answer:
          "Non : personne ne marche sur les modules et nous n'utilisons que des produits conformes aux recommandations des fabricants.",
      },
      {
        question: "À quelle fréquence nettoyer une installation ?",
        answer:
          "Une fois par an au minimum, en sortie d'hiver. Deux fois par an en bord de mer immédiat, en zone agricole ou quand l'inclinaison est faible (moins de 15°).",
      },
    ],
    articles: [A.thermique, A.panneaux, A.sahara],
    ctaTitle: "Une installation solaire à contrôler ou à nettoyer ?",
    ctaText:
      "Indiquez le type d'installation, sa puissance et sa localisation : nous revenons vers vous avec un devis.",
  },
  {
    path: "/btp-desamiantage",
    label: "BTP et désamiantage",
    linkLabel: "Pour le BTP et le désamiantage",
    pole: "nettoyage",
    h1: "Drone pour le BTP et le désamiantage",
    metaTitle: "Drone pour le BTP et le désamiantage en Corse",
    metaDescription:
      "Fixation d'amiante, relevés 3D et inspection par drone sur vos chantiers en Corse, équipe hors de la zone. Référence : Canari, avec Térélian (groupe Vinci).",
    intro:
      "Entreprises de désamiantage, de déconstruction et de travaux, maîtres d'ouvrage : nous traitons par drone les zones exposées ou difficiles d'accès de vos chantiers, et nous les mesurons. À Canari, avec Térélian (groupe Vinci), nous avons traité plus de 1 500 m² répartis sur 7 zones, l'équipe restant en zone verte.",
    servicesTitle: "Ce que nous faisons sur vos chantiers.",
    services: [
      {
        label: "Fixation d'amiante",
        href: "/pole/nettoyage/fixation-amiante",
        pole: "nettoyage",
        text: "Fixateur pulvérisé par drone, alimenté par une pompe au sol et 200 mètres de tuyau : l'équipe reste en zone verte.",
      },
      {
        label: "Photogrammétrie",
        href: "/pole/diagnostic/photogrammetrie",
        pole: "diagnostic",
        text: "Relevés successifs pour suivre l'avancement, contrôler les terrassements, calculer des cubatures ou documenter un état des lieux.",
      },
      {
        label: "Inspection visuelle",
        href: "/pole/diagnostic/visuel",
        pole: "diagnostic",
        text: "Toitures, façades et ouvrages inspectés sans nacelle ni cordiste, pour un état des lieux localisé avant travaux.",
      },
      {
        label: "Transport de matériel",
        href: "/pole/transport/alternative-helicoptere",
        pole: "transport",
        soon: true,
        text: `Mortier, outillage, menuiseries, pièces techniques déposés au treuil sur les chantiers sans accès : ${TRANSPORT_LOAD}.`,
      },
    ],
    pointsTitle: "Comment nous travaillons avec vous.",
    points: [
      "Nous intervenons en lien avec le désamianteur et le maître d'ouvrage, sur les zones qu'ils définissent.",
      "Un pré-diagnostic, sur visite ou sur dossier, valide la faisabilité et dimensionne le dispositif.",
      "L'équipe au sol reste en zone verte pendant toute l'intervention.",
      "Compte-rendu : photos avant et après, plans des zones traitées, volumes appliqués, conditions d'intervention.",
      "Les relevés 3D successifs laissent une trace mesurable et datée de l'avancement.",
    ],
    reference: CANARI_REF,
    referenceTitle: "Notre référence",
    faq: [
      {
        question: "Le drone remplace-t-il l'entreprise de désamiantage ?",
        answer:
          "Non. Nous intervenons en lien avec le désamianteur et le maître d'ouvrage, sur les zones qu'ils définissent. À Canari, la mission a été menée en partenariat avec Térélian (groupe Vinci).",
      },
      {
        question: "Quelle surface peut-on traiter ?",
        answer:
          "À Canari, plus de 1 500 m² répartis sur 7 zones distinctes, en 6 heures de vol effectif sur 2 jours.",
      },
      {
        question: "Pouvez-vous suivre l'avancement d'un chantier ?",
        answer:
          "Oui, par des relevés photogrammétriques successifs : avancement, terrassements, cubatures ou état des lieux, avec une trace mesurable et datée.",
      },
      {
        question: "Le transport de matériel par drone est-il disponible ?",
        answer:
          "Bientôt. Notre DJI FlyCart 100 emporte jusqu'à 100 kg par rotation, 85 kg en exploitation courante, et dépose la charge au treuil. Notre dossier d'autorisation est en cours d'instruction auprès de la DSAC.",
      },
    ],
    articles: [A.canari, A.amiante, A.transport],
    ctaTitle: "Un chantier à étudier ?",
    ctaText:
      "Localisation, surfaces, contraintes d'accès, calendrier : nous revenons vers vous avec une analyse de faisabilité.",
  },
  {
    path: "/coproprietes-syndics",
    label: "Copropriétés et syndics",
    linkLabel: "Pour les copropriétés et syndics",
    pole: "nettoyage",
    h1: "Drone pour les copropriétés et les syndics",
    metaTitle: "Drone pour les copropriétés et syndics en Corse",
    metaDescription:
      "Inspection, démoussage, nettoyage de façades et thermographie d'immeubles par drone en Corse, sans échafaudage. Photos et devis présentables en AG.",
    intro:
      "Syndics, gestionnaires et conseils syndicaux : nous inspectons, nettoyons et diagnostiquons vos immeubles par drone, sans échafaudage ni nacelle sur la voie publique. Photos, rapport et devis sont présentables en assemblée générale.",
    servicesTitle: "Ce que nous faisons pour vos immeubles.",
    services: [
      {
        label: "Inspection de toiture et de façade",
        href: "/pole/diagnostic/visuel",
        pole: "diagnostic",
        text: "Constat avant AG, préparation d'un ravalement, état des parties communes en toiture, suivi des défauts d'une année sur l'autre.",
      },
      {
        label: "Nettoyage de toitures",
        href: "/pole/nettoyage/toitures",
        pole: "nettoyage",
        text: "Démoussage et traitement fongicide, hydrofuge en option, sans que personne marche sur les tuiles.",
      },
      {
        label: "Nettoyage de façades",
        href: "/pole/nettoyage/facades",
        pole: "nettoyage",
        text: "Avant de voter un ravalement : un nettoyage restaure souvent l'aspect sans travaux lourds.",
      },
      {
        label: "Thermographie",
        href: "/pole/diagnostic/thermique",
        pole: "diagnostic",
        text: "Ponts thermiques, fuites aux menuiseries, infiltrations cachées : un immeuble qui surconsomme, ce sont des charges qui gonflent.",
      },
    ],
    pointsTitle: "Pour le conseil syndical et l'assemblée.",
    points: [
      "Photos avant et après, et un devis présentable en assemblée générale.",
      "Pas d'échafaudage ni de nacelle sur la voie publique : seulement un périmètre sécurisé au sol pendant le vol.",
      "L'immeuble reste occupé pendant l'intervention : le drone vole au-dessus.",
      "Pour une inspection, un rapport PDF et un accès sécurisé à la maquette 3D dans Axio.",
      REGULATED_ZONES,
    ],
    reference: CAB_REF,
    referenceTitle: "Notre référence en inspection de toitures",
    faq: [
      {
        question: "Le drone convient-il aux immeubles de centre-ville ?",
        answer:
          "C'est l'un des cas où il est le plus pertinent : immeubles hauts, rues étroites, façades et toitures difficiles d'accès. Le drone évite l'échafaudage et ne bloque pas la rue.",
      },
      {
        question: "Que peut-on présenter en assemblée générale ?",
        answer:
          "Les photos avant et après, le rapport d'inspection et un devis. Pour une inspection, vous recevez aussi un accès sécurisé à la maquette 3D dans Axio.",
      },
      {
        question: "Un nettoyage peut-il éviter un ravalement ?",
        answer:
          "Souvent, un nettoyage de façade restaure l'aspect sans travaux lourds. Une inspection préalable montre s'il suffit ou si des réparations sont nécessaires.",
      },
      {
        question: "Quel délai prévoir ?",
        answer:
          "Pour les opérations sous certification, la réglementation impose au moins 10 jours entre la demande de vol et l'intervention. Nous les intégrons d'office au planning.",
      },
    ],
    articles: [A.toiture, A.cab],
    ctaTitle: "Un immeuble à inspecter ou à entretenir ?",
    ctaText:
      "Envoyez-nous l'adresse et quelques photos : nous revenons vers vous avec la méthode adaptée et un devis présentable en assemblée.",
  },
];

/** Client-type pages that offer a given service page (for internal links). */
export const audiencesForService = (serviceHref: string) =>
  AUDIENCE_PAGES.filter((p) => p.services.some((s) => s.href === serviceHref));
