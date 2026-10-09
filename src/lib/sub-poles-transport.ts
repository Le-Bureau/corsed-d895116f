import transportImg from "@/assets/hero/transport.webp";
import type { SubPoleContent, SubPoleCompareCol } from "@/lib/sub-poles";

// Figures: DJI FlyCart 100 spec sheet (dji.com/flycart-100/specs). No
// helicopter prices or authorisation delays are published on purpose: we
// have no sourced figure for them.

const COMPARE_COLS: SubPoleCompareCol[] = [
  {
    isOurs: true,
    badge: "Drone cargo",
    title: "Corse Drone",
    rows: [
      { label: "Charge par rotation", value: "Jusqu'à 100 kg (85 kg en courant)" },
      { label: "Dépose", value: "Au treuil, sans se poser" },
      { label: "Aire nécessaire", value: "Aucune au point de dépose" },
      { label: "Bruit", value: "Électrique, discret" },
    ],
  },
  {
    badge: "Méthode classique",
    title: "Hélicoptère",
    rows: [
      { label: "Charge par rotation", value: "Plusieurs centaines de kg" },
      { label: "Dépose", value: "À l'élingue" },
      { label: "Aire nécessaire", value: "Zone de dépose sécurisée" },
      { label: "Bruit", value: "Très élevé" },
    ],
  },
  {
    badge: "Méthode traditionnelle",
    title: "Portage",
    rows: [
      { label: "Charge par rotation", value: "Quelques dizaines de kg" },
      { label: "Dépose", value: "À la main" },
      { label: "Aire nécessaire", value: "Un sentier praticable" },
      { label: "Bruit", value: "Nul" },
    ],
  },
];

export const TRANSPORT_SUB_POLES: Record<string, SubPoleContent> = {
  refuges: {
    heroEyebrow: "Transport · refuges",
    seoTitle: "Ravitaillement de refuges par drone en Corse",
    heroTitle: "Le refuge ravitaillé, sans attendre l'hélico.",
    heroPitch:
      "Vivres, gaz, matériel d'entretien, redescente des déchets : notre DJI FlyCart 100 dépose jusqu'à 100 kg par rotation au treuil, directement au refuge. Pour le Parc comme pour les gardiens, du GR20 aux sentiers Mare a Mare.",
    heroImage: transportImg,
    heroImageAlt: "Drone cargo transportant une charge suspendue en montagne",
    stats: [
      { value: "100", unit: "kg", labelStrong: "par rotation max", labelMuted: "85 kg en exploitation courante" },
      { value: "30", unit: "m", labelStrong: "de treuil", labelMuted: "dépose sans se poser" },
      { value: "9", unit: "min", labelStrong: "de recharge", labelMuted: "entre deux rotations, sur site" },
    ],
    whyEyebrow: "Pourquoi le drone en refuge",
    whyTitle: "Au refuge, ce qui manque manque vraiment.",
    whyIntro:
      "Les refuges corses sont, par définition, loin de toute route. Leur approvisionnement repose sur des rotations d'hélicoptère groupées et planifiées, et sur le portage pour le reste. Entre deux rotations, une pièce cassée, une bouteille de gaz vide ou un stock de vivres frais qui s'épuise, et il faut attendre. Le drone cargo ajoute une option intermédiaire : des rotations plus petites, plus fréquentes, au moment où on en a besoin.",
    whyItems: [
      { title: "Réassort à la demande", description: "Vivres frais, boissons, gaz, au rythme de la fréquentation, sans attendre la prochaine rotation groupée ni monter tout le stock d'un coup." },
      { title: "Dépose au mètre près", description: "Le treuil de 30 mètres descend la charge sur la terrasse ou devant la réserve, même sur un terrain en pente ou sans dégagement." },
      { title: "Électrique et discret", description: "Un drone électrique au cœur d'un espace naturel protégé, près de la faune et des troupeaux : bien moins de bruit qu'un hélicoptère." },
      { title: "Redescente des déchets", description: "Les déchets et le matériel usagé redescendent au fil de la saison, plutôt qu'en une seule grosse opération à la fermeture." },
    ],
    formulas: [
      { category: "Début et fin de saison", title: "Ouverture et fermeture", description: "Montée du matériel et des stocks avant l'ouverture, redescente à la fermeture, par rotations courtes enchaînées sur une ou plusieurs journées.", features: ["Matériel de saison et stocks secs", "Équipements techniques (solaire, batteries)", "Redescente en fin de saison", "Planification avec le gestionnaire"] },
      { badge: "Recommandé", isHighlighted: true, category: "Toute la saison", title: "Réassort en saison", description: "Des rotations régulières ou à la demande pendant la saison, calées sur la fréquentation du refuge et la météo. Le gardien commande, on livre.", features: ["Vivres frais, boissons, gaz", "Rotations régulières ou à la demande", "Redescente des déchets au retour", "Calendrier ajusté à la météo"] },
      { category: "Ponctuel", title: "Dépannage et travaux", description: "Une pièce de rechange, du matériel de cuisine ou de premiers secours, des matériaux pour un petit chantier d'entretien : une mission dédiée quand il le faut.", features: ["Pièces et matériel urgents", "Matériaux d'entretien", "Mission dédiée", "Dès que la météo le permet"] },
    ],
    domainesEyebrow: "Où on intervient",
    domainesTitle: "Partout où la route s'arrête.",
    domaines: [
      { iconName: "Tent", category: "Grande randonnée", title: "Refuges du GR20", description: "Les refuges les plus isolés de l'île, en altitude et loin de toute piste. Ravitaillement, matériel d'entretien et redescente des déchets.", highlightLabel: "Altitude", highlightDescription: "jusqu'à 1 500 m au-dessus du décollage" },
      { iconName: "Mountain", category: "Moyenne montagne", title: "Mare a Mare et Mare e Monti", description: "Gîtes d'étape et refuges des itinéraires de traversée, souvent desservis par des pistes difficiles ou saisonnières.", highlightLabel: "Rotations courtes", highlightDescription: "au départ d'une piste ou d'un village" },
      { iconName: "Home", category: "Pastoralisme", title: "Bergeries d'estive", description: "Aliments, bouteilles de gaz, matériel de clôture et vivres pour les bergeries non desservies pendant la saison d'estive.", highlightLabel: "Saisonnier", highlightDescription: "au rythme de l'estive" },
      { iconName: "Wrench", category: "Entretien", title: "Chantiers sur refuge", description: "Matériaux, outillage, menuiseries, pièces de toiture pour les travaux d'entretien, sans mobiliser un hélicoptère pour quelques dizaines de kilos.", highlightLabel: "Treuil 30 m", highlightDescription: "dépose au pied du chantier" },
      { iconName: "Sun", category: "Équipements", title: "Énergie et eau", description: "Panneaux solaires, batteries, pièces pour les citernes, les captages et les sanitaires des refuges.", highlightLabel: "Pesée intégrée", highlightDescription: "masse vérifiée avant chaque vol" },
      { iconName: "Recycle", category: "Environnement", title: "Évacuation des déchets", description: "Redescente régulière de ce qui s'accumule au fil de la saison : déchets, emballages, matériel usagé.", highlightLabel: "Au retour", highlightDescription: "des rotations de ravitaillement" },
    ],
    processSteps: [
      { number: "ÉTAPE 01", title: "Vos besoins de saison", description: "Quantités, fréquence, types de charges, accès au refuge : on dimensionne les rotations avec le gestionnaire et le gardien." },
      { number: "ÉTAPE 02", title: "Repérage", description: "Point de chargement au bout de la piste, trajet, point de dépose au refuge. On vérifie la faisabilité avec le dénivelé et la météo locale." },
      { number: "ÉTAPE 03", title: "Autorisations", description: "Vol en catégorie spécifique, analyse de risque SORA et autorisation de la DGAC à notre charge. Notre dossier est en cours d'instruction auprès de la DSAC." },
      { number: "ÉTAPE 04", title: "Rotations", description: "Chargement, vol, dépose au treuil, retour avec les déchets. Recharge des batteries sur site entre deux rotations." },
      { number: "ÉTAPE 05", title: "Suivi de saison", description: "Relevé des rotations et des masses livrées, ajustement du calendrier selon la fréquentation et la météo." },
    ],
    compareTitle: "Drone, hélicoptère ou portage ?",
    compareSubtitle: "Les trois se complètent. Le drone prend les charges intermédiaires, là où l'hélicoptère est surdimensionné et le portage trop lent.",
    compareCols: COMPARE_COLS,
    compareDisclaimer: "Charges drone : fiche constructeur DJI FlyCart 100. La charge réelle de chaque rotation dépend du dénivelé, de l'altitude et de la météo.",
    faq: [
      { question: "Combien peut-on monter par rotation ?", answer: "Jusqu'à 100 kg avec le DJI FlyCart 100, et 85 kg en exploitation courante sur des trajets jusqu'à 12 km. En altitude et selon le vent, on calcule la charge réelle pour chaque rotation." },
      { question: "Faut-il une aire d'atterrissage au refuge ?", answer: "Non. Le drone reste en vol stationnaire et descend la charge au treuil, jusqu'à 30 mètres sous l'appareil. Il suffit d'une zone de dépose dégagée et sécurisée pendant la rotation." },
      { question: "Et si la météo est mauvaise ?", answer: "Le FlyCart 100 vole avec un vent jusqu'à 12 m/s, de -20 à 40 °C, et résiste à la pluie (IP55). Au-delà, ou dans le brouillard, on reporte : la décision se prend le jour même." },
      { question: "Le drone dérange-t-il la faune ou les randonneurs ?", answer: "Il est électrique et bien moins bruyant qu'un hélicoptère. Les trajets et les horaires sont choisis pour éviter le survol des randonneurs, et la zone de dépose est sécurisée pendant chaque rotation." },
      { question: "Gardien, comment commander un réassort ?", answer: "On fixe ensemble un calendrier de rotations en début de saison, et vous pouvez demander une rotation supplémentaire selon la fréquentation. On confirme en fonction de la météo." },
    ],
    finalCTATitle: "Vous gérez ou gardez un refuge ?",
    finalCTASubtitle: "On construit les premières rotations avec vous. Inscrivez-vous pour être prévenu du lancement et bénéficier de conditions privilégiées.",
    finalCTAButtonLabel: "Être prévenu du lancement",
  },

  "alternative-helicoptere": {
    heroEyebrow: "Transport · alternative à l'hélicoptère",
    seoTitle: "Transport par drone, l'alternative à l'hélicoptère en Corse",
    heroTitle: "Pas besoin d'un hélicoptère pour 80 kilos.",
    heroPitch:
      "Pour les charges de moins de 100 kg et les rotations répétées, le drone cargo évite de mobiliser un hélicoptère. Dépose au treuil, sans aire d'atterrissage, sur chantier, en montagne ou sur un site côtier escarpé.",
    heroImage: transportImg,
    heroImageAlt: "Drone cargo DJI FlyCart 100 en vol avec charge suspendue",
    stats: [
      { value: "100", unit: "kg", labelStrong: "par rotation max", labelMuted: "85 kg en exploitation courante" },
      { value: "12", unit: "km", labelStrong: "de portée", labelMuted: "en bi-batterie, selon la charge" },
      { value: "0", unit: "aire", labelStrong: "d'atterrissage", labelMuted: "dépose au treuil, 30 m de câble" },
    ],
    whyEyebrow: "Quand choisir le drone",
    whyTitle: "Quand l'hélicoptère est surdimensionné.",
    whyIntro:
      "L'hélicoptère reste la référence pour les charges lourdes, d'un seul tenant. Mais pour quelques centaines de kilos répartis en colis, des allers-retours réguliers ou un approvisionnement au fil d'un chantier, il est souvent disproportionné : appareil à réserver, créneau à attendre, rotation facturée même pour une petite charge. Le drone cargo couvre précisément ce créneau.",
    whyItems: [
      { title: "Charges réparties", description: "Sacs de mortier, outillage, menuiseries, pièces techniques : plusieurs rotations courtes plutôt qu'un seul gros transport." },
      { title: "Au fil du chantier", description: "On approvisionne au rythme de l'avancement, au lieu de tout monter d'un coup et de stocker sur un site qui n'a pas la place." },
      { title: "Dépose précise", description: "Le treuil de 30 mètres pose la charge au pied de l'ouvrage, sur une pente ou une crête, sans aire d'atterrissage." },
      { title: "Électrique", description: "Pas de kérosène, beaucoup moins de bruit : adapté aux zones naturelles protégées, aux villages et aux abords des troupeaux." },
    ],
    formulas: [],
    domainesEyebrow: "Cas d'usage",
    domainesTitle: "Là où le drone remplace la rotation d'hélico.",
    domaines: [
      { iconName: "Building", category: "BTP", title: "Chantiers en village perché", description: "Rénovation de maisons de village et de bergeries, murs de soutènement : le matériel arrive au bout de la route, le drone le monte.", highlightLabel: "Au fil du chantier", highlightDescription: "approvisionnement par rotations" },
      { iconName: "RadioTower", category: "Réseaux", title: "Pylônes et antennes", description: "Pièces et outillage pour les interventions sur pylônes, relais télécoms et stations de mesure hors réseau routier.", highlightLabel: "Treuil 30 m", highlightDescription: "dépose au pied de l'ouvrage" },
      { iconName: "Droplets", category: "Eau", title: "Captages et réservoirs", description: "Matériel pour les captages, réservoirs et canalisations des syndicats d'eau et des communes, en montagne ou en maquis dense.", highlightLabel: "Sans piste", highlightDescription: "pas de piste temporaire à ouvrir" },
      { iconName: "Landmark", category: "Patrimoine", title: "Tours génoises et chapelles", description: "Matériaux de restauration déposés au pied de l'ouvrage, sur un promontoire ou un site côtier escarpé.", highlightLabel: "Précision", highlightDescription: "dépose au mètre près" },
      { iconName: "Home", category: "Agriculture", title: "Bergeries et exploitations", description: "Aliments, gaz, matériel de clôture et pièces de rechange pour les sites pastoraux et agricoles non desservis.", highlightLabel: "Régulier", highlightDescription: "rotations planifiées" },
      { iconName: "LifeBuoy", category: "Urgence", title: "Sites coupés", description: "Approvisionnement de sites isolés après des intempéries ou un éboulement, en appui des moyens existants, dès que la météo le permet.", highlightLabel: "En appui", highlightDescription: "des moyens de secours existants" },
    ],
    techItems: [
      { title: "Charge utile", description: "100 kg en configuration mono-batterie sur trajets courts, 85 kg en exploitation courante en bi-batterie.", spec: "100 kg max" },
      { title: "Treuil", description: "Câble de 0 à 30 mètres, pesée intégrée de la charge et largage d'urgence du câble.", spec: "30 m" },
      { title: "Portée", description: "Jusqu'à 12 km en bi-batterie, selon la charge, le dénivelé et le vent.", spec: "12 km" },
      { title: "Sécurité", description: "Parachute intégré, radars, LiDAR et caméras de détection d'obstacles.", spec: "Parachute" },
    ],
    compareTitle: "Drone, hélicoptère ou portage ?",
    compareSubtitle: "On ne remplace pas l'hélicoptère sur les gros tonnages. On l'évite quand il est surdimensionné.",
    compareCols: COMPARE_COLS,
    compareDisclaimer: "Charges drone : fiche constructeur DJI FlyCart 100. Pour les charges de plusieurs centaines de kilos d'un seul tenant, l'hélicoptère reste la bonne solution, et on vous le dira.",
    faq: [
      { question: "Le drone est-il moins cher que l'hélicoptère ?", answer: "Pour une petite charge ou des rotations répétées, souvent, car on ne mobilise pas un appareil et un pilote d'hélicoptère pour quelques dizaines de kilos. Pour une charge lourde d'un seul tenant, non. On étudie chaque projet et on vous dit franchement quelle option est la plus pertinente." },
      { question: "Quand faut-il garder l'hélicoptère ?", answer: "Dès que la charge dépasse 100 kg d'un seul tenant (poutre longue, engin, cuve), pour du vrac sur plusieurs tonnes à monter en une journée, ou quand la distance dépasse la portée du drone." },
      { question: "Quelles autorisations faut-il pour un drone cargo ?", answer: "Un drone de cette taille vole obligatoirement en catégorie spécifique, avec une analyse de risque SORA et une autorisation de la DGAC. C'est à notre charge, et notre dossier est en cours d'instruction auprès de la DSAC." },
      { question: "Le drone vole-t-il par tous les temps ?", answer: "Non, comme l'hélicoptère. Le FlyCart 100 décolle et atterrit avec un vent jusqu'à 12 m/s, de -20 à 40 °C, et résiste à la pluie (IP55). Au-delà, on reporte." },
    ],
    finalCTATitle: "Un transport à étudier ?",
    finalCTASubtitle: "Décrivez-nous la charge, le trajet et le site. On vous dit si le drone est le bon outil. Inscrivez-vous pour être prévenu du lancement.",
    finalCTAButtonLabel: "Être prévenu du lancement",
  },
};
