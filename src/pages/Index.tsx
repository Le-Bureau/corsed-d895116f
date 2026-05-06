import HeroCarousel from "@/components/sections/HeroCarousel";
import PolesAlternated from "@/components/sections/PolesAlternated";
import WhyDroneSection from "@/components/sections/WhyDroneSection";
import OtherExpertisesSection from "@/components/sections/OtherExpertisesSection";
import PartnersSection from "@/components/sections/PartnersSection";
import CTAFinalSection from "@/components/sections/CTAFinalSection";

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
      <CTAFinalSection />
    </div>
  );
};

export default Index;
