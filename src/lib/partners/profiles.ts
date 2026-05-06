import {
  Home,
  MapPin,
  BookOpen,
  Briefcase,
  Building,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface PartnerProfile {
  icon: LucideIcon;
  label: string;
}

export const PARTNER_PROFILES: PartnerProfile[] = [
  { icon: Home, label: "Couvreurs\net zingueurs" },
  { icon: MapPin, label: "Agents\nimmobiliers" },
  { icon: BookOpen, label: "Architectes\net bureaux d'études" },
  { icon: Briefcase, label: "Commerciaux\nindépendants à leur compte" },
  { icon: Building, label: "Gestionnaires\nde copropriétés" },
  { icon: ShieldCheck, label: "Experts\nen bâtiment" },
];
