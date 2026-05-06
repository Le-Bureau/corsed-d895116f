import type { RequestType } from "./contactSchema";

export type AccentColor = { base: string; rgb: string };

// Light-bg accent colors for the contact form theming.
export const REQUEST_TYPE_COLORS: Record<RequestType, AccentColor> = {
  nettoyage: { base: "#2C5784", rgb: "44, 87, 132" },
  diagnostic: { base: "#890000", rgb: "137, 0, 0" },
  agriculture: { base: "#2B5527", rgb: "43, 85, 39" },
  transport: { base: "#B57708", rgb: "181, 119, 8" },
  "autre-expertise": { base: "#4F6F8E", rgb: "79, 111, 142" },
  partenariat: { base: "#4F6F8E", rgb: "79, 111, 142" },
  autre: { base: "#4F6F8E", rgb: "79, 111, 142" },
};

export const DEFAULT_COLOR: AccentColor = REQUEST_TYPE_COLORS["autre"];
