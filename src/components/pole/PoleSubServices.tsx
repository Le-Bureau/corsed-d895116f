import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { Pole } from "@/lib/poles";

interface Props {
  pole: Pole;
}

const PoleSubServices = ({ pole }: Props) => {
  const services = pole.subServices;
  const total = services.length;
  const gridCols =
    total >= 3 ? "lg:grid-cols-3" : total === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";

  return (
    <section
      id="sous-services"
      role="region"
      aria-labelledby="pole-subservices-title"
      className="relative bg-surface-bg py-24 lg:py-32 scroll-mt-24"
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
              Nos sous-services
            </span>
            <h2
              id="pole-subservices-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Découvrez nos{" "}
              <span style={{ color: "var(--pole-color)" }}>prestations détaillées.</span>
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-6`}>
          {services.map((s, i) => {
            const num = String(i + 1).padStart(2, "0");
            const totalStr = String(total).padStart(2, "0");
            const href = s.slug ? `/pole/${pole.key}/${s.slug}` : undefined;

            const inner = (
              <article className="group relative h-full rounded-3xl p-8 bg-surface-card border border-border-subtle shadow-soft-md hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:hover:transform-none">
                <div className="font-mono text-[11px] tracking-[0.18em] uppercase mb-6 text-text-muted">
                  <span style={{ color: "var(--pole-color)" }}>{num}</span> / {totalStr}
                </div>
                <h3 className="font-display text-[22px] lg:text-[26px] font-semibold tracking-[-0.01em] mb-3 text-text-primary">
                  {s.name}
                </h3>
                {s.description && (
                  <p className="text-[15px] leading-relaxed text-text-secondary mb-6">
                    {s.description}
                  </p>
                )}
                {href && (
                  <span
                    className="inline-flex items-center gap-1.5 font-medium text-[14px] mt-2"
                    style={{ color: "var(--pole-color)" }}
                  >
                    Découvrir
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                )}
              </article>
            );

            return (
              <FadeInWhenVisible key={s.name}>
                {href ? (
                  <Link to={href} className="block h-full">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </FadeInWhenVisible>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PoleSubServices;
