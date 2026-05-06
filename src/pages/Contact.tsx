import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  buildDefaultValues,
  contactSchema,
  type ContactFormData,
} from "@/lib/contactSchema";
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
    mode: "onSubmit",
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
    <section
      data-header-bg="dark"
      className="relative min-h-screen bg-surface-darker overflow-hidden"
    >
      {/* Ambient mesh */}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 1100px 700px at 15% 10%, rgba(168,192,212,0.18) 0%, transparent 60%), radial-gradient(ellipse 900px 600px at 85% 60%, rgba(80,130,172,0.14) 0%, transparent 65%)",
        }}
      />

      <ContactHero />

      <div className="relative z-[5] max-w-[1280px] mx-auto px-5 sm:px-10 pb-24 lg:pb-32">
        {submitted && submissionData ? (
          <ContactSuccess data={submissionData} onReset={handleReset} />
        ) : (
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              aria-label="Formulaire de contact"
              noValidate
              className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 lg:gap-14"
            >
              <div>
                <ContactForm />
              </div>
              <ContactRecap />
            </form>
          </FormProvider>
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
