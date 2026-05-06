import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  buildDefaultValues,
  contactSchema,
  type ContactFormData,
} from "@/lib/contactSchema";
import { DEFAULT_COLOR, REQUEST_TYPE_COLORS } from "@/lib/contactColors";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import ContactSuccess from "@/components/contact/ContactSuccess";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState<ContactFormData | null>(
    null,
  );

  const defaultValues = useMemo(
    () => buildDefaultValues(searchParams),
    [searchParams],
  );

  const methods = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultValues as unknown as Partial<ContactFormData>,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone || null,
        request_type: data.requestType,
        message: data.message,
        rgpd_consent: data.rgpdConsent,
        source: searchParams.get("source") || "contact-page",
      });
      if (error) throw error;
      setSubmissionData(data);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Contact submission error:", err);
      toast.error(
        "Une erreur est survenue. Réessayez ou appelez-nous au 07 69 97 77 00.",
      );
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setSubmissionData(null);
    methods.reset(defaultValues as unknown as Partial<ContactFormData>);
  };

  return (
    <FormProvider {...methods}>
      <ContactSection
        submitted={submitted}
        submissionData={submissionData}
        onSubmit={methods.handleSubmit(onSubmit)}
        onReset={handleReset}
      />
    </FormProvider>
  );
};

interface ContactSectionProps {
  submitted: boolean;
  submissionData: ContactFormData | null;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  onReset: () => void;
}

const ContactSection = ({
  submitted,
  submissionData,
  onSubmit,
  onReset,
}: ContactSectionProps) => {
  const requestType = useWatch<ContactFormData>({ name: "requestType" });
  const accent =
    requestType &&
    REQUEST_TYPE_COLORS[requestType as keyof typeof REQUEST_TYPE_COLORS]
      ? REQUEST_TYPE_COLORS[requestType as keyof typeof REQUEST_TYPE_COLORS]
      : DEFAULT_COLOR;

  return (
    <section
      className="relative min-h-screen pt-20 bg-surface-bg overflow-hidden"
      style={
        {
          "--contact-accent": accent.base,
          "--contact-accent-rgb": accent.rgb,
        } as React.CSSProperties
      }
    >
      {/* Subtle ambient mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 25%, rgba(var(--contact-accent-rgb), 0.05) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 25% 60%, rgba(var(--contact-accent-rgb), 0.04) 0%, transparent 70%)",
          transition: "background 800ms ease-out",
        }}
      />

      <ContactHero />

      <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10 pb-24 lg:pb-32">
        {submitted && submissionData ? (
          <ContactSuccess data={submissionData} onReset={onReset} />
        ) : (
          <form
            onSubmit={onSubmit}
            aria-label="Formulaire de contact"
            noValidate
            className="relative z-10"
          >
            <ContactForm />
          </form>
        )}

        <div className="mt-20 lg:mt-28">
          <div className="mb-8 flex items-center gap-2.5">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-logo-base shadow-[0_0_12px_rgba(168,192,212,0.5)]" />
              Autres moyens de nous joindre
            </span>
          </div>
          <ContactInfoCards />
        </div>
      </div>
    </section>
  );
};

export default Contact;
