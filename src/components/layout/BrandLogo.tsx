import logoFullOnDark from "@/assets/logo-mcg-full.svg";
import logoFullOnLight from "@/assets/logo-mcg-full-onlight.svg";
import { cn } from "@/lib/utils";

export type BrandLogoProps = {
  variant?: "auto" | "on-dark" | "on-light";
  className?: string;
};

export function BrandLogo({ variant = "auto", className }: BrandLogoProps) {
  // V1: 'auto' defaults to on-dark. We'll wire context detection later.
  const src = variant === "on-light" ? logoFullOnLight : logoFullOnDark;
  return (
    <img
      src={src}
      alt="Corse Drone — Morganti Cacciari Gaspard"
      className={cn("h-12 w-auto", className)}
    />
  );
}

export default BrandLogo;
