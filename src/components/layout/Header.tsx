import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import MegaMenu from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Partenaires", to: "/partenaires" },
  { label: "Contact", to: "/contact" },
];

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
    "hover:bg-black/[0.05]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
    isActive && "bg-black/[0.05]",
  );

const Header = () => {
  const { pathname } = useLocation();
  const [polesOpen, setPolesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const polesBtnRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const polesActive = pathname.startsWith("/pole/");
  const showCta = pathname !== "/contact";

  useEffect(() => {
    setPolesOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className={cn(
          "pointer-events-auto relative flex items-center gap-2 pl-7 pr-2 py-2",
          "bg-white/85 backdrop-blur-2xl backdrop-saturate-180",
          "border border-black/[0.08] rounded-full shadow-soft-md",
          "text-text-primary",
        )}
      >
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 mr-4 lg:mr-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
          aria-label="Corse Drone — Accueil"
        >
          <span
            className="w-2 h-2 rounded-full bg-logo-base"
            style={{ boxShadow: "0 0 8px rgba(168,192,212,0.5)" }}
            aria-hidden
          />
          <span className="font-display text-[13px] font-bold tracking-[-0.015em]">
            CORSE DRONE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            ref={polesBtnRef}
            type="button"
            aria-haspopup="true"
            aria-expanded={polesOpen}
            aria-controls="poles-megamenu"
            onClick={() => setPolesOpen((v) => !v)}
            className={cn(
              "flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-colors",
              "hover:bg-black/[0.05]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              (polesOpen || polesActive) && "bg-black/[0.08]",
            )}
          >
            Pôles
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform duration-200 ease-out",
                polesOpen && "rotate-180",
              )}
            />
          </button>

          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} className={navItemClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        {showCta && (
          <Link
            to="/contact"
            className={cn(
              "hidden lg:inline-flex ml-2 items-center px-5 py-2.5 rounded-full",
              "bg-logo-base text-text-primary text-sm font-semibold",
              "transition-colors hover:bg-logo-base-deep hover:text-white",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            )}
            style={{ boxShadow: "0 2px 8px rgba(168,192,212,0.4)" }}
          >
            Demander un devis
          </Link>
        )}

        {/* Mobile burger */}
        <button
          ref={burgerRef}
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
          className={cn(
            "lg:hidden flex h-9 w-9 items-center justify-center rounded-full ml-1",
            "transition-colors hover:bg-black/[0.05]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          )}
        >
          <Menu size={18} />
        </button>

        <MegaMenu
          open={polesOpen}
          onClose={() => setPolesOpen(false)}
          triggerRef={polesBtnRef}
        />
      </div>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        triggerRef={burgerRef}
      />
    </header>
  );
};

export default Header;
