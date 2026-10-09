import HeroCarousel from "@/components/sections/HeroCarousel";
import PolesAlternated from "@/components/sections/PolesAlternated";
import WhyDroneSection from "@/components/sections/WhyDroneSection";
import OtherExpertisesSection from "@/components/sections/OtherExpertisesSection";
import PartnersSection from "@/components/sections/PartnersSection";
import CTAFinalSection from "@/components/sections/CTAFinalSection";
import LatestArticlesSection from "@/components/sections/LatestArticlesSection";
import { SEO } from "@/components/seo/SEO";
import { LOCAL_BUSINESS_ID } from "@/lib/poleMeta";
import { CONTACT } from "@/lib/contact";

const Index = () => {
  return (
    <main>
      <SEO
        title="Corse Drone | Drone professionnel en Corse"
        description="Nettoyage, diagnostic, agriculture, transport : 4 expertises drone pour les professionnels en Corse. Sans nacelle, sans échafaudage, sans immobilisation de site."
        canonicalPath="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": LOCAL_BUSINESS_ID,
          name: CONTACT.name,
          image: "https://corse-drone.com/og-default.jpg",
          url: "https://corse-drone.com",
          telephone: CONTACT.phoneLink.replace("tel:", ""),
          address: {
            "@type": "PostalAddress",
            streetAddress: CONTACT.streetAddress,
            addressLocality: CONTACT.city,
            postalCode: CONTACT.postalCode,
            addressRegion: "Corse",
            addressCountry: "FR",
          },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Corse",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
              ],
              opens: CONTACT.opens,
              closes: CONTACT.closes,
            },
          ],
          priceRange: "€€",
          sameAs: ["https://www.instagram.com/corsedrone/"],
        }}
      />
      <h1 className="sr-only">
        Corse Drone, services drones professionnels en Corse
      </h1>
      <section data-header-bg="dark">
        <HeroCarousel />
      </section>
      <WhyDroneSection />
      <PolesAlternated />
      <OtherExpertisesSection />
      <LatestArticlesSection />
      <PartnersSection />
      <CTAFinalSection />
    </main>
  );
};

export default Index;

