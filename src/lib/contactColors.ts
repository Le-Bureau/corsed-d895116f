import type { RequestType } from "./contactSchema";

export type AccentColor = { base: string; rgb: string };

export const REQUEST_TYPE_COLORS: Record<RequestType, AccentColor> = {
  nettoyage: { base: "#5082AC", rgb: "80, 130, 172" },
  diagnostic: { base: "#A33333", rgb: "163, 51, 51" },
  agriculture: { base: "#3F7A38", rgb: "63, 122, 56" },
  transport: { base: "#F4A60C", rgb: "244, 166, 12" },
  "autre-expertise": { base: "#A8C0D4", rgb: "168, 192, 212" },
  partenariat: { base: "#A8C0D4", rgb: "168, 192, 212" },
  autre: { base: "#A8C0D4", rgb: "168, 192, 212" },
};

export const DEFAULT_COLOR: AccentColor = REQUEST_TYPE_COLORS["autre"];
