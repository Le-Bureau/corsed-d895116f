import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { getIcon } from "./iconMap";
import type { SubPoleContent } from "@/lib/sub-poles";

interface Props {
  content: SubPoleContent;
}

const SubPoleDomaines = ({ content }: Props) => {
  return (
    <section
      id="domaines"
      role="region"
      aria-labelledby="sub-pole-domaines-title"
      className="relative bg-surface-elevated py-24 lg:py-32"
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
              {content.domainesEyebrow}
            </span>
            <h2
              id="sub-pole-domaines-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary"
              style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
            >
              {content.domainesTitle}
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.domaines.map((d) => {
            const Icon = getIcon(d.iconName);
            return (
              <FadeInWhenVisible key={d.title}>
                <div className="flex flex-col h-full rounded-2xl bg-surface-card border border-border-subtle shadow-soft-md hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 p-7">
                  <div
                    className="w-11 h-11 rounded-xl border flex items-center justify-center mb-5"
                    style={{
                      background: "rgba(var(--pole-color-rgb), 0.10)",
                      borderColor: "rgba(var(--pole-color-rgb), 0.30)",
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: "var(--pole-color)" }} aria-hidden="true" />
                  </div>
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-muted mb-2">
                    {d.category}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-text-primary mb-3">
                    {d.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                    {d.description}
                  </p>
                  <div className="pt-4 mt-auto border-t border-border-subtle">
                    <div className="font-display font-semibold text-text-primary text-sm">
                      {d.highlightLabel}
                    </div>
                    <div className="text-xs text-text-muted mt-0.5">
                      {d.highlightDescription}
                    </div>
                  </div>
                </div>
              </FadeInWhenVisible>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SubPoleDomaines;
