import { createFileRoute } from "@tanstack/react-router";
import AudiencePage from "@/pages/AudiencePage";
import { audienceHead } from "@/lib/audienceHead";
import { AUDIENCE_PAGES } from "@/lib/audiences";

const page = AUDIENCE_PAGES.find((p) => p.path === "/collectivites")!;

export const Route = createFileRoute("/_public/collectivites")({
  head: () => audienceHead(page),
  component: () => <AudiencePage page={page} />,
});
