import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroNavButtonsProps {
  onPrev: () => void;
  onNext: () => void;
}

const baseBtn =
  "w-12 h-12 rounded-full glass-light hover:bg-white/[0.18] text-text-on-dark flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-darker";

const HeroNavButtons = ({ onPrev, onNext }: HeroNavButtonsProps) => (
  <div className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-32 md:gap-40 lg:gap-48">
    <button
      type="button"
      onClick={onPrev}
      aria-label="Pôle précédent"
      className={baseBtn}
    >
      <ChevronLeft size={20} />
    </button>
    <button
      type="button"
      onClick={onNext}
      aria-label="Pôle suivant"
      className={baseBtn}
    >
      <ChevronRight size={20} />
    </button>
  </div>
);

export default HeroNavButtons;
