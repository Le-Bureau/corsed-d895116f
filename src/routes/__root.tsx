import { useEffect } from "react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import appCss from "../styles.css?url";

// ported from main.tsx
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-sans/700.css";
import "@fontsource/geist-sans/800.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/700.css";

import { AuthProvider } from "@/contexts/AuthContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { UIBannerProvider } from "@/contexts/UIBannerContext";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { usePlausibleTracking } from "@/hooks/usePlausibleTracking";
import { Link } from "@/lib/router-compat";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { POLES } from "@/lib/poles";
import { reportLovableError } from "@/lib/lovable-error-reporting";

const PlausibleTracker = () => {
  usePlausibleTracking();
  return null;
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0A0E1A" },
      {
        name: "google-site-verification",
        content: "47fAdsNz7GQ2Lstj9DsprFSm-1C2iXooIw5x6N12m70",
      },
      { title: "Corse Drone | Nettoyage, Agriculture & Transport par drone" },
      {
        name: "description",
        content:
          "Corse Drone MCG : solutions professionnelles par drone en Corse. Nettoyage de toitures, façades et panneaux solaires, data agricole et transport. Devis gratuit.",
      },
      { name: "author", content: "Corse Drone" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Corse Drone" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:url", content: "https://corse-drone.com/" },
      {
        property: "og:title",
        content: "Corse Drone | Nettoyage, Agriculture & Transport par drone",
      },
      {
        property: "og:description",
        content:
          "Corse Drone MCG : solutions professionnelles par drone en Corse. Nettoyage de toitures, façades et panneaux solaires, data agricole et transport. Devis gratuit.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Corse Drone | Nettoyage, Agriculture & Transport par drone",
      },
      {
        name: "twitter:description",
        content:
          "Corse Drone MCG : solutions professionnelles par drone en Corse. Nettoyage de toitures, façades et panneaux solaires, data agricole et transport. Devis gratuit.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        href: "/favicon-96.png",
      },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://cdn.gpteng.co" },
      { rel: "dns-prefetch", href: "https://cdn.gpteng.co" },
      {
        rel: "preload",
        href: "/fonts/fraunces-latin-600-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/geist-sans-latin-600-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Corse Drone — Le journal de bord",
        href: "https://corse-drone.com/rss.xml",
      },
    ],
    scripts: [
      {
        src: "https://plausible.io/js/pa-ehT06jIuzZdJtgLjr-mzZ.js",
        async: true,
      },
      {
        children:
          "window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: RootErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // ported from main.tsx — preload hero images once on client startup
  useEffect(() => {
    for (const pole of POLES) {
      if (!pole.heroImage) continue;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = pole.heroImage;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <UIBannerProvider>
            <PlausibleTracker />
            <SmoothScrollProvider>
              <ScrollToTop />
              <Outlet />
            </SmoothScrollProvider>
          </UIBannerProvider>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-bg">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6 py-24 text-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-text-secondary">
            Erreur 404
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-text-primary">
            Page introuvable
          </h1>
          <p className="mt-4 text-text-secondary max-w-md mx-auto">
            La page que vous cherchez n'existe pas ou a été déplacée.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-pole-nettoyage px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Retour à l'accueil
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function RootErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-bg px-6 text-center">
      <div className="max-w-md">
        <h1 className="font-display text-3xl text-text-primary">
          Cette page n'a pas pu se charger
        </h1>
        <p className="mt-4 text-text-secondary">
          Une erreur est survenue de notre côté. Vous pouvez réessayer ou
          revenir à l'accueil.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-pole-nettoyage px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Réessayer
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-text-primary/15 px-7 py-3.5 text-sm font-semibold text-text-primary"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
