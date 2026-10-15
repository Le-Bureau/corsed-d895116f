import { MapPin, ArrowRight } from "lucide-react";
import { Link } from "@/lib/router-compat";
import { LOCAL_AREAS, ZONE_ORDER } from "@/lib/localAreas";


interface Props {
  /** Path of the current page, left out of the list. */
  exclude?: string;
  title?: string;
}

/**
 * "Zones d'intervention" links to every local page. Rendered on the server so
 * search engines reach the local pages from the services, not only the footer.
 */
const ZonesBlock = ({ exclude, title = "Nos zones d'intervention" }: Props) => {
  const zones = ZONE_ORDER.map((k) => LOCAL_AREAS[k]).filter(
    (a) => a.path !== exclude,
  );

  return (
    <nav
      aria-labelledby="zones-block-title"
      className="bg-surface-bg py-16 lg:py-20 border-t border-border-subtle"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <h2
          id="zones-block-title"
          className="font-display font-semibold tracking-[-0.03em] leading-[1.1] text-text-primary text-[clamp(24px,2.6vw,34px)] mb-2"
        >
          {title}
        </h2>
        <p className="text-[15px] leading-relaxed text-text-secondary mb-8 max-w-[640px]">
          Basés à Ogliastro, dans le Cap Corse, nous intervenons dans toute
          l'île. Retrouvez ce que nous faisons près de chez vous.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 list-none">
          {zones.map((z) => (
            <li key={z.path} className="list-none">
              <Link
                to={z.path}
                className="group flex items-center justify-between gap-3 rounded-xl bg-white border border-border-subtle px-5 py-4 text-[15px] font-semibold text-text-primary transition-colors duration-200 hover:border-logo-base-deep"
              >
                <span className="flex items-center gap-2.5">
                  <MapPin
                    className="w-4 h-4 text-logo-base-deep"
                    aria-hidden="true"
                  />
                  {z.breadcrumb}
                </span>
                <ArrowRight
                  className="w-4 h-4 text-text-muted transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default ZonesBlock;
