import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/geist-sans/400.css";
import "@fontsource/geist-sans/500.css";
import "@fontsource/geist-sans/600.css";
import "@fontsource/geist-sans/700.css";
import "@fontsource/geist-sans/800.css";
import "@fontsource/geist-sans/900.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/fraunces/400-italic.css";
import "@fontsource/fraunces/500-italic.css";
import App from "./App.tsx";
import "./index.css";
import { POLES } from "./lib/poles";

// Preload the first hero image (LCP candidate) with highest priority,
// then preload the remaining showcase + hero images in the background.
const firstPole = POLES[0];
if (firstPole?.heroImage) {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = firstPole.heroImage;
  link.type = "image/webp";
  link.setAttribute("fetchpriority", "high");
  document.head.appendChild(link);
}

POLES.forEach((pole) => {
  if (!pole.showcaseImage) return;
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = pole.showcaseImage;
  link.type = "image/webp";
  document.head.appendChild(link);
});

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
