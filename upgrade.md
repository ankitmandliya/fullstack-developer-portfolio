# Portfolio Redesign — "Systems in Motion"
### For ankitmandliya.netlify.app — hero / "What I Can Build" section

> Note on scope: your site is a React SPA, so a plain fetch only returns the meta
> tags, not the rendered DOM — I couldn't screenshot the live page or read the
> actual component code. This spec is a concrete design + content direction you
> (or I, if you paste in the component code) can implement. The mobile-graphics
> fix at the bottom is a diagnostic checklist since I can't see the code that's
> failing.

---

## 1. Design plan

**Concept:** Right now "BUILD. AUTOMATE. GROW." reads as three separate word-stamps.
But your own pitch is that you build *connected* systems — so the section should
visually behave like one system, not three cards. The idea: a single signal
travels through three connected stages (Build → Automate → Grow), and what you
"can build" are the nodes branching off that path. This is grounded in what you
actually do (systems, automation, AI pipelines) instead of generic "futuristic"
neon decoration.

**Color** (deep instrument-panel navy, not pure black; one warm signal accent so
it doesn't default to the black+cyan combo every AI portfolio uses):

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0B0E14` | page background |
| `--bg-raised` | `#121722` | panel / node background |
| `--line` | `#232B3A` | hairline borders, the connecting path |
| `--text` | `#E8ECF3` | primary text |
| `--text-dim` | `#8B93A7` | secondary text |
| `--signal` | `#FF8A4C` | the one accent — the traveling signal, active states, key numerals |
| `--signal-dim` | `#7A4A32` | signal at rest / 20% opacity variant |

**Type:**
- Display / headline: **Space Grotesk** (or **General Sans**) — geometric,
  slightly technical, has real personality at large sizes without being a
  cliché serif or a default system font.
- Body / UI: **Inter** — keep it out of the way, tight line-height, sentence
  case throughout (no ALL-CAPS eyebrows, no "WORD — fragment" labels, no `→`
  tacked onto every button).

**Layout concept (desktop):**

```
┌──────────────────────────────────────────────────────────┐
│  Ankit Mandliya                              [Contact]    │
│                                                             │
│   Build. Automate. Grow.                                   │
│   Connected digital systems that move businesses forward.  │
│                                                             │
│   ●─────────────────────●─────────────────────●            │
│   BUILD                 AUTOMATE               GROW        │
│   (signal pulses left → right on load, once, then idle)     │
│                                                             │
│   ┌───────────┐ ┌───────────┐ ┌───────────┐                │
│   │ node: web │ │ node: AI  │ │ node: SEO │  ← branch off   │
│   │  & apps   │ │ & auto.   │ │ & growth  │    the path,    │
│   └───────────┘ └───────────┘ └───────────┘    not floating │
│                                                    cards     │
└──────────────────────────────────────────────────────────┘
```

Mobile collapses the horizontal path into a **vertical** one (see §3) — the
path itself becomes the spine of the section instead of being dropped, so the
system metaphor survives on small screens.

**Principles:**
1. One signature motion: the signal travels the path once on load (or on
   scroll-into-view), then rests. No per-card fade-up, no hover glow on
   everything.
2. The path *is* the layout, not a decoration under it — nodes attach to it.
3. Copy is specific about outcomes, not adjectives ("extraordinary",
   "cutting-edge" etc. stay out of the copy itself).

---

## 2. Rewritten copy — "What I Can Build" section

Replace the current tagline block with:

**Eyebrow:** *(none — skip it; the section header does the work)*

**Heading:**
> Build. Automate. Grow.

**Subhead:**
> High-performance websites, custom software, and AI-driven automation —
> built as one connected system, not a pile of separate tools.

**Three nodes (replace generic "What I can build" bullets):**

- **Web & product engineering** — React and Django/Laravel apps built to
  handle real traffic and real data, from first line of code to production.
- **AI & automation** — workflows and internal tools that remove manual work,
  using LLM APIs and backend automation where it actually saves time.
- **Growth infrastructure** — the SEO, performance, and analytics groundwork
  that turns a finished build into a system that keeps earning attention.

**CTA:** `Start a project` (not "Let's talk" / "Get in touch →")

---

## 3. Mobile layout notes

- Path rotates 90°: vertical line down the center, nodes alternate or stack
  left-aligned beneath it — same metaphor, one column.
- Signal animation still plays top → bottom, shorter duration (~900ms) so it
  doesn't feel sluggish on a small viewport.
- Minimum tap target 44px on the CTA and any node that's tappable/expandable.

---

## 4. Mobile graphics not loading — diagnostic checklist

I can't see your actual code, so I can't point to the exact line, but this
covers the causes that produce "images fine on desktop, broken on mobile" in a
React/Netlify site, roughly in order of likelihood:

1. **Case-sensitive file paths.** Netlify's Linux filesystem is case-sensitive;
   local dev on Mac/Windows isn't. `Hero.PNG` referenced as `hero.png` breaks
   only after deploy — check this first since it explains "works locally,
   fails live."
2. **Absolute paths built for a different base.** If images are referenced as
   `/assets/...` but the app isn't served from the domain root the same way in
   dev vs. the Netlify build, mobile browsers hitting a cached/alternate build
   can 404 silently. Check the Network tab on an actual phone (or Chrome
   DevTools device mode with cache disabled) for 404s, not just visually.
3. **Unsupported format or missing fallback.** AVIF/WebP without a `<picture>`
   fallback fails on some older mobile Safari/WebView versions. Add a
   `.jpg`/`.png` fallback source.
4. **Viewport-based conditional rendering.** If large hero graphics are
   swapped via a CSS `background-image` in a media query, check the query
   itself — an off-by-one `max-width` or a unit mismatch (`768px` vs `48em`)
   is a common silent failure.
5. **Lazy-loading without proper root margin.** `loading="lazy"` or an
   IntersectionObserver-based lazy loader can fail to trigger if the image
   container has `height: 0` until content loads — common with responsive
   `aspect-ratio` boxes that aren't set correctly for the mobile breakpoint.
6. **Large unoptimized assets timing out on mobile network throttling** —
   check actual file sizes; anything over ~300KB for a hero image on mobile
   is worth compressing/serving a smaller responsive variant via `srcset`.

**Fastest way to actually diagnose it:** open the live site on your phone (or
DevTools → mobile emulation with network throttled to "Fast 3G" and cache
disabled), open the Network tab, reload, and look for red/404 rows or
`(failed)` status on the image requests. If you paste me that list of failed
requests, or the component that renders this section, I can point to the
exact fix instead of the general checklist above.

---

## 5. Next step

If you'd like, I can build this as an actual interactive HTML/React mockup of
the redesigned hero + "What I Can Build" section so you can see it live before
you implement it — just say the word.

please make sure no chat bot functionality will affect with news changes, also the development works look like authenticate not AI