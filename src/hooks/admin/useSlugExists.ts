import { supabase } from "@/integrations/supabase/client";

/** Returns true if a post with this slug already exists (excluding `excludeId` if provided). */
export const slugExists = async (slug: string, excludeId?: string): Promise<boolean> => {
  let query = supabase.from("blog_posts").select("id").eq("slug", slug).limit(1);
  if (excludeId) query = query.neq("id", excludeId);
  const { data, error } = await query.maybeSingle();
  if (error) {
    // If RLS or query fails, fail open (don't block submit) — DB unique constraint is the hard guarantee
    console.error("[slugExists] check failed", error);
    return false;
  }
  return !!data;
};
