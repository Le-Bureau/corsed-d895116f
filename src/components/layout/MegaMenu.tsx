import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { POLES } from "@/lib/poles";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const MegaMenu = ({ open, onClose, triggerRef }: Props) => {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
      );
      first?.focus();
    }, 80);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="poles-megamenu"
          role="menu"
          aria-label="Pôles d'expertise"
          ref={panelRef}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -4 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: -4 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 z-40",
            "w-[920px] max-w-[calc(100vw-32px)]",
            "bg-surface-card rounded-3xl shadow-soft-xl border border-border-subtle p-8",
            "text-text-primary",
          )}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {POLES.map((pole) => (
              <div key={pole.key} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: pole.baseColorOnLight }}
                    aria-hidden
                  />
                  <span className="font-mono text-[10px] font-semibold tracking-[0.18em] uppercase text-text-muted">
                    {pole.heroPoleNumber ?? `PÔLE 0${POLES.indexOf(pole) + 1}`}
                  </span>
                </div>

                <Link
                  role="menuitem"
                  to={`/pole/${pole.slug}`}
                  onClick={onClose}
                  className="font-display text-base font-semibold text-text-primary transition-colors hover:opacity-80"
                  style={{
                    ["--hover-color" as string]: pole.baseColorOnLight,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = pole.baseColorOnLight)
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  {pole.label}
                </Link>

                <div className="h-px bg-border-subtle my-1" />

                <ul className="flex flex-col gap-1.5">
                  {pole.subServices?.map((sub) =>
                    sub.slug ? (
                      <li key={sub.name}>
                        <Link
                          role="menuitem"
                          to={`/pole/${pole.slug}/${sub.slug}`}
                          onClick={onClose}
                          className="text-[13px] text-text-secondary hover:text-text-primary transition-colors"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ) : (
                      <li
                        key={sub.name}
                        className="text-[13px] text-text-secondary"
                      >
                        {sub.name}
                      </li>
                    ),
                  )}
                  {pole.isInDevelopment && (
                    <li className="text-[11px] text-text-muted italic mt-1">
                      Prochainement
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
