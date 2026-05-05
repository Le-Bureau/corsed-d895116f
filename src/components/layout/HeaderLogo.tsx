import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import logoFull from "@/assets/logo-mcg-full.svg";
import type { HeaderState } from "@/hooks/useHeaderState";

interface Props {
  className?: string;
  /** Force a wordmark color tone. 'auto' inherits from currentColor. */
  tone?: "auto" | "on-dark" | "on-light";
  onClick?: () => void;
  headerState?: HeaderState;
}

const HeaderLogo = ({ className, tone = "auto", onClick, headerState }: Props) => {
  const toneClass =
    tone === "on-dark"
      ? "text-text-on-dark"
      : tone === "on-light"
        ? "text-text-primary"
        : "";

  const heightClass = headerState === "top" ? "h-14" : "h-8";

  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn(
        "flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md",
        "transition-[height] duration-700 ease-out-expo",
        heightClass,
        toneClass,
        className,
      )}
      aria-label="Corse Drone — Accueil"
    >
      <img src={logoFull} alt="Corse Drone" className="h-full w-auto" />
    </Link>
  );
};

export default HeaderLogo;
