# Hides Agent — Section Blueprint (Motion + Voice)

Single reference for how every remaining section gets built: what animates,
how, and what it actually says. Extends `docs/website-spec.md`, doesn't
replace it. Applies to Process, Terms, Enquiry now, and About whenever that
gets decided.

---

## 1. Motion rules, by element type, not by section

The mistake fixed a few sessions back was one flourish (word-mask reveal)
copied onto every heading, which made the page feel templated. The fix
isn't "less motion everywhere," it's the right motion per element type,
applied consistently. All of this runs through the existing `ha-motion.js`
data-attribute API, nothing new gets built.

| Element type | Treatment | Attribute |
|---|---|---|
| Hero H1 only | Word-by-word masked reveal | `data-lines` (hero only, permanent rule) |
| Section eyebrow + heading | Fade + rise, once | `data-animate="fade-up"` |
| Supporting paragraph | Fade + rise, ~150ms after heading | `data-animate="fade-up"` on its own element, later in DOM order |
| Lists, rows, grids (Leathers index, Process steps, Terms stats) | Sequential stagger | `data-stagger` on the parent |
| Images or generative panels | Parallax or scale-in, one per section max | `data-parallax` or `data-animate="scale-in"` |
| Numbers | Count-up **only** with a real value | `data-count="N"` — never on a placeholder |
| CTA links | No entrance beyond parent stagger, hover interaction only | none needed, `.cta` hover states already built |

**Entrances fire once, not on re-scroll.** No exit animations. Content that's
been revealed stays revealed as the page scrolls past it, the same way the
hero already behaves. This is a deliberate restraint call, not an oversight,
see the note above if this needs to be argued differently.

**No new signature flourishes.** The hero has its one moment (word-mask +
light sheen). Every other section is calm by comparison, on purpose, that
contrast is what makes the hero feel earned instead of just first.

---

## 2. Voice check, before any copy ships

A line fails this check if it could sit on a template for any premium goods
site with the brand name swapped out. Every line below was rewritten
against that test.

---

## 3. Section 3 — Process (tightened copy)

```
Eyebrow:     The Process
Heading:     From swatch to shelf, in three steps.

Step 01 — Swatches
Hold the grain before you commit to it. A swatch kit of all five
leathers, sent to your studio.

Step 02 — Sample
One hide, cut and finished to your spec, before a single unit goes
to volume.

Step 03 — Bulk
The same hide, every time. Production runs shipped direct, no
reorder surprises.
```

Change from the current build: "reorder surprises" names the actual fear a
small brand has about a new supplier, consistency across repeat orders,
rather than the generic "consistent production supply" phrasing already
live. Concrete beats abstract.

## 4. Section 4 — Terms (tightened copy)

```
Eyebrow:     Terms
Heading:     Numbers move with the order, not a price list.

MOQ           On request
Lead times    On request
Pricing       On request

Full provenance documentation with every order.
```

The heading line is new, it does the honesty-as-differentiator work in one
sentence instead of leaving three "on request" values to speak for
themselves with no framing. Directly usable, replaces "Terms" as a bare
label with an actual sentence.

## 5. Section 6 — Enquiry (tightened copy)

```
Eyebrow:     Get in touch
Heading:     Start a conversation.
Sub:         Swatch kit or a bulk quote, tell us which. We reply
             within one working day.
```

Change from the current build: "send us your details and we'll be in
touch" is the one line in the whole site that reads like a stock contact
form. Replaced with the actual operational commitment already established
elsewhere in this project, one working day, which is both more specific
and something the team can actually be held to.

---

## 6. Claude Code prompt for this session

```
Read docs/website-blueprint.md (this file) alongside CLAUDE.md and
docs/website-spec.md before building.

Build Process and Terms (sections 3 and 4) using the copy in section 3
and 4 of this blueprint exactly as written. Apply motion per the table
in section 1: eyebrow and heading get data-animate="fade-up", the
process steps and terms stats get data-stagger on their parent, no
data-lines anywhere outside the hero, no exit animations, entrances
fire once.

Also update the live Enquiry section copy to match section 5 of this
blueprint, that's a copy-only change, no layout change needed.

Verify at 375px, 1440px, 2560px, and with reduced-motion emulated,
per CLAUDE.md's standing checklist. Commit and report back with
screenshots of all three new/changed sections.
```
