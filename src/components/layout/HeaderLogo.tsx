import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import logoFull from "@/assets/logo-mcg-full.svg";

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
        "flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md",
        toneClass,
        className,
      )}
      aria-label="Corse Drone — Accueil"
    >
      <img src={logoFull} alt="Corse Drone" className="h-10 md:h-12 w-auto" />
    </Link>
  );
};

export default HeaderLogo;

