import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  /** Force a wordmark color tone. 'auto' inherits from currentColor. */
  tone?: "auto" | "on-dark" | "on-light";
  onClick?: () => void;
}

const HeaderLogo = ({ className, tone = "auto", onClick }: Props) => {
  const toneClass =
    tone === "on-dark"
      ? "text-text-on-dark"
      : tone === "on-light"
        ? "text-text-primary"
        : "";

  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md",
        toneClass,
        className,
      )}
      aria-label="Corse Drone — Accueil"
    >
      <span
        className="flex h-7 w-7 items-center justify-center rounded-[7px] font-display font-extrabold text-[13px] text-surface-darker"
        style={{ backgroundColor: "var(--logo-base)" }}
      >
        CD
      </span>
      <span className="text-[15px] font-semibold leading-none">Corse Drone</span>
    </Link>
  );
};

export default HeaderLogo;
