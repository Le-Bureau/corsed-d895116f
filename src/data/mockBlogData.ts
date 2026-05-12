/**
 * MOCK BLOG DATA — Phase 1 (no backend wiring yet).
 *
 * MARKDOWN AUTHORING CONVENTIONS
 * ------------------------------
 * Articles use standard Markdown + GFM, rendered via react-markdown with
 * `remark-gfm` and `rehype-raw` (raw HTML enabled). For the three figure
 * variants and the callout used in the design, we author them as raw HTML
 * blocks inside the markdown — this keeps 1:1 visual fidelity with the
 * mockup without needing a custom remark plugin.
 *
 * Standard figure with caption:
 *   <figure>
 *     <img src="..." alt="..." />
 *     <figcaption>Caption text</figcaption>
 *   </figure>
 *
 * Wide figure (bleeds beyond the prose column):
 *   <figure class="wide">
 *     <img src="..." alt="..." />
 *     <figcaption>Caption text</figcaption>
 *   </figure>
 *
 * Side-by-side image grid (2 columns):
 *   <div class="image-grid">
 *     <figure><img src="..." alt="..." /><figcaption>Left</figcaption></figure>
 *     <figure><img src="..." alt="..." /><figcaption>Right</figcaption></figure>
 *   </div>
 *
 * Inline callout (info block tinted with the article's category color):
 *   <div class="callout">
 *     <div class="callout__icon">i</div>
 *     <p>Callout text...</p>
 *   </div>
 *
 * Blockquote with citation: standard markdown blockquote, with an optional
 * trailing line `<cite>— Source</cite>`.
 */

export interface BlogAuthor {
  id: string;
  name: string;
  role: string;
  initials: string;
  bio: string;
  gradientFrom: string;
  gradientTo: string;
}

export interface BlogCategory {
  id: string;
  slug: string;
  name: string;
  /** Hex color */
  color: string;
  description: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentMd: string;
  coverImageUrl: string;
  authorId: string;
  categoryId: string;
  /** ISO date */
  publishedAt: string;
  readingTimeMinutes: number;
  featured: boolean;
}

// ─── AUTHORS ───────────────────────────────────────────────────────────
export const BLOG_AUTHORS: BlogAuthor[] = [
  {
    id: "pf",
    name: "Pierre-François Morganti",
    role: "Fondateur & pilote drone",
    initials: "PF",
    bio: "Pilote drone certifié DGAC depuis 2019, je dirige Corse Drone depuis Bastia. Spécialiste en photogrammétrie, thermographie aérienne et inspections d'ouvrages. J'écris ici sur nos retours de terrain et les bonnes pratiques du métier.",
    gradientFrom: "#5082AC",
    gradientTo: "#3F6A8E",
  },
  {
    id: "lg",
    name: "Logan Gaspard",
    role: "Développeur",
    initials: "LG",
    bio: "Développeur web et passionné de drones, j'accompagne Corse Drone sur la partie data, automatisation et restitution des missions photogrammétriques.",
    gradientFrom: "#16A34A",
    gradientTo: "#15803D",
  },
  {
    id: "jc",
    name: "Joan Cacciari",
    role: "Développeur",
    initials: "JC",
    bio: "Développeur web et accompagnant terrain, je participe aux missions de captation et au traitement des livrables côté outils internes.",
    gradientFrom: "#8B5CF6",
    gradientTo: "#7C3AED",
  },
];

export const getAuthor = (id: string): BlogAuthor =>
  BLOG_AUTHORS.find((a) => a.id === id) ?? BLOG_AUTHORS[0];

// ─── CATEGORIES ────────────────────────────────────────────────────────
export const BLOG_CATEGORIES: BlogCategory[] = [
  { id: "nettoyage", slug: "nettoyage", name: "Nettoyage", color: "#5082AC", description: "Toitures, façades, panneaux solaires." },
  { id: "diagnostic", slug: "diagnostic", name: "Diagnostic", color: "#14B8A6", description: "Inspections visuelles et thermiques." },
  { id: "agriculture", slug: "agriculture", name: "Agriculture", color: "#16A34A", description: "Imagerie multispectrale, suivi de cultures." },
  { id: "transport", slug: "transport", name: "Transport", color: "#F59E0B", description: "Portage et logistique par drone." },
  { id: "cas-clients", slug: "cas-clients", name: "Cas clients", color: "#8B5CF6", description: "Retours de chantiers concrets." },
  { id: "actualites-drone", slug: "actualites-drone", name: "Actualités drone", color: "#DC2626", description: "Réglementation, technologies, secteur." },
  { id: "actualites-boite", slug: "actualites-boite", name: "Actualités Corse Drone", color: "#475569", description: "La vie de l'entreprise." },
];

export const getCategory = (id: string): BlogCategory =>
  BLOG_CATEGORIES.find((c) => c.id === id) ?? BLOG_CATEGORIES[0];

// ─── POSTS ─────────────────────────────────────────────────────────────

const DIAGNOSTIC_TOITURE_MD = `Quand le syndic de la résidence des Orangers à Bastia nous a contactés en mars, le problème était classique : une fuite récurrente sur les combles d'un immeuble haussmannien de 6 étages, et personne ne savait exactement d'où elle venait. Le couvreur avait fait une première intervention l'année précédente, mais le problème était revenu après les premières pluies d'automne.

L'idée d'envoyer un drone faire une cartographie complète de la toiture est venue après deux devis de nacelle à plus de 4 800 euros, juste pour aller jeter un œil.

## Le contexte de la mission

La toiture en question fait environ 480 m². Tuiles canal traditionnelles, exposées plein sud-ouest, donc particulièrement battues par les vents marins et les averses méditerranéennes. L'immeuble est dans un secteur historique de Bastia, donc impossible de monter un échafaudage sans autorisation longue et coûteuse.

Notre brief tenait en trois lignes : **identifier l'origine de la fuite**, **cartographier l'état général**, et **fournir au syndic un document exploitable** pour demander des devis précis à plusieurs couvreurs.

## Préparation du vol

Avant chaque mission de diagnostic toiture, on fait trois choses : une étude de site, une vérification réglementaire (zone, hauteurs, riverains), et une checklist équipement. C'est le triptyque qui fait la différence entre une mission propre et une mission ratée.

### Équipement utilisé

- **DJI Mavic 3 Enterprise** avec capteur 4/3 CMOS pour les vues détaillées
- Caméra thermique **H20T** pour repérer les ponts thermiques et les zones d'infiltration
- Tablette terrain avec DJI Pilot 2, missions planifiées la veille
- Backup batteries (6 au total pour cette mission)

<figure>
  <img src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=1200&h=750&fit=crop&q=85" alt="Drone DJI prêt au décollage sur le toit terrasse" />
  <figcaption>Mise en route du Mavic 3 Enterprise depuis la terrasse de l'immeuble voisin. Le décollage en hauteur évite les zones de turbulence en bas du bâtiment.</figcaption>
</figure>

<div class="callout">
  <div class="callout__icon">i</div>
  <p>L'imagerie thermique est souvent l'élément décisif pour les diagnostics de toiture. Une infiltration invisible à l'œil nu apparaît clairement comme une zone froide sur un cliché infrarouge pris en fin d'après-midi.</p>
</div>

### Fenêtre météo

On a attendu une journée sèche après 48h sans pluie, pour avoir un contraste thermique maximal entre les zones saines (sèches, donc plus chaudes au soleil) et les zones humides (refroidies par évaporation). C'est un détail qui semble anodin mais qui change tout : voler par temps gris ou juste après une averse divise par trois la lisibilité des résultats.

## Le déroulé du vol

43 minutes de vol total, répartis sur deux batteries. Première passe en orthophotographie à 40 m de hauteur, avec 80% de recouvrement frontal et 70% latéral pour permettre la reconstitution photogrammétrique. Deuxième passe à 15 m pour les détails fins.

La caméra thermique a tourné en parallèle. Au total, **312 photos visibles et 187 thermiques** ont été remontées au bureau pour traitement.

<figure class="wide">
  <img src="https://images.unsplash.com/photo-1444858345-8c2c2c0fbafd?w=1600&h=900&fit=crop&q=85" alt="Vue aérienne d'une toiture en tuiles canal à Bastia" />
  <figcaption>Vue d'ensemble obtenue après orthorectification des 312 clichés visibles. Résolution finale : 1,2 cm par pixel au sol.</figcaption>
</figure>

> Le drone ne remplace pas le couvreur. Mais il transforme radicalement la façon dont on prépare son intervention : précision, sécurité, et économie.
> <cite>— Note interne après mission</cite>

## L'analyse des images

De retour au bureau, traitement dans Pix4Dmapper pour la photogrammétrie (modèle 3D de la toiture), puis exploration manuelle des images thermiques sur DJI Thermal Analysis Tool.

<div class="image-grid">
  <figure>
    <img src="https://images.unsplash.com/photo-1572985788098-7e58c2683043?w=800&h=600&fit=crop&q=85" alt="Vue visible de la noue nord-ouest" />
    <figcaption>Vue visible · noue nord-ouest</figcaption>
  </figure>
  <figure>
    <img src="https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c1?w=800&h=600&fit=crop&q=85" alt="Vue thermique de la même zone montrant l'infiltration" />
    <figcaption>Vue thermique · zone froide visible</figcaption>
  </figure>
</div>

Deux découvertes principales :

1. Une **zone d'infiltration franche** au niveau du noue nord-ouest, là où deux pans de toit se rejoignent. La signature thermique était sans ambiguïté : 4°C de moins que les zones adjacentes, sur un rayon d'environ 1,2 m.
2. Une **quinzaine de tuiles déplacées ou fissurées** ailleurs, sans infiltration active immédiate mais à surveiller. Plusieurs étaient invisibles à l'œil nu depuis la rue.

## Ce que ça a permis d'éviter

Avec le rapport en main (40 pages avec orthophoto, modèle 3D, vues thermiques annotées), le syndic a pu demander trois devis ciblés. Résultat : intervention finale à 2 100 €, contre les 4 800 € initialement estimés pour une simple visite en nacelle.

Et surtout, l'intervention du couvreur a duré une demi-journée au lieu des deux jours qui auraient été nécessaires avec une inspection à l'aveugle. Les tuiles à risque ont aussi été remplacées dans la foulée, ce qui évite probablement une autre fuite dans les 12 prochains mois.

## Pour conclure

Ce genre de mission, c'est ce qu'on aime faire. Un problème concret, une méthodologie qui marche, des chiffres qui parlent au client. Si vous gérez un syndic, une copropriété ou un patrimoine immobilier en Corse, n'hésitez pas à [nous contacter](/contact) avant de commander une nacelle. Dans 80% des cas, on apporte une réponse plus précise pour moins cher.
`;

const placeholder = (intro: string) => `${intro}

## Contexte

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vehicula, sapien quis tincidunt vehicula, magna ipsum tincidunt nisi, sit amet ultricies justo lorem ut massa. Suspendisse potenti.

## Méthodologie

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. **Donec rhoncus** placerat felis, vitae bibendum justo placerat sit amet.

- Premier point clé de la démarche
- Deuxième point sur l'équipement utilisé
- Troisième point sur la restitution

## Résultats

Vivamus vehicula, lectus a feugiat malesuada, lorem leo viverra dui, eu bibendum velit massa eget tortor. Nulla facilisi.

## En conclusion

Si ce sujet vous concerne, [contactez-nous](/contact) pour étudier votre besoin précisément.
`;

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "p1",
    slug: "releve-thermique-ajaccio-3000m2",
    title: "Relevé thermique sur 3000 m² à Ajaccio : ce que les images ont révélé",
    excerpt:
      "Mission terrain pour un syndic de copropriété : cartographier les déperditions thermiques d'un ensemble résidentiel avant rénovation énergétique. Méthodologie, résultats et chiffrage des travaux à prévoir.",
    contentMd: placeholder(
      "Mission terrain pour un syndic de copropriété ajaccien : cartographier les déperditions thermiques d'un ensemble résidentiel de 3000 m² avant rénovation énergétique.",
    ),
    coverImageUrl:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&h=900&fit=crop&q=80",
    authorId: "pf",
    categoryId: "cas-clients",
    publishedAt: "2026-05-08",
    readingTimeMinutes: 9,
    featured: true,
  },
  {
    id: "p2",
    slug: "diagnostic-toiture-drone-bastia",
    title: "Diagnostic de toiture par drone à Bastia : retour d'expérience",
    excerpt:
      "Un immeuble de 6 étages, des tuiles centenaires, et la nécessité de cartographier l'état du toit sans monter dessus. Voici comment on a procédé.",
    contentMd: DIAGNOSTIC_TOITURE_MD,
    coverImageUrl:
      "https://images.unsplash.com/photo-1572985788098-7e58c2683043?w=1600&h=900&fit=crop&q=85",
    authorId: "pf",
    categoryId: "diagnostic",
    publishedAt: "2026-05-05",
    readingTimeMinutes: 7,
    featured: false,
  },
  {
    id: "p3",
    slug: "inspection-panneaux-solaires-hiver",
    title: "Pourquoi inspecter ses panneaux solaires en hiver",
    excerpt:
      "Contraste thermique optimal, points chauds visibles, micro-fissures détectables : l'hiver est le bon moment pour un audit complet de votre installation.",
    contentMd: placeholder(
      "L'hiver offre des conditions idéales pour réaliser un audit thermique complet d'une installation photovoltaïque.",
    ),
    coverImageUrl:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=450&fit=crop&q=80",
    authorId: "lg",
    categoryId: "diagnostic",
    publishedAt: "2026-05-01",
    readingTimeMinutes: 6,
    featured: false,
  },
  {
    id: "p4",
    slug: "nettoyage-facades-hauteur-methodes",
    title: "Nettoyage de façades en hauteur : nos méthodes éprouvées",
    excerpt:
      "Pression, dosage, sécurité : tour d'horizon des techniques que l'on applique sur les façades inaccessibles depuis l'échafaudage.",
    contentMd: placeholder(
      "Pression, dosage des produits, sécurisation du périmètre : retour sur les méthodes que l'on applique en façade depuis quatre ans.",
    ),
    coverImageUrl:
      "https://images.unsplash.com/photo-1597008641621-cefdcf718025?w=800&h=450&fit=crop&q=80",
    authorId: "pf",
    categoryId: "nettoyage",
    publishedAt: "2026-04-27",
    readingTimeMinutes: 8,
    featured: false,
  },
  {
    id: "p5",
    slug: "reglementation-drone-2026-pros",
    title: "Nouvelle réglementation drone 2026 : ce qui change pour les pros",
    excerpt:
      "Mise à jour des catégories Open et Specific, élargissement des scénarios standards STS, nouvelles obligations d'enregistrement : on fait le point.",
    contentMd: placeholder(
      "La nouvelle réglementation drone 2026 redessine les catégories Open et Specific et élargit les scénarios STS.",
    ),
    coverImageUrl:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=450&fit=crop&q=80",
    authorId: "jc",
    categoryId: "actualites-drone",
    publishedAt: "2026-04-22",
    readingTimeMinutes: 10,
    featured: false,
  },
  {
    id: "p6",
    slug: "dji-matrice-400-investissement",
    title: "On a investi dans le DJI Matrice 400 : ce que ça change pour vos missions",
    excerpt:
      "Capacité de charge multipliée par deux, autonomie de 59 minutes, précision RTK : présentation de notre nouveau bras armé en photogrammétrie.",
    contentMd: placeholder(
      "Le DJI Matrice 400 rejoint notre flotte. Présentation de ses capacités et de ce que cela ouvre comme nouveaux scénarios de mission.",
    ),
    coverImageUrl:
      "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&h=450&fit=crop&q=80",
    authorId: "pf",
    categoryId: "actualites-boite",
    publishedAt: "2026-04-18",
    readingTimeMinutes: 5,
    featured: false,
  },
  {
    id: "p7",
    slug: "analyse-multispectrale-vignes-14ha",
    title: "Analyse multispectrale de vignes : suivi de vigueur sur 14 hectares",
    excerpt:
      "Capteurs NDVI, NDRE et red edge embarqués : comment on aide les vignerons corses à anticiper les zones de stress hydrique avant qu'elles ne soient visibles à l'œil nu.",
    contentMd: placeholder(
      "Suivi de vigueur sur 14 hectares de vignes en Balagne avec capteurs NDVI, NDRE et red edge.",
    ),
    coverImageUrl:
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&h=450&fit=crop&q=80",
    authorId: "lg",
    categoryId: "agriculture",
    publishedAt: "2026-04-14",
    readingTimeMinutes: 11,
    featured: false,
  },
  {
    id: "p8",
    slug: "transport-materiel-cap-corse",
    title: "Transport de matériel en zone montagneuse : retours du Cap Corse",
    excerpt:
      "Trois missions de portage drone sur des refuges isolés. Météo capricieuse, charge utile à optimiser, planification millimétrée : les leçons retenues.",
    contentMd: placeholder(
      "Trois missions de portage drone en moyenne montagne sur le Cap Corse, dans des conditions météo serrées.",
    ),
    coverImageUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=450&fit=crop&q=80",
    authorId: "jc",
    categoryId: "transport",
    publishedAt: "2026-04-09",
    readingTimeMinutes: 8,
    featured: false,
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  BLOG_POSTS.find((p) => p.slug === slug);

export const getCategoryCounts = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const c of BLOG_CATEGORIES) counts[c.id] = 0;
  for (const p of BLOG_POSTS) counts[p.categoryId] = (counts[p.categoryId] ?? 0) + 1;
  return counts;
};
