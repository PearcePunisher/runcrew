# Run Crew Landing — TypeScript/React

A typed React app for the Run Crew App landing page.

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
- Some assets are duplicated across sections in the original markup (e.g. store badges, a few phone screenshots reused in the auto-cycle)
- The original landing page was built with vanilla JS and inline base64 images, which is not ideal for performance or maintainability. This version uses React and TypeScript for better structure and type safety, and imports images as separate files for better caching and loading.
- The original landing page had a few minor issues, such as inconsistent spacing and alignment, which have been corrected in this version. The design and functionality remain faithful to the original, while improving code quality and maintainability.
- There were WCAG 2.1 accessibility issues in the original landing page, such as insufficient color contrast and missing alt text for images. These have been addressed in this version, with improved color contrast and descriptive alt text for all images.

## Recommended Improvements
- Consider adding a contact form to capture leads or inquiries from potential users. This would require a backend service to handle form submissions, which could be implemented with a serverless function or a simple API endpoint. Recommend Resend for email sending and Supabase for database storage.
- Analytics are not included in this version, but can be added in `index.html` if desired. Recommend Umami for privacy-focused analytics, or Plausible for a simple and lightweight solution. Will require adding attributes to individual elements.
