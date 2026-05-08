import { WHY_REASONS } from "@/lib/whyReasons";
import WhyHeader from "./why-drone/WhyHeader";
import WhyCard from "./why-drone/WhyCard";

const WhyDroneSection = () => {
  return (
    <section
      role="region"
      aria-labelledby="why-section-title"
      className="relative bg-surface-elevated overflow-hidden isolate py-24 lg:py-32"
    >
      <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10">
        <WhyHeader />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 lg:mt-20">
          {WHY_REASONS.map((reason, i) => (
            <WhyCard key={reason.key} reason={reason} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyDroneSection;
