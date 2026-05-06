import PartenairesHero from "@/components/partenaires/PartenairesHero";
import WhyJoinSection from "@/components/partenaires/WhyJoinSection";
import HowItWorksSection from "@/components/partenaires/HowItWorksSection";
import TargetProfilesSection from "@/components/partenaires/TargetProfilesSection";
import PartenairesFAQ from "@/components/partenaires/PartenairesFAQ";
import PartenairesFormPlaceholder from "@/components/partenaires/PartenairesFormPlaceholder";

const Partenaires = () => {
  return (
    <div data-header-bg="dark" className="bg-surface-darker text-text-on-dark">
      <PartenairesHero />
      <WhyJoinSection />
      <HowItWorksSection />
      <TargetProfilesSection />
      <PartenairesFAQ />
      <PartenairesFormPlaceholder />
    </div>
  );
};

export default Partenaires;
