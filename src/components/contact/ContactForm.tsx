import { useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import type { ContactFormData } from "@/lib/contactSchema";
import { REQUEST_TYPE_LABELS, REQUEST_TYPES } from "@/lib/contactSchema";

const inputBase =
  "inline-block bg-transparent border-0 border-b-2 border-logo-base/30 text-logo-base focus:text-text-on-dark focus:border-logo-base outline-none px-2 py-1 transition-colors font-display placeholder:text-logo-base/40 placeholder:italic";

const ContactForm = () => {
  const {
    register,
    formState: { errors, isSubmitted },
  } = useFormContext<ContactFormData>();

  const errorList = Object.entries(errors)
    .map(([key, err]) => ({ key, message: (err as { message?: string })?.message }))
    .filter((e) => e.message);

  return (
    <div
      className="text-text-on-dark font-display font-light tracking-tight leading-[1.55]"
      style={{ fontSize: "clamp(20px, 2.4vw, 30px)" }}
    >
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-3">
        <span>Bonjour, je suis</span>
        <input
          type="text"
          aria-label="Votre nom complet"
          aria-invalid={!!errors.fullName}
          {...register("fullName")}
          placeholder="Prénom Nom"
          className={`${inputBase} w-[260px] max-w-full`}
        />
        <span>et on peut me joindre par mail à</span>
        <input
          type="email"
          aria-label="Votre email"
          aria-invalid={!!errors.email}
          {...register("email")}
          placeholder="vous@email.com"
          className={`${inputBase} w-[280px] max-w-full`}
        />
        <span>ou au téléphone</span>
        <input
          type="tel"
          aria-label="Votre téléphone (optionnel)"
          aria-invalid={!!errors.phone}
          {...register("phone")}
          placeholder="06 XX XX XX XX"
          className={`${inputBase} w-[200px] max-w-full`}
        />
        <span>.</span>
      </p>

      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-3 mt-8">
        <span>Je vous contacte au sujet de</span>
        <span className="inline-block relative">
          <select
            aria-label="Sujet de votre demande"
            aria-invalid={!!errors.requestType}
            {...register("requestType")}
            className={`${inputBase} appearance-none cursor-pointer pr-8`}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23A8C0D4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 8px center",
            }}
          >
            <option value="">— choisissez —</option>
            {REQUEST_TYPES.map((rt) => (
              <option key={rt} value={rt}>
                {REQUEST_TYPE_LABELS[rt]}
              </option>
            ))}
          </select>
        </span>
        <span>.</span>
      </p>

      <div className="mt-8">
        <p className="mb-3">Voici ce que j'ai en tête :</p>
        <textarea
          aria-label="Votre message"
          aria-invalid={!!errors.message}
          {...register("message")}
          placeholder="décrivez votre projet, le contexte, les délais..."
          className="block w-full bg-transparent border-0 border-b-2 border-logo-base/30 text-text-on-dark focus:border-logo-base outline-none px-2 py-3 resize-y min-h-[140px] transition-colors font-display font-light placeholder:text-logo-base/40 placeholder:italic"
          style={{ fontSize: "clamp(18px, 2vw, 22px)" }}
        />
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-6">
        {isSubmitted && errorList.length > 0 && (
          <div
            role="alert"
            className="text-sm text-red-300/90 space-y-1.5 rounded-xl border border-red-300/20 bg-red-500/5 p-4"
          >
            <p className="font-semibold uppercase tracking-[0.12em] text-[11px] text-red-200/80 mb-1">
              Quelques détails à compléter
            </p>
            {errorList.map((e) => (
              <p key={e.key}>• {e.message}</p>
            ))}
          </div>
        )}

        <label className="flex items-start gap-3 text-[13px] leading-relaxed text-text-on-dark-muted cursor-pointer">
          <input
            type="checkbox"
            {...register("rgpdConsent")}
            className="w-[18px] h-[18px] mt-0.5 accent-logo-base flex-shrink-0 cursor-pointer"
          />
          <span>
            J'accepte que mes données soient traitées dans le cadre de cette
            demande conformément à la{" "}
            <Link
              to="/mentions-legales"
              className="text-logo-base underline hover:text-text-on-dark transition-colors"
            >
              politique de confidentialité
            </Link>
            .
          </span>
        </label>
      </div>
    </div>
  );
};

export default ContactForm;
