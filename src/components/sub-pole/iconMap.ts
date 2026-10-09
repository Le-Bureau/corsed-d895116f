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
  Tent,
  Mountain,
  Wrench,
  Recycle,
  RadioTower,
  Droplets,
  LifeBuoy,
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
  Tent,
  Mountain,
  Wrench,
  Recycle,
  RadioTower,
  Droplets,
  LifeBuoy,
};

export function getIcon(name: string): LucideIcon {
  return ICONS[name] || Home;
}
