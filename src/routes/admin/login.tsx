import { createFileRoute } from "@tanstack/react-router";
import AdminLogin from "@/pages/admin/AdminLogin";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Connexion | Corse Drone" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLogin,
});
