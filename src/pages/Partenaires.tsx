import { SEO } from "@/components/seo/SEO";
import PartenairesHero from "@/components/partenaires/PartenairesHero";
import WhyJoinSection from "@/components/partenaires/WhyJoinSection";
import HowItWorksSection from "@/components/partenaires/HowItWorksSection";
import TargetProfilesSection from "@/components/partenaires/TargetProfilesSection";
import PartenairesFAQ from "@/components/partenaires/PartenairesFAQ";
import PartenairesForm from "@/components/partenaires/PartenairesForm";

const Partenaires = () => {
  return (
    <div className="pt-20 bg-surface-bg text-text-primary">
      <PartenairesHero />
      <WhyJoinSection />
      <HowItWorksSection />
      <TargetProfilesSection />
      <PartenairesFAQ />
      <PartenairesForm />
    </div>
  );
};

export default Partenaires;
