import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router-compat";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { POLES } from "@/lib/poles";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface-bg">
      <Header />
      <main className="relative isolate flex-1 overflow-hidden px-5 sm:px-10 pt-36 pb-24 lg:pt-44 lg:pb-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 20%, rgba(80,130,172,0.12) 0%, transparent 55%)," +
              "radial-gradient(ellipse at 85% 80%, rgba(168,192,212,0.18) 0%, transparent 55%)",
          }}
        />

        <div className="max-w-[1100px] mx-auto">
          <div className="text-center">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-8">
              <span
                className="w-1.5 h-1.5 rounded-full bg-pole-nettoyage-base"
                aria-hidden="true"
              />
              Erreur 404 · page introuvable
            </span>
            <h1 className="font-display font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary text-[clamp(40px,6vw,80px)] mb-6 max-w-[900px] mx-auto">
              Ce vol n'a pas trouvé sa destination.
            </h1>
            <p className="text-text-secondary leading-relaxed max-w-[620px] mx-auto mb-10 text-[clamp(16px,1.4vw,19px)]">
              La page que vous cherchez n'existe pas ou a été déplacée. Reprenez
              votre route depuis l'un de nos pôles, ou dites-nous ce dont vous
              avez besoin.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Link
                to="/"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-pole-nettoyage-base text-white font-semibold text-[15px] px-7 py-3.5 transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transform-none"
              >
                Retour à l'accueil
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full font-semibold text-[15px] px-7 py-3.5 border-2 bg-surface-card text-text-primary border-border-subtle hover:border-pole-nettoyage-base transition-colors duration-300"
              >
                Demander un devis
              </Link>
            </div>
          </div>

          <nav aria-label="Nos pôles" className="mt-20 lg:mt-24">
            <p className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted text-center mb-6">
              Nos pôles d'expertise
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none">
              {POLES.map((pole) => (
                <li key={pole.key} className="list-none">
                  <Link
                    to={`/pole/${pole.slug}`}
                    className="group flex h-full flex-col gap-3 rounded-2xl bg-white border border-border-subtle shadow-soft-sm p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md motion-reduce:transform-none"
                    style={{ ["--card-color" as string]: pole.baseColorOnLight }}
                  >
                    <span className="flex items-center justify-between">
                      <span
                        className="font-display text-[22px] font-semibold tracking-[-0.02em]"
                        style={{ color: "var(--card-color)" }}
                      >
                        {pole.label}
                      </span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
                        style={{ color: "var(--card-color)" }}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm leading-relaxed text-text-secondary">
                      {pole.title}
                    </span>
                    {pole.comingSoon && (
                      <span className="mt-auto font-mono text-[10px] font-semibold tracking-[0.16em] uppercase text-text-muted">
                        Bientôt disponible
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-10 text-center text-sm text-text-secondary">
            Vous cherchiez un article ?{" "}
            <Link
              to="/blog"
              className="font-semibold text-text-primary underline decoration-border-subtle underline-offset-4 hover:decoration-pole-nettoyage-base"
            >
              Voir le blog
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
