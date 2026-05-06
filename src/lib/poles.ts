import nettoyageImg from "@/assets/hero/nettoyage.png";
import diagnosticImg from "@/assets/hero/diagnostic.png";
import agricultureImg from "@/assets/hero/agriculture.png";
import transportImg from "@/assets/hero/transport.png";
import nettoyageShowcase from "@/assets/poles/nettoyage.webp";
import diagnosticShowcase from "@/assets/poles/diagnostic.webp";
import agricultureShowcase from "@/assets/poles/agriculture.webp";
import transportShowcase from "@/assets/poles/transport.webp";

export type PoleKey = "nettoyage" | "diagnostic" | "agriculture" | "transport";

export interface PoleSubService {
  name: string;
  slug?: string;
  description?: string;
}

export interface WhyDroneItem {
  iconName: string;
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface UseCase {
  image?: string;
  imageAlt: string;
  title: string;
  description: string;
  advantage: string;
}

export interface PoleFAQItem {
  question: string;
  answer: string;
}

export interface PoleStat {
  value: string;
  unit: string;
  labelStrong: string;
  labelMuted: string;
}

export interface Pole {
  key: PoleKey;
  label: string;
  slug: string;
  baseColorOnDark: string;
  baseColorOnLight: string;
  deepColor: string;
  tintColor: string;
  title: string;
  subtitle: string;
  statLabel: string;
  statValue: string;
  statDetail: string;
  comingSoon: boolean;
  isInDevelopment?: boolean;
  heroImageAlt?: string;
  heroPoleNumber?: string;
  heroPitch?: string;
  whyDroneItems?: WhyDroneItem[];
  processSteps?: ProcessStep[];
  useCases?: UseCase[];
  poleFAQ?: PoleFAQItem[];
  finalCTATitle?: string;
  finalCTASubtitle?: string;
  finalCTAButtonLabel?: string;
  pitch: string;
  description: string;
  highlights: string[];
  subServices: PoleSubService[];
  heroImage?: string;
  showcaseImage?: string;
  mobileImagePosition?: string;
  stat?: PoleStat;
}

const NETTOYAGE_WHY: WhyDroneItem[] = [
  {
    iconName: "Shield",
    title: "Sans échafaudage ni nacelle",
    description:
      "On intervient là où le matériel lourd ne peut pas aller, et on évite les coûts d'installation qui alourdissent les devis.",
  },
  {
    iconName: "Zap",
    title: "Intervention rapide",
    description:
      "Pas de montage, pas de démontage. Le drone arrive, travaille, repart. Votre site reste opérationnel.",
  },
  {
    iconName: "FileImage",
    title: "Documentation automatique",
    description:
      "Photos, vidéos et rapport détaillé livrés après chaque mission. Utile pour vos assurances, suivis techniques ou archivage.",
  },
  {
    iconName: "TrendingDown",
    title: "30% d'économies en moyenne",
    description:
      "Comparé aux méthodes traditionnelles. Pas d'échafaudage à louer, pas d'immobilisation, intervention plus rapide.",
  },
];

const NETTOYAGE_PROCESS: ProcessStep[] = [
  { number: "ÉTAPE 01", title: "Étude du site", description: "Visite technique sur place, devis détaillé, validation ensemble du calendrier et des contraintes spécifiques." },
  { number: "ÉTAPE 02", title: "Sécurisation", description: "Demandes d'autorisations si nécessaire (DICT, mairie, copropriété), périmètre de sécurité au sol." },
  { number: "ÉTAPE 03", title: "Intervention", description: "Pulvérisation par drone, en moyenne 1 à 3 vols selon la surface. Opérateur certifié au sol, télépilote en duo si requis." },
  { number: "ÉTAPE 04", title: "Rinçage et finitions", description: "Rinçage à l'eau claire, contrôle visuel des zones traitées, retouches manuelles si besoin (zones basses)." },
  { number: "ÉTAPE 05", title: "Livraison", description: "Photos avant/après livrées, rapport d'intervention, garantie de satisfaction." },
];

const NETTOYAGE_USE_CASES: UseCase[] = [
  {
    imageAlt: "Cathédrale Sainte-Marie",
    title: "Cathédrale Sainte-Marie",
    description: "Nettoyage d'une façade en pierre de taille classée monument historique. Surfaces fragiles, accès interdit aux échafaudages traditionnels.",
    advantage: "Réalisé en 6h sur 2 jours, sans aucune intervention au contact direct de la pierre",
  },
  {
    imageAlt: "Résidence en bord de mer",
    title: "Résidence en bord de mer",
    description: "Nettoyage de façades soumises à l'air marin et aux dépôts de sel. 4 façades pleine hauteur sur immeuble R+5.",
    advantage: "Aucune nacelle, aucune perturbation pour les résidents, intervention en 1 journée",
  },
  {
    imageAlt: "Centrale photovoltaïque agricole",
    title: "Centrale photovoltaïque agricole",
    description: "Nettoyage de 800 panneaux solaires couverts de poussière et fientes d'oiseaux. Production en chute de 18%.",
    advantage: "Production restaurée à 99% le lendemain, intervention en 4h vs 3 jours en méthode manuelle",
  },
];

const NETTOYAGE_FAQ: PoleFAQItem[] = [
  { question: "Combien coûte un nettoyage par drone en Corse ?", answer: "Le tarif dépend de la surface totale, de l'état d'encrassement et de l'accessibilité du site. En moyenne, le nettoyage par drone est 30 à 50% moins cher que les méthodes traditionnelles car il ne nécessite pas de montage d'échafaudages ni de personnel travaillant en hauteur." },
  { question: "Le drone peut-il endommager mes surfaces ?", answer: "Absolument pas. C'est l'avantage majeur du drone. Il reste à une distance de sécurité (environ 2-3 mètres) du support. Aucun contact physique, donc aucun risque de casse, de rayure ou de dégradation des matériaux." },
  { question: "Quelle est la fréquence d'entretien recommandée ?", answer: "Pour une toiture : tous les 3 à 5 ans selon l'exposition. Pour une façade : tous les 5 à 10 ans. Pour des panneaux solaires : 1 à 2 fois par an selon l'environnement (poussière, oiseaux, marin)." },
  { question: "Intervenez-vous dans toute la Corse ?", answer: "Oui, nous couvrons la Haute-Corse (2B) et la Corse-du-Sud (2A). Nos équipes se déplacent d'Ajaccio à Bastia, en passant par Calvi, l'Île-Rousse, Corte, Porto-Vecchio et Propriano. Nous intervenons également dans les zones rurales et de montagne." },
  { question: "Quel produit utilisez-vous ?", answer: "Selon la surface : eau pure pour les panneaux solaires, eau adoucie ou produit anti-mousse pour les façades, biodégradable certifié pour les bâtiments classés. Toujours adapté au support et conforme aux réglementations locales." },
];

const PLACEHOLDER_USE_CASES: UseCase[] = [
  { imageAlt: "Cas d'usage à venir", title: "Cas d'usage 1", description: "Description détaillée à venir. Nous documenterons ici un cas réel d'intervention type pour ce pôle.", advantage: "Bénéfice mesurable à venir" },
  { imageAlt: "Cas d'usage à venir", title: "Cas d'usage 2", description: "Description détaillée à venir. Nous documenterons ici un cas réel d'intervention type pour ce pôle.", advantage: "Bénéfice mesurable à venir" },
  { imageAlt: "Cas d'usage à venir", title: "Cas d'usage 3", description: "Description détaillée à venir. Nous documenterons ici un cas réel d'intervention type pour ce pôle.", advantage: "Bénéfice mesurable à venir" },
];

const PLACEHOLDER_FAQ: PoleFAQItem[] = [
  { question: "Comment se déroule une intervention ?", answer: "Le détail complet du processus d'intervention pour ce pôle sera précisé ici prochainement." },
  { question: "Quel est le délai moyen ?", answer: "Les délais types seront communiqués ici prochainement, en fonction du type de mission." },
  { question: "Intervenez-vous dans toute la Corse ?", answer: "Oui, nous couvrons l'ensemble du territoire corse, Haute-Corse et Corse-du-Sud incluses." },
];

export const POLES: Pole[] = [
  {
    key: "nettoyage",
    label: "Nettoyage",
    slug: "nettoyage",
    baseColorOnDark: "#5082AC",
    baseColorOnLight: "#5082AC",
    deepColor: "#2C5784",
    tintColor: "#E8F0F8",
    title: "L'innovation aérienne au service de l'île",
    subtitle:
      "Une alternative sécurisée et économique aux échafaudages. Pulvérisation précise sur façades, toitures et panneaux photovoltaïques, sans immobilisation de site.",
    statLabel: "Économies moyennes",
    statValue: "30%",
    statDetail: "vs méthodes traditionnelles",
    comingSoon: false,
    pitch: "Une alternative sécurisée et économique aux échafaudages.",
    description:
      "Pulvérisation précise sur façades, toitures et panneaux photovoltaïques, sans immobilisation de site. L'opérateur reste au sol, l'intervention se fait en quelques heures, et le rendu est immédiat.",
    highlights: ["Aucun échafaudage", "Site non immobilisé", "Économie d'eau"],
    subServices: [
      { name: "Nettoyage de toitures", slug: "toitures" },
      { name: "Nettoyage de façades", slug: "facades" },
      { name: "Panneaux photovoltaïques", slug: "panneaux-solaires" },
    ],
    heroImage: nettoyageImg,
    showcaseImage: nettoyageShowcase,
    mobileImagePosition: "center 25%",
    isInDevelopment: false,
    heroPoleNumber: "PÔLE 01",
    heroImageAlt: "Drone Corse Drone en intervention de nettoyage de façade",
    heroPitch:
      "Notre flotte pulvérise avec précision façades, toitures et panneaux photovoltaïques, sans immobilisation de votre site.",
    whyDroneItems: NETTOYAGE_WHY,
    processSteps: NETTOYAGE_PROCESS,
    useCases: NETTOYAGE_USE_CASES,
    poleFAQ: NETTOYAGE_FAQ,
    finalCTATitle: "Un projet de nettoyage en tête ?",
    finalCTASubtitle: "Visite technique et devis gratuit. Nous revenons vers vous sous 24h ouvrées.",
    finalCTAButtonLabel: "Demander un devis gratuit",
    stat: { value: "30", unit: "%", labelStrong: "d'économies en moyenne", labelMuted: "comparé aux méthodes traditionnelles" },
  },
  {
    key: "diagnostic",
    label: "Diagnostic",
    slug: "diagnostic",
    baseColorOnDark: "#A33333",
    baseColorOnLight: "#890000",
    deepColor: "#5C0000",
    tintColor: "#FBE5E5",
    title: "L'œil aérien qui voit l'invisible",
    subtitle:
      "Inspection thermique et visuelle haute précision. Identification rapide des défauts, rapports exploitables pour vos décisions techniques et vos assurances.",
    statLabel: "Délai moyen",
    statValue: "48h",
    statDetail: "de livraison du rapport détaillé",
    comingSoon: false,
    pitch: "L'œil aérien qui voit l'invisible.",
    description:
      "Inspection thermique et visuelle haute précision. Identification rapide des défauts d'isolation, fissures, infiltrations. Rapports exploitables pour vos décisions techniques et vos déclarations d'assurance.",
    highlights: [
      "Caméra thermique infrarouge",
      "Rapport sous 48h",
      "Accès difficile résolu",
    ],
    subServices: [
      { name: "Diagnostic thermique", slug: "thermique" },
      { name: "Inspection visuelle", slug: "visuel" },
    ],
    heroImage: diagnosticImg,
    showcaseImage: diagnosticShowcase,
    isInDevelopment: false,
    heroPoleNumber: "PÔLE 02",
    heroPitch:
      "Inspection thermique et visuelle haute précision. Identification rapide des défauts d'isolation, fissures, infiltrations. Rapports exploitables pour vos décisions techniques et vos déclarations d'assurance.",
    whyDroneItems: NETTOYAGE_WHY,
    processSteps: NETTOYAGE_PROCESS,
    useCases: PLACEHOLDER_USE_CASES,
    poleFAQ: PLACEHOLDER_FAQ,
    finalCTATitle: "Une inspection à programmer ?",
    finalCTASubtitle: "Visite technique et devis gratuit.",
    finalCTAButtonLabel: "Demander un devis gratuit",
    stat: { value: "48", unit: "h", labelStrong: "délai moyen de livraison", labelMuted: "du rapport d'inspection détaillé" },
  },
  {
    key: "agriculture",
    label: "Agriculture",
    slug: "agriculture",
    baseColorOnDark: "#3F7A38",
    baseColorOnLight: "#2B5527",
    deepColor: "#1A3618",
    tintColor: "#E6EDE5",
    title: "La précision au mètre carré",
    subtitle:
      "Épandage ciblé, traitement phytosanitaire contrôlé, analyses multispectrales. Optimisez vos rendements et allégez votre charge de travail, parcelle par parcelle.",
    statLabel: "Eau utilisée",
    statValue: "−90%",
    statDetail: "vs pulvérisation au tracteur",
    comingSoon: true,
    pitch: "La précision au mètre carré, parcelle par parcelle.",
    description:
      "Épandage ciblé, traitement phytosanitaire contrôlé, analyses multispectrales. Une approche adaptée au terroir corse qui optimise vos rendements tout en allégeant votre charge de travail et votre empreinte écologique.",
    highlights: [
      "Précision GPS centimétrique",
      "Adapté au terroir corse",
      "Bilan carbone réduit",
    ],
    subServices: [
      { name: "Épandage ciblé" },
      { name: "Traitement phytosanitaire" },
      { name: "Analyses multispectrales" },
    ],
    heroImage: agricultureImg,
    showcaseImage: agricultureShowcase,
    isInDevelopment: true,
    heroPoleNumber: "PÔLE 03",
    heroPitch:
      "Optimisez vos rendements et allégez votre charge de travail. Épandage ciblé de semis, traitement phytosanitaire contrôlé et analyses multispectrales des parcelles, adaptés au terroir corse.",
    whyDroneItems: NETTOYAGE_WHY,
    processSteps: NETTOYAGE_PROCESS,
    useCases: PLACEHOLDER_USE_CASES,
    poleFAQ: PLACEHOLDER_FAQ,
    finalCTATitle: "Service en préparation.",
    finalCTASubtitle: "Inscrivez-vous pour être informé du lancement et obtenir des conditions privilégiées.",
    finalCTAButtonLabel: "Être prévenu du lancement",
    stat: { value: "-90", unit: "%", labelStrong: "d'eau utilisée", labelMuted: "vs. pulvérisation au tracteur, précision parcelle" },
  },
  {
    key: "transport",
    label: "Transport",
    slug: "transport",
    baseColorOnDark: "#F4A60C",
    baseColorOnLight: "#F4A60C",
    deepColor: "#B57708",
    tintColor: "#FEF5E1",
    title: "La logistique aérienne nouvelle génération",
    subtitle:
      "Acheminement de matériel vers les zones difficiles d'accès. Une alternative à l'hélicoptère, plus rapide, plus précise, moins coûteuse pour vos chantiers isolés.",
    statLabel: "Charge utile",
    statValue: "100kg",
    statDetail: "par rotation de drone cargo",
    comingSoon: true,
    pitch: "La logistique aérienne nouvelle génération.",
    description:
      "Acheminement de matériel vers les zones difficiles d'accès. Une alternative à l'hélicoptère, plus rapide, plus précise, moins coûteuse pour vos chantiers isolés en moyenne montagne ou sur sites côtiers escarpés.",
    highlights: [
      "Charge utile 100kg",
      "Zones inaccessibles",
      "Coût divisé vs hélicoptère",
    ],
    subServices: [{ name: "Logistique de chantier isolé" }],
    heroImage: transportImg,
    showcaseImage: transportShowcase,
    mobileImagePosition: "center 25%",
    isInDevelopment: true,
    heroPoleNumber: "PÔLE 04",
    heroPitch:
      "Une nouvelle approche de la logistique aérienne. Nos drones assurent le transport de matériel vers les zones difficiles d'accès, en complément ou alternative à l'hélicoptère.",
    whyDroneItems: NETTOYAGE_WHY,
    processSteps: NETTOYAGE_PROCESS,
    useCases: PLACEHOLDER_USE_CASES,
    poleFAQ: PLACEHOLDER_FAQ,
    finalCTATitle: "Service en préparation.",
    finalCTASubtitle: "Inscrivez-vous pour être informé du lancement et obtenir des conditions privilégiées.",
    finalCTAButtonLabel: "Être prévenu du lancement",
    stat: { value: "100", unit: "kg", labelStrong: "de charge utile transportée", labelMuted: "par rotation" },
  },
];
