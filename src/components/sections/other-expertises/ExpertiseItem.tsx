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
    <li className="border-b border-white/10 transition-colors duration-[400ms] ease-out-expo hover:bg-white/[0.02] group">
      <Link
        to={`/contact?expertise=${expertise.slug}`}
        aria-label={`Demander un devis pour ${expertise.title}`}
        className={`grid items-center gap-4 py-6 lg:gap-8 lg:py-8
                    grid-cols-[50px_1fr_40px] grid-rows-[auto_auto]
                    lg:grid-cols-[80px_1fr_1fr_60px] lg:grid-rows-1
                    transition-[padding] duration-[400ms] ease-out-expo
                    ${reduced ? "" : "lg:group-hover:pl-4"}
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-darker rounded-sm`}
      >
        <span className="font-mono text-[13px] font-medium tracking-[0.1em] text-white/40 group-hover:text-logo-base transition-colors duration-[400ms] ease-out-expo row-start-1 col-start-1">
          {expertise.index}
        </span>

        <h3 className="font-display text-[clamp(28px,3vw,40px)] font-medium leading-[1.1] tracking-[-0.025em] row-start-1 col-start-2 lg:col-start-2">
          {expertise.title}
        </h3>

        <p className="text-sm leading-relaxed text-text-on-dark-muted lg:max-w-[380px] row-start-2 col-start-1 col-span-3 lg:row-start-1 lg:col-start-3 lg:col-span-1">
          {expertise.description}
        </p>

        <span
          aria-hidden="true"
          className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-text-on-dark-muted justify-self-end
                     transition-[background,border-color,color] duration-300 ease-out-expo
                     group-hover:bg-logo-base group-hover:border-logo-base group-hover:text-surface-darker
                     row-start-1 col-start-3 lg:col-start-4"
        >
          <ArrowRight
            className={`w-4 h-4 lg:w-[18px] lg:h-[18px] transition-transform duration-300 ease-out-expo ${
              reduced ? "" : "group-hover:translate-x-0.5"
            }`}
          />
        </span>
      </Link>
    </li>
  );
};

export default ExpertiseItem;
