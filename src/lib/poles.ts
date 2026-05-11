import nettoyageImg from "@/assets/hero/nettoyage.webp";
import diagnosticImg from "@/assets/hero/diagnostic.webp";
import agricultureImg from "@/assets/hero/agriculture.webp";
import transportImg from "@/assets/hero/transport.webp";
import nettoyageShowcase from "@/assets/poles/nettoyage.webp";
import diagnosticShowcase from "@/assets/poles/diagnostic.webp";
import agricultureShowcase from "@/assets/poles/agriculture.webp";
import transportShowcase from "@/assets/poles/transport.webp";

export type PoleKey = "nettoyage" | "diagnostic" | "agriculture" | "transport";

export interface PoleSubService {
  name: string;
  slug?: string;
  description?: string;
  category?: string;
  iconName?: string;
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

const DIAGNOSTIC_WHY: WhyDroneItem[] = [
  { iconName: "Eye", title: "Voir l'invisible", description: "Caméra thermique radiométrique et zoom optique 10× : déperditions, microfissures, hotspots détectés depuis le sol." },
  { iconName: "ShieldCheck", title: "Zéro risque humain", description: "Aucun personnel en hauteur. Pas de cordistes, pas de nacelle. Risque de chute éliminé." },
  { iconName: "FileText", title: "Rapport opposable", description: "Document PDF géoréférencé et horodaté, exploitable en assemblée générale, par votre assureur ou pour des subventions." },
  { iconName: "Clock", title: "Délai 48-72h", description: "Vol terrain en 2-3 heures, livraison du rapport en moins de trois jours. Là où une expertise classique prend 1 à 2 semaines." },
];

const DIAGNOSTIC_PROCESS: ProcessStep[] = [
  { number: "ÉTAPE 01", title: "Vol d'inspection", description: "Captation par drone DJI Matrice 4T équipé de caméra radiométrique haute résolution. 2 à 3 heures sur site." },
  { number: "ÉTAPE 02", title: "Analyse des anomalies", description: "Traitement des données, identification et localisation précise des défauts. Chaque anomalie isolée, géoréférencée et annotée." },
  { number: "ÉTAPE 03", title: "Rapport exploitable", description: "Document PDF de 15 à 40 pages avec images annotées, préconisations priorisées et recommandations claires." },
];

const DIAGNOSTIC_USE_CASES: UseCase[] = [
  { imageAlt: "Copropriété R+5", title: "Copropriété R+5 à Bastia", description: "4 bâtiments inspectés en une journée, 5 000 m² de façades couvertes. Rapport exploitable en assemblée générale.", advantage: "1 journée vs 5-7 jours en méthode cordiste, 60% d'économies" },
  { imageAlt: "Centrale photovoltaïque", title: "Centrale photovoltaïque agricole", description: "Inspection thermique de 500 panneaux. 12 hotspots identifiés, 3 cellules défaillantes localisées.", advantage: "ROI dès la première correction, production restaurée" },
  { imageAlt: "Église romane", title: "Église romane à Calvi", description: "Diagnostic visuel d'une église classée. Inspection complète de la toiture sans échafaudage ni accès patrimonial sensible.", advantage: "Zone ABF compatible, rapport pour subventions DRAC" },
];

const DIAGNOSTIC_FAQ: PoleFAQItem[] = [
  { question: "Quand réaliser un diagnostic thermique ?", answer: "Idéalement en période froide, entre octobre et avril en Corse, pour un écart de température suffisant. Pour les inspections photovoltaïques, en plein soleil entre 11h et 15h avec irradiance > 600 W/m²." },
  { question: "Faut-il des conditions météo particulières ?", answer: "Oui : ΔT > 10°C pour l'isolation, vent < 30 km/h, ciel dégagé depuis 2h, absence de pluie dans les 12h. Si non réunies, mission reportée sans frais." },
  { question: "Que contient le rapport final ?", answer: "PDF de 15 à 40 pages : cartographie thermique, zoom détaillé sur chaque anomalie avec image visuelle ET thermique, températures mesurées, interprétation technique, préconisations priorisées." },
  { question: "Vos certifications STS couvrent-elles ma mission ?", answer: "Corse Drone opère avec STS-01 et STS-02 délivrées par la DGAC, couvrant la quasi-totalité du territoire corse. Drone DJI Matrice 4T classé C2 (vol jusqu'à 5m des personnes)." },
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
    pitch: "Une alternative sécurisée et économique aux échafaudages. Notre flotte pulvérise avec précision façades, toitures et panneaux photovoltaïques, sans immobilisation de votre site.\n\n",
    description:
      "Notre flotte pulvérise avec précision façades, toitures et panneaux photovoltaïques, sans immobilisation de votre site. L'opérateur reste au sol, l'intervention se fait en quelques heures, et le rendu est immédiat.",
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
    processSteps: undefined,
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
    pitch: "Inspection aérienne et thermique haute précision de vos bâtiments et installations. Identification rapide des défauts, rapports exploitables pour vos décisions techniques et vos assurances.",
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
    whyDroneItems: DIAGNOSTIC_WHY,
    processSteps: DIAGNOSTIC_PROCESS,
    useCases: DIAGNOSTIC_USE_CASES,
    poleFAQ: DIAGNOSTIC_FAQ,
    finalCTATitle: "Une inspection à programmer ?",
    finalCTASubtitle: "Devis gratuit, intervention sous 10 jours, rapport sous 72h.",
    finalCTAButtonLabel: "Demander un devis",
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
    pitch: "Optimisez vos rendements et allégez votre charge de travail. Épandage ciblé de semis, traitement phytosanitaire contrôlé et analyses multispectrales des parcelles, adaptés au terroir corse.",
    description:
      "Épandage ciblé, traitement phytosanitaire contrôlé, analyses multispectrales. Une approche adaptée au terroir corse qui optimise vos rendements tout en allégeant votre charge de travail et votre empreinte écologique.",
    highlights: [
      "Précision GPS centimétrique",
      "Adapté au terroir corse",
      "Bilan carbone réduit",
    ],
    subServices: [
      {
        name: "Cartographie multispectrale",
        slug: "cartographie-multispectrale",
        category: "Diagnostic / Aide à la décision",
        description:
          "Survol et analyse NDVI de vos parcelles. Détection précoce du stress hydrique, des carences en azote et des hétérogénéités de vigueur. Rapports et cartes shapefile exportables vers vos outils d'agriculture de précision.",
        iconName: "Satellite",
      },
      {
        name: "Épandage de précision",
        slug: "epandage-precision",
        category: "Action / Réduction des intrants",
        description:
          "Engrais granulés, fertilisants, amendements minéraux. Application à dose variable selon vos cartes de prescription. Réservoir 150L, débit jusqu'à 400 kg/min.",
        iconName: "Droplets",
      },
      {
        name: "Semis aériens",
        slug: "semis-aeriens",
        category: "Action / Reverdissement",
        description:
          "Couverts végétaux, prairies, espèces couvre-sol. Idéal pour terrains pentus, zones difficiles d'accès et parcelles humides où le tracteur ne passe pas.",
        iconName: "Sprout",
      },
      {
        name: "Semis anti-incendie (DFCI)",
        slug: "semis-anti-incendie",
        category: "Prévention / Collectivités",
        description:
          "Revégétalisation post-incendie, semis d'espèces peu combustibles sur zones de coupures, prévention de l'érosion sur sols dénudés. Service dédié aux collectivités, ONF et conservatoires.",
        iconName: "Shield",
      },
      {
        name: "Blanchiment de serre",
        slug: "blanchiment-serre",
        category: "Régulation thermique",
        description:
          "Application de produits de blanchiment ou déblanchiment pour réguler la luminosité et la température. Amélioration du climat et de la productivité sous serre.",
        iconName: "Sun",
      },
      {
        name: "Transport & levage agricole",
        slug: "transport-levage-agricole",
        category: "Logistique zones isolées",
        description:
          "Acheminement de matériel jusqu'à 100 kg vers exploitations isolées, parcelles en montagne, refuges et bergeries. Câble de levage 10-15m, dépose précise sans atterrissage.",
        iconName: "Package",
      },
    ],
    heroImage: agricultureImg,
    showcaseImage: agricultureShowcase,
    isInDevelopment: true,
    heroPoleNumber: "PÔLE 03",
    heroPitch:
      "Optimisez vos rendements et allégez votre charge de travail. Épandage ciblé de semis, traitement phytosanitaire contrôlé et analyses multispectrales des parcelles, adaptés au terroir corse.",
    whyDroneItems: undefined,
    processSteps: undefined,
    useCases: undefined,
    poleFAQ: undefined,
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
    subServices: [
      {
        name: "Livraison sur chantiers BTP",
        slug: "livraison-btp",
        category: "Logistique chantier",
        description:
          "Acheminement de matériaux, outillage et pièces vers les chantiers en zones difficiles d'accès. Alternative économique à l'hélicoptère pour les charges jusqu'à 100 kg.",
        iconName: "HardHat",
      },
      {
        name: "Dépose précise sur ouvrage",
        slug: "depose-precise",
        category: "Pose et installation",
        description:
          "Pose de matériel sur toitures, antennes, châteaux d'eau et ouvrages en hauteur. Câble de levage 10-15m avec dépose centimétrique sans atterrissage requis.",
        iconName: "Target",
      },
      {
        name: "Approvisionnement zones isolées",
        slug: "approvisionnement-zones-isolees",
        category: "Logistique territoriale",
        description:
          "Refuges, bergeries, parcelles de montagne, zones non aménagées. Réapprovisionnement régulier ou ponctuel pour exploitations agricoles, sylvicoles et pastorales.",
        iconName: "Mountain",
      },
      {
        name: "Levage et treuillage",
        slug: "levage-treuillage",
        category: "Héliportage léger",
        description:
          "Soulèvement de matériel ou évacuation de charges depuis des points inaccessibles. Plus économique et plus rapide que l'hélicoptère pour les opérations jusqu'à 100 kg.",
        iconName: "MoveVertical",
      },
    ],
    heroImage: transportImg,
    showcaseImage: transportShowcase,
    mobileImagePosition: "center 25%",
    isInDevelopment: true,
    heroPoleNumber: "PÔLE 04",
    heroPitch:
      "Une nouvelle approche de la logistique aérienne. Nos drones assurent le transport de matériel vers les zones difficiles d'accès, en complément ou alternative à l'hélicoptère.",
    whyDroneItems: undefined,
    processSteps: undefined,
    useCases: undefined,
    poleFAQ: undefined,
    finalCTATitle: "Service en préparation.",
    finalCTASubtitle: "Inscrivez-vous pour être informé du lancement et obtenir des conditions privilégiées.",
    finalCTAButtonLabel: "Être prévenu du lancement",
    stat: { value: "100", unit: "kg", labelStrong: "de charge utile transportée", labelMuted: "par rotation" },
  },
];
