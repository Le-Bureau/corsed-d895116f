import { ChevronDown } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { PARTNER_FAQ } from "@/lib/partners/faq";

const PartenairesFAQ = () => {
  return (
    <section
      role="region"
      aria-labelledby="faq-title"
      className="relative bg-surface-bg py-20 lg:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-logo-base shadow-[0_0_12px_rgba(168,192,212,0.5)]" />
              Questions fréquentes
            </span>
            <h2
              id="faq-title"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.05] text-text-primary mb-5"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Tout ce qu'il faut savoir{" "}
              <span className="text-logo-base-deep">sur nous.</span>
            </h2>
            <p className="text-text-secondary text-[16px] lg:text-[17px] leading-relaxed">
              Des réponses claires aux questions les plus courantes. Si la vôtre n'est pas listée,
              posez-la directement dans le formulaire de candidature.
            </p>
          </div>
        </FadeInWhenVisible>

        <ul className="max-w-[880px] mx-auto space-y-3 list-none p-0">
          {PARTNER_FAQ.map(({ question, answer }) => (
            <li key={question}>
              <details className="group rounded-2xl bg-surface-card border border-border-subtle shadow-soft-sm transition-[border-color,box-shadow] duration-300 [&[open]]:shadow-soft-md [&[open]]:border-logo-base/30">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-[16px] lg:text-[18px] font-medium tracking-[-0.01em] text-text-primary">
                    {question}
                  </span>
                  <ChevronDown
                    className="w-5 h-5 text-logo-base-deep flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-6 pb-6 -mt-1 text-[15px] leading-relaxed text-text-secondary">
                  {answer}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PartenairesFAQ;
