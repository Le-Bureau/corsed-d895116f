import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/router-compat";
import type { RelatedArticle } from "@/lib/relatedContent";

interface ServiceLink {
  label: string;
  href: string;
}

interface Props {
  /** Parent pole or sibling services. */
  services?: ServiceLink[];
  servicesTitle?: string;
  articles?: RelatedArticle[];
}

/**
 * "Pour aller plus loin": services and articles linked from a service page.
 * Server-rendered so search engines follow the links between related pages.
 */
const RelatedLinks = ({
  services = [],
  servicesTitle = "Nos autres prestations",
  articles = [],
}: Props) => {
  if (services.length === 0 && articles.length === 0) return null;

  return (
    <section
      aria-labelledby="related-links-title"
      className="bg-surface-elevated py-16 lg:py-20"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <h2
          id="related-links-title"
          className="font-display font-semibold tracking-[-0.03em] leading-[1.1] text-text-primary text-[clamp(24px,2.6vw,34px)] mb-8"
        >
          Pour aller plus loin
        </h2>
        <div className="grid gap-10 lg:grid-cols-2">
          {services.length > 0 && (
            <div>
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-4">
                {servicesTitle}
              </h3>
              <ul className="flex flex-col gap-2 list-none">
                {services.map((s) => (
                  <li key={s.href} className="list-none">
                    <Link
                      to={s.href}
                      className="group inline-flex items-center gap-2 text-[16px] font-semibold text-text-primary hover:text-logo-base-deep"
                    >
                      {s.label}
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {articles.length > 0 && (
            <div>
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-4">
                À lire sur le blog
              </h3>
              <ul className="flex flex-col gap-2 list-none">
                {articles.map((a) => (
                  <li key={a.slug} className="list-none">
                    <Link
                      to={`/blog/${a.slug}`}
                      className="text-[16px] text-text-primary underline decoration-border-default underline-offset-4 hover:decoration-logo-base-deep"
                    >
                      {a.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RelatedLinks;
