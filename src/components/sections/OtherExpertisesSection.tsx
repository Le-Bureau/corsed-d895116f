import ExpertisesHeader from "./other-expertises/ExpertisesHeader";
import ExpertisesList from "./other-expertises/ExpertisesList";
import ExpertisesFooterCard from "./other-expertises/ExpertisesFooterCard";

const OtherExpertisesSection = () => {
  return (
    <section
      role="region"
      aria-labelledby="other-expertises-title"
      className="relative bg-surface-bg overflow-hidden isolate py-24 lg:py-32"
    >
      <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10">
        <ExpertisesHeader />
        <ExpertisesList />
        <ExpertisesFooterCard />
      </div>
    </section>
  );
};

export default OtherExpertisesSection;
