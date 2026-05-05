import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Layers, Package, ScanEye, SprayCan, Sprout } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { POLES } from "@/lib/poles";
import { EXPERTISES } from "@/lib/expertises";
import { cn } from "@/lib/utils";
import type { HeaderState } from "@/hooks/useHeaderState";

const EASE = [0.16, 1, 0.3, 1] as const;

interface Props {
  open: boolean;
  headerState: HeaderState;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

type SubItem = { label: string; to: string; soon?: boolean };
type Column = {
  key: string;
  tagline: string;
  title: string;
  subtitle?: string;
  Icon: LucideIcon;
  iconColor: string;
  items: SubItem[];
};

const poleByKey = Object.fromEntries(POLES.map((p) => [p.key, p]));

const COLUMNS: Column[] = [
  {
    key: "nettoyage",
    tagline: "Pôle 01",
    title: poleByKey.nettoyage.label,
    subtitle: "Façades, toitures, panneaux",
    Icon: SprayCan,
    iconColor: poleByKey.nettoyage.baseColorOnDark,
    items: [
      { label: "Nettoyage de toitures", to: "/pole/nettoyage/toitures" },
      { label: "Nettoyage de façades", to: "/pole/nettoyage/facades" },
      { label: "Panneaux solaires", to: "/pole/nettoyage/panneaux-solaires" },
    ],
  },
  {
    key: "diagnostic",
    tagline: "Pôle 02",
    title: poleByKey.diagnostic.label,
    subtitle: "Inspections aériennes",
    Icon: ScanEye,
    iconColor: poleByKey.diagnostic.baseColorOnDark,
    items: [
      { label: "Diagnostic thermique", to: "/pole/diagnostic/thermique" },
      { label: "Inspection visuelle", to: "/pole/diagnostic/visuel" },
    ],
  },
  {
    key: "agriculture",
    tagline: "Pôle 03",
    title: poleByKey.agriculture.label,
    subtitle: "Précision agricole",
    Icon: Sprout,
    iconColor: poleByKey.agriculture.baseColorOnDark,
    items: [
      { label: "Épandage ciblé", to: "/pole/agriculture", soon: true },
      { label: "Traitement phytosanitaire", to: "/pole/agriculture", soon: true },
      { label: "Analyses multispectrales", to: "/pole/agriculture", soon: true },
    ],
  },
  {
    key: "transport",
    tagline: "Pôle 04",
    title: poleByKey.transport.label,
    subtitle: "Logistique aérienne",
    Icon: Package,
    iconColor: poleByKey.transport.baseColorOnDark,
    items: [{ label: "Logistique aérienne", to: "/pole/transport", soon: true }],
  },
  {
    key: "expertises",
    tagline: "Expertises",
    title: "Autres expertises",
    subtitle: "Services complémentaires",
    Icon: Layers,
    iconColor: "var(--logo-base)",
    items: EXPERTISES.map((e) => ({
      label: e.label,
      to: `/expertises#${e.slug}`,
    })),
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: EASE,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: EASE } },
};

const colVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
  exit: { opacity: 0, y: 0, transition: { duration: 0.15 } },
};

const reducedContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const MegaMenu = ({
  open,
  headerState,
  onClose,
  onMouseEnter,
  onMouseLeave,
  triggerRef,
}: Props) => {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on route change
  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Escape + focus management
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    // Focus first interactive element
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

  // Outside click
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

  const lightSurface = headerState === "scrolled-light";
  const panelClass = lightSurface ? "glass-white" : "glass-light-strong";
  const textTone = lightSurface ? "text-text-primary" : "text-text-on-dark";
  const mutedTone = lightSurface ? "text-text-secondary" : "text-text-on-dark-muted";
  const hoverBg = lightSurface ? "hover:bg-black/5" : "hover:bg-white/5";

  return (
    <AnimatePresence>
      {open && (
        <div
          className={cn(
            "absolute left-1/2 top-[calc(100%+12px)] z-40 -translate-x-1/2",
            "w-[1100px] max-w-[calc(100vw-80px)]",
          )}
        >
          <motion.div
            ref={panelRef}
            role="menu"
            aria-label="Services et expertises"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            variants={reduced ? reducedContainer : containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className={cn(
              "rounded-3xl p-8 shadow-2xl",
              panelClass,
              textTone,
            )}
          >

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-7">
            {COLUMNS.map((col) => {
              const Icon = col.Icon;
              return (
                <motion.div
                  key={col.key}
                  variants={reduced ? reducedContainer : colVariants}
                  className="flex flex-col"
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-[10px] border"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${col.iconColor} 18%, transparent)`,
                      borderColor: `color-mix(in srgb, ${col.iconColor} 30%, transparent)`,
                      color: col.iconColor,
                    }}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </div>
                  <p
                    className={cn(
                      "mb-3.5 mt-3 text-[11px] font-medium uppercase tracking-wider",
                      mutedTone,
                    )}
                  >
                    {col.tagline}
                  </p>
                  <h3 className="mb-1 font-display text-[15px] font-semibold">
                    {col.title}
                  </h3>
                  {col.subtitle && (
                    <p className={cn("mb-3 text-[12px]", mutedTone)}>{col.subtitle}</p>
                  )}
                  <ul className="flex flex-col gap-0.5">
                    {col.items.map((item) => (
                      <li key={item.label}>
                        <Link
                          role="menuitem"
                          to={item.to}
                          onClick={onClose}
                          className={cn(
                            "group flex items-center justify-between rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors",
                            hoverBg,
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                          )}
                        >
                          <span>{item.label}</span>
                          {item.soon ? (
                            <span className="rounded-full bg-amber-500/[0.18] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-300">
                              Soon
                            </span>
                          ) : (
                            <ArrowRight
                              size={14}
                              className="-translate-x-1 opacity-0 transition-all duration-200 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100"
                            />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MegaMenu;
