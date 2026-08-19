import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";

// react-helmet-async v3 does not export FilledContext; keep it structural.
type HelmetCtx = { helmet?: import("react-helmet-async").HelmetServerState };
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { UIBannerProvider } from "@/contexts/UIBannerContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { mapPost, mapCategory, type PostRow } from "@/hooks/blog/mappers";
import AppRoutes, { ssrPreloads } from "./routes";

const POST_SELECT = `*, author:blog_authors(*), category:blog_categories(*)`;

/** Warm the react-query cache so the markup contains real content. */
const prefetch = async (queryClient: QueryClient, url: string) => {
  const tasks: Promise<unknown>[] = [];

  const needsPosts = url === "/" || url.startsWith("/blog");
  if (needsPosts) {
    tasks.push(
      queryClient.prefetchQuery({
        queryKey: ["blog", "posts", "published"],
        queryFn: async () => {
          const { data } = await supabase
            .from("blog_posts")
            .select(POST_SELECT)
            .eq("status", "published")
            .order("published_at", { ascending: false });
          return ((data ?? []) as unknown as PostRow[]).map(mapPost);
        },
      }),
      queryClient.prefetchQuery({
        queryKey: ["blog", "categories"],
        queryFn: async () => {
          const { data } = await supabase
            .from("blog_categories")
            .select("*")
            .order("sort_order", { ascending: true });
          return (data ?? []).map(mapCategory);
        },
      }),
    );
  }

  const postMatch = url.match(/^\/blog\/([^/?#]+)/);
  if (postMatch) {
    const slug = decodeURIComponent(postMatch[1]);
    tasks.push(
      queryClient.prefetchQuery({
        queryKey: ["blog", "post", slug],
        queryFn: async () => {
          const { data } = await supabase
            .from("blog_posts")
            .select(POST_SELECT)
            .eq("slug", slug)
            .eq("status", "published")
            .maybeSingle();
          return data ? mapPost(data as unknown as PostRow) : null;
        },
      }),
    );
  }

  await Promise.all(tasks);
};

export interface RenderResult {
  html: string;
  head: string;
  htmlAttrs: string;
}

export async function render(url: string): Promise<RenderResult> {
  await Promise.all(ssrPreloads);

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: Infinity } },
  });
  await prefetch(queryClient, url);

  const helmetContext: HelmetCtx = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <UIBannerProvider>
              <StaticRouter location={url}>
                <AppRoutes />
              </StaticRouter>
            </UIBannerProvider>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>,
  );

  const { helmet } = helmetContext;
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ]
        .filter(Boolean)
        .join("\n    ")
    : "";

  return { html, head, htmlAttrs: helmet ? helmet.htmlAttributes.toString() : "" };
}
