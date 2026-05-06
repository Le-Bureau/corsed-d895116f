export type Expertise = {
  key: string;
  slug: string;
  index: string;
  title: string;
  description: string;
};

export const OTHER_EXPERTISES: Expertise[] = [
  {
    key: "releve-3d",
    slug: "releve-3d",
    index: "01",
    title: "Relevé 3D",
    description:
      "Cartographie aérienne haute précision pour topographie, urbanisme, et études de site.",
  },
  {
    key: "prises-de-vue",
    slug: "prises-de-vue",
    index: "02",
    title: "Prises de vue",
    description:
      "Photo et vidéo aérienne en 4K pour communication, immobilier, événementiel, audiovisuel.",
  },
  {
    key: "suivi-chantier",
    slug: "suivi-chantier",
    index: "03",
    title: "Suivi de chantier",
    description:
      "Documentation aérienne périodique de l'avancement de vos travaux pour reporting et archivage.",
  },
  {
    key: "photogrammetrie",
    slug: "photogrammetrie",
    index: "04",
    title: "Photogrammétrie",
    description:
      "Modélisation 3D précise par traitement d'images aériennes pour l'ingénierie et le patrimoine.",
  },
];
