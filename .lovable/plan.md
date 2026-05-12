## Phase 4 — Wire blog frontend to Supabase

Replace all reads from `mockBlogData.ts` with React Query + Supabase. Read-only, public, published posts only. No auth, no admin, no writes.

---

### 1. New canonical types (`src/types/blog.ts`)

`BlogAuthor`, `BlogCategory`, `BlogPost` exactly as specified, with embedded `author` and `category` objects on `BlogPost` (camelCase).

### 2. New hooks (`src/hooks/blog/`)

All use `@tanstack/react-query` (already wired in `App.tsx`). Each hook owns its row→camelCase mapper.

- `useBlogCategories.ts` — `staleTime: Infinity`, ordered by `sort_order`.
- `useBlogAuthors.ts` — same pattern.
- `useBlogPosts.ts` — accepts `{ categorySlug? }`. Single query fetches all published posts joined with author + category (`*, author:blog_authors(*), category:blog_categories(*)`), ordered by `published_at desc`. Filtering by `categorySlug` is done **client-side** on the returned list (simpler, low volume, lets `useBlogCategoryCounts` reuse the same cache).
- `useBlogPost.ts` — fetches by `slug` + `status='published'`, joined; returns `BlogPost | null` (treat PGRST116 / empty as null, not error).
- `useHomeBlogSelection.ts` — reuses `useBlogPosts()` cache, derives `{ featured, secondary }` (featured = `featuredOnHome` or first; secondary = next 2 excluding featured).
- `useBlogCategoryCounts.ts` — derives `Record<slug, number>` from `useBlogPosts()` via `useMemo`.

### 3. Mock data + helpers cleanup

- **Delete** `src/data/mockBlogData.ts`.
- In `src/lib/blogHelpers.ts`: keep `formatBlogDate`, `getReadingTime`, `slugify`. Remove `getLatestPosts`, `getRelatedPosts`, `getHomeBlogSelection`, `HomeBlogSelection`.

### 4. Presentational components — switch from ID lookups to embedded objects

The cards currently pass `categoryId` / `authorId` to subcomponents that called `getCategory` / `getAuthor` from the mock module. With the new shape, the joined `category` and `author` are already on the post — pass them directly. Visual design unchanged.

- `BlogCategoryPill.tsx` — accept `category: BlogCategory` instead of `categoryId`.
- `BlogAuthorMeta.tsx` — accept `author: BlogAuthor` instead of `authorId`; drop `getCategory` no-op import.
- `BlogCard.tsx`, `BlogFeaturedCard.tsx`, `HomeFeaturedCard.tsx` — read `post.category` / `post.author` directly, forward to the subcomponents. Update the `BlogPost` import to `@/types/blog`.
- `BlogAuthorBio.tsx` (used by `BlogPost.tsx`) — accept `author: BlogAuthor` directly instead of `authorId`.

### 5. Skeletons (`src/components/blog/skeletons/`)

Use `@/components/ui/skeleton` (already present), `animate-pulse`, same outer dimensions as loaded state to avoid CLS.

- `BlogCardSkeleton.tsx`
- `BlogFeaturedSkeleton.tsx`
- `HomeFeaturedSkeleton.tsx`
- `BlogPostSkeleton.tsx`

### 6. Page wiring

**`src/pages/Index.tsx` → `LatestArticlesSection.tsx`**
Move data fetch into the section component (cleaner). Use `useHomeBlogSelection()`.
- Loading → render `HomeFeaturedSkeleton` + 2 `BlogCardSkeleton`.
- Error or empty (`!featured`) → return `null` (silent on home).

**`src/pages/Blog.tsx`**
- Replace local `useState` for `activeCategory` with `useSearchParams()` (`?cat=<slug>`).
- `useBlogCategories()`, `useBlogPosts({ categorySlug })`, `useBlogCategoryCounts()`.
- Featured = `posts.find(p => p.featuredOnHome)` only when no `cat` param and no search.
- Loading → featured skeleton + 6 grid skeletons.
- Empty filtered → "Aucun article dans cette catégorie pour le moment." + link `/blog`.
- Empty/error global → "Le blog est en cours de mise en route." + link `/`.

**`src/components/blog/BlogSidebar.tsx`**
- Categories become `<Link to="/blog?cat=...">`, "Tous les articles" → `<Link to="/blog">`.
- Active determined by current `?cat=` (via `useSearchParams` or prop).
- `counts` and `categories` come from props (passed by `Blog.tsx`).
- Search input stays inert (kept controlled, no filtering wired yet — explicit comment).

**`src/pages/BlogPost.tsx`**
- `useBlogPost(slug)`. Loading → `BlogPostSkeleton`. `null` → "Article introuvable" page (message + `<Link to="/blog">Voir le blog</Link>`).
- Related posts: drop the prop-based dataset, let `BlogRelatedPosts` fetch internally.

**`src/components/blog/BlogRelatedPosts.tsx`**
- Accept `currentPostId` + `categoryId`. Internally call `useBlogPosts()`, filter same category excluding current, take 3. Hide if none.

### 7. Verification

- `tsc --noEmit` clean.
- Manually walk the 10-item testing checklist (home, /blog, category filter, deep article, 404 slug, network 200, draft toggle, console clean).

---

### Files

**Create**
- `src/types/blog.ts`
- `src/hooks/blog/useBlogCategories.ts`
- `src/hooks/blog/useBlogAuthors.ts`
- `src/hooks/blog/useBlogPosts.ts`
- `src/hooks/blog/useBlogPost.ts`
- `src/hooks/blog/useHomeBlogSelection.ts`
- `src/hooks/blog/useBlogCategoryCounts.ts`
- `src/hooks/blog/mappers.ts` (shared row→camelCase mappers)
- `src/components/blog/skeletons/BlogCardSkeleton.tsx`
- `src/components/blog/skeletons/BlogFeaturedSkeleton.tsx`
- `src/components/blog/skeletons/HomeFeaturedSkeleton.tsx`
- `src/components/blog/skeletons/BlogPostSkeleton.tsx`

**Modify**
- `src/lib/blogHelpers.ts` (trim)
- `src/components/blog/BlogCategoryPill.tsx`
- `src/components/blog/BlogAuthorMeta.tsx`
- `src/components/blog/BlogAuthorBio.tsx`
- `src/components/blog/BlogCard.tsx`
- `src/components/blog/BlogFeaturedCard.tsx`
- `src/components/blog/HomeFeaturedCard.tsx`
- `src/components/blog/BlogRelatedPosts.tsx`
- `src/components/blog/BlogSidebar.tsx`
- `src/components/sections/LatestArticlesSection.tsx`
- `src/pages/Blog.tsx`
- `src/pages/BlogPost.tsx`

**Delete**
- `src/data/mockBlogData.ts`

### Open decisions baked in (FYI, will proceed unless you object)

1. **Filter by category client-side**, not via `.eq('category.slug', …)` — keeps a single shared cache reused by counts and home selection.
2. **Data fetch lives in `LatestArticlesSection`**, not `Index.tsx` — section becomes self-contained and silently null-renders on error.
3. **Subcomponents (`BlogCategoryPill`, `BlogAuthorMeta`, `BlogAuthorBio`) switch from ID props to object props.** Visual output unchanged, but it removes the last dependency on the mock lookup helpers and keeps mapping centralized in hooks.
