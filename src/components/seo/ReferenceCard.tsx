import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "@/lib/router-compat";
import type { LocalReference } from "@/lib/localAreas";

/** A real mission, linked to its write-up once the article is published. */
const ReferenceCard = ({
  reference,
  title,
}: {
  reference: LocalReference;
  title: string;
}) => (
  <div>
    <p className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-text-muted mb-4">
      {title}
    </p>
    {reference.href ? (
      <Link
        to={reference.href}
        className="group flex flex-col rounded-2xl bg-white border border-border-subtle shadow-soft-sm p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-md motion-reduce:transform-none"
      >
        <ReferenceBody reference={reference} withLink />
      </Link>
    ) : (
      <div className="flex flex-col rounded-2xl bg-white border border-border-subtle shadow-soft-sm p-7">
        <ReferenceBody reference={reference} />
      </div>
    )}
  </div>
);

const ReferenceBody = ({
  reference,
  withLink = false,
}: {
  reference: LocalReference;
  withLink?: boolean;
}) => (
  <>
    <span className="flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-text-muted mb-4">
      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
      {reference.place}
    </span>
    <span className="font-display text-[22px] font-semibold tracking-[-0.02em] leading-tight mb-2">
      {reference.title}
    </span>
    <span className="text-[15px] font-semibold text-text-primary mb-1">
      {reference.client}
    </span>
    {reference.figures && (
      <span className="text-[15px] text-text-secondary">
        {reference.figures}
      </span>
    )}
    {withLink && (
      <span
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
        style={{ color: "var(--card-color)" }}
      >
        Lire le retour de mission
        <ArrowRight
          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none"
          aria-hidden="true"
        />
      </span>
    )}
  </>
);

export default ReferenceCard;
