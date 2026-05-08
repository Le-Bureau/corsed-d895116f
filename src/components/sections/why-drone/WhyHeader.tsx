import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

const WhyHeader = () => {
  return (
    <FadeInWhenVisible>
      <div className="max-w-[880px]">
        <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-logo-base shadow-[0_0_12px_rgba(168,192,212,0.5)]" />
          Pourquoi le drone
        </span>
        <h2
          id="why-section-title"
          className="font-display font-semibold text-text-primary text-[clamp(40px,5.2vw,68px)] leading-[1.05] tracking-[-0.035em] mb-6"
        >
          Moins de matériel,{" "}
          <span className="italic text-logo-base-deep">plus de résultat.</span>
        </h2>
        <p className="text-lg leading-relaxed text-text-muted max-w-[620px]">
          Trois raisons concrètes pour lesquelles le drone professionnel
          transforme l'approche des chantiers, des inspections et de
          l'agriculture en Corse.
        </p>
      </div>
    </FadeInWhenVisible>
  );
};

export default WhyHeader;
