// Prices shown on the site, set by Corse Drone (October 2026). Private clients
// see prices with VAT (TTC), as French law requires; professionals see them
// without VAT (HT). Roofs and façades can be invoiced at 10 % VAT when the home
// qualifies, otherwise 20 %; solar cleaning is always 20 %.
// Change a price here only: every FAQ that quotes it reads from this file.

/** Haute-Corse (2B) or Corse-du-Sud (2A). */
export type PriceArea = "2B" | "2A";

const PRIVATE_M2_HT = 8; // roofs and façades, degressive by surface
const MIN_HT: Record<PriceArea, number> = { "2B": 300, "2A": 400 }; // per job, travel included
const SOLAR_HOUSE_MAX_HT = 500;

const PRO_M2 = "de 7 à 3 € HT le m² selon la surface";
const SOLAR_PRO = "de 7 à 2 € HT le m² de panneaux selon la surface";
const NACELLE =
  "un nettoyage à la vapeur depuis une nacelle se facture en général 12 à 15 € HT le m²";
const QUOTE = "nous chiffrons sur photos, avec un prix ferme dans le devis";

const ttc = (ht: number, vat: number) => Math.round(ht * (1 + vat) * 100) / 100;
const eur = (n: number) =>
  Number.isInteger(n) ? String(n) : n.toFixed(2).replace(".", ",");

const privateM2 = (area?: PriceArea) => {
  const m2 = `${eur(ttc(PRIVATE_M2_HT, 0.2))} € TTC le m² (${PRIVATE_M2_HT} € HT), dégressif selon la surface`;
  const m2Reduced = `${eur(ttc(PRIVATE_M2_HT, 0.1))} € le m²`;
  if (area) {
    return `${m2}, avec un minimum de ${eur(ttc(MIN_HT[area], 0.2))} € TTC déplacement compris. Si votre logement a droit à la TVA à 10 %, comptez ${m2Reduced} et ${eur(ttc(MIN_HT[area], 0.1))} € minimum`;
  }
  return `${m2}, avec un minimum déplacement compris de ${eur(ttc(MIN_HT["2B"], 0.2))} € TTC en Haute-Corse et ${eur(ttc(MIN_HT["2A"], 0.2))} € TTC en Corse-du-Sud. Si votre logement a droit à la TVA à 10 %, comptez ${m2Reduced} et un minimum de ${eur(ttc(MIN_HT["2B"], 0.1))} € (Haute-Corse) ou ${eur(ttc(MIN_HT["2A"], 0.1))} € (Corse-du-Sud)`;
};

const solarHouse = (area?: PriceArea) => {
  const range = (a: PriceArea) =>
    `de ${eur(ttc(MIN_HT[a], 0.2))} à ${eur(ttc(SOLAR_HOUSE_MAX_HT, 0.2))} € TTC (${MIN_HT[a]} à ${SOLAR_HOUSE_MAX_HT} € HT)`;
  if (area) return `${range(area)} selon la taille de l'installation, déplacement compris`;
  return `${range("2B")} selon la taille de l'installation, déplacement compris, et à partir de ${eur(ttc(MIN_HT["2A"], 0.2))} € TTC en Corse-du-Sud`;
};

export const faqPriceRoof = (area?: PriceArea) =>
  `Pour un particulier, ${privateM2(area)}. Pour les professionnels, ${PRO_M2}. Le prix final dépend aussi de l'accès, de l'état de la toiture et de la formule, traitement seul ou avec hydrofuge : ${QUOTE}.`;

export const faqPriceSolar = (area?: PriceArea) =>
  `Pour une maison, ${solarHouse(area)}. Pour les professionnels, ${SOLAR_PRO}. ${QUOTE.charAt(0).toUpperCase()}${QUOTE.slice(1)}.`;

export const FAQ_PRICE_ROOF = faqPriceRoof();
export const FAQ_PRICE_SOLAR = faqPriceSolar();

export const FAQ_PRICE_FACADE = `Pour un particulier, ${privateM2()}. Pour les professionnels, ${PRO_M2}. À titre de comparaison, ${NACELLE}. Le prix final dépend de l'accès et de l'état de la façade : ${QUOTE}.`;

export const FAQ_PRICE_SOLAR_PRO = `Le nettoyage coûte ${SOLAR_PRO}, avec un prix ferme dans le devis. La thermographie est chiffrée sur devis, selon la puissance et le type d'installation.`;

export const FAQ_PRICE_CLEANING = `Toitures et façades : pour un particulier, ${privateM2()}. Panneaux solaires d'une maison : ${solarHouse()}. Pour les professionnels : ${PRO_M2}, jusqu'à 2 € HT pour le solaire. À titre de comparaison, ${NACELLE}.`;
