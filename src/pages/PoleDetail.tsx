import { useParams, Navigate } from "react-router-dom";
import { POLES } from "@/lib/poles";
import { hexToRgb } from "@/lib/utils";
import { SEO } from "@/components/seo/SEO";
import DevBanner from "@/components/pole/DevBanner";
import PoleHero from "@/components/pole/PoleHero";
import PoleWhyDrone from "@/components/pole/PoleWhyDrone";
import PoleSubServices from "@/components/pole/PoleSubServices";
import PoleProcess from "@/components/pole/PoleProcess";
import PrestationsNettoyage from "@/components/pole/PrestationsNettoyage";
import PoleUseCases from "@/components/pole/PoleUseCases";
import PoleFAQ from "@/components/pole/PoleFAQ";
import PoleFinalCTA from "@/components/pole/PoleFinalCTA";

const POLE_META: Record<string, string> = {
  nettoyage:
    "Nettoyage par drone en Corse : façades, toitures, panneaux photovoltaïques. Intervention rapide, sans échafaudage ni nacelle, sans immobilisation de site.",
  diagnostic:
    "Diagnostic et inspection par drone en Corse : relevés thermiques et visuels haute précision. Rapports exploitables sous 48h pour assurances et études techniques.",
  agriculture:
    "Agriculture de précision par drone en Corse : épandage ciblé, traitement phytosanitaire, analyses multispectrales. Optimisez vos rendements parcelle par parcelle.",
  transport:
    "Transport par drone en Corse : acheminement de matériel jusqu'à 100kg dans les zones difficiles d'accès. Alternative à l'hélicoptère pour vos chantiers isolés.",
};

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
      <SEO
        title={`${pole.label} par drone en Corse`}
        description={
          POLE_META[pole.key] ||
          (pole.heroPitch || pole.pitch || "").slice(0, 160)
        }
        canonicalPath={`/pole/${pole.key}`}
        ogImage={
          pole.showcaseImage
            ? `https://corse-drone.com${pole.showcaseImage}`
            : undefined
        }
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: pole.label,
          name: `${pole.label} par drone — Corse Drone`,
          description: pole.heroPitch || pole.pitch,
          provider: {
            "@type": "LocalBusiness",
            name: "Corse Drone",
            url: "https://corse-drone.com",
          },
          areaServed: { "@type": "AdministrativeArea", name: "Corse" },
          url: `https://corse-drone.com/pole/${pole.key}`,
        }}
      />
      {pole.isInDevelopment && <DevBanner />}
      <PoleHero pole={pole} />
      {pole.whyDroneItems && pole.whyDroneItems.length > 0 && (
        <PoleWhyDrone items={pole.whyDroneItems} />
      )}
      {pole.subServices && pole.subServices.length > 0 && (
        <PoleSubServices pole={pole} />
      )}
      {pole.key === "nettoyage" ? (
        <PrestationsNettoyage />
      ) : (
        pole.processSteps && pole.processSteps.length > 0 && (
          <PoleProcess steps={pole.processSteps} />
        )
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
