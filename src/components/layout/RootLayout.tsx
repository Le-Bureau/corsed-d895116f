import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import { PageTransition } from "./PageTransition";

const RootLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>{outlet}</PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default RootLayout;
