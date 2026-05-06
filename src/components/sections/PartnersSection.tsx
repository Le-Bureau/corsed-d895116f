import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import PartnersContent from "./partners/PartnersContent";

const PartnersSection = () => {
  return (
    <section
      data-header-bg="dark"
      role="region"
      aria-labelledby="partners-section-title"
      className="relative bg-surface-darker text-text-on-dark overflow-hidden isolate py-24 lg:py-36"
    >
      {/* Ambient mesh */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(168,192,212,0.18) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 70% 50%, rgba(80,130,172,0.15) 0%, transparent 55%)",
          opacity: 0.5,
        }}
      />
      {/* Noise overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none mix-blend-overlay opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, white 0 1px, transparent 1px 3px)," +
            "repeating-linear-gradient(90deg, white 0 1px, transparent 1px 3px)",
        }}
      />

      <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="rounded-3xl glass-light-strong p-8 lg:p-14">
            <PartnersContent />
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default PartnersSection;
