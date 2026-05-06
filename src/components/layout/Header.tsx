import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
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

  const isTop = headerState === "top";

  const pillStateClass = isTop
    ? "bg-[rgba(10,14,26,0.5)] border-white/10 text-text-on-dark rounded-[0_0_12px_12px] py-4 px-7 shadow-none"
    : headerState === "scrolled-dark"
      ? "bg-[rgba(10,14,26,0.5)] border-white/10 text-text-on-dark rounded-full py-2.5 pr-3 pl-6 shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
      : "bg-white/70 border-white/50 text-text-primary rounded-full py-2.5 pr-3 pl-6 shadow-[0_8px_32px_rgba(10,14,26,0.08)]";

  const ctaGlassClass = onLight ? "cta-tinted-liquid-dark" : "cta-tinted-liquid";
  const ctaTextColor = onLight ? "text-text-primary" : "text-text-on-dark";
  const ctaBaseStyle = onLight
    ? undefined
    : ({
        background:
          "linear-gradient(180deg, rgba(168,192,212,0.18) 0%, rgba(168,192,212,0.08) 50%, rgba(168,192,212,0.14) 100%)",
        backdropFilter: "blur(28px) saturate(200%) brightness(1.05)",
        WebkitBackdropFilter: "blur(28px) saturate(200%) brightness(1.05)",
        border: "1px solid rgba(168,192,212,0.3)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.35), 0 4px 16px rgba(168,192,212,0.15), 0 1px 3px rgba(0,0,0,0.1)",
      } as React.CSSProperties);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-[padding] duration-700 ease-out-expo",
        isTop ? "px-8" : "pt-4 px-[max(20px,calc(50%-640px))]",
      )}
    >
      <div className="relative">
        <div
          className={cn(
            "flex w-full items-center justify-between gap-4 backdrop-blur-[28px] saturate-180 border",
            "transition-[border-radius,padding,box-shadow,background-color,border-color,color] duration-700 ease-out-expo",
            pillStateClass,
          )}
        >
          <HeaderLogo headerState={headerState} />

          {/* Desktop nav */}
          <nav className="relative hidden items-center gap-1 lg:flex">
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
                style={ctaBaseStyle}
                className={cn(
                  "group relative hidden items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-semibold lg:inline-flex",
                  "transition-[transform,background,border-color,box-shadow] duration-300 ease-out-expo",
                  "hover:-translate-y-px",
                  ctaGlassClass,
                  ctaTextColor,
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                )}
              >
                Demander un devis
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 ease-out-expo group-hover:translate-x-[3px]"
                />
              </Link>
            )}

            <button
              ref={burgerRef}
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
                onLight ? "hover:bg-black/5" : "hover:bg-white/10",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              )}
            >
              <Menu size={20} />
            </button>
          </div>
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

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        triggerRef={burgerRef}
      />
    </header>
  );
};

export default Header;
