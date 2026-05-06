import {
  Home,
  Layers,
  MountainSnow,
  Factory,
  Building,
  Building2,
  Landmark,
  Store,
  Sun,
  Sprout,
  FileText,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Home,
  Layers,
  MountainSnow,
  Factory,
  Building,
  Building2,
  Landmark,
  Store,
  Sun,
  Sprout,
  FileText,
};

export function getIcon(name: string): LucideIcon {
  return ICONS[name] || Home;
}
