import HeroCarousel from "@/components/sections/HeroCarousel";
import PolesShowcase from "@/components/sections/PolesShowcase";
import WhyDroneSection from "@/components/sections/WhyDroneSection";

const Index = () => {
  return (
    <>
      <section data-header-bg="dark">
        <HeroCarousel />
      </section>
      <PolesShowcase />
      <WhyDroneSection />
    </>
  );
};

export default Index;
