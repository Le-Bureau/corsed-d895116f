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
  // True when /pole/<pole>/<slug> has its own page, even while the pole is
  // in development (otherwise links fall back to the #sous-services anchor).
  hasPage?: boolean;
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
      "100 kg en charge maximale, 85 kg en exploitation courante sur des trajets jusqu'à 12 km. Matériaux, outillage, vivres ou matériel technique, en rotations répétées.",
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
      "Parachute intégré, radars, LiDAR et caméras de détection d'obstacles. Notre dossier d'autorisation (analyse de risque SORA) est en cours d'instruction à la DGAC.",
  },
];

const TRANSPORT_PROCESS: ProcessStep[] = [
  { number: "ÉTAPE 01", title: "Étude de faisabilité", description: "Masse et volume des charges, distance, dénivelé, zones de décollage et de dépose. On vous dit franchement si le drone est le bon outil, ou si l'hélicoptère reste plus adapté." },
  { number: "ÉTAPE 02", title: "Autorisations", description: "Le FlyCart 100 vole en catégorie spécifique : analyse de risque SORA et autorisation de la DGAC (DSAC) à notre charge, dérogations préfectorales si nécessaire. Notre dossier SORA est en cours d'instruction auprès de la DSAC." },
  { number: "ÉTAPE 03", title: "Préparation du site", description: "Zones de chargement et de dépose balisées et sécurisées, intégration de l'opération à votre PPSPS ou plan de prévention, conditionnement et pesée des charges." },
  { number: "ÉTAPE 04", title: "Rotations", description: "Vols aller-retour, dépose au treuil sans atterrissage, recharge des batteries entre deux rotations. Le chantier continue pendant ce temps." },
  { number: "ÉTAPE 05", title: "Compte-rendu", description: "Nombre de rotations, masses livrées, conditions de vol : un relevé exploitable pour votre suivi de chantier." },
];

const TRANSPORT_FAQ: PoleFAQItem[] = [
  { question: "Quelle charge un drone peut-il transporter ?", answer: "Le DJI FlyCart 100 accepte jusqu'à 100 kg de charge (configuration mono-batterie, sur trajets courts). En exploitation courante, en bi-batterie, on travaille à 85 kg sur des trajets jusqu'à 12 km. La charge réelle dépend du dénivelé, de l'altitude et de la météo du jour, et on la calcule pour chaque mission." },
  { question: "Un drone cargo peut-il voler avec une simple certification STS ?", answer: "Non. Les scénarios standard européens STS-01 et STS-02 sont réservés aux drones de classe C5 ou C6 de moins de 25 kg. Un drone cargo lourd comme le FlyCart 100 (170 kg au décollage) relève obligatoirement d'une autorisation spécifique délivrée par la DGAC après une analyse de risque SORA. Quel que soit l'opérateur, demandez-lui l'autorisation qui couvre votre mission." },
  { question: "Pourquoi un treuil plutôt qu'un crochet ?", answer: "Avec un treuil de 30 mètres, le drone reste en vol stationnaire au-dessus du point de dépose et descend la charge jusqu'au sol. Pas besoin d'aire d'atterrissage, de terrain plat ni de dégagement : on livre sur une pente, une crête, une terrasse de refuge ou au pied d'un pylône. La pesée intégrée vérifie la masse avant chaque vol." },
  { question: "Le drone remplace-t-il l'hélicoptère ?", answer: "Pas toujours. L'hélicoptère reste imbattable pour les charges de plusieurs centaines de kilos d'un seul tenant. Le drone est pertinent pour des volumes répartis en charges de moins de 100 kg, des rotations répétées, ou quand mobiliser un hélicoptère est disproportionné." },
  { question: "Quelles autorisations faut-il ?", answer: "Un drone de cette taille vole obligatoirement en catégorie spécifique, avec une analyse de risque SORA et une autorisation délivrée par la DGAC. C'est à notre charge, et notre dossier est en cours d'instruction auprès de la DSAC. De votre côté, l'opération est intégrée à vos documents de prévention (PPSPS, plan de prévention) et la zone de dépose est sécurisée." },
  { question: "Et si la météo se dégrade ?", answer: "Le FlyCart 100 décolle et atterrit avec un vent jusqu'à 12 m/s, de -20 à 40 °C, et résiste à la pluie (IP55). Au-delà, on reporte : la décision se prend le jour même, sur place, et la sécurité passe avant le planning." },
  { question: "Quels types de charges ?", answer: "Matériaux et outillage de chantier, sacs de mortier, pièces techniques, vivres et matériel de refuge, approvisionnement de bergeries ou d'exploitations isolées. Les matières dangereuses font l'objet d'une étude spécifique." },
  { question: "Quand le service sera-t-il disponible ?", answer: "Le pôle transport est en préparation. Inscrivez-vous pour être prévenu du lancement : les premiers clients bénéficieront de conditions privilégiées, et on peut déjà étudier la faisabilité de votre projet." },
];

export const subServiceHref = (pole: Pole, sub: PoleSubService) =>
  pole.isInDevelopment && !sub.hasPage
    ? `/pole/${pole.slug}#sous-services`
    : `/pole/${pole.slug}/${sub.slug}`;

// Sub-services listed in menus: when a pole has dedicated pages, only those
// are shown (the rest stay on the pole page); otherwise every linked one.
export const menuSubServices = (pole: Pole) => {
  const linked = pole.subServices.filter((s) => s.slug);
  const withPage = linked.filter((s) => s.hasPage);
  return withPage.length > 0 ? withPage : linked;
};

// Agriculture: DJI Agras T100 (ag.dji.com/t100/specs), DJI Mavic 3
// Multispectral (ag.dji.com/mavic-3-m/specs), drone spraying rules from the
// ministry notice of 10/06/2026 (loi 2025-365, texts of 29 May 2026).
const AGRI_WHY: WhyDroneItem[] = [
  {
    iconName: "ScanEye",
    title: "Voir l'invisible",
    description:
      "Une plante traduit son état dans le proche infrarouge avant que l'œil ne le voie. La cartographie multispectrale révèle les zones qui décrochent, à l'échelle de la parcelle.",
  },
  {
    iconName: "Mountain",
    title: "Fait pour la pente",
    description:
      "Vignes en coteaux, terrasses, vergers en relief : le drone intervient là où le tracteur peine ou ne passe pas, sans risque de renversement.",
  },
  {
    iconName: "Footprints",
    title: "Zéro tassement",
    description:
      "Aucun passage d'engin sur la parcelle : pas d'ornières, pas de compaction du sol, intervention possible sur terrain humide.",
  },
  {
    iconName: "Crosshair",
    title: "Précision RTK",
    description:
      "Positionnement centimétrique en RTK : des cartes superposables d'un passage à l'autre, et des apports placés là où la carte l'indique.",
  },
];

const AGRI_PROCESS: ProcessStep[] = [
  { number: "ÉTAPE 01", title: "Votre question", description: "Culture, parcelles, problème observé ou objectif (irrigation, vigueur, apports) : on définit ensemble ce que la mission doit mesurer ou faire." },
  { number: "ÉTAPE 02", title: "Plan de vol et autorisations", description: "Plan de vol adapté au relief et à la résolution utile. Les drones lourds volent en catégorie spécifique, sur autorisation de la DGAC, à notre charge." },
  { number: "ÉTAPE 03", title: "Vol", description: "Captation multispectrale, épandage ou semis, au bon moment de la saison et dans la bonne fenêtre météo." },
  { number: "ÉTAPE 04", title: "Traitement des données", description: "Orthomosaïques, cartes d'indices de végétation, zones homogènes : des couches géoréférencées exportables vers vos outils." },
  { number: "ÉTAPE 05", title: "Restitution", description: "Lecture claire des résultats. La décision agronomique reste la vôtre et celle de vos conseillers : on fournit une donnée fiable, pas un diagnostic magique." },
];

const AGRI_FAQ: PoleFAQItem[] = [
  { question: "Que mesure une cartographie multispectrale ?", answer: "La réflectance de la végétation dans quatre bandes (vert, rouge, red edge, proche infrarouge). On en tire des indices comme le NDVI ou le NDRE, qui cartographient la vigueur et les hétérogénéités d'une parcelle, et aident à repérer un stress hydrique avant qu'il ne se voie." },
  { question: "Quelle surface peut-on cartographier ?", answer: "Le constructeur annonce jusqu'à 200 ha par vol pour son drone multispectral, dans ses conditions de test. La surface réelle dépend de la résolution demandée, du relief et de la météo : sur de la vigne, où l'on veut voir le rang, on vole plus bas et on couvre moins." },
  { question: "Peut-on traiter la vigne par drone en Corse ?", answer: "Depuis les textes du 29 mai 2026, la pulvérisation par drone est autorisée par dérogation sur les parcelles en pente d'au moins 20 %, les bananeraies et les vignes-mères conduites au sol, uniquement avec des produits de biocontrôle, utilisables en agriculture biologique ou à faible risque inscrits sur la liste drone. Il faut une autorisation du préfet de région, du matériel anti-dérive agréé, et respecter 20 m des lieux habités. Nous proposerons ce service dès que toutes ces conditions seront réunies." },
  { question: "L'épandage d'engrais et le semis sont-ils concernés ?", answer: "L'interdiction de pulvérisation aérienne vise les produits phytopharmaceutiques. L'épandage d'engrais et le semis de couverts n'en relèvent pas, mais le vol reste soumis à une autorisation de la DGAC, comme toute opération avec un drone lourd." },
  { question: "Quel drone utilisez-vous ?", answer: "Un drone multispectral DJI pour la cartographie, et le DJI Agras T100 pour l'épandage, le semis et le levage : réservoir d'épandage de 150 L, jusqu'à 400 kg/min selon le constructeur, levage jusqu'à 100 kg." },
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
      "Acheminement de matériel vers les zones difficiles d'accès. Dépose au treuil, sans atterrir, pour vos chantiers isolés, refuges et sites sans piste.",
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
        name: "Alternative à l'hélicoptère",
        slug: "alternative-helicoptere",
        hasPage: true,
        category: "Drone ou hélico ?",
        description:
          "Pour les charges de moins de 100 kg et les rotations répétées, le drone évite de mobiliser un hélicoptère. Dépose au treuil, sans aire d'atterrissage.",
        iconName: "Plane",
      },
      {
        name: "Ravitaillement de refuges",
        slug: "refuges",
        hasPage: true,
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
    stat: { value: "100", unit: "kg", labelStrong: "de charge utile max par rotation", labelMuted: "85 kg en exploitation courante" },
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
      "Cartographie multispectrale, épandage et semis par drone. Lisez vos parcelles, intervenez là où il faut, sans passage de tracteur.",
    statLabel: "Multispectral",
    statValue: "4",
    statDetail: "bandes spectrales\nvert, rouge, red edge, proche infrarouge",
    comingSoon: true,
    pitch: "Lisez vos parcelles comme jamais : cartographie multispectrale de la vigueur et du stress hydrique, puis épandage et semis ciblés avec le DJI Agras T100, adaptés au terroir corse.",
    description:
      "Cartographie multispectrale, épandage et semis par drone. Une approche adaptée au terroir corse, aux parcelles en pente et aux cahiers des charges AOP, sans tassement des sols.",
    highlights: [
      "Précision RTK centimétrique",
      "Parcelles en pente",
      "Sans passage de tracteur",
    ],
    subServices: [
      {
        name: "Cartographie multispectrale",
        slug: "cartographie-multispectrale",
        category: "Diagnostic / Aide à la décision",
        description:
          "Quatre bandes (vert, rouge, red edge, proche infrarouge) et cartes d'indices de végétation (NDVI, NDRE) géoréférencées en RTK. Vigueur, hétérogénéités, stress hydrique : des cartes exploitables par vous et vos conseillers.",
        iconName: "Satellite",
      },
      {
        name: "Épandage de précision",
        slug: "epandage-precision",
        category: "Action / Réduction des intrants",
        description:
          "Engrais granulés et amendements, appliqués selon vos cartes de prescription. Réservoir d'épandage de 150 L, jusqu'à 400 kg/min (données constructeur DJI Agras T100).",
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
        name: "Traitements en biocontrôle",
        slug: "traitements-biocontrole",
        category: "À venir, cadre réglementaire 2026",
        description:
          "Produits de biocontrôle, utilisables en agriculture biologique ou à faible risque autorisés pour le drone, sur parcelles en pente d'au moins 20 %. Sur autorisation du préfet de région, dès que toutes les conditions seront réunies.",
        iconName: "Shield",
      },
      {
        name: "Blanchiment de serre",
        slug: "blanchiment-serre",
        category: "Régulation thermique",
        description:
          "Application de produits d'ombrage ou de déblanchiment, hors produits phytopharmaceutiques, pour réguler la luminosité et la température sous serre.",
        iconName: "Sun",
      },
      {
        name: "Transport & levage agricole",
        slug: "transport-levage-agricole",
        category: "Logistique zones isolées",
        description:
          "Levage jusqu'à 100 kg avec l'Agras T100 (câble de 10 m, 10 à 15 m recommandés) vers parcelles en montagne, bergeries et exploitations isolées.",
        iconName: "Package",
      },
    ],
    heroImage: agricultureImg,
    showcaseImage: agricultureShowcase,
    isInDevelopment: true,
    heroPoleNumber: "PÔLE 04",
    heroPitch:
      "Lisez vos parcelles comme jamais : cartographie multispectrale de la vigueur et du stress hydrique, puis épandage et semis ciblés avec le DJI Agras T100, adaptés au terroir corse.",
    whyDroneItems: AGRI_WHY,
    processSteps: AGRI_PROCESS,
    useCases: undefined,
    poleFAQ: AGRI_FAQ,
    finalCTATitle: "Service en préparation.",
    finalCTASubtitle: "Inscrivez-vous pour être informé du lancement et obtenir des conditions privilégiées.",
    finalCTAButtonLabel: "Être prévenu du lancement",
    stat: { value: "4", unit: "bandes", labelStrong: "spectrales en multispectral", labelMuted: "vert, rouge, red edge, proche infrarouge" },
  },
];
