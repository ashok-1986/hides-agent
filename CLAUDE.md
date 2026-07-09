# CLAUDE.md — Hides Agent Website

You are building a one-page static site for Hides Agent, a B2B leather supply
house selling to DTC brand founders in the UK and EU. The single source of
truth is `docs/website-spec.md`. Read it before any session. If this file and
the spec conflict, the spec wins.

This file replaces an older version that referred to "Hides Design" and "HD".
That name is dead. If you find any file, comment, or asset still using
"Hides Design" or a bare "HD" monogram, it is archived material, not current
brand. Do not use it. Current brand name is **Hides Agent**. Current mark is
the **HA monogram**, files under `assets/logo/`.

## What this project is

- One `index.html`, one stylesheet, one JS animation system, GSAP loaded via
  CDN in production. No frameworks, no build tooling, no npm unless explicitly
  asked.
- Maintained later by a non-developer intern. Optimise for readability over
  cleverness.

## Build status (check this before doing anything)

- **Section 1, hero: built and approved.** Do not redesign it without being
  asked. It lives in `site/index.html`.
- **Sections 2 to 6: not built.** Section 2 (the leathers list) is gated on a
  product-data decision the owner has not confirmed yet. See
  `docs/website-spec.md`, section "Open decision, blocking section 2". If that
  section still shows no answer recorded, stop after any restructuring work
  and ask the human directly. Do not invent grade names, MOQ numbers, or lead
  times to keep moving.

## Brand tokens

Canonical source is now `tokens.json`, `variables.css`, and `theme.css` in
the repo root, not the inline block that used to live here. Those three
files replace every ad hoc `:root` block scattered across earlier HTML
files. If a session needs a design value, it comes from `variables.css`,
nowhere else. Quick reference:

```css
:root {
  --color-espresso-hero: #221509;  /* dark section background */
  --color-parchment: #F6F1E7;      /* light section background */
  --color-rust-screen: #B4500F;    /* on-screen accent, dark grounds */
  --color-rust-logo: #A84000;      /* inside the SVG logo files only */
  --color-saddle: #C0956A;         /* decorative only, fails text contrast */
  --color-tannin: #4A5240;         /* reserved, sparing use */
  --color-brass: #E8C038;          /* print/foil only, never on screen */
}
```

- Fonts: Cormorant Garamond (display/headlines, weight 600), Urbanist
  400/500/600 (body, UI), JetBrains Mono 400 (specs, data, labels). Loaded
  via Google Fonts. Cormorant Garamond replaced Prata as of this update,
  chosen for a cleaner, simpler headline feel. TAN Mignon licence still not
  purchased, revisit if that changes. Keep the font-family declaration in
  one place so any future swap is a one-line change.
- Headline line-height is 1.18, not tighter. Cormorant Garamond has
  generous ascenders and descenders, a tight line-height clips words like
  "your" and "step" in a multi-line hero. This was a real bug, fixed once,
  do not tighten it back down without testing full sentences, not single
  words.
- Buttons and CTAs in the current hero are hairline underlines, not filled
  pills. That restraint is deliberate, keep it for future sections unless
  told otherwise.

## Origin policy (final, locked July 2026)

- No country of origin named anywhere in site copy, hero or body.
- Trust signal instead: "Full provenance documentation with every order."
  This is true, standard trade paperwork, not a marketing invention.
- Hard rules that do not change regardless of future mood:
  1. Never write copy that implies UK manufacture.
  2. Never write a script or FAQ answer that dodges or denies origin if a
     buyer asks directly. The honest answer belongs in human conversation,
     not on the page, and it is never evasive.
  3. UK only appears in true statements: UK legal entity, UK/EU delivery.

## Motion system

The animation system is built and tested, not a spec to reinvent. It lives at
`site/js/ha-motion.js` plus `site/css/ha-motion.css`. Read
`docs/website-blueprint.md` for the per-element-type motion rules (which
attribute goes on headings vs lists vs images vs numbers) before building
any new section. Use its data-attribute API (`data-animate`, `data-stagger`,
`data-parallax`, `data-lines`, `data-draw`, `data-count`, `data-pin`) rather
than writing new GSAP calls by hand. If a new section needs motion the API
doesn't cover, extend the system, don't bypass it with inline scripts.

Hard rules the system already enforces, do not weaken them:
- `prefers-reduced-motion: reduce` disables everything, content still shows.
- No GSAP loaded, IntersectionObserver fallback still reveals content.
- `data-count` only fires on real numbers. Never wire a counter to a
  placeholder or invented figure.
- Transform and opacity only, nothing animates width, height, or layout.
- `data-lines` (the word-by-word masked reveal) is reserved for the hero
  H1 only. It is the one flourish the whole page gets. Every other
  section heading uses plain `data-animate="fade-up"`, no word masking.
  Repeating the hero's signature move on every section heading is what
  makes a page feel templated, that was a real bug, not a style choice,
  found in July 2026 and fixed here permanently.

## Content rules (ethics, not style)

1. Never write a claim that could not survive a buyer visiting the factory.
2. No certifications (LWG, ISO, REACH) unless a certificate file exists.
3. No stock photos of people or workshops, no AI-generated craftsmanship
   imagery. Real photos or clearly labelled placeholders only.
4. No testimonials, quotes, or "trusted by" claims until real ones exist with
   permission. An empty section slot is honest, a fabricated quote is not.
5. Values that are not final (MOQ, lead time) render as "on request" or a
   visible TBC marker, never as an invented number.

## Working agreement

- One section per session, in the order in `docs/website-spec.md`. Each
  session ends deployed or at least committed. Do not start section N+1 with
  section N unfinished.
- Before coding, restate in two lines what this session ships. After coding,
  check mobile 375px, desktop 1440px, wide desktop 2560px, keyboard-only
  use, reduced-motion. The wide-desktop check was added July 2026 after a
  full-bleed section shipped past 1440px review with a real width bug
  invisible at that size and obvious on a larger monitor. Screenshot
  2560px specifically for any full-bleed or edge-to-edge element.
- Never commit secrets. Turnstile and email-provider keys live in environment
  config, not in the repo.

## Definition of done (whole project)

Every launch-checklist box in `docs/website-spec.md` ticked, Lighthouse ≥ 90
across categories, form verified end to end, page readable with JS disabled.
