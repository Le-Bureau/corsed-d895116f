import * as LucideIcons from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { WhyDroneItem } from "@/lib/poles";

function getIcon(name: string): LucideIcons.LucideIcon {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name];
  return Icon || LucideIcons.Circle;
}

const cardClass =
  "group relative overflow-hidden rounded-3xl p-8 border border-white/10 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 motion-reduce:transform-none motion-reduce:hover:transform-none";

const cardStyle: React.CSSProperties = {
  background: "rgba(10,14,26,0.4)",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
};

interface Props {
  items: WhyDroneItem[];
}

const PoleWhyDrone = ({ items }: Props) => {
  return (
    <section
      data-header-bg="dark"
      role="region"
      aria-labelledby="pole-why-title"
      className="relative bg-surface-dark text-text-on-dark py-16 lg:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <div className="inline-flex items-center gap-2 mb-5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-on-dark-muted">
                Pourquoi le drone
              </span>
            </div>
            <h2
              id="pole-why-title"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.05] mb-5"
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
                <article
                  className={cardClass}
                  style={{
                    ...cardStyle,
                    ["--hover-border" as string]: "rgba(var(--pole-color-rgb), 0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--pole-color-rgb), 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(var(--pole-color-rgb),0.25) 0%, transparent 70%)",
                    }}
                  />
                  <div
                    className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
                    style={{
                      background: "rgba(var(--pole-color-rgb), 0.12)",
                      border: "1px solid rgba(var(--pole-color-rgb), 0.25)",
                      color: "var(--pole-color)",
                    }}
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="relative font-display text-[22px] lg:text-[24px] font-semibold tracking-[-0.01em] mb-3">
                    {item.title}
                  </h3>
                  <p className="relative text-[15px] leading-relaxed text-text-on-dark-muted">
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
