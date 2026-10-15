import { createFileRoute } from "@tanstack/react-router";
import LocalServicePage from "@/pages/LocalServicePage";
import { localServiceHead } from "@/lib/localServiceHead";
import { LOCAL_SERVICE_PAGES } from "@/lib/localServicePages";

const page = LOCAL_SERVICE_PAGES.find((p) => p.path === "/demoussage-toiture-saint-florent")!;

export const Route = createFileRoute("/_public/demoussage-toiture-saint-florent")({
  head: () => localServiceHead(page),
  component: () => <LocalServicePage page={page} />,
});
