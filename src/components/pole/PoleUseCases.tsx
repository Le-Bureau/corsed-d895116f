import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { UseCase } from "@/lib/poles";

interface Props {
  cases: UseCase[];
}

const PoleUseCases = ({ cases }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduced = useReducedMotion();
  const total = cases.length;

  useEffect(() => {
    if (reduced || isPaused || total <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, total, reduced]);

  const goPrev = () => setCurrentIndex((i) => (i - 1 + total) % total);
  const goNext = () => setCurrentIndex((i) => (i + 1) % total);

  return (
    <section
      data-header-bg="dark"
      role="region"
      aria-labelledby="pole-cases-title"
      className="relative bg-surface-darker text-text-on-dark py-16 lg:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <div className="inline-flex items-center gap-2 mb-5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-on-dark-muted">
                Cas d'usage
              </span>
            </div>
            <h2
              id="pole-cases-title"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.05] mb-5"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Ils nous ont{" "}
              <span style={{ color: "var(--pole-color)" }}>fait confiance.</span>
            </h2>
          </div>
        </FadeInWhenVisible>

        <div
          className="relative overflow-hidden rounded-3xl border border-white/10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {cases.map((c, i) => {
              const num = String(i + 1).padStart(2, "0");
              const totalStr = String(total).padStart(2, "0");
              return (
                <div
                  key={i}
                  className="min-w-full grid grid-cols-1 lg:grid-cols-[60%_40%]"
                  aria-hidden={i !== currentIndex}
                >
                  {/* Image */}
                  <div
                    className="relative min-h-[280px] lg:min-h-[480px]"
                    style={{
                      background: c.image
                        ? `linear-gradient(135deg, rgba(10,14,26,0.4), rgba(10,14,26,0.7)), url(${c.image}) center/cover no-repeat`
                        : `linear-gradient(135deg, rgba(var(--pole-color-rgb), 0.4), rgba(10,14,26,0.85))`,
                    }}
                    role="img"
                    aria-label={c.imageAlt}
                  />
                  {/* Content */}
                  <div
                    className="p-8 lg:p-10 flex flex-col justify-center"
                    style={{ background: "rgba(10,14,26,0.6)" }}
                  >
                    <div className="font-mono text-[11px] tracking-[0.18em] uppercase mb-5 text-text-on-dark-muted">
                      <span style={{ color: "var(--pole-color)" }}>{num}</span> / {totalStr}
                    </div>
                    <h3 className="font-display text-[24px] lg:text-[30px] font-semibold tracking-[-0.01em] mb-4">
                      {c.title}
                    </h3>
                    <p className="text-[15px] leading-relaxed text-text-on-dark-muted mb-6">
                      {c.description}
                    </p>
                    <div
                      className="rounded-2xl p-5 border"
                      style={{
                        background: "rgba(var(--pole-color-rgb), 0.08)",
                        borderColor: "rgba(var(--pole-color-rgb), 0.25)",
                      }}
                    >
                      <div
                        className="font-mono text-[10px] tracking-[0.18em] uppercase mb-2"
                        style={{ color: "var(--pole-color)" }}
                      >
                        Avantage
                      </div>
                      <div className="text-[14px] leading-relaxed text-text-on-dark">
                        {c.advantage}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots + arrows */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" role="tablist" aria-label="Sélection du cas">
            {cases.map((_, i) => {
              const active = i === currentIndex;
              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Aller au cas ${i + 1}`}
                  onClick={() => setCurrentIndex(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: active ? 40 : 28,
                    background: active ? "var(--pole-color)" : "rgba(255,255,255,0.2)",
                    boxShadow: active ? "0 0 12px rgba(var(--pole-color-rgb), 0.6)" : "none",
                  }}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Cas précédent"
              className="w-10 h-10 rounded-full glass-light flex items-center justify-center text-text-on-dark hover:-translate-y-0.5 transition-transform duration-300 motion-reduce:hover:transform-none"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Cas suivant"
              className="w-10 h-10 rounded-full glass-light flex items-center justify-center text-text-on-dark hover:-translate-y-0.5 transition-transform duration-300 motion-reduce:hover:transform-none"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoleUseCases;
