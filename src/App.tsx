import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import RootLayout from "@/components/layout/RootLayout";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import PoleNettoyage from "./pages/PoleNettoyage";
import NettoyageToitures from "./pages/NettoyageToitures";
import NettoyageFacades from "./pages/NettoyageFacades";
import NettoyagePanneauxSolaires from "./pages/NettoyagePanneauxSolaires";
import PoleDiagnostic from "./pages/PoleDiagnostic";
import DiagnosticThermique from "./pages/DiagnosticThermique";
import DiagnosticVisuel from "./pages/DiagnosticVisuel";
import PoleAgriculture from "./pages/PoleAgriculture";
import PoleTransport from "./pages/PoleTransport";
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
      <BrowserRouter>
        <SmoothScrollProvider>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/pole/nettoyage" element={<PoleNettoyage />} />
              <Route path="/pole/nettoyage/toitures" element={<NettoyageToitures />} />
              <Route path="/pole/nettoyage/facades" element={<NettoyageFacades />} />
              <Route
                path="/pole/nettoyage/panneaux-solaires"
                element={<NettoyagePanneauxSolaires />}
              />
              <Route path="/pole/diagnostic" element={<PoleDiagnostic />} />
              <Route path="/pole/diagnostic/thermique" element={<DiagnosticThermique />} />
              <Route path="/pole/diagnostic/visuel" element={<DiagnosticVisuel />} />
              <Route path="/pole/agriculture" element={<PoleAgriculture />} />
              <Route path="/pole/transport" element={<PoleTransport />} />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
