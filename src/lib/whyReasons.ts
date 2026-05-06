import type { LucideIcon } from "lucide-react";
import { ShieldCheck, TrendingUp, Crosshair, Grid3x3 } from "lucide-react";

export type Reason = {
  key: string;
  index: string;
  icon: LucideIcon;
  title: string;
  description: string;
  proofValue: string;
  proofLabel: string;
};

export const WHY_REASONS: Reason[] = [
  {
    key: "security",
    index: "01",
    icon: ShieldCheck,
    title: "Sécurité maximale",
    description:
      "L'opérateur reste au sol, sans échafaudage, sans nacelle, sans cordistes. Aucune intervention en hauteur, donc aucun risque de chute pour les équipes ni les occupants du site.",
    proofValue: "0",
    proofLabel: "accident en hauteur sur site",
  },
  {
    key: "economy",
    index: "02",
    icon: TrendingUp,
    title: "Coût maîtrisé",
    description:
      "Pas de location de matériel encombrant, pas d'immobilisation de site, pas de logistique lourde. Une intervention drone se chiffre en heures, pas en jours.",
    proofValue: "−30%",
    proofLabel: "vs méthodes traditionnelles",
  },
  {
    key: "precision",
    index: "03",
    icon: Crosshair,
    title: "Précision aérienne",
    description:
      "Caméras 4K stabilisées, vision thermique infrarouge, GPS centimétrique. L'angle de vue aérien révèle ce qui reste invisible depuis le sol et accède aux zones les plus difficiles.",
    proofValue: "2 cm",
    proofLabel: "de précision GPS RTK",
  },
  {
    key: "versatility",
    index: "04",
    icon: Grid3x3,
    title: "Polyvalence métiers",
    description:
      "Du nettoyage de toiture au transport de matériel, du diagnostic thermique à l'agriculture de précision. Une même expertise pilotage, déclinée selon le besoin.",
    proofValue: "4",
    proofLabel: "pôles d'intervention",
  },
];
