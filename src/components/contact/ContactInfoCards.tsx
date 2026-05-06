import { Phone, Mail, MapPin, type LucideIcon } from "lucide-react";

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
    className="group block rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-all hover:border-white/[0.18] hover:bg-white/[0.04]"
  >
    <div className="w-10 h-10 rounded-xl bg-logo-base/15 border border-logo-base/20 flex items-center justify-center mb-5 transition-colors group-hover:bg-logo-base/25">
      <Icon className="w-[18px] h-[18px] text-logo-base" strokeWidth={2} />
    </div>
    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-on-dark-muted/70 mb-2">
      {label}
    </div>
    <div className="text-text-on-dark text-[16px] font-medium mb-1 break-words">
      {value}
    </div>
    <div className="text-[13px] text-text-on-dark-muted">{detail}</div>
  </a>
);

const ContactInfoCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
        detail="Voir sur la carte"
        href="https://maps.google.com/?q=7+Cours+Favale+Bastia"
        external
      />
    </div>
  );
};

export default ContactInfoCards;
