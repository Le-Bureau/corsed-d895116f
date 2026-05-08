export type Reason = {
  key: string;
  statValue: string;
  statQualifier: string;
  title: string;
  description: string;
};

export const WHY_REASONS: Reason[] = [
  {
    key: "no-equipment",
    statValue: "0",
    statQualifier: "nacelle, échafaudage, perche",
    title: "Sans matériel lourd",
    description:
      "On intervient là où le matériel lourd ne peut pas aller. Sans coût d'installation. Sans immobilisation de votre site.",
  },
  {
    key: "fast",
    statValue: "48h",
    statQualifier: "délai moyen d'intervention",
    title: "Intervention rapide",
    description:
      "Pas de montage, pas de démontage. Le drone arrive, travaille, repart. Votre site reste opérationnel.",
  },
  {
    key: "documentation",
    statValue: "100%",
    statQualifier: "archivable, exploitable",
    title: "Documentation automatique",
    description:
      "Photos, vidéos et rapports détaillés livrés après chaque mission. Utiles pour vos assurances, suivis techniques ou archivage.",
  },
];
