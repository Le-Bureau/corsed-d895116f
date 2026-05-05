# Corse Drone — Foundation Setup

Set up the design system, layout shell, routing, and reusable motion primitives. No styled UI sections yet — those come in later prompts.

## 1. Dependencies & Fonts

- Install `motion` (Framer Motion v11+ package).
- Install `@fontsource/geist-sans` (full weights) and `@fontsource/inter` (full weights).
- Import font CSS in `src/main.tsx`.

## 2. Design Tokens (`src/index.css`)

Add all CSS variables under `:root`:
- Surfaces, text, borders, logo identity
- Brand primary + 4 pole token sets (nettoyage, diagnostic, agriculture, transport — each with base/deep/tint variants, including on-light/on-dark variants for diag and agri)
- Easing curves (`--ease-out-expo`, `--ease-in-out-expo`)

Add the 4 glass utility classes (`.glass-light`, `.glass-light-strong`, `.glass-dark`, `.glass-white`) with `@supports not (backdrop-filter)` fallbacks.

Set body default font to Inter, add `.font-display` utility for Geist, set `tracking-tight` defaults on `h1–h6`.

## 3. Tailwind Config (`tailwind.config.ts`)

Wire tokens so utility classes resolve:
- `colors`: `background`, `surface.tint/dark/darker`, `text.primary/secondary/on-dark/on-dark-muted`, `border`, `border-on-dark`, `logo.base/deep/tint`, `primary`, `pole-nettoyage-{base,deep,tint,light}`, `pole-diag-{base-onlight,base-ondark,deep,tint}`, `pole-agri-{...}`, `pole-transport-{...}`
- `fontFamily`: `display: ['Geist', ...]`, `sans: ['Inter', ...]`
- `transitionTimingFunction`: `out-expo`, `in-out-expo`
- `container`: max-width 1280px, padding `px-5` mobile / `px-10` lg+

## 4. Routing (`src/App.tsx`)

Replace current routes with all 14 routes wrapped in `<RootLayout>`:

```text
/                              -> Home
/pole/nettoyage                -> Nettoyage
/pole/nettoyage/toitures       -> Toitures
/pole/nettoyage/facades        -> Facades
/pole/nettoyage/panneaux-solaires
/pole/diagnostic               -> Diagnostic
/pole/diagnostic/thermique
/pole/diagnostic/visuel
/pole/agriculture
/pole/transport
/expertises
/partenaires
/contact
/mentions-legales
*                              -> NotFound (existing)
```

Each page is a placeholder component rendering `Page: <route>` centered.

## 5. Layout Shell (`src/components/layout/`)

- `Header.tsx` — placeholder div with text "Header"
- `Footer.tsx` — placeholder div with text "Footer"
- `RootLayout.tsx` — Header + `<Outlet />` (in `<main>`) + Footer

## 6. Animation Primitives (`src/components/animations/`)

All accept `className`, respect `useReducedMotion` (opacity-only when reduced), default ease `--ease-out-expo`.

- **`FadeInWhenVisible.tsx`** — `whileInView` fade + slide-up (y: 24 → 0), `viewport={{ once: true, margin: '-100px' }}`, duration 0.6s.
- **`StaggerChildren.tsx`** — parent with `staggerChildren` (configurable, default 0.08s), children use a shared `fadeUpItem` variant exported from the file.
- **`ParallaxY.tsx`** — wraps content; uses `useScroll` on a ref + `useTransform` to translate Y. Configurable distance prop (default 80px).

## 7. Constants (`src/lib/poles.ts`)

Export `Pole` TypeScript type and typed `POLES` array with the 4 entries (nettoyage, diagnostic, agriculture, transport — agri & transport flagged `comingSoon: true`) exactly as specified, including all color variants, titles, subtitles, and stats.

## 8. SEO Base (`index.html`)

- `<title>`: `Corse Drone | Solutions par drone en Corse`
- `<meta name="description">`: tagline about premium drone services in Corsica (cleaning, diagnostic, agriculture, transport).
- Set `<html lang="fr">`.

## Folder Structure After This Prompt

```text
src/
  components/
    animations/   FadeInWhenVisible, StaggerChildren, ParallaxY
    layout/       Header, Footer, RootLayout
    sections/     (empty, ready for next prompts)
    ui/           (shadcn, unchanged)
  lib/            utils.ts, poles.ts
  pages/          Home + 13 placeholder pages + NotFound
```

## Out of Scope (explicit)

No hero, no styled sections, no header/footer content, no forms, no images. Only placeholders, tokens, primitives, and the shell.
