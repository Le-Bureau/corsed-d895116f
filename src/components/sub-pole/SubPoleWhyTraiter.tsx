import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { SubPoleContent } from "@/lib/sub-poles";

interface Props {
  content: SubPoleContent;
}

const SubPoleWhyTraiter = ({ content }: Props) => {
  return (
    <section
      role="region"
      aria-labelledby="sub-pole-why-title"
      className="relative bg-surface-elevated py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[800px] mx-auto text-center mb-14">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              {content.whyEyebrow}
            </span>
            <h2
              id="sub-pole-why-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary mb-6"
              style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
            >
              {content.whyTitle}
            </h2>
            <p className="text-text-secondary leading-relaxed text-[16px]">
              {content.whyIntro}
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[960px] mx-auto">
          {content.whyItems.map((item) => (
            <FadeInWhenVisible key={item.title}>
              <div className="rounded-2xl bg-surface-card border border-border-subtle shadow-soft-md hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 p-7 h-full">
                <h3 className="font-display text-lg font-semibold text-text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px]">
                  {item.description}
                </p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubPoleWhyTraiter;
