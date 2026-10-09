import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import AdminRoute from "@/components/admin/AdminRoute";
import AdminLayout from "@/components/admin/AdminLayout";

const NOINDEX_HEAD = {
  meta: [
    { title: "Administration | Corse Drone" },
    { name: "robots", content: "noindex,nofollow" },
  ],
};

function AdminShell() {
  const { pathname } = useLocation();
  // The login page is a child of /admin but must stay reachable while
  // logged out: guarding it would redirect /admin/login to itself forever.
  if (pathname.replace(/\/$/, "") === "/admin/login") {
    return <Outlet />;
  }
  return (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  );
}

export const Route = createFileRoute("/admin")({
  head: () => NOINDEX_HEAD,
  component: AdminShell,
});
