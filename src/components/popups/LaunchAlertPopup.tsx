import { useState, useEffect, FormEvent } from "react";
import { createPortal } from "react-dom";
import { X, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { POLES } from "@/lib/poles";
import { hexToRgb } from "@/lib/utils";

interface LaunchAlertPopupProps {
  isOpen: boolean;
  onClose: () => void;
  poleKey: string;
}

export function LaunchAlertPopup({ isOpen, onClose, poleKey }: LaunchAlertPopupProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pole = POLES.find((p) => p.key === poleKey);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!pole) return null;

  const poleColor = pole.baseColorOnLight;
  const poleColorRgb = hexToRgb(poleColor);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    const trimmedEmail = email.trim();
    const trimmedName = name.trim();
    const trimmedCompany = company.trim();

    if (!trimmedEmail || !trimmedName) {
      setError("Email et nom requis");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Email invalide");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const { error: insertError } = await supabase
      .from("pole_launch_alerts")
      .insert({
        email: trimmedEmail,
        name: trimmedName,
        company: trimmedCompany || null,
        pole: poleKey,
      });

    if (insertError) {
      setError("Une erreur est survenue. Réessayez.");
      setIsSubmitting(false);
      return;
    }

    setSuccess(true);
    setIsSubmitting(false);

    setTimeout(() => {
      onClose();
      setTimeout(() => {
        setEmail("");
        setName("");
        setCompany("");
        setSuccess(false);
      }, 300);
    }, 2500);
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-surface-darker/60 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="launch-alert-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[480px] bg-surface-card rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Top accent bar */}
            <div
              aria-hidden
              className="h-1 w-full"
              style={{ background: poleColor }}
            />

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute top-3 right-3 p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-surface-bg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-7 sm:p-8">
              {success ? (
                <div className="text-center py-4">
                  <div
                    className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
                    style={{ background: `rgba(${poleColorRgb}, 0.12)` }}
                  >
                    <Check className="w-7 h-7" style={{ color: poleColor }} strokeWidth={2.5} />
                  </div>
                  <h2 className="font-display font-semibold text-[22px] text-text-primary mb-2 tracking-tight">
                    Vous serez prévenu
                  </h2>
                  <p className="text-[14px] text-text-secondary leading-relaxed">
                    Dès que le pôle {pole.label} sera disponible,
                    <br />
                    vous recevrez un email à <span className="font-medium text-text-primary">{email}</span>.
                  </p>
                </div>
              ) : (
                <>
                  {/* Pole badge */}
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[10px] font-semibold tracking-[0.18em] uppercase mb-5"
                    style={{
                      background: `rgba(${poleColorRgb}, 0.10)`,
                      color: poleColor,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: poleColor, boxShadow: `0 0 8px ${poleColor}` }}
                    />
                    Pôle {pole.label}
                  </span>

                  <h2
                    id="launch-alert-title"
                    className="font-display font-semibold text-[24px] sm:text-[26px] text-text-primary leading-tight tracking-tight mb-2"
                  >
                    Soyez prévenu du lancement
                  </h2>
                  <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
                    Le pôle {pole.label} arrive bientôt. Laissez-nous votre email,
                    on vous écrit dès qu'il est dispo.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label htmlFor="lap-name" className="block text-[12px] font-medium text-text-secondary mb-1.5">
                        Nom
                      </label>
                      <input
                        id="lap-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoFocus
                        className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-surface-bg text-text-primary text-[14px] focus:outline-none focus:ring-2 focus:ring-text-primary/15 focus:border-transparent transition-all"
                        placeholder="Marc Dupont"
                      />
                    </div>

                    <div>
                      <label htmlFor="lap-email" className="block text-[12px] font-medium text-text-secondary mb-1.5">
                        Email
                      </label>
                      <input
                        id="lap-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-surface-bg text-text-primary text-[14px] focus:outline-none focus:ring-2 focus:ring-text-primary/15 focus:border-transparent transition-all"
                        placeholder="marc@exemple.fr"
                      />
                    </div>

                    <div>
                      <label htmlFor="lap-company" className="block text-[12px] font-medium text-text-secondary mb-1.5">
                        Entreprise (optionnel)
                      </label>
                      <input
                        id="lap-company"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-border-default bg-surface-bg text-text-primary text-[14px] focus:outline-none focus:ring-2 focus:ring-text-primary/15 focus:border-transparent transition-all"
                        placeholder="Mon entreprise"
                      />
                    </div>

                    {error && (
                      <p className="text-[13px] text-red-600" role="alert">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[14px] font-semibold text-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                      style={{
                        background: poleColor,
                        boxShadow: `0 4px 14px rgba(${poleColorRgb}, 0.30)`,
                      }}
                    >
                      {isSubmitting ? "Envoi..." : "Me prévenir"}
                      {!isSubmitting && (
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
                      )}
                    </button>

                    <p className="text-[11px] text-text-muted text-center pt-1">
                      Pas de spam. Un seul email au lancement.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
