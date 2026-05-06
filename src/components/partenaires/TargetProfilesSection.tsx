import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { PARTNER_PROFILES } from "@/lib/partners/profiles";

const TargetProfilesSection = () => {
  return (
    <section
      role="region"
      aria-labelledby="target-profiles-title"
      className="relative bg-surface-elevated py-20 lg:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-logo-base shadow-[0_0_12px_rgba(168,192,212,0.5)]" />
              Pour qui
            </span>
            <h2
              id="target-profiles-title"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.05] text-text-primary mb-5"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Vous êtes peut-être{" "}
              <span className="text-logo-base-deep">déjà partenaire potentiel.</span>
            </h2>
            <p className="text-text-secondary text-[16px] lg:text-[17px] leading-relaxed">
              Si votre activité vous met régulièrement en contact avec des propriétaires, des
              gestionnaires de bâtiments ou des professionnels du foncier, vous êtes bien placé pour
              identifier des besoins drone.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {PARTNER_PROFILES.map(({ icon: Icon, label }) => (
            <FadeInWhenVisible key={label}>
              <div className="h-full flex items-center gap-4 rounded-2xl p-6 bg-surface-card border border-border-subtle shadow-soft-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md hover:border-logo-base/40">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-logo-base/10 border border-logo-base/25 text-logo-base-deep flex-shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="font-display text-[15px] lg:text-[16px] font-medium tracking-[-0.01em] text-text-primary whitespace-pre-line leading-snug">
                  {label}
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible>
          <div className="rounded-2xl border border-dashed border-border-default p-6 text-center text-[14px] leading-relaxed text-text-muted max-w-[880px] mx-auto bg-surface-card/50">
            Cette liste n'est pas exhaustive. Tout professionnel qui rencontre régulièrement des
            prospects pertinents pour nos services est le bienvenu, qu'il soit salarié, indépendant
            ou à son compte.
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default TargetProfilesSection;
