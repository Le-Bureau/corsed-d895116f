/**
 * Build-time sitemap generator.
 * Run automatically before `vite build` via the `prebuild` npm script.
 *
 * Reads the static core URLs from CORE_URLS, fetches all published blog posts
 * from Supabase via the REST API (no extra deps), and writes public/sitemap.xml.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const SITE_URL = "https://corse-drone.com";

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL ?? "https://jqiilolffxtjruvivnhf.supabase.co";
// Prefer the service role key when available (build environment) so RLS does
// not block the read; fall back to the publishable anon key otherwise.
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxaWlsb2xmZnh0anJ1dml2bmhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgwNDE0MTMsImV4cCI6MjA5MzYxNzQxM30.FJzQu36Pdj7Na_Y8TrlQKAfW2aktQcJcM24ynFzbvLs";

interface UrlEntry {
  loc: string;
  lastmod: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
}

const today = new Date().toISOString().slice(0, 10);

const CORE_URLS: UrlEntry[] = [
  { loc: `${SITE_URL}/`,                                 lastmod: today, changefreq: "weekly",  priority: "1.0" },
  { loc: `${SITE_URL}/blog`,                             lastmod: today, changefreq: "weekly",  priority: "0.8" },
  { loc: `${SITE_URL}/contact`,                          lastmod: today, changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE_URL}/partenaires`,                      lastmod: today, changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE_URL}/pole/nettoyage`,                   lastmod: today, changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE_URL}/pole/diagnostic`,                  lastmod: today, changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE_URL}/pole/agriculture`,                 lastmod: today, changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE_URL}/pole/transport`,                   lastmod: today, changefreq: "monthly", priority: "0.8" },
  { loc: `${SITE_URL}/pole/nettoyage/toitures`,          lastmod: today, changefreq: "monthly", priority: "0.5" },
  { loc: `${SITE_URL}/pole/nettoyage/facades`,           lastmod: today, changefreq: "monthly", priority: "0.5" },
  { loc: `${SITE_URL}/pole/nettoyage/panneaux-solaires`, lastmod: today, changefreq: "monthly", priority: "0.5" },
  { loc: `${SITE_URL}/pole/diagnostic/thermique`,        lastmod: today, changefreq: "monthly", priority: "0.5" },
  { loc: `${SITE_URL}/pole/diagnostic/visuel`,           lastmod: today, changefreq: "monthly", priority: "0.5" },
  { loc: `${SITE_URL}/mentions-legales`,                 lastmod: today, changefreq: "yearly",  priority: "0.3" },
  { loc: `${SITE_URL}/politique-confidentialite`,        lastmod: today, changefreq: "yearly",  priority: "0.3" },
];

interface PostRow {
  slug: string;
  published_at: string | null;
  updated_at: string | null;
}

const fetchPublishedPosts = async (): Promise<PostRow[]> => {
  const url = `${SUPABASE_URL}/rest/v1/blog_posts?select=slug,published_at,updated_at&status=eq.published`;
  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (!res.ok) {
    console.warn(
      `[sitemap] Could not fetch blog posts (HTTP ${res.status}). Falling back to core URLs only.`,
    );
    return [];
  }
  return (await res.json()) as PostRow[];
};

const isoDate = (s: string | null): string =>
  (s ?? new Date().toISOString()).slice(0, 10);

const buildXml = (entries: UrlEntry[]): string => {
  const body = entries
    .map(
      (u) =>
        `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
};

const main = async () => {
  const posts = await fetchPublishedPosts();

  const blogEntries: UrlEntry[] = posts.map((p) => {
    const last =
      p.updated_at && p.published_at
        ? p.updated_at > p.published_at
          ? p.updated_at
          : p.published_at
        : (p.updated_at ?? p.published_at);
    return {
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: isoDate(last),
      changefreq: "monthly",
      priority: "0.6",
    };
  });

  const xml = buildXml([...CORE_URLS, ...blogEntries]);
  const out = resolve(process.cwd(), "public/sitemap.xml");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, xml, "utf8");

  console.log(
    `[sitemap] Wrote ${CORE_URLS.length + blogEntries.length} URLs to public/sitemap.xml (${blogEntries.length} blog posts).`,
  );
};

main().catch((err) => {
  console.error("[sitemap] Generation failed:", err);
  process.exit(0);
});
