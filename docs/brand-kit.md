# Hides Agent — Brand Kit v3.0

> The supply house behind good leather brands.
> July 2026. Rebuilt from verified, shipped material. Supersedes v1 (Hides
> Design era) and v2 (Accio draft, built without seeing the live site,
> contains inventions not in production, do not use).

---

## 1. Brand identity and voice

Hides Agent is a B2B wholesale leather supplier selling to DTC brand founders
in the UK and EU, sourced direct from tanneries.

- Target audience: founders and designers building their own leather goods
  brands, not consumers.
- Key message: we supply, they shine.
- Voice rules, unchanged since first established:
  - Say direct, not exclusive.
  - Say crafted, not luxurious.
  - Say tested, not premium.
  - Lead with specifics: grades, finishes, process. Numbers stay "on
    request" until real ones exist, never invented.
- Research finding, applied throughout: premium copy is short, not
  decorated. Hermès and Chanel remove words, they don't add them.
  Specificity reads as sophistication. This kit follows that, the Accio
  draft did not.

## 2. The HA mark

One shared stroke, not two overlapping letters. The H's right leg bends and
becomes the A's left diagonal at the crossbar, one continuous line, then
A's right diagonal completes separately down to the baseline. A rust dot
seals the mark at the base.

This is a correction against the v2 draft, which described "a slab-serif H"
and "a separate high-contrast serif A overlapping it." That is not the
approved mark. There is one mark. It does not have two typographic voices
fighting inside it.

- Files: `ha-mark.svg` (light grounds, espresso ink), `ha-mark-reversed.svg`
  (dark grounds, parchment ink), plus full lockup versions with the
  wordmark alongside.
- Clear space: margin equal to the width of the H's left stem, on all
  sides.
- Minimum size: 24px digital, 10mm print, 8mm embossed.
- Never decouple the H and A. Never re-add a separate overlapping A in a
  different typeface, that idea was tested and rejected once already.

## 3. The wordmark

"Hides · Agent", plain letterspaced Urbanist, one small rust dot as the
separator. That's the whole wordmark.

This corrects the v2 draft's invented "H'IDES AGENT" lockup, with a rust
square apostrophe and a mixed-typeface AGENT. That was never built, never
approved, and does not exist in production. There is no apostrophe
anywhere in the real wordmark.

- Placement: beside the mark in the nav (horizontal), or below it in
  stacked contexts like a footer or social avatar.

## 4. Colour system

The one part of the v2 draft that was actually correct, kept as is.

| Name | Hex | Usage |
|---|---|---|
| Espresso | `#2A1B10` | Primary ink on light grounds, structure, borders |
| Espresso (hero variant) | `#221509` | The specific dark background used in the shipped hero, slightly deeper than the base espresso above |
| Parchment | `#F6F1E7` | Light surface. Never pure white |
| Rust (logo) | `#A84000` | The dot and accents inside the SVG logo files |
| Rust (screen) | `#B4500F` | Slightly brightened rust used for on-screen accents against the dark hero, for contrast on dark grounds |
| Saddle Tan | `#C0956A` | Decorative only, dividers and card backgrounds. Fails text contrast at 2.4:1, never use for type |
| Tannin Green | `#4A5240` | Reserved for certification or sustainability content only |
| Brass | `#E8C038` | Print and foil only. Never appears on screen, on any background, light or dark |

One correction to the v2 draft: it called the rust dot "mandatory brass on
dark grounds." That's wrong and contradicts a rule that's existed since the
first brand kit. Brass never appears on screen. The dot is rust on every
background, light or dark, just a brighter rust value on dark grounds for
contrast. This is now the permanent rule, no more ambiguity on it.

## 5. Typography

- Prata: headlines, hero titles, h1 through h3. This replaces Fraunces,
  which the v2 draft still listed. Fraunces was retired when the brand
  moved from Hides Design to Hides Agent, Prata is the current stand-in
  until a TAN Mignon licence is bought.
- Urbanist 400/500/600: body copy, navigation, UI, the wordmark itself.
- JetBrains Mono 400: specs, data, labels, anything with a technical or
  precision feel.

No letter in the mark or wordmark uses a font different from this system.
There is no separate "design voice" font and "technical voice" font, that
split was invented in the v2 draft and never built.

## 6. Website and digital specs

Reflects what is actually shipped, not the original plan.

- Grid: 8px base.
- Vertical rhythm: 96px minimum between sections on desktop, 64px mobile.
- Buttons and CTAs: hairline underline with a sliding arrow on hover, not
  a filled pill. This replaces the earlier "rust fill, parchment text"
  button spec, which was superseded when the hero moved from a light,
  button-driven layout to the current dark, restrained one.
- Background: the live hero is dark espresso, not parchment. Parchment
  remains the base for any lighter-toned sections built later, but it is
  not universal.
- Photography: warm natural light, hides, tools, hands, the debossed mark
  on real leather. No stock models, no AI-generated craft imagery, real
  photos only, placeholders clearly marked until they exist.
- Motion: cursor-tracked light sheen across the hero is the one signature
  effect. Built and tested in `ha-motion.js`, documented in
  `motion-integration.md`. Restraint is the rule, one effect per
  viewport, not several.

## 7. Origin policy

No country of origin named anywhere in site copy. Trust signal instead:
"Full provenance documentation with every order," true and verifiable.
Never imply UK manufacture. Never dodge the question if a buyer asks
directly, that answer is a plain one-liner in conversation, not a page
element.

## 8. Version history, so this stops happening quietly

- v1: built for "Hides Design," retired when the brand reverted to Hides
  Agent.
- v2: drafted by a separate tool (Accio) working from a logo image alone,
  without visibility into the shipped site. Contains a different mark
  description, an unbuilt wordmark, a retired headline font, and a rule
  that contradicts the brass policy. Not used. Kept only for the record.
- v3 (this document): rebuilt directly from verified, shipped code and
  tested files. This is the only version to build from going forward.
