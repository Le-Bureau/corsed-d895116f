import HeroCarousel from "@/components/sections/HeroCarousel";
import PolesShowcase from "@/components/sections/PolesShowcase";
import WhyDroneSection from "@/components/sections/WhyDroneSection";
import OtherExpertisesSection from "@/components/sections/OtherExpertisesSection";
import PartnersSection from "@/components/sections/PartnersSection";

const Index = () => {
  return (
    <>
      <section data-header-bg="dark">
        <HeroCarousel />
      </section>
      <PolesShowcase />
      <WhyDroneSection />
      <OtherExpertisesSection />
      <PartnersSection />
    </>
  );
};

export default Index;
