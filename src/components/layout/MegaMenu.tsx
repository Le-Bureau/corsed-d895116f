import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { POLES } from "@/lib/poles";
import { hexToRgb } from "@/lib/utils";

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
      className="fixed top-20 left-0 right-0 mx-auto z-[60]"
      style={{ width: "min(720px, calc(100vw - 2rem))", ...MENU_SURFACE_STYLE }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-stretch">
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
              <div className="flex items-center gap-2 mb-2.5">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: pole.baseColorOnLight }}
                  aria-hidden
                />
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.18em] font-bold"
                  style={{ color: pole.baseColorOnLight }}
                >
                  {pole.heroPoleNumber}
                </span>
              </div>

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

              <div className="flex flex-col gap-1.5 mt-1">
                {pole.subServices && pole.subServices.length > 0
                  ? pole.subServices.map((sub) =>
                      sub.slug ? (
                        <Link
                          key={sub.name}
                          role="menuitem"
                          to={`/pole/${pole.slug}/${sub.slug}`}
                          onClick={onClose}
                          className="text-[12.5px] text-text-secondary hover:text-text-primary transition-colors rounded-sm focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15"
                        >
                          {sub.name}
                        </Link>
                      ) : (
                        <span
                          key={sub.name}
                          className="text-[12.5px] text-black/50"
                        >
                          {sub.name}
                        </span>
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
