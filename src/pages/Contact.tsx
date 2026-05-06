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
import ContactRecap from "@/components/contact/ContactRecap";
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
      data-header-bg="dark"
      className="relative min-h-screen bg-surface-darker overflow-hidden"
      style={
        {
          "--contact-accent": accent.base,
          "--contact-accent-rgb": accent.rgb,
        } as React.CSSProperties
      }
    >
      {/* Base ambient mesh (always logo-tinted, full page with soft fade) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 1100px 700px at 15% 10%, rgba(168,192,212,0.14) 0%, transparent 60%), radial-gradient(ellipse 900px 600px at 85% 70%, rgba(80,130,172,0.10) 0%, transparent 65%)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      />

      {/* Accent ambient mesh — full page, soft edges, transitions on pole change */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 25%, rgba(var(--contact-accent-rgb), 0.10) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 25% 60%, rgba(var(--contact-accent-rgb), 0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 75% 85%, rgba(var(--contact-accent-rgb), 0.04) 0%, transparent 70%)",
          transition: "background 800ms ease-out",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
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
            className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14"
          >
            <div>
              <ContactForm />
            </div>
            <ContactRecap />
          </form>
        )}

        <div className="mt-20 lg:mt-28">
          <div className="mb-8 flex items-center gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-logo-base"
              style={{ boxShadow: "0 0 10px var(--logo-base)" }}
            />
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-text-on-dark-muted">
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
