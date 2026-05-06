import { z } from "zod";

export const partnerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Votre nom doit faire au moins 2 caractères")
    .max(100, "Votre nom est trop long"),
  email: z
    .string()
    .min(1, "Email requis")
    .email("Email invalide")
    .max(255, "Email trop long"),
  phone: z
    .string()
    .min(8, "Numéro de téléphone requis")
    .max(20, "Numéro trop long"),
  profession: z
    .string()
    .min(2, "Précisez votre profession ou activité")
    .max(150, "Description trop longue"),
  message: z
    .string()
    .min(20, "Décrivez brièvement votre activité (20 caractères minimum)")
    .max(2000, "Votre message est trop long"),
  rgpdConsent: z.literal(true, {
    errorMap: () => ({ message: "Veuillez accepter pour continuer" }),
  }),
});

export type PartnerFormData = z.infer<typeof partnerSchema>;
