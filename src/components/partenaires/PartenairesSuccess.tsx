import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { PartnerFormData } from "@/lib/partners/partnerSchema";

interface PartenairesSuccessProps {
  data: PartnerFormData;
  onReset: () => void;
}

export function PartenairesSuccess({ data, onReset }: PartenairesSuccessProps) {
  return (
    <section
      id="candidature"
      role="region"
      aria-label="Candidature envoyée"
      className="relative bg-surface-elevated py-20 lg:py-28 scroll-mt-24"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <div className="max-w-[920px] mx-auto rounded-3xl bg-surface-card border border-border-subtle shadow-soft-lg p-10 lg:p-16 text-center">
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
            <Check className="h-8 w-8 text-emerald-600" strokeWidth={2.5} />
          </div>

          <h2 className="font-display text-3xl lg:text-4xl font-semibold tracking-[-0.02em] text-text-primary mb-4">
            Bien reçu, {data.fullName}.
          </h2>

          <p className="text-[15px] leading-relaxed text-text-secondary max-w-xl mx-auto mb-3">
            Nous étudions votre candidature et revenons vers vous sous 48h
            ouvrées à{" "}
            <span className="text-text-primary font-medium">{data.email}</span>.
          </p>

          <p className="text-[14px] leading-relaxed text-text-muted max-w-xl mx-auto mb-10">
            En cas d'urgence, vous pouvez nous appeler directement au{" "}
            <a
              href="tel:+33769977700"
              className="text-logo-base-deep hover:opacity-80 transition-opacity font-medium"
            >
              07 69 97 77 00
            </a>
            .
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-logo-base-deep text-white font-semibold text-[15px] px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(168,192,212,0.4), 0 8px 28px rgba(168,192,212,0.30)",
              }}
            >
              Retour à l'accueil
            </Link>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center justify-center rounded-full border border-border-default bg-transparent text-text-primary font-medium text-[15px] px-7 py-3.5 transition-all hover:bg-surface-bg hover:border-text-primary"
            >
              Une autre demande ?
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartenairesSuccess;
