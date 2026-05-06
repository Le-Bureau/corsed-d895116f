import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { Pole } from "@/lib/poles";

interface Props {
  pole: Pole;
}

const cardStyle: React.CSSProperties = {
  background: "rgba(10,14,26,0.4)",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
};

const PoleSubServices = ({ pole }: Props) => {
  const services = pole.subServices;
  const total = services.length;
  const gridCols = total >= 3 ? "lg:grid-cols-3" : total === 2 ? "lg:grid-cols-2" : "lg:grid-cols-1";

  return (
    <section
      data-header-bg="dark"
      id="sous-services"
      role="region"
      aria-labelledby="pole-subservices-title"
      className="relative bg-surface-darker text-text-on-dark py-16 lg:py-28 scroll-mt-24"
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
                Nos sous-services
              </span>
            </div>
            <h2
              id="pole-subservices-title"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.05] mb-5"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Trois expertises{" "}
              <span style={{ color: "var(--pole-color)" }}>complémentaires.</span>
            </h2>
          </div>
        </FadeInWhenVisible>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridCols} gap-6`}>
          {services.map((s, i) => {
            const num = String(i + 1).padStart(2, "0");
            const totalStr = String(total).padStart(2, "0");
            const href = s.slug ? `/pole/${pole.key}/${s.slug}` : undefined;

            const inner = (
              <article
                className="group relative h-full overflow-hidden rounded-3xl p-8 border border-white/10 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 motion-reduce:transform-none motion-reduce:hover:transform-none"
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(var(--pole-color-rgb), 0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(var(--pole-color-rgb),0.25) 0%, transparent 70%)",
                  }}
                />
                <div
                  className="font-mono text-[11px] tracking-[0.18em] uppercase mb-6 text-text-on-dark-muted"
                >
                  <span style={{ color: "var(--pole-color)" }}>{num}</span> / {totalStr}
                </div>
                <h3 className="relative font-display text-[22px] lg:text-[26px] font-semibold tracking-[-0.01em] mb-3">
                  {s.name}
                </h3>
                {s.description && (
                  <p className="relative text-[15px] leading-relaxed text-text-on-dark-muted mb-6">
                    {s.description}
                  </p>
                )}
                {href && (
                  <span
                    className="relative inline-flex items-center gap-1.5 font-medium text-[14px]"
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
