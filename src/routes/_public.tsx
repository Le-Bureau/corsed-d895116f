import { createFileRoute } from "@tanstack/react-router";
import RootLayout from "@/components/layout/RootLayout";

export const Route = createFileRoute("/_public")({
  component: RootLayout,
});
