import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUIBanner } from "@/contexts/UIBannerContext";

const DevBanner = () => {
  const { setHasBanner } = useUIBanner();

  useEffect(() => {
    setHasBanner(true);
    return () => setHasBanner(false);
  }, [setHasBanner]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-0 inset-x-0 z-[60] py-2 px-6 flex items-center justify-center gap-3 text-[11px]"
      style={{
        background: "rgba(var(--pole-color-rgb), 0.10)",
        borderBottom: "1px solid rgba(var(--pole-color-rgb), 0.30)",
      }}
    >
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full animate-[devPulse_1.5s_ease-in-out_infinite] motion-reduce:animate-none"
        style={{
          background: "var(--pole-color)",
          boxShadow: "0 0 8px var(--pole-color)",
        }}
      />
      <span className="font-mono uppercase tracking-[0.18em] font-semibold text-text-primary">
        Développement en cours
      </span>
      <span className="text-text-muted hidden sm:inline">—</span>
      <span className="text-text-muted hidden sm:inline font-mono uppercase tracking-[0.18em]">
        Service en préparation,{" "}
        <Link
          to="/contact"
          className="underline underline-offset-2 font-semibold"
          style={{ color: "var(--pole-color)" }}
        >
          soyez prévenu du lancement
        </Link>
      </span>
    </div>
  );
};

export default DevBanner;
