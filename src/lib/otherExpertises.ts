export type Expertise = {
  key: string;
  slug: string;
  // Dedicated page; otherwise the link goes to the contact form.
  href?: string;
  index: string;
  title: string;
  description: string;
};

export const OTHER_EXPERTISES: Expertise[] = [
  {
    key: "releve-3d",
    slug: "releve-3d",
    href: "/pole/diagnostic/photogrammetrie",
    index: "01",
    title: "Relevé 3D",
    description:
      "Cartographie aérienne haute précision pour topographie, urbanisme, et études de site.",
  },
  {
    key: "suivi-chantier",
    slug: "suivi-chantier",
    index: "02",
    title: "Suivi de chantier",
    description:
      "Documentation aérienne périodique de l'avancement de vos travaux pour reporting et archivage.",
  },
];
