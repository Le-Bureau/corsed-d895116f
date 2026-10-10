import { createFileRoute } from "@tanstack/react-router";
import LocalAreaPage from "@/pages/LocalAreaPage";
import { localAreaHead } from "@/lib/localAreaHead";
import { LOCAL_AREAS } from "@/lib/localAreas";

const area = LOCAL_AREAS.corte;

export const Route = createFileRoute("/_public/drone-corte-centre-corse")({
  head: () => localAreaHead(area),
  component: () => <LocalAreaPage area={area} />,
});
