import { createFileRoute } from "@tanstack/react-router";
import AdminBlogList from "@/pages/admin/AdminBlogList";

export const Route = createFileRoute("/admin/blog/")({
  component: AdminBlogList,
});
