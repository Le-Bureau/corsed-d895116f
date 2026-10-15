// Prices shown on the site, set by Corse Drone (October 2026). Private clients
// see prices with VAT (TTC), as French law requires; professionals see them
// without VAT (HT). Roofs and façades can be invoiced at 10 % VAT when the home
// qualifies, otherwise 20 %; solar cleaning is always 20 %.
// Change a price here only: every FAQ that quotes it reads from this file.

const PRIVATE_M2 =
  "9,60 € TTC le m² (8 € HT), dégressif selon la surface, avec un minimum de 360 € TTC déplacement compris. Si votre logement a droit à la TVA à 10 %, comptez 8,80 € le m² et 330 € minimum";

const PRO_M2 = "de 7 à 3 € HT le m² selon la surface";

const SOLAR_PRIVATE =
  "de 360 à 600 € TTC (300 à 500 € HT) selon la taille de l'installation, déplacement compris";

const SOLAR_PRO = "de 7 à 2 € HT le m² de panneaux selon la surface";

const NACELLE =
  "un nettoyage à la vapeur depuis une nacelle se facture en général 12 à 15 € HT le m²";

export const FAQ_PRICE_ROOF = `Pour un particulier, ${PRIVATE_M2}. Pour les professionnels, ${PRO_M2}. Le prix final dépend aussi de l'accès, de l'état de la toiture et de la formule, traitement seul ou avec hydrofuge : nous chiffrons chaque toiture sur photos, avec un prix ferme dans le devis.`;

export const FAQ_PRICE_FACADE = `Pour un particulier, ${PRIVATE_M2}. Pour les professionnels, ${PRO_M2}. À titre de comparaison, ${NACELLE}. Le prix final dépend de l'accès et de l'état de la façade : nous chiffrons sur photos, avec un prix ferme dans le devis.`;

export const FAQ_PRICE_SOLAR = `Pour une maison, ${SOLAR_PRIVATE}. Pour les professionnels, ${SOLAR_PRO}. Nous chiffrons sur photos, avec un prix ferme dans le devis.`;

export const FAQ_PRICE_SOLAR_PRO = `Le nettoyage coûte ${SOLAR_PRO}, avec un prix ferme dans le devis. La thermographie est chiffrée sur devis, selon la puissance et le type d'installation.`;

export const FAQ_PRICE_CLEANING = `Toitures et façades : pour un particulier, ${PRIVATE_M2}. Panneaux solaires d'une maison : ${SOLAR_PRIVATE}. Pour les professionnels : ${PRO_M2}, jusqu'à 2 € HT pour le solaire. À titre de comparaison, ${NACELLE}.`;
