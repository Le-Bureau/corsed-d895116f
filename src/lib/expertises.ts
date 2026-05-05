export type Expertise = {
  key: string;
  label: string;
  slug: string;
  tagline: string;
  description: string;
};

export const EXPERTISES: Expertise[] = [
  {
    key: "photogrammetrie",
    label: "Photogrammétrie",
    slug: "photogrammetrie",
    tagline: "Modélisation 3D",
    description:
      "Reconstitution de modèles 3D précis à partir de prises de vues aériennes.",
  },
  {
    key: "releve-3d",
    label: "Relevé 3D & topographie",
    slug: "releve-3d",
    tagline: "Cartographie",
    description:
      "Cartographie aérienne haute précision et orthophotos géoréférencées.",
  },
  {
    key: "prises-de-vue",
    label: "Prises de vue aériennes",
    slug: "prises-de-vue",
    tagline: "Photo & vidéo",
    description:
      "Photos et vidéos haute qualité pour immobilier, tourisme, événementiel.",
  },
  {
    key: "suivi-chantier",
    label: "Suivi de chantier",
    slug: "suivi-chantier",
    tagline: "Documentation",
    description:
      "Documentation régulière de l'avancement de vos chantiers.",
  },
];
