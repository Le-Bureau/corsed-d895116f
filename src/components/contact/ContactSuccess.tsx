import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ContactFormData } from "@/lib/contactSchema";

interface ContactSuccessProps {
  data: ContactFormData;
  onReset: () => void;
}

const ContactSuccess = ({ data, onReset }: ContactSuccessProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[640px] mx-auto text-center rounded-3xl border border-white/[0.1] bg-white/[0.03] p-10 sm:p-14"
      style={{
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
      }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-logo-base/15 border border-logo-base/30 mb-6">
        <Check className="w-7 h-7 text-logo-base" strokeWidth={2.5} />
      </div>
      <h2 className="font-display font-semibold text-text-on-dark text-[clamp(28px,3.5vw,42px)] leading-[1.1] tracking-tight mb-5">
        Demande bien reçue, {data.fullName.split(" ")[0]}.
      </h2>
      <p className="text-text-on-dark-muted text-[16px] leading-relaxed mb-8">
        Nous revenons vers vous sous 24h ouvrées à l'adresse{" "}
        <span className="text-logo-base">{data.email}</span>.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-logo-base text-surface-darker font-semibold text-[15px] px-6 py-3 transition-all hover:bg-logo-tint"
        >
          Retour à l'accueil
          <ArrowRight className="w-4 h-4" />
        </Link>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 text-text-on-dark font-medium text-[15px] px-6 py-3 transition-all hover:bg-white/5"
        >
          Nouvelle demande
        </button>
      </div>
    </motion.div>
  );
};

export default ContactSuccess;
