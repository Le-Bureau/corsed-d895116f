import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu } from "lucide-react";
import HeaderLogo from "./HeaderLogo";
import MegaMenu from "./MegaMenu";
import MobileDrawer from "./MobileDrawer";
import { useHeaderState } from "@/hooks/useHeaderState";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Partenaires", to: "/partenaires" },
  { label: "À propos", to: "/#about" },
  { label: "Contact", to: "/contact" },
];

const Header = () => {
  const headerState = useHeaderState();
  const { pathname } = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const onLight = headerState === "scrolled-light";
  const showCta = pathname !== "/contact";
  const servicesActive =
    pathname.startsWith("/pole/") || pathname.startsWith("/expertises");

  // Close megamenu on route change
  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 150);
  };
  const openNow = () => {
    clearCloseTimer();
    setServicesOpen(true);
  };

  const pillStateClass =
    headerState === "top"
      ? "bg-transparent border-transparent text-text-on-dark"
      : headerState === "scrolled-dark"
        ? "glass-light-strong text-text-on-dark"
        : "glass-white text-text-primary";

  const ctaClass =
    onLight
      ? "bg-text-primary text-text-on-dark"
      : "bg-text-on-dark text-surface-darker";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-[1280px] px-5 py-3 sm:px-10 md:py-5">
        <div
          className={cn(
            "relative flex items-center justify-between gap-4 rounded-full border px-4 py-2 md:px-5 md:py-2.5",
            "transition-[background-color,border-color,color,backdrop-filter] duration-500 ease-out-expo",
            pillStateClass,
          )}
        >
          <HeaderLogo />

          {/* Desktop nav */}
          <nav className="relative hidden items-center gap-1 md:flex">
            <button
              ref={servicesBtnRef}
              type="button"
              aria-haspopup="menu"
              aria-expanded={servicesOpen}
              onClick={() => {
                clearCloseTimer();
                setServicesOpen((v) => !v);
              }}
              onMouseEnter={openNow}
              onMouseLeave={scheduleClose}
              className={cn(
                "relative flex items-center gap-1 rounded-full px-3 py-1.5 text-[14px] font-medium transition-opacity",
                servicesActive ? "opacity-100" : "opacity-85 hover:opacity-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              )}
            >
              Services
              <ChevronDown
                size={14}
                className={cn(
                  "transition-transform duration-[250ms] ease-out-expo",
                  servicesOpen && "rotate-180",
                )}
              />
              {servicesActive && (
                <span
                  aria-hidden
                  className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current"
                />
              )}
            </button>

            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-full px-3 py-1.5 text-[14px] font-medium transition-opacity",
                    isActive ? "opacity-100" : "opacity-85 hover:opacity-100",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

          </nav>

          <div className="flex items-center gap-2">
            {showCta && (
              <Link
                to="/contact"
                className={cn(
                  "hidden rounded-full px-5 py-2.5 text-[14px] font-semibold transition-[background-color,color,transform] duration-500 ease-out-expo md:inline-block",
                  "hover:-translate-y-px",
                  ctaClass,
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                )}
              >
                Demander un devis
              </Link>
            )}

            <button
              ref={burgerRef}
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden",
                onLight ? "hover:bg-black/5" : "hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              )}
            >
              <Menu size={20} />
            </button>
          </div>

          <MegaMenu
            open={servicesOpen}
            headerState={headerState}
            onClose={() => setServicesOpen(false)}
            onMouseEnter={openNow}
            onMouseLeave={scheduleClose}
            triggerRef={servicesBtnRef}
          />
        </div>

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
