/**
 * Build-time prerender (SSG).
 *
 * Runs after `vite build` (client) + `vite build --ssr`. Renders every public
 * route to static HTML so crawlers and AI agents receive full page content
 * without executing JavaScript. The client bundle still boots and takes over.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

// ---------------------------------------------------------------------------
// Browser globals needed by modules that touch them at import time
// (the auto-generated Supabase client reads `localStorage`).
// ---------------------------------------------------------------------------
const memoryStorage = (() => {
  const store = new Map<string, string>();
  return {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size;
    },
  };
})();

const g = globalThis as Record<string, unknown>;
g.localStorage ??= memoryStorage;
g.sessionStorage ??= memoryStorage;

const ROOT = resolve(process.cwd());
const DIST = join(ROOT, "dist");
const SITE_URL = "https://corse-drone.com";

// Hard cap: publishing rejects builds above 50k files.
const MAX_PRERENDER_PAGES = 500;

const STATIC_ROUTES = [
  "/",
  "/blog",
  "/contact",
  "/partenaires",
  "/expertises",
  "/pole/nettoyage",
  "/pole/diagnostic",
  "/pole/agriculture",
  "/pole/transport",
  "/pole/nettoyage/toitures",
  "/pole/nettoyage/facades",
  "/pole/nettoyage/panneaux-solaires",
  "/pole/diagnostic/thermique",
  "/pole/diagnostic/visuel",
  "/mentions-legales",
  "/politique-confidentialite",
];

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL ?? "https://jqiilolffxtjruvivnhf.supabase.co";
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWlsb2xmZnh0anJ1dml2bmhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNDE0MTMsImV4cCI6MjA5MzYxNzQxM30.FJzQu36Pdj7Na_Y8TrlQKAfW2aktQcJcM24ynFzbvLs";

const fetchPostSlugs = async (): Promise<string[]> => {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/blog_posts?select=slug&status=eq.published`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } },
    );
    if (!res.ok) return [];
    const rows = (await res.json()) as { slug: string }[];
    return rows.map((r) => r.slug).filter(Boolean);
  } catch {
    return [];
  }
};

/** Strip head tags that the per-page Helmet output replaces. */
const stripDuplicateHead = (html: string) =>
  html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
    .replace(/<meta\s+name="title"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, "")
    .replace(/<meta\s+property="og:(title|description|url|type)"[^>]*>\s*/gi, "")
    .replace(/<meta\s+name="twitter:(title|description|url)"[^>]*>\s*/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, "");

const main = async () => {
  const template = readFileSync(join(DIST, "index.html"), "utf-8");
  const { render } = (await import(
    join(DIST, "server", "entry-server.js")
  )) as typeof import("../src/entry-server");

  const slugs = await fetchPostSlugs();
  const routes = [
    ...STATIC_ROUTES,
    ...slugs.map((s) => `/blog/${s}`),
  ].slice(0, MAX_PRERENDER_PAGES);

  let ok = 0;
  for (const route of routes) {
    try {
      const { html, head } = await render(route);
      let page = stripDuplicateHead(template)
        .replace("</head>", `  ${head}\n  </head>`)
        .replace(
          '<div id="root"></div>',
          `<div id="root">${html}</div>`,
        );
      if (!head.includes('rel="canonical"')) {
        page = page.replace(
          "</head>",
          `  <link rel="canonical" href="${SITE_URL}${route === "/" ? "/" : route}" />\n  </head>`,
        );
      }
      const outFile =
        route === "/"
          ? join(DIST, "index.html")
          : join(DIST, route.replace(/^\//, ""), "index.html");
      mkdirSync(dirname(outFile), { recursive: true });
      writeFileSync(outFile, page, "utf-8");
      ok++;
    } catch (err) {
      console.error(`[prerender] FAILED ${route}:`, (err as Error).message);
    }
  }

  console.log(`[prerender] ${ok}/${routes.length} routes written`);
};

main().catch((err) => {
  console.error("[prerender] fatal", err);
  process.exit(1);
});
