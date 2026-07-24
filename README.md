# Run Crew Landing — TypeScript/React

A typed React app for the Run Crew landing page.

## Structure
- `index.html` — Vite entry, loads Google Fonts (Bebas Neue, Barlow, Barlow Condensed).
- `src/main.tsx` — React root mount.
- `src/App.tsx` — the whole page as one component, typed data arrays for nav links, features, screenshots, integrations, community items. Replicates original vanilla-JS behavior with hooks:
  - nav shrink/hide on scroll
  - mobile menu open/close (+ Escape to close, body scroll lock)
  - `IntersectionObserver`-driven `.reveal` stagger animation
  - hero phone screenshot auto-cycle (respects `prefers-reduced-motion`)
- `src/App.css` — the original global stylesheet, verbatim (selectors/media queries unchanged; `class` → same class names).
- `src/assets/` — all 29 images extracted from the original inline base64 data URIs, saved as real image files and imported as ES modules.

## Run
```
npm install
npm run dev
```

## Notes
- Some assets are duplicated across sections in the original markup (e.g. store badges, a few phone screenshots reused in the auto-cycle) — each is imported from its own extracted file for a guaranteed byte-exact match; dedupe further if desired.
