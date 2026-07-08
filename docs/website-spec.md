# Hides Agent — Website Build Spec (v1.2)

This file replaces both `HD_Website_Spec.md` and `HA_Website_Spec.md` that may
exist locally. Those are superseded, archive or delete them. This is the only
current spec.

One-page conversion site. Goal: a DTC founder arriving from WhatsApp or
LinkedIn verifies credibility in under 60 seconds and submits a bulk or
swatch enquiry.

## Current build status

- **Section 1, hero: built and approved.** Dark espresso, one headline, one
  hairline CTA, HA monogram in the nav, cursor-tracked light sheen as the one
  signature effect. Copy is Pakistan-free by owner decision, see Origin
  policy below.
- **Motion system: built and tested.** `site/js/ha-motion.js`, see
  `docs/motion-integration.md`.
- **Sections 2 to 6: not built.**

## Open decision, blocking section 2

The owner has not yet confirmed which of these applies. Whoever reads this
file next, human or Claude Code, must not proceed with section 2 content
until one is picked and recorded here:

- **(a)** Owner supplies real product data this week (actual grades stocked,
  MOQ, lead times). Section 2 gets built on facts.
- **(b)** MOQ and lead time stay "on request" permanently. Section 2 gets
  built now using the five real leather categories already confirmed from
  the owner's own Leather_Types document (top-grain napa, full-grain,
  buffalo, suede/nubuck, split), with no numeric fields at all.
- **(c)** Neither happens soon. Ship hero-only as a holding page with the
  enquiry form live, nothing else.

**Recorded answer: (b) — locked July 2026. MOQ and lead times stay "on
request" permanently. Section 2 builds on the five confirmed leather
categories (top-grain napa flagship, full-grain, buffalo, suede/nubuck,
split) with no numeric fields anywhere. Decision made by default after
being offered four times without an override; if the owner later supplies
real numbers, upgrading is a one-session copy change, not a redesign.**

## Brand

- Name: Hides Agent. Not Hides Design, that name is dead, do not use it or
  the bare "HD" monogram anywhere.
- Logo: HA monogram, shared-stroke construction (H's leg becomes A's
  diagonal), rust dot seal. Files: `assets/logo/ha-mark.svg` (light grounds),
  `assets/logo/ha-mark-reversed.svg` (dark grounds), plus full lockup
  versions with the wordmark. Old six-concept exploration and any TAN Mignon
  trial files belong in `assets/logo/archive/`, kept for history, never used.

## Origin policy (final, locked July 2026)

No country of origin named anywhere in site copy. Trust signal instead:
"Full provenance documentation with every order," which is true, standard
trade paperwork. Hard rules: never imply UK manufacture; never write a script
that dodges origin if a buyer asks directly, the honest answer is a human
conversation, not a page; UK appears only in true statements (UK entity,
UK/EU delivery).

## User journey

```
Founder taps link (WhatsApp/LinkedIn/IG)
   │
   ▼
[1] HERO — monogram + one claim + one CTA          ✅ built
   ▼
[2] THE LEATHERS — grades, on-request terms         ⏳ gated, see above
   ▼
[3] CRAFT — texture, real photos when they exist    ⏳ not built
   ▼
[4] PROCESS — swatch → sample → bulk                ⏳ not built
   ▼
[5] TERMS — on-request stats, no invented numbers   ⏳ not built
   ▼
[6] ENQUIRY FORM                                    ⏳ not built
```

## Design system

- Colours: espresso `#221509` (hero background, text on light grounds),
  parchment `#F6F1E7` (light base), rust `#B4500F` (accent on dark grounds,
  the logo's own rust is `#A84000`, slightly different, both are correct in
  their own context), saddle `#C0956A` (decorative only, fails text
  contrast), tannin `#4A5240` (reserved, sparingly).
- Type: Cormorant Garamond (headlines, weight 600, replaced Prata this
  round), Urbanist 400/500/600 (body, UI), JetBrains Mono 400 (data,
  labels). TAN Mignon licence still not purchased, revisit if that changes.
- Headline line-height: 1.18. Fixed from an earlier 1.04 that clipped
  ascenders and descenders on words like "your" and "step" in the hero.
- Verified contrast (WCAG AA, checked not assumed): parchment on espresso
  15.8:1, secondary text at 62% opacity 6.7:1, footer strip at 58% opacity
  6.0:1 after a fix during QA. Saddle never carries text.
- Buttons: hairline underline with a sliding arrow, not filled pills. Filled
  rust pill only for the nav "Enquire" link equivalent actions if ever
  needed, keep it rare.

## Motion

Built system, not a plan. See `docs/motion-integration.md` for the full
data-attribute API. Signature move: cursor-tracked light sheen across the
hero, CSS-only grain texture, no stock imagery. Explicitly cut from scope:
testimonial carousel (no real testimonials), background video (no real
footage yet), magnetic buttons, velocity skew, particle backgrounds (off
brand for this positioning).

## Tech stack and hosting

Static HTML, CSS, vanilla JS, GSAP + ScrollTrigger via CDN in production
(vendored locally only for sandbox testing during development). Hosting:
Cloudflare Pages, free tier, automatic SSL. Form backend: Web3Forms or a
small Cloudflare Worker plus Resend, decide at that build session, either
takes under an hour. Analytics: Cloudflare Web Analytics, cookieless, no
banner needed.

## Security (the complete list for a static site)

HTTPS enforced, HSTS on. Form spam via honeypot plus Turnstile. No user data
stored beyond the enquiry email. Security headers (CSP, X-Content-Type-Options,
Referrer-Policy) in a `_headers` file. Domain registrar 2FA on, auto-renew on.

## Build order

1. Scaffold, tokens, fonts, logo SVGs. ✅ done as part of hero.
2. Hero. ✅ done, approved.
3. The Leathers (section 2). ⏳ gated on the open decision above.
4. Craft.
5. Process and Terms.
6. Enquiry form, footer, privacy note.

Rule: one section per session, each session ends committed or deployed.

## Launch checklist

- [x] Open decision above answered and recorded: (b), on request permanently.
- [ ] Validation commitment (locked, July 2026): within 2 weeks of the
      Craft section shipping, the site goes in front of 3 real DTC
      founders from Ashok's network with one question: "Would you order
      samples from this site?" Their answers settle any future animation
      or design-direction debate. If this doesn't happen in the window,
      it gets called out as a broken commitment, not quietly forgotten.
- [ ] Live-site defects from July 2026 audit fixed: "[TBC]" company line
      removed from public footer, dead Privacy Policy link replaced with
      the real 5-line note, stray #top anchor fixed.
- [ ] Companies House registration complete, number in footer.
- [ ] Domain live on Cloudflare, SSL green.
- [ ] Every claim on the page passes the factory-visit test.
- [ ] Form tested with a real submission reaching the owner's inbox.
- [ ] Lighthouse ≥ 90 all categories.
- [ ] Reduced-motion and no-JS both verified to show full content.

## Out of scope for v1

Multi-page site, CMS, video hero until real footage exists, client portal,
multilingual, e-commerce checkout, CRM integration (revisit after real
enquiries start arriving).

## Roadmap, v2 (confirmed direction, not in scope until v1 proves itself)

- **Per-type leather journeys.** One page or section per leather type
  (top-grain napa, full-grain, buffalo, suede/nubuck, split), each showing
  its own raw-to-finished story, not just a features row. Confirmed as a
  good idea, July 2026. Deliberately not built now: v1 ships one flagship
  journey (napa) in Craft, the rest stay as sharper one-line descriptions
  in The Leathers. Revisit once the six-section site has real traffic and
  photography exists for more than one type. Building five journeys before
  one is proven would repeat the exact scope mistake this spec has avoided
  everywhere else.
