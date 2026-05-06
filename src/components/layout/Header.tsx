import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";

import MegaMenu from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import logoMark from "@/assets/logo-mcg-mark.svg";
import { cn } from "@/lib/utils";

const NAV_BEFORE = [{ label: "Accueil", to: "/", end: true }];
const NAV_AFTER = [
  { label: "Partenaires", to: "/partenaires" },
  { label: "Contact", to: "/contact" },
];

const SHELL_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(248, 251, 253, 0.96) 0%, rgba(225, 235, 243, 0.9) 100%)",
  border: "1px solid transparent",
  boxShadow: [
    "inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    "0 1px 2px rgba(10, 10, 15, 0.04)",
    "0 12px 32px rgba(10, 10, 15, 0.08)",
  ].join(", "),
};

const CTA_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(246, 248, 251, 0.92) 100%)",
  border: "1px solid transparent",
  boxShadow: [
    "inset 0 1px 0 rgba(255, 255, 255, 0.95)",
    "0 2px 6px rgba(10, 10, 15, 0.06)",
    "0 8px 20px rgba(10, 10, 15, 0.05)",
  ].join(", "),
};

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "px-3.5 py-[3.5px] rounded-full text-[13px] font-medium",
    "transition-[color,background-color] duration-300",
    "text-black/70 hover:text-black hover:bg-black/[0.05]",
    "outline-none focus:outline-none focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-0",
    isActive && "text-black bg-black/[0.05]",
  );

const Header = () => {
  const { pathname } = useLocation();
  const [polesOpen, setPolesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const polesBtnRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const polesActive = pathname.startsWith("/pole/");
  const showCta = pathname !== "/contact";

  useEffect(() => {
    setPolesOpen(false);
  }, [pathname]);

  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => setPolesOpen(false), 120);
  };


  return (
    <>
      <header className="fixed top-4 left-4 right-4 z-50 pointer-events-none">
        <div
          className="pointer-events-auto mx-auto flex items-center justify-between rounded-full pl-5 pr-2 py-2"
          style={{
            ...SHELL_STYLE,
            width: "min(1200px, 100%)",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
            aria-label="Corse Drone — Accueil"
          >
            <img src={logoMark} alt="" aria-hidden className="h-6 w-auto" />
            <span className="font-display text-[15px] font-bold tracking-[-0.02em] text-logo-base-deep">
              CORSE DRONE
            </span>
          </Link>

          {/* Desktop nav (centered) */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
            {NAV_BEFORE.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navItemClass}
              >
                {item.label}
              </NavLink>
            ))}

            <div
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setPolesOpen(true);
              }}
              onMouseLeave={scheduleClose}
            >
              <button
                ref={polesBtnRef}
                type="button"
                aria-haspopup="true"
                aria-expanded={polesOpen}
                aria-controls="poles-megamenu"
                onFocus={() => {
                  cancelClose();
                  setPolesOpen(true);
                }}
                onClick={() => setPolesOpen((v) => !v)}
                className={cn(
                  "flex items-center gap-1 px-3.5 py-[3.5px] rounded-full text-[13px] font-medium",
                  "transition-[color,background-color] duration-300",
                  "text-black/70 hover:text-black hover:bg-black/[0.05]",
                  "outline-none focus:outline-none focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-0",
                  (polesOpen || polesActive) && "text-black bg-black/[0.05]",
                )}
              >
                Pôles
                <ChevronDown
                  size={12}
                  className={cn(
                    "transition-transform duration-300",
                    polesOpen && "rotate-180",
                  )}
                />
              </button>
            </div>

            {NAV_AFTER.map((item) => (
              <NavLink key={item.to} to={item.to} className={navItemClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA */}
          {showCta ? (
            <Link
              to="/contact"
              className={cn(
                "group hidden lg:inline-flex items-center pl-4 pr-1.5 py-1.5 rounded-full",
                "text-text-primary text-[13px] font-medium gap-2.5 transition-colors duration-300",
              )}
              style={CTA_STYLE}
            >
              <span>Demander un devis</span>
              <span className="w-6 h-6 rounded-full bg-text-primary flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3 text-white" />
              </span>
            </Link>
          ) : (
            <span className="hidden lg:block w-[1px]" />
          )}

          {/* Mobile burger */}
          <button
            ref={burgerRef}
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            className={cn(
              "lg:hidden flex h-9 w-9 items-center justify-center rounded-full",
              "bg-black/[0.05] hover:bg-black/[0.08] transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            )}
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <MegaMenu
        open={polesOpen}
        onClose={() => setPolesOpen(false)}
        triggerRef={polesBtnRef}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      />

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        triggerRef={burgerRef}
      />
    </>
  );
};

export default Header;
