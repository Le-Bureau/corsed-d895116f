import { createFileRoute } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

const SITE_URL = "https://corse-drone.com";

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const { data: posts } = await supabase
          .from("blog_posts")
          .select("slug, title, excerpt, published_at")
          .eq("status", "published")
          .order("published_at", { ascending: false })
          .limit(50);

        const items = (posts ?? [])
          .map(
            (p) => `  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${SITE_URL}/blog/${escapeXml(p.slug)}</link>
    <guid isPermaLink="true">${SITE_URL}/blog/${escapeXml(p.slug)}</guid>
    <description>${escapeXml(p.excerpt ?? "")}</description>
    ${
      p.published_at
        ? `<pubDate>${new Date(p.published_at).toUTCString()}</pubDate>`
        : ""
    }
  </item>`,
          )
          .join("\n");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Le journal de bord | Corse Drone</title>
  <link>${SITE_URL}/blog</link>
  <description>Retours de chantiers, expertises drone et actualités du secteur. Le journal de bord de Corse Drone, écrit depuis Bastia.</description>
  <language>fr-FR</language>
${items}
</channel>
</rss>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=300",
          },
        });
      },
    },
  },
});
