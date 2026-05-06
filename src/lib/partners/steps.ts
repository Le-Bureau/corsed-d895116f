import { Search, MessageSquare, FileText, Banknote, type LucideIcon } from "lucide-react";

export interface PartnerStep {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const PARTNER_STEPS: PartnerStep[] = [
  {
    number: "ÉTAPE 01",
    icon: Search,
    title: "Vous identifiez",
    description:
      "Vous croisez un client qui aurait besoin d'un service drone : nettoyage, diagnostic, expertise.",
  },
  {
    number: "ÉTAPE 02",
    icon: MessageSquare,
    title: "Vous présentez",
    description:
      "Un appel, un message, un email. Vous nous transmettez le contact ou vous nous mettez en relation.",
  },
  {
    number: "ÉTAPE 03",
    icon: FileText,
    title: "On signe",
    description:
      "Nous qualifions, devisons et signons la mission avec votre contact. La référence à votre apport est tracée.",
  },
  {
    number: "ÉTAPE 04",
    icon: Banknote,
    title: "Vous touchez",
    description:
      "Une fois la mission encaissée, votre commission est versée selon les modalités fixées dans votre accord.",
  },
];
