import { POLES } from "@/lib/poles";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroPaginationProps {
  currentIndex: number;
  onSelect: (i: number) => void;
  paused: boolean;
  onTogglePause: () => void;
}

const HeroPagination = ({ currentIndex, onSelect, paused, onTogglePause }: HeroPaginationProps) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[15] glass-light-strong rounded-full p-2 flex gap-1">
      {POLES.map((p, i) => {
        const active = i === currentIndex;
        return (
          <button
            key={p.key}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`${String(i + 1).padStart(2, "0")} ${p.label}`}
            aria-current={active ? "true" : undefined}
            className={cn(
              "px-4 py-2.5 rounded-full transition-all duration-250 font-mono text-[13px] font-medium inline-flex items-center gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-darker",
              active
                ? "bg-white/[0.95] text-surface-darker"
                : "bg-transparent text-text-on-dark-muted hover:bg-white/[0.08] hover:text-text-on-dark"
            )}
          >
            <span
              className="h-1.5 w-1.5 rounded-full inline-block"
              style={
                active
                  ? {
                      backgroundColor: "var(--pole-base)",
                      boxShadow: "0 0 10px var(--pole-base)",
                      transition:
                        "background-color 1500ms cubic-bezier(0.16,1,0.3,1), box-shadow 1500ms cubic-bezier(0.16,1,0.3,1)",
                    }
                  : { backgroundColor: "rgba(255,255,255,0.3)" }
              }
            />
            <span>{String(i + 1).padStart(2, "0")}</span>
            <span className="hidden md:inline opacity-60">{p.label}</span>
          </button>
        );
      })}
      <button
        type="button"
        onClick={onTogglePause}
        aria-label={paused ? "Lancer le défilement automatique" : "Mettre en pause le défilement automatique"}
        aria-pressed={paused}
        className="ml-1 px-3 py-2.5 rounded-full inline-flex items-center justify-center text-text-on-dark-muted hover:bg-white/[0.08] hover:text-text-on-dark transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-darker"
      >
        {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
      </button>
    </div>
  );
};

export default HeroPagination;
