import { Link } from "@/lib/router-compat";
import type { BlogServiceLink } from "@/lib/blogServiceLinks";

interface Props {
  service?: BlogServiceLink | undefined;
}

const BlogArticleCTA = ({ service }: Props) => {
  const eyebrow = "Un projet à étudier ?";
  const title = service?.title ?? "Discutons de votre projet drone";
  const description =
    service?.description ??
    "Nettoyage, inspection, relevé d'ouvrage : on étudie chaque demande pour vous proposer la méthode la plus adaptée et un devis sous 48h.";
  const contactHref = service ? `/contact?expertise=${service.poleKey}` : "/contact";
  return (
    <section className="blog-cta">
      <div className="blog-cta__inner">
        <span className="blog-cta__eyebrow">{eyebrow}</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="blog-cta__buttons">
          <Link className="btn-primary" to={contactHref}>
            Demander un devis
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12,5 19,12 12,19" />
            </svg>
          </Link>
          {service ? (
            <Link className="btn-secondary" to={service.href}>
              {service.serviceLabel}
            </Link>
          ) : (
            <Link className="btn-secondary" to="/blog">
              Voir nos réalisations
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogArticleCTA;
