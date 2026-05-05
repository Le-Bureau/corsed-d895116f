import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { POLES, type PoleKey } from "@/lib/poles";

interface Props {
  activePoleKey: PoleKey;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const PolesStickyVisual = ({ activePoleKey }: Props) => {
  const reduced = useReducedMotion();
  const activeIndex = POLES.findIndex((p) => p.key === activePoleKey);
  const active = POLES[activeIndex];
  const indexZeroPad = String(activeIndex + 1).padStart(2, "0");

  const fade = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
        exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: EASE } },
      };

  return (
    <div className="relative h-[50vh] mb-6 lg:mb-0 lg:sticky lg:top-[100px] lg:h-[calc(100vh-100px)] lg:max-h-[720px] rounded-3xl overflow-hidden border border-white/10">
      {/* Mesh fill — colors transition via CSS vars on parent */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 75% 25%, var(--pole-base) 0%, transparent 60%)," +
            "radial-gradient(ellipse at 25% 75%, var(--pole-deep) 0%, transparent 60%)," +
            "radial-gradient(ellipse at 60% 90%, var(--pole-base) 0%, transparent 55%)," +
            "var(--surface-darker)",
          opacity: 0.95,
        }}
      />
      {/* Soft inner crossfade pulse on pole change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePoleKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.8, ease: EASE }}
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, var(--pole-base) 0%, transparent 70%)",
            opacity: 0.25,
          }}
        />
      </AnimatePresence>

      {/* Counter (top-left) */}
      <div
        aria-live="polite"
        className="glass-light-strong absolute top-6 left-6 z-10 inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-xs font-medium text-text-on-dark"
      >
        <span style={{ color: "var(--pole-base)" }}>{indexZeroPad}</span>
        <span className="opacity-40">/</span>
        <span className="opacity-60">04</span>
        <span className="ml-2 pl-2 border-l border-white/15 opacity-60">
          {active.label}
        </span>
      </div>

      {/* Soon badge */}
      <AnimatePresence>
        {active.comingSoon && (
          <motion.div
            key={`soon-${activePoleKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            className="absolute top-6 right-6 z-10 rounded-full px-3.5 py-1.5 border text-[11px] font-semibold tracking-wider uppercase"
            style={{
              background: "rgba(245, 158, 11, 0.18)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              borderColor: "rgba(245, 158, 11, 0.35)",
              color: "#fcd34d",
            }}
          >
            Prochainement
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stat card */}
      <div
        aria-live="polite"
        className="absolute bottom-6 left-6 right-6 z-10 rounded-[18px] px-7 py-5 border border-white/[0.14] flex justify-between items-center gap-6"
        style={{
          background: "rgba(10, 14, 26, 0.55)",
          backdropFilter: "blur(32px) saturate(200%)",
          WebkitBackdropFilter: "blur(32px) saturate(200%)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`stat-l-${activePoleKey}`}
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-1"
          >
            <span className="text-[10px] uppercase tracking-[0.18em] text-text-on-dark-muted">
              {active.statLabel}
            </span>
            <span
              className="font-display text-[40px] font-semibold leading-none"
              style={{ color: "var(--pole-base)" }}
            >
              {active.statValue}
            </span>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={`stat-r-${activePoleKey}`}
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="text-xs text-text-on-dark-muted leading-relaxed max-w-[200px] text-right"
          >
            {active.statDetail}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PolesStickyVisual;
