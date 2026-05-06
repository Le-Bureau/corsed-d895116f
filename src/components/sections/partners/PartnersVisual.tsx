import { useReducedMotion } from "motion/react";

const PartnersVisual = () => {
  const reduced = useReducedMotion();

  return (
    <div className="relative min-h-[360px] lg:min-h-[520px] rounded-2xl overflow-hidden isolate">
      {/* 1. Mesh layer */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(168,192,212,0.35) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 70% 70%, rgba(80,130,172,0.30) 0%, transparent 55%)," +
            "linear-gradient(135deg, rgba(10,14,26,0.6) 0%, rgba(5,8,17,0.85) 100%)",
        }}
      />

      {/* 2. Vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(5,8,17,0.6) 100%)",
        }}
      />

      {/* 3. Constellation */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="absolute inset-0 z-[3] w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Solid lines */}
        <line x1="200" y1="200" x2="60" y2="80" stroke="rgba(168,192,212,0.45)" strokeWidth="1" />
        <line x1="200" y1="200" x2="340" y2="80" stroke="rgba(168,192,212,0.45)" strokeWidth="1" />
        <line x1="200" y1="200" x2="60" y2="320" stroke="rgba(168,192,212,0.45)" strokeWidth="1" />
        <line x1="200" y1="200" x2="340" y2="320" stroke="rgba(168,192,212,0.45)" strokeWidth="1" />

        {/* Dashed lines */}
        <line x1="200" y1="200" x2="200" y2="40" stroke="rgba(168,192,212,0.25)" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="200" y1="200" x2="360" y2="200" stroke="rgba(168,192,212,0.25)" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="200" y1="200" x2="200" y2="360" stroke="rgba(168,192,212,0.25)" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="200" y1="200" x2="40" y2="200" stroke="rgba(168,192,212,0.25)" strokeWidth="1" strokeDasharray="3 4" />

        {/* Outer nodes */}
        <circle cx="60" cy="80" r="4" fill="#A8C0D4" />
        <circle cx="340" cy="80" r="4" fill="#A8C0D4" />
        <circle cx="60" cy="320" r="4" fill="#A8C0D4" />
        <circle cx="340" cy="320" r="4" fill="#A8C0D4" />

        {/* Secondary nodes */}
        <circle cx="200" cy="40" r="3" fill="rgba(168,192,212,0.55)" />
        <circle cx="360" cy="200" r="3" fill="rgba(168,192,212,0.55)" />
        <circle cx="200" cy="360" r="3" fill="rgba(168,192,212,0.55)" />
        <circle cx="40" cy="200" r="3" fill="rgba(168,192,212,0.55)" />

        {/* Center pulse */}
        <circle
          cx="200"
          cy="200"
          r="8"
          fill="#A8C0D4"
          style={{
            transformOrigin: "200px 200px",
            transformBox: "fill-box",
            animation: reduced ? "none" : "nodePulse 2.4s ease-out infinite",
          }}
        />
        <circle cx="200" cy="200" r="6" fill="#A8C0D4" />
      </svg>

      {/* 4. Noise */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[4] pointer-events-none mix-blend-overlay opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, white 0 1px, transparent 1px 3px)," +
            "repeating-linear-gradient(90deg, white 0 1px, transparent 1px 3px)",
        }}
      />

      {/* 5. Label */}
      <div className="absolute top-5 left-5 z-10 px-3 py-1.5 rounded-full glass-light text-[11px] font-medium tracking-[0.08em] uppercase text-text-on-dark">
        Réseau d'apporteurs
      </div>
    </div>
  );
};

export default PartnersVisual;
