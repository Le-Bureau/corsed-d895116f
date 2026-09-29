import { useLocation, Outlet } from "@/lib/router-compat";
import { AnimatePresence } from "motion/react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import { PageTransition } from "./PageTransition";

const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default RootLayout;
