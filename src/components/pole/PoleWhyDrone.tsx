import * as LucideIcons from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { WhyDroneItem } from "@/lib/poles";

function getIcon(name: string): LucideIcons.LucideIcon {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name];
  return Icon || LucideIcons.Circle;
}

interface Props {
  items: WhyDroneItem[];
}

const PoleWhyDrone = ({ items }: Props) => {
  return (
    <section
      role="region"
      aria-labelledby="pole-why-title"
      className="relative bg-surface-elevated py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              Pourquoi le drone
            </span>
            <h2
              id="pole-why-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Une approche{" "}
              <span style={{ color: "var(--pole-color)" }}>plus efficace.</span>
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => {
            const Icon = getIcon(item.iconName);
            return (
              <FadeInWhenVisible key={item.title}>
                <article className="hover-border-card group relative h-full rounded-3xl p-8 bg-surface-card border border-border-subtle shadow-soft-md hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:hover:transform-none" style={{ ["--accent-color" as never]: "var(--pole-color)" }}>
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6"
                    style={{
                      background: "rgba(var(--pole-color-rgb), 0.10)",
                      border: "1px solid rgba(var(--pole-color-rgb), 0.30)",
                      color: "var(--pole-color)",
                    }}
                  >
                    <Icon className="w-[22px] h-[22px]" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl lg:text-[22px] font-semibold tracking-[-0.01em] mb-3 text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </article>
              </FadeInWhenVisible>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PoleWhyDrone;
