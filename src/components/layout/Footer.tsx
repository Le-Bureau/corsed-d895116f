import { Link } from "@/lib/router-compat";
import { Instagram } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import BrandLogo from "./BrandLogo";
import { POLES } from "@/lib/poles";
import { EXPERTISES } from "@/lib/expertises";
import { CONTACT } from "@/lib/contact";
import { SUB_POLE_CONTENT } from "@/lib/sub-poles";
import { LOCAL_AREAS } from "@/lib/localAreas";

// North to south.
const ZONE_LINKS = (["bastia", "balagne", "corte", "sud", "portoVecchio"] as const).map(
  (k) => LOCAL_AREAS[k],
);

const colTitle =
  "text-[11px] font-semibold tracking-[0.18em] uppercase text-text-on-dark-muted mb-1";

const linkBase =
  "text-sm font-medium text-text-on-dark-muted hover:text-text-on-dark hover:translate-x-0.5 transition-all duration-200 motion-reduce:transform-none";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[3fr_3fr_2fr_2fr_3fr] gap-10 lg:gap-12 pb-16 md:pb-20">
          {/* COL 1 — BRAND */}
          <FadeInWhenVisible delay={0}>
            <div className="flex flex-col gap-6">
              <BrandLogo variant="on-dark" />

              <p className="text-sm leading-relaxed text-text-on-dark-muted max-w-[380px]">
                La première solution globale de logistique et services par drone
                en Corse. Innovation, rapidité, respect de l'environnement.
              </p>

              <p className="text-xs leading-relaxed text-text-on-dark-muted">
                {CONTACT.name}
                <br />
                {CONTACT.streetAddress}, {CONTACT.postalCode} {CONTACT.city}
              </p>

              <div className="flex gap-2 mt-2">
                <a
                  href="https://www.instagram.com/corsedrone/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.05] border border-white/[0.12] text-text-on-dark-muted backdrop-blur-md transition-all duration-200 ease-out hover:border-logo-base hover:text-logo-base hover:-translate-y-0.5 motion-reduce:transform-none"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* COL 2 — POLES, THEIR SERVICE PAGES, SUR DEVIS
              Every service page is listed here: the header mega menu is only
              built on click, so this column is how crawlers reach them. */}
          <FadeInWhenVisible delay={0.1}>
            <div className="flex flex-col gap-4">
              <h3 className={colTitle}>Pôles et services</h3>
              <ul className="flex flex-col gap-4">
                {POLES.map((p) => {
                  const pages = Object.keys(SUB_POLE_CONTENT[p.key] ?? {});
                  return (
                    <li key={p.key} className="flex flex-col gap-2">
                      <span className="flex items-center gap-2">
                        <span
                          className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: p.baseColorOnDark ?? p.baseColorOnLight }}
                          aria-hidden="true"
                        />
                        <Link to={`/pole/${p.slug}`} className={linkBase}>
                          {p.label}
                        </Link>
                        {p.comingSoon && (
                          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-semibold">
                            Bientôt
                          </span>
                        )}
                      </span>
                      {pages.length > 0 && (
                        <ul className="flex flex-col gap-1.5 pl-3.5">
                          {pages.map((sub) => (
                            <li key={sub}>
                              <Link
                                to={`/pole/${p.slug}/${sub}`}
                                className="block text-[13px] text-text-on-dark-muted/80 hover:text-text-on-dark transition-colors duration-200"
                              >
                                {p.subServices.find((x) => x.slug === sub)?.name ??
                                  SUB_POLE_CONTENT[p.key]?.[sub]?.seoTitle}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="h-2" />

              <h3 className={colTitle}>Sur devis</h3>
              <ul className="flex flex-col gap-3">
                {EXPERTISES.map((e) => (
                  <li key={e.key}>
                    <Link to={e.href ?? `/contact?expertise=${e.slug}`} className={`block ${linkBase}`}>
                      {e.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>

          {/* COL 3 — ZONES */}
          <FadeInWhenVisible delay={0.15}>
            <div className="flex flex-col gap-4">
              <h3 className={colTitle}>Zones d'intervention</h3>
              <ul className="flex flex-col gap-3">
                {ZONE_LINKS.map((z) => (
                  <li key={z.path}>
                    <Link to={z.path} className={`block ${linkBase}`}>
                      {z.breadcrumb}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInWhenVisible>

          {/* COL 4 — SOCIETE */}
          <FadeInWhenVisible delay={0.2}>
            <div className="flex flex-col gap-4">
              <h3 className={colTitle}>Société</h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link to="/realisations" className={`block ${linkBase}`}>
                    Réalisations
                  </Link>
                </li>
                <li>
                  <Link to="/outils" className={`block ${linkBase}`}>
                    Nos outils : Axio et Spectra
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className={`block ${linkBase}`}>
                    Blog
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
                  <Link to="/politique-confidentialite" className={`block ${linkBase}`}>
                    Politique de confidentialité
                  </Link>
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
                  href={CONTACT.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactValue}
                >
                  {CONTACT.streetAddress}
                  <br />
                  {CONTACT.postalCode} {CONTACT.city}, Corse
                </a>
              </div>

              <div className="flex flex-col gap-1">
                <span className={contactLabel}>Téléphone</span>
                <a href={CONTACT.phoneLink} className={contactValue}>
                  {CONTACT.phone}
                </a>
              </div>

              <div className="flex flex-col gap-1">
                <span className={contactLabel}>Email</span>
                <a href={CONTACT.emailLink} className={contactValue}>
                  {CONTACT.email}
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
              <span>© 2026 {CONTACT.name}</span>
              <span aria-hidden>·</span>
              <Link to="/mentions-legales" className="hover:text-text-on-dark transition-colors">
                Mentions légales
              </Link>
              <span aria-hidden>·</span>
              <Link to="/politique-confidentialite" className="hover:text-text-on-dark transition-colors">
                Confidentialité
              </Link>
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
