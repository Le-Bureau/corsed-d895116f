# Phase 3B — Sub-service detail pages

Build a single dynamic template at `/pole/:slug/:subSlug` powering the 5 sub-pages already linked from the Phase 3A SubServices section. Light theme, reusing the Phase 3A primitives where possible.

## Scope

5 sub-pages will be live after this phase:
- `/pole/nettoyage/toitures`
- `/pole/nettoyage/facades`
- `/pole/nettoyage/panneaux-solaires`
- `/pole/diagnostic/thermique`
- `/pole/diagnostic/visuel`

Agriculture and Transport sub-routes will continue to 404 (no content yet, matches Phase 3A "in development" pattern).

## Files

### Routing
- `src/App.tsx` — add `<Route path="/pole/:slug/:subSlug" element={<SubPoleDetail />} />` ABOVE the existing `/pole/:slug` route.

### Data
- `src/lib/sub-poles.ts` (new) — TypeScript types from the brief + `SUB_POLE_CONTENT: Record<poleKey, Record<subSlug, SubPoleContent>>` populated with all 5 pages of copy from the brief, verbatim.

### Orchestrator
- `src/pages/SubPoleDetail.tsx` (new) — exact structure from the brief: lookup pole + content, redirect on miss, set `--pole-color` / `--pole-color-rgb` CSS vars, render sections conditionally, reuse `PoleProcess`, `PoleFAQ`, `PoleFinalCTA` from Phase 3A (build a `ctaPole` augmented with sub-page CTA copy).

### Sub-page components (`src/components/sub-pole/`)
All light theme, semantic tokens only (`bg-surface-bg`, `bg-surface-card`, `bg-surface-elevated`, `border-border-subtle`, `shadow-soft-*`, `text-text-*`), pole color via `var(--pole-color)` / `rgba(var(--pole-color-rgb), …)`. Each section is `role="region"` with `aria-labelledby`, wrapped in `FadeInWhenVisible`.

1. `SubPoleHero.tsx` — `py-32 lg:py-40`, eyebrow pill, H1 clamp(48–96px), pitch, dual CTA (`Obtenir un devis` → `/contact?expertise={pole.key}`, `Comment ça marche` → `#process`), subtle pole radial mesh, optional `heroImage` with light gradient overlay.
2. `SubPoleStats.tsx` — `md:grid-cols-3`, card with optional `prefix`, big pole-colored value + unit, strong + muted labels.
3. `SubPoleWhyTraiter.tsx` — `bg-surface-elevated`, eyebrow + H2 + intro centered (`max-w-[800px]`), 2x2 grid of text cards with hover-lift.
4. `SubPoleFormules.tsx` — 3 cards, middle highlighted (`bg-[rgba(var(--pole-color-rgb),0.05)]`, `lg:scale-105`, badge top-right), Check icons in pole color for features.
5. `SubPoleDomaines.tsx` — `md:grid-cols-2 lg:grid-cols-3` of 6 cards with icon tile (Lucide via name lookup), category, title, description, footer with highlightLabel/highlightDescription separated by `border-t`.
6. `SubPoleTechnologie.tsx` — 3 cards, optional spec footer in mono uppercase pole color.
7. `SubPoleCompare.tsx` — 3 columns rendered as semantic `<table>` collapsed into stacked cards on mobile (or single horizontal-scroll table). "Ours" column highlighted (pole tint, ring, scale). Disclaimer below.

### Reused (no edits)
`PoleProcess`, `PoleFAQ`, `PoleFinalCTA`, `FadeInWhenVisible`, `Header`, `Footer`.

## Section ordering in orchestrator

```
Hero → Stats → WhyTraiter → Formules (if any) → Domaines
  → Process (if any) → Technologie (if any)
  → Compare (if any) → FAQ → FinalCTA
```

`#process` anchor is set on the Process section (or Domaines section as fallback when no process steps — applies to nettoyage pages, which have no processSteps; for those pages the secondary CTA will scroll to Domaines or be omitted — see Open question).

## Technical notes

- `getIcon(name)` helper imported from a small map of the Lucide icons used in the brief (`Home, Layers, MountainSnow, Factory, Building, Building2, Landmark, Store, Sun, Sprout, FileText`). Falls back to `Home`.
- `ctaPole` is built by spreading `pole` and overriding `finalCTATitle/Subtitle/ButtonLabel` so existing `PoleFinalCTA` can render unchanged.
- All grids stack to 1 column under `md`; highlighted formula card drops the scale at `<lg`; Compare table becomes stacked cards on mobile.
- No new tokens, no palette changes, no edits to Phase 3A files except `App.tsx` route addition.

## Verification

- Navigate each of the 5 routes, check sections render in correct order, accent color matches pole, no console errors.
- `/pole/nettoyage/unknown` redirects to `/pole/nettoyage`.
- `/pole/agriculture/anything` redirects to `/pole/agriculture` (no content registered).
- Mobile 375px: hero readable, all grids stack, compare table not overflowing.
- No regression on Phase 3A pole pages, home, /contact, /partenaires.

## Open question

The brief specifies a secondary CTA "Comment ça marche" → `#process` on every hero, but the 3 nettoyage sub-pages have no `processSteps`. Two options:
1. Anchor falls back to `#domaines` on those pages.
2. Hide the secondary CTA when there's no process section.

Default plan: option 2 (hide secondary CTA when `processSteps` is absent) — cleaner UX. Tell me if you'd prefer option 1.
