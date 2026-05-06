import { useFormContext, useWatch } from "react-hook-form";
import { motion, useReducedMotion } from "motion/react";
import { Loader2, Send } from "lucide-react";
import type { ContactFormData } from "@/lib/contactSchema";
import { REQUEST_TYPE_LABELS } from "@/lib/contactSchema";

type SkeletonVariant = "short" | "medium" | "long" | "message";

function SkeletonLine({ variant = "short" }: { variant?: SkeletonVariant }) {
  if (variant === "message") {
    return (
      <div className="flex flex-col gap-1.5 py-0.5" aria-hidden="true">
        <div className="h-3.5 w-full rounded-full bg-white/[0.08] animate-pulse" />
        <div className="h-3.5 w-full rounded-full bg-white/[0.08] animate-pulse" />
        <div className="h-3.5 w-3/5 rounded-full bg-white/[0.08] animate-pulse" />
      </div>
    );
  }
  const widths: Record<Exclude<SkeletonVariant, "message">, string> = {
    short: "w-24",
    medium: "w-36",
    long: "w-44",
  };
  return (
    <div
      aria-hidden="true"
      className={`h-4 rounded-full bg-white/[0.08] animate-pulse ${widths[variant]}`}
    />
  );
}

interface RecapRowProps {
  label: string;
  value: string | undefined;
  skeleton: SkeletonVariant;
  truncate?: number;
}

function RecapRow({ label, value, skeleton, truncate }: RecapRowProps) {
  const reduceMotion = useReducedMotion();
  const trimmed = value?.trim();
  const displayValue = trimmed
    ? truncate && trimmed.length > truncate
      ? trimmed.substring(0, truncate) + "…"
      : trimmed
    : null;

  return (
    <div className="py-3 border-b border-white/5 last:border-0">
      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-on-dark-muted/70 mb-2">
        {label}
      </div>
      {displayValue ? (
        <motion.div
          key={displayValue}
          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[15px] text-text-on-dark break-words"
        >
          {displayValue}
        </motion.div>
      ) : (
        <SkeletonLine variant={skeleton} />
      )}
    </div>
  );
}

const ContactRecap = () => {
  const reduceMotion = useReducedMotion();
  const { control, formState } = useFormContext<ContactFormData>();
  const values = useWatch({ control });
  const { isSubmitting } = formState;

  const requestTypeLabel =
    values.requestType && values.requestType in REQUEST_TYPE_LABELS
      ? REQUEST_TYPE_LABELS[values.requestType as keyof typeof REQUEST_TYPE_LABELS]
      : undefined;

  return (
    <aside className="w-full">
      <div
        role="region"
        aria-label="Récapitulatif de votre demande"
        aria-live="polite"
        className="lg:sticky lg:top-[100px] rounded-3xl p-7 sm:p-8 relative overflow-hidden border border-white/[0.12]"
        style={{
          background: "rgba(10,14,26,0.4)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-[200px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(168,192,212,0.15) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/[0.08] relative z-10">
          <span
            className="w-1.5 h-1.5 rounded-full bg-logo-base"
            style={{ boxShadow: "0 0 10px var(--logo-base)" }}
          />
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-text-on-dark-muted">
            Récap de votre demande
          </span>
        </div>

        <div className="relative z-10">
          <RecapRow label="De" value={values.fullName} placeholder="Votre nom" />
          <RecapRow
            label="Email"
            value={values.email}
            placeholder="votre@email.com"
          />
          <RecapRow
            label="Téléphone"
            value={values.phone}
            placeholder="optionnel"
          />
          <RecapRow
            label="Sujet"
            value={requestTypeLabel}
            placeholder="à choisir"
          />
          <RecapRow
            label="Message"
            value={values.message}
            placeholder="quelques mots sur votre projet..."
            truncate={80}
          />
        </div>

        <div className="mt-6 pt-6 border-t border-white/[0.08] relative z-10">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="group w-full inline-flex items-center justify-center gap-2 rounded-full bg-logo-base text-surface-darker font-semibold text-[15px] px-6 py-3.5 transition-all hover:bg-logo-tint disabled:opacity-60 disabled:cursor-not-allowed"
            style={
              reduceMotion
                ? undefined
                : { transition: "transform 0.4s var(--ease-out-expo), background-color 0.3s ease" }
            }
            onMouseEnter={(e) => {
              if (!reduceMotion && !isSubmitting)
                (e.currentTarget as HTMLButtonElement).style.transform =
                  "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(0)";
            }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                Envoyer ma demande
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
          <p className="mt-3 text-[11px] text-center text-text-on-dark-muted/60">
            Réponse sous 24h ouvrées
          </p>
        </div>
      </div>
    </aside>
  );
};

export default ContactRecap;
