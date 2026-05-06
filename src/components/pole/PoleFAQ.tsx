import { ChevronDown } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { PoleFAQItem } from "@/lib/poles";

interface Props {
  items: PoleFAQItem[];
}

const PoleFAQ = ({ items }: Props) => {
  return (
    <section
      role="region"
      aria-labelledby="pole-faq-title"
      className="relative bg-surface-elevated py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mb-14">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "var(--pole-color)" }}
                aria-hidden="true"
              />
              Questions fréquentes
            </span>
            <h2
              id="pole-faq-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary"
              style={{ fontSize: "clamp(36px, 4.4vw, 64px)" }}
            >
              Vos questions,{" "}
              <span style={{ color: "var(--pole-color)" }}>nos réponses.</span>
            </h2>
          </div>
        </FadeInWhenVisible>

        <ul className="max-w-[880px] mx-auto space-y-3 list-none p-0">
          {items.map(({ question, answer }) => (
            <li key={question}>
              <details
                className="group rounded-xl bg-surface-card border border-border-subtle shadow-soft-sm hover:bg-white transition-all duration-300"
                onToggle={(e) => {
                  const el = e.currentTarget as HTMLDetailsElement;
                  el.style.borderColor = el.open
                    ? "rgba(var(--pole-color-rgb), 0.30)"
                    : "";
                }}
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-[16px] lg:text-[18px] font-medium tracking-[-0.01em] text-text-primary">
                    {question}
                  </span>
                  <ChevronDown
                    className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                    style={{ color: "var(--pole-color)" }}
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

export default PoleFAQ;
