import { useFormContext, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import { Loader2, Send } from "lucide-react";
import type { ContactFormData } from "@/lib/contactSchema";
import { REQUEST_TYPE_LABELS, REQUEST_TYPES, type RequestType } from "@/lib/contactSchema";
import { REQUEST_TYPE_COLORS } from "@/lib/contactColors";
import { cn } from "@/lib/utils";

const labelBase =
  "block text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-text-on-dark-muted mb-2";

const inputBase =
  "w-full bg-transparent border-0 border-b-[1.5px] border-white/15 text-text-on-dark font-display text-base py-2.5 px-0 outline-none transition-colors duration-200 placeholder:text-white/25";

interface TabButtonProps {
  value: RequestType;
  label: string;
}

const TabButton = ({ value, label }: TabButtonProps) => {
  const { setValue } = useFormContext<ContactFormData>();
  const currentValue = useWatch<ContactFormData>({ name: "requestType" });
  const isActive = currentValue === value;
  const color = REQUEST_TYPE_COLORS[value];

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() =>
        setValue("requestType", value, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
      className="relative inline-flex items-center gap-2 px-4 py-3.5 bg-transparent border-0 font-display text-sm font-medium tracking-[-0.01em] whitespace-nowrap transition-colors duration-300 hover:text-text-on-dark"
      style={{
        color: isActive
          ? "hsl(var(--text-on-dark))"
          : "rgba(250, 250, 252, 0.55)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
        style={{
          backgroundColor: isActive ? color.base : "rgba(250,250,252,0.25)",
          boxShadow: isActive ? `0 0 10px ${color.base}` : "none",
        }}
      />
      {label}
      {isActive && (
        <span
          className="absolute left-3 right-3 -bottom-px h-[2px] rounded-full"
          style={{
            backgroundColor: color.base,
            boxShadow: `0 0 12px ${color.base}`,
          }}
        />
      )}
    </button>
  );
};

interface FieldProps {
  name: keyof ContactFormData;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  required?: boolean;
  helper?: string;
}

const FieldGroup = ({
  name,
  label,
  type = "text",
  placeholder,
  required,
  helper,
}: FieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<ContactFormData>();
  const error = errors[name];

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!error)
      e.currentTarget.style.borderBottomColor =
        "var(--contact-accent, hsl(var(--logo-base)))";
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!error) e.currentTarget.style.borderBottomColor = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className={labelBase}>
        {label}
        {required && (
          <span
            className="ml-1"
            style={{ color: "var(--contact-accent, hsl(var(--logo-base)))" }}
          >
            *
          </span>
        )}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          {...register(name)}
          placeholder={placeholder}
          rows={5}
          aria-invalid={!!error}
          className={cn(inputBase, "resize-y min-h-[140px] py-3")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      ) : (
        <input
          id={name}
          type={type}
          {...register(name)}
          placeholder={placeholder}
          aria-invalid={!!error}
          className={inputBase}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      {helper && !error && (
        <span className="text-xs text-white/40">{helper}</span>
      )}
      {error && (
        <span className="text-xs text-red-300" role="alert">
          {error.message?.toString()}
        </span>
      )}
    </div>
  );
};

const ContactForm = () => {
  const reduceMotion = useReducedMotion();
  const {
    register,
    formState: { errors, isSubmitting, isValid },
  } = useFormContext<ContactFormData>();

  const disabled = !isValid || isSubmitting;

  return (
    <div
      className="relative rounded-3xl overflow-hidden border border-white/[0.12]"
      style={{
        backgroundColor: "rgba(10, 14, 26, 0.4)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
      }}
    >
      {/* TAB BAR — top of card */}
      <div className="relative border-b border-white/[0.08]">
        <div className="overflow-x-auto md:overflow-x-visible scrollbar-hide">
          <div
            role="tablist"
            aria-label="Sujet de votre demande"
            className="flex items-center gap-1 px-4 md:px-6 min-w-max md:min-w-0 md:flex-wrap"
          >
            {REQUEST_TYPES.map((rt) => (
              <TabButton
                key={rt}
                value={rt}
                label={REQUEST_TYPE_LABELS[rt]}
              />
            ))}
          </div>
        </div>
        {/* Mobile fade gradient */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 bottom-0 w-12 pointer-events-none md:hidden"
          style={{
            background:
              "linear-gradient(to left, rgba(10,14,26,0.95) 0%, transparent 100%)",
          }}
        />
        {errors.requestType?.message && (
          <p className="px-6 pb-3 text-[12px] text-red-300/80" role="alert">
            {errors.requestType.message}
          </p>
        )}
      </div>

      {/* FORM BODY */}
      <div className="p-6 md:p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">
          <FieldGroup
            name="fullName"
            label="Nom complet"
            placeholder="Prénom Nom"
            required
          />
          <FieldGroup
            name="email"
            label="Email"
            type="email"
            placeholder="vous@email.com"
            required
          />
          <FieldGroup
            name="phone"
            label="Téléphone"
            type="tel"
            placeholder="06 XX XX XX XX"
            helper="Optionnel"
          />
        </div>

        <FieldGroup
          name="message"
          label="Votre message"
          type="textarea"
          placeholder="Décrivez votre projet, le contexte, les délais…"
          required
        />
      </div>

      {/* FOOTER */}
      <div className="px-6 md:px-10 py-6 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <label className="flex items-start gap-3 text-[12px] leading-relaxed text-text-on-dark-muted cursor-pointer max-w-xl">
          <input
            type="checkbox"
            {...register("rgpdConsent")}
            className="w-4 h-4 mt-0.5 flex-shrink-0 cursor-pointer"
            style={{
              accentColor: "var(--contact-accent, hsl(var(--logo-base)))",
            }}
          />
          <span>
            J'accepte que mes données soient traitées dans le cadre de cette
            demande conformément à la{" "}
            <Link
              to="/mentions-legales"
              className="underline hover:text-text-on-dark transition-colors"
              style={{
                color: "var(--contact-accent, hsl(var(--logo-base)))",
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
                  color: "var(--contact-accent, hsl(var(--logo-base)))",
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
