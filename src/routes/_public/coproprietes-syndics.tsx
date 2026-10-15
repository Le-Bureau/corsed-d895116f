import { createFileRoute } from "@tanstack/react-router";
import AudiencePage from "@/pages/AudiencePage";
import { audienceHead } from "@/lib/audienceHead";
import { AUDIENCE_PAGES } from "@/lib/audiences";

const page = AUDIENCE_PAGES.find((p) => p.path === "/coproprietes-syndics")!;

export const Route = createFileRoute("/_public/coproprietes-syndics")({
  head: () => audienceHead(page),
  component: () => <AudiencePage page={page} />,
});
