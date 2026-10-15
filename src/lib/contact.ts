export const CONTACT = {
  phone: "07 59 50 35 17",
  phoneLink: "tel:+33759503517",
  phoneHours: "Lun-Ven 9h-18h",
  email: "contact@corse-drone.com",
  emailLink: "mailto:contact@corse-drone.com",
  // Public identity: must match the Google Business Profile word for word.
  name: "Corse Drone",
  streetAddress: "Marine d'Albo, 44 Strada di a Torra",
  postalCode: "20217",
  city: "Ogliastro",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Marine+d%27Albo+44+Strada+di+a+Torra+20217+Ogliastro",
  opens: "09:00",
  closes: "18:00",
  // Hamlet of Albo (OpenStreetMap). Replace with the Google Business pin if it differs.
  geo: { latitude: 42.8097, longitude: 9.3364 },
  // Paste the Google Business Profile link here (Maps "Partager" link):
  // it is then added to the structured data of every page.
  googleBusinessUrl: "" as string,
} as const;
