# HA Motion — Integration Guide

Three files, three script tags, one init call. That's the whole integration.

## 1. Files

```
css/ha-motion.css     styles for initial states + fallback transitions
js/ha-motion.js       the system (config, factories, cleanup, fallbacks)
vendor/gsap.min.js    GSAP core        (or cdnjs in production)
vendor/ScrollTrigger.min.js            (or cdnjs in production)
```

## 2. Wire-up

In `<head>`:
```html
<link rel="stylesheet" href="css/ha-motion.css">
```

Before `</body>`:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/ScrollTrigger.min.js"></script>
<script src="js/ha-motion.js"></script>
<script>HAMotion.init();</script>
```

If GSAP fails to load (blocked CDN, offline), the system automatically
falls back to IntersectionObserver + CSS transitions. Content is never
invisible.

## 3. Animate anything with data attributes

| Attribute | Effect |
|---|---|
| `data-animate="fade-up"` | entrance on scroll (also: fade-down, slide-left, slide-right, scale-in, rotate-in) |
| `data-stagger` on a parent | children reveal in sequence |
| `data-parallax="0.35"` | scroll parallax, 0.15 (slow bg) to 1.5 (fast fg), clamped |
| `data-lines` on a heading | word-by-word masked reveal (hero style) |
| `data-draw` on an `<svg>` | strokes draw in; filled logos get a dignified fade-settle |
| `data-count="1200"` | counts 0 → value on view. Real numbers only, never decorative |
| `data-pin` + `data-pin-steps` | section pins, inner steps crossfade through scroll |

## 4. Config

```js
HAMotion.init({
  ease: "power2.out",
  duration: { ui: 0.25, entrance: 0.7, decorative: 1.4 },
  distance: 26,
  staggerStep: 0.09,
  revealStart: "top 85%",
  parallaxClamp: [0.15, 1.5],
  heroSheen: true,        // cursor raking-light on .hero
  smoothScroll: false,    // Lenis hook, deliberately off by default
  debug: false,
});
```

## 5. Lifecycle

```js
HAMotion.refresh();  // after injecting content dynamically
HAMotion.destroy();  // SPA route change / teardown, restores all content
```

## 6. Hard rules baked in (do not remove)

- `prefers-reduced-motion: reduce` disables everything; content shows instantly.
- Transform/opacity only. Nothing animates width, height, or position.
- No-JS and no-GSAP visitors see full content.
- Counters refuse to run without a real `data-count` value. No invented numbers.

## 7. Weight (measured, gzipped)

GSAP core 28KB + ScrollTrigger 18KB + ha-motion 4KB = **~50KB transfer.**
Within the 90KB budget with 40KB headroom. Lenis (+~10KB) still fits if
the smooth-scroll flag is ever turned on.

## 8. Deliberately not included

Testimonial carousel (no real testimonials yet), animated counters with
placeholder values (numbers are "on request"), background video (real
footage only), magnetic buttons / velocity skew / particles (off-brand),
page transitions (single page). The pin factory covers the future
portfolio section when real work exists to show.
