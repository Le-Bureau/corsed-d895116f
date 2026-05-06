import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { SubPoleTechItem } from "@/lib/sub-poles";

interface Props {
  items: SubPoleTechItem[];
}

const SubPoleTechnologie = ({ items }: Props) => {
  return (
    <section
      role="region"
      aria-labelledby="sub-pole-tech-title"
      className="relative bg-surface-bg py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mx-auto text-center mb-14">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              Savoir-faire technique
            </span>
            <h2
              id="sub-pole-tech-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary"
              style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
            >
              Une technologie{" "}
              <span style={{ color: "var(--pole-color)" }}>maîtrisée.</span>
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <FadeInWhenVisible key={it.title}>
              <div className="rounded-2xl bg-surface-card border border-border-subtle shadow-soft-md hover:shadow-soft-lg transition-all duration-300 p-7 h-full flex flex-col">
                <h3 className="font-display text-lg font-semibold text-text-primary mb-3">
                  {it.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px] flex-1">
                  {it.description}
                </p>
                {it.spec && (
                  <div
                    className="pt-4 mt-4 border-t border-border-subtle font-mono text-xs uppercase tracking-wider font-semibold"
                    style={{ color: "var(--pole-color)" }}
                  >
                    {it.spec}
                  </div>
                )}
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubPoleTechnologie;
