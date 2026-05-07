import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { POLES } from "@/lib/poles";
import { hexToRgb } from "@/lib/utils";
import { useUIBanner } from "@/contexts/UIBannerContext";

interface Props {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const MENU_SURFACE_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(242, 248, 252, 0.7) 0%, rgba(216, 229, 239, 0.6) 100%)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
  border: "1px solid transparent",
  borderRadius: 24,
  padding: 24,
  boxShadow: [
    "inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    "0 1px 2px rgba(10, 10, 15, 0.04)",
    "0 12px 32px rgba(10, 10, 15, 0.08)",
    "0 24px 48px rgba(10, 10, 15, 0.06)",
  ].join(", "),
};

const MegaMenu = ({ open, onClose, triggerRef, onMouseEnter, onMouseLeave }: Props) => {
  const { pathname } = useLocation();
  const { hasBanner } = useUIBanner();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (triggerRef.current?.contains(t)) return;
      onClose();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return createPortal(
    <div
      ref={panelRef}
      id="poles-megamenu"
      role="menu"
      aria-label="Pôles d'expertise"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`fixed left-0 right-0 mx-auto z-[60] ${hasBanner ? "top-[108px]" : "top-20"}`}
      style={{ width: "min(1100px, calc(100vw - 4rem))", ...MENU_SURFACE_STYLE }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 items-stretch">
        {POLES.map((pole) => {
          const rgb = hexToRgb(pole.baseColorOnLight);
          return (
            <div
              key={pole.key}
              className="group relative -m-1 p-3 rounded-2xl transition-colors duration-200 flex flex-col h-full"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `rgba(${rgb}, 0.05)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "";
              }}
            >
              <Link
                role="menuitem"
                to={`/pole/${pole.slug}`}
                onClick={onClose}
                className="group/title inline-flex items-center gap-1.5 mb-1.5 font-display text-[17px] font-bold tracking-[-0.02em] text-text-primary transition-all duration-200 rounded-md px-1 -mx-1 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 self-start"
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = pole.baseColorOnLight)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "")}
              >
                {pole.label}
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-200 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5"
                  strokeWidth={2.5}
                />
              </Link>

              <div className="flex flex-col gap-0.5 mt-1">
                {pole.subServices && pole.subServices.length > 0
                  ? pole.subServices.map((sub) =>
                      sub.slug ? (
                        <Link
                          key={sub.name}
                          role="menuitem"
                          to={`/pole/${pole.slug}/${sub.slug}`}
                          onClick={onClose}
                          className="group/sublink flex items-center gap-2.5 py-2 px-2 -mx-2 rounded-lg text-[13px] text-text-secondary hover:bg-black/[0.02] transition-all duration-150 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--text-primary)";
                            const arrow = e.currentTarget.querySelector("[data-arrow]");
                            if (arrow) {
                              (arrow as HTMLElement).style.opacity = "1";
                              (arrow as HTMLElement).style.transform = "translateX(2px)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "";
                            const arrow = e.currentTarget.querySelector("[data-arrow]");
                            if (arrow) {
                              (arrow as HTMLElement).style.opacity = "0";
                              (arrow as HTMLElement).style.transform = "translateX(0)";
                            }
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: pole.baseColorOnLight }}
                            aria-hidden="true"
                          />
                          <span className="flex-1">{sub.name}</span>
                          <ArrowRight
                            data-arrow
                            className="w-3.5 h-3.5 flex-shrink-0 opacity-0 transition-all duration-200"
                            style={{ color: pole.baseColorOnLight }}
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                        </Link>
                      ) : (
                        <div
                          key={sub.name}
                          className="flex items-center gap-2.5 py-2 px-2 -mx-2 text-[13px] text-black/50"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-60"
                            style={{ background: pole.baseColorOnLight }}
                            aria-hidden="true"
                          />
                          <span className="flex-1">{sub.name}</span>
                        </div>
                      ),
                    )
                  : null}
              </div>

              <Link
                to={`/pole/${pole.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1 mt-auto pt-3 border-t border-black/5 text-[12.5px] font-semibold transition-all duration-200 rounded-sm focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 self-start"
                style={{ color: pole.baseColorOnLight }}
              >
                Voir tout le pôle
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>,
    document.body,
  );
};

export default MegaMenu;
