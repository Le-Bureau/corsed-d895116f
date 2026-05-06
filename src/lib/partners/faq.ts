export interface FAQItem {
  question: string;
  answer: string;
}

export const PARTNER_FAQ: FAQItem[] = [
  {
    question: "Comment est calculée la commission ?",
    answer:
      "La commission est proportionnelle au montant HT de la mission signée grâce à votre apport. Le pourcentage exact est discuté et fixé dans votre accord d'apporteur, en fonction du type de mission et de votre profil. Aucun pourcentage standard imposé : c'est négocié au cas par cas.",
  },
  {
    question: "Quand suis-je payé ?",
    answer:
      "Votre commission est versée après l'encaissement complet du client final. Le délai usuel est de 30 jours après réception du paiement. Vous recevez un récapitulatif clair de chaque commission due.",
  },
  {
    question: "Y a-t-il un engagement, un quota ou une exclusivité ?",
    answer:
      "Non. Aucun quota minimum, aucune clause d'exclusivité. Vous pouvez nous présenter un client tous les six mois ou tous les jours, c'est vous qui décidez. Vous pouvez aussi continuer à travailler avec d'autres prestataires en parallèle.",
  },
  {
    question: "Quel statut juridique pour facturer la commission ?",
    answer:
      "Pour percevoir une commission d'apporteur d'affaires, vous devez disposer d'un statut professionnel permettant la facturation : entreprise individuelle, micro-entreprise, société, etc. Si vous êtes salarié, votre employeur doit vous autoriser l'activité d'apporteur. Nous vous orientons vers les bons interlocuteurs si besoin.",
  },
  {
    question: "Comment sont tracées mes recommandations ?",
    answer:
      "À chaque contact que vous nous transmettez, nous traçons votre apport dans notre CRM. Lorsque ce contact signe une mission, votre nom est associé au dossier dès le devis. Vous recevez une notification à chaque étape clé : qualification, devis envoyé, mission signée, paiement reçu.",
  },
  {
    question: "Puis-je arrêter quand je veux ?",
    answer:
      "Oui, à tout moment. Il suffit de nous prévenir par email. Toutes les commissions liées à des missions déjà engagées avant votre départ vous restent dues, selon les conditions habituelles.",
  },
];
