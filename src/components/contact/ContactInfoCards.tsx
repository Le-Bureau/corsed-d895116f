import { Phone, Mail, MapPin, ArrowUpRight, type LucideIcon } from "lucide-react";

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
  href: string;
  external?: boolean;
}

const InfoCard = ({
  icon: Icon,
  label,
  value,
  detail,
  href,
  external,
}: InfoCardProps) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noreferrer noopener" : undefined}
    className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-logo-base/30 hover:bg-white/[0.04] hover:shadow-[0_18px_48px_-20px_rgba(168,192,212,0.35)]"
  >
    {/* Accent gradient on hover */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(ellipse 280px 200px at 100% 0%, rgba(168,192,212,0.18) 0%, transparent 70%)",
      }}
    />

    <div className="relative">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-logo-base/20 bg-logo-base/[0.08] transition-all duration-300 group-hover:scale-105 group-hover:border-logo-base/40 group-hover:bg-logo-base/[0.15]">
        <Icon className="h-[18px] w-[18px] text-logo-base" strokeWidth={2} />
      </div>

      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-text-on-dark-muted/70">
        {label}
      </div>

      <div className="mb-2 break-words font-display text-lg font-medium text-text-on-dark">
        {value}
      </div>

      <div className="flex items-center gap-1.5 text-[13px] text-text-on-dark-muted">
        <span>{detail}</span>
        <ArrowUpRight
          className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-logo-base"
          strokeWidth={2.2}
        />
      </div>
    </div>
  </a>
);

const ContactInfoCards = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <InfoCard
        icon={Phone}
        label="Téléphone"
        value="07 69 97 77 00"
        detail="Lun-Ven 9h-18h"
        href="tel:+33769977700"
      />
      <InfoCard
        icon={Mail}
        label="Email"
        value="contact@corse-drone.com"
        detail="Réponse sous 24h"
        href="mailto:contact@corse-drone.com"
      />
      <InfoCard
        icon={MapPin}
        label="Adresse"
        value="7 Cours Favale, Bastia"
        detail="Ouvrir dans Google Maps"
        href="https://maps.google.com/?q=7+Cours+Favale+Bastia"
        external
      />
    </div>
  );
};

export default ContactInfoCards;
