import { ChevronDown } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { PARTNER_FAQ } from "@/lib/partners/faq";

const itemStyle: React.CSSProperties = {
  background: "rgba(10,14,26,0.4)",
  backdropFilter: "blur(28px) saturate(180%)",
  WebkitBackdropFilter: "blur(28px) saturate(180%)",
};

const PartenairesFAQ = () => {
  return (
    <section
      role="region"
      aria-labelledby="faq-title"
      className="relative bg-surface-darker text-text-on-dark py-16 lg:py-28"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-logo-base" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-text-on-dark-muted">
                Questions fréquentes
              </span>
            </div>
            <h2
              id="faq-title"
              className="font-display font-semibold tracking-[-0.03em] leading-[1.05] mb-5"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Tout ce qu'il faut savoir <span className="text-logo-base">sur nous.</span>
            </h2>
            <p className="text-text-on-dark-muted text-[16px] lg:text-[17px] leading-relaxed">
              Des réponses claires aux questions les plus courantes. Si la vôtre n'est pas listée,
              posez-la directement dans le formulaire de candidature.
            </p>
          </div>
        </FadeInWhenVisible>

        <ul className="max-w-[880px] mx-auto space-y-3 list-none p-0">
          {PARTNER_FAQ.map(({ question, answer }) => (
            <li key={question}>
              <details
                className="group rounded-2xl border border-white/10 transition-[border-color,background-color] duration-300 [&[open]]:border-[rgba(168,192,212,0.25)]"
                style={itemStyle}
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-[16px] lg:text-[18px] font-medium tracking-[-0.01em] text-text-on-dark">
                    {question}
                  </span>
                  <ChevronDown
                    className="w-5 h-5 text-logo-base flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-6 pb-6 -mt-1 text-[15px] leading-relaxed text-text-on-dark-muted">
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
