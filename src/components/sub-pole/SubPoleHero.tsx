import { useState } from "react";
import { Link } from "@/lib/router-compat";
import { LaunchAlertPopup } from "@/components/popups/LaunchAlertPopup";
import { ArrowRight } from "lucide-react";
import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import TypewriterWords from "@/components/animations/TypewriterWords";
import { useLenis } from "@/components/SmoothScrollProvider";
import type { Pole } from "@/lib/poles";
import type { SubPoleContent } from "@/lib/sub-poles";

interface Props {
  content: SubPoleContent;
  pole: Pole;
}

const SubPoleHero = ({ content, pole }: Props) => {
  const lenis = useLenis();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
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
            alt={`${content.seoTitle}, Corse Drone`}
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
          {/* The pill carries the H1 (service + place); the big tagline below is
              presentational so the H1 says what the page is about. */}
          <h1
            id="sub-pole-hero-title"
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-8"
          >
            <span
              className="w-1.5 h-1.5 shrink-0 rounded-full"
              style={{ background: "var(--pole-color)" }}
              aria-hidden="true"
            />
            {content.seoTitle}
          </h1>
          <p
            className="font-display font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary mb-6"
            style={{ fontSize: "clamp(48px, 7vw, 96px)" }}
          >
            {content.heroTitleTypewriter ? (
              <>
                <span className="sr-only">{content.heroTitle}</span>
                {/* Every variant is stacked invisibly in the same grid cell so the
                    title keeps the height of its longest version while typing. */}
                <span aria-hidden="true" className="grid">
                  {content.heroTitleTypewriter.words.map((w) => (
                    <span key={w} className="invisible col-start-1 row-start-1">
                      {content.heroTitleTypewriter!.before}
                      {w}
                      {content.heroTitleTypewriter!.after}
                    </span>
                  ))}
                  <span className="col-start-1 row-start-1">
                    {content.heroTitleTypewriter.before}
                    <TypewriterWords
                      words={content.heroTitleTypewriter.words}
                      style={{ color: "var(--pole-color)" }}
                    />
                    {content.heroTitleTypewriter.after}
                  </span>
                </span>
              </>
            ) : (
              content.heroTitle
            )}
          </p>
          <p
            className="text-text-secondary mx-auto leading-relaxed mb-10 max-w-[760px]"
            style={{ fontSize: "clamp(16px, 1.4vw, 19px)" }}
          >
            {content.heroPitch}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={pole.isInDevelopment ? "#" : `/contact?expertise=${pole.key}`}
              onClick={(e: React.MouseEvent) => {
                if (!pole.isInDevelopment) return;
                e.preventDefault();
                setIsAlertOpen(true);
              }}
              className="group inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold text-[15px] px-7 py-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 motion-reduce:hover:transform-none motion-reduce:transform-none"
              style={{
                background: "var(--pole-color)",
                boxShadow:
                  "0 0 0 1px rgba(var(--pole-color-rgb), 0.4), 0 0 24px rgba(var(--pole-color-rgb), 0.35), 0 8px 24px rgba(var(--pole-color-rgb), 0.25)",
              }}
            >
              {pole.isInDevelopment ? "Être prévenu du lancement" : "Obtenir un devis"}
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transform-none" />
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
      {pole.isInDevelopment && (
        <LaunchAlertPopup
          isOpen={isAlertOpen}
          onClose={() => setIsAlertOpen(false)}
          poleKey={pole.key}
        />
      )}
    </section>
  );
};

export default SubPoleHero;
