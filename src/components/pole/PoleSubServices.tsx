import { Link } from "react-router-dom";
import {
  ArrowRight,
  Satellite,
  Droplets,
  Sprout,
  Shield,
  Sun,
  Package,
  HardHat,
  Target,
  Mountain,
  MoveVertical,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { Pole } from "@/lib/poles";

interface Props {
  pole: Pole;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Satellite,
  Droplets,
  Sprout,
  Shield,
  Sun,
  Package,
  HardHat,
  Target,
  Mountain,
  MoveVertical,
};

const PoleSubServices = ({ pole }: Props) => {
  const services = pole.subServices;
  const total = services.length;
  const isDevMode =
    pole.isInDevelopment === true ||
    services.some((s) => Boolean(s.description && s.category));

  if (isDevMode) {
    return (
      <section
        id="sous-services"
        role="region"
        aria-labelledby="pole-subservices-title"
        className="relative bg-surface-bg py-24 lg:py-32 scroll-mt-24"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
          <FadeInWhenVisible>
            <div className="text-center mb-12 lg:mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-card border border-border-subtle text-[11px] font-mono font-bold tracking-[0.18em] uppercase text-text-primary mb-6">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--pole-color)" }}
                  aria-hidden="true"
                />
                Bientôt disponible
              </span>
              <h2
                id="pole-subservices-title"
                className="font-display font-bold text-text-primary text-[32px] lg:text-[44px] leading-[1.1] tracking-[-0.03em] max-w-[640px] mx-auto"
              >
                Nos prestations {pole.label.toLowerCase()}
              </h2>
              <p className="text-text-secondary text-[15px] lg:text-[16px] leading-relaxed max-w-[560px] mx-auto mt-5">
                Voici un aperçu des prestations que nous proposerons. Soyez
                prévenu du lancement pour être parmi les premiers à en
                bénéficier.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {services.map((s) => {
              const Icon = (s.iconName && ICON_MAP[s.iconName]) || Sparkles;
              return (
                <FadeInWhenVisible key={s.slug || s.name}>
                  <div className="group relative p-7 lg:p-8 h-full bg-surface-card rounded-2xl border border-border-subtle transition-all duration-300 hover:border-border-strong hover:-translate-y-0.5 hover:shadow-soft-lg motion-reduce:hover:transform-none">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                      style={{
                        background:
                          "rgba(var(--pole-color-rgb), 0.10)",
                        color: "var(--pole-color)",
                      }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <h3 className="font-display font-bold text-text-primary text-[18px] lg:text-[20px] tracking-[-0.02em] mb-1.5">
                      {s.name}
                    </h3>
                    {s.category && (
                      <p className="font-mono text-[10px] font-bold tracking-[0.16em] uppercase text-text-muted mb-4">
                        {s.category}
                      </p>
                    )}
                    {s.description && (
                      <p className="text-text-secondary text-[14px] leading-relaxed">
                        {s.description}
                      </p>
                    )}
                  </div>
                </FadeInWhenVisible>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

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
              <article className="hover-border-card group relative h-full rounded-3xl p-8 bg-surface-card border border-border-subtle shadow-soft-md hover:shadow-soft-lg hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:hover:transform-none" style={{ ["--accent-color" as never]: "var(--pole-color)" }}>
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
