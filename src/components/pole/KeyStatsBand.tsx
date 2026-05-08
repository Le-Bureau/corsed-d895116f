import { motion, useReducedMotion } from "motion/react";

interface Stat {
  number: string;
  label: string;
}

const STATS: Stat[] = [
  { number: "3 000 m²", label: "Traités en une journée" },
  { number: "100 m", label: "De portée verticale" },
  { number: "150 bar", label: "Pression maximale" },
];

const KeyStatsBand = () => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      aria-label="Chiffres clés du nettoyage par drone"
      className="relative bg-surface-elevated"
      style={{ paddingTop: "clamp(40px, 4vw, 56px)", paddingBottom: "clamp(40px, 4vw, 56px)" }}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <motion.dl
          className="grid grid-cols-1 md:grid-cols-3 gap-y-6 md:gap-y-0"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center text-center py-2 md:py-0 ${
                index < STATS.length - 1
                  ? "border-b border-border-subtle md:border-b-0 md:border-r md:border-border-subtle"
                  : ""
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full mb-3"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              <dt className="sr-only">{stat.label}</dt>
              <dd
                className="font-display font-semibold tracking-[-0.02em] leading-none text-text-primary"
                style={{ fontSize: "clamp(32px, 3.6vw, 56px)" }}
              >
                {stat.number}
              </dd>
              <dd className="mt-2.5 font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};

export default KeyStatsBand;
