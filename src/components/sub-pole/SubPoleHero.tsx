import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import { useLenis } from "@/components/SmoothScrollProvider";
import type { Pole } from "@/lib/poles";
import type { SubPoleContent } from "@/lib/sub-poles";

interface Props {
  content: SubPoleContent;
  pole: Pole;
}

const SubPoleHero = ({ content, pole }: Props) => {
  const lenis = useLenis();
  const showProcessAnchor = !!content.processSteps && content.processSteps.length > 0;

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.6, offset: -80 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <section
      role="region"
      aria-labelledby="sub-pole-hero-title"
      className="relative overflow-hidden isolate bg-surface-bg pt-32 pb-24 lg:pt-40 lg:pb-32"
    >
      {content.heroImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={content.heroImage}
            alt={`${content.heroTitle} par drone — Corse Drone`}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center" }}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: content.heroImage
            ? "linear-gradient(135deg, rgba(245,247,250,0.95) 0%, rgba(245,247,250,0.80) 45%, rgba(245,247,250,0.55) 100%)"
            : "radial-gradient(ellipse at 30% 20%, rgba(var(--pole-color-rgb), 0.10) 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(var(--pole-color-rgb), 0.08) 0%, transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(var(--pole-color-rgb), 0.10) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 80% 70%, rgba(var(--pole-color-rgb), 0.06) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-[5] max-w-[1100px] mx-auto px-5 sm:px-10 text-center">
        <FadeInWhenVisible>
          <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-8">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--pole-color)" }}
              aria-hidden="true"
            />
            {content.heroEyebrow}
          </span>
          <h1
            id="sub-pole-hero-title"
            className="font-display font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary mb-6"
            style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            {content.heroTitle}
          </h1>
          <p
            className="text-text-secondary mx-auto leading-relaxed mb-10 max-w-[760px]"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)" }}
          >
            {content.heroPitch}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/contact?expertise=${pole.key}`}
              className="group inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold text-[15px] px-7 py-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 motion-reduce:hover:transform-none"
              style={{
                background: "var(--pole-color)",
                boxShadow:
                  "0 0 0 1px rgba(var(--pole-color-rgb), 0.4), 0 0 24px rgba(var(--pole-color-rgb), 0.35), 0 8px 24px rgba(var(--pole-color-rgb), 0.25)",
              }}
            >
              Obtenir un devis
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            {showProcessAnchor && (
              <a
                href="#process"
                onClick={(e) => handleAnchor(e, "process")}
                className="inline-flex items-center justify-center rounded-full font-semibold text-[15px] px-7 py-3.5 border-2 bg-surface-card text-text-primary border-border-subtle hover:border-[var(--pole-color)] transition-colors duration-300"
              >
                Comment ça marche
              </a>
            )}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default SubPoleHero;
