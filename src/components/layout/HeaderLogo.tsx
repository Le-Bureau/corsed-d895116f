import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import logoFull from "@/assets/logo-mcg-full.svg";
import logoFullOnLight from "@/assets/logo-mcg-full-onlight.svg";

interface Props {
  className?: string;
  tone?: "auto" | "on-dark" | "on-light";
  onClick?: () => void;
}

const HeaderLogo = ({ className, tone = "on-light", onClick }: Props) => {
  const src = tone === "on-dark" ? logoFull : logoFullOnLight;
  return (
    <Link
      to="/"
      onClick={onClick}
      className={cn(
        "flex items-center h-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md",
        className,
      )}
      aria-label="Corse Drone — Accueil"
    >
      <img src={src} alt="Corse Drone" className="h-full w-auto" />
    </Link>
  );
};

export default HeaderLogo;
