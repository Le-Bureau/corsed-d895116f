export interface SubPoleStat {
  prefix?: string;
  value: string;
  unit: string;
  labelStrong: string;
  labelMuted: string;
}

export interface SubPoleWhyItem {
  title: string;
  description: string;
}

export interface SubPoleFormula {
  badge?: string;
  category: string;
  title: string;
  description: string;
  features: string[];
  isHighlighted?: boolean;
}

export interface SubPoleDomain {
  iconName: string;
  category: string;
  title: string;
  description: string;
  highlightLabel: string;
  highlightDescription: string;
}

export interface SubPoleTechItem {
  title: string;
  description: string;
  spec?: string;
}

export interface SubPoleCompareCol {
  isOurs?: boolean;
  badge?: string;
  title: string;
  price: string;
  rows: { label: string; value: string }[];
}

export interface SubProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface SubFAQItem {
  question: string;
  answer: string;
}

export interface SubPoleContent {
  heroEyebrow: string;
  heroTitle: string;
  heroPitch: string;
  heroImage?: string;
  heroImageAlt: string;
  stats: SubPoleStat[];
  whyEyebrow: string;
  whyTitle: string;
  whyIntro: string;
  whyItems: SubPoleWhyItem[];
  formulas: SubPoleFormula[];
  domainesEyebrow: string;
  domainesTitle: string;
  domaines: SubPoleDomain[];
  processSteps?: SubProcessStep[];
  techItems?: SubPoleTechItem[];
  compareTitle?: string;
  compareSubtitle?: string;
  compareCols?: SubPoleCompareCol[];
  compareDisclaimer?: string;
  faq: SubFAQItem[];
  finalCTATitle: string;
  finalCTASubtitle: string;
  finalCTAButtonLabel: string;
}

export const SUB_POLE_CONTENT: Record<string, Record<string, SubPoleContent>> = {
  nettoyage: {
    toitures: {
      heroEyebrow: "Nettoyage · toitures",
      heroTitle: "Une toiture saine, des années gagnées.",
      heroPitch:
        "Démoussage et nettoyage de toitures par drone. Traitement préventif anti-mousse, eau basse pression, sans monter sur le toit. Intervention partout en Corse, de la villa au patrimoine.",
      heroImageAlt: "Drone en train de nettoyer une toiture en tuiles",
      stats: [
        { prefix: "+10 à 15", value: "ans", unit: "", labelStrong: "de durée de vie", labelMuted: "sur toiture entretenue vs abandonnée" },
        { value: "3000", unit: "m²/jour", labelStrong: "cadence moyenne", labelMuted: "contre 1000m² en méthode traditionnelle" },
        { value: "0", unit: "risques", labelStrong: "casse & chute", labelMuted: "aucun contact physique avec les tuiles" },
      ],
      whyEyebrow: "Pourquoi traiter sa toiture",
      whyTitle: "Un toit négligé, une facture qui grimpe.",
      whyIntro:
        "En Corse, les toitures sont soumises à un climat particulièrement agressif. L'air marin chargé en sel, l'humidité persistante sur le littoral, les écarts thermiques importants entre soleil intense et nuits fraîches, ainsi que les vents réguliers, accélèrent l'encrassement des matériaux. Mousses, lichens et micro-algues s'infiltrent dans les tuiles romanes, ardoises ou lauzes et c'est là que commencent les vrais problèmes : infiltrations, dégradation de l'étanchéité, perte d'isolation, travaux coûteux.",
      whyItems: [
        { title: "Infiltrations", description: "Le nettoyage régulier limite la porosité des tuiles et réduit les risques d'éclatement liés à l'humidité et au gel en zone montagneuse." },
        { title: "Longévité", description: "Prolongez la durée de vie de votre toiture. Un entretien adapté peut retarder de 10 à 15 ans une rénovation complète de couverture." },
        { title: "Économies", description: "Réduisez vos dépenses futures. Prévenir coûte toujours moins cher que refaire une toiture. Vous évitez échafaudages lourds et travaux coûteux." },
        { title: "Zéro risque", description: "Aucun appui sur votre toiture. Le drone intervient sans marcher sur les tuiles et sans échafaudage, ce qui réduit les risques de casse." },
      ],
      formulas: [
        { category: "Protection", title: "Protection hydrofuge", description: "6 à 8 mois après le nettoyage, nous revenons appliquer un traitement hydrofuge. Ce bouclier invisible repousse l'eau et les salissures pour une protection durable de 5 ans et plus.", features: ["Bouclier invisible hydrofuge", "Repousse l'eau et les salissures", "Protection durable 5+ ans", "Espacement des entretiens ultérieurs"] },
        { badge: "Recommandé", isHighlighted: true, category: "Le plus demandé", title: "Démoussage complet et traitement", description: "Intervention complète en trois phases : pulvérisation d'un produit curatif, rinçage contrôlé, puis application d'un hydrofuge protecteur pour prolonger l'effet 5 ans et plus.", features: ["Produits anti-mousse professionnels", "Basse pression, préservation des tuiles", "Application d'hydrofuge protecteur", "Photos avant/après incluses"] },
        { category: "Ponctuel", title: "Inspection technique et/ou thermique", description: "Pour évaluer l'état de votre toiture et déterminer le niveau de démoussage ou traitement nécessaire avant intervention.", features: ["Inspection visuelle haute résolution", "Détection fissures et tuiles déplacées", "Rapport PDF sous 48h", "Recommandations personnalisées"] },
      ],
      domainesEyebrow: "Domaines d'application",
      domainesTitle: "Adapté à chaque type de toiture.",
      domaines: [
        { iconName: "Home", category: "Tuiles romanes", title: "Toitures en tuiles romanes", description: "La toiture la plus répandue en Corse. Tuiles canal, tuiles à emboîtement ou mécaniques : notre méthode préserve l'intégrité de votre couverture tout en éliminant mousses et dépôts.", highlightLabel: "Toutes tuiles", highlightDescription: "romanes, canal, mécaniques" },
        { iconName: "Layers", category: "Ardoises", title: "Tuiles plates et ardoises", description: "Toitures plus courantes dans les villages de montagne. Traitement adapté à la porosité spécifique de l'ardoise et des tuiles plates pour préserver leur caractère esthétique.", highlightLabel: "Traitement doux", highlightDescription: "compatible zones classées ABF" },
        { iconName: "MountainSnow", category: "Lauzes", title: "Lauzes et toitures traditionnelles", description: "Patrimoine corse des villages de l'intérieur. Intervention respectueuse du matériau, adaptée aux contraintes de conservation patrimoniale et aux toitures classées ou en zone ABF.", highlightLabel: "Patrimoine", highlightDescription: "compatible zones classées ABF" },
        { iconName: "Factory", category: "Industriel", title: "Bac acier et toits industriels", description: "Hangars agricoles, bâtiments industriels, entrepôts : surfaces étendues traitées en une journée, sans arrêt d'activité ni immobilisation de votre site de production.", highlightLabel: "5 000m²/jour", highlightDescription: "cadence sur grandes surfaces" },
        { iconName: "Building", category: "Hôtellerie", title: "Hôtels et résidences touristiques", description: "Préparation avant la saison ou entretien hors période d'exploitation. Intervention discrète, sans perturber l'activité touristique ni l'image de votre établissement.", highlightLabel: "Hors saison", highlightDescription: "intervention novembre - mars" },
        { iconName: "Landmark", category: "Public", title: "Patrimoine public et historique", description: "Églises, bâtiments communaux, édifices classés. Démarche respectueuse des contraintes patrimoniales, coordination avec les Architectes des Bâtiments de France si nécessaire.", highlightLabel: "Éligible", highlightDescription: "marchés publics et subventions" },
      ],
      faq: [
        { question: "Combien coûte un nettoyage de toiture par drone en Corse ?", answer: "Le tarif dépend de la surface totale, de l'état d'encrassement et de l'accessibilité du site. En moyenne, le nettoyage par drone est 30 à 50% moins cher que les méthodes traditionnelles car il ne nécessite pas de montage d'échafaudages complexes ni de personnels travaillant en hauteur." },
        { question: "Le drone peut-il endommager mes tuiles ?", answer: "Absolument pas. C'est l'avantage majeur du drone. Contrairement au couvreur qui doit marcher sur le toit, le drone reste à une distance de sécurité (environ 2-3 mètres). Il n'y a donc aucun contact physique, supprimant tout risque de casse de tuiles ou de dégradation des ardoises." },
        { question: "Quand faut-il réaliser un démoussage de toiture ?", answer: "Un démoussage est recommandé tous les 3 à 5 ans, selon l'exposition du toit à l'humidité et à la végétation. Les mousses retiennent l'eau, favorisent infiltrations et fissures, et accélèrent l'usure des matériaux. Un entretien régulier protège l'étanchéité et prolonge la durée de vie de la couverture." },
        { question: "Intervenez-vous dans toute la Corse ?", answer: "Oui, nous couvrons la Haute-Corse (2B) et la Corse-du-Sud (2A). Nos équipes se déplacent d'Ajaccio à Bastia, en passant par Calvi, l'Île-Rousse, Corte, Porto-Vecchio et Propriano. Nous intervenons également dans les zones rurales et de montagne." },
      ],
      finalCTATitle: "Un projet de toiture à programmer ?",
      finalCTASubtitle: "Inspection préalable offerte. Devis détaillé sous 48h.",
      finalCTAButtonLabel: "Demander un devis",
    },
    facades: {
      heroEyebrow: "Nettoyage · façades",
      heroTitle: "Une façade propre, un patrimoine préservé.",
      heroPitch:
        "Nettoyage de façades par drone basse & haute pression. Enduits, pierre, béton, bardage. Sans échafaudage, sans nacelle, sans perturbation. Partout en Corse, de la villa à l'immeuble.",
      heroImageAlt: "Drone en intervention de nettoyage de façade",
      stats: [
        { value: "100", unit: "m", labelStrong: "Hauteur max", labelMuted: "traitable sans nacelle élévatrice" },
        { value: "3000", unit: "m²/jour", labelStrong: "cadence moyenne", labelMuted: "sans montage ni démontage" },
        { prefix: "jusqu'à -50", value: "%", unit: "", labelStrong: "de coût", labelMuted: "vs. méthode traditionnelle" },
      ],
      whyEyebrow: "Pourquoi traiter sa façade",
      whyTitle: "Une façade sale, c'est déjà une dégradation qui commence.",
      whyIntro:
        "En Corse, les façades sont soumises à des agressions constantes : humidité hivernale, sel marin en zone littorale, pollution urbaine dans les centres de Bastia et Ajaccio, vents chargés de particules, algues rouges et micro-organismes. Sans entretien, les conséquences sont directes : traces vertes, noircissement, apparition de microfissures, infiltrations d'eau et, à terme, une perte réelle de valeur immobilière.",
      whyItems: [
        { title: "Valorisation", description: "Un nettoyage de façade professionnel améliore immédiatement l'image d'une villa, d'un hôtel ou d'un immeuble en copropriété." },
        { title: "Rapidité", description: "Nettoyer par drone permet d'intervenir 2 à 4 fois plus rapidement qu'une installation classique, et sans immobiliser le bâtiment." },
        { title: "Économies", description: "Le nettoyage par drone supprime les coûts liés aux échafaudages, nacelles et main-d'œuvre lourde, rendant les opérations jusqu'à 2 fois moins chères." },
        { title: "Sécurité", description: "Intervention sans nacelle ni structure lourde, ce qui limite les nuisances et réduit les risques humains." },
      ],
      formulas: [
        { category: "Protection", title: "Protection hydrofuge", description: "6 à 8 mois après le nettoyage, nous revenons appliquer un traitement hydrofuge. Ce bouclier invisible repousse l'eau et les salissures pour une protection durable de 5 ans et plus.", features: ["Bouclier invisible hydrofuge", "Repousse l'eau et les salissures", "Protection durable 5+ ans", "Espacement des entretiens ultérieurs"] },
        { badge: "Recommandé", isHighlighted: true, category: "Le plus demandé", title: "Nettoyage professionnel", description: "Intervention complète en 2 phases : pulvérisation d'un traitement anti-biofilm adapté au support, puis rinçage contrôlé. 24h sans pluie nécessaires pour une efficacité optimale.", features: ["Traitement adapté au support", "Basse ou haute pression selon cas", "Préservation de l'intégrité structurelle", "Photos avant/après incluses"] },
        { category: "Ponctuel", title: "Inspection technique", description: "Avant toute intervention, nous pouvons effectuer une inspection visuelle pour identifier les zones fragilisées, microfissures ou encrassements avancés.", features: ["Inspection visuelle haute résolution", "Cartographie des zones critiques", "Rapport PDF sous 48h", "Recommandations adaptées au support"] },
      ],
      domainesEyebrow: "Domaines d'application",
      domainesTitle: "Adapté à chaque type de façade.",
      domaines: [
        { iconName: "Home", category: "Enduits", title: "Enduits minéraux et modernes", description: "La majorité des façades corses récentes. Enduits gratter, taloché, hydraulique ou monocouche : traitement doux adapté pour éliminer traces vertes et noircissement sans altération.", highlightLabel: "Support courant", highlightDescription: "majorité des villas récentes" },
        { iconName: "Landmark", category: "Pierre", title: "Pierre naturelle et patrimoine", description: "Centre-villes historiques de Bastia, Ajaccio, Corte, Bonifacio. Approche respectueuse de la pierre de taille, moellons ou granite, avec produits compatibles avec les matériaux anciens.", highlightLabel: "Patrimoine", highlightDescription: "compatible zones classées ABF" },
        { iconName: "Building", category: "Béton", title: "Béton et immeubles modernes", description: "Copropriétés, immeubles de bureaux, ensembles résidentiels. Hauteur jusqu'à 100 mètres traitée sans nacelle, intervention rapide et sans perturbation pour les occupants.", highlightLabel: "100m", highlightDescription: "hauteur max sans nacelle" },
        { iconName: "Factory", category: "Bardage", title: "Bardage métallique et composite", description: "Bâtiments industriels, supermarchés, hangars commerciaux. Traitement spécifique pour les bardages métalliques, composites ou stratifiés sans altération de la finition.", highlightLabel: "Industriel", highlightDescription: "traitement adapté aux bardages" },
        { iconName: "Building2", category: "Copropriétés", title: "Copropriétés et résidences", description: "Immeubles collectifs avant AG de ravalement. Alternative économique au ravalement complet : un nettoyage restaure souvent l'aspect sans travaux lourds. Rapport exploitable en assemblée.", highlightLabel: "Rapport AG", highlightDescription: "inclus dans la prestation" },
        { iconName: "Store", category: "Hôtels & commerces", title: "Hôtels et commerces de ville", description: "Devantures de boutiques, façades d'hôtels, commerces en centre-ville. Intervention hors saison ou nocturne pour préserver l'activité et l'image de votre établissement.", highlightLabel: "Discret", highlightDescription: "intervention hors heures d'ouverture" },
      ],
      faq: [
        { question: "À quelle fréquence faut-il nettoyer une façade ?", answer: "Tous les 5 à 10 ans selon l'exposition. Une façade côtière exposée au sel marin nécessite un entretien plus fréquent (3 à 5 ans) qu'une façade abritée." },
        { question: "Quels produits utilisez-vous ?", answer: "Selon le support : eau adoucie pour les pierres, anti-biofilm biodégradable pour les enduits modernes, produits certifiés ABF pour les bâtiments classés. Toujours adaptés au matériau et à l'environnement." },
        { question: "Le drone peut-il s'approcher au plus près ?", answer: "Oui, jusqu'à 1-2 mètres de la façade. Le télépilote contrôle la distance pour assurer une pulvérisation efficace sans risque pour le support ni les ouvertures." },
        { question: "Faut-il évacuer les occupants ?", answer: "Non. Le périmètre de sécurité au sol est limité, l'activité du bâtiment continue normalement. Nous prévenons simplement de fermer les fenêtres pendant l'intervention sur leur niveau." },
      ],
      finalCTATitle: "Un ravalement à éviter ?",
      finalCTASubtitle: "Souvent un nettoyage suffit. Devis sans engagement sous 48h.",
      finalCTAButtonLabel: "Demander un devis",
    },
    "panneaux-solaires": {
      heroEyebrow: "Nettoyage · panneaux solaires",
      heroTitle: "Des panneaux propres, une production restaurée.",
      heroPitch:
        "Nettoyage professionnel de vos panneaux photovoltaïques par drone. Eau osmosée pure, basse pression, sans risque pour les cellules. Intervention partout en Corse, de la villa à la centrale.",
      heroImageAlt: "Drone nettoyant des panneaux photovoltaïques",
      stats: [
        { prefix: "jusqu'à +30", value: "%", unit: "", labelStrong: "de rendement restauré", labelMuted: "sur des installations encrassées" },
        { value: "500", unit: "panneaux/h", labelStrong: "cadence moyenne", labelMuted: "contre 50 en nettoyage manuel" },
        { value: "0", unit: "risque", labelStrong: "humain & matériel", labelMuted: "intervention sans contact, sans échelle" },
      ],
      whyEyebrow: "Pourquoi nettoyer ses panneaux",
      whyTitle: "Un geste simple, un impact immédiat.",
      whyIntro:
        "En Corse, vos installations photovoltaïques sont exposées en permanence au sel marin, aux poussières sahariennes, aux pollens et aux fientes d'oiseaux. Sans entretien régulier, le rendement chute et la durée de vie des modules se réduit. Un nettoyage professionnel au bon moment suffit à restaurer immédiatement votre production.",
      whyItems: [
        { title: "Rendement énergétique", description: "Un nettoyage professionnel restaure immédiatement la performance d'une installation résidentielle, pro ou industrielle." },
        { title: "Durabilité", description: "L'encrassement prolongé crée des points chauds et des dégradations invisibles qui réduisent la durée de vie des modules." },
        { title: "Rentabilité", description: "Un encrassement léger peut générer une perte invisible mais continue. L'entretien régulier préserve la rentabilité sur le long terme." },
        { title: "Sécurité", description: "L'intervention est réalisée depuis le sol ou par drone, sans déplacement sur la toiture, sans risque de chute ni dégradation du support." },
      ],
      formulas: [
        { category: "Récurrent", title: "Contrat d'entretien annuel", description: "Formule sur-mesure avec interventions programmées selon votre exposition géographique et vos contraintes d'exploitation.", features: ["1 à 3 passages par an selon besoin", "Tarif préférentiel vs intervention ponctuelle", "Rapport annuel de performance", "Alertes si anomalie détectée"] },
        { badge: "Recommandé", isHighlighted: true, category: "Le plus demandé", title: "Nettoyage à l'eau osmosée", description: "Intervention complète en deux phases : pré-traitement des dépôts tenaces puis rinçage à l'eau osmosée pure, sans traces ni résidus.", features: ["Eau déminéralisée, sans produit chimique", "Basse pression, préservation des modules", "Intervention en une seule passe", "Photos avant/après incluses"] },
        { category: "Ponctuel", title: "Inspection technique et thermique", description: "Pour identifier l'état de votre installation et déterminer si un nettoyage ou une intervention plus poussée est nécessaire.", features: ["Inspection visuelle haute résolution", "Option thermographie (hotspots, cellules)", "Rapport PDF sous 48h", "Recommandations personnalisées"] },
      ],
      domainesEyebrow: "Domaines d'application",
      domainesTitle: "Pour toute installation photovoltaïque.",
      domaines: [
        { iconName: "Home", category: "Particuliers", title: "Maisons individuelles", description: "Installations résidentielles de 3 à 12 kWc en autoconsommation ou revente. Nettoyage rapide, sans accès à la toiture, sans risque pour les tuiles ou le bac acier.", highlightLabel: "1 heure", highlightDescription: "intervention moyenne" },
        { iconName: "Building2", category: "Copropriétés", title: "Copropriétés et résidences", description: "Installations collectives, immeubles récents équipés, résidences de tourisme. Rapport exploitable en assemblée générale avec données de performance chiffrées.", highlightLabel: "Rapport AG", highlightDescription: "inclus dans la prestation" },
        { iconName: "Sun", category: "Centrales", title: "Exploitations solaires", description: "Parcs au sol et ombrières de grande surface. Plan de vol automatisé, couverture homogène, intervention planifiée hors pics de production pour minimiser l'impact.", highlightLabel: "10 000m²", highlightDescription: "couverts en une journée" },
        { iconName: "Building", category: "Hôtellerie", title: "Hôtels et résidences touristiques", description: "Installations en environnement littoral, très exposées au sel marin. Nettoyage hors saison pour ne pas perturber l'activité, préparation optimale de la saison estivale.", highlightLabel: "Hors saison", highlightDescription: "intervention novembre - mars" },
        { iconName: "Sprout", category: "Agriculture", title: "Exploitations agricoles", description: "Serres photovoltaïques, bâtiments d'élevage équipés, agrivoltaïsme. Intervention adaptée aux contraintes agricoles et à la poussière spécifique des exploitations.", highlightLabel: "Compatible", highlightDescription: "avec activité agricole en cours" },
        { iconName: "Factory", category: "Industriel", title: "Bâtiments industriels", description: "Hangars, entrepôts et bâtiments industriels équipés en toiture ou ombrières de parking. Intervention sans arrêt d'activité, coordination avec vos équipes de maintenance.", highlightLabel: "Sans arrêt", highlightDescription: "d'activité ni de production" },
      ],
      faq: [
        { question: "À quelle fréquence faut-il nettoyer ses panneaux solaires en Corse ?", answer: "En Corse, un nettoyage des panneaux solaires est généralement recommandé tous les 12 à 18 mois afin de maintenir un bon niveau de production. Les installations situées en bord de mer ou fortement exposées au vent, au sel et aux poussières subissent plus rapidement des pertes de rendement." },
        { question: "Le nettoyage abîme-t-il les panneaux ?", answer: "Absolument pas, le nettoyage se fait à basse pression, avec des produits adaptés ainsi que de l'eau osmosée, afin de préserver l'intégrité du verre, des cellules photovoltaïques et des joints." },
        { question: "Peut-on constater un gain de production après nettoyage ?", answer: "Un gain de production est immédiatement constaté après le nettoyage. Après environ un an sans entretien, le gain se situe souvent entre 10 et 15%. Sur des installations restées plusieurs années sans nettoyage, notamment en zones exposées au sel, poussières ou pollution, le gain peut atteindre 30 à 50%." },
        { question: "Intervenez-vous sur des centrales de grande surface ?", answer: "Oui, nous intervenons sur les centrales photovoltaïques de grande surface. Ce type d'intervention nécessite des moyens adaptés pour garantir rapidité et rentabilité. Nos solutions permettent de traiter de vastes installations en un temps réduit." },
      ],
      finalCTATitle: "Un parc à entretenir ?",
      finalCTASubtitle: "Audit de production gratuit. Devis adapté à votre installation sous 48h.",
      finalCTAButtonLabel: "Demander un devis",
    },
  },
  diagnostic: {
    thermique: {
      heroEyebrow: "Diagnostic · thermique",
      heroTitle: "La thermographie voit ce que l'œil ne voit pas.",
      heroPitch:
        "Identifiez déperditions de chaleur, défauts d'isolation et pannes de panneaux photovoltaïques depuis les airs. Rapport technique exploitable, partout en Corse.",
      heroImageAlt: "Drone effectuant un diagnostic thermique",
      stats: [
        { prefix: "-85", value: "%", unit: "", labelStrong: "de coût", labelMuted: "vs. échafaudage traditionnel" },
        { value: "2-3", unit: "h", labelStrong: "SUR SITE", labelMuted: "contre plusieurs jours habituellement" },
        { value: "0", unit: "", labelStrong: "NUISANCE CHANTIER", labelMuted: "sans arrêt d'activité ni accès bloqué" },
      ],
      whyEyebrow: "Pourquoi un diagnostic thermique ?",
      whyTitle: "Des anomalies invisibles, des enjeux bien réels.",
      whyIntro:
        "Un bâtiment qui perd de la chaleur ne se voit pas à l'œil nu. Les déperditions thermiques, les ponts thermiques, les infiltrations d'eau sous membrane ou les cellules photovoltaïques défaillantes se trahissent par une seule chose : une différence de température. En Corse, les contraintes sont spécifiques : bâti ancien à Bastia ou Corte, résidences côtières exposées aux embruns, hangars industriels de la plaine orientale, parcs photovoltaïques sous soleil méditerranéen.",
      whyItems: [
        { title: "Déperditions", description: "Ponts thermiques, défauts d'isolation, infiltrations." },
        { title: "Panneaux PV", description: "Cellules défaillantes, hotspots, baisse de rendement." },
        { title: "Étanchéité", description: "Toitures terrasses, membranes, zones humides cachées." },
        { title: "Préventif", description: "Détection précoce avant dégradation visible." },
      ],
      formulas: [],
      domainesEyebrow: "Domaines d'application",
      domainesTitle: "Des solutions adaptées à chaque secteur.",
      domaines: [
        { iconName: "Building2", category: "Copropriétés", title: "Copropriétés et syndics", description: "Un immeuble qui surconsomme, ce sont des charges qui gonflent. Le diagnostic thermique identifie les ponts thermiques, fuites aux menuiseries et infiltrations cachées avant que les désordres deviennent visibles.", highlightLabel: "1 journée", highlightDescription: "pour un immeuble complet" },
        { iconName: "Factory", category: "Industrie", title: "Bâtiments industriels et commerciaux", description: "Entrepôts, hangars, centres commerciaux, usines : une seule infiltration peut endommager marchandises ou process. Le drone couvre 5 000 à 10 000 m² en une mission, sans arrêt d'activité.", highlightLabel: "10 000m²", highlightDescription: "couverts en une seule mission" },
        { iconName: "Sun", category: "Photovoltaïque", title: "Parcs photovoltaïques", description: "Une centrale perd 1 à 3% de production par an du fait de défauts non détectés. L'inspection thermique révèle hotspots, diodes by-pass grillées et problèmes d'ombrage. ROI dès la première correction.", highlightLabel: "500 panneaux", highlightDescription: "inspectés en moins d'une heure" },
        { iconName: "Building", category: "Hôtellerie", title: "Hôtellerie et résidences touristiques", description: "En Corse, la saisonnalité exige des bâtiments fiables entre mai et octobre. Le diagnostic thermique cible les défauts d'isolation qui pèsent sur les factures de climatisation estivale.", highlightLabel: "Pleine saison", highlightDescription: "intervention sans perturber l'activité" },
        { iconName: "Landmark", category: "Public", title: "Patrimoine public et collectivités", description: "Écoles, mairies, gymnases : un patrimoine souvent ancien, énergivore et contraint en budget d'entretien. Le diagnostic thermique permet de prioriser les rénovations et justifier les subventions ADEME, ADEC ou CEE.", highlightLabel: "Subventions", highlightDescription: "ADEME, ADEC, CEE éligibles" },
        { iconName: "FileText", category: "Expertise", title: "Expertise et dossiers d'assurance", description: "Avant un renouvellement, pendant un sinistre ou pour documenter un état des lieux : le rapport thermique apporte des preuves visuelles objectives, géoréférencées et opposables.", highlightLabel: "Opposable", highlightDescription: "preuves géoréférencées et horodatées" },
      ],
      processSteps: [
        { number: "ÉTAPE 01", title: "Vol thermique", description: "Captation par drone DJI Matrice 4T équipé d'une caméra radiométrique haute résolution. Survol complet de la zone avec prises de vues verticales et obliques. 2 à 3 heures sur site." },
        { number: "ÉTAPE 02", title: "Analyse des anomalies", description: "Traitement des données, identification et localisation précise des défauts. Chaque anomalie est isolée, géoréférencée et annotée avec son interprétation technique. Sous 48 à 72h." },
        { number: "ÉTAPE 03", title: "Rapport exploitable", description: "Document PDF complet avec images thermiques annotées, préconisations priorisées et recommandations d'intervention claires. 15 à 40 pages." },
      ],
      techItems: [
        { title: "Déperditions de chaleur", description: "Une caméra radiométrique infrarouge mesure les écarts de température à la surface des matériaux. Un point plus chaud en toiture l'hiver trahit une fuite thermique.", spec: "Sensibilité ≤ 0,05°C" },
        { title: "Les conditions de mesure", description: "L'écart de température intérieur/extérieur (ΔT) doit dépasser 10°C pour les audits d'isolation. Les inspections photovoltaïques se font à l'inverse en plein soleil.", spec: "ΔT ≥ 10°C · Irradiance ≥ 600 W/m²" },
        { title: "L'avantage du drone", description: "Notre drone capture la toiture à distance constante en chaque point. Lecture thermique homogène, comparaisons fiables.", spec: "5 000 m² / 60 min" },
      ],
      compareTitle: "De 15 jours à 3 heures",
      compareSubtitle: "Comparatif pour l'inspection d'une villa R+2 en Corse (façades et toiture).",
      compareCols: [
        { isOurs: true, badge: "MÉTHODE moderne", title: "Corse Drone", price: "400 - 700 €", rows: [
          { label: "Préavis légal", value: "10 jours" },
          { label: "Intervention", value: "2 à 3 heures" },
          { label: "Couverture", value: "100%" },
          { label: "Risque humain", value: "Nul" },
        ]},
        { badge: "MÉTHODE ALTERNATIVE", title: "Cordiste thermographe", price: "900 - 1 800 €", rows: [
          { label: "Temps sur site", value: "1 à 2 jours" },
          { label: "Ancrage requis", value: "Oui" },
          { label: "Couverture", value: "Partielle" },
          { label: "Risque humain", value: "Élevé" },
        ]},
        { badge: "MÉTHODE TRADITIONNELLE", title: "Nacelle + thermographe", price: "800 - 1 300 €", rows: [
          { label: "Temps sur site", value: "1 journée" },
          { label: "Accès voirie", value: "Obligatoire" },
          { label: "Angles d'analyse", value: "Limités" },
          { label: "Couverture toiture", value: "Partielle" },
        ]},
      ],
      compareDisclaimer: "Estimations basées sur les tarifs moyens constatés en France (2025-2026). Devis personnalisé sur demande.",
      faq: [
        { question: "Quand réaliser un diagnostic thermique ?", answer: "Idéalement en période froide, entre octobre et avril en Corse, lorsque l'écart de température entre intérieur chauffé et extérieur est suffisant. Pour les inspections photovoltaïques, en plein ensoleillement entre 11h et 15h, irradiance > 600 W/m²." },
        { question: "Faut-il des conditions météo particulières ?", answer: "Oui : ΔT > 10°C entre intérieur/extérieur, vent < 30 km/h, ciel dégagé depuis 2h, absence de pluie dans les 12h précédentes. Si non réunies, mission reportée sans frais. Pour le photovoltaïque : irradiance > 600 W/m²." },
        { question: "Que contient le rapport final ?", answer: "PDF de 15 à 40 pages : cartographie thermique, zoom sur chaque anomalie avec image visuelle ET thermique, températures mesurées, interprétation technique (pont thermique, défaut d'isolation, infiltration, défaut cellule), préconisations priorisées." },
        { question: "Vos certifications STS couvrent-elles ma mission ?", answer: "Corse Drone opère avec STS-01 et STS-02 délivrées par la DGAC, couvrant la quasi-totalité du territoire corse. Drone DJI Matrice 4T classé C2, vol jusqu'à 5m des personnes. Pour zones sensibles, plan de vol spécifique avec préavis 10 jours." },
      ],
      finalCTATitle: "Un audit thermique à programmer ?",
      finalCTASubtitle: "Préavis légal 10 jours. Rapport sous 72h après intervention.",
      finalCTAButtonLabel: "Demander un devis",
    },
    visuel: {
      heroEyebrow: "Diagnostic · visuel",
      heroTitle: "Voir ce que l'œil ne voit pas.",
      heroPitch:
        "Inspection visuelle par drone haute définition des bâtiments difficiles d'accès. Toitures, façades, infrastructures industrielles et patrimoine : un rapport précis, livré en 48h, sans nacelle ni cordistes.",
      heroImageAlt: "Drone effectuant une inspection visuelle",
      stats: [
        { prefix: "120+", value: "m", unit: "", labelStrong: "hauteur inspectable", labelMuted: "avant demande via dossier" },
        { value: "5 000", unit: "m²/jour", labelStrong: "Surface couverte", labelMuted: "inspection complète en une mission" },
        { value: "48", unit: "h", labelStrong: "Délai de livraison moyen", labelMuted: "du rapport technique détaillé" },
      ],
      whyEyebrow: "Pourquoi le drone",
      whyTitle: "L'œil nu, le drone : un écart considérable.",
      whyIntro:
        "Inspecter une toiture, une façade ou un ouvrage en hauteur, c'est historiquement mobiliser des moyens lourds : nacelle élévatrice avec opérateur, cordistes certifiés. Coûteux, contraignants, parfois dangereux. Le drone change radicalement la donne : même niveau de détail, en une fraction du temps, sans personnel en hauteur.",
      whyItems: [
        { title: "Sécurité", description: "Zéro personnel en hauteur. Aucun point d'ancrage ni déploiement de matériel lourd. Risque humain éliminé." },
        { title: "Rapidité", description: "5 à 10 fois plus rapide qu'une inspection par cordiste. Une toiture de villa inspectée en moins d'une heure, rapport livré en 48h." },
        { title: "Précision", description: "Images 4K avec zoom optique. Microfissures, joints dégradés, corrosion naissante : les défauts millimétriques sont détectés." },
        { title: "Traçabilité", description: "Rapport géoréférencé et horodaté. Chaque anomalie cartographiée, documentée, opposable. Réutilisable pour AG, assurance ou travaux." },
      ],
      formulas: [],
      domainesEyebrow: "Domaines d'application",
      domainesTitle: "Des solutions adaptées à chaque secteur.",
      domaines: [
        { iconName: "Building2", category: "Copropriétés", title: "Syndics et copropriétés", description: "Constat avant AG, préparation de ravalement décennal, état des lieux des parties communes en toiture, suivi de l'évolution de défauts d'une année sur l'autre.", highlightLabel: "1 journée", highlightDescription: "pour un immeuble complet" },
        { iconName: "Factory", category: "Industrie", title: "Bâtiments industriels et commerciaux", description: "Cheminées, silos, hangars, entrepôts logistiques, structures métalliques. Inspection complète sans interruption de production ni immobilisation de site.", highlightLabel: "Zéro arrêt", highlightDescription: "d'activité ni de production" },
        { iconName: "Home", category: "Transaction", title: "Particuliers et transaction", description: "Avant acquisition immobilière, avant ravalement ou rénovation. Vérification de l'état réel d'une toiture ou d'une façade pour négocier ou chiffrer en connaissance de cause.", highlightLabel: "Aide décision", highlightDescription: "rapport sous 48h pour négocier" },
        { iconName: "Building", category: "Hôtellerie", title: "Hôtellerie et résidences touristiques", description: "Inspection hors-saison des hôtels, résidences de tourisme, villages vacances. Détection préventive des défauts avant l'ouverture estivale. Documentation pour assurance.", highlightLabel: "Oct – Avril", highlightDescription: "fenêtre d'intervention idéale" },
        { iconName: "Landmark", category: "Patrimoine", title: "Patrimoine public et collectivités", description: "Églises, clochers, édifices historiques, bâtiments publics. Inspection respectueuse en zone ABF et secteurs sauvegardés, sans échafaudage ni impact visuel.", highlightLabel: "Zone ABF", highlightDescription: "compatible et sans emprise au sol" },
        { iconName: "FileText", category: "Expertise", title: "Expertise et dossiers d'assurance", description: "Documentation de sinistres post-tempête, constat d'infiltrations, expertise contradictoire. Rapport opposable géoréférencé et horodaté pour dossiers d'indemnisation.", highlightLabel: "Opposable", highlightDescription: "preuves géoréférencées et horodatées" },
      ],
      processSteps: [
        { number: "ÉTAPE 01", title: "Vol d'inspection", description: "Couverture complète 4K par drone DJI. Captation verticale et oblique de toutes les façades et de la toiture selon un plan de vol optimisé. 2 à 3 heures sur site." },
        { number: "ÉTAPE 02", title: "Analyse des anomalies", description: "Traitement des données, identification et géolocalisation précise des défauts. Chaque anomalie est isolée, catégorisée et annotée. Sous 48 à 72h." },
        { number: "ÉTAPE 03", title: "Rapport exploitable", description: "Document PDF complet avec images annotées, cartographie des anomalies, préconisations de travaux priorisées. 15 à 40 pages." },
      ],
      compareTitle: "De 1 semaine à 1 journée",
      compareSubtitle: "Comparatif pour l'inspection d'une copropriété de 4 bâtiments R+5 en Corse (~5 000 m² de façades + 4 toitures).",
      compareCols: [
        { isOurs: true, badge: "MÉTHODE moderne", title: "Corse Drone", price: "2 400 - 3 500 €", rows: [
          { label: "Préavis légal", value: "10 jours" },
          { label: "Intervention", value: "1 journée" },
          { label: "Couverture", value: "100%" },
          { label: "Risque humain", value: "Nul" },
        ]},
        { badge: "MÉTHODE ALTERNATIVE", title: "Cordistes", price: "6 000 - 10 000 €", rows: [
          { label: "Temps sur site", value: "5 à 7 jours" },
          { label: "Ancrage requis", value: "Oui" },
          { label: "Couverture", value: "Complète" },
          { label: "Risque humain", value: "Élevé" },
        ]},
        { badge: "MÉTHODE TRADITIONNELLE", title: "Nacelle + opérateur", price: "3 000 - 5 000 €", rows: [
          { label: "Temps sur site", value: "3 jours" },
          { label: "Accès voirie", value: "Obligatoire" },
          { label: "Angles d'analyse", value: "Limités" },
          { label: "Couverture toiture", value: "Partielle" },
        ]},
      ],
      compareDisclaimer: "Estimations basées sur les tarifs moyens constatés en France (2025-2026). Devis personnalisé sur demande.",
      techItems: [
        { title: "Catalogue d'inspection", description: "Fissures structurelles, étanchéité défaillante, éléments déplacés, corrosion, décollements, dégâts climatiques : tous les défauts visibles sont détectés et documentés.", spec: "Résolution 4K + zoom optique 10×" },
        { title: "Précision GPS", description: "Chaque anomalie est géoréférencée avec une précision centimétrique pour faciliter la localisation des travaux ultérieurs.", spec: "≤ 5 cm de géoréférencement" },
        { title: "Rapport complet", description: "Document PDF détaillé avec cartographie des anomalies, images annotées, interprétations techniques et préconisations de travaux priorisées.", spec: "15 à 40 pages détaillées" },
      ],
      faq: [
        { question: "Quels types d'anomalies détectez-vous ?", answer: "Microfissures et fissures traversantes, joints dégradés, étanchéité défaillante, tuiles cassées ou glissées, ardoises manquantes, ferrailles apparentes, corrosion, décollements d'enduits, peintures cloquées, dégâts climatiques, et plus encore." },
        { question: "Quelle est la précision des images ?", answer: "Résolution 4K avec zoom optique 10× et précision GPS de l'ordre du centimètre. Les microfissures, joints dégradés et corrosion naissante sont détectables." },
        { question: "Le rapport est-il opposable juridiquement ?", answer: "Oui. Chaque anomalie est géoréférencée et horodatée, ce qui rend le rapport opposable et utilisable pour des dossiers d'assurance, expertises contradictoires ou justifications de subventions." },
        { question: "Sur quelle hauteur pouvez-vous intervenir ?", answer: "Jusqu'à 120 mètres en vol standard. Au-delà, un dépôt de plan de vol spécifique est nécessaire avec un préavis de 10 jours." },
      ],
      finalCTATitle: "Une inspection à programmer ?",
      finalCTASubtitle: "Devis sous 48h, intervention sous 10 jours, rapport livré sous 72h.",
      finalCTAButtonLabel: "Demander un devis",
    },
  },
};
