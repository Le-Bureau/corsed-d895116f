import nettoyageImg from "@/assets/hero/nettoyage.png";
import diagnosticImg from "@/assets/hero/diagnostic.png";
import agricultureImg from "@/assets/hero/agriculture.png";
import transportImg from "@/assets/hero/transport.png";
import nettoyageShowcase from "@/assets/poles/nettoyage.webp";
import diagnosticShowcase from "@/assets/poles/diagnostic.webp";
import agricultureShowcase from "@/assets/poles/agriculture.webp";
import transportShowcase from "@/assets/poles/transport.webp";

export type PoleKey = "nettoyage" | "diagnostic" | "agriculture" | "transport";

export interface PoleSubService {
  name: string;
  slug?: string;
}

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
  pitch: string;
  description: string;
  highlights: string[];
  subServices: PoleSubService[];
  heroImage?: string;
  showcaseImage?: string;
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
    pitch: "Une alternative sécurisée et économique aux échafaudages.",
    description:
      "Pulvérisation précise sur façades, toitures et panneaux photovoltaïques, sans immobilisation de site. L'opérateur reste au sol, l'intervention se fait en quelques heures, et le rendu est immédiat.",
    highlights: ["Aucun échafaudage", "Site non immobilisé", "Économie d'eau"],
    subServices: [
      { name: "Nettoyage de toitures", slug: "toitures" },
      { name: "Nettoyage de façades", slug: "facades" },
      { name: "Panneaux photovoltaïques", slug: "panneaux-solaires" },
    ],
    heroImage: nettoyageImg,
    showcaseImage: nettoyageShowcase,
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
    pitch: "L'œil aérien qui voit l'invisible.",
    description:
      "Inspection thermique et visuelle haute précision. Identification rapide des défauts d'isolation, fissures, infiltrations. Rapports exploitables pour vos décisions techniques et vos déclarations d'assurance.",
    highlights: [
      "Caméra thermique infrarouge",
      "Rapport sous 48h",
      "Accès difficile résolu",
    ],
    subServices: [
      { name: "Diagnostic thermique", slug: "thermique" },
      { name: "Inspection visuelle", slug: "visuel" },
    ],
    heroImage: diagnosticImg,
    showcaseImage: diagnosticShowcase,
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
    pitch: "La précision au mètre carré, parcelle par parcelle.",
    description:
      "Épandage ciblé, traitement phytosanitaire contrôlé, analyses multispectrales. Une approche adaptée au terroir corse qui optimise vos rendements tout en allégeant votre charge de travail et votre empreinte écologique.",
    highlights: [
      "Précision GPS centimétrique",
      "Adapté au terroir corse",
      "Bilan carbone réduit",
    ],
    subServices: [
      { name: "Épandage ciblé" },
      { name: "Traitement phytosanitaire" },
      { name: "Analyses multispectrales" },
    ],
    heroImage: agricultureImg,
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
    pitch: "La logistique aérienne nouvelle génération.",
    description:
      "Acheminement de matériel vers les zones difficiles d'accès. Une alternative à l'hélicoptère, plus rapide, plus précise, moins coûteuse pour vos chantiers isolés en moyenne montagne ou sur sites côtiers escarpés.",
    highlights: [
      "Charge utile 100kg",
      "Zones inaccessibles",
      "Coût divisé vs hélicoptère",
    ],
    subServices: [{ name: "Logistique de chantier isolé" }],
    heroImage: transportImg,
  },
];
