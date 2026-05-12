
-- 1. Drop listing policy on blog-covers (public URL access still works because bucket is public)
DROP POLICY IF EXISTS "public read blog-covers" ON storage.objects;

-- 2. Restrict has_role: revoke from public/anon, keep authenticated (needed for RLS evaluation)
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, app_role) TO authenticated, service_role;
