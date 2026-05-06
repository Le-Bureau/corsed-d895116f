import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";

const ContactHero = () => {
  return (
    <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10 pt-32 pb-12 lg:pb-16">
      <FadeInWhenVisible>
        <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-logo-base shadow-[0_0_12px_rgba(168,192,212,0.5)]" />
          Nous contacter
        </span>
        <h1 className="font-display font-semibold text-text-primary text-[clamp(40px,5.2vw,76px)] leading-[1.05] tracking-[-0.035em] max-w-[880px] mb-6">
          Discutons de votre
          <br />
          <span className="text-logo-base-deep">projet aérien.</span>
        </h1>
        <p className="text-lg leading-relaxed text-text-muted max-w-[580px]">
          Quelques mots suffisent. Nous revenons vers vous sous 24h ouvrées
          avec une première réponse adaptée à votre besoin.
        </p>
      </FadeInWhenVisible>
    </div>
  );
};

export default ContactHero;
