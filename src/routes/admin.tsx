import { createFileRoute } from "@tanstack/react-router";
import AdminRoute from "@/components/admin/AdminRoute";
import AdminLayout from "@/components/admin/AdminLayout";

const NOINDEX_HEAD = {
  meta: [
    { title: "Administration | Corse Drone" },
    { name: "robots", content: "noindex,nofollow" },
  ],
};

export const Route = createFileRoute("/admin")({
  head: () => NOINDEX_HEAD,
  component: () => (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
});
