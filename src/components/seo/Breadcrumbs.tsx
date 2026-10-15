import { Link } from "@/lib/router-compat";

export interface Crumb {
  label: string;
  href?: string;
}

interface Props {
  items: Crumb[];
  className?: string;
}

/** Visible breadcrumb trail. The last item is the current page (no link). */
const Breadcrumbs = ({ items, className = "" }: Props) => (
  <nav aria-label="Fil d'Ariane" className={className}>
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-text-muted list-none">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <li
            key={`${c.label}-${i}`}
            className="flex items-center gap-2 list-none"
          >
            {c.href && !last ? (
              <Link
                to={c.href}
                className="hover:text-text-primary underline-offset-4 hover:underline"
              >
                {c.label}
              </Link>
            ) : (
              <span
                aria-current={last ? "page" : undefined}
                className={last ? "text-text-secondary" : ""}
              >
                {c.label}
              </span>
            )}
            {!last && <span aria-hidden="true">›</span>}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default Breadcrumbs;
