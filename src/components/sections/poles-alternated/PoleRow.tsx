import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Pole } from "@/lib/poles";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

interface Props {
  pole: Pole;
  index: number;
  isReversed: boolean;
}

const PoleRow = ({ pole, index, isReversed }: Props) => {
  const color = pole.baseColorOnLight;
  const titleId = `pole-${pole.key}-title`;
  const hasLinkedSubServices = pole.subServices?.some((s) => s.slug);

  return (
    <FadeInWhenVisible>
      <section
        role="region"
        aria-labelledby={titleId}
        className="mb-25 lg:mb-32 last:mb-0"
      >
        <div className="container max-w-[1280px] mx-auto px-5 lg:px-10">
          <div
            className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
              isReversed ? "lg:[direction:rtl]" : ""
            }`}
          >
            {/* Image */}
            <div className="lg:[direction:ltr] relative">
              <div className="relative aspect-[4/3] lg:aspect-[4/5] rounded-3xl overflow-hidden bg-surface-elevated shadow-soft-lg group">
                <img
                  src={pole.showcaseImage}
                  alt={pole.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
                  style={
                    pole.mobileImagePosition
                      ? { objectPosition: pole.mobileImagePosition }
                      : undefined
                  }
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 100%)",
                  }}
                />
                <span
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-semibold tracking-[0.22em] uppercase whitespace-nowrap"
                  style={{
                    color,
                    border: `1px solid ${color}40`,
                  }}
                >
                  CORSE DRONE — {pole.label.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="lg:[direction:ltr] relative">
              <div
                className="pl-8 border-l-2"
                style={{ borderColor: color }}
              >
                {/* Eyebrow */}
                <div className="flex items-center gap-2.5 mb-6">
                  <span
                    className="block w-8 h-[1.5px]"
                    style={{
                      background: color,
                      boxShadow: `0 0 8px ${color}80`,
                    }}
                  />
                  <span
                    className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase"
                    style={{ color }}
                  >
                    EXPERTISE {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3
                  id={titleId}
                  className="font-display font-semibold text-[clamp(40px,5vw,64px)] leading-[1.0] tracking-[-0.04em] mb-7 text-text-primary"
                >
                  <span className="block">Corse</span>
                  <span className="block" style={{ color }}>
                    Drone
                  </span>
                  <span className="block">{pole.label}</span>
                </h3>

                {/* Pitch */}
                {pole.pitch && (
                  <p className="text-base leading-[1.6] text-text-secondary mb-7 max-w-[480px]">
                    {pole.pitch}
                  </p>
                )}

                <div className="h-px bg-border-subtle my-7" />

                {/* Stat */}
                {pole.stat && (
                  <div className="flex items-baseline gap-6 mb-7">
                    <div
                      className="font-display font-semibold leading-none tracking-[-0.04em] text-[clamp(48px,5vw,64px)] flex-shrink-0"
                      style={{ color }}
                    >
                      {pole.stat.value}
                      <span className="text-[0.5em] font-medium ml-0.5 opacity-85">
                        {pole.stat.unit}
                      </span>
                    </div>
                    <div className="text-[13px] leading-[1.5] text-text-secondary pt-1">
                      <strong className="text-text-primary font-medium block">
                        {pole.stat.labelStrong}
                      </strong>
                      {pole.stat.labelMuted}
                    </div>
                  </div>
                )}

                {/* Sub-services or Prochainement */}
                {hasLinkedSubServices ? (
                  <div className="flex flex-col">
                    {pole.subServices
                      .filter((s) => s.slug)
                      .map((sub) => (
                        <Link
                          key={sub.slug}
                          to={`/pole/${pole.key}/${sub.slug}`}
                          className="group flex items-center justify-between py-4 border-b border-border-subtle last:border-b-0 text-text-primary text-base font-medium tracking-[-0.015em] transition-all duration-250 ease-out-expo hover:pl-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm"
                          style={
                            {
                              ["--tw-ring-color" as string]: `${color}66`,
                            } as React.CSSProperties
                          }
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = color;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "";
                          }}
                        >
                          <span>{sub.name}</span>
                          <ArrowRight
                            className="w-5 h-5 opacity-70 transition-all duration-250 ease-out-expo group-hover:opacity-100 group-hover:translate-x-1"
                            style={{ color }}
                          />
                        </Link>
                      ))}
                  </div>
                ) : pole.isInDevelopment ? (
                  <div
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] font-mono font-semibold tracking-[0.18em] uppercase"
                    style={{
                      background: `${color}15`,
                      border: `1px solid ${color}40`,
                      color,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: color,
                        boxShadow: `0 0 8px ${color}`,
                      }}
                    />
                    Prochainement
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  );
};

export default PoleRow;
