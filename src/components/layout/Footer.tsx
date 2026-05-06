import { Link } from "react-router-dom";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import BrandLogo from "./BrandLogo";
import { POLES } from "@/lib/poles";
import { EXPERTISES } from "@/lib/expertises";

const colTitle =
  "text-[11px] font-semibold tracking-[0.18em] uppercase text-text-on-dark-muted mb-1";

const linkBase =
  "text-sm font-medium text-text-on-dark-muted hover:text-text-on-dark hover:translate-x-0.5 transition-all duration-200";

const contactLabel =
  "text-[11px] tracking-[0.18em] uppercase font-semibold text-text-on-dark-muted";

const contactValue =
  "text-sm text-text-on-dark hover:text-logo-base transition-colors leading-snug font-medium";

const Footer = () => {
  return (
    <footer
      data-header-bg="dark"
      className="relative isolate overflow-hidden bg-surface-darker text-text-on-dark border-t border-white/[0.06]"
    >
      {/* Subtle ambient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(80,130,172,0.18) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 90% 100%, rgba(168,192,212,0.08) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 sm:px-10 pt-16 md:pt-24">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[4fr_2fr_2fr_3fr] gap-10 lg:gap-16 pb-16 md:pb-20">
          {/* COL 1 — BRAND */}
          <FadeInWhenVisible delay={0}>
            <div className="flex flex-col gap-6">
              <BrandLogo variant="on-dark" />

              <p className="text-sm leading-relaxed text-text-on-dark-muted max-w-[380px]">
                La première solution globale de logistique et services par drone
                en Corse. Innovation, rapidité, respect de l'environnement.
              </p>

              <p className="text-xs leading-relaxed text-text-on-dark-muted">
                SAS Corse Drone Services
                <br />
                7 Cours Favale, 20200 Bastia
              </p>

              <div className="flex gap-2 mt-2">
                {[
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Linkedin, label: "LinkedIn" },
                  { Icon: Facebook, label: "Facebook" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.12] text-text-on-dark-muted backdrop-blur-md transition-all duration-200 ease-out hover:border-logo-base hover:text-logo-base hover:-translate-y-0.5"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </FadeInWhenVisible>

          {/* COL 2 — POLES + EXPERTISES */}
          <FadeInWhenVisible delay={0.1}>
            <div className="flex flex-col gap-4">
              <h3 className={colTitle}>Pôles d'expertise</h3>
              <ul className="flex flex-col gap-3">
                {POLES.map((p) => (
                  <li key={p.key}>
                    <Link to={`/pole/${p.slug}`} className={`flex items-center gap-2 ${linkBase}`}>
                      <span
                        className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: p.baseColorOnDark ?? p.baseColorOnLight }}
                      />
                      <span>{p.label}</span>
                      {p.comingSoon && (
                        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-semibold ml-1">
                          Soon
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="h-3" />

              <h3 className={colTitle}>Sur devis</h3>
              <ul className="flex flex-col gap-3">
                {EXPERTISES.map((e) => (
                  <li key={e.key}>
                    <Link to={`/expertises#${e.slug}`} className={`block ${linkBase}`}>
                      {e.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>

          {/* COL 3 — SOCIETE */}
          <FadeInWhenVisible delay={0.2}>
            <div className="flex flex-col gap-4">
              <h3 className={colTitle}>Société</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link to="/#about" className={`block ${linkBase}`}>
                    À propos
                  </Link>
                </li>
                <li>
                  <Link to="/partenaires" className={`block ${linkBase}`}>
                    Programme partenaires
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={`block ${linkBase}`}>
                    Contact
                  </Link>
                </li>
              </ul>

              <div className="h-3" />

              <h3 className={colTitle}>Légal</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link to="/mentions-legales" className={`block ${linkBase}`}>
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <a href="#" className={`block ${linkBase}`}>
                    Politique de confidentialité
                  </a>
                </li>
              </ul>
            </div>
          </FadeInWhenVisible>

          {/* COL 4 — CONTACT */}
          <FadeInWhenVisible delay={0.3}>
            <div className="flex flex-col gap-5">
              <h3 className={colTitle}>Contact</h3>

              <div className="flex flex-col gap-1">
                <span className={contactLabel}>Adresse</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=7+Cours+Favale+Bastia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactValue}
                >
                  7 Cours Favale
                  <br />
                  20200 Bastia, Corse
                </a>
              </div>

              <div className="flex flex-col gap-1">
                <span className={contactLabel}>Téléphone</span>
                <a href="tel:0604501120" className={contactValue}>
                  06 04 50 11 20
                </a>
              </div>

              <div className="flex flex-col gap-1">
                <span className={contactLabel}>Email</span>
                <a href="mailto:contact@corse-drone.com" className={contactValue}>
                  contact@corse-drone.com
                </a>
              </div>

              <div className="flex flex-col gap-1">
                <span className={contactLabel}>Couverture</span>
                <span className="text-sm font-normal text-text-on-dark-muted leading-snug">
                  Intervention dans toute la Corse
                </span>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>

        {/* BOTTOM ROW */}
        <FadeInWhenVisible delay={0.4}>
          <div className="flex flex-wrap justify-between items-center gap-6 py-6 md:py-8 border-t border-white/[0.08] text-xs text-text-on-dark-muted">
            <div className="flex flex-wrap items-center gap-6">
              <span>© 2026 Corse Drone Services</span>
              <span aria-hidden>·</span>
              <Link to="/mentions-legales" className="hover:text-text-on-dark transition-colors">
                Mentions légales
              </Link>
              <span aria-hidden>·</span>
              <a href="#" className="hover:text-text-on-dark transition-colors">
                Confidentialité
              </a>
            </div>

            <a
              href="https://lebureaubastia.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-text-on-dark-muted hover:text-text-on-dark transition-colors"
            >
              Site conçu par
              <span className="w-4 h-4 rounded bg-white/15 text-text-on-dark inline-flex items-center justify-center font-display text-[9px] font-extrabold transition-colors group-hover:bg-white/25">
                LB
              </span>
              L'Agence Le Bureau
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </footer>
  );
};

export default Footer;
