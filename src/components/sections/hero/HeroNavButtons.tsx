import { POLES } from "@/lib/poles";

interface HeroNavButtonsProps {
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

const HeroNavButtons = ({ currentIndex, onPrev, onNext }: HeroNavButtonsProps) => {
  const total = POLES.length;
  const prevPole = POLES[(currentIndex - 1 + total) % total];
  const nextPole = POLES[(currentIndex + 1) % total];

  const textShadow = "0 1px 3px rgba(0,0,0,0.5), 0 0 12px rgba(0,0,0,0.35)";

  return (
    <>
      {/* Left tab — PRÉCÉDENT */}
      <button
        type="button"
        onClick={onPrev}
        aria-label={`Pôle précédent : ${prevPole.label}`}
        className="group absolute left-6 lg:left-10 top-[calc(50%+30px)] -translate-y-1/2 z-30 hidden md:flex flex-row items-center gap-3 px-3 py-5 -mx-3 -my-5 opacity-70 hover:opacity-100 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
      >
        <span
          aria-hidden="true"
          className="block w-px bg-white/80 h-10 lg:h-12 group-hover:h-14 lg:group-hover:h-16 transition-all duration-300"
        />
        <span className="flex flex-col items-start leading-tight">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-on-dark-muted"
            style={{ textShadow }}
          >
            Précédent
          </span>
          <span
            className="font-display text-sm lg:text-base font-medium text-text-on-dark mt-1"
            style={{ textShadow }}
          >
            {prevPole.label}
          </span>
        </span>
      </button>

      {/* Right tab — SUIVANT */}
      <button
        type="button"
        onClick={onNext}
        aria-label={`Pôle suivant : ${nextPole.label}`}
        className="group absolute right-6 lg:right-10 top-[calc(50%+30px)] -translate-y-1/2 z-30 hidden md:flex flex-row-reverse items-center gap-3 px-3 py-5 -mx-3 -my-5 opacity-70 hover:opacity-100 transition-opacity duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded"
      >
        <span
          aria-hidden="true"
          className="block w-px bg-white/80 h-10 lg:h-12 group-hover:h-14 lg:group-hover:h-16 transition-all duration-300"
        />
        <span className="flex flex-col items-end leading-tight">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-on-dark-muted"
            style={{ textShadow }}
          >
            Suivant
          </span>
          <span
            className="font-display text-sm lg:text-base font-medium text-text-on-dark mt-1"
            style={{ textShadow }}
          >
            {nextPole.label}
          </span>
        </span>
      </button>
    </>
  );
};

export default HeroNavButtons;
