import { useParams, Navigate } from "react-router-dom";
import { POLES } from "@/lib/poles";
import { hexToRgb } from "@/lib/utils";
import DevBanner from "@/components/pole/DevBanner";
import PoleHero from "@/components/pole/PoleHero";
import PoleWhyDrone from "@/components/pole/PoleWhyDrone";
import PoleSubServices from "@/components/pole/PoleSubServices";
import PoleProcess from "@/components/pole/PoleProcess";
import PoleUseCases from "@/components/pole/PoleUseCases";
import PoleFAQ from "@/components/pole/PoleFAQ";
import PoleFinalCTA from "@/components/pole/PoleFinalCTA";

export default function PoleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const pole = POLES.find((p) => p.key === slug);

  if (!pole) return <Navigate to="/" replace />;

  const styleVars = {
    "--pole-color": pole.baseColorOnLight,
    "--pole-color-rgb": hexToRgb(pole.baseColorOnLight),
  } as React.CSSProperties;

  return (
    <main
      className={`min-h-screen bg-surface-bg ${pole.isInDevelopment ? "pt-8" : ""}`}
      style={styleVars}
    >
      {pole.isInDevelopment && <DevBanner />}
      <PoleHero pole={pole} />
      {pole.whyDroneItems && pole.whyDroneItems.length > 0 && (
        <PoleWhyDrone items={pole.whyDroneItems} />
      )}
      {pole.subServices && pole.subServices.length > 0 && (
        <PoleSubServices pole={pole} />
      )}
      {pole.processSteps && pole.processSteps.length > 0 && (
        <PoleProcess steps={pole.processSteps} />
      )}
      {pole.useCases && pole.useCases.length > 0 && (
        <PoleUseCases cases={pole.useCases} />
      )}
      {pole.poleFAQ && pole.poleFAQ.length > 0 && (
        <PoleFAQ items={pole.poleFAQ} />
      )}
      <PoleFinalCTA pole={pole} />
    </main>
  );
}
