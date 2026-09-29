import { createFileRoute } from "@tanstack/react-router";
import AdminBlogEditor from "@/pages/admin/AdminBlogEditor";

export const Route = createFileRoute("/admin/blog/$id/edit")({
  component: AdminBlogEditor,
});
