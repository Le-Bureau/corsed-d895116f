import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { ChevronDown, X } from "lucide-react";
import HeaderLogo from "./HeaderLogo";
import { POLES } from "@/lib/poles";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/SmoothScrollProvider";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const NAV_LINKS = [
  { label: "Partenaires", to: "/partenaires" },
  { label: "Blog", to: "/blog" },
  { label: "À propos", to: "/#about" },
  { label: "Contact", to: "/contact" },
];

const SERVICE_ITEMS = [
  ...POLES.map((p) => ({
    label: p.label,
    to: `/pole/${p.slug}`,
    color: p.baseColorOnDark,
  })),
  { label: "Autres expertises", to: "/expertises", color: "var(--logo-base)" },
];

const panelVariants: Variants = {
  hidden: { x: "100%" },
  show: { x: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { x: "100%", transition: { duration: 0.35, ease: EASE } },
};

const reducedPanel: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const sectionsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const sectionItem: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

const MobileDrawer = ({ open, onClose, triggerRef }: Props) => {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const lenis = useLenis();

  // Close on route change
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Body scroll lock + Lenis stop
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [open, lenis]);

  // Escape + initial focus + restore
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])',
      );
      first?.focus();
    }, 120);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  // Restore focus to trigger on close
  useEffect(() => {
    if (!open) {
      // small delay so AnimatePresence exit doesn't steal focus
      const t = window.setTimeout(() => triggerRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            variants={reduced ? reducedPanel : panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className={cn(
              "fixed inset-y-0 right-0 z-50 flex w-3/4 max-w-[420px] flex-col p-6",
              "bg-white/70 backdrop-blur-2xl backdrop-saturate-150 text-text-primary border-l border-white/40 shadow-soft-xl",
            )}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between">
              <HeaderLogo tone="on-dark" onClick={onClose} className="h-24" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Fermer le menu"
                className="flex h-10 w-10 items-center justify-center rounded-full text-text-primary transition-colors hover:bg-black/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <X size={20} />
              </button>
            </div>

            {/* Sections */}
            <motion.nav
              variants={reduced ? undefined : sectionsContainer}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-1 flex-col"
            >
              {/* Pôles accordion */}
              <motion.div
                variants={reduced ? undefined : sectionItem}
                className="border-b border-border-subtle py-4"
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  className="flex w-full items-center justify-between font-display text-[22px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                >
                  <span>Pôles</span>
                  <ChevronDown
                    size={20}
                    className={cn(
                      "transition-transform duration-300 ease-out-expo",
                      servicesOpen && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {servicesOpen && (
                    <motion.ul
                      key="services-list"
                      initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={
                        reduced
                          ? { opacity: 1 }
                          : { height: "auto", opacity: 1, transition: { duration: 0.3, ease: EASE } }
                      }
                      exit={
                        reduced
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0, transition: { duration: 0.25, ease: EASE } }
                      }
                      className="overflow-hidden"
                    >
                      <li className="h-3" aria-hidden />
                      {SERVICE_ITEMS.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.to}
                            onClick={onClose}
                            className="flex items-center gap-3 py-2.5 text-[15px] font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                          >
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                              aria-hidden
                            />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Direct links */}
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.to}
                  variants={reduced ? undefined : sectionItem}
                  className="border-b border-border-subtle py-4"
                >
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className="flex w-full items-center justify-between font-display text-[22px] font-medium transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* CTA */}
              <motion.div
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={
                  reduced
                    ? { opacity: 1, transition: { delay: 0.5, duration: 0.25 } }
                    : { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.4, ease: EASE } }
                }
                className="mt-auto pt-6"
              >
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="block w-full rounded-full bg-logo-base py-3 text-center text-[15px] font-semibold text-text-primary transition-colors hover:bg-logo-base-deep hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  style={{ boxShadow: "0 2px 8px rgba(168,192,212,0.4)" }}
                >
                  Demander un devis
                </Link>
              </motion.div>
            </motion.nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
