import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

const WhyHeader = () => {
  return (
    <FadeInWhenVisible>
      <div className="max-w-[880px]">
        <div className="glass-light-strong inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6">
          <span
            className="block h-1.5 w-1.5 rounded-full bg-logo-base"
            style={{ boxShadow: "0 0 8px rgba(168,192,212,0.8)" }}
          />
          <span className="text-xs uppercase tracking-[0.18em] text-text-on-dark-muted">
            Pourquoi le drone
          </span>
        </div>
        <h2
          id="why-section-title"
          className="font-display font-semibold text-text-on-dark text-[clamp(40px,5.2vw,68px)] leading-[1.05] tracking-[-0.035em] mb-6"
        >
          L'aérien, pour faire mieux que le sol.
        </h2>
        <p className="text-lg leading-relaxed text-text-on-dark-muted max-w-[620px]">
          Quatre raisons concrètes pour lesquelles le drone professionnel
          transforme l'approche des chantiers, des inspections et de
          l'agriculture en Corse.
        </p>
      </div>
    </FadeInWhenVisible>
  );
};

export default WhyHeader;
