import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import type { Expertise } from "@/lib/otherExpertises";

interface Props {
  expertise: Expertise;
}

const ExpertiseItem = ({ expertise }: Props) => {
  const reduced = useReducedMotion();

  return (
    <li className="border-b border-border-subtle transition-colors duration-300 ease-out hover:bg-surface-card group">
      <Link
        to={`/contact?expertise=${expertise.slug}`}
        aria-label={`Demander un devis pour ${expertise.title}`}
        className={`grid items-center gap-4 py-6 lg:gap-8 lg:py-8
                    grid-cols-[50px_1fr_40px] grid-rows-[auto_auto]
                    lg:grid-cols-[80px_1fr_1fr_60px] lg:grid-rows-1
                    transition-[padding] duration-300 ease-out
                    ${reduced ? "" : "lg:group-hover:pl-4"}
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-logo-base-deep/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-bg rounded-sm`}
      >
        <span className="font-mono text-[13px] font-medium tracking-[0.1em] text-text-muted group-hover:text-logo-base-deep transition-colors duration-300 ease-out row-start-1 col-start-1">
          {expertise.index}
        </span>

        <h3 className="font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.1] tracking-[-0.025em] text-text-primary row-start-1 col-start-2 lg:col-start-2">
          {expertise.title}
        </h3>

        <p className="text-sm leading-relaxed text-text-muted lg:max-w-[380px] row-start-2 col-start-1 col-span-3 lg:row-start-1 lg:col-start-3 lg:col-span-1">
          {expertise.description}
        </p>

        <span
          aria-hidden="true"
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-surface-card border border-border-subtle flex items-center justify-center text-text-muted justify-self-end
                     transition-[background,border-color,color] duration-300 ease-out
                     group-hover:bg-logo-base-deep group-hover:border-logo-base-deep group-hover:text-white
                     row-start-1 col-start-3 lg:col-start-4"
        >
          <ArrowRight
            className={`w-4 h-4 lg:w-[18px] lg:h-[18px] transition-transform duration-300 ease-out ${
              reduced ? "" : "group-hover:translate-x-0.5"
            }`}
          />
        </span>
      </Link>
    </li>
  );
};

export default ExpertiseItem;
