import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import RootLayout from "@/components/layout/RootLayout";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { UIBannerProvider } from "@/contexts/UIBannerContext";
import Index from "./pages/Index";
import PoleDetail from "./pages/PoleDetail";
import SubPoleDetail from "./pages/SubPoleDetail";
import Expertises from "./pages/Expertises";
import Partenaires from "./pages/Partenaires";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <UIBannerProvider>
        <BrowserRouter>
          <SmoothScrollProvider>
            <ScrollToTop />
            <Routes>
              <Route element={<RootLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/pole/:slug/:subSlug" element={<SubPoleDetail />} />
                <Route path="/pole/:slug" element={<PoleDetail />} />
                <Route path="/expertises" element={<Expertises />} />
                <Route path="/partenaires" element={<Partenaires />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mentions-legales" element={<MentionsLegales />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </SmoothScrollProvider>
        </BrowserRouter>
      </UIBannerProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
