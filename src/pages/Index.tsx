import HeroCarousel from "@/components/sections/HeroCarousel";
import PolesAlternated from "@/components/sections/PolesAlternated";
import WhyDroneSection from "@/components/sections/WhyDroneSection";
import OtherExpertisesSection from "@/components/sections/OtherExpertisesSection";
import PartnersSection from "@/components/sections/PartnersSection";
import CTAFinalSection from "@/components/sections/CTAFinalSection";
import { SEO } from "@/components/seo/SEO";

const Index = () => {
  return (
    <div>
      <SEO
        title="Corse Drone — Drone professionnel en Corse"
        description="Nettoyage, diagnostic, agriculture, transport : 4 expertises drone pour les professionnels en Corse. Sans nacelle, sans échafaudage, sans immobilisation de site."
        canonicalPath="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Corse Drone",
          image: "https://corse-drone.com/og-default.jpg",
          "@id": "https://corse-drone.com",
          url: "https://corse-drone.com",
          telephone: "+33 7 69 97 77 00",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Marine d'Albo, 44 Strada di a Torra",
            addressLocality: "Ogliastro",
            postalCode: "20217",
            addressRegion: "Corse",
            addressCountry: "FR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 42.7,
            longitude: 9.35,
          },
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Corse",
          },
          priceRange: "€€",
          sameAs: [],
        }}
      />
      <section data-header-bg="dark">
        <HeroCarousel />
      </section>
      <PolesAlternated />
      <WhyDroneSection />
      <OtherExpertisesSection />
      <PartnersSection />
      <CTAFinalSection />
    </div>
  );
};

export default Index;
