import { createFileRoute } from "@tanstack/react-router";
import AdminProfile from "@/pages/admin/AdminProfile";

export const Route = createFileRoute("/admin/profil")({
  component: AdminProfile,
});
