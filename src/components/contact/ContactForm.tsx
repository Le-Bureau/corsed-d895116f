import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ContactFormData } from "@/lib/contactSchema";
import { REQUEST_TYPE_LABELS, REQUEST_TYPES } from "@/lib/contactSchema";

const inputBase =
  "inline-block bg-transparent border-0 border-b-2 border-logo-base/30 text-logo-base focus:text-text-on-dark focus:border-logo-base outline-none px-2 py-1 transition-colors font-display placeholder:text-logo-base/40 placeholder:italic";

const ContactForm = () => {
  const {
    register,
    control,
    formState: { errors, isSubmitted },
  } = useFormContext<ContactFormData>();

  const errorList = Object.entries(errors)
    .map(([key, err]) => ({ key, message: (err as { message?: string })?.message }))
    .filter((e) => e.message);

  return (
    <div
      className="text-text-on-dark font-display font-light tracking-tight leading-[1.6]"
      style={{ fontSize: "clamp(17px, 1.6vw, 22px)" }}
    >
      <div className="flex items-center gap-3 mb-8 text-text-on-dark-muted">
        <div className="w-8 h-px bg-text-on-dark-muted/40" />
        <span className="text-[11px] font-mono tracking-[0.18em] uppercase">
          Complétez la phrase, le récap se compose
          <span className="hidden lg:inline"> à droite</span>
          <span className="lg:hidden"> en dessous</span>
        </span>
      </div>
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-3">
        <span>Bonjour, je suis</span>
        <input
          type="text"
          aria-label="Votre nom complet"
          aria-invalid={!!errors.fullName}
          {...register("fullName")}
          placeholder="Prénom Nom"
          className={`${inputBase} w-[220px] max-w-full`}
        />
        <span>et on peut me joindre par mail à</span>
        <input
          type="email"
          aria-label="Votre email"
          aria-invalid={!!errors.email}
          {...register("email")}
          placeholder="vous@email.com"
          className={`${inputBase} w-[260px] max-w-full`}
        />
        <span>ou au téléphone</span>
        <input
          type="tel"
          aria-label="Votre téléphone (optionnel)"
          aria-invalid={!!errors.phone}
          {...register("phone")}
          placeholder="06 XX XX XX XX"
          className={`${inputBase} w-[180px] max-w-full`}
        />
        <span>.</span>
      </p>

      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-3 mt-8">
        <span>Je vous contacte au sujet de</span>
        <Controller
          control={control}
          name="requestType"
          render={({ field }) => (
            <Select
              value={field.value || ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                aria-label="Sujet de votre demande"
                aria-invalid={!!errors.requestType}
                className="inline-flex w-auto h-auto items-baseline bg-transparent border-0 border-b-2 focus:ring-0 focus:ring-offset-0 rounded-none px-2 pr-2 py-1 font-display font-normal text-[clamp(17px,1.6vw,22px)] leading-[1.6] tracking-[-0.025em] gap-2 [&>svg]:opacity-70 [&>svg]:w-4 [&>svg]:h-4 [&[data-placeholder]]:italic [&[data-placeholder]]:opacity-60"
                style={{
                  color: "var(--contact-accent, var(--logo-base))",
                  borderBottomColor:
                    "rgba(var(--contact-accent-rgb, 168,192,212), 0.45)",
                  transition:
                    "color 600ms ease-out, border-color 600ms ease-out",
                }}
              >
                <SelectValue placeholder="— choisissez —" />
              </SelectTrigger>
              <SelectContent
                className="border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden p-2 min-w-[280px] text-text-on-dark"
                style={{
                  background: "rgba(10,14,26,0.85)",
                  backdropFilter: "blur(28px) saturate(180%)",
                  WebkitBackdropFilter: "blur(28px) saturate(180%)",
                }}
              >
                {REQUEST_TYPES.map((rt) => (
                  <SelectItem
                    key={rt}
                    value={rt}
                    className="rounded-lg px-3 py-2.5 text-text-on-dark cursor-pointer focus:bg-logo-base/15 focus:text-logo-base data-[state=checked]:bg-logo-base/20 data-[state=checked]:text-logo-base data-[highlighted]:bg-logo-base/15 data-[highlighted]:text-logo-base transition-colors"
                  >
                    {REQUEST_TYPE_LABELS[rt]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <span>.</span>
      </p>

      <div className="mt-6">
        <p className="mb-3">Voici ce que j'ai en tête :</p>
        <textarea
          aria-label="Votre message"
          aria-invalid={!!errors.message}
          {...register("message")}
          placeholder="décrivez votre projet, le contexte, les délais..."
          className="block w-full bg-transparent border-0 border-b-2 border-logo-base/30 text-text-on-dark focus:border-logo-base outline-none px-2 py-3 mt-4 resize-y min-h-[100px] transition-colors font-display font-light placeholder:text-logo-base/40 placeholder:italic"
          style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}
        />
      </div>

      {isSubmitted && errorList.length > 0 && (
        <div
          role="alert"
          className="mt-10 text-sm text-red-300/90 space-y-1.5 rounded-xl border border-red-300/20 bg-red-500/5 p-4"
        >
          <p className="font-semibold uppercase tracking-[0.12em] text-[11px] text-red-200/80 mb-1">
            Quelques détails à compléter
          </p>
          {errorList.map((e) => (
            <p key={e.key}>• {e.message}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
