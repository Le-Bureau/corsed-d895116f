import type { PoleKey } from "@/lib/poles";
import spectraThermique from "@/assets/tools/spectra-thermique.webp";

export interface RealisationFigure {
  value: string;
  label: string;
}

export interface Realisation {
  slug: string;
  client: string;
  location: string;
  date: string;
  pole: PoleKey;
  service: string;
  serviceHref: string;
  title: string;
  summary: string;
  figures: RealisationFigure[];
  image: string;
  imageAlt: string;
  // Blog write-up. Optional: a mission can be listed before its article is published.
  articleSlug?: string;
}

const STORAGE =
  "https://jqiilolffxtjruvivnhf.supabase.co/storage/v1/object/public/blog-covers";

// Most recent first. Each entry links to its full write-up on the blog.
export const REALISATIONS: Realisation[] = [
  {
    slug: "cab-inspection-toitures",
    client: "Communauté d'Agglomération de Bastia",
    location: "Bastia",
    date: "Juillet 2026",
    pole: "diagnostic",
    service: "Inspection visuelle de toitures",
    serviceHref: "/pole/diagnostic/visuel",
    title: "Deux bâtiments publics inspectés en une journée",
    summary:
      "Un équipement sportif et un bâtiment technique, sans nacelle ni cordiste. Chaque point relevé est classé par priorité et localisé sur le modèle 3D pour piloter le budget d'entretien.",
    figures: [
      { value: "2", label: "bâtiments publics" },
      { value: "1", label: "journée sur site" },
      { value: "3D", label: "modèle livré sur Axio" },
    ],
    image: `${STORAGE}/covers/028313bb-6839-4531-9ec4-21d6278ac038/096489b2-ea08-40d1-bf0e-0eb85073133d.webp`,
    imageAlt: "Inspection de toiture par drone pour la CAB à Bastia",
    articleSlug: "inspection-toiture-drone-cab-bastia",
  },
  {
    slug: "tenergie-thermographie-centrale",
    client: "Tenergie",
    location: "Propriano, Corse-du-Sud",
    date: "Juin 2026",
    pole: "diagnostic",
    service: "Thermographie photovoltaïque",
    serviceHref: "/pole/diagnostic/thermique",
    title: "Une centrale solaire au sol inspectée en une heure de vol",
    summary:
      "Inspection thermographique de chaque module d'une centrale au sol, en pleine production. Les anomalies sont classées par priorité et positionnées sur l'orthomosaïque dans Spectra pour guider la maintenance.",
    figures: [
      { value: "1 MWc", label: "centrale au sol" },
      { value: "1 h", label: "de vol sur site" },
      { value: "½ j", label: "de traitement des données" },
    ],
    // Fallback until the article has its own cover image.
    image: spectraThermique,
    imageAlt: "Orthomosaïque thermique d'une centrale photovoltaïque au sol dans Spectra",
    // Article still in draft: add
    // articleSlug: "inspection-thermique-centrale-photovoltaique-tenergie-propriano"
    // once it is published.
  },
  {
    slug: "canari-fixation-amiante",
    client: "Térélian (groupe Vinci)",
    location: "Canari, Cap Corse",
    date: "Mai 2026",
    pole: "nettoyage",
    service: "Fixation amiante par pulvérisation",
    serviceHref: "/blog/fixation-amiante-drone-corse",
    title: "Fixation amiante sur l'ancienne usine de Canari",
    summary:
      "Fin de démantèlement d'un site ADEME à flanc de falaise. Le drone a traité les zones résiduelles les plus volatiles pendant que l'équipe restait en zone verte, à 200 mètres de tuyau.",
    figures: [
      { value: "1 500", label: "m² traités" },
      { value: "7", label: "zones distinctes" },
      { value: "6 h", label: "de vol effectif" },
    ],
    image: `${STORAGE}/covers/unassigned/f0df5fd1-8799-4e24-b582-635d1ab98dc1.webp`,
    imageAlt:
      "Drone pulvérisant un fixateur sur l'ancienne usine d'amiante de Canari",
    articleSlug: "canari-fixation-amiante-drone-terelian-vinci",
  },
];
