# Product

## Register

brand

## Users

DTC leather-goods brand founders and designers in the UK/EU, building their
own product lines and sourcing hides wholesale, not consumers. They arrive
from a WhatsApp message, a LinkedIn DM, or an Instagram bio link — cold, on
mobile, mid-conversation with someone they half-trust. They have one job:
decide in under a minute whether this supplier is credible enough to keep
talking to, then request swatches or a bulk quote.

## Product Purpose

A one-page conversion site for Hides Agent, a B2B wholesale leather supplier
sourcing direct from tanneries. It replaces "let me send you our catalogue
PDF" with a page that proves credibility through specificity and craft, then
funnels into one enquiry form. Success is a submitted swatch or bulk
enquiry from a founder who has never spoken to anyone at the company yet.

## Brand Personality

Direct, not exclusive. Crafted, not luxurious. Tested, not premium. The
brand kit's own rule: premium copy is short, not decorated — Hermès and
Chanel remove words, they don't add them. Specificity (grades, finishes,
process, real provenance paperwork) reads as sophistication; adjectives and
decoration read as compensation for the lack of it. Restraint runs through
motion (one signature effect per viewport) and interaction (hairline
underlines, not filled pills) as much as copy.

## Anti-references

- Generic SaaS landing-page grammar: identical icon-heading-text card
  grids, gradient text, tiny uppercase eyebrows over every section,
  hero-metric blocks, filled pill CTAs.
- Stock photography of workshops, tanneries, or artisans; AI-generated
  "craftsmanship" imagery. Real photos or clearly labelled placeholders
  only.
- Fabricated numbers, certifications, or testimonials. MOQ and lead time
  stay "on request" permanently by locked decision (see
  `docs/website-spec.md`) — never invented to fill a spec table.
- Any copy or design detail that implies UK manufacture or names a country
  of origin. The trust signal is "full provenance documentation with every
  order," never a flag or a claim.

## Design Principles

1. Specificity over decoration — lead with real grades, real process steps,
   real terms; when a number isn't real yet, say "on request" visibly
   rather than hide the gap or invent one.
2. One signature move per viewport — motion and visual devices are rare and
   deliberate, not a uniform reflex repeated down the page.
3. Editorial over template — each section earns its own layout grammar
   suited to what it's actually showing (an index, a photo pair, a
   process, a term sheet, a form), rather than reusing one card-grid
   pattern everywhere.
4. Honesty as a design constraint, not just a copy rule — an empty or
   "on request" state is more credible to this audience than a filled-in
   placeholder number.

## Accessibility & Inclusion

WCAG AA contrast verified per section (not assumed) before shipping.
`prefers-reduced-motion: reduce` disables all animation with content shown
instantly, not hidden and waiting on a transition. Full content must render
with JavaScript disabled and without GSAP loaded (IntersectionObserver
fallback). Keyboard focus must be visible (existing `:focus-visible` rust
outline) on every interactive element, including any new hover-reveal
interactions, which need a keyboard/tap equivalent, not a mouse-only one.
