import { ArrowRight } from "lucide-react";

interface InlineCTAProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

const InlineCTA = ({ title, subtitle, ctaLabel, ctaHref }: InlineCTAProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-surface-card border border-border-subtle shadow-soft-md p-8 lg:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      {/* Subtle accent mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 400px 200px at 0% 50%, rgba(168,192,212,0.15) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[640px]">
        <h3 className="font-display text-[24px] lg:text-[28px] font-semibold tracking-[-0.02em] text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-[15px] leading-relaxed text-text-secondary">{subtitle}</p>
      </div>
      <a
        href={ctaHref}
        className="relative group inline-flex items-center justify-center gap-2 rounded-full bg-logo-base-deep text-white font-semibold text-[15px] px-7 py-3.5 self-start md:self-auto transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
        style={{
          boxShadow:
            "0 0 0 1px rgba(168,192,212,0.4), 0 8px 28px rgba(168,192,212,0.30)",
        }}
      >
        {ctaLabel}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
};

export default InlineCTA;
