import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { PARTNER_STEPS } from "@/lib/partners/steps";
import InlineCTA from "./InlineCTA";

const cardStyle: React.CSSProperties = {
  background: "rgba(10,14,26,0.4)",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
};

const HowItWorksSection = () => {
  return (
    <section data-header-bg="dark"
      id="fonctionnement"
      role="region"
      aria-labelledby="how-it-works-title"
      className="relative bg-surface-darker text-text-on-dark py-16 lg:py-28 scroll-mt-24"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-logo-base" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-on-dark-muted">
                Comment ça marche
              </span>
            </div>
            <h2
              id="how-it-works-title"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.05] mb-5"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Quatre étapes, <span className="text-logo-base">zéro complication.</span>
            </h2>
            <p className="text-text-on-dark-muted text-[16px] lg:text-[17px] leading-relaxed">
              Le processus est conçu pour être aussi simple que de transmettre un contact. Nous
              prenons en charge tout le reste : qualification, devis, mission et facturation.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {PARTNER_STEPS.map(({ number, icon: Icon, title, description }) => (
            <FadeInWhenVisible key={number}>
              <article
                className="h-full rounded-3xl p-6 lg:p-7 border border-white/10 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[rgba(168,192,212,0.35)] motion-reduce:transform-none motion-reduce:hover:transform-none"
                style={cardStyle}
              >
                <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-logo-base mb-5">
                  {number}
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-5 bg-logo-base/[0.12] border border-logo-base/25 text-logo-base">
                  <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="font-display text-[20px] font-semibold tracking-[-0.01em] mb-2">
                  {title}
                </h3>
                <p className="text-[14px] leading-relaxed text-text-on-dark-muted">
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
