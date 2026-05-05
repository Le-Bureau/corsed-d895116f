export type PoleKey = "nettoyage" | "diagnostic" | "agriculture" | "transport";

export interface Pole {
  key: PoleKey;
  label: string;
  slug: string;
  baseColorOnDark: string;
  baseColorOnLight: string;
  deepColor: string;
  tintColor: string;
  title: string;
  subtitle: string;
  statLabel: string;
  statValue: string;
  statDetail: string;
  comingSoon: boolean;
}

export const POLES: Pole[] = [
  {
    key: "nettoyage",
    label: "Nettoyage",
    slug: "nettoyage",
    baseColorOnDark: "#5082AC",
    baseColorOnLight: "#5082AC",
    deepColor: "#2C5784",
    tintColor: "#E8F0F8",
    title: "L'innovation aérienne au service de l'île",
    subtitle:
      "Une alternative sécurisée et économique aux échafaudages. Pulvérisation précise sur façades, toitures et panneaux photovoltaïques, sans immobilisation de site.",
    statLabel: "Économies moyennes",
    statValue: "30%",
    statDetail: "vs méthodes traditionnelles",
    comingSoon: false,
  },
  {
    key: "diagnostic",
    label: "Diagnostic",
    slug: "diagnostic",
    baseColorOnDark: "#A33333",
    baseColorOnLight: "#890000",
    deepColor: "#5C0000",
    tintColor: "#FBE5E5",
    title: "L'œil aérien qui voit l'invisible",
    subtitle:
      "Inspection thermique et visuelle haute précision. Identification rapide des défauts, rapports exploitables pour vos décisions techniques et vos assurances.",
    statLabel: "Délai moyen",
    statValue: "48h",
    statDetail: "de livraison du rapport détaillé",
    comingSoon: false,
  },
  {
    key: "agriculture",
    label: "Agriculture",
    slug: "agriculture",
    baseColorOnDark: "#3F7A38",
    baseColorOnLight: "#2B5527",
    deepColor: "#1A3618",
    tintColor: "#E6EDE5",
    title: "La précision au mètre carré",
    subtitle:
      "Épandage ciblé, traitement phytosanitaire contrôlé, analyses multispectrales. Optimisez vos rendements et allégez votre charge de travail, parcelle par parcelle.",
    statLabel: "Eau utilisée",
    statValue: "−90%",
    statDetail: "vs pulvérisation au tracteur",
    comingSoon: true,
  },
  {
    key: "transport",
    label: "Transport",
    slug: "transport",
    baseColorOnDark: "#F4A60C",
    baseColorOnLight: "#F4A60C",
    deepColor: "#B57708",
    tintColor: "#FEF5E1",
    title: "La logistique aérienne nouvelle génération",
    subtitle:
      "Acheminement de matériel vers les zones difficiles d'accès. Une alternative à l'hélicoptère, plus rapide, plus précise, moins coûteuse pour vos chantiers isolés.",
    statLabel: "Charge utile",
    statValue: "100kg",
    statDetail: "par rotation de drone cargo",
    comingSoon: true,
  },
];
