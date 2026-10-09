import nettoyageImg from "@/assets/hero/nettoyage.webp";
import diagnosticImg from "@/assets/hero/diagnostic.webp.asset.json";
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
  whyDroneItems?: WhyDroneItem[] | undefined;
  processSteps?: ProcessStep[] | undefined;
  useCases?: UseCase[] | undefined;
  poleFAQ?: PoleFAQItem[] | undefined;
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
  { iconName: "Eye", title: "Voir l'invisible", description: "Caméra thermique radiométrique et zoom jusqu'à 112× : déperditions, microfissures, hotspots détectés depuis le sol." },
  { iconName: "ShieldCheck", title: "Zéro risque humain", description: "Aucun personnel en hauteur. Pas de cordistes, pas de nacelle. Risque de chute éliminé." },
  { iconName: "FileText", title: "Rapport opposable", description: "Document PDF géoréférencé et horodaté, exploitable en assemblée générale, par votre assureur ou pour des subventions." },
  { iconName: "Clock", title: "Délai 48-72h", description: "Vol terrain en 2-3 heures, rapport livré en 48 à 72h pour une maison, sous 7 jours pour un grand site. Là où une expertise classique prend 1 à 2 semaines." },
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

// Transport figures come from DJI's FlyCart 100 spec sheet (dji.com/flycart-100/specs).
const TRANSPORT_WHY: WhyDroneItem[] = [
  {
    iconName: "ArrowDownToLine",
    title: "Dépose au treuil, sans se poser",
    description:
      "Treuil de 30 mètres avec pesée intégrée : la charge descend au point exact, même sur une crête, un toit ou une zone sans aire d'atterrissage.",
  },
  {
    iconName: "Weight",
    title: "Jusqu'à 100 kg par rotation",
    description:
      "100 kg sur les trajets courts, 85 kg sur les trajets jusqu'à 12 km. Matériaux, outillage, vivres ou matériel technique, en rotations répétées.",
  },
  {
    iconName: "BatteryCharging",
    title: "Des rotations qui s'enchaînent",
    description:
      "Batteries rechargées de 30 à 95 % en 9 minutes sur site. Pas d'hélicoptère à faire venir, pas de créneau à attendre pour quelques centaines de kilos.",
  },
  {
    iconName: "ShieldCheck",
    title: "Sécurité embarquée",
    description:
      "Parachute intégré, radars, LiDAR et caméras de détection d'obstacles. Chaque mission est couverte par une analyse de risque validée par la DGAC.",
  },
];

const TRANSPORT_PROCESS: ProcessStep[] = [
  { number: "ÉTAPE 01", title: "Étude de faisabilité", description: "Masse et volume des charges, distance, dénivelé, zones de décollage et de dépose. On vous dit franchement si le drone est le bon outil, ou si l'hélicoptère reste plus adapté." },
  { number: "ÉTAPE 02", title: "Autorisations", description: "Le FlyCart 100 vole en catégorie spécifique : analyse de risque SORA et autorisation de la DGAC (DSAC) à notre charge, dérogations préfectorales si nécessaire. On lance ces démarches dès la validation de votre projet." },
  { number: "ÉTAPE 03", title: "Préparation du site", description: "Zones de chargement et de dépose balisées et sécurisées, intégration de l'opération à votre PPSPS ou plan de prévention, conditionnement et pesée des charges." },
  { number: "ÉTAPE 04", title: "Rotations", description: "Vols aller-retour, dépose au treuil sans atterrissage, recharge des batteries entre deux rotations. Le chantier continue pendant ce temps." },
  { number: "ÉTAPE 05", title: "Compte-rendu", description: "Nombre de rotations, masses livrées, conditions de vol : un relevé exploitable pour votre suivi de chantier." },
];

const TRANSPORT_FAQ: PoleFAQItem[] = [
  { question: "Quelle charge un drone peut-il transporter ?", answer: "Notre DJI FlyCart 100 emporte jusqu'à 100 kg par rotation sur les trajets courts, et 85 kg en configuration longue distance (jusqu'à 12 km). La charge réelle dépend du dénivelé, de l'altitude et de la météo du jour : on la calcule pour chaque mission." },
  { question: "Le drone remplace-t-il l'hélicoptère ?", answer: "Pas toujours. L'hélicoptère reste imbattable pour les charges de plusieurs centaines de kilos d'un seul tenant. Le drone est pertinent pour des volumes répartis en charges de moins de 100 kg, des rotations répétées, ou quand mobiliser un hélicoptère est disproportionné." },
  { question: "Quelles autorisations faut-il ?", answer: "Un drone de cette taille vole obligatoirement en catégorie spécifique, avec une analyse de risque SORA et une autorisation délivrée par la DGAC. C'est à notre charge. De votre côté, l'opération est intégrée à vos documents de prévention (PPSPS, plan de prévention) et la zone de dépose est sécurisée." },
  { question: "Et si la météo se dégrade ?", answer: "Le FlyCart 100 décolle et atterrit avec un vent jusqu'à 12 m/s, de -20 à 40 °C, et résiste à la pluie (IP55). Au-delà, on reporte : la décision se prend le jour même, sur place, et la sécurité passe avant le planning." },
  { question: "Quels types de charges ?", answer: "Matériaux et outillage de chantier, sacs de mortier, pièces techniques, vivres et matériel de refuge, approvisionnement de bergeries ou d'exploitations isolées. Les matières dangereuses font l'objet d'une étude spécifique." },
  { question: "Quand le service sera-t-il disponible ?", answer: "Le pôle transport est en préparation. Inscrivez-vous pour être prévenu du lancement : les premiers clients bénéficieront de conditions privilégiées, et on peut déjà étudier la faisabilité de votre projet." },
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
      "Thermographie, inspection visuelle et photogrammétrie haute précision. Défauts identifiés, sites mesurés, rapports exploitables pour vos décisions techniques et vos assurances.",
    statLabel: "Délai du rapport",
    statValue: "48-72h",
    statDetail: "pour une maison individuelle",
    comingSoon: false,
    pitch: "Inspection aérienne, thermique et photogrammétrique de vos bâtiments, sites et installations. Identification rapide des défauts, relevés 3D mesurables, rapports exploitables pour vos décisions techniques et vos assurances.",
    description:
      "Thermographie, inspection visuelle et photogrammétrie haute précision. Identification rapide des défauts d'isolation, fissures, infiltrations, et relevés 3D mesurables au centimètre. Rapports exploitables pour vos décisions techniques et vos déclarations d'assurance.",
    highlights: [
      "Caméra thermique infrarouge",
      "Rapport sous 72h",
      "Accès difficile résolu",
    ],
    subServices: [
      { name: "Diagnostic thermique", slug: "thermique" },
      { name: "Inspection visuelle", slug: "visuel" },
      { name: "Photogrammétrie", slug: "photogrammetrie" },
    ],
    heroImage: diagnosticImg.url,
    showcaseImage: diagnosticShowcase,
    isInDevelopment: false,
    heroPoleNumber: "PÔLE 02",
    heroPitch:
      "Thermographie, inspection visuelle et photogrammétrie haute précision. Identification rapide des défauts d'isolation, fissures, infiltrations, et relevés 3D mesurables au centimètre. Rapports exploitables pour vos décisions techniques et vos déclarations d'assurance.",
    whyDroneItems: DIAGNOSTIC_WHY,
    processSteps: DIAGNOSTIC_PROCESS,
    useCases: DIAGNOSTIC_USE_CASES,
    poleFAQ: DIAGNOSTIC_FAQ,
    finalCTATitle: "Une inspection à programmer ?",
    finalCTASubtitle: "Devis gratuit, intervention sous 10 jours, rapport sous 72h.",
    finalCTAButtonLabel: "Demander un devis",
    stat: { value: "72", unit: "h", labelStrong: "délai maximum du rapport", labelMuted: "pour une maison, 7 jours pour un grand site" },
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
    pitch: "Une nouvelle approche de la logistique aérienne. Nos drones assurent le transport de matériel vers les zones difficiles d'accès, en complément ou alternative à l'hélicoptère.",
    description:
      "Acheminement de matériel vers les zones difficiles d'accès. Une alternative à l'hélicoptère, plus rapide, plus précise, moins coûteuse pour vos chantiers isolés en moyenne montagne ou sur sites côtiers escarpés.",
    highlights: [
      "Jusqu'à 100 kg par rotation",
      "Treuil 30 m, dépose sans se poser",
      "Complément à l'hélicoptère",
    ],
    subServices: [
      {
        name: "Livraison sur chantiers BTP",
        slug: "livraison-btp",
        category: "Logistique chantier",
        description:
          "Acheminement de matériaux, outillage et pièces vers les chantiers en zones difficiles d'accès. Dépose au treuil jusqu'à 100 kg par rotation, sans attendre un créneau d'hélicoptère.",
        iconName: "HardHat",
      },
      {
        name: "Approvisionnement zones isolées",
        slug: "approvisionnement-zones-isolees",
        category: "Logistique territoriale",
        description:
          "Bergeries d'estive, parcelles de montagne, zones sans piste carrossable. Aliments, bouteilles de gaz, matériel de clôture, pièces de rechange et vivres, en rotations régulières ou ponctuelles.",
        iconName: "Mountain",
      },
      {
        name: "Refuges de montagne",
        category: "Parc et gardiens",
        description:
          "Matériaux d'entretien, panneaux solaires, batteries, pièces de citernes et de sanitaires. Montée du matériel avant l'ouverture, redescente à la fermeture, réassort et dépannage en cours de saison.",
        iconName: "Tent",
      },
      {
        name: "Ouvrages techniques et réseaux",
        category: "Eau, énergie, télécoms",
        description:
          "Pièces et outillage pour pylônes, antennes, stations de mesure, captages et réservoirs d'eau situés hors du réseau routier.",
        iconName: "RadioTower",
      },
      {
        name: "Patrimoine isolé",
        category: "Restauration",
        description:
          "Tours génoises, chapelles, sentiers, murets : matériaux de restauration déposés au pied de l'ouvrage, sans ouvrir de piste temporaire.",
        iconName: "Landmark",
      },
      {
        name: "Évacuation et redescente",
        category: "Déchets et matériel usagé",
        description:
          "Déchets de chantier, matériel usagé, charges qui n'ont rien à faire en montagne : redescendus au fil de l'avancement plutôt qu'en une seule grosse opération.",
        iconName: "Recycle",
      },
      {
        name: "Logistique d'urgence",
        category: "Appui après intempéries",
        description:
          "Approvisionnement de sites coupés après des intempéries ou un éboulement, en appui des moyens existants, dès que la météo le permet.",
        iconName: "LifeBuoy",
      },
      {
        name: "Sites privés inaccessibles",
        category: "Particuliers",
        description:
          "Maison, terrain ou villa sans accès véhicule, en montagne ou sur le littoral escarpé : matériaux et équipements livrés au point de dépose.",
        iconName: "House",
      },
    ],
    heroImage: transportImg,
    showcaseImage: transportShowcase,
    mobileImagePosition: "center 25%",
    isInDevelopment: true,
    heroPoleNumber: "PÔLE 03",
    heroPitch:
      "Une nouvelle approche de la logistique aérienne. Notre DJI FlyCart 100 achemine jusqu'à 100 kg de matériel par rotation vers les zones difficiles d'accès, en complément de l'hélicoptère.",
    whyDroneItems: TRANSPORT_WHY,
    processSteps: TRANSPORT_PROCESS,
    useCases: undefined,
    poleFAQ: TRANSPORT_FAQ,
    finalCTATitle: "Service en préparation.",
    finalCTASubtitle: "Inscrivez-vous pour être informé du lancement et obtenir des conditions privilégiées.",
    finalCTAButtonLabel: "Être prévenu du lancement",
    stat: { value: "100", unit: "kg", labelStrong: "de charge utile par rotation", labelMuted: "avec le DJI FlyCart 100" },
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
    statLabel: "Cartographie",
    statValue: "250ha",
    statDetail: "cartographiés par jour\nen vol multispectral",
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
          "Acheminement de matériel jusqu'à 100 kg vers exploitations isolées, parcelles en montagne, refuges et bergeries. Treuil jusqu'à 30 m, dépose précise sans atterrissage.",
        iconName: "Package",
      },
    ],
    heroImage: agricultureImg,
    showcaseImage: agricultureShowcase,
    isInDevelopment: true,
    heroPoleNumber: "PÔLE 04",
    heroPitch:
      "Optimisez vos rendements et allégez votre charge de travail. Épandage ciblé de semis, traitement phytosanitaire contrôlé et analyses multispectrales des parcelles, adaptés au terroir corse.",
    whyDroneItems: undefined,
    processSteps: undefined,
    useCases: undefined,
    poleFAQ: undefined,
    finalCTATitle: "Service en préparation.",
    finalCTASubtitle: "Inscrivez-vous pour être informé du lancement et obtenir des conditions privilégiées.",
    finalCTAButtonLabel: "Être prévenu du lancement",
    stat: { value: "250", unit: "ha", labelStrong: "cartographiés par jour", labelMuted: "en un seul vol multispectral" },
  },
];
