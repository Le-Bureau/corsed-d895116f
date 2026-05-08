import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import PartnersContent from "./partners/PartnersContent";

const PartnersSection = () => {
  return (
    <section
      role="region"
      aria-labelledby="partners-section-title"
      className="relative bg-surface-bg overflow-hidden isolate py-24 lg:py-32"
    >
      {/* Subtle ambient mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(168,192,212,0.18) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 70% 50%, rgba(80,130,172,0.10) 0%, transparent 55%)",
          opacity: 0.7,
        }}
      />

      <div className="relative z-[5] max-w-[1080px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="rounded-3xl bg-surface-card border border-border-subtle shadow-soft-lg p-8 lg:p-14">
            <PartnersContent />
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default PartnersSection;
