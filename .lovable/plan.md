# Phase 3A — Light theme migration of pole detail pages

## Current state

The dynamic route `/pole/:slug` and the 8 sub-components already exist (Phase 1 work), but they are **fully dark-themed** (`bg-surface-darker`, `text-text-on-dark`, `rgba(10,14,26,…)` glass cards, `border-white/10`, `glass-light` buttons, dark gradient overlays on hero, etc.).

The data structure in `src/lib/poles.ts` already matches the spec (whyDroneItems / processSteps / useCases / poleFAQ / finalCTA fields all present, NETTOYAGE content is final). No data work needed except:
- Use `baseColorOnLight` (not `OnDark`) for `--pole-color`
- Set Agriculture & Transport `whyDroneItems / processSteps / useCases / poleFAQ` to `undefined` so those sections don't render (currently they reuse Nettoyage placeholders)
- Replace Diagnostic's `whyDroneItems / processSteps / useCases / poleFAQ` (currently Nettoyage placeholders) with the spec content

Also: 4 placeholder pages (`PoleNettoyage / PoleDiagnostic / PoleAgriculture / PoleTransport`) — **need to verify** they still exist; route in `App.tsx` already uses `<PoleDetail />` only, no imports of those 4 placeholders. Quick check: `src/pages/Pole*.tsx` files weren't listed in the codebase index → already deleted. `App.tsx` is already clean. Nothing to remove there.

## Scope

Convert 8 components + 1 page wrapper from dark to light, swap data var, fill Diagnostic content, blank-out Agri/Transport mid-sections.

## Files to modify

### Data (1 file)
- `src/lib/poles.ts`
  - Add `DIAGNOSTIC_WHY / DIAGNOSTIC_PROCESS / DIAGNOSTIC_USE_CASES / DIAGNOSTIC_FAQ` from spec, wire into `diagnostic` pole
  - Set agriculture & transport `whyDroneItems / processSteps / useCases / poleFAQ` to `undefined`
  - Update Diagnostic `finalCTASubtitle` → "Devis gratuit, intervention sous 10 jours, rapport sous 72h."
  - Update Diagnostic `finalCTAButtonLabel` → "Demander un devis"
  - Update Agri/Transport `finalCTATitle` → "Service en préparation."

### Utils (1 file)
- `src/lib/utils.ts` — add `hexToRgb` export (currently inlined in PoleDetail, move it for cleanliness)

### Page (1 file)
- `src/pages/PoleDetail.tsx`
  - Swap `--pole-color` source: `pole.baseColorOnLight` (not `OnDark`)
  - Wrapper: `bg-surface-bg` (not `bg-surface-darker text-text-on-dark`), drop `text-text-on-dark`
  - Import `hexToRgb` from `@/lib/utils`

### Components (8 files) — all converted to light pattern

| Component | Key changes |
|---|---|
| `PoleHero.tsx` | Drop `data-header-bg="dark"` and dark bg/overlay layers. New: `bg-surface-bg`, subtle radial mesh `rgba(var(--pole-color-rgb),0.08)`, optional hero image with **light** linear-gradient overlay (surface-bg → transparent), eyebrow = white pill `bg-white shadow-soft-sm border border-border-subtle`, H1 `text-text-primary`, pitch in `var(--pole-color)`, long pitch `text-text-secondary`, primary CTA `bg-white text-text-primary` border + pole-color glow, secondary CTA outline `border border-border-default text-text-primary` (replaces `glass-light`) |
| `PoleWhyDrone.tsx` | `bg-surface-elevated`, eyebrow white pill, cards `bg-surface-card border-border-subtle shadow-soft-md hover:shadow-soft-lg hover:-translate-y-1`, drop backdrop-blur and dark glass, icon tile `bg-{pole-color}/10 border-{pole-color}/30 text-{pole-color}`, title `text-text-primary`, desc `text-text-secondary`. Keep `getIcon()` resolver. |
| `PoleSubServices.tsx` | `bg-surface-bg`, white pill eyebrow, cards `bg-surface-card border-border-subtle shadow-soft-md` + lift hover, counter & title in light tones, "Découvrir →" link in `var(--pole-color)` |
| `PoleProcess.tsx` | `bg-surface-elevated`, eyebrow + H2 light, step cards `bg-surface-card border-border-subtle shadow-soft-sm rounded-2xl p-6`, number col mono `var(--pole-color)`, title `text-text-primary`, desc `text-text-secondary` |
| `PoleUseCases.tsx` | `bg-surface-bg`, carousel container `bg-surface-card border-border-subtle shadow-soft-md` (drop `border-white/10`), content panel `bg-surface-elevated` (drop `rgba(10,14,26,0.6)`), title `text-text-primary`, desc `text-text-secondary`, advantage box keeps `rgba(var(--pole-color-rgb),0.08/0.25)` (works on light too — verify contrast), arrows = white circle `bg-surface-card border-border-subtle shadow-soft-sm` (replaces `glass-light`), inactive dots `rgba(0,0,0,0.15)` |
| `PoleFAQ.tsx` | `bg-surface-elevated`, eyebrow + H2 light, items `bg-surface-card border-border-subtle shadow-soft-sm rounded-xl`, hover `bg-white`, `[open]` border `var(--pole-color)/30`, question `text-text-primary`, answer `text-text-secondary`, chevron `var(--pole-color)` |
| `PoleFinalCTA.tsx` | `bg-surface-bg` + radial pole-color glow, centered card `bg-surface-card border-border-subtle shadow-soft-lg rounded-3xl p-12 lg:p-16`, title `text-text-primary`, subtitle `text-text-secondary`, **single CTA** `bg-{pole-color} text-white` with pole-color glow shadow (was white bg before) |
| `DevBanner.tsx` | Light variant: `bg rgba(var(--pole-color-rgb),0.10)`, `border-bottom rgba(var(--pole-color-rgb),0.30)`, dot `var(--pole-color)`, text `text-text-primary` (strong) + `text-text-muted` (subtitle), link in `var(--pole-color)` underline. Keep pulse animation + `motion-reduce:animate-none`. |

## Routing

Already correct in `App.tsx`:
```
<Route path="/pole/:slug" element={<PoleDetail />} />
```
The 5 sub-page routes (`/pole/nettoyage/toitures` etc.) already exist and stay (Phase 3B will refactor them). No changes to `App.tsx`.

## Pattern cheat-sheet (consistency)

- Section padding: `py-24 lg:py-32` (matches Phase 2 sections)
- Eyebrow pill: `inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-soft-sm border border-border-subtle font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-text-muted` + dot in `var(--pole-color)`
- Cards: `bg-surface-card border border-border-subtle shadow-soft-md rounded-2xl/3xl` + hover `hover:-translate-y-1 hover:shadow-soft-lg transition-all duration-300`
- No `backdrop-blur` anywhere
- No `border-white/N`, no `rgba(10,14,26,…)`, no `text-text-on-dark*`
- Animations: `FadeInWhenVisible` already wired everywhere — keep as-is

## Verification

- `/pole/nettoyage` → Hero + 4 WhyDrone + 3 SubServices + 5 Process + 3 UseCases + 5 FAQ + FinalCTA. Blue accents.
- `/pole/diagnostic` → Hero + 4 WhyDrone + 2 SubServices + 3 Process + 3 UseCases + 4 FAQ + FinalCTA. Red accents.
- `/pole/agriculture` → DevBanner (light) + Hero + 3 SubServices (`subServices` is non-empty in data) + FinalCTA. Green accents. **Note:** spec says "DevBanner + Hero + FinalCTA only" but data has 3 subServices listed — they will render. If you want to skip them too, say so and I'll also blank out `subServices` for agri/transport.
- `/pole/transport` → Same shape as agri (1 subService). Orange accents.
- `/pole/invalid` → redirect to `/`.
- Header pill stays correct (light pages use light header automatically since we drop `data-header-bg="dark"`).
- Sub-service links → `/pole/{key}/{slug}` resolve to existing nettoyage/diagnostic sub-pages (still dark — Phase 3B). Expected.

## Open question (please confirm before I proceed)

**Agriculture & Transport `subServices`:** keep them rendering (current data has them) or also blank them out so the page is truly Hero + FinalCTA only as spec implies? My recommendation: **keep them rendering** — gives the dev-stage page useful content and the SubServices cards work fine in light theme.