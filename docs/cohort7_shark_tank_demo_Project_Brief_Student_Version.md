# Shark Tank Showcase App — Student Brief

## What we're building
A single-page app that showcases classmates' Shark Tank presentations — one student at a time, with a button to rotate through everyone. Built with plain HTML, CSS, and JavaScript (no frameworks, no backend).

**Why this project:** JS concepts usually get taught in isolation (a loop here, a click handler there). This app combines them into one small, complete, relatable thing — arrays of objects, looping, and DOM manipulation — using content about *you*, not generic placeholder data.

## How it works (system design)
Five pieces work together in a loop:

1. **Data** — a hardcoded array of 5 student objects. The source of truth.
2. **State** — one variable (`currentIndex`) tracking which student is showing.
3. **Render function** — reads data + state, writes the result to the page. Runs the same way on page load *and* every click — one reusable operation, not special-cased logic.
4. **Event handling** — clicking "Next" updates state (with wraparound math) and re-runs the render function.
5. **Styling** — one responsive layout, consistent at any screen size.

**The loop:** Data + State → Render → Page. Click "Next" → State updates → Render runs again → repeat.

## The experience
- See one classmate's project at a time (photo, name, title, description) — not overwhelming.
- Click "Next" to browse to the next classmate's project.
- See a position indicator ("3 of 5") so you always know how many profiles exist and where you are.
- Click "Next" on the last profile and it loops back to the first — browsing never dead-ends.
- The layout stays consistent and usable whether it's projected, on a laptop, or on your phone.

## Data model
Each student is a plain object with 4 fields:

| Field | Type | Example |
|---|---|---|
| `name` | string | `"Jordan Lee"` |
| `photo` | string (file path) | `"images/jordan.jpg"` |
| `title` | string | `"BiteBack: Food Waste Tracker"` |
| `description` | string | `"An app that helps restaurants track and reduce food waste."` |

No `id` field — the array index itself (0-4) is the identifier. Descriptions target ~2 sentences (30-40 words) so all 5 cards stay a consistent height; a CSS `line-clamp` rule is a safety net in case one runs long.

## Layout
Single-column, mobile-first. Same stacked structure at every screen size — a wider screen just gets more breathing room, not a different layout.

```
┌─────────────────────────────┐
│  Class name / Shark Tank     │  ← header banner
│  Presentations                │
│  [ event description ]        │
└─────────────────────────────┘

┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │   [ student photo ]    │  │
│  └───────────────────────┘  │
│        [ student name ]       │
│        [ project title ]      │
│   [ description ]             │
│            3 of 5             │  ← position indicator
│   ┌────────────────────┐     │
│   │        Next ↻       │     │
│   └────────────────────┘     │
└─────────────────────────────┘
```

## Visual style
Professional, light mode only, tied to the bootcamp's navy + gold branding. System fonts, no logo (text-only header).

| Color | Hex | Usage |
|---|---|---|
| Navy | `#0B2545` | Header, buttons, large background sections |
| Gold | `#C9A227` | "Next" button, highlights, icons |
| White | `#FFFFFF` | Background |

**Contrast rule:** white text on navy, navy text on gold — never white text on gold, it fails accessibility contrast.

## Concept-to-code map
| Code piece | Concept it teaches |
|---|---|
| Array of student objects | Arrays of objects; key-value data |
| `currentIndex` variable | Variables; primitive state |
| Render function | Functions; DOM selection & manipulation |
| Event listener on "Next" | Event listeners |
| Wraparound math | The modulo operator (`%`) |
| CSS layout | Flexbox/Grid; mobile-first responsive design |
| `line-clamp` | Defensive CSS for variable-length text |

**Build order:** static HTML skeleton → CSS styling → data array → render function → event listener + state → wraparound math → CSS polish.

## How this plan came together
Before any code was written, the plan moved through a deliberate sequence — each step constraining the next:

1. **Problem first** — who is this for, and why does it matter (two audiences: watching vs. clicking through it themselves).
2. **User experience next** — how a "Next" button and position indicator should behave, decided before touching data or code.
3. **System design before any file existed** — the 5-piece architecture and its loop, mapped out as a diagram.
4. **Data model only after architecture** — the render/event logic already made clear what fields were needed.
5. **Wireframe before styling specifics** — a visual target so CSS work isn't guesswork.
6. **Small details last** — description length, CSS truncation — easier to decide once everything upstream is settled.

**Takeaway:** good planning moves *problem → user → behavior → system design → data → visuals → polish*. Skipping ahead to code before these are settled usually means redoing work later.
