const PartenairesFormPlaceholder = () => {
  return (
    <section
      id="candidature"
      role="region"
      aria-label="Formulaire de candidature"
      className="relative bg-surface-dark text-text-on-dark py-16 lg:py-28 scroll-mt-24"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div
          className="max-w-[880px] mx-auto rounded-3xl border border-dashed border-white/15 p-12 lg:p-16 text-center"
          style={{
            background: "rgba(10,14,26,0.4)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
          }}
        >
          <div className="inline-flex items-center gap-2 mb-4 justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-logo-base" aria-hidden="true" />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-on-dark-muted">
              Candidature
            </span>
          </div>
          <p className="text-text-on-dark-muted text-[15px] leading-relaxed">
            Le formulaire de candidature sera ajouté dans la prochaine étape.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartenairesFormPlaceholder;
