import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { PARTNER_BENEFITS } from "@/lib/partners/benefits";

const WhyJoinSection = () => {
  return (
    <section
      role="region"
      aria-labelledby="why-join-title"
      className="relative bg-surface-elevated py-20 lg:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-logo-base shadow-[0_0_12px_rgba(168,192,212,0.5)]" />
              Pourquoi nous rejoindre
            </span>
            <h2
              id="why-join-title"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.05] text-text-primary mb-5"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Un partenariat qui vous{" "}
              <span className="text-logo-base-deep">ressemble.</span>
            </h2>
            <p className="text-text-secondary text-[16px] lg:text-[17px] leading-relaxed">
              Le réseau apporteurs Corse Drone est conçu pour s'intégrer naturellement à votre
              activité, sans contraintes administratives ni engagements rigides.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PARTNER_BENEFITS.map(({ icon: Icon, title, description }) => (
            <FadeInWhenVisible key={title}>
              <article className="group relative h-full overflow-hidden rounded-3xl p-8 bg-surface-card border border-border-subtle shadow-soft-md transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6 bg-logo-base/10 border border-logo-base/25 text-logo-base-deep">
                  <Icon className="w-6 h-6" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="relative font-display text-[22px] lg:text-[24px] font-semibold tracking-[-0.01em] text-text-primary mb-3">
                  {title}
                </h3>
                <p className="relative text-[15px] leading-relaxed text-text-secondary">
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
