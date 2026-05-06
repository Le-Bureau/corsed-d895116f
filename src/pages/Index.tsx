import HeroCarousel from "@/components/sections/HeroCarousel";
import PolesAlternated from "@/components/sections/PolesAlternated";
import WhyDroneSection from "@/components/sections/WhyDroneSection";
import OtherExpertisesSection from "@/components/sections/OtherExpertisesSection";
import PartnersSection from "@/components/sections/PartnersSection";

const Index = () => {
  return (
    <div>
      <section data-header-bg="dark">
        <HeroCarousel />
      </section>
      <PolesAlternated />
      <WhyDroneSection />
      <OtherExpertisesSection />
      <PartnersSection />
    </div>
  );
};

export default Index;
