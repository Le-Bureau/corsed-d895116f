import { createFileRoute } from "@tanstack/react-router";
import LocalServicePage from "@/pages/LocalServicePage";
import { localServiceHead } from "@/lib/localServiceHead";
import { LOCAL_SERVICE_PAGES } from "@/lib/localServicePages";

const page = LOCAL_SERVICE_PAGES.find((p) => p.path === "/thermographie-photovoltaique-propriano")!;

export const Route = createFileRoute("/_public/thermographie-photovoltaique-propriano")({
  head: () => localServiceHead(page),
  component: () => <LocalServicePage page={page} />,
});
