const DevBanner = () => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-0 inset-x-0 z-[60] h-8 flex items-center justify-center gap-2 bg-[rgba(10,14,26,0.85)] backdrop-blur-md border-b border-white/10 text-[12px] tracking-[0.04em] text-text-on-dark"
    >
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-[devPulse_1.5s_ease-in-out_infinite] motion-reduce:animate-none"
      />
      <span className="font-mono uppercase tracking-[0.15em] text-[11px]">
        <strong className="font-semibold text-amber-300">Développement en cours</strong>
        <span className="mx-2 text-text-on-dark-muted">·</span>
        <span className="text-text-on-dark-muted">Service en préparation, soyez prévenu du lancement</span>
      </span>
    </div>
  );
};

export default DevBanner;
