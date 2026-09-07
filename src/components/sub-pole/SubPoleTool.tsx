import FadeInWhenVisible from "@/components/animations/FadeInWhenVisible";
import type { SubPoleContent } from "@/lib/sub-poles";

interface Props {
  content: SubPoleContent;
}

const SubPoleTool = ({ content }: Props) => {
  if (!content.toolImage || !content.toolTitle) return null;

  return (
    <section
      role="region"
      aria-labelledby="sub-pole-tool-title"
      className="relative bg-surface-bg py-24 lg:py-32"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10">
        <FadeInWhenVisible>
          <div className="max-w-[760px] mx-auto text-center mb-14">
            {content.toolEyebrow && (
              <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted mb-6">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--pole-color)" }}
                  aria-hidden="true"
                />
                {content.toolEyebrow}
              </span>
            )}
            <h2
              id="sub-pole-tool-title"
              className="font-display font-semibold tracking-[-0.035em] leading-[1.05] text-text-primary"
              style={{ fontSize: "clamp(32px, 4vw, 54px)" }}
            >
              {content.toolTitle}
              {content.toolTitleAccent && (
                <>
                  {" "}
                  <span style={{ color: "var(--pole-color)" }}>
                    {content.toolTitleAccent}
                  </span>
                </>
              )}
            </h2>
            {content.toolIntro && (
              <p className="text-text-secondary leading-relaxed text-[17px] mt-6">
                {content.toolIntro}
              </p>
            )}
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible>
          <div className="max-w-[1080px] mx-auto">
            <div className="rounded-2xl overflow-hidden border border-border-subtle shadow-soft-lg bg-surface-card">
              <div className="h-9 flex items-center px-4 gap-2 bg-surface-bg border-b border-border-subtle">
                <span
                  className="w-[10px] h-[10px] rounded-full bg-border-subtle"
                  aria-hidden="true"
                />
                <span
                  className="w-[10px] h-[10px] rounded-full bg-border-subtle"
                  aria-hidden="true"
                />
                <span
                  className="w-[10px] h-[10px] rounded-full bg-border-subtle"
                  aria-hidden="true"
                />
              </div>
              <img
                src={content.toolImage}
                alt={content.toolImageAlt || ""}
                width={content.toolImageWidth}
                height={content.toolImageHeight}
                className="w-full h-auto block"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
};

export default SubPoleTool;
