import { createFileRoute } from "@tanstack/react-router";
import LocalAreaPage from "@/pages/LocalAreaPage";
import { localAreaHead } from "@/lib/localAreaHead";
import { LOCAL_AREAS } from "@/lib/localAreas";

const area = LOCAL_AREAS.portoVecchio;

export const Route = createFileRoute("/_public/drone-porto-vecchio-extreme-sud")({
  head: () => localAreaHead(area),
  component: () => <LocalAreaPage area={area} />,
});
