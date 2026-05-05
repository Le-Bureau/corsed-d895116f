import { POLES } from "@/lib/poles";
import { useActivePole } from "@/hooks/useActivePole";
import PolesAmbient from "./poles-showcase/PolesAmbient";
import PolesIntro from "./poles-showcase/PolesIntro";
import PolesStickyVisual from "./poles-showcase/PolesStickyVisual";
import PolePanel from "./poles-showcase/PolePanel";

const PolesShowcase = () => {
  const { activePoleKey, registerPanel } = useActivePole("nettoyage");
  const active = POLES.find((p) => p.key === activePoleKey) ?? POLES[0];

  return (
    <section
      data-header-bg="dark"
      data-active-pole={activePoleKey}
      role="region"
      aria-label="Présentation détaillée des 4 pôles d'expertise"
      className="relative overflow-hidden bg-surface-darker text-text-on-dark"
      style={
        {
          "--pole-base": active.baseColorOnDark,
          "--pole-deep": active.deepColor,
          transition:
            "--pole-base 1500ms cubic-bezier(0.16,1,0.3,1), --pole-deep 1500ms cubic-bezier(0.16,1,0.3,1)",
        } as React.CSSProperties
      }
    >
      <PolesAmbient />
      <PolesIntro />
      <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10 pb-24 lg:pb-32">
        {/* Mobile: visual inline before panels */}
        <div className="lg:hidden">
          <PolesStickyVisual activePoleKey={activePoleKey} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-[60px] items-start">
          <div className="hidden lg:block">
            <PolesStickyVisual activePoleKey={activePoleKey} />
          </div>
          <div className="flex flex-col">
            {POLES.map((pole) => (
              <PolePanel
                key={pole.key}
                pole={pole}
                isActive={pole.key === activePoleKey}
                registerRef={(el) => registerPanel(pole.key, el)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolesShowcase;
