import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import AnimatedStatValue from "@/components/animations/AnimatedStatValue";
import type { SubPoleStat } from "@/lib/sub-poles";

interface Props {
  stats: SubPoleStat[];
}

const SubPoleStats = ({ stats }: Props) => {
  return (
    <section
      role="region"
      aria-label="Chiffres clés"
      className="relative bg-surface-bg py-12 lg:py-16"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <FadeInWhenVisible key={i}>
              <div className="rounded-2xl bg-surface-card border border-border-subtle shadow-soft-sm hover:shadow-soft-md transition-all duration-300 p-8 text-center h-full">
                {stat.prefix && (
                  <div className="font-mono text-[11px] tracking-[0.18em] uppercase font-semibold text-text-muted mb-1">
                    {stat.prefix}
                  </div>
                )}
                <div
                  className="font-display font-semibold tracking-[-0.03em] leading-none mb-3"
                  style={{ color: "var(--pole-color)", fontSize: "clamp(40px, 5vw, 64px)" }}
                >
                  <AnimatedStatValue value={stat.value} />
                  {stat.unit && (
                    <span
                      className="font-display ml-1"
                      style={{ fontSize: "clamp(18px, 2vw, 26px)" }}
                    >
                      {stat.unit}
                    </span>
                  )}
                </div>
                <div className="font-display font-semibold text-text-primary text-[15px] mb-1">
                  {stat.labelStrong}
                </div>
                <div className="text-text-muted text-sm leading-relaxed">
                  {stat.labelMuted}
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubPoleStats;
