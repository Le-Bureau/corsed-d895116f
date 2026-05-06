import { z } from "zod";
import { EXPERTISES } from "./expertises";

export const REQUEST_TYPES = [
  "nettoyage",
  "diagnostic",
  "agriculture",
  "transport",
  "autre-expertise",
  "partenariat",
  "autre",
] as const;

export type RequestType = (typeof REQUEST_TYPES)[number];

export const REQUEST_TYPE_LABELS: Record<RequestType, string> = {
  nettoyage: "Nettoyage par drone",
  diagnostic: "Diagnostic & inspection",
  agriculture: "Agriculture de précision",
  transport: "Transport aérien",
  "autre-expertise": "Autre expertise",
  partenariat: "Programme partenaires",
  autre: "Autre demande",
};

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Votre nom doit faire au moins 2 caractères")
    .max(100, "Votre nom est trop long"),
  email: z
    .string()
    .trim()
    .min(1, "Email requis")
    .email("Email invalide")
    .max(255, "Email trop long"),
  phone: z
    .string()
    .trim()
    .max(20, "Numéro trop long")
    .optional()
    .or(z.literal("")),
  requestType: z.enum(REQUEST_TYPES, {
    required_error: "Sélectionnez un sujet",
    invalid_type_error: "Sélectionnez un sujet",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Votre message est un peu court")
    .max(2000, "Votre message est trop long"),
  rgpdConsent: z.literal(true, {
    errorMap: () => ({ message: "Veuillez accepter pour continuer" }),
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

const POLE_KEYS: RequestType[] = [
  "nettoyage",
  "diagnostic",
  "agriculture",
  "transport",
];

export type ContactDefaults = {
  fullName: string;
  email: string;
  phone: string;
  requestType: RequestType | "";
  message: string;
  rgpdConsent: false;
};

export function buildDefaultValues(
  searchParams: URLSearchParams,
): ContactDefaults {
  const expertise = searchParams.get("expertise");
  const type = searchParams.get("type");

  let requestType: RequestType | "" = "";
  let message = "";

  if (expertise && (POLE_KEYS as string[]).includes(expertise)) {
    requestType = expertise as RequestType;
  } else if (expertise) {
    const match = EXPERTISES.find((e) => e.slug === expertise);
    if (match) {
      requestType = "autre-expertise";
      message = `Bonjour, je vous contacte au sujet de ${match.label}. `;
    }
  }

  if (type === "partenaire") {
    requestType = "partenariat";
  }

  return {
    fullName: "",
    email: "",
    phone: "",
    requestType,
    message,
    rgpdConsent: false,
  };
}
