import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import RootLayout from "@/components/layout/RootLayout";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { UIBannerProvider } from "@/contexts/UIBannerContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { usePlausibleTracking } from "@/hooks/usePlausibleTracking";
import AdminRoute from "@/components/admin/AdminRoute";
import Index from "./pages/Index";
import PoleDetail from "./pages/PoleDetail";
import Expertises from "./pages/Expertises";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const SubPoleDetail = lazy(() => import("./pages/SubPoleDetail"));
const Partenaires = lazy(() => import("./pages/Partenaires"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const PolitiqueConfidentialite = lazy(() => import("./pages/PolitiqueConfidentialite"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminBlogList = lazy(() => import("./pages/admin/AdminBlogList"));
const AdminBlogEditor = lazy(() => import("./pages/admin/AdminBlogEditor"));
const AdminProfile = lazy(() => import("./pages/admin/AdminProfile"));

const RouteFallback = () => (
  <div className="min-h-[60vh] w-full flex items-center justify-center bg-background">
    <div
      className="h-8 w-8 rounded-full border-2 border-muted border-t-primary animate-spin"
      role="status"
      aria-label="Chargement"
    />
  </div>
);

const PlausibleTracker = () => {
  usePlausibleTracking();
  return null;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <UIBannerProvider>
          <BrowserRouter>
            <PlausibleTracker />
            <SmoothScrollProvider>
              <ScrollToTop />
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
            </SmoothScrollProvider>
          </BrowserRouter>
        </UIBannerProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

