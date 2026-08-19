import { lazy, Suspense, type ComponentType } from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "@/components/layout/RootLayout";
import AdminRoute from "@/components/admin/AdminRoute";
import Index from "./pages/Index";
import PoleDetail from "./pages/PoleDetail";
import Expertises from "./pages/Expertises";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

/**
 * SSR-safe lazy loader.
 *
 * On the client it behaves exactly like React.lazy (code-splitting kept).
 * During the build-time prerender (import.meta.env.SSR) React.lazy would
 * suspend and renderToString would only emit the fallback, so we resolve the
 * module eagerly and register the promise in `ssrPreloads`; entry-server
 * awaits them all before rendering.
 */
export const ssrPreloads: Promise<unknown>[] = [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const routeLazy = (factory: () => Promise<{ default: ComponentType<any> }>) => {
  if (!import.meta.env.SSR) return lazy(factory);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let Resolved: ComponentType<any> | null = null;
  ssrPreloads.push(
    factory().then((m) => {
      Resolved = m.default;
    }),
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SSRComponent = (props: any) =>
    Resolved ? <Resolved {...props} /> : null;
  return SSRComponent;
};

const SubPoleDetail = routeLazy(() => import("./pages/SubPoleDetail"));
const Partenaires = routeLazy(() => import("./pages/Partenaires"));
const MentionsLegales = routeLazy(() => import("./pages/MentionsLegales"));
const PolitiqueConfidentialite = routeLazy(
  () => import("./pages/PolitiqueConfidentialite"),
);
const Blog = routeLazy(() => import("./pages/Blog"));
const BlogPost = routeLazy(() => import("./pages/BlogPost"));
const AdminLogin = routeLazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = routeLazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = routeLazy(() => import("./pages/admin/AdminDashboard"));
const AdminBlogList = routeLazy(() => import("./pages/admin/AdminBlogList"));
const AdminBlogEditor = routeLazy(() => import("./pages/admin/AdminBlogEditor"));
const AdminProfile = routeLazy(() => import("./pages/admin/AdminProfile"));

export const RouteFallback = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-background">
    <div
      className="h-8 w-8 rounded-full border-2 border-muted border-t-primary animate-spin"
      role="status"
      aria-label="Chargement"
    />
  </div>
);

const AppRoutes = () => (
  <Routes>
    <Route
      path="/admin/login"
      element={
        <Suspense fallback={<RouteFallback />}>
          <AdminLogin />
        </Suspense>
      }
    />
    <Route
      path="/admin"
      element={
        <Suspense fallback={<RouteFallback />}>
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        </Suspense>
      }
    >
      <Route index element={<AdminDashboard />} />
      <Route path="blog" element={<AdminBlogList />} />
      <Route path="blog/new" element={<AdminBlogEditor />} />
      <Route path="blog/:id/edit" element={<AdminBlogEditor />} />
      <Route path="profil" element={<AdminProfile />} />
    </Route>

    <Route element={<RootLayout />}>
      <Route path="/" element={<Index />} />
      <Route
        path="/pole/:slug/:subSlug"
        element={
          <Suspense fallback={<RouteFallback />}>
            <SubPoleDetail />
          </Suspense>
        }
      />
      <Route path="/pole/:slug" element={<PoleDetail />} />
      <Route path="/expertises" element={<Expertises />} />
      <Route
        path="/partenaires"
        element={
          <Suspense fallback={<RouteFallback />}>
            <Partenaires />
          </Suspense>
        }
      />
      <Route path="/contact" element={<Contact />} />
      <Route
        path="/mentions-legales"
        element={
          <Suspense fallback={<RouteFallback />}>
            <MentionsLegales />
          </Suspense>
        }
      />
      <Route
        path="/politique-confidentialite"
        element={
          <Suspense fallback={<RouteFallback />}>
            <PolitiqueConfidentialite />
          </Suspense>
        }
      />
      <Route
        path="/blog"
        element={
          <Suspense fallback={<RouteFallback />}>
            <Blog />
          </Suspense>
        }
      />
      <Route
        path="/blog/:slug"
        element={
          <Suspense fallback={<RouteFallback />}>
            <BlogPost />
          </Suspense>
        }
      />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
