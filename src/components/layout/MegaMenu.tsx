import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { POLES } from "@/lib/poles";

interface Props {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const GLASS_STYLE: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.65)",
  backdropFilter: "blur(20px) saturate(160%)",
  WebkitBackdropFilter: "blur(20px) saturate(160%)",
  border: "1px solid rgba(255, 255, 255, 0.55)",
  borderRadius: 24,
  padding: 24,
  boxShadow: [
    "inset 0 1px 0 rgba(255, 255, 255, 0.85)",
    "inset 0 -1px 0 rgba(10, 10, 15, 0.04)",
    "0 1px 2px rgba(10, 10, 15, 0.04)",
    "0 8px 24px rgba(10, 10, 15, 0.06)",
    "0 24px 48px rgba(10, 10, 15, 0.04)",
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
      style={{ width: "min(720px, calc(100vw - 2rem))", ...GLASS_STYLE }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {POLES.map((pole) => (
          <div key={pole.key} className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: pole.baseColorOnLight }}
                aria-hidden
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/50 font-semibold">
                {pole.heroPoleNumber}
              </span>
            </div>

            <Link
              role="menuitem"
              to={`/pole/${pole.slug}`}
              onClick={onClose}
              className="group flex items-center gap-1 font-display text-[15px] font-medium tracking-[-0.02em] text-text-primary transition-colors rounded-md focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2 focus-visible:ring-offset-white/0"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = pole.baseColorOnLight)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              {pole.label}
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
            </Link>

            <div className="h-px bg-black/10 mt-1 mb-1" />

            {pole.subServices && pole.subServices.length > 0 ? (
              pole.subServices.map((sub) =>
                sub.slug ? (
                  <Link
                    key={sub.name}
                    role="menuitem"
                    to={`/pole/${pole.slug}/${sub.slug}`}
                    onClick={onClose}
                    className="text-[12.5px] py-1.5 text-black/70 hover:text-black transition-colors rounded-sm focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/15 focus-visible:ring-offset-2 focus-visible:ring-offset-white/0"
                  >
                    {sub.name}
                  </Link>
                ) : (
                  <span
                    key={sub.name}
                    className="text-[12.5px] py-1.5 text-black/50"
                  >
                    {sub.name}
                  </span>
                ),
              )
            ) : null}

            {pole.isInDevelopment && (
              <span className="text-[11px] italic text-black/50 py-1.5">
                Prochainement
              </span>
            )}
          </div>
        ))}
      </div>
    </div>,
    document.body,
  );
};

export default MegaMenu;
