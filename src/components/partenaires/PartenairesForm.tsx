import { useState } from "react";
import { useForm, type UseFormRegister, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, Link } from "react-router-dom";
import { useReducedMotion } from "motion/react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  partnerSchema,
  type PartnerFormData,
} from "@/lib/partners/partnerSchema";
import { cn } from "@/lib/utils";
import { PartenairesSuccess } from "./PartenairesSuccess";

const labelBase =
  "block text-[11px] font-mono font-semibold uppercase tracking-[0.18em] text-text-on-dark-muted mb-2";

const inputBase =
  "w-full bg-transparent border-0 border-b-[1.5px] text-text-on-dark font-display text-base py-2.5 px-0 outline-none transition-colors duration-200 placeholder:text-white/25";

interface FieldGroupProps {
  name: keyof PartnerFormData;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  required?: boolean;
  register: UseFormRegister<PartnerFormData>;
  errors: FieldErrors<PartnerFormData>;
}

function FieldGroup({
  name,
  label,
  type = "text",
  placeholder,
  required,
  register,
  errors,
}: FieldGroupProps) {
  const error = errors[name];
  const errorId = `${name}-error`;

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!error) e.currentTarget.style.borderBottomColor = "hsl(var(--logo-base))";
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (!error) e.currentTarget.style.borderBottomColor = "";
  };

  const borderClass = error ? "border-red-300" : "border-white/15";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className={labelBase}>
        {label}
        {required && <span className="ml-1 text-logo-base">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          {...register(name)}
          placeholder={placeholder}
          rows={5}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(inputBase, borderClass, "resize-y min-h-[140px] py-3")}
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
          aria-describedby={error ? errorId : undefined}
          className={cn(inputBase, borderClass)}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}

      {error && (
        <span id={errorId} className="text-xs text-red-300" role="alert">
          {error.message?.toString()}
        </span>
      )}
    </div>
  );
}

const PartenairesForm = () => {
  const reduceMotion = useReducedMotion();
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<PartnerFormData | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: PartnerFormData) => {
    try {
      const { error } = await supabase.from("partner_applications").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        profession: data.profession,
        message: data.message,
        rgpd_consent: data.rgpdConsent,
        source: searchParams.get("source") || "partenaires-page",
      });

      if (error) throw error;

      setSubmissionData(data);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Partner application error:", err);
      toast.error(
        "Une erreur est survenue. Réessayez ou appelez-nous au 07 69 97 77 00.",
      );
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmissionData(null);
    reset();
  };

  if (submitted && submissionData) {
    return (
      <PartenairesSuccess data={submissionData} onReset={handleReset} />
    );
  }

  const disabled = !isValid || isSubmitting;

  return (
    <section
      data-header-bg="dark"
      id="candidature"
      role="region"
      aria-labelledby="candidature-title"
      className="relative bg-surface-dark text-text-on-dark py-16 lg:py-28 scroll-mt-24"
    >
      {/* Subtle ambient mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 800px 500px at 70% 20%, rgba(168,192,212,0.10) 0%, transparent 65%), radial-gradient(ellipse 700px 500px at 20% 80%, rgba(80,130,172,0.08) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          aria-label="Formulaire de candidature partenaire"
          noValidate
          className="max-w-[920px] mx-auto rounded-3xl overflow-hidden border border-white/[0.12]"
          style={{
            background: "rgba(10,14,26,0.4)",
            backdropFilter: "blur(28px) saturate(180%)",
            WebkitBackdropFilter: "blur(28px) saturate(180%)",
          }}
        >
          {/* HEADER */}
          <div className="px-6 md:px-10 pt-10 md:pt-12 pb-8 border-b border-white/[0.08]">
            <div className="inline-flex items-center gap-2 mb-4">
              <span
                className="w-1.5 h-1.5 rounded-full bg-logo-base"
                style={{ boxShadow: "0 0 10px hsl(var(--logo-base))" }}
                aria-hidden="true"
              />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-on-dark-muted">
                Faisons connaissance
              </span>
            </div>
            <h2
              id="candidature-title"
              className="font-display text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-text-on-dark mb-3"
            >
              Devenez partenaire Corse Drone.
            </h2>
            <p className="text-[15px] leading-relaxed text-text-on-dark-muted max-w-2xl">
              Quelques informations pour faire connaissance. Nous revenons
              vers vous sous 48h ouvrées avec une proposition d'accord
              adaptée à votre profil.
            </p>
          </div>

          {/* BODY */}
          <div className="p-6 md:p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
              <FieldGroup
                name="fullName"
                label="Nom complet"
                placeholder="Prénom Nom"
                required
                register={register}
                errors={errors}
              />
              <FieldGroup
                name="email"
                label="Email"
                type="email"
                placeholder="vous@email.com"
                required
                register={register}
                errors={errors}
              />
              <FieldGroup
                name="phone"
                label="Téléphone"
                type="tel"
                placeholder="06 XX XX XX XX"
                required
                register={register}
                errors={errors}
              />
              <FieldGroup
                name="profession"
                label="Profession / Activité"
                placeholder="Ex. Couvreur, Viticulteur, Bureau d'études…"
                required
                register={register}
                errors={errors}
              />
            </div>

            <FieldGroup
              name="message"
              label="Présentez votre activité"
              type="textarea"
              placeholder="Quelques mots sur votre métier, votre zone d'intervention, et ce que vous attendez d'un partenariat…"
              required
              register={register}
              errors={errors}
            />
          </div>

          {/* FOOTER */}
          <div className="px-6 md:px-10 py-6 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <label className="flex items-start gap-3 text-[12px] leading-relaxed text-text-on-dark-muted cursor-pointer max-w-xl">
              <input
                type="checkbox"
                {...register("rgpdConsent")}
                className="w-4 h-4 mt-0.5 flex-shrink-0 cursor-pointer"
                style={{ accentColor: "hsl(var(--logo-base))" }}
              />
              <span>
                J'accepte que mes données soient traitées dans le cadre de
                cette candidature conformément à la{" "}
                <Link
                  to="/mentions-legales"
                  className="text-logo-base underline hover:text-white transition-colors"
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
                  "0 0 0 1px rgba(168,192,212,0.4), 0 0 24px rgba(168,192,212,0.35), 0 8px 24px rgba(168,192,212,0.25)",
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
                  Envoyer mon message
                  <Send
                    className="w-4 h-4 text-logo-base transition-transform group-hover:translate-x-0.5"
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PartenairesForm;
