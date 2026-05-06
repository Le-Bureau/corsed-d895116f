import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { PARTNER_PROFILES } from "@/lib/partners/profiles";

const cardStyle: React.CSSProperties = {
  background: "rgba(10,14,26,0.4)",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
};

const TargetProfilesSection = () => {
  return (
    <section data-header-bg="dark"
      role="region"
      aria-labelledby="target-profiles-title"
      className="relative bg-surface-dark text-text-on-dark py-16 lg:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-logo-base" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-on-dark-muted">
                Pour qui
              </span>
            </div>
            <h2
              id="target-profiles-title"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.05] mb-5"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Vous êtes peut-être <span className="text-logo-base">déjà partenaire potentiel.</span>
            </h2>
            <p className="text-text-on-dark-muted text-[16px] lg:text-[17px] leading-relaxed">
              Si votre activité vous met régulièrement en contact avec des propriétaires, des
              gestionnaires de bâtiments ou des professionnels du foncier, vous êtes bien placé pour
              identifier des besoins drone.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {PARTNER_PROFILES.map(({ icon: Icon, label }) => (
            <FadeInWhenVisible key={label}>
              <div
                className="h-full flex items-center gap-4 rounded-3xl p-6 border border-white/10 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[rgba(168,192,212,0.35)] motion-reduce:transform-none motion-reduce:hover:transform-none"
                style={cardStyle}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-logo-base/[0.12] border border-logo-base/25 text-logo-base flex-shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <div className="font-display text-[15px] lg:text-[16px] font-medium tracking-[-0.01em] text-text-on-dark whitespace-pre-line leading-snug">
                  {label}
                </div>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible>
          <div className="rounded-2xl border border-dashed border-white/15 p-6 text-center text-[14px] leading-relaxed text-text-on-dark-muted max-w-[880px] mx-auto">
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
