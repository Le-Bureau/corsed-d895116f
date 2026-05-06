import { createRoot } from "react-dom/client";
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
import App from "./App.tsx";
import "./index.css";
import { POLES } from "./lib/poles";

// Inject <link rel="preload"> for pole showcase images so the browser
// fetches them in parallel with the JS bundle, well before the user
// reaches the showcase section. The first pole gets fetchpriority="high".
POLES.forEach((pole, index) => {
  if (!pole.showcaseImage) return;
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = pole.showcaseImage;
  link.type = "image/webp";
  if (index === 0) link.setAttribute("fetchpriority", "high");
  document.head.appendChild(link);
});

createRoot(document.getElementById("root")!).render(<App />);
