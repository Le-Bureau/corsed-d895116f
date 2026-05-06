import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { SubPoleCompareCol } from "@/lib/sub-poles";

interface Props {
  title: string;
  subtitle?: string;
  cols: SubPoleCompareCol[];
  disclaimer?: string;
}

const SubPoleCompare = ({ title, subtitle, cols, disclaimer }: Props) => {
  return (
    <section
      role="region"
      aria-labelledby="sub-pole-compare-title"
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
              L'argument qui change tout
            </span>
            <h2
              id="sub-pole-compare-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary mb-5"
              style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
            >
              {title}
            </h2>
            {subtitle && (
              <p className="text-text-muted text-[15px] leading-relaxed">{subtitle}</p>
            )}
          </div>
        </FadeInWhenVisible>

        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start"
          role="table"
          aria-label="Comparatif des méthodes"
        >
          {cols.map((col) => (
            <FadeInWhenVisible key={col.title}>
              <div
                className={`rounded-2xl p-7 h-full transition-all duration-300 ${
                  col.isOurs ? "shadow-soft-lg lg:scale-[1.02]" : "bg-surface-card shadow-soft-md border border-border-subtle"
                }`}
                style={
                  col.isOurs
                    ? {
                        background: "rgba(var(--pole-color-rgb), 0.05)",
                        border: "2px solid rgba(var(--pole-color-rgb), 0.4)",
                      }
                    : undefined
                }
                role="row"
              >
                {col.badge && (
                  <div className="font-mono text-xs uppercase tracking-wide text-text-muted mb-2">
                    {col.badge}
                  </div>
                )}
                <h3 className="font-display font-bold text-xl text-text-primary mb-3">
                  {col.title}
                </h3>
                <div
                  className="font-display text-2xl font-bold mb-5"
                  style={col.isOurs ? { color: "var(--pole-color)" } : undefined}
                >
                  {col.price}
                </div>
                <ul className="list-none p-0 m-0">
                  {col.rows.map((row, i) => (
                    <li
                      key={i}
                      className="flex justify-between gap-4 py-2 border-b border-border-subtle last:border-b-0"
                    >
                      <span className="text-text-secondary text-sm">{row.label}</span>
                      <span className="text-text-primary text-sm font-medium text-right">
                        {row.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>

        {disclaimer && (
          <p className="text-xs text-text-muted italic mt-8 text-center max-w-[800px] mx-auto">
            {disclaimer}
          </p>
        )}
      </div>
    </section>
  );
};

export default SubPoleCompare;
