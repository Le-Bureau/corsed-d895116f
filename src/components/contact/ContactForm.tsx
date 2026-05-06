import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import { Loader2, Send } from "lucide-react";
import type { ContactFormData } from "@/lib/contactSchema";
import { REQUEST_TYPE_LABELS, REQUEST_TYPES } from "@/lib/contactSchema";
import { REQUEST_TYPE_COLORS } from "@/lib/contactColors";
import { cn } from "@/lib/utils";

const fieldBase =
  "block w-full bg-transparent border-0 border-b-2 border-white/15 text-text-on-dark focus:border-logo-base outline-none px-0 py-2.5 transition-colors font-display font-light placeholder:text-text-on-dark-muted/40 placeholder:italic";

const labelBase =
  "block text-[10px] font-mono font-semibold uppercase tracking-[0.18em] text-text-on-dark-muted/70 mb-2";

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  helper?: string;
  error?: string;
  children: React.ReactNode;
}

const Field = ({ label, htmlFor, required, helper, error, children }: FieldProps) => (
  <div>
    <label htmlFor={htmlFor} className={labelBase}>
      {label}
      {required && <span className="text-logo-base ml-1">*</span>}
      {helper && !required && (
        <span className="ml-2 normal-case tracking-normal font-sans font-normal text-text-on-dark-muted/50">
          ({helper})
        </span>
      )}
    </label>
    {children}
    {error && (
      <p className="mt-2 text-[12px] text-red-300/80" role="alert">
        {error}
      </p>
    )}
  </div>
);

const ContactForm = () => {
  const reduceMotion = useReducedMotion();
  const {
    register,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useFormContext<ContactFormData>();

  const disabled = !isValid || isSubmitting;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-10 text-text-on-dark-muted">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: "var(--contact-accent, var(--logo-base))",
            boxShadow: "0 0 10px var(--contact-accent, var(--logo-base))",
            transition: "background-color 600ms ease-out, box-shadow 600ms ease-out",
          }}
        />
        <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-text-on-dark-muted">
          Parlons de votre projet
        </span>
      </div>

      {/* Identity row: Name / Email / Phone */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8 mb-10">
        <Field
          label="Nom complet"
          htmlFor="fullName"
          required
          error={errors.fullName?.message}
        >
          <input
            id="fullName"
            type="text"
            aria-invalid={!!errors.fullName}
            placeholder="Prénom Nom"
            {...register("fullName")}
            className={fieldBase}
          />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email?.message}>
          <input
            id="email"
            type="email"
            aria-invalid={!!errors.email}
            placeholder="vous@email.com"
            {...register("email")}
            className={fieldBase}
          />
        </Field>
        <Field label="Téléphone" htmlFor="phone" helper="optionnel" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            aria-invalid={!!errors.phone}
            placeholder="06 XX XX XX XX"
            {...register("phone")}
            className={fieldBase}
          />
        </Field>
      </div>

      {/* Subject tabs */}
      <div className="mb-10">
        <div className={labelBase}>
          Sujet de votre demande<span className="text-logo-base ml-1">*</span>
        </div>
        <Controller
          control={control}
          name="requestType"
          render={({ field }) => (
            <div
              role="tablist"
              aria-label="Sujet"
              className="relative -mx-5 sm:mx-0"
            >
              <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide px-5 sm:px-0">
                <div className="flex gap-1.5 min-w-max md:min-w-0 md:flex-wrap">
                  {REQUEST_TYPES.map((rt) => {
                    const active = field.value === rt;
                    const color = REQUEST_TYPE_COLORS[rt];
                    return (
                      <button
                        key={rt}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => field.onChange(rt)}
                        className={cn(
                          "whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-medium transition-all duration-200",
                          active
                            ? "text-text-on-dark"
                            : "text-text-on-dark-muted border-white/10 bg-white/[0.02] hover:text-text-on-dark hover:border-white/20 hover:bg-white/[0.04]",
                        )}
                        style={
                          active
                            ? {
                                borderColor: `rgba(${color.rgb}, 0.55)`,
                                backgroundColor: `rgba(${color.rgb}, 0.14)`,
                                boxShadow: `0 0 0 1px rgba(${color.rgb}, 0.25), 0 6px 18px -6px rgba(${color.rgb}, 0.45)`,
                              }
                            : undefined
                        }
                      >
                        {REQUEST_TYPE_LABELS[rt]}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div
                className="absolute top-0 right-0 bottom-0 w-10 pointer-events-none md:hidden"
                style={{
                  background:
                    "linear-gradient(to left, rgba(10,14,26,0.9) 0%, transparent 100%)",
                }}
                aria-hidden="true"
              />
            </div>
          )}
        />
        {errors.requestType?.message && (
          <p className="mt-3 text-[12px] text-red-300/80" role="alert">
            {errors.requestType.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="mb-10">
        <Field
          label="Votre message"
          htmlFor="message"
          required
          error={errors.message?.message}
        >
          <textarea
            id="message"
            aria-invalid={!!errors.message}
            placeholder="Décrivez votre projet, le contexte, les délais…"
            {...register("message")}
            className={cn(fieldBase, "resize-y min-h-[140px] py-3")}
          />
        </Field>
      </div>

      {/* RGPD + submit */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-6 border-t border-white/[0.08]">
        <label className="flex items-start gap-3 text-[12px] leading-relaxed text-text-on-dark-muted cursor-pointer max-w-xl">
          <input
            type="checkbox"
            {...register("rgpdConsent")}
            className="w-4 h-4 mt-0.5 accent-logo-base flex-shrink-0 cursor-pointer"
            style={{ accentColor: "var(--contact-accent, var(--logo-base))" }}
          />
          <span>
            J'accepte que mes données soient traitées dans le cadre de cette
            demande conformément à la{" "}
            <Link
              to="/mentions-legales"
              className="underline hover:text-text-on-dark transition-colors"
              style={{
                color: "var(--contact-accent, var(--logo-base))",
                transition: "color 600ms ease-out",
              }}
            >
              politique de confidentialité
            </Link>
            .
            {errors.rgpdConsent?.message && (
              <span className="block mt-1 text-red-300/80">
                {errors.rgpdConsent.message}
              </span>
            )}
          </span>
        </label>

        <button
          type="submit"
          disabled={disabled}
          aria-busy={isSubmitting}
          className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-white text-surface-darker font-semibold text-[15px] px-7 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none whitespace-nowrap"
          style={{
            boxShadow:
              "0 0 0 1px rgba(var(--contact-accent-rgb, 168,192,212), 0.4), 0 0 24px rgba(var(--contact-accent-rgb, 168,192,212), 0.35), 0 8px 24px rgba(var(--contact-accent-rgb, 168,192,212), 0.25)",
            transition: reduceMotion
              ? "box-shadow 600ms ease-out, opacity 0.3s ease"
              : "box-shadow 600ms ease-out, transform 0.3s var(--ease-out-expo), opacity 0.3s ease",
          }}
          onMouseEnter={(e) => {
            if (!reduceMotion && !disabled)
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
              <Send
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                style={{
                  color: "var(--contact-accent, var(--logo-base))",
                  transition: "color 600ms ease-out, transform 0.3s ease",
                }}
              />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
