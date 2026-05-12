# Phase 6 — Admin Blog CRUD

Build the back-office UI for blog posts at `/admin/blog`, `/admin/blog/new`, `/admin/blog/:id/edit`, with image upload, markdown editor + live preview, and full create/update/delete flows. RLS already permits admins; auth shell from phase 5 wraps everything.

## Routes (added to `App.tsx` under existing `<AdminRoute><AdminLayout/>`)

```
/admin/blog            → AdminBlogList
/admin/blog/new        → AdminBlogEditor (mode=create)
/admin/blog/:id/edit   → AdminBlogEditor (mode=edit)
```

All lazy-loaded.

## Files to create

```text
src/hooks/admin/useAdminBlogPosts.ts       all posts (drafts + published)
src/hooks/admin/useAdminBlogPost.ts        single post by id
src/hooks/admin/useCreateBlogPost.ts       insert mutation
src/hooks/admin/useUpdateBlogPost.ts       update mutation
src/hooks/admin/useDeleteBlogPost.ts       delete mutation
src/hooks/admin/useSlugExists.ts           soft uniqueness check
src/hooks/admin/useImageUpload.ts          storage upload helper

src/lib/admin/blogPostSchema.ts            zod schema + types
src/lib/admin/markdownSnippets.ts          snippet templates + insert helper

src/components/admin/ImageUploader.tsx     drag-drop + preview + replace/remove
src/components/admin/MarkdownToolbar.tsx   buttons that insert into <textarea>
src/components/admin/MarkdownSyntaxHelp.tsx Sheet documenting custom HTML syntax
src/components/admin/SeoPreview.tsx         Google-style mockup
src/components/admin/UnsavedChangesPrompt.tsx beforeunload + nav guard

src/components/admin/blog-list/BlogPostsTable.tsx
src/components/admin/blog-list/BlogPostRow.tsx
src/components/admin/blog-list/BlogListFilters.tsx

src/pages/admin/AdminBlogList.tsx
src/pages/admin/AdminBlogEditor.tsx
```

## Files to modify

- `src/App.tsx` — add 3 admin routes, lazy-loaded.
- `src/pages/admin/AdminDashboard.tsx` — real `{drafts}` / `{published}` counts on the Blog card; new "Articles récents" list (5 most recent updated posts → link to editor).
- `src/components/admin/AdminLayout.tsx` — already uses NavLink without `end` for `/admin/blog`, so it stays active for `/admin/blog/*`. Verify and adjust if needed.

## Listing page (`AdminBlogList`)

- Header: `Articles du blog` (Fraunces) + `{n} brouillons · {m} publiés`.
- Sticky action bar: search (debounced 200 ms via small `useDebounce` inline), status segmented `[Tous|Brouillons|Publiés]`, category select, author select, primary `Nouvel article` button (Plus icon) → `/admin/blog/new`.
- Table built with shadcn `Table`: thumbnail (or gradient fallback from `author.gradient_*`) · title (Star icon if `featured_on_home`) + slug muted · status pill · `BlogCategoryPill` · author initials avatar · `formatBlogDate(updated_at)` · actions `DropdownMenu` (Modifier, Voir si publié → `/blog/{slug}` new tab, Supprimer → AlertDialog).
- Empty states: "Aucun article" with primary CTA when zero total; "Aucun article ne correspond aux filtres" otherwise.
- Filters applied client-side over `useAdminBlogPosts()`.

## Editor page (`AdminBlogEditor`)

- One component for create + edit, behavior switched by presence of `:id`.
- `react-hook-form` + `zodResolver(blogPostSchema)`.
- Form initial values: empty defaults (status=`draft`, featured_on_home=`false`, author_id=current user's author if available else first author) for create; loaded post for edit.
- Layout: `grid lg:grid-cols-[1fr_360px] gap-8`. Single column on `<lg`.

**Left column**
- Title input.
- Slug input + helper. Auto-sync logic: a `useRef<boolean>` `slugManuallyEdited`; `useEffect` watches `title` and updates slug only while ref is false; `onChange` of slug sets ref to true.
- Excerpt textarea + live `{n}/220` counter (red beyond limit).
- Content area: `Tabs [Éditer | Aperçu]` on `<lg`, side-by-side on `lg+` (custom layout — `Tabs` defaultValue Edit; on lg, render both panels visible). `MarkdownToolbar` above editor; textarea (Geist Mono, `min-h-[500px]`); preview pane uses `<BlogContent markdown={contentValue} />` directly. "Légende de la syntaxe" link → opens `MarkdownSyntaxHelp` Sheet.

**Right column (sticky `lg:sticky lg:top-20`)**
- Status segmented control.
- `featured_on_home` Switch + helper text.
- Author Select (3 options, dot using `gradient_from`).
- Category Select (7 options, colored dot via `category.color`).
- `ImageUploader` for cover (folder=`covers`).
- `ImageUploader` for hero (folder=`heroes`) + helper text.
- SEO `Accordion` (collapsed) → meta_title input + counter, meta_description textarea + counter, `SeoPreview` live mockup.

**Bottom action bar (sticky bottom)**
- Cancel link (with `UnsavedChangesPrompt` when dirty).
- Create mode: `Enregistrer en brouillon` (secondary, sets status=draft) + `Publier` (primary, sets status=published).
- Edit mode: `Supprimer` (destructive, far left, AlertDialog) + `Mettre à jour` (primary, keeps current status).

**Submit pipeline**
1. `slugExists(slug, excludeId)` via `useSlugExists`. If taken → form error on `slug`, abort.
2. If editing a `published` post and slug changed → `confirm()` dialog with the warning text. Abort on cancel.
3. Mutate (create or update). Toast success ("Article créé" / "Modifications enregistrées" / "Article publié" / "Article remis en brouillon" depending on transition). Navigate to `/admin/blog` (create) or stay (edit).
4. On error: top-of-form alert + sonner toast.

## Image upload

`useImageUpload({ folder, postId? })`:
- Validate `file.type.startsWith('image/')` and `file.size <= 5 MB` (5_242_880).
- Path: `${folder}/${postId ?? 'unassigned'}/${crypto.randomUUID()}.${ext}`.
- `supabase.storage.from('blog-covers').upload(path, file, { contentType: file.type, upsert: false })`.
- Return public URL via `getPublicUrl(path).data.publicUrl`.
- Comment in file noting orphaned-files trade-off (no cleanup in V1).

`ImageUploader`: controlled by `value`/`onChange`. Empty state = dashed border drop zone (drag visual feedback via `dragActive` state). Filled state = thumbnail + Remplacer (re-opens file picker) + Supprimer (sets value to null; storage file stays). Inline error under zone for validation failures.

RLS for the bucket: bucket `blog-covers` is already public for SELECT (phase 3). Uploads need INSERT policies. Need to verify policies allow authenticated admins. If missing, add a migration with:
```sql
CREATE POLICY "admins upload blog covers" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins update blog covers" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins delete blog covers" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'blog-covers' AND public.has_role(auth.uid(), 'admin'));
```
Will check existing storage policies first and only add what's missing.

## Markdown toolbar

`MarkdownToolbar` accepts a `textareaRef` and a `setValue` callback. Each button has an `inline` (wrap selection) or `block` (insert at line start / new block) behavior. After insert, restore focus and selection.

**Important deviation from spec**: the spec proposes `![Alt|wide]` and `> [!info]` syntax, but `BlogContent` uses `rehype-raw` and the seed posts use **raw HTML** (`<figure>`, `<figure class="wide">`, `<div class="image-grid">`, `<div class="callout">`). To stay consistent with what the public renderer actually supports, the toolbar will insert HTML snippets that match the existing conventions:

```
<figure>
  <img src="URL" alt="Alt" />
  <figcaption>Légende</figcaption>
</figure>

<figure class="wide">…</figure>

<div class="image-grid">
  <figure>…</figure>
  <figure>…</figure>
</div>

<div class="callout">
  <div class="callout__icon">i</div>
  <p>Texte du callout.</p>
</div>
```

`MarkdownSyntaxHelp` Sheet documents all of these with copyable examples.

## Hooks (React Query)

- `useAdminBlogPosts` — `queryKey: ['blog','posts','admin']`, no status filter, joined `author` + `category`, ordered `updated_at desc`, `staleTime: 30s`.
- `useAdminBlogPost(id)` — `queryKey: ['blog','post','id', id]`.
- `useCreateBlogPost` — invalidates `['blog','posts']` (matches both admin and public via `queryKey.startsWith`).
- `useUpdateBlogPost` — same; also invalidates `['blog','post', oldSlug]` and `['blog','post', newSlug]` if changed, plus `['blog','post','id', id]`.
- `useDeleteBlogPost` — invalidates `['blog','posts']`, removes `['blog','post', slug]`.
- `useSlugExists` — one-shot `select('id').eq('slug', slug).neq('id', excludeId ?? '').maybeSingle()`; not cached, called manually before submit.

The public `useBlogPosts` `queryKey` from phase 4 is `['blog','posts','published']`; invalidating prefix `['blog','posts']` will refresh both admin and public lists.

## Toasts

Sonner (already used in `PartenairesForm`). Standard messages per spec.

## Out of scope

Public site, public blog hooks, RLS schema, AuthContext, AdminRoute, AdminLayout shell (only NavLink active behavior verified), Resend, Plausible, SEO meta of public site.

## Verification

- `tsc --noEmit` clean.
- Walk the 16-item testing checklist; report any item needing manual click-through.
- Confirm storage policies allow admin uploads (add migration if missing).
