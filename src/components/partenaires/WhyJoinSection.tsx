import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { PARTNER_BENEFITS } from "@/lib/partners/benefits";

const cardClass =
  "group relative overflow-hidden rounded-3xl p-8 border border-white/10 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[rgba(168,192,212,0.35)] motion-reduce:transform-none motion-reduce:hover:transform-none";

const cardStyle: React.CSSProperties = {
  background: "rgba(10,14,26,0.4)",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
};

const WhyJoinSection = () => {
  return (
    <section
      role="region"
      aria-labelledby="why-join-title"
      className="relative bg-surface-dark text-text-on-dark py-16 lg:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-logo-base" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-on-dark-muted">
                Pourquoi nous rejoindre
              </span>
            </div>
            <h2
              id="why-join-title"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.05] mb-5"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Un partenariat qui vous <span className="text-logo-base">ressemble.</span>
            </h2>
            <p className="text-text-on-dark-muted text-[16px] lg:text-[17px] leading-relaxed">
              Le réseau apporteurs Corse Drone est conçu pour s'intégrer naturellement à votre
              activité, sans contraintes administratives ni engagements rigides.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTNER_BENEFITS.map(({ icon: Icon, title, description }) => (
            <FadeInWhenVisible key={title}>
              <article className={cardClass} style={cardStyle}>
                {/* Hover accent gradient */}
                <div
                  aria-hidden="true"
                  className="absolute -top-20 -right-20 w-60 h-60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(168,192,212,0.25) 0%, transparent 70%)",
                  }}
                />
                {/* Icon */}
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 bg-logo-base/[0.12] border border-logo-base/25 text-logo-base">
                  <Icon className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="relative font-display text-[22px] lg:text-[24px] font-semibold tracking-[-0.01em] mb-3">
                  {title}
                </h3>
                <p className="relative text-[15px] leading-relaxed text-text-on-dark-muted">
                  {description}
                </p>
              </article>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyJoinSection;
