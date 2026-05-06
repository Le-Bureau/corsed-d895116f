import ExpertisesHeader from "./other-expertises/ExpertisesHeader";
import ExpertisesList from "./other-expertises/ExpertisesList";
import ExpertisesFooterCard from "./other-expertises/ExpertisesFooterCard";

const OtherExpertisesSection = () => {
  return (
    <section
      data-header-bg="dark"
      role="region"
      aria-labelledby="other-expertises-title"
      className="relative bg-surface-darker text-text-on-dark overflow-hidden isolate py-[120px] lg:py-32"
    >
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.025] z-[1]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, white 0, white 1px, transparent 1px, transparent 3px),
            repeating-linear-gradient(90deg, white 0, white 1px, transparent 1px, transparent 3px)
          `,
        }}
        aria-hidden="true"
      />

      <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10">
        <ExpertisesHeader />
        <ExpertisesList />
        <ExpertisesFooterCard />
      </div>
    </section>
  );
};

export default OtherExpertisesSection;
