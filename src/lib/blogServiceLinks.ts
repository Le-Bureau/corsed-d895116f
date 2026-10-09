// Links each blog article to the service page it supports, so the end-of-article
// CTA points readers (and search engines) to the page that sells the service.
// Articles not listed here fall back to the generic CTA.

export interface BlogServiceLink {
  poleKey: string;
  href: string;
  serviceLabel: string;
  title: string;
  description: string;
}

const NETTOYAGE_TOITURES: BlogServiceLink = {
  poleKey: "nettoyage",
  href: "/pole/nettoyage/toitures",
  serviceLabel: "Découvrir le nettoyage de toiture",
  title: "Votre toiture mérite un vrai traitement",
  description:
    "Démoussage, traitement fongicide et hydrofuge par drone, sans nacelle ni échafaudage. Inspection préalable offerte, devis sous 48h.",
};

const NETTOYAGE_PANNEAUX: BlogServiceLink = {
  poleKey: "nettoyage",
  href: "/pole/nettoyage/panneaux-solaires",
  serviceLabel: "Découvrir le nettoyage de panneaux",
  title: "Retrouvez le rendement de vos panneaux",
  description:
    "Nettoyage de panneaux photovoltaïques par drone, à l'eau osmosée et sans abrasion. Devis adapté à votre installation sous 48h.",
};

const NETTOYAGE: BlogServiceLink = {
  poleKey: "nettoyage",
  href: "/pole/nettoyage",
  serviceLabel: "Découvrir le pôle nettoyage",
  title: "Un chantier en hauteur à traiter ?",
  description:
    "Toitures, façades, panneaux photovoltaïques : le drone intervient sans échafaudage ni immobilisation de site. Devis sous 48h.",
};

const DIAGNOSTIC_THERMIQUE: BlogServiceLink = {
  poleKey: "diagnostic",
  href: "/pole/diagnostic/thermique",
  serviceLabel: "Découvrir la thermographie",
  title: "Un audit thermique à programmer ?",
  description:
    "Déperditions, infiltrations, hotspots photovoltaïques : rapport exploitable sous 48 à 72h pour une maison, 7 jours pour un grand site. Devis sous 48h.",
};

const DIAGNOSTIC_VISUEL: BlogServiceLink = {
  poleKey: "diagnostic",
  href: "/pole/diagnostic/visuel",
  serviceLabel: "Découvrir l'inspection visuelle",
  title: "Une inspection à programmer ?",
  description:
    "Toitures, façades, ouvrages : inspection 4K avec zoom jusqu'à 112×, sans nacelle ni cordiste. Rapport sous 48 à 72h, devis sous 48h.",
};

const AGRICULTURE: BlogServiceLink = {
  poleKey: "agriculture",
  href: "/pole/agriculture",
  serviceLabel: "Découvrir le pôle agriculture",
  title: "Un projet pour vos cultures ?",
  description:
    "Analyse multispectrale, traitements ciblés : on étudie votre exploitation pour vous proposer la méthode adaptée. Devis sous 48h.",
};

export const BLOG_SERVICE_LINKS: Record<string, BlogServiceLink> = {
  "nettoyage-toiture-drone-corse": NETTOYAGE_TOITURES,
  "nettoyage-panneaux-solaires-drone-corse": NETTOYAGE_PANNEAUX,
  "sable-sahara-panneaux-solaires-corse": NETTOYAGE_PANNEAUX,
  "fixation-amiante-drone-corse": NETTOYAGE,
  "canari-fixation-amiante-drone-terelian-vinci": NETTOYAGE,
  "diagnostic-thermique-drone-corse": DIAGNOSTIC_THERMIQUE,
  "inspection-toiture-drone-cab-bastia": DIAGNOSTIC_VISUEL,
  "imagerie-multispectrale-par-drone-ce-quelle-apporte-aux-cultures-corses": AGRICULTURE,
};
