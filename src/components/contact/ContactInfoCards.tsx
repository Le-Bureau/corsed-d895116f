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
    className="group relative block overflow-hidden rounded-2xl border border-border-subtle bg-surface-card shadow-soft-md p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg hover:border-logo-base/40"
  >
    <div className="relative">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-logo-base/25 bg-logo-base/10 transition-all duration-300 group-hover:scale-105">
        <Icon className="h-[18px] w-[18px] text-logo-base-deep" strokeWidth={2} />
      </div>

      <div className="mb-2 text-[11px] font-mono font-semibold uppercase tracking-[0.22em] text-text-muted">
        {label}
      </div>

      <div className="mb-2 break-words font-display text-lg font-medium text-text-primary">
        {value}
      </div>

      <div className="flex items-center gap-1.5 text-[13px] text-text-muted">
        <span>{detail}</span>
        <ArrowUpRight
          className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-logo-base-deep"
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
        href="https://www.google.com/maps/search/?api=1&query=7+Cours+Favale+Bastia"
        external
      />
    </div>
  );
};

export default ContactInfoCards;
