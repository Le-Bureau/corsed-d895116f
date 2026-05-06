import { useFormContext, useWatch } from "react-hook-form";
import { Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import { Loader2, Send } from "lucide-react";
import type { ContactFormData } from "@/lib/contactSchema";
import { REQUEST_TYPE_LABELS, REQUEST_TYPES, type RequestType } from "@/lib/contactSchema";
import { REQUEST_TYPE_COLORS } from "@/lib/contactColors";
import { cn } from "@/lib/utils";

const labelBase =
  "block text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-text-muted mb-2";

const inputBase =
  "w-full bg-transparent border-0 border-b-[1.5px] border-border-default text-text-primary font-display text-base py-2.5 px-0 outline-none transition-colors duration-200 placeholder:text-text-muted/50";

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
      className={cn(
        "relative inline-flex items-center gap-2 px-4 py-3.5 border-0 font-display text-sm font-medium tracking-[-0.01em] whitespace-nowrap cursor-pointer rounded-t-lg transition-all duration-200",
        !isActive && "hover:bg-surface-bg",
      )}
      style={{
        color: isActive ? color.base : "var(--text-muted)",
        backgroundColor: isActive ? `rgba(${color.rgb}, 0.06)` : undefined,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full transition-all duration-300"
        style={{
          backgroundColor: isActive ? color.base : "var(--border-default)",
          boxShadow: isActive ? `0 0 12px ${color.base}` : "none",
        }}
      />
      <span className="relative z-10">{label}</span>
      {isActive && (
        <span
          aria-hidden="true"
          className="absolute left-3 right-3 -bottom-px h-[2px] rounded-t-full"
          style={{
            backgroundColor: color.base,
            boxShadow: `0 0 16px ${color.base}40`,
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
        "var(--contact-accent, var(--logo-base-deep))";
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
            style={{ color: "var(--contact-accent, var(--logo-base-deep))" }}
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
          className={cn(inputBase, "resize-y min-h-[140px] py-3", error && "border-red-500")}
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
          className={cn(inputBase, error && "border-red-500")}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      {helper && !error && (
        <span className="text-xs text-text-muted">{helper}</span>
      )}
      {error && (
        <span className="text-xs text-red-600" role="alert">
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
    <div className="relative rounded-3xl overflow-hidden bg-surface-card border border-border-subtle shadow-soft-lg">
      {/* TAB BAR */}
      <div className="relative border-b border-border-subtle">
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
              "linear-gradient(to left, var(--surface-card) 0%, transparent 100%)",
          }}
        />
        {errors.requestType?.message && (
          <p className="px-6 pb-3 text-[12px] text-red-600" role="alert">
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
      <div className="px-6 md:px-10 py-6 border-t border-border-subtle bg-surface-elevated/40 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <label className="flex items-start gap-3 text-[12px] leading-relaxed text-text-muted cursor-pointer max-w-xl">
          <input
            type="checkbox"
            {...register("rgpdConsent")}
            className="w-4 h-4 mt-0.5 flex-shrink-0 cursor-pointer"
            style={{
              accentColor: "var(--contact-accent, var(--logo-base-deep))",
            }}
          />
          <span>
            J'accepte que mes données soient traitées dans le cadre de cette
            demande conformément à la{" "}
            <Link
              to="/mentions-legales"
              className="underline hover:opacity-80 transition-opacity"
              style={{
                color: "var(--contact-accent, var(--logo-base-deep))",
                transition: "color 600ms ease-out",
              }}
            >
              politique de confidentialité
            </Link>
            .
            {errors.rgpdConsent?.message && (
              <span className="block mt-1 text-red-600">
                {errors.rgpdConsent.message}
              </span>
            )}
          </span>
        </label>

        <button
          type="submit"
          disabled={disabled}
          aria-busy={isSubmitting}
          className="group relative inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold text-[15px] px-7 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none whitespace-nowrap"
          style={{
            backgroundColor: "var(--contact-accent, var(--logo-base-deep))",
            boxShadow:
              "0 0 0 1px rgba(var(--contact-accent-rgb, 79,111,142), 0.4), 0 8px 28px rgba(var(--contact-accent-rgb, 79,111,142), 0.30)",
            transition: reduceMotion
              ? "background-color 600ms ease-out, box-shadow 600ms ease-out, opacity 0.3s ease"
              : "background-color 600ms ease-out, box-shadow 600ms ease-out, transform 0.3s var(--ease-out-expo), opacity 0.3s ease",
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
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
