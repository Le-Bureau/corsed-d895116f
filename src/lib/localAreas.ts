// Local landing pages (/drone-bastia-haute-corse, /drone-ajaccio-corse-du-sud,
// /drone-porto-vecchio-extreme-sud, /drone-calvi-balagne, /drone-corte-centre-corse).
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
  // Optional "Le terrain" section: only for areas where we can speak from
  // first-hand field experience.
  climateTitle?: string;
  climateIntro?: string;
  climate?: { title: string; text: string }[];
  referencesTitle: string;
  references: LocalReference[];
  areasTitle: string;
  areasIntro: string;
  // href links a zone to its own local page, when it has one.
  areas: { zone: string; towns: string; href?: string }[];
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
  figures: "Toitures couvertes à 100 %, modèle 3D livré",
  href: "/blog/inspection-toiture-drone-cab-bastia",
};

const CANARI_REF: LocalReference = {
  place: "Canari, Cap Corse",
  client: "Térélian (groupe Vinci)",
  title: "Fixation amiante sur l'ancienne usine de Canari",
  figures: "1 500 m² traités sur 7 zones, équipe en zone verte",
  href: "/blog/canari-fixation-amiante-drone-terelian-vinci",
};

const TENERGIE_REF: LocalReference = {
  place: "Propriano",
  client: "Tenergie",
  title: "Thermographie d'une centrale solaire au sol",
  figures: "1 MWc inspecté en une heure de vol",
  // href: "/blog/inspection-thermique-centrale-photovoltaique-tenergie-propriano" once published
};

const DELAY_FAQ = {
  question: "Quel délai prévoir avant une intervention ?",
  answer: "Pour les opérations sous certification, la réglementation impose un délai minimum de 10 jours entre la demande de vol et son exécution. Nous l'intégrons d'office au planning, et nous établissons le devis dès que nous avons les éléments du site.",
};

export const LOCAL_AREAS: Record<"bastia" | "sud" | "portoVecchio" | "balagne" | "corte", LocalArea> = {
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
      { zone: "Nebbio et Balagne", towns: "Saint-Florent, Patrimonio, Oletta, L'Île-Rousse, Calvi, Algajola", href: "/drone-calvi-balagne" },
      { zone: "Marana, Casinca et plaine orientale", towns: "Borgo, Lucciana, Vescovato, Moriani, Cervione, Aléria, Ghisonaccia" },
      { zone: "Centre Corse", towns: "Corte, Ponte-Leccia, Castagniccia, Venaco", href: "/drone-corte-centre-corse" },
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
    references: [TENERGIE_REF, CAB_REF, CANARI_REF],
    areasTitle: "D'Ajaccio à Bonifacio.",
    areasIntro:
      "Voici les secteurs de Corse-du-Sud où nous intervenons. Pour les sites éloignés, nous regroupons les missions pour limiter les déplacements. La liste n'est pas exhaustive.",
    areas: [
      { zone: "Pays ajaccien", towns: "Ajaccio, Porticcio, Bastelicaccia, Alata, Afa, Sarrola-Carcopino, Grosseto-Prugna" },
      { zone: "Golfe de Valinco", towns: "Propriano, Olmeto, Porto Pollo, Serra-di-Ferro, Belvédère-Campomoro" },
      { zone: "Sartenais et Alta Rocca", towns: "Sartène, Levie, Zonza, Sainte-Lucie-de-Tallano" },
      { zone: "Extrême-Sud", towns: "Porto-Vecchio, Bonifacio, Figari, Lecci, Sainte-Lucie-de-Porto-Vecchio, Pianottoli-Caldarello", href: "/drone-porto-vecchio-extreme-sud" },
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

  portoVecchio: {
    path: "/drone-porto-vecchio-extreme-sud",
    eyebrow: "Zone d'intervention · Extrême-Sud",
    titleStart: "Drone professionnel à Porto-Vecchio",
    titleAccent: "et dans l'Extrême-Sud.",
    metaTitle: "Drone professionnel à Porto-Vecchio et Extrême-Sud",
    metaDescription:
      "Nettoyage de toitures, façades et panneaux solaires, thermographie et inspection par drone à Porto-Vecchio, Bonifacio et dans l'Extrême-Sud de la Corse.",
    intro:
      "Nous intervenons à Porto-Vecchio, Bonifacio, Figari et dans tout l'Extrême-Sud : nettoyage de toitures et de façades, panneaux solaires, thermographie, inspection et relevés 3D. Les missions sont planifiées à l'avance, sans échafaudage ni nacelle dans le jardin.",
    servicesTitle: "Ce qu'on fait à Porto-Vecchio et dans l'Extrême-Sud.",
    referencesTitle: "Nos références en Corse.",
    references: [TENERGIE_REF, CAB_REF, CANARI_REF],
    areasTitle: "De Porto-Vecchio à Bonifacio.",
    areasIntro:
      "Voici les secteurs de l'Extrême-Sud où nous intervenons. Nous regroupons les missions d'un même secteur pour limiter les déplacements. La liste n'est pas exhaustive.",
    areas: [
      { zone: "Porto-Vecchio et son golfe", towns: "Porto-Vecchio, Lecci, Sainte-Lucie-de-Porto-Vecchio, Pinarellu, Conca, Zonza" },
      { zone: "Bonifacio et le Sud", towns: "Bonifacio, Figari, Pianottoli-Caldarello, Monacia-d'Aullène, Sotta" },
      { zone: "Alta Rocca", towns: "Levie, Zonza, Quenza, Carbini, San-Gavino-di-Carbini" },
      { zone: "Golfe de Valinco et Sartenais", towns: "Propriano, Sartène, Olmeto, Porto Pollo", href: "/drone-ajaccio-corse-du-sud" },
    ],
    faq: [
      { question: "Intervenez-vous à Porto-Vecchio et à Bonifacio ?", answer: "Oui. Corse Drone est basé à Ogliastro, dans le Cap Corse, et intervient dans toute la Corse. Pour l'Extrême-Sud, les missions sont planifiées à l'avance et nous regroupons les interventions d'un même secteur pour limiter les déplacements et leur coût." },
      { question: "Peut-on faire voler un drone près de l'aéroport de Figari ?", answer: "Oui, dans un cadre précis. Les abords de l'aéroport de Figari Sud-Corse sont une zone réglementée : nous vérifions chaque site, déposons les déclarations nécessaires et sécurisons un périmètre au sol pendant l'intervention." },
      DELAY_FAQ,
      { question: "Pouvez-vous préparer une villa avant la saison ?", answer: "Oui : nettoyage de toiture, de façade ou de panneaux solaires, sans nacelle ni échafaudage dans le jardin. Contactez-nous tôt au printemps pour caler l'intervention avant l'arrivée des locataires ou des clients." },
      { question: "Intervenez-vous sur les installations solaires de l'Extrême-Sud ?", answer: "Oui : nettoyage des panneaux et inspection thermographique selon la méthodologie IEC TS 62446-3, sur toitures, ombrières et centrales au sol. Les deux peuvent être couplés dans une même intervention." },
    ],
    ctaTitle: "Un chantier à Porto-Vecchio ou dans l'Extrême-Sud ?",
    breadcrumb: "Porto-Vecchio et Extrême-Sud",
    areaServed: [
      { type: "City", name: "Porto-Vecchio" },
      { type: "City", name: "Bonifacio" },
      { type: "AdministrativeArea", name: "Corse-du-Sud" },
    ],
  },

  balagne: {
    path: "/drone-calvi-balagne",
    eyebrow: "Zone d'intervention · Balagne",
    titleStart: "Drone professionnel à Calvi",
    titleAccent: "et en Balagne.",
    metaTitle: "Drone professionnel à Calvi et en Balagne",
    metaDescription:
      "Nettoyage de toitures et façades, panneaux solaires, thermographie et inspection par drone à Calvi, L'Île-Rousse et dans les villages de Balagne, en Corse.",
    intro:
      "Nous intervenons à Calvi, L'Île-Rousse et dans tous les villages de Balagne : nettoyage de toitures et de façades, panneaux solaires, thermographie, inspection et relevés 3D. Le drone passe là où les rues sont trop étroites pour une nacelle.",
    servicesTitle: "Ce qu'on fait à Calvi et en Balagne.",
    referencesTitle: "Nos références en Haute-Corse.",
    references: [CAB_REF, CANARI_REF],
    areasTitle: "Du littoral aux villages.",
    areasIntro:
      "Notre base est à Ogliastro, dans le Cap Corse. Voici les secteurs de Balagne où nous intervenons, la liste n'est pas exhaustive.",
    areas: [
      { zone: "Calvi et sa baie", towns: "Calvi, Lumio, Calenzana, Montegrosso, Galéria" },
      { zone: "L'Île-Rousse et le littoral", towns: "L'Île-Rousse, Algajola, Monticello, Corbara, Santa-Reparata-di-Balagna" },
      { zone: "Villages de Balagne", towns: "Sant'Antonino, Pigna, Aregno, Cateri, Speloncato, Belgodère, Feliceto" },
      { zone: "Ostriconi et Nebbio", towns: "Palasca, Novella, Saint-Florent, Patrimonio", href: "/drone-bastia-haute-corse" },
    ],
    faq: [
      { question: "Intervenez-vous à Calvi et dans toute la Balagne ?", answer: "Oui. Corse Drone est basé à Ogliastro, dans le Cap Corse, et la Balagne fait partie de notre zone d'intervention habituelle en Haute-Corse, du littoral jusqu'aux villages de l'intérieur." },
      { question: "Peut-on faire voler un drone près de l'aéroport de Calvi ?", answer: "Oui, dans un cadre précis. Les abords de l'aéroport de Calvi Sainte-Catherine sont une zone réglementée : nous vérifions chaque site, déposons les déclarations nécessaires et sécurisons un périmètre au sol pendant l'intervention." },
      DELAY_FAQ,
      { question: "Le drone convient-il aux maisons de village ?", answer: "C'est l'un des cas où il est le plus utile : ruelles étroites, maisons mitoyennes, toitures anciennes. Le drone évite l'échafaudage, ne bloque pas la rue et ne marche pas sur les tuiles." },
      { question: "Pouvez-vous intervenir avant la saison touristique ?", answer: "Oui, et c'est le bon moment : nettoyage de toitures, façades ou panneaux au printemps, avant l'arrivée des clients. Contactez-nous tôt pour caler l'intervention." },
    ],
    ctaTitle: "Un chantier à Calvi ou en Balagne ?",
    breadcrumb: "Calvi et Balagne",
    areaServed: [
      { type: "City", name: "Calvi" },
      { type: "City", name: "L'Île-Rousse" },
      { type: "AdministrativeArea", name: "Haute-Corse" },
    ],
  },

  corte: {
    path: "/drone-corte-centre-corse",
    eyebrow: "Zone d'intervention · Centre Corse",
    titleStart: "Drone professionnel à Corte",
    titleAccent: "et dans le centre Corse.",
    metaTitle: "Drone professionnel à Corte et dans le centre Corse",
    metaDescription:
      "Nettoyage de toitures, thermographie, inspection et relevés 3D par drone à Corte, dans le Niolu, le Venachese et les villages de montagne du centre Corse.",
    intro:
      "Nous intervenons à Corte et dans les villages de montagne du centre Corse : nettoyage de toitures et de façades, thermographie, inspection et relevés 3D. Le drone accède aux toitures et aux sites que le relief rend difficiles à équiper.",
    servicesTitle: "Ce qu'on fait à Corte et dans le centre Corse.",
    referencesTitle: "Nos références en Haute-Corse.",
    references: [CAB_REF, CANARI_REF],
    areasTitle: "Corte et les vallées du centre.",
    areasIntro:
      "Notre base est à Ogliastro, dans le Cap Corse. Voici les secteurs du centre Corse où nous intervenons, la liste n'est pas exhaustive.",
    areas: [
      { zone: "Corte et ses environs", towns: "Corte, Santa-Lucia-di-Mercurio, Omessa, Castirla, Soveria" },
      { zone: "Venachese et Vizzavona", towns: "Venaco, Vivario, Riventosa, Poggio-di-Venaco, Vezzani" },
      { zone: "Niolu", towns: "Calacuccia, Albertacce, Casamaccioli, Corscia, Lozzi" },
      { zone: "Bozio et Castagniccia", towns: "Morosaglia, Ponte-Leccia, Piedicorte-di-Gaggio, Sermano, Piedicroce" },
    ],
    faq: [
      { question: "Intervenez-vous à Corte et dans les villages de montagne ?", answer: "Oui. Corse Drone est basé à Ogliastro, dans le Cap Corse, et le centre Corse fait partie de notre zone d'intervention en Haute-Corse, y compris les villages d'altitude." },
      { question: "Quand faire une thermographie dans le centre Corse ?", answer: "En période froide, entre octobre et avril, quand l'écart de température entre l'intérieur chauffé et l'extérieur est suffisant. C'est justement là que le climat du centre Corse rend la mesure la plus parlante." },
      DELAY_FAQ,
      { question: "Le drone peut-il intervenir en altitude ?", answer: "Oui, dans les limites de la météo : vent, pluie et visibilité sont vérifiés avant chaque mission. Si les conditions ne sont pas réunies, l'intervention est reportée sans frais." },
      { question: "Transportez-vous du matériel vers les sites isolés ?", answer: "Pas encore. Notre pôle transport, pour acheminer du matériel vers les chantiers, refuges et bergeries isolés, est en préparation. Vous pouvez nous contacter dès maintenant pour être prévenu du lancement." },
    ],
    ctaTitle: "Un chantier à Corte ou dans le centre Corse ?",
    breadcrumb: "Corte et centre Corse",
    areaServed: [
      { type: "City", name: "Corte" },
      { type: "AdministrativeArea", name: "Haute-Corse" },
    ],
  },
};
