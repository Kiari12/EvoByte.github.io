# EvoByte — Website Design System

> **Humble code. Powerful workflows.**
> This file is the source of truth for the EvoByte website. It's written for humans *and* coding agents. Read it before touching any UI.

Three brand-mark concepts are still in review (see §2). Everything else is shared across all three: palette, type, spacing, motion and voice. Build the site against the shared system, and keep the mark swappable.

---

## 0. How to use this file (for agents)

1. Read §1 (principles) and §9 (anti-patterns) before writing any UI.
2. Use **only** the tokens in §3–§5. Don't hard-code hex values, font sizes or durations in components.
3. Motion follows §7 (Emil Kowalski's principles). If unsure, **don't animate**.
4. Before calling a page done, run the §10 checklist. If the **Impeccable** skill is installed, also run its review passes (`/audit`, `/critique`, `/polish`) and fix what they flag.
5. The active brand concept is set by one variable, `--brand-concept` / `BRAND_CONCEPT` (`corner` | `block` | `stripe`). No other code should branch on it.

---

## 1. Design principles

The tagline is the brief. **Humble code** means quiet, precise, nothing decorative that doesn't earn its place. **Powerful workflows** means confident type, clear hierarchy and fast, responsive interaction.

| Principle | In practice |
|---|---|
| **Structure over decoration** | Every concept is built from geometric blocks. Layouts use a visible grid, hard edges and deliberate negative space. No blobs, glows or glassmorphism. |
| **Navy carries, honey points** | Navy is the voice; honey is the highlighter. Honey marks the *one* thing that matters on a screen: the primary CTA, the active state, a key number. |
| **Confident, not loud** | Big Inter Black headlines and calm Regular body. Contrast comes from weight and scale, not colour or effects. |
| **Fast feels premium** | Interactions respond instantly. Motion is short, purposeful and never makes people wait. |
| **Local and real** | We're a small Brunei studio that ships. Use real product screenshots, real numbers and real names. Avoid stock "tech" imagery. |

---

## 2. Brand mark: three concepts (pending)

All three share the wordmark **EVO BYTE** in Inter Black, the tagline, the core palette and Inter. Only the symbol, pattern and accent usage differ.

### Concept A: "Open Corner" (`corner`)
- **Mark:** two open corners and a diagonal forming a square or a "0". The open corners stand for flexibility, the diagonal for progress, and the 0 for binary.
- **Wordmark:** "EVO BYTE" in navy, mark in honey.
- **Pattern:** fragments of corners and diagonals, navy on white.
- **Palette:** Navy, Honey, Black, White.
- **Website signature:** use the **diagonal** as the motif. Make section dividers 45° cuts, add a diagonal stroke to link hovers, and clip image corners with one open corner.

### Concept B: "Binary Block" (`block`)
- **Mark:** E and B merged into a pixel-block glyph that reads as a "0". Its themes are stability and code.
- **Wordmark:** "EVO" in navy, "BYTE" in honey. Tagline in Quantum Blue.
- **Pattern:** a tiled mark in navy, honey and quantum blue with partial crops at the edges.
- **Palette:** adds **Quantum Blue `#8893b1`** as a third brand colour.
- **Website signature:** use the **pixel grid** as the motif. Snap blocks to an 8px module, use square-stepped section edges, and let loading states fill block by block.
- ⚠️ Quantum Blue on white is about 3.1:1. It works for large display text, icons and pattern, but **never for body text or the tagline at small sizes on white**. Use `--ink-muted` instead.

### Concept C: "Progressive Stripe" (`stripe`)
- **Mark:** the E as three slanted bars and the B cut from parallelograms. Its theme is forward motion.
- **Wordmark:** "EVO" in navy, "BYTE" in honey, with the slanted E and B used in the logotype.
- **Pattern:** an interlocking "EBEB" frieze of slanted bars.
- **Palette:** Navy, Honey, Black, White.
- **Website signature:** use the **slant** as the motif. Skew accent bars about 12°, add a slanted underline to active nav items, and give the primary button a parallelogram highlight on hover. Never skew text.

### Rules for every concept
- Give the mark clear space equal to the height of the "E" stem block on all sides.
- Minimum sizes are 24px for the symbol alone and 120px wide for the full lockup.
- Use the honey mark on navy, the navy mark on white, and a white mark on photos.
- Never recolour the mark outside the palette, add shadows or gradients, rotate it, or stretch it.
- Use the pattern at **≤ 12% of a viewport**, as a single band, a footer field or a hero corner crop. It's a texture, not a wallpaper. Don't put text over the pattern.
- Ship the mark as inline SVG with `currentColor` so each concept has one component.

---

## 3. Colour

### 3.1 Brand palette

| Token | Name | Hex | OKLCH (approx.) | Role |
|---|---|---|---|---|
| `--navy-900` | Navy Blue | `#0e3051` | `oklch(0.29 0.07 254)` | Primary brand, headings, dark surfaces |
| `--honey-400` | Honey Crisp | `#e3bd5c` | `oklch(0.81 0.12 85)` | Accent, CTAs on navy, highlights |
| `--quantum-400` | Quantum Blue | `#8893b1` | `oklch(0.66 0.05 275)` | **Concept B only.** Secondary brand, pattern |
| `--black` | Black | `#000000` | — | Logo on merch or print only |
| `--white` | White | `#ffffff` | — | Surfaces, text on navy |

### 3.2 UI ramp (derived)

Following Impeccable, the **neutrals are tinted toward the navy hue** instead of being pure grey. Pure `#000` is reserved for print and merch. On screen, "black" is `--ink`.

```css
:root {
  /* Brand */
  --navy-950: oklch(0.21 0.05 254);  /* deepest surface, footer */
  --navy-900: #0e3051;               /* brand navy */
  --navy-700: oklch(0.40 0.08 254);  /* hover on navy buttons */
  --navy-100: oklch(0.94 0.02 254);  /* tinted backgrounds, selected rows */
  --navy-50:  oklch(0.975 0.008 254);/* page alt background */

  --honey-500: oklch(0.74 0.13 82);  /* honey hover/pressed */
  --honey-400: #e3bd5c;              /* brand honey */
  --honey-100: oklch(0.95 0.04 88);  /* highlight wash, badges */

  --quantum-400: #8893b1;            /* concept B only */

  /* Neutrals, tinted to navy (hue 254) */
  --ink:        oklch(0.20 0.03 254); /* body text, replaces #000 on screen */
  --ink-muted:  oklch(0.45 0.03 254); /* secondary text, ≥ 4.5:1 on white */
  --ink-subtle: oklch(0.62 0.02 254); /* placeholders, disabled, large text only */
  --line:       oklch(0.90 0.01 254); /* borders, dividers */
  --surface:    #ffffff;
  --surface-alt: var(--navy-50);

  /* Semantic */
  --bg: var(--surface);
  --fg: var(--ink);
  --accent: var(--honey-400);
  --brand: var(--navy-900);
  --focus-ring: var(--honey-400);
  --success: oklch(0.62 0.13 155);
  --danger:  oklch(0.58 0.18 28);
}

/* Dark: navy is the canvas, not grey-black */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: var(--navy-950);
    --fg: oklch(0.95 0.01 254);
    --ink-muted: oklch(0.75 0.03 254);
    --line: oklch(0.32 0.04 254);
    --surface-alt: var(--navy-900);
  }
}
:root[data-theme="dark"] { /* same values as above */ }
```

### 3.3 Contrast rules (non-negotiable)

| Pair | Ratio (approx.) | Allowed for |
|---|---|---|
| Navy on white | ~13:1 | Everything |
| White on navy | ~13:1 | Everything |
| Honey on navy | ~7:1 | Everything, the signature combination |
| Navy on honey | ~7:1 | Buttons, badges |
| **Honey on white** | **~1.8:1** | ❌ **Never for text or icons.** Decorative fills and the mark only. |
| Quantum on white | ~3.1:1 | Large display (≥ 24px bold) and icons only |
| `--ink-muted` on white | ≥ 4.5:1 | Body and secondary text |

### 3.4 Colour ratio
Aim for about **70 / 20 / 8 / 2**: white or neutral, navy, honey, everything else. If honey shows up more than twice above the fold, cut it back. When honey is everywhere, it stops pointing at anything.

---

## 4. Typography

**Typeface:** Inter, the brand's chosen family. Use **Inter Variable** with optical sizing (`font-optical-sizing: auto`) so display sizes get the tighter Display cut.

**Weights:** Black (900) for display, Bold (700) for headings, SemiBold (600) for UI, labels and buttons, Regular (400) for body. No Light or Thin.

**Optional code accent:** JetBrains Mono or Geist Mono, used only for code, version numbers, terminal snippets and tiny eyebrow labels. It suits a dev studio's "humble code" voice. Use it sparingly, as seasoning.

> **Impeccable note:** Impeccable lists Inter as an overused default font. Here it's a deliberate brand decision, so we keep it. The way to make it distinctive is **extreme weight contrast** (Black 900 next to Regular 400), **tight display tracking** and **generous scale jumps**. Avoid timid 600-on-400 hierarchies.

### Scale (fluid, ratio about 1.25 to 1.333)

```css
:root {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --text-xs:   0.75rem;                              /* 12, eyebrow/meta */
  --text-sm:   0.875rem;                             /* 14, captions, UI */
  --text-base: 1rem;                                 /* 16, body min */
  --text-lg:   1.125rem;                             /* 18, lead body */
  --text-xl:   clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem);
  --text-2xl:  clamp(1.5rem, 1.2rem + 1.2vw, 2rem);
  --text-3xl:  clamp(2rem, 1.5rem + 2vw, 3rem);
  --text-4xl:  clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem); /* hero */
  --text-5xl:  clamp(3rem, 1.8rem + 5vw, 6rem);       /* statement */
}
```

| Role | Size | Weight | Tracking | Line height |
|---|---|---|---|---|
| Hero / statement | 4xl to 5xl | 900 | -0.035em | 0.95 to 1.0 |
| H1 | 3xl | 800 to 900 | -0.025em | 1.05 |
| H2 | 2xl | 700 | -0.02em | 1.15 |
| H3 | xl | 700 | -0.01em | 1.25 |
| Body | base to lg | 400 | 0 | 1.6 |
| UI / button | sm to base | 600 | 0 | 1 |
| Eyebrow | xs | 600, uppercase | +0.08em | 1 |

Rules:
- Keep body text **between 60 and 72 characters wide** (`max-width: 65ch`).
- Use `font-variant-numeric: tabular-nums` for stats, prices, tables and timers.
- Apply `text-wrap: balance` to headings and `text-wrap: pretty` to paragraphs.
- Uppercase only the wordmark and eyebrows. Never uppercase headings or paragraphs.
- The wordmark is a logo asset, not live text. Don't re-typeset "EVO BYTE" in CSS.

---

## 5. Space, layout and shape

### Spacing (4px base, 8px rhythm)
```css
:root {
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;
  --space-9: 96px; --space-10: 128px;
  --section-y: clamp(64px, 8vw, 128px);
  --gutter: clamp(16px, 4vw, 32px);
  --container: 1200px;
}
```
- Vary the rhythm. Tight groups go inside components and big gaps go between sections. Uniform padding everywhere looks generated.
- Use a 12-column grid. Asymmetric splits (7/5, 8/4) beat centred everything.
- On mobile, keep a 16px side gutter with no horizontal scroll.

### Shape
The marks are **hard-edged geometry**. Radii stay small.
```css
:root {
  --radius-0: 0;      /* pattern, dividers, image crops (A, B) */
  --radius-1: 4px;    /* buttons, inputs, badges */
  --radius-2: 8px;    /* cards, panels */
  --radius-full: 999px; /* avatars, status dots only */
}
```
- Concept A: square image crops with one open-corner bracket.
- Concept B: everything snaps to the 8px grid. Prefer `--radius-0` and `--radius-1`.
- Concept C: use slanted clip-paths for accents only. Content containers stay rectangular.

### Elevation
Prefer **borders and tone shifts** to shadows. Allow at most one shadow, for dropdowns and popovers:
`--shadow-pop: 0 1px 2px oklch(0.2 0.03 254 / 0.06), 0 8px 24px oklch(0.2 0.03 254 / 0.10);`

---

## 6. Components

### Buttons
| Variant | Light bg | Dark/navy bg |
|---|---|---|
| **Primary** | Navy fill, white text | Honey fill, navy text |
| **Secondary** | 1.5px navy border, navy text | 1.5px white/20% border, white text |
| **Ghost** | Navy text, `--navy-100` hover | White text, white/10% hover |

- Height is 44px (40px for compact). Horizontal padding is `--space-5`. Text is 600.
- Use **one primary per view.** The honey button on a navy hero is the signature CTA.
- Press feedback is `transform: scale(0.97)` (§7).
- The focus ring is 2px `--focus-ring` with a 2px offset. Always visible on `:focus-visible`.
- Write labels as verb plus outcome: "Start a project", "See our work". Never "Click here" or "Submit".

### Navigation
- Sticky with a white/navy background. Add a 1px `--line` border once scrolled; don't use a shadow.
- The active item gets a concept-specific indicator: a diagonal tick (A), a block underline (B) or a slanted bar (C), in honey on navy or navy on white.
- On mobile, use a full-screen navy sheet with large 2xl links. It opens with motion per §7.

### Cards (projects/products)
- White, 1px `--line` border, `--radius-2`, no shadow. On hover, the border goes to navy and the image moves `translateY(-2px)`.
- **Never nest cards inside cards.** Use dividers or spacing inside a card.
- Product cards (EduSmart, Lessonarity, StudyMark, GeriTrack, BebasWork and others) show a real screenshot, one-line value, platform tags and a link.

### Stats / proof
- Large Inter Black numerals in navy with tabular nums, and the label in `--ink-muted` sm.
- Highlight one key number in honey on a navy band.

### Code snippet block
- Navy-950 background with a mono font, with honey for keywords or the prompt `$`. This is the "humble code" moment, so use it once or twice per page.

### Forms
- Labels always sit above fields. Placeholders are never used as labels.
- The input border is `--line`, going navy on focus with the honey ring.
- Errors are inline below the field in `--danger` and say how to fix it.

### Footer
- Navy-950 field with a single band of the concept's brand pattern at about 8% opacity, behind *no* text.

---

## 7. Motion: Emil Kowalski's principles

Motion should make the interface feel **fast and responsive**, not show off. When in doubt, leave it out.

### 7.1 Should this animate at all?
| How often is it seen? | Animate? |
|---|---|
| Constantly (typing, keyboard shortcuts, tab switches, command palette) | **No.** Instant beats any curve. |
| Often (hover, dropdowns, toasts) | Subtle and short (≤ 200ms) |
| Rarely (page hero, first-load reveal, success moment) | You can add a little delight, still ≤ 500ms |

**Keyboard-initiated actions never animate.** Motion on a 100-times-a-day action becomes friction.

### 7.2 Easing
Built-in `ease` and `ease-in-out` are too weak. Use custom curves:
```css
:root {
  --ease-out:    cubic-bezier(0.23, 1, 0.32, 1);    /* default: enter, hover, most UI */
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);   /* on-screen movement A → B */
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);    /* sheets, drawers */

  --dur-instant: 100ms;  /* press, toggle */
  --dur-fast:    160ms;  /* hover, tooltip */
  --dur-base:    220ms;  /* dropdown, popover, toast */
  --dur-slow:    320ms;  /* modal, drawer */
  --dur-hero:    500ms;  /* one-off page reveals only */
}
```
- **Entering** uses ease-out. **Moving** on screen uses ease-in-out. **Never ease-in** for UI, because it feels sluggish.
- No bounce or elastic easing. It reads as dated and toy-like.
- UI animations stay **under 300ms**.

### 7.3 Craft rules
- **Animate only `transform` and `opacity`** (plus `clip-path` and `filter: blur` with care). Never animate width, height, top or margin.
- **Never scale from 0.** Enter from `scale(0.95)` plus `opacity: 0`. Nothing in the real world appears from nothing.
- **Set the origin.** Popovers and dropdowns scale from their trigger (`transform-origin` at the anchor). Modals stay centred.
- **Button press:** `:active { transform: scale(0.97); }` with `--dur-instant`.
- **Prefer CSS transitions to keyframes** for interactive states, because transitions can be interrupted and retargeted mid-flight.
- **Exits are faster than entrances**, about 75% of the duration.
- **Stagger** lists by 30 to 50ms per item, with a maximum of about 6 staggered items.
- **Blur masks imperfection.** A 2 to 4px `filter: blur()` during a crossfade hides awkward intermediate frames.
- **Tooltips:** delay the first open (about 400ms), then make neighbouring tooltips instant with no animation.
- **Hover effects only on hover devices:** wrap them in `@media (hover: hover) and (pointer: fine)`.

### 7.4 Hero animation (the signature moment)

The hero is **animated**. People see it about once per visit, so it's the one place where motion can show personality. It comes in three layers:

1. **Entrance:** a choreographed build of the mark and the content, played once.
2. **Ambient:** slow, quiet motion that continues while the hero is on screen.
3. **Scroll and pointer:** the hero reacts gently as people scroll away or move the cursor.

**Hard limits:** the whole entrance takes ≤ 1.2s. The headline must be readable by about 600ms. Nothing blocks clicks. The headline is in the HTML from the start, so it isn't delayed for search engines or LCP (largest contentful paint, the page-speed metric for when the main content appears).

#### 7.4.1 Entrance timeline

| Start | Element | Motion | Duration | Easing |
|---|---|---|---|---|
| 0ms | Brand mark | Concept build (7.4.2) | 600ms | `--ease-out` |
| 120ms | Eyebrow | `opacity 0→1`, `translateY(8px→0)` | 300ms | `--ease-out` |
| 180ms | Headline, line by line (+70ms per line) | `opacity 0→1`, `translateY(20px→0)`, `blur(6px→0)` | 500ms | `--ease-out` |
| 380ms | Subtext | `opacity 0→1`, `translateY(8px→0)` | 400ms | `--ease-out` |
| 480ms | CTAs (+50ms stagger) | `opacity 0→1`, `scale(0.95→1)` | 300ms | `--ease-out` |
| 650ms | Honey highlight on key word | Underline sweeps left to right (`clip-path`) | 450ms | `--ease-in-out` |
| 700ms | Pattern band / product visual | `opacity 0→1`, `translateY(24px→0)` | 600ms | `--ease-out` |
| ~1200ms | Ambient layer starts | — | — | — |

```css
/* The start state applies only when JS has loaded, so the page is never blank without JS */
.js .hero [data-reveal] {
  opacity: 0;
  transform: translateY(var(--reveal-y, 12px));
  filter: blur(var(--reveal-blur, 0));
}
.js .hero.is-in [data-reveal] {
  opacity: 1;
  transform: none;
  filter: none;
  transition:
    opacity 500ms var(--ease-out),
    transform 500ms var(--ease-out),
    filter 500ms var(--ease-out);
  transition-delay: var(--delay, 0ms);
}
.hero h1 [data-reveal] { --reveal-y: 20px; --reveal-blur: 6px; }
```
- Split the headline by **line**, not by letter. Letter-by-letter reveals are slow and gimmicky.
- Remove `filter` once the entrance finishes (`transitionend`), because a blur left on large text costs performance.
- The entrance plays on the first homepage load of a session. Coming back to the homepage later in the same session shows the final state instantly.

#### 7.4.2 Mark build (per concept)

**A, Open Corner:** the two corners slide in from opposite diagonals (`translate(-12px,-12px)` and `translate(12px,12px)` to `0`, 400ms). The diagonal then **draws itself** with `stroke-dashoffset` (300ms, starting at 250ms). It ends with a single 2px honey glint along the diagonal.

**B, Binary Block:** the mark's blocks appear **in grid order**, top-left to bottom-right. Each block goes from `opacity 0, scale(0.8)` to `1` with a 40ms stagger, about 8 blocks in roughly 500ms. It should feel like bits loading. Blocks never scale up from 0.

**C, Progressive Stripe:** the three E bars slide in from the left **along their 12° angle** with a 60ms stagger. The B parallelograms slide in from the right and meet in the middle, giving a sense of forward motion. Only the bars move; text is never skewed.

All marks are built from inline SVG `<path>`/`<rect>` elements, each with its own `--delay`, using only transform, opacity and stroke-dashoffset.

#### 7.4.3 Ambient layer (after the entrance)

Pick **one** of these, never more:
- **Pattern drift (default):** the brand pattern band moves sideways very slowly (`translateX`, a 60–90s linear loop, seamless tile). It should be barely noticeable.
- **Concept pulse:** every 6–8s the mark repeats a tiny version of its build, such as the diagonal glinting (A), one block flickering (B) or one bar nudging forward (C). Keep it under 400ms, then rest.
- **Live product visual:** the hero screenshot shows a short real UI moment, like a StudyMark streak ticking up or a grading list filling in. It plays once, then holds.

Rules:
- Pause when the hero is off screen (IntersectionObserver) and when the tab is hidden (`visibilitychange`).
- Ambient loops use `linear` timing for drift and `--ease-out` for pulses. No bounce.
- No rotating "we build ___" words, typewriter effects or particle backgrounds.

#### 7.4.4 Scroll and pointer

- **Scroll-out:** as the hero leaves the screen, the mark goes to `scale(0.92)` and `opacity 0.6`. Use CSS scroll-driven animations (`animation-timeline: view()`) where they're supported. Elsewhere, leave the hero static rather than adding a JS fallback.
- **Pointer parallax (optional):** the mark follows the cursor by **≤ 6px** with smoothing (lerp ~0.1), only inside `@media (hover: hover) and (pointer: fine)`. There's no parallax on text.

#### 7.4.5 Reduced motion

With `prefers-reduced-motion: reduce`, the hero renders in its **final state**: the mark is static, the content is visible, there's no ambient layer and no parallax. A plain 200ms opacity fade on the content is allowed. Nothing moves.

#### 7.4.6 Other brand motion outside the hero
- Loaders use the concept's build in miniature: the diagonal draw (A), the block fill (B) or the bar slide (C).
- None of the above plays on route changes.

### 7.5 Reduced motion (required)
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Keep opacity fades if you like, but remove all movement.

---

## 8. Imagery and voice

**Imagery**
- Show real product UI in a light device frame or frameless with a 1px `--line` border, real team and classroom photos from Brunei, and the brand pattern.
- Photos can take a subtle navy duotone or overlay for consistency.
- Icons are 1.5px-stroke line icons (Lucide or Phosphor) with square caps that match the geometry. Use one icon set only.
- ❌ Avoid stock "hacker in hoodie" shots, 3D blobs, AI-generated abstract art and isometric illustration packs.

**Voice**
- **Humble:** plain words, short sentences, no "revolutionary", "cutting-edge" or "synergy".
- **Powerful:** lead with outcomes. Write "Mark 200 scripts in an afternoon", not "AI-powered grading solution".
- Use English as the primary language. Make room in the layout for Malay copy, which runs about 20 to 30% longer, so don't size buttons to fit English exactly.
- Use sentence case for headings and buttons.

---

## 9. Anti-patterns: the Impeccable list (never ship these)

Each of these makes a site look AI-generated or templated:

- ❌ Purple/blue gradients, gradient text, glowing orbs or "aurora" backgrounds
- ❌ Glassmorphism or frosted cards as decoration
- ❌ Cards nested in cards, or every section boxed in a card
- ❌ Grey text on coloured backgrounds. Use a tint of the background colour instead.
- ❌ Pure `#000` or pure grey on screen. Use navy-tinted neutrals.
- ❌ **Honey text on white**, which fails contrast
- ❌ Bounce or elastic easing, slow (> 500ms) UI transitions, animating layout properties
- ❌ Centred-everything layouts with identical padding per section
- ❌ Three-up icon feature grids as the default answer to every section
- ❌ Hero metrics like "10x faster" with nothing behind them
- ❌ Emoji as icons; mixed icon sets
- ❌ Wallpapering the brand pattern behind content
- ❌ Timid hierarchy (600 vs 400 weight, 1.1× size jumps)
- ❌ Modals for things that could be inline
- ❌ Lorem ipsum or placeholder screenshots shipped to production

---

## 10. Pre-ship checklist

**Brand**
- [ ] The mark component reads `BRAND_CONCEPT`, and nothing else branches on it
- [ ] Honey is used only as an accent and is never text on white
- [ ] The pattern covers ≤ 12% of any viewport and sits behind no text

**Type and layout**
- [ ] Hero uses Inter Black with negative tracking, and body is ≤ 65ch
- [ ] Tabular nums on all numbers
- [ ] Works at 360px, 768px, 1280px and 1920px with no horizontal scroll
- [ ] Malay copy fits without breaking buttons or nav

**Motion (Emil)**
- [ ] Nothing triggered by the keyboard animates
- [ ] All UI transitions ≤ 300ms with custom ease-out
- [ ] Only transform and opacity are animated, and nothing scales from 0
- [ ] Popovers have the correct `transform-origin`
- [ ] Buttons have `scale(0.97)` press feedback
- [ ] Hover effects are gated behind `(hover: hover)`
- [ ] `prefers-reduced-motion` is respected
- [ ] Hero entrance finishes within 1.2s, headline readable by about 600ms, page works with JS off
- [ ] Hero ambient layer pauses when the hero is off screen or the tab is hidden

**Quality (Impeccable)**
- [ ] WCAG AA contrast everywhere (4.5:1 for text, 3:1 for UI and large text)
- [ ] Visible `:focus-visible` rings and full keyboard navigation
- [ ] Every interactive element has hover, active, focus, disabled and loading states
- [ ] Empty, error and loading states are designed, not defaulted
- [ ] Nothing from §9 present
- [ ] If the Impeccable skill is available: `/audit` → fix → `/critique` → fix → `/polish`

---

## Appendix: Tailwind v4 theme (optional)

```css
@import "tailwindcss";
@theme {
  --color-navy-950: oklch(0.21 0.05 254);
  --color-navy-900: #0e3051;
  --color-navy-700: oklch(0.40 0.08 254);
  --color-navy-100: oklch(0.94 0.02 254);
  --color-navy-50:  oklch(0.975 0.008 254);
  --color-honey-500: oklch(0.74 0.13 82);
  --color-honey-400: #e3bd5c;
  --color-honey-100: oklch(0.95 0.04 88);
  --color-quantum-400: #8893b1;
  --color-ink: oklch(0.20 0.03 254);
  --color-ink-muted: oklch(0.45 0.03 254);
  --color-line: oklch(0.90 0.01 254);

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
  --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);

  --radius-sm: 4px;
  --radius-md: 8px;
}
```