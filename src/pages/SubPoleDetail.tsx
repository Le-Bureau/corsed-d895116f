import { useParams, Navigate } from "react-router-dom";
import { POLES } from "@/lib/poles";
import { SUB_POLE_CONTENT } from "@/lib/sub-poles";
import { hexToRgb } from "@/lib/utils";
import SubPoleHero from "@/components/sub-pole/SubPoleHero";
import SubPoleStats from "@/components/sub-pole/SubPoleStats";
import SubPoleWhyTraiter from "@/components/sub-pole/SubPoleWhyTraiter";
import SubPoleFormules from "@/components/sub-pole/SubPoleFormules";
import SubPoleDomaines from "@/components/sub-pole/SubPoleDomaines";
import SubPoleTechnologie from "@/components/sub-pole/SubPoleTechnologie";
import SubPoleCompare from "@/components/sub-pole/SubPoleCompare";
import PoleProcess from "@/components/pole/PoleProcess";
import PoleFAQ from "@/components/pole/PoleFAQ";
import PoleFinalCTA from "@/components/pole/PoleFinalCTA";

export default function SubPoleDetail() {
  const { slug, subSlug } = useParams<{ slug: string; subSlug: string }>();
  const pole = POLES.find((p) => p.key === slug);
  if (!pole) return <Navigate to="/" replace />;

  const content = SUB_POLE_CONTENT[slug || ""]?.[subSlug || ""];
  if (!content) return <Navigate to={`/pole/${slug}`} replace />;

  const styleVars = {
    "--pole-color": pole.baseColorOnLight,
    "--pole-color-rgb": hexToRgb(pole.baseColorOnLight),
  } as React.CSSProperties;

  const ctaPole = {
    ...pole,
    finalCTATitle: content.finalCTATitle,
    finalCTASubtitle: content.finalCTASubtitle,
    finalCTAButtonLabel: content.finalCTAButtonLabel,
  };

  return (
    <main className="min-h-screen bg-surface-bg" style={styleVars}>
      <SubPoleHero content={content} pole={pole} />
      <SubPoleStats stats={content.stats} />
      <SubPoleWhyTraiter content={content} />
      {content.formulas.length > 0 && <SubPoleFormules formulas={content.formulas} />}
      <SubPoleDomaines content={content} />
      {content.processSteps && content.processSteps.length > 0 && (
        <div id="process">
          <PoleProcess steps={content.processSteps} />
        </div>
      )}
      {content.techItems && content.techItems.length > 0 && (
        <SubPoleTechnologie items={content.techItems} />
      )}
      {content.compareCols && content.compareCols.length > 0 && (
        <SubPoleCompare
          title={content.compareTitle!}
          subtitle={content.compareSubtitle}
          cols={content.compareCols}
          disclaimer={content.compareDisclaimer}
        />
      )}
      <PoleFAQ items={content.faq} />
      <PoleFinalCTA pole={ctaPole} />
    </main>
  );
}
