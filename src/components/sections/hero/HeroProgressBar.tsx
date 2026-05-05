interface HeroProgressBarProps {
  currentIndex: number;
  total: number;
}

const HeroProgressBar = ({ currentIndex, total }: HeroProgressBarProps) => {
  const pct = ((currentIndex + 1) / total) * 100;
  return (
    <div className="absolute bottom-0 left-0 right-0 z-[16] h-[2px] bg-white/[0.08]">
      <div
        className="h-full"
        style={{
          width: `${pct}%`,
          backgroundColor: "var(--pole-base)",
          boxShadow: "0 0 12px var(--pole-base)",
          transition:
            "width 700ms cubic-bezier(0.16,1,0.3,1), background-color 1500ms cubic-bezier(0.16,1,0.3,1), box-shadow 1500ms cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
};

export default HeroProgressBar;
