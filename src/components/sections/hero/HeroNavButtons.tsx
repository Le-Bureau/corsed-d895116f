import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroNavButtonsProps {
  onPrev: () => void;
  onNext: () => void;
}

const baseBtn =
  "w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-darker";

const HeroNavButtons = ({ onPrev, onNext }: HeroNavButtonsProps) => (
  <div className="absolute right-6 lg:right-10 top-[calc(50%+clamp(70px,14vw,180px)/2+1rem)] z-20 hidden md:flex flex-row gap-2">
    <button
      type="button"
      onClick={onPrev}
      aria-label="Pôle précédent"
      className={baseBtn}
    >
      <ChevronLeft size={18} strokeWidth={2.5} />
    </button>
    <button
      type="button"
      onClick={onNext}
      aria-label="Pôle suivant"
      className={baseBtn}
    >
      <ChevronRight size={18} strokeWidth={2.5} />
    </button>
  </div>
);

export default HeroNavButtons;
