# Phase 10 — Blog analytics (Plausible custom events)

## 1. New file: `src/lib/analytics.ts`

Create the helper exactly as specified:
- `trackEvent(name, props?)` — guards `window`, guards `typeof window.plausible === 'function'`, strips `null`/`undefined` props, swallows errors (warn only in DEV).
- `Events` const map with the 7 event names in Title Case.

## 2. Files modified & event wiring

### `src/pages/BlogPost.tsx` — ARTICLE_VIEWED + ARTICLE_SHARED + ARTICLE_CTA_CLICKED
- Add `firedRef = useRef(false)` and a `useEffect([post?.id])` that fires `Events.ARTICLE_VIEWED` once when `post` becomes available, with props `{ slug, title: post.title.slice(0, 80), category: post.category?.slug, author: post.author?.initials }`.
- Wrap the 3 share button `onClick` handlers (LinkedIn, X, Copy) to call `trackEvent(Events.ARTICLE_SHARED, { slug: post.slug, method })` before the existing behavior. Methods: `linkedin`, `twitter`, `copy_link`.
- Add a delegated click listener via `useEffect` on a ref attached to the article body container (wrap `<BlogContent>` in a `<div ref={articleRef}>` — purely structural, no visual change). Listener filters `<a>` ancestors whose `href` starts with `/` and is not `#…`, then fires `Events.ARTICLE_CTA_CLICKED` with `{ article_slug: post.slug, to: href }`. Skip external (`http(s)://`), `mailto:`, `tel:`, and pure hash links.
  - Rationale: keeps `BlogContent.tsx` untouched (no prop drilling) and avoids regenerating ReactMarkdown components.

### `src/components/blog/BlogSidebar.tsx` — CATEGORY_FILTER + NEWSLETTER_INTEREST
- For each category `<Link>` (including "Tous les articles"), add `onClick` that computes `from = activeSlug ?? 'all'`, `to = c.slug ?? 'all'`, and fires `Events.CATEGORY_FILTER` only if `from !== to`.
- Replace the "Newsletter" anchor `onClick` to: `e.preventDefault()`, fire `Events.NEWSLETTER_INTEREST` with `{ source: 'sidebar' }`, and `toast("Bientôt disponible — restez à l'écoute")` from `sonner`.

### `src/pages/Blog.tsx` — SEARCH_PERFORMED
- Add a `useEffect([search])` with a 800ms `setTimeout`; if `search.trim().length >= 3`, fire `Events.SEARCH_PERFORMED` with `{ query_length: search.trim().length }`. Cleanup clears the timeout (debounce).

### `src/components/blog/BlogRelatedPosts.tsx` — RELATED_ARTICLE_CLICKED
- Currently `BlogCard` renders the `<Link>`. Two clean options; pick option A:
  - **A (chosen):** wrap each `<BlogCard>` in a `<div onClickCapture>` that fires `Events.RELATED_ARTICLE_CLICKED` with `{ from_slug: currentSlug, to_slug: p.slug }`. Requires passing `currentSlug` in addition to `currentPostId` from `BlogPost.tsx` (one extra prop).
- Update the `Props` interface and the `BlogPost.tsx` call site accordingly.

## 3. Untouched
- `index.html` Plausible snippet, `usePlausibleTracking`, `BlogContent.tsx`, all styling, routing, auth, Supabase, admin.

## 4. Verification
- `tsc --noEmit` (auto via harness).
- Manual: 11-step DevTools network checklist from the brief.

## 5. Manual Plausible dashboard goals (to add by PF)
Site Settings → Goals → "+ Add goal" → Custom event, with these exact names:
1. `Article viewed`
2. `Article shared`
3. `Category filter`
4. `Search performed`
5. `Related article clicked`
6. `Article CTA clicked`
7. `Newsletter interest`
