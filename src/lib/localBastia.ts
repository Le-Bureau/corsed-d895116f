// Content for /drone-bastia-haute-corse. Only facts already established on
// the site (services, references, regulation) — no invented delays or prices.

export const BASTIA_SERVICES = [
  { label: "Nettoyage de toitures", href: "/pole/nettoyage/toitures", pole: "nettoyage", text: "Démoussage et traitement des tuiles, ardoises et lauzes, sans monter sur le toit." },
  { label: "Nettoyage de façades", href: "/pole/nettoyage/facades", pole: "nettoyage", text: "Enduits, pierre et immeubles hauts, sans échafaudage dans les rues étroites." },
  { label: "Panneaux solaires", href: "/pole/nettoyage/panneaux-solaires", pole: "nettoyage", text: "Sel, sable du Sahara, pollens : une production restaurée sans abîmer les modules." },
  { label: "Thermographie", href: "/pole/diagnostic/thermique", pole: "diagnostic", text: "Ponts thermiques, infiltrations, points chauds photovoltaïques et électriques." },
  { label: "Inspection visuelle", href: "/pole/diagnostic/visuel", pole: "diagnostic", text: "Toitures, façades et ouvrages inspectés sans nacelle ni cordiste, rapport localisé." },
  { label: "Photogrammétrie", href: "/pole/diagnostic/photogrammetrie", pole: "diagnostic", text: "Orthophotos, modèles 3D et relevés géoréférencés au centimètre." },
] as const;

export const BASTIA_CLIMATE = [
  { title: "Les embruns", text: "De la place Saint-Nicolas à Pietranera, l'air marin dépose du sel qui cristallise sur les toitures, les façades et les panneaux, et attaque les fixations métalliques." },
  { title: "Le sirocco", text: "Il ramène régulièrement le sable saharien : un voile orangé qui retient l'humidité, favorise mousses et lichens, et fait chuter le rendement des panneaux solaires." },
  { title: "Un bâti dense et ancien", text: "Terra Vecchia, la citadelle, les immeubles hauts du centre : des rues étroites où un échafaudage ou une nacelle coûtent cher et bloquent tout. Le drone, lui, passe au-dessus." },
  { title: "L'humidité des versants", text: "Dans le Cap Corse, le Nebbio ou la Castagniccia, les versants nord et les villages boisés restent humides : les toitures verdissent vite et retiennent l'eau." },
] as const;

export const BASTIA_REFERENCES = [
  {
    place: "Bastia",
    client: "Communauté d'Agglomération de Bastia",
    title: "Deux bâtiments publics inspectés en une journée",
    figures: "22 anomalies relevées, classées et localisées",
    href: "/blog/inspection-toiture-drone-cab-bastia",
  },
  {
    place: "Canari, Cap Corse",
    client: "Térélian (groupe Vinci)",
    title: "Fixation amiante sur l'ancienne usine de Canari",
    figures: "1 500 m² traités sur 7 zones, équipe en zone verte",
    href: "/blog/canari-fixation-amiante-drone-terelian-vinci",
  },
] as const;

export const BASTIA_AREAS = [
  { zone: "Agglomération de Bastia", towns: "Bastia, Ville-di-Pietrabugno, San-Martino-di-Lota, Santa-Maria-di-Lota, Furiani, Biguglia" },
  { zone: "Cap Corse", towns: "Ogliastro, Canari, Nonza, Luri, Rogliano, Macinaggio, Erbalunga, Sisco, Pino" },
  { zone: "Nebbio et Balagne", towns: "Saint-Florent, Patrimonio, Oletta, L'Île-Rousse, Calvi, Algajola" },
  { zone: "Marana, Casinca et plaine orientale", towns: "Borgo, Lucciana, Vescovato, Moriani, Cervione, Aléria, Ghisonaccia" },
  { zone: "Centre Corse", towns: "Corte, Ponte-Leccia, Castagniccia, Venaco" },
] as const;

export const BASTIA_FAQ = [
  { question: "Intervenez-vous à Bastia et dans toute la Haute-Corse ?", answer: "Oui. Corse Drone est basé à Ogliastro, dans le Cap Corse : Bastia, le Cap, le Nebbio, la Balagne, la plaine orientale et le centre Corse font partie de notre zone d'intervention habituelle. Nous intervenons aussi en Corse-du-Sud." },
  { question: "Peut-on faire voler un drone en centre-ville de Bastia ?", answer: "Oui, dans un cadre précis. Le centre-ville et les abords de l'aéroport de Bastia-Poretta sont des zones réglementées : nous vérifions chaque site, déposons les déclarations nécessaires et sécurisons un périmètre au sol pendant l'intervention." },
  { question: "Quel délai prévoir avant une intervention ?", answer: "Pour les opérations sous certification, la réglementation impose un délai minimum de 10 jours entre la demande de vol et son exécution. Nous l'intégrons d'office au planning, et nous établissons le devis dès que nous avons les éléments du site." },
  { question: "Vous avez des références en Haute-Corse ?", answer: "Oui : l'inspection des toitures de deux bâtiments de la Communauté d'Agglomération de Bastia, et la fixation amiante de l'ancienne usine de Canari avec Térélian (groupe Vinci). Les deux missions sont détaillées sur notre blog." },
  { question: "Le drone convient-il aux copropriétés bastiaises ?", answer: "C'est l'un des cas où il est le plus pertinent : immeubles hauts, rues étroites, façades et toitures difficiles d'accès. Le drone évite l'échafaudage, ne bloque pas la rue et fournit des photos et un rapport utilisables en assemblée générale." },
] as const;
