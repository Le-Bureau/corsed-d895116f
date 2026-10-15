// Service × city pages (/demoussage-toiture-bastia, …). Each one answers the
// search a client actually types ("démoussage toiture Bastia"), with facts
// already established on the site: the method and products from our articles,
// real references, regulated zones. No descriptive prose about the place.

import { CANARI_REF, type LocalReference } from "@/lib/localAreas";
import type { RelatedArticle } from "@/lib/relatedContent";
import { FAQ_PRICE_SOLAR, faqPriceFacade, faqPriceRoof, minTTC } from "@/lib/prices";

export interface LocalServicePageData {
  path: string;
  city: string;
  /** Local page of the surrounding area (breadcrumb parent). */
  zonePath: string;
  zoneLabel: string;
  pole: "nettoyage" | "diagnostic";
  serviceHref: string;
  serviceLabel: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  methodTitle: string;
  method: { title: string; text: string }[];
  localTitle: string;
  local: string[];
  towns: string;
  reference?: LocalReference;
  referenceTitle?: string;
  faq: { question: string; answer: string }[];
  articles: RelatedArticle[];
  ctaTitle: string;
}

export const DELAY =
  "Pour les opérations sous certification, la réglementation impose au moins 10 jours entre la demande de vol et l'intervention. Nous les intégrons d'office au planning.";

const CAB: LocalReference = {
  place: "Bastia",
  client: "Communauté d'Agglomération de Bastia",
  title: "Deux bâtiments publics inspectés en une journée",
  figures: "Toitures couvertes à 100 %, modèle 3D livré",
  href: "/blog/inspection-toiture-drone-cab-bastia",
};

const TENERGIE: LocalReference = {
  place: "Propriano",
  client: "Tenergie",
  title: "Thermographie d'une centrale solaire au sol",
  figures: "1 MWc inspecté en une heure de vol",
};

const TOITURE_METHOD = [
  {
    title: "Photos et devis",
    text: "Vous nous envoyez quelques photos de la toiture : nous choisissons le traitement et la formule, avec un prix ferme dans le devis.",
  },
  {
    title: "Traitement fongicide",
    text: "Fongicide professionnel DALEP UC, avec l'additif D'BOOST contre les traces de pollution ou D21 sur les supports poreux. Il faut 12 à 24 heures sans pluie après l'application.",
  },
  {
    title: "Action dans la durée",
    text: "Le produit agit sur 6 à 10 mois : mousses et lichens se décolorent puis partent avec les pluies. L'effet dure en général 3 à 5 ans.",
  },
  {
    title: "Hydrofuge en option",
    text: "Un hydrofuge Périmètre HYDRAFUGE imperméabilise les tuiles et espace les entretiens : 5 à 10 ans selon l'exposition.",
  },
];

const PANNEAUX_METHOD = [
  {
    title: "Eau seule d'abord",
    text: "Une eau adoucie pulvérisée en fine brume suffit dans la plupart des cas, sans laisser de traces.",
  },
  {
    title: "Produit spécifique si besoin",
    text: "Pour le sel cristallisé ou les fientes durcies : un produit biodégradable, conforme aux recommandations des fabricants de panneaux.",
  },
  {
    title: "Pression adaptée",
    text: "Basse pression sur les dépôts fins, montée progressive sur les salissures tenaces, jamais de jet frontal puissant sur les modules.",
  },
  {
    title: "Compte-rendu",
    text: "Photos avant et après, et signalement des anomalies visibles pendant le passage (cellule défectueuse, cadre abîmé).",
  },
];

const TOITURE_ARTICLES: RelatedArticle[] = [
  {
    slug: "nettoyage-toiture-drone-corse",
    label: "Démousser une toiture en Corse : méthode, produits, fréquence",
  },
];
const PANNEAUX_ARTICLES: RelatedArticle[] = [
  {
    slug: "nettoyage-panneaux-solaires-drone-corse",
    label: "Panneaux solaires en Corse : quand et comment les nettoyer",
  },
  {
    slug: "sable-sahara-panneaux-solaires-corse",
    label: "Sable du Sahara : ce qu'il coûte à votre production solaire",
  },
];

export const LOCAL_SERVICE_PAGES: LocalServicePageData[] = [
  {
    path: "/demoussage-toiture-bastia",
    city: "Bastia",
    zonePath: "/drone-bastia-haute-corse",
    zoneLabel: "Bastia et Haute-Corse",
    pole: "nettoyage",
    serviceHref: "/pole/nettoyage/toitures",
    serviceLabel: "Nettoyage et démoussage de toiture",
    h1: "Démoussage de toiture à Bastia",
    metaTitle: "Démoussage de toiture à Bastia, sans échafaudage",
    metaDescription:
      "Démoussage de toiture par drone à Bastia et dans le Grand Bastia : traitement fongicide, hydrofuge en option, sans échafaudage ni marche sur les tuiles.",
    intro:
      "Nous démoussons et traitons les toitures par drone à Bastia et dans le Grand Bastia, de Pietranera à Furiani. Le drone pulvérise le traitement depuis les airs : pas d'échafaudage dans la rue, personne ne marche sur les tuiles.",
    methodTitle: "Comment on traite votre toiture",
    method: TOITURE_METHOD,
    localTitle: "À Bastia",
    local: [
      "Immeubles et copropriétés du centre : pas d'échafaudage ni de nacelle à installer sur la voie publique, seulement un périmètre sécurisé au sol pendant le vol.",
      "Le centre-ville et les abords de l'aéroport de Bastia-Poretta sont des zones réglementées : nous vérifions chaque adresse et faisons les déclarations nécessaires.",
      DELAY,
    ],
    towns:
      "Bastia, Ville-di-Pietrabugno, San-Martino-di-Lota, Santa-Maria-di-Lota, Furiani, Biguglia, Borgo",
    reference: CAB,
    referenceTitle: "Une référence à Bastia",
    faq: [
      {
        question: "Combien coûte un démoussage de toiture à Bastia ?",
        answer: faqPriceRoof("2B"),
      },
      {
        question: "À quelle période faire démousser sa toiture ?",
        answer:
          "Hors période de gel, sur une toiture sèche, avec 12 à 24 heures sans pluie après l'application. Le printemps et l'automne sont les périodes les plus confortables.",
      },
      {
        question: "Traitez-vous les toitures de copropriété ?",
        answer:
          "Oui. Pour un syndic, nous fournissons les photos avant et après et un devis présentable en assemblée générale.",
      },
      {
        question: "Faut-il refaire le traitement chaque année ?",
        answer:
          "Non. Le traitement fongicide tient en général 3 à 5 ans selon l'exposition, et 5 à 10 ans avec l'hydrofuge en option. Une inspection visuelle annuelle reste conseillée.",
      },
    ],
    articles: [
      ...TOITURE_ARTICLES,
      {
        slug: "inspection-toiture-drone-cab-bastia",
        label: "Inspection de toitures pour la CAB à Bastia",
      },
    ],
    ctaTitle: "Une toiture à démousser à Bastia ?",
  },
  {
    path: "/inspection-toiture-bastia",
    city: "Bastia",
    zonePath: "/drone-bastia-haute-corse",
    zoneLabel: "Bastia et Haute-Corse",
    pole: "diagnostic",
    serviceHref: "/pole/diagnostic/visuel",
    serviceLabel: "Inspection visuelle par drone",
    h1: "Inspection de toiture par drone à Bastia",
    metaTitle: "Inspection de toiture par drone à Bastia",
    metaDescription:
      "Inspection de toitures par drone à Bastia : photos haute résolution, anomalies localisées sur une maquette 3D dans Axio, sans nacelle ni cordiste.",
    intro:
      "Nous inspectons les toitures par drone à Bastia et dans le Grand Bastia. Chaque anomalie est photographiée en haute résolution et positionnée sur une maquette 3D, consultable en ligne dans Axio. C'est la méthode utilisée pour la Communauté d'Agglomération de Bastia.",
    methodTitle: "Comment se déroule l'inspection",
    method: [
      {
        title: "Vol d'inspection",
        text: "Le drone photographie toute la toiture à distance constante, sans nacelle ni cordiste, sans arrêter l'activité du bâtiment.",
      },
      {
        title: "Maquette 3D",
        text: "Les images sont assemblées en un modèle 3D du bâtiment.",
      },
      {
        title: "Anomalies localisées",
        text: "Chaque défaut relevé (tuile déplacée, fissure, point d'étanchéité) est épinglé à sa position sur la maquette, avec sa photo.",
      },
      {
        title: "Rapport",
        text: "Vous recevez le rapport PDF et un accès sécurisé à la maquette dans Axio.",
      },
    ],
    localTitle: "À Bastia",
    local: [
      "Bâtiments publics, copropriétés, locaux d'activité : l'inspection se fait sans occuper la voirie ni fermer le bâtiment.",
      "Le centre-ville et les abords de l'aéroport de Bastia-Poretta sont des zones réglementées : nous vérifions chaque adresse et faisons les déclarations nécessaires.",
      DELAY,
    ],
    towns:
      "Bastia, Ville-di-Pietrabugno, San-Martino-di-Lota, Santa-Maria-di-Lota, Furiani, Biguglia, Borgo",
    reference: CAB,
    referenceTitle: "Notre référence à Bastia",
    faq: [
      {
        question: "Que contient le rapport d'inspection ?",
        answer:
          "La liste des anomalies classées et localisées, avec leurs photos, un rapport PDF et un accès sécurisé à la maquette 3D dans Axio.",
      },
      {
        question: "Faut-il fermer le bâtiment pendant l'inspection ?",
        answer:
          "Non. Le drone vole au-dessus du bâtiment et l'activité continue. Seul un périmètre au sol est sécurisé pendant le vol.",
      },
      {
        question: "L'inspection remplace-t-elle un couvreur ?",
        answer:
          "Non. Elle montre précisément où intervenir. Les réparations restent l'affaire d'un couvreur, qui gagne du temps avec un rapport localisé.",
      },
    ],
    articles: [
      {
        slug: "inspection-toiture-drone-cab-bastia",
        label: "Inspection de toitures pour la CAB à Bastia",
      },
    ],
    ctaTitle: "Une toiture à inspecter à Bastia ?",
  },
  {
    path: "/nettoyage-panneaux-solaires-bastia",
    city: "Bastia",
    zonePath: "/drone-bastia-haute-corse",
    zoneLabel: "Bastia et Haute-Corse",
    pole: "nettoyage",
    serviceHref: "/pole/nettoyage/panneaux-solaires",
    serviceLabel: "Nettoyage de panneaux solaires",
    h1: "Nettoyage de panneaux solaires à Bastia",
    metaTitle: "Nettoyage de panneaux solaires à Bastia, par drone",
    metaDescription:
      "Nettoyage de panneaux photovoltaïques par drone à Bastia et dans le Grand Bastia : eau adoucie, produit spécifique si besoin, sans marcher sur les modules.",
    intro:
      "Nous nettoyons les panneaux photovoltaïques par drone à Bastia et dans le Grand Bastia : toitures de maisons et d'immeubles, hangars, bâtiments d'activité. Le drone passe au-dessus des modules, sans contact mécanique et sans que personne monte sur le toit.",
    methodTitle: "Comment on nettoie vos panneaux",
    method: PANNEAUX_METHOD,
    localTitle: "À Bastia",
    local: [
      "Installations du bord de mer : dans le premier kilomètre, un nettoyage deux fois par an est recommandé.",
      "Le centre-ville et les abords de l'aéroport de Bastia-Poretta sont des zones réglementées : nous vérifions chaque adresse et faisons les déclarations nécessaires.",
      DELAY,
    ],
    towns:
      "Bastia, Ville-di-Pietrabugno, San-Martino-di-Lota, Furiani, Biguglia, Borgo, Lucciana",
    reference: TENERGIE,
    referenceTitle: "Une référence en photovoltaïque",
    faq: [
      {
        question: "À quelle fréquence nettoyer ses panneaux ?",
        answer:
          "Une fois par an au minimum, en sortie d'hiver. Deux fois par an en bord de mer immédiat, en zone agricole ou quand l'inclinaison est faible (moins de 15°).",
      },
      {
        question:
          "Le nettoyage par drone annule-t-il la garantie des panneaux ?",
        answer:
          "Non : personne ne marche sur les modules et nous n'utilisons que des produits conformes aux recommandations des fabricants.",
      },
      {
        question: "Combien coûte le nettoyage de panneaux solaires à Bastia ?",
        answer: FAQ_PRICE_SOLAR,
      },
      {
        question: "À partir de quelle surface le drone est-il intéressant ?",
        answer:
          "En général à partir de 30 à 40 m² de panneaux, ou quand la toiture est difficile d'accès. En dessous, nous vous le disons franchement et vous orientons vers une autre méthode.",
      },
    ],
    articles: PANNEAUX_ARTICLES,
    ctaTitle: "Des panneaux à nettoyer à Bastia ?",
  },
  {
    path: "/thermographie-batiment-bastia",
    city: "Bastia",
    zonePath: "/drone-bastia-haute-corse",
    zoneLabel: "Bastia et Haute-Corse",
    pole: "diagnostic",
    serviceHref: "/pole/diagnostic/thermique",
    serviceLabel: "Thermographie par drone",
    h1: "Thermographie de bâtiments à Bastia",
    metaTitle: "Thermographie de bâtiments par drone à Bastia",
    metaDescription:
      "Thermographie de bâtiments par drone à Bastia : ponts thermiques, défauts d'isolation et infiltrations, en saison de chauffe. Rapport dans Spectra.",
    intro:
      "Nous réalisons la thermographie des bâtiments par drone à Bastia et dans le Grand Bastia : immeubles et copropriétés, bâtiments publics, locaux d'activité, toitures-terrasses. La caméra radiométrique repère les ponts thermiques, les défauts d'isolation et les infiltrations, sans nacelle ni échafaudage.",
    methodTitle: "Ce que la caméra révèle, et quand",
    method: [
      {
        title: "Ponts thermiques et isolation",
        text: "Jonctions entre structure et isolation, encadrements, balcons, planchers ; isolation tassée, déchirée ou mal posée ; fuites d'air aux menuiseries et aux joints.",
      },
      {
        title: "Infiltrations d'eau",
        text: "Sur les toitures-terrasses, les zones humides gardent la chaleur plus longtemps que les zones sèches. Nous volons en début de nuit pour les distinguer.",
      },
      {
        title: "La bonne fenêtre",
        text: "En saison de chauffe, d'octobre à mars, avec au moins 10 °C d'écart entre l'intérieur et l'extérieur : tôt le matin, par temps couvert ou après le coucher du soleil.",
      },
      {
        title: "Rapport dans Spectra",
        text: "Images thermiques annotées, anomalies localisées sur le bâtiment et conditions de prise de vue documentées : un rapport interprétable et défendable.",
      },
    ],
    localTitle: "À Bastia",
    local: [
      "Copropriétés : la thermographie aide à préparer un plan pluriannuel de travaux et à prioriser les rénovations.",
      "Bâtiments publics : écoles, mairies, gymnases et salles polyvalentes, avant de programmer des travaux.",
      "Le centre-ville et les abords de l'aéroport de Bastia-Poretta sont des zones réglementées : nous vérifions chaque adresse et faisons les déclarations nécessaires.",
      DELAY,
    ],
    towns:
      "Bastia, Ville-di-Pietrabugno, San-Martino-di-Lota, Santa-Maria-di-Lota, Furiani, Biguglia, Borgo",
    reference: CAB,
    referenceTitle: "Une référence à Bastia",
    faq: [
      {
        question: "Peut-on faire une thermographie de bâtiment en été ?",
        answer:
          "Non : il faut au moins 10 °C d'écart entre l'intérieur chauffé et l'extérieur. Si vous nous la demandez en août, nous vous proposerons une date en saison de chauffe, entre octobre et mars.",
      },
      {
        question: "La thermographie remplace-t-elle un DPE ?",
        answer:
          "Non. Le DPE repose sur des calculs normés, pas sur de l'imagerie thermique. La thermographie localise les anomalies ; le dimensionnement des travaux relève d'un bureau d'études thermique.",
      },
      {
        question: "Travaillez-vous pour des bureaux d'études ?",
        answer:
          "Oui, en sous-traitance de captation : nous fournissons des images thermiques calibrées et documentées, et le bureau d'études garde l'analyse pour son client.",
      },
      {
        question: "Combien coûte une thermographie de bâtiment ?",
        answer:
          "Sur devis, selon la surface, la hauteur, le nombre de bâtiments et le rapport attendu. Décrivez-nous le bâtiment et l'objectif : nous vous dirons aussi si la thermographie est la bonne méthode.",
      },
    ],
    articles: [
      {
        slug: "diagnostic-thermique-drone-corse",
        label: "Thermographie par drone : ce qu'elle révèle, ses limites",
      },
    ],
    ctaTitle: "Un bâtiment à diagnostiquer à Bastia ?",
  },
  {
    path: "/demoussage-toiture-saint-florent",
    city: "Saint-Florent",
    zonePath: "/drone-bastia-haute-corse",
    zoneLabel: "Bastia et Haute-Corse",
    pole: "nettoyage",
    serviceHref: "/pole/nettoyage/toitures",
    serviceLabel: "Nettoyage et démoussage de toiture",
    h1: "Démoussage de toiture à Saint-Florent",
    metaTitle: "Démoussage de toiture à Saint-Florent et dans le Nebbio",
    metaDescription:
      "Démoussage de toiture par drone à Saint-Florent et dans le Nebbio : traitement fongicide, hydrofuge en option, sans échafaudage. Base voisine, à Ogliastro.",
    intro:
      "Nous démoussons et traitons les toitures par drone à Saint-Florent et dans tout le Nebbio, de Patrimonio à Oletta et jusqu'aux villages du Haut-Nebbio. Notre base d'Ogliastro est à quelques communes au nord, sur la côte ouest du Cap Corse. Le traitement est pulvérisé depuis les airs : pas d'échafaudage, personne ne marche sur les tuiles.",
    methodTitle: "Comment on traite votre toiture",
    method: TOITURE_METHOD,
    localTitle: "Dans le Nebbio",
    local: [
      "Maisons de village et toitures anciennes : le traitement est pulvérisé sans marcher sur la toiture, ce qui évite de casser les tuiles ou de déplacer les lauzes.",
      `Le Nebbio est voisin de notre base : en Haute-Corse, le minimum de ${minTTC("2B")} comprend le déplacement.`,
      "Avant chaque mission, nous vérifions l'adresse sur la carte des restrictions de vol et faisons les déclarations nécessaires.",
      DELAY,
    ],
    towns:
      "Saint-Florent, Patrimonio, Farinole, Barbaggio, Oletta, Poggio-d'Oletta, Olmeta-di-Tuda, Vallecalle, Santo-Pietro-di-Tenda, San-Gavino-di-Tenda, Murato, Rapale, Pieve, Sorio, Rutali",
    reference: CANARI_REF,
    referenceTitle: "Notre mission de pulvérisation la plus proche",
    faq: [
      {
        question: "Combien coûte un démoussage de toiture à Saint-Florent ?",
        answer: faqPriceRoof("2B"),
      },
      {
        question: "Intervenez-vous dans les villages du Haut-Nebbio ?",
        answer:
          "Oui : Murato, Rapale, Santo-Pietro-di-Tenda et tous les villages du Nebbio, pas seulement le littoral. Le traitement se fait depuis les airs, sans accès au toit.",
      },
      {
        question: "Le traitement abîme-t-il les vieilles toitures ?",
        answer:
          "Non : personne ne monte sur le toit, et le produit comme la pression sont adaptés au support, tuiles anciennes ou lauzes.",
      },
    ],
    articles: TOITURE_ARTICLES,
    ctaTitle: "Une toiture à démousser dans le Nebbio ?",
  },
  {
    path: "/demoussage-toiture-ajaccio",
    city: "Ajaccio",
    zonePath: "/drone-ajaccio-corse-du-sud",
    zoneLabel: "Ajaccio et Corse-du-Sud",
    pole: "nettoyage",
    serviceHref: "/pole/nettoyage/toitures",
    serviceLabel: "Nettoyage et démoussage de toiture",
    h1: "Démoussage de toiture à Ajaccio",
    metaTitle: "Démoussage de toiture à Ajaccio, sans échafaudage",
    metaDescription:
      "Démoussage de toiture par drone à Ajaccio et dans le pays ajaccien : traitement fongicide, hydrofuge en option, sans échafaudage ni marche sur les tuiles.",
    intro:
      "Nous démoussons et traitons les toitures par drone à Ajaccio et dans le pays ajaccien, de Porticcio à Sarrola-Carcopino. Le traitement est pulvérisé depuis les airs, sans échafaudage et sans que personne marche sur les tuiles.",
    methodTitle: "Comment on traite votre toiture",
    method: TOITURE_METHOD,
    localTitle: "À Ajaccio",
    local: [
      "Les missions dans le pays ajaccien sont planifiées à l'avance et regroupées par secteur, pour limiter les déplacements depuis notre base du Cap Corse.",
      "Les abords de l'aéroport d'Ajaccio Napoléon-Bonaparte sont une zone réglementée : nous vérifions chaque adresse et faisons les déclarations nécessaires.",
      DELAY,
    ],
    towns:
      "Ajaccio, Porticcio, Bastelicaccia, Alata, Afa, Sarrola-Carcopino, Grosseto-Prugna",
    faq: [
      {
        question: "Combien coûte un démoussage de toiture à Ajaccio ?",
        answer: faqPriceRoof("2A"),
      },
      {
        question:
          "Vous êtes basés dans le Cap Corse : intervenez-vous vraiment à Ajaccio ?",
        answer:
          "Oui. Nous planifions les interventions du pays ajaccien à l'avance et les regroupons par secteur, ce qui limite les déplacements et leur coût.",
      },
      {
        question: "À quelle période faire démousser sa toiture ?",
        answer:
          "Hors période de gel, sur une toiture sèche, avec 12 à 24 heures sans pluie après l'application. Le printemps et l'automne sont les périodes les plus confortables.",
      },
      {
        question: "Combien de temps dure le traitement ?",
        answer:
          "Le traitement fongicide tient en général 3 à 5 ans selon l'exposition, et 5 à 10 ans avec l'hydrofuge en option.",
      },
    ],
    articles: TOITURE_ARTICLES,
    ctaTitle: "Une toiture à démousser à Ajaccio ?",
  },
  {
    path: "/nettoyage-panneaux-solaires-ajaccio",
    city: "Ajaccio",
    zonePath: "/drone-ajaccio-corse-du-sud",
    zoneLabel: "Ajaccio et Corse-du-Sud",
    pole: "nettoyage",
    serviceHref: "/pole/nettoyage/panneaux-solaires",
    serviceLabel: "Nettoyage de panneaux solaires",
    h1: "Nettoyage de panneaux solaires à Ajaccio",
    metaTitle: "Nettoyage de panneaux solaires à Ajaccio, par drone",
    metaDescription:
      "Nettoyage de panneaux photovoltaïques par drone à Ajaccio et dans le pays ajaccien : toitures, ombrières, hangars. Eau adoucie, sans marcher sur les modules.",
    intro:
      "Nous nettoyons les panneaux photovoltaïques par drone à Ajaccio et dans le pays ajaccien : toitures, ombrières de parking, hangars et bâtiments d'activité. Le drone passe au-dessus des modules, sans contact mécanique.",
    methodTitle: "Comment on nettoie vos panneaux",
    method: PANNEAUX_METHOD,
    localTitle: "À Ajaccio",
    local: [
      "Nettoyage et thermographie peuvent être couplés dans une même intervention, pour un seul déplacement.",
      "Les abords de l'aéroport d'Ajaccio Napoléon-Bonaparte sont une zone réglementée : nous vérifions chaque adresse et faisons les déclarations nécessaires.",
      DELAY,
    ],
    towns:
      "Ajaccio, Porticcio, Bastelicaccia, Alata, Afa, Sarrola-Carcopino, Grosseto-Prugna",
    reference: TENERGIE,
    referenceTitle: "Une référence en Corse-du-Sud",
    faq: [
      {
        question: "À quelle fréquence nettoyer ses panneaux ?",
        answer:
          "Une fois par an au minimum, en sortie d'hiver. Deux fois par an en bord de mer immédiat, en zone agricole ou quand l'inclinaison est faible (moins de 15°).",
      },
      {
        question: "Combien coûte le nettoyage de panneaux solaires à Ajaccio ?",
        answer: FAQ_PRICE_SOLAR,
      },
      {
        question: "Pouvez-vous aussi contrôler l'installation ?",
        answer:
          "Oui : une thermographie selon la méthodologie IEC TS 62446-3 repère les cellules défectueuses et les points chauds. Elle peut être faite pendant le même déplacement que le nettoyage.",
      },
      {
        question:
          "Le nettoyage par drone annule-t-il la garantie des panneaux ?",
        answer:
          "Non : personne ne marche sur les modules et nous n'utilisons que des produits conformes aux recommandations des fabricants.",
      },
    ],
    articles: PANNEAUX_ARTICLES,
    ctaTitle: "Des panneaux à nettoyer à Ajaccio ?",
  },
  {
    path: "/thermographie-photovoltaique-propriano",
    city: "Propriano",
    zonePath: "/drone-propriano-valinco",
    zoneLabel: "Propriano et Valinco",
    pole: "diagnostic",
    serviceHref: "/pole/diagnostic/thermique",
    serviceLabel: "Thermographie par drone",
    h1: "Thermographie photovoltaïque à Propriano",
    metaTitle: "Thermographie photovoltaïque par drone à Propriano",
    metaDescription:
      "Thermographie de centrales et toitures solaires par drone à Propriano et dans le Valinco, selon IEC TS 62446-3. Référence : 1 MWc pour Tenergie.",
    intro:
      "Nous réalisons la thermographie par drone des installations photovoltaïques à Propriano et dans le Valinco : centrales au sol, toitures et ombrières. C'est ici que nous avons inspecté la centrale au sol de 1 MWc de Tenergie, en une heure de vol.",
    methodTitle: "Notre méthode",
    method: [
      {
        title: "Cadre normatif",
        text: "Méthodologie IEC TS 62446-3:2017 : irradiance d'au moins 600 W/m², installation en charge, plan de vol calibré pour 5 × 5 pixels minimum par cellule.",
      },
      {
        title: "Caméra radiométrique",
        text: "Zenmuse H30T, résolution thermique 1280 × 1024.",
      },
      {
        title: "Classement des anomalies",
        text: "Point chaud avéré au-delà de 10 K d'écart avec les cellules voisines, boîte de jonction ou sous-réseau anormal au-delà de 4 K.",
      },
      {
        title: "Rapport dans Spectra",
        text: "Chaque anomalie est numérotée, classée et positionnée sur l'orthomosaïque du site, avec un rapport PDF et un export exploitable par la maintenance.",
      },
    ],
    localTitle: "À Propriano",
    local: [
      "Centrale au sol de 1 MWc pour Tenergie : une heure de vol sur site et une demi-journée de traitement des données.",
      "Les abords de l'aérodrome de Propriano-Tavaria sont une zone réglementée : nous vérifions chaque site et faisons les déclarations nécessaires.",
      DELAY,
    ],
    towns:
      "Propriano, Olmeto, Viggianello, Sartène, Belvédère-Campomoro, Serra-di-Ferro",
    reference: TENERGIE,
    referenceTitle: "Notre référence à Propriano",
    faq: [
      {
        question: "Quand faire la thermographie d'une installation solaire ?",
        answer:
          "En pleine production, par temps clair : la méthodologie demande une irradiance d'au moins 600 W/m². L'été est la meilleure période.",
      },
      {
        question: "À quoi sert le rapport ?",
        answer:
          "À la maintenance et au suivi d'un parc, à une réclamation de garantie constructeur, à une expertise après sinistre ou au contrôle d'une installation neuve.",
      },
      {
        question: "Combien de temps faut-il sur site ?",
        answer:
          "Pour la centrale au sol de 1 MWc de Tenergie, une heure de vol, puis une demi-journée de traitement des données.",
      },
    ],
    articles: [
      {
        slug: "diagnostic-thermique-drone-corse",
        label: "Thermographie par drone : ce qu'elle révèle, ses limites",
      },
    ],
    ctaTitle: "Une installation solaire à contrôler dans le Valinco ?",
  },
  {
    path: "/nettoyage-facade-porto-vecchio",
    city: "Porto-Vecchio",
    zonePath: "/drone-porto-vecchio-extreme-sud",
    zoneLabel: "Porto-Vecchio et Extrême-Sud",
    pole: "nettoyage",
    serviceHref: "/pole/nettoyage/facades",
    serviceLabel: "Nettoyage de façade",
    h1: "Nettoyage de façade à Porto-Vecchio",
    metaTitle: "Nettoyage de façade par drone à Porto-Vecchio",
    metaDescription:
      "Nettoyage de façades par drone à Porto-Vecchio et dans l'Extrême-Sud : villas, hôtels, résidences, sans échafaudage ni nacelle. Traitement adapté au support.",
    intro:
      "Nous nettoyons les façades par drone à Porto-Vecchio et dans l'Extrême-Sud : villas, résidences de tourisme, hôtels et immeubles. Le drone pulvérise le traitement à 1 ou 2 mètres de la façade, sans échafaudage ni nacelle dans le jardin.",
    methodTitle: "Comment on nettoie votre façade",
    method: [
      {
        title: "Produit adapté au support",
        text: "Eau adoucie pour la pierre, traitement anti-biofilm biodégradable pour les enduits, produits compatibles avec les matériaux anciens.",
      },
      {
        title: "Traitement puis rinçage",
        text: "Le traitement anti-biofilm est pulvérisé, puis la façade est rincée de façon contrôlée. Il faut 24 heures sans pluie après l'intervention.",
      },
      {
        title: "Distance et pression",
        text: "Le télépilote garde le drone à 1 ou 2 mètres de la façade et adapte la pression au support et aux ouvertures.",
      },
      {
        title: "Hydrofuge en option",
        text: "6 à 8 mois après le nettoyage, un traitement hydrofuge repousse l'eau et les salissures pendant 5 ans et plus.",
      },
    ],
    localTitle: "À Porto-Vecchio",
    local: [
      "Villas et résidences de tourisme : prévoyez l'intervention au printemps, avant l'arrivée des locataires ou des clients.",
      "Les missions dans l'Extrême-Sud sont planifiées à l'avance et regroupées par secteur, pour limiter les déplacements depuis notre base du Cap Corse.",
      "Les abords de l'aéroport de Figari Sud-Corse sont une zone réglementée : nous vérifions chaque adresse et faisons les déclarations nécessaires.",
      DELAY,
    ],
    towns:
      "Porto-Vecchio, Lecci, Sainte-Lucie-de-Porto-Vecchio, Pinarellu, Conca, Zonza, Sotta, Figari, Bonifacio",
    reference: TENERGIE,
    referenceTitle: "Une référence en Corse-du-Sud",
    faq: [
      {
        question: "Combien coûte un nettoyage de façade à Porto-Vecchio ?",
        answer: faqPriceFacade("2A"),
      },
      {
        question: "À quelle fréquence nettoyer une façade en bord de mer ?",
        answer:
          "Tous les 3 à 5 ans pour une façade exposée au sel marin, tous les 5 à 10 ans pour une façade abritée.",
      },
      {
        question: "Faut-il quitter la maison pendant le nettoyage ?",
        answer:
          "Non. Le périmètre de sécurité au sol est limité et la maison reste occupée : il suffit de fermer les fenêtres du niveau traité.",
      },
      {
        question: "Nettoyez-vous la pierre et le granite ?",
        answer:
          "Oui, avec une approche adaptée : eau adoucie ou produits compatibles avec les matériaux anciens, pour la pierre de taille, les moellons et le granite.",
      },
    ],
    articles: [],
    ctaTitle: "Une façade à nettoyer à Porto-Vecchio ?",
  },
];

/** Service × city pages that detail a given service page (for internal links). */
export const localPagesForService = (serviceHref: string) =>
  LOCAL_SERVICE_PAGES.filter((p) => p.serviceHref === serviceHref);
