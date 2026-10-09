// Local landing pages (/drone-bastia-haute-corse, /drone-ajaccio-corse-du-sud).
// Only facts already established on the site (services, references,
// regulation): no invented delays, prices or travel times.

export interface LocalReference {
  place: string;
  client: string;
  title: string;
  figures?: string;
  href?: string;
}

export interface LocalArea {
  path: string;
  eyebrow: string;
  titleStart: string;
  titleAccent: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  servicesTitle: string;
  climateTitle: string;
  climateIntro: string;
  climate: { title: string; text: string }[];
  referencesTitle: string;
  references: LocalReference[];
  areasTitle: string;
  areasIntro: string;
  areas: { zone: string; towns: string }[];
  faq: { question: string; answer: string }[];
  ctaTitle: string;
  breadcrumb: string;
  areaServed: { type: "City" | "AdministrativeArea"; name: string }[];
}

export const LOCAL_SERVICES = [
  { label: "Nettoyage de toitures", href: "/pole/nettoyage/toitures", pole: "nettoyage", text: "Démoussage et traitement des tuiles, ardoises et lauzes, sans monter sur le toit." },
  { label: "Nettoyage de façades", href: "/pole/nettoyage/facades", pole: "nettoyage", text: "Enduits, pierre et immeubles hauts, sans échafaudage ni nacelle." },
  { label: "Panneaux solaires", href: "/pole/nettoyage/panneaux-solaires", pole: "nettoyage", text: "Sel, sable du Sahara, pollens : une production restaurée sans abîmer les modules." },
  { label: "Thermographie", href: "/pole/diagnostic/thermique", pole: "diagnostic", text: "Ponts thermiques, infiltrations, points chauds photovoltaïques et électriques." },
  { label: "Inspection visuelle", href: "/pole/diagnostic/visuel", pole: "diagnostic", text: "Toitures, façades et ouvrages inspectés sans nacelle ni cordiste, rapport localisé." },
  { label: "Photogrammétrie", href: "/pole/diagnostic/photogrammetrie", pole: "diagnostic", text: "Orthophotos, modèles 3D et relevés géoréférencés au centimètre." },
] as const;

const CAB_REF: LocalReference = {
  place: "Bastia",
  client: "Communauté d'Agglomération de Bastia",
  title: "Deux bâtiments publics inspectés en une journée",
  figures: "22 anomalies relevées, classées et localisées",
  href: "/blog/inspection-toiture-drone-cab-bastia",
};

const CANARI_REF: LocalReference = {
  place: "Canari, Cap Corse",
  client: "Térélian (groupe Vinci)",
  title: "Fixation amiante sur l'ancienne usine de Canari",
  figures: "1 500 m² traités sur 7 zones, équipe en zone verte",
  href: "/blog/canari-fixation-amiante-drone-terelian-vinci",
};

const DELAY_FAQ = {
  question: "Quel délai prévoir avant une intervention ?",
  answer: "Pour les opérations sous certification, la réglementation impose un délai minimum de 10 jours entre la demande de vol et son exécution. Nous l'intégrons d'office au planning, et nous établissons le devis dès que nous avons les éléments du site.",
};

export const LOCAL_AREAS: Record<"bastia" | "sud", LocalArea> = {
  bastia: {
    path: "/drone-bastia-haute-corse",
    eyebrow: "Zone d'intervention · Haute-Corse",
    titleStart: "Drone professionnel à Bastia",
    titleAccent: "et en Haute-Corse.",
    metaTitle: "Drone professionnel à Bastia et en Haute-Corse",
    metaDescription:
      "Nettoyage de toitures et façades, panneaux solaires, thermographie et inspection par drone à Bastia, dans le Cap Corse et toute la Haute-Corse. Devis rapide.",
    intro:
      "Basés à Ogliastro, dans le Cap Corse, nous intervenons à Bastia et dans toute la Haute-Corse : nettoyage de toitures et de façades, panneaux solaires, thermographie, inspection et relevés 3D. Sans échafaudage, sans nacelle, avec des références locales.",
    servicesTitle: "Ce qu'on fait à Bastia et en Haute-Corse.",
    climateTitle: "Ce que le climat bastiais fait à vos bâtiments.",
    climateIntro:
      "Entre la mer, le sirocco et les versants du Cap, les bâtiments de Haute-Corse s'encrassent plus vite qu'ailleurs. C'est pour ça qu'un entretien régulier, et une méthode qui n'abîme pas, comptent autant ici.",
    climate: [
      { title: "Les embruns", text: "De la place Saint-Nicolas à Pietranera, l'air marin dépose du sel qui cristallise sur les toitures, les façades et les panneaux, et attaque les fixations métalliques." },
      { title: "Le sirocco", text: "Il ramène régulièrement le sable saharien : un voile orangé qui retient l'humidité, favorise mousses et lichens, et fait chuter le rendement des panneaux solaires." },
      { title: "Un bâti dense et ancien", text: "Terra Vecchia, la citadelle, les immeubles hauts du centre : des rues étroites où un échafaudage ou une nacelle coûtent cher et bloquent tout. Le drone, lui, passe au-dessus." },
      { title: "L'humidité des versants", text: "Dans le Cap Corse, le Nebbio ou la Castagniccia, les versants nord et les villages boisés restent humides : les toitures verdissent vite et retiennent l'eau." },
    ],
    referencesTitle: "Ils nous ont confié leurs chantiers.",
    references: [CAB_REF, CANARI_REF],
    areasTitle: "De Bastia au Cap, de la Balagne à la plaine.",
    areasIntro:
      "Notre base est à Ogliastro, au cœur du Cap Corse. Voici les secteurs où nous intervenons le plus souvent, la liste n'est pas exhaustive.",
    areas: [
      { zone: "Agglomération de Bastia", towns: "Bastia, Ville-di-Pietrabugno, San-Martino-di-Lota, Santa-Maria-di-Lota, Furiani, Biguglia" },
      { zone: "Cap Corse", towns: "Ogliastro, Canari, Nonza, Luri, Rogliano, Macinaggio, Erbalunga, Sisco, Pino" },
      { zone: "Nebbio et Balagne", towns: "Saint-Florent, Patrimonio, Oletta, L'Île-Rousse, Calvi, Algajola" },
      { zone: "Marana, Casinca et plaine orientale", towns: "Borgo, Lucciana, Vescovato, Moriani, Cervione, Aléria, Ghisonaccia" },
      { zone: "Centre Corse", towns: "Corte, Ponte-Leccia, Castagniccia, Venaco" },
    ],
    faq: [
      { question: "Intervenez-vous à Bastia et dans toute la Haute-Corse ?", answer: "Oui. Corse Drone est basé à Ogliastro, dans le Cap Corse : Bastia, le Cap, le Nebbio, la Balagne, la plaine orientale et le centre Corse font partie de notre zone d'intervention habituelle. Nous intervenons aussi en Corse-du-Sud." },
      { question: "Peut-on faire voler un drone en centre-ville de Bastia ?", answer: "Oui, dans un cadre précis. Le centre-ville et les abords de l'aéroport de Bastia-Poretta sont des zones réglementées : nous vérifions chaque site, déposons les déclarations nécessaires et sécurisons un périmètre au sol pendant l'intervention." },
      DELAY_FAQ,
      { question: "Vous avez des références en Haute-Corse ?", answer: "Oui : l'inspection des toitures de deux bâtiments de la Communauté d'Agglomération de Bastia, et la fixation amiante de l'ancienne usine de Canari avec Térélian (groupe Vinci). Les deux missions sont détaillées sur notre blog." },
      { question: "Le drone convient-il aux copropriétés bastiaises ?", answer: "C'est l'un des cas où il est le plus pertinent : immeubles hauts, rues étroites, façades et toitures difficiles d'accès. Le drone évite l'échafaudage, ne bloque pas la rue et fournit des photos et un rapport utilisables en assemblée générale." },
    ],
    ctaTitle: "Un chantier à Bastia ou en Haute-Corse ?",
    breadcrumb: "Bastia et Haute-Corse",
    areaServed: [
      { type: "City", name: "Bastia" },
      { type: "AdministrativeArea", name: "Haute-Corse" },
    ],
  },

  sud: {
    path: "/drone-ajaccio-corse-du-sud",
    eyebrow: "Zone d'intervention · Corse-du-Sud",
    titleStart: "Drone professionnel à Ajaccio",
    titleAccent: "et en Corse-du-Sud.",
    metaTitle: "Drone professionnel à Ajaccio et en Corse-du-Sud",
    metaDescription:
      "Nettoyage de toitures et façades, panneaux solaires, thermographie et inspection par drone à Ajaccio, Porto-Vecchio, Propriano et dans toute la Corse-du-Sud.",
    intro:
      "Nous intervenons dans toute la Corse-du-Sud, d'Ajaccio à Bonifacio : nettoyage de toitures et de façades, panneaux solaires, thermographie, inspection et relevés 3D. Les missions sont planifiées à l'avance, sans échafaudage ni nacelle.",
    servicesTitle: "Ce qu'on fait à Ajaccio et en Corse-du-Sud.",
    climateTitle: "Le Sud, un terrain exigeant pour vos bâtiments.",
    climateIntro:
      "Plus de soleil, plus de vent, plus de mer : la Corse-du-Sud concentre tout ce qui fait vieillir un toit, une façade ou une centrale solaire. Un entretien bien fait y rapporte d'autant plus.",
    climate: [
      { title: "L'ensoleillement", text: "Le Sud est la région la plus ensoleillée de l'île : beaucoup de toitures solaires, d'ombrières et de centrales au sol, où chaque point de rendement perdu à l'encrassement coûte cher." },
      { title: "Le sable du sirocco", text: "Premier exposé aux vents du sud, l'Extrême-Sud reçoit régulièrement le sable saharien : un voile orangé qui couvre les panneaux et favorise mousses et lichens sur les toitures." },
      { title: "Les embruns et le vent", text: "Golfe d'Ajaccio, Valinco, bouches de Bonifacio : le sel et le vent attaquent les enduits, les fixations et les joints, surtout sur les premières lignes de mer." },
      { title: "Villas et résidences touristiques", text: "Porto-Vecchio, Bonifacio, Porticcio : des villas en hauteur et des résidences à préparer avant la saison, sans nacelle dans le jardin ni gêne pour les clients." },
    ],
    referencesTitle: "Nos références en Corse.",
    references: [
      {
        place: "Propriano",
        client: "Tenergie",
        title: "Intervention sur une installation photovoltaïque",
      },
      CAB_REF,
      CANARI_REF,
    ],
    areasTitle: "D'Ajaccio à Bonifacio.",
    areasIntro:
      "Voici les secteurs de Corse-du-Sud où nous intervenons. Pour les sites éloignés, nous regroupons les missions pour limiter les déplacements. La liste n'est pas exhaustive.",
    areas: [
      { zone: "Pays ajaccien", towns: "Ajaccio, Porticcio, Bastelicaccia, Alata, Afa, Sarrola-Carcopino, Grosseto-Prugna" },
      { zone: "Golfe de Valinco", towns: "Propriano, Olmeto, Porto Pollo, Serra-di-Ferro, Belvédère-Campomoro" },
      { zone: "Sartenais et Alta Rocca", towns: "Sartène, Levie, Zonza, Sainte-Lucie-de-Tallano" },
      { zone: "Extrême-Sud", towns: "Porto-Vecchio, Bonifacio, Figari, Lecci, Sainte-Lucie-de-Porto-Vecchio, Pianottoli-Caldarello" },
      { zone: "Côte ouest", towns: "Cargèse, Sagone, Vico, Piana" },
    ],
    faq: [
      { question: "Vous êtes basés en Haute-Corse : intervenez-vous vraiment dans le Sud ?", answer: "Oui, dans toute la Corse-du-Sud. Les missions sont planifiées à l'avance, et nous regroupons les interventions d'un même secteur pour limiter les déplacements et leur coût." },
      { question: "Peut-on faire voler un drone près des aéroports d'Ajaccio et de Figari ?", answer: "Oui, dans un cadre précis. Les abords des aéroports d'Ajaccio Napoléon-Bonaparte et de Figari Sud-Corse sont des zones réglementées : nous vérifions chaque site, déposons les déclarations nécessaires et sécurisons un périmètre au sol pendant l'intervention." },
      DELAY_FAQ,
      { question: "Intervenez-vous sur les centrales solaires du Sud ?", answer: "Oui : nettoyage des panneaux et inspection thermographique selon la méthodologie IEC TS 62446-3, sur toitures, ombrières et centrales au sol. Les deux peuvent être couplés dans une même intervention pour optimiser les déplacements." },
      { question: "Pouvez-vous préparer une villa ou une résidence avant la saison ?", answer: "Oui : nettoyage de toiture, de façade ou de panneaux solaires, sans nacelle ni échafaudage dans le jardin. Il vaut mieux nous contacter tôt au printemps pour caler l'intervention avant l'arrivée des clients." },
    ],
    ctaTitle: "Un chantier à Ajaccio ou en Corse-du-Sud ?",
    breadcrumb: "Ajaccio et Corse-du-Sud",
    areaServed: [
      { type: "City", name: "Ajaccio" },
      { type: "City", name: "Porto-Vecchio" },
      { type: "AdministrativeArea", name: "Corse-du-Sud" },
    ],
  },
};
