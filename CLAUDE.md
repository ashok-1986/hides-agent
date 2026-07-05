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

## Brand tokens (unchanged since the rename, do not alter without asking)

```css
:root {
  --espresso: #221509;   /* current hero uses this darker espresso */
  --parchment: #F6F1E7;
  --rust: #B4500F;       /* current hero rust, brighter than the logo's rust for dark-ground contrast */
  --rust-logo: #A84000;  /* the logo file's own rust, used only inside the SVGs */
  --saddle: #C0956A;     /* decorative only, fails text contrast, never use for type */
  --tannin: #4A5240;
}
```

- Fonts: Prata (display/headlines), Urbanist 400/500/600 (body, UI), JetBrains
  Mono 400 (specs, data, labels). Loaded via Google Fonts in the current
  build. Prata is a stand-in for TAN Mignon if that licence is ever bought
  later, keep the font-family declaration in one place so swapping it later
  is a one-line change.
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
`docs/motion-integration.md` before adding any new animation. Use its
data-attribute API (`data-animate`, `data-stagger`, `data-parallax`,
`data-lines`, `data-draw`, `data-count`, `data-pin`) rather than writing new
GSAP calls by hand. If a new section needs motion the API doesn't cover,
extend the system, don't bypass it with inline scripts.

Hard rules the system already enforces, do not weaken them:
- `prefers-reduced-motion: reduce` disables everything, content still shows.
- No GSAP loaded, IntersectionObserver fallback still reveals content.
- `data-count` only fires on real numbers. Never wire a counter to a
  placeholder or invented figure.
- Transform and opacity only, nothing animates width, height, or layout.

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
  check mobile 375px, desktop 1440px, keyboard-only use, reduced-motion.
- Never commit secrets. Turnstile and email-provider keys live in environment
  config, not in the repo.

## Definition of done (whole project)

Every launch-checklist box in `docs/website-spec.md` ticked, Lighthouse ≥ 90
across categories, form verified end to end, page readable with JS disabled.
