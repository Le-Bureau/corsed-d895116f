import { ArrowRight } from "lucide-react";

interface InlineCTAProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

const InlineCTA = ({ title, subtitle, ctaLabel, ctaHref }: InlineCTAProps) => {
  return (
    <div
      className="rounded-3xl border border-white/10 p-8 lg:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
      style={{
        background: "rgba(10,14,26,0.4)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
      }}
    >
      <div className="max-w-[640px]">
        <h3 className="font-display text-[24px] lg:text-[28px] font-semibold tracking-[-0.02em] text-text-on-dark mb-2">
          {title}
        </h3>
        <p className="text-[15px] leading-relaxed text-text-on-dark-muted">{subtitle}</p>
      </div>
      <a
        href={ctaHref}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-white text-surface-darker font-semibold text-[15px] px-7 py-3.5 self-start md:self-auto transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 whitespace-nowrap"
        style={{
          boxShadow:
            "0 0 0 1px rgba(168,192,212,0.4), 0 0 24px rgba(168,192,212,0.35), 0 8px 24px rgba(168,192,212,0.25)",
        }}
      >
        {ctaLabel}
        <ArrowRight className="w-4 h-4 text-logo-deep transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
};

export default InlineCTA;
