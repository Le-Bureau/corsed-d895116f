// Internal links between service pages and blog articles. Static on purpose:
// these blocks must be in the server-rendered HTML so search engines follow
// them, and the anchors are written for the reader, not copied from titles.

export interface RelatedArticle {
  slug: string;
  label: string;
}

const A = {
  toiture: {
    slug: "nettoyage-toiture-drone-corse",
    label: "Démousser une toiture en Corse : méthode, produits, fréquence",
  },
  panneaux: {
    slug: "nettoyage-panneaux-solaires-drone-corse",
    label: "Panneaux solaires en Corse : quand et comment les nettoyer",
  },
  sahara: {
    slug: "sable-sahara-panneaux-solaires-corse",
    label: "Sable du Sahara : ce qu'il coûte à votre production solaire",
  },
  amiante: {
    slug: "fixation-amiante-drone-corse",
    label: "Fixation d'amiante par drone : méthode et applications",
  },
  canari: {
    slug: "canari-fixation-amiante-drone-terelian-vinci",
    label: "Canari : 1 500 m² fixés par drone pour Térélian (Vinci)",
  },
  thermique: {
    slug: "diagnostic-thermique-drone-corse",
    label: "Thermographie par drone : ce qu'elle révèle, ses limites",
  },
  cab: {
    slug: "inspection-toiture-drone-cab-bastia",
    label: "Inspection de toitures pour la CAB à Bastia",
  },
  multispectral: {
    slug: "imagerie-multispectrale-par-drone-ce-quelle-apporte-aux-cultures-corses",
    label: "Imagerie multispectrale : ce qu'elle apporte aux cultures corses",
  },
  transport: {
    slug: "transport-materiel-drone-corse-2027",
    label: "Transport de matériel par drone en Corse : ce qui arrive en 2027",
  },
} satisfies Record<string, RelatedArticle>;

export const POLE_ARTICLES: Record<string, RelatedArticle[]> = {
  nettoyage: [A.toiture, A.panneaux, A.sahara, A.amiante, A.canari],
  diagnostic: [A.thermique, A.cab],
  transport: [A.transport],
  agriculture: [A.multispectral],
};

// Keyed by "<pole>/<subSlug>".
export const SUB_POLE_ARTICLES: Record<string, RelatedArticle[]> = {
  "nettoyage/toitures": [A.toiture, A.cab, A.amiante],
  "nettoyage/facades": [A.toiture, A.canari],
  "nettoyage/panneaux-solaires": [A.panneaux, A.sahara, A.thermique],
  "diagnostic/thermique": [A.thermique, A.panneaux],
  "diagnostic/visuel": [A.cab, A.toiture],
  "diagnostic/photogrammetrie": [A.cab],
  "transport/refuges": [A.transport],
  "transport/alternative-helicoptere": [A.transport],
};

// Case studies tied to a place: the end-of-article block links to the local page.
export const BLOG_LOCAL_PAGES: Record<string, { href: string; label: string }> =
  {
    "inspection-toiture-drone-cab-bastia": {
      href: "/drone-bastia-haute-corse",
      label: "Nos interventions à Bastia et en Haute-Corse",
    },
    "canari-fixation-amiante-drone-terelian-vinci": {
      href: "/drone-bastia-haute-corse",
      label: "Nos interventions dans le Cap Corse et en Haute-Corse",
    },
    "inspection-thermique-centrale-photovoltaique-tenergie-propriano": {
      href: "/drone-ajaccio-corse-du-sud",
      label: "Nos interventions en Corse-du-Sud",
    },
  };
