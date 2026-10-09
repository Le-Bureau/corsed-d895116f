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
import { MotionConfig } from "motion/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { UIBannerProvider } from "@/contexts/UIBannerContext";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { usePlausibleTracking } from "@/hooks/usePlausibleTracking";
import { Link } from "@/lib/router-compat";
import NotFoundPage from "@/components/layout/NotFoundPage";
import { POLES } from "@/lib/poles";
import { SUB_POLE_CONTENT } from "@/lib/sub-poles";
import { reportLovableError } from "@/lib/lovable-error-reporting";

const PlausibleTracker = () => {
  usePlausibleTracking();
  return null;
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ matches }) => {
    // No leaf route matched → the notFoundComponent is rendering (true 404).
    // Pole routes with an unknown slug also render the 404 (their loader
    // throws notFound, which skips their own head), so detect them here.
    const leaf = matches[matches.length - 1] as
      | { routeId?: string; params?: Record<string, string> }
      | undefined;
    const leafParams = leaf?.params ?? {};
    const invalidPole =
      (leaf?.routeId === "/_public/pole/$slug/" ||
        leaf?.routeId === "/_public/pole/$slug/$subSlug") &&
      (!POLES.some((p) => p.key === leafParams["slug"]) ||
        (leaf.routeId === "/_public/pole/$slug/$subSlug" &&
          !SUB_POLE_CONTENT[leafParams["slug"] ?? ""]?.[
            leafParams["subSlug"] ?? ""
          ]));
    const isNotFound =
      matches.every((m) => m.routeId === "__root__") || invalidPole;
    return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0A0E1A" },
      {
        name: "google-site-verification",
        content: "47fAdsNz7GQ2Lstj9DsprFSm-1C2iXooIw5x6N12m70",
      },
      {
        title: isNotFound
          ? "Page introuvable | Corse Drone"
          : "Corse Drone | Drone professionnel en Corse",
      },
      ...(isNotFound ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      {
        name: "description",
        content:
          "Corse Drone : opérateur drone professionnel en Corse. Nettoyage de toitures, façades et panneaux solaires, diagnostic thermique, transport et agriculture. Devis gratuit.",
      },
      { name: "author", content: "Corse Drone" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Corse Drone" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:url", content: "https://corse-drone.com/" },
      {
        property: "og:title",
        content: "Corse Drone | Drone professionnel en Corse",
      },
      {
        property: "og:description",
        content:
          "Corse Drone : opérateur drone professionnel en Corse. Nettoyage de toitures, façades et panneaux solaires, diagnostic thermique, transport et agriculture. Devis gratuit.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Corse Drone | Drone professionnel en Corse",
      },
      {
        name: "twitter:description",
        content:
          "Corse Drone : opérateur drone professionnel en Corse. Nettoyage de toitures, façades et panneaux solaires, diagnostic thermique, transport et agriculture. Devis gratuit.",
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
        title: "Le journal de bord | Corse Drone",
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
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundPage,
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
    <MotionConfig reducedMotion="user">
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
    </MotionConfig>
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
            className="inline-flex items-center justify-center rounded-full bg-pole-nettoyage-base px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 motion-reduce:transform-none"
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
