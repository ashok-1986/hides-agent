/* =========================================================================
   HA MOTION — animation system for the Hides Agent site
   -------------------------------------------------------------------------
   Design rules this system enforces (from HD_Website_Spec.md):
   - transform/opacity only, GPU-friendly, no width/height animation
   - UI feedback <= 300ms, entrances <= 800ms, decorative <= 1500ms
   - one signature effect per viewport; restraint is the brand
   - prefers-reduced-motion disables everything, content always visible
   - no GSAP loaded? IntersectionObserver fallback reveals content anyway
   - counters only run on elements with real data-count values (none faked)

   Public API:
     HAMotion.init(userConfig?)   -> boots everything
     HAMotion.refresh()           -> recalc after dynamic content
     HAMotion.destroy()           -> kills triggers/observers (SPA-safe)

   Data-attribute API (put these on any element):
     data-animate="fade-up|fade-down|slide-left|slide-right|scale-in|rotate-in"
     data-stagger            on a PARENT: children reveal in sequence
     data-parallax="0.35"    scroll parallax; 0.2 slow bg ... 1.5 fast fg
     data-draw               SVG: strokes draw themselves in on view
     data-count="1200"       counts 0 -> value on view (real numbers only)
     data-pin                section pins while inner [data-pin-steps] play
     data-lines              hero-style staggered line reveal on text
   ========================================================================= */

(function (root, factory) {
  root.HAMotion = factory();
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /* ---------------------------- configuration --------------------------- */

  const DEFAULTS = {
    ease: "power2.out",
    duration: { ui: 0.25, entrance: 0.7, decorative: 1.4 },
    distance: 26,                 // px travel for fade/slide entrances
    staggerStep: 0.09,
    revealStart: "top 85%",       // ScrollTrigger start for entrances
    parallaxClamp: [0.15, 1.5],   // allowed speed ratios
    heroSheen: true,              // cursor raking-light on .hero
    smoothScroll: false,          // Lenis, off by default (weight + a11y)
    debug: false,
  };

  const state = {
    config: null,
    reduced: false,
    hasGSAP: false,
    triggers: [],
    observers: [],
    listeners: [],
    booted: false,
  };

  /* ------------------------------ utilities ----------------------------- */

  const $$ = (sel, ctx) => Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  function log() {
    if (state.config && state.config.debug) console.log.apply(console, ["[HAMotion]"].concat([].slice.call(arguments)));
  }

  function on(target, evt, fn, opts) {
    target.addEventListener(evt, fn, opts);
    state.listeners.push(() => target.removeEventListener(evt, fn, opts));
  }

  /* Entrance vectors per animation name: [x, y, scale, rotation] */
  const VECTORS = {
    "fade-up":    (d) => ({ y:  d }),
    "fade-down":  (d) => ({ y: -d }),
    "slide-left": (d) => ({ x:  d * 1.6 }),
    "slide-right":(d) => ({ x: -d * 1.6 }),
    "scale-in":   ()  => ({ scale: 0.94 }),
    "rotate-in":  ()  => ({ rotation: 3, y: 14, transformOrigin: "left bottom" }),
  };

  /* --------------------------- reduced / no-JS -------------------------- */

  function showEverything() {
    $$("[data-animate],[data-stagger] > *,[data-lines],[data-draw],[data-count]").forEach((el) => {
      el.style.opacity = "";
      el.style.transform = "";
      el.style.visibility = "";
    });
    $$("[data-count]").forEach((el) => { el.textContent = el.getAttribute("data-count"); });
  }

  /* ------------------------- GSAP-powered pathway ------------------------ */

  function gsapPath() {
    const g = window.gsap;
    g.registerPlugin(window.ScrollTrigger);
    g.defaults({ ease: state.config.ease, duration: state.config.duration.entrance });

    heroIntro(g);
    entrances(g);
    staggers(g);
    parallax(g);
    svgDraw(g);
    counters(g);
    pins(g);
    if (state.config.heroSheen) sheen();
  }

  /* Hero: line-split reveal without SplitText. Wrap words in masked spans.
     aria: original text kept on parent via aria-label, spans hidden. */
  function heroIntro(g) {
    $$("[data-lines]").forEach((el) => {
      const original = el.textContent;
      el.setAttribute("aria-label", original.trim());
      const words = original.split(/(\s+)/);
      el.textContent = "";
      const spans = [];
      words.forEach((wd) => {
        if (/^\s+$/.test(wd)) { el.appendChild(document.createTextNode(" ")); return; }
        const mask = document.createElement("span");
        mask.setAttribute("aria-hidden", "true");
        mask.style.cssText = "display:inline-block;overflow:hidden;vertical-align:bottom;";
        const inner = document.createElement("span");
        inner.style.cssText = "display:inline-block;transform:translateY(110%);will-change:transform;";
        inner.textContent = wd;
        mask.appendChild(inner);
        el.appendChild(mask);
        spans.push(inner);
      });
      g.to(spans, {
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.045,
        delay: 0.15,
        onComplete: () => spans.forEach((s) => (s.style.willChange = "auto")),
      });
    });
  }

  function entrances(g) {
    $$("[data-animate]").forEach((el) => {
      if (el.closest("[data-stagger]")) return; // parent handles it
      const kind = el.getAttribute("data-animate") || "fade-up";
      const vec = (VECTORS[kind] || VECTORS["fade-up"])(state.config.distance);
      const st = window.ScrollTrigger.create({
        trigger: el,
        start: state.config.revealStart,
        once: true,
        onEnter: () => g.fromTo(el, Object.assign({ opacity: 0 }, vec),
          { opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, overwrite: "auto" }),
      });
      g.set(el, Object.assign({ opacity: 0 }, vec));
      state.triggers.push(st);
    });
  }

  function staggers(g) {
    $$("[data-stagger]").forEach((parent) => {
      const kids = Array.prototype.slice.call(parent.children);
      if (!kids.length) return;
      g.set(kids, { opacity: 0, y: state.config.distance });
      const st = window.ScrollTrigger.create({
        trigger: parent,
        start: state.config.revealStart,
        once: true,
        onEnter: () => g.to(kids, { opacity: 1, y: 0, stagger: state.config.staggerStep }),
      });
      state.triggers.push(st);
    });
  }

  /* Scroll parallax: translate-only, scrubbed, speed clamped to sane range */
  function parallax(g) {
    $$("[data-parallax]").forEach((el) => {
      const [lo, hi] = state.config.parallaxClamp;
      const speed = clamp(parseFloat(el.getAttribute("data-parallax")) || 0.3, lo, hi);
      const dist = (1 - speed) * 120; // slower layers drift further
      el.style.willChange = "transform";
      const tween = g.fromTo(el, { y: -dist }, {
        y: dist,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      });
      state.triggers.push(tween.scrollTrigger);
    });
  }

  /* SVG stroke draw-in for the HA monogram and any [data-draw] svg.
     Filled paths get a fade+scale fallback since they have no stroke. */
  function svgDraw(g) {
    $$("svg[data-draw]").forEach((svg) => {
      const paths = $$("path,line,circle", svg);
      const stroked = paths.filter((p) => {
        const len = p.getTotalLength ? safeLength(p) : 0;
        return len > 0 && getComputedStyle(p).stroke !== "none" && getComputedStyle(p).strokeWidth !== "0px";
      });
      if (stroked.length) {
        stroked.forEach((p) => {
          const len = safeLength(p);
          p.style.strokeDasharray = len;
          p.style.strokeDashoffset = len;
        });
        const st = window.ScrollTrigger.create({
          trigger: svg, start: state.config.revealStart, once: true,
          onEnter: () => g.to(stroked, {
            strokeDashoffset: 0,
            duration: state.config.duration.decorative,
            ease: "power2.inOut",
            stagger: 0.15,
          }),
        });
        state.triggers.push(st);
      } else {
        // filled logo: dignified fade + settle, no fake stroke tricks
        g.set(svg, { opacity: 0, scale: 0.96, transformOrigin: "center" });
        const st = window.ScrollTrigger.create({
          trigger: svg, start: state.config.revealStart, once: true,
          onEnter: () => g.to(svg, { opacity: 1, scale: 1, duration: 0.9 }),
        });
        state.triggers.push(st);
      }
    });
  }

  function safeLength(p) { try { return p.getTotalLength(); } catch (e) { return 0; } }

  /* Counters: ONLY fire on real data-count values. Never invent numbers. */
  function counters(g) {
    $$("[data-count]").forEach((el) => {
      const target = parseFloat(el.getAttribute("data-count"));
      if (isNaN(target)) return;
      const obj = { v: 0 };
      const st = window.ScrollTrigger.create({
        trigger: el, start: "top 90%", once: true,
        onEnter: () => g.to(obj, {
          v: target, duration: 1.2, ease: "power1.out",
          onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString(); },
        }),
      });
      state.triggers.push(st);
    });
  }

  /* Pin a section while its [data-pin-steps] children crossfade through */
  function pins(g) {
    $$("[data-pin]").forEach((section) => {
      const steps = $$("[data-pin-steps] > *", section);
      if (steps.length < 2) return;
      g.set(steps.slice(1), { opacity: 0, y: 20 });
      const tl = g.timeline({
        scrollTrigger: {
          trigger: section, start: "top top",
          end: "+=" + steps.length * 60 + "%",
          pin: true, scrub: 0.6,
        },
      });
      steps.forEach((step, i) => {
        if (i === 0) return;
        tl.to(steps[i - 1], { opacity: 0, y: -20, duration: 0.4 })
          .to(step, { opacity: 1, y: 0, duration: 0.4 }, "<0.1");
      });
      state.triggers.push(tl.scrollTrigger);
    });
  }

  /* The signature: raking light follows the cursor across the hero hide */
  function sheen() {
    const hero = document.querySelector(".hero");
    const layer = hero && hero.querySelector(".hero-sheen");
    if (!hero || !layer) return;
    on(hero, "mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      layer.style.background =
        "radial-gradient(560px circle at " +
        ((e.clientX - r.left) / r.width) * 100 + "% " +
        ((e.clientY - r.top) / r.height) * 100 +
        "%, rgba(246,241,231,0.05), transparent 70%)";
    }, { passive: true });
  }

  /* --------------------- no-GSAP IntersectionObserver -------------------- */

  function ioFallback() {
    log("GSAP absent: IntersectionObserver fallback");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("ha-in");
        io.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    $$("[data-animate],[data-stagger],[data-lines],svg[data-draw]").forEach((el) => io.observe(el));
    $$("[data-count]").forEach((el) => { el.textContent = el.getAttribute("data-count"); });
    state.observers.push(io);
  }

  /* ------------------------------ lifecycle ------------------------------ */

  function init(userConfig) {
    if (state.booted) destroy();
    state.config = Object.assign({}, DEFAULTS, userConfig || {});
    state.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    state.hasGSAP = !!(window.gsap && window.ScrollTrigger);
    document.documentElement.classList.add("ha-motion");
    state.booted = true;

    if (state.reduced) {
      document.documentElement.classList.add("ha-reduced");
      showEverything();
      log("reduced motion: all animation disabled");
      return;
    }
    if (state.hasGSAP) gsapPath();
    else ioFallback();
  }

  function refresh() {
    if (state.hasGSAP && window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  function destroy() {
    state.triggers.forEach((t) => t && t.kill && t.kill());
    state.observers.forEach((o) => o.disconnect());
    state.listeners.forEach((off) => off());
    state.triggers = []; state.observers = []; state.listeners = [];
    state.booted = false;
    showEverything();
  }

  return { init: init, refresh: refresh, destroy: destroy };
});
