# Phase 5 — Admin Authentication & Shell

Build the admin auth foundation: grant PF the admin role, create an AuthContext, a login page, a route guard, an admin layout, and a dashboard placeholder. No public-site changes, no signup UI, no schema changes beyond seeding 2 rows.

## 1. Database migration (1 call to supabase--migration)

Two statements in one migration:

```sql
INSERT INTO user_roles (user_id, role)
VALUES ('8e00f50e-24db-4f31-85bc-bb50938117d6', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;

UPDATE blog_authors
SET user_id = '8e00f50e-24db-4f31-85bc-bb50938117d6'
WHERE initials = 'PF' AND user_id IS NULL;
```

Then verify with the spec's SELECT join — must return one row, role=`admin`, author_name=`Pierre-François Morganti`.

Note: technically these are data ops (insert/update), but they're permanent seed/link operations tied to a one-off bootstrap. Will use `supabase--insert` to respect the "migration = schema only" rule, then run the verification with `supabase--read_query`.

## 2. Files to create

```text
src/contexts/AuthContext.tsx        AuthProvider + context, session+admin+isLoading
src/hooks/useAuth.ts                useContext wrapper, throws if outside provider
src/pages/admin/AdminLogin.tsx      /admin/login page
src/components/admin/AdminRoute.tsx Guard wrapper
src/components/admin/AdminLayout.tsx Shell with top bar + Outlet
src/pages/admin/AdminDashboard.tsx  /admin index page
```

## 3. Files to modify

- `src/App.tsx`: wrap with `<AuthProvider>` (inside QueryClientProvider, outside BrowserRouter); add lazy-loaded routes `/admin/login`, `/admin/*` with nested `index → AdminDashboard`.

## 4. Technical details

**AuthContext**
- State: `user`, `session`, `isAdmin`, `isLoading`.
- On mount: subscribe to `onAuthStateChange` FIRST, then call `getSession()` (Supabase recommended order to avoid missed events).
- Whenever session.user changes: query `user_roles` filtered by `user_id` and `role='admin'` with `.maybeSingle()`. Set `isAdmin = !!data`.
- `isLoading` flips to false only after initial session check + (if user) admin check resolved.
- `signIn`: just calls `signInWithPassword`, returns `{ error }` immediately — does NOT await admin check (race-condition note from spec).
- `signOut`: `supabase.auth.signOut()`.
- Cleanup: unsubscribe in useEffect return.

**AdminLogin**
- Standalone page (no site Header). Top: small wordmark linking `/`.
- Centered Card max-w-md with Fraunces title, Geist body.
- Email + password (with show/hide eye toggle) + submit button.
- Loading state on button while submitting.
- Translates `Invalid login credentials` → `Identifiants incorrects`; default to raw `error.message` otherwise.
- If already `user && isAdmin`, immediate `<Navigate to={redirect ?? '/admin'} replace />`.
- Uses `useSearchParams` to read `?redirect=`.

**AdminRoute**
- `isLoading` → centered spinner ("Chargement…").
- `!user` → `<Navigate to={'/admin/login?redirect=' + encodeURIComponent(location.pathname)} replace />`.
- `user && !isAdmin` → toast `Vous n'avez pas accès à cette zone` + `<Navigate to="/" replace />`.
- Else render children.

**AdminLayout**
- Top bar: cream bg `#FCFAF7`, `border-b`, max-w-7xl wrapper.
- Left: Corse Drone wordmark + small `ADMIN` pill (primary color, uppercase, tracking-wide).
- Center: nav links (`Tableau de bord` → `/admin`, `Blog` → `/admin/blog`) with active state via `NavLink` (underline + primary color).
- Right: Avatar circle (PF initials, gradient from blog_authors data when available, fallback to email initial) → DropdownMenu: "Voir le site" (target=_blank), "Se déconnecter" (calls signOut → navigate `/`).
- Body: `<Outlet />` inside `max-w-7xl py-12 px-6`.

**AdminDashboard**
- Fetch logged-in author via small inline query on `blog_authors` by `user_id` for the first name (fallback: email username).
- Title `Bonjour, {firstName}` (Fraunces) + muted subtitle.
- Grid `md:grid-cols-2 lg:grid-cols-3`.
- Card "Articles du blog": book icon, title, description, count from `useBlogPosts()` (`{count} articles publiés`), CTA `<Link to="/admin/blog">Gérer le blog →</Link>`.
- One disabled placeholder card "Bientôt : Réalisations" (muted, no hover).

**Routing in App.tsx**

```tsx
<AuthProvider>
  <BrowserRouter>
    ...
    <Route path="/admin/login" element={<Suspense ...><AdminLogin /></Suspense>} />
    <Route path="/admin/*" element={<Suspense ...><AdminRoute><AdminLayout /></AdminRoute></Suspense>}>
      <Route index element={<AdminDashboard />} />
    </Route>
  </BrowserRouter>
</AuthProvider>
```

`AdminLogin`, `AdminLayout`, `AdminDashboard` all behind `React.lazy`.

## 5. Supabase signup setting

Lovable Cloud exposes `disable_signup` via `configure_auth`. I'll set `disable_signup: true` (keep `auto_confirm_email: false`, `password_hibp_enabled: true`, `external_anonymous_users_enabled: false`) so no random user can self-register. Will note this clearly in the final output.

## 6. Verification

- `supabase--read_query` join confirming role + author link.
- `tsc --noEmit` (handled by harness).
- Walk the 9-item testing checklist — note any item requiring manual browser test.

## 7. Out of scope (untouched)

Public site, blog frontend (phase 4), schema (phase 3), Resend, Plausible, SEO assets.
