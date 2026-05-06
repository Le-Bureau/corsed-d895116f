import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { PARTNER_STEPS } from "@/lib/partners/steps";
import InlineCTA from "./InlineCTA";

const HowItWorksSection = () => {
  return (
    <section
      id="fonctionnement"
      role="region"
      aria-labelledby="how-it-works-title"
      className="relative bg-surface-bg py-20 lg:py-28 scroll-mt-24"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-logo-base shadow-[0_0_12px_rgba(168,192,212,0.5)]" />
              Comment ça marche
            </span>
            <h2
              id="how-it-works-title"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.05] text-text-primary mb-5"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Quatre étapes,{" "}
              <span className="text-logo-base-deep">zéro complication.</span>
            </h2>
            <p className="text-text-secondary text-[16px] lg:text-[17px] leading-relaxed">
              Le processus est conçu pour être aussi simple que de transmettre un contact. Nous
              prenons en charge tout le reste : qualification, devis, mission et facturation.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {PARTNER_STEPS.map(({ number, icon: Icon, title, description }) => (
            <FadeInWhenVisible key={number}>
              <article className="h-full rounded-3xl p-6 lg:p-7 bg-surface-card border border-border-subtle shadow-soft-md transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-logo-base-deep mb-5">
                  {number}
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5 bg-logo-base/10 border border-logo-base/25 text-logo-base-deep">
                  <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="font-display text-[20px] font-semibold tracking-[-0.01em] text-text-primary mb-2">
                  {title}
                </h3>
                <p className="text-[14px] leading-relaxed text-text-secondary">
                  {description}
                </p>
              </article>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible>
          <InlineCTA
            title="Prêt à devenir partenaire ?"
            subtitle="Quelques infos suffisent pour démarrer la conversation."
            ctaLabel="Prendre contact"
            ctaHref="#candidature"
          />
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default HowItWorksSection;
