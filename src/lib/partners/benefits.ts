import { Banknote, Check, Heart, type LucideIcon } from "lucide-react";

export interface PartnerBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const PARTNER_BENEFITS: PartnerBenefit[] = [
  {
    icon: Banknote,
    title: "Une commission attractive",
    description:
      "Pour chaque mission signée grâce à vous, vous touchez une commission proportionnelle à la valeur de la mission. Conditions discutées et signées avant tout engagement.",
  },
  {
    icon: Check,
    title: "Pas d'exclusivité, pas de quotas",
    description:
      "Vous restez libre. Aucune obligation de volume, aucune clause d'exclusivité. Vous nous présentez un client quand vous le sentez, et seulement quand c'est pertinent pour lui.",
  },
  {
    icon: Heart,
    title: "Un service que vos clients vont aimer",
    description:
      "Vous proposez une solution drone professionnelle, locale, équipée et certifiée. Vos clients gagnent en valeur, vous gagnez en crédibilité auprès d'eux.",
  },
];
