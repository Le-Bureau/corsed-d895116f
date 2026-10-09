export type Expertise = {
  key: string;
  label: string;
  slug: string;
  // Dedicated page; otherwise the link goes to the contact form.
  href?: string;
  tagline: string;
  description: string;
};

export const EXPERTISES: Expertise[] = [
  {
    key: "releve-3d",
    label: "Relevé 3D & topographie",
    slug: "releve-3d",
    href: "/pole/diagnostic/photogrammetrie",
    tagline: "Cartographie",
    description:
      "Cartographie aérienne haute précision et orthophotos géoréférencées.",
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
