import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import PartnersVisual from "./partners/PartnersVisual";
import PartnersContent from "./partners/PartnersContent";

const PartnersSection = () => {
  return (
    <section
      data-header-bg="dark"
      role="region"
      aria-labelledby="partners-section-title"
      className="relative bg-surface-darker text-text-on-dark overflow-hidden isolate py-[120px] lg:py-32"
    >
      <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="rounded-3xl glass-light-strong p-6 lg:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-stretch">
            <PartnersVisual />
            <PartnersContent />
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default PartnersSection;
