# Design

Captured from the shipped code in `site/index.html`, `site/css/ha-motion.css`,
`site/js/ha-motion.js`. This is the current live system, not a proposal —
update this file when tokens or components actually change in code.

## Theme

Dual-ground system. Hero (Section 1) is dark espresso. Sections 2, 3, and the
combined 4/5 block are parchment (light). Section 6 (enquiry) is dark again.
Theme choice per section is deliberate, not alternating for its own sake —
it marks structural beats in the page (credibility hero → proof sections →
the ask).

## Colour tokens

```css
--espresso: #221509;                 /* dark ground, hero background/text-on-light */
--espresso-soft: #2E1E10;
--parchment: #F6F1E7;                /* light ground, never pure white */
--parchment-dim: rgba(246,241,231,.62);
--rust: #B4500F;                     /* accent on dark grounds, on-screen brightened value */
--rust-logo: #A84000;                /* logo SVG only, slightly different from screen rust */
--saddle: #C0956A;                   /* decorative only — 2.4:1 contrast, never for type */
--tannin: #4A5240;                   /* reserved, certification/sustainability content only */
--hairline: rgba(246,241,231,.16);   /* dark-ground dividers */
```

Light-ground dividers use `rgba(34,21,9,.15)` / `rgba(34,21,9,.05)` (espresso
at low opacity) rather than a separate token — worth promoting to a named
`--hairline-light` if a fourth section needs it.

Verified contrast: parchment-on-espresso 15.8:1, parchment-dim-on-espresso
6.7:1, footer strip 6.0:1. Re-verify per new section rather than assuming
these numbers carry over to new colour combinations.

## Typography

- **Cormorant Garamond**, weight 600 — display/headlines (h1–h3). Stand-in
  for TAN Mignon pending licence purchase; keep the `font-family` in one
  declaration so the swap stays a one-line change.
- **Urbanist** 400/500/600 — body copy, nav, UI, wordmark.
- **JetBrains Mono** 400 — specs, data labels, eyebrows, CTA text, anything
  with a technical/precision register.
- Headline line-height locked at 1.18 (an earlier 1.04 clipped ascenders on
  "your"/"step"). Hero clamp: `clamp(46px, 7.4vw, 104px)`.
- Section title clamp so far: `clamp(36px, 5vw, 48px)`, weight 600.

## Spacing

8px base grid. Vertical rhythm 96–120px between sections desktop, 64px
mobile. Section inner max-width 1200–1280px depending on section, centred.

## Components in use

- **`.cta`** — hairline underline + sliding arrow on hover (gap grows
  0.25s), JetBrains Mono, uppercase, letter-spacing .22em. `.cta-dark`
  variant for light-ground sections (espresso text/rust underline stays).
  No filled-pill CTA exists in the shipped system; treat any request for one
  as an exception to flag, not a default.
- **`header`** — fixed, transparent until `.scrolled` (20px scroll trigger)
  adds a blurred dark strip.
- **`.grain`** — fixed full-viewport CSS noise texture (SVG feTurbulence),
  no imagery, 0.07 opacity, sits at z-index 1 under content.
- **`.hero-sheen`** — cursor-tracked radial light following `--mx`/`--my`,
  the one signature effect for the hero. Sections 2–6 do not currently
  reuse this; each section's own signature move should be considered on its
  own terms rather than copy-pasted.

## Motion

Full data-attribute API documented in `docs/motion-integration.md`
(`data-animate`, `data-stagger`, `data-parallax`, `data-lines`, `data-draw`,
`data-count`, `data-pin`). `data-lines` (word-mask reveal) is reserved for
the hero only by project convention — do not apply it to other section
headings. `prefers-reduced-motion: reduce` and no-GSAP both must still show
full content; this is enforced in `ha-motion.js`, not optional per section.

## Known debt (found while reading the code, not yet fixed)

- Sections 3–5's CSS block is duplicated verbatim in `index.html` (two
  identical copies of `.section-title`, `.craft-section`, `.photo-placeholder`,
  `.process-terms-section`, etc.). Worth a cleanup pass when those sections
  are next touched.
- `.provenance-note` uses a 2px coloured `border-left` — a side-stripe
  accent, generally a pattern to avoid per this system's own restraint
  principle. Flag for `Terms` section's redesign session rather than fixing
  now (out of scope for this session).
- `.leather-card-flagship` badge uses a filled rounded pill — inconsistent
  with the hairline-only CTA rule above. Being replaced in this session's
  Section 2 redesign.
