import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { POLES } from "@/lib/poles";
import { SUB_POLE_CONTENT } from "@/lib/sub-poles";

const SITE_URL = "https://corse-drone.com";

const STATIC_PATHS = [
  "/",
  "/blog",
  "/expertises",
  "/partenaires",
  "/contact",
  "/mentions-legales",
  "/politique-confidentialite",
];

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls: Array<{ loc: string; lastmod?: string | undefined }> = [];

        for (const path of STATIC_PATHS) {
          urls.push({ loc: `${SITE_URL}${path}` });
        }
        for (const pole of POLES) {
          urls.push({ loc: `${SITE_URL}/pole/${pole.key}` });
        }
        for (const [poleKey, subs] of Object.entries(SUB_POLE_CONTENT)) {
          for (const subKey of Object.keys(subs)) {
            urls.push({ loc: `${SITE_URL}/pole/${poleKey}/${subKey}` });
          }
        }

        const { data: posts } = await supabase
          .from("blog_posts")
          .select("slug, updated_at, published_at")
          .eq("status", "published")
          .order("published_at", { ascending: false });

        for (const post of posts ?? []) {
          urls.push({
            loc: `${SITE_URL}/blog/${post.slug}`,
            lastmod: (post.updated_at ?? post.published_at ?? undefined) as
              | string
              | undefined,
          });
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${escapeXml(u.loc)}</loc>${
        u.lastmod ? `<lastmod>${escapeXml(u.lastmod.slice(0, 10))}</lastmod>` : ""
      }</url>`,
  )
  .join("\n")}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
});
