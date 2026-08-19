import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { UIBannerProvider } from "@/contexts/UIBannerContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { usePlausibleTracking } from "@/hooks/usePlausibleTracking";
import AppRoutes from "./routes";

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
              <AppRoutes />
            </SmoothScrollProvider>
          </BrowserRouter>
        </UIBannerProvider>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
