# Project Brief

_Last updated: 2026-09-04_

## Problem
Students learning HTML/CSS/JS often see concepts in isolation (a button click example here, an array loop example there) but rarely see them combined into something that feels like a whole, real app. There's a gap between toy exercises and the confidence to build something complete. A relatable, self-referential subject — students' own Shark Tank presentations — makes core JS concepts (arrays of objects, looping, DOM manipulation) stick better than generic placeholder content.

## Target User
Two related audiences:
1. **Students as viewers** — the bootcamp class, watching the app live as a projected teaching demo during class (not a public-facing product).
2. **Students as "players"** — after the demo, students interact with the app directly (e.g. on their own laptop/phone), clicking through classmate profiles themselves. The hands-on experience is part of the lesson.

## Core Functionality
1. **Class/Event header section** — static content introducing the class, the Shark Tank Presentation event, and a short description.
2. **Student showcase section** — displays one student at a time (photo, name, project title, description), with a button to rotate/cycle through student records.

**Primary teaching goal:** working with an array of objects and looping through data to render content dynamically.
**Secondary teaching goal:** DOM manipulation and event listeners (the rotate button).

## Pages
- Single page (no routing/multi-page navigation planned yet).

## Tech Stack
- HTML
- CSS
- Vanilla JavaScript (no frameworks, no build tools)
- No backend, no external data fetch — keeps the lesson focused on core JS fundamentals

## Architecture
Simple static site: one HTML file, one CSS file, one JS file (exact file structure/naming TBD). No backend, no build tools, no frameworks.

**System breakdown (5 pieces working together):**
1. **Data layer** — hardcoded array of 5 student objects in the JS file. The source of truth.
2. **State** — a single top-level `let` variable (e.g. `currentIndex`) tracking which student is currently shown. Lives directly in the JS file, not in the DOM or a data attribute — kept simple and visible for beginners to trace.
3. **Render function** — one reusable function that reads the data + current state and writes the right content into the DOM (name, photo, title, description, position indicator). Called identically on initial page load and on every "Next" click — no special-cased logic per event, reinforcing that "update the screen" is a single repeatable operation.
4. **Event handling** — click listener on the "Next" button. On click: updates state using wraparound math (`currentIndex = (currentIndex + 1) % students.length`), then calls the render function again.
5. **Styling system** — CSS handling layout and responsiveness, applied consistently regardless of which student is showing.

**Core loop:** Data + State → Render function → DOM. Click "Next" → updates State → calls Render function again → loop continues indefinitely (see confirmed wraparound behavior in User Flows).

**Concept-to-code map (for lesson planning):**

| Code piece | Concept it teaches | What students see/do |
|---|---|---|
| Array of student objects | Arrays of objects; key-value data | Reading values like `students[0].name` |
| `currentIndex` variable | Variables; primitive state | One value representing "where we are" |
| Render function | Functions; DOM selection & manipulation | `document.querySelector`, `.textContent`, `.src` |
| Event listener on "Next" button | Event listeners | `addEventListener('click', ...)` connecting UI to logic |
| Wraparound math | The modulo operator | `(currentIndex + 1) % students.length` |
| CSS layout (header + card) | Flexbox/Grid; mobile-first responsive design | One stacked layout that holds up at any screen width |
| `line-clamp` truncation | CSS text-overflow handling | Defensive styling for variable-length text |

**Suggested teaching order:**
1. Static HTML skeleton (header + one hardcoded student card) — semantic HTML.
2. CSS styling of that static layout — flexbox/grid, mobile-first.
3. Introduce the data array — replace hardcoded text with `students[0].name`, etc.
4. Write the render function — same output as step 3, but built from a function reading state + data.
5. Add the event listener and state update — this is where it becomes interactive.
6. Add wraparound math — refine the click handler so it loops instead of erroring past the array's end.
7. Polish CSS — `line-clamp` safety net, spacing, position indicator styling.

## Data
- A single hardcoded JavaScript array of student objects (living directly in the JS file — no external JSON, no fetch).
- ~5 student records for the demo.
- Photos sourced as local image files (e.g. `/images/student1.jpg`), referenced by path in each object.

**Student object shape (4 fields, kept minimal):**

| Field | Type | Example |
|---|---|---|
| `name` | string | `"Jordan Lee"` |
| `photo` | string (file path) | `"images/jordan.jpg"` |
| `title` | string | `"BiteBack: Food Waste Tracker"` |
| `description` | string | `"An app that helps restaurants track and reduce food waste."` |

No `id` field — the array index itself (0-4) doubles as the identifier for the loop/wraparound logic, keeping the object shape as lean as possible. No alt-text field for now (noted as a possible future accessibility enhancement, not core to this lesson).

**Description length:** target ~2 sentences (roughly 30-40 words) per student, kept consistent across all 5 records to help card height stay uniform when rotating between students.

## Design Decisions
- Keep scope small and inspectable — beginners should be able to read the whole codebase and trace how it works.
- No frameworks — plain HTML/CSS/JS only.
- Data structure choice (hardcoded array vs. JSON fetch) deliberately favors simplicity over "realism," since the teaching goal is array/object fundamentals, not data fetching.
- Mobile-friendly, consistent design — one responsive layout that adapts across screen sizes rather than separate desktop/mobile designs. Reinforces good habits (responsive CSS) as a secondary teaching point.
- Single "Next" button with continuous wraparound loop, plus a position indicator ("3 of 5" or dots) — chosen for simplicity over a "Previous" button or end-state screen.
- Description length target: ~2 sentences (30-40 words), with CSS truncation (`line-clamp`) as a safety net in case any description runs long — a small, useful bit of defensive CSS to show students.
- Visual style: professional/polished tone, light mode only, tied to the bootcamp's branding (navy + gold), system fonts (no external font loading), no logo in header (text-only).

**Color palette (suggested navy/gold pair, pending confirmation against exact school brand hex codes):**

| Color | Hex | Usage |
|---|---|---|
| Navy | `#0B2545` | Header, navigation, buttons, large background sections (dominant color) |
| Gold | `#C9A227` | Calls-to-action ("Next" button), highlights, icons (accent color) |
| White | `#FFFFFF` | Background, for readability and contrast |

**Contrast/usage rules:**
- White text on navy background — 13.6:1 contrast, passes WCAG AA/AAA for all text sizes.
- Navy text on gold background — 7.9:1 contrast, passes WCAG AA for normal text. Gold buttons must use dark (navy) text, not white — white text on gold fails accessibility contrast standards.
- If the exact school brand hex codes differ from this suggested pair, the "dark text on gold, light text on navy" contrast rule still applies regardless of the specific shades used.

## User Flows

**User stories:**
- As a student, I see the class/event header immediately on load, so I know what I'm looking at.
- As a student, I see one classmate's project at a time (photo, name, project title, description), so the content isn't overwhelming.
- As a student, I click "Next" to advance to the next classmate's project, so I can browse everyone's work in sequence.
- As a student, I see a position indicator (e.g. "3 of 5" or dots), so I always know how many profiles exist and where I am.
- As a student, when I click "Next" on the last profile, it loops back to the first, so browsing feels continuous with no dead end.
- As a student on any device, the layout adapts and stays usable and visually consistent, so the demo works the same whether projected, on a laptop, or on a phone.

**Step-by-step flow:**
1. Page loads → header section renders → student section shows Student 1, indicator shows "1 of 5".
2. Student clicks "Next" → Student 2 renders, indicator updates to "2 of 5".
3. Repeat through Student 5 ("5 of 5").
4. Student clicks "Next" again → wraps back to Student 1 ("1 of 5"), loop continues indefinitely.

**Interaction scope (confirmed):**
- One "Next" button only — no "Previous" button (keeps the DOM/event logic simple for teaching).
- Continuous loop/wraparound at the end of the list.
- Position indicator shown (counter or dots — visual treatment TBD in wireframe step).

## Current Development Status
- Planning stage — Problem Brief completed. No code written yet.

## Known Issues
- None yet (pre-development).

## Decisions Made with AI
- Confirmed target user: current bootcamp students, as a live teaching demo (not for prospective students/employers).
- Confirmed primary goal: teach arrays of objects + looping, secondary goal: DOM manipulation/events.
- Confirmed data approach: hardcoded JS array, not JSON/fetch, to keep focus on fundamentals.
- Confirmed demo scope: ~5 student profiles.
- Confirmed interaction model: single "Next" button only, continuous wraparound loop, position indicator shown ("3 of 5" or dots).
- Confirmed design requirement: mobile-friendly, one consistent responsive layout (not separate mobile/desktop designs).
- Confirmed system architecture: 5 pieces (data, state, render function, event handling, styling) forming a single loop — data/state feed render, render updates DOM, click updates state and re-triggers render.
- Confirmed state lives as a plain top-level JS variable (not in the DOM), and one render function is reused for both initial load and every "Next" click.
- Confirmed data model: minimal 4-field student object (`name`, `photo`, `title`, `description`), no separate `id` field, no alt-text field, photos as local image files.
- Confirmed wireframe/layout: single stacked layout, consistent across screen sizes (no separate mobile/desktop designs — see Wireframe below).
- Confirmed description length: ~2 sentences (30-40 words) per student, with CSS `line-clamp` truncation as a safety net for consistent card height.
- Confirmed concept-to-code map and a 7-step suggested teaching order, moving from static HTML/CSS through data, rendering, events, and interactivity (see Architecture section).
- Confirmed visual style direction: professional/polished, light mode only, system fonts, no logo — tied to bootcamp branding (navy + gold), with a suggested hex pair (`#0B2545` navy / `#C9A227` gold) pending the school's exact brand codes, plus contrast rules for text on each color.

## Wireframe / Layout
Single-column, mobile-first layout. Same stacked structure on all screen sizes — a wider viewport just gives it more breathing room in a centered, max-width container, rather than switching to a side-by-side design.

```
┌─────────────────────────────┐
│  Class name / Shark Tank     │  ← header banner
│  Presentations                │    (full-width, visually
│  [ event description ]        │     separate from card below)
└─────────────────────────────┘

┌─────────────────────────────┐
│  ┌───────────────────────┐  │
│  │                        │  │
│  │   [ student photo ]    │  │  ← photo on top
│  │                        │  │
│  └───────────────────────┘  │
│                                │
│        [ student name ]       │
│        [ project title ]      │
│                                │
│   [ description line 1 ]      │
│   [ description line 2 ]      │
│   [ description line 3 ]      │
│                                │
│            3 of 5             │  ← position indicator
│                                │
│   ┌────────────────────┐     │
│   │        Next ↻       │     │  ← wraps to student 1
│   └────────────────────┘     │
└─────────────────────────────┘
```

**Layout order (top to bottom):** header banner → photo → name → project title → description → position indicator ("3 of 5") → Next button.

## Next Steps
Planning is complete. Ready to move into development, following the suggested teaching order in Architecture:
1. Build static HTML skeleton (header + one hardcoded student card).
2. Style with CSS (flexbox/grid, mobile-first).
3. Add the student data array and wire up the render function.
4. Add the "Next" button event listener, state update, and wraparound math.
5. Polish CSS (line-clamp, spacing, indicator styling) and test across screen sizes.

## How This Plan Was Built (AI-Assisted Planning Walkthrough)
_For students: this is the path the instructor and AI took to go from a rough idea to a build-ready plan — before writing a single line of code. The order matters as much as the content._

- **Started with the problem, not the solution.** Before any code or layout, the AI asked who this was for and why it mattered — surfacing that there were actually *two* audiences (students watching vs. students clicking through it themselves), which shaped every decision after.
- **Defined the user's experience next.** Interaction details (one "Next" button vs. two, wraparound vs. a dead end, whether to show a position indicator) were nailed down *before* touching data or code — because how a user experiences the app determines what the code needs to do, not the other way around.
- **Discussed system architecture before writing anything.** The app was broken into 5 cooperating pieces (data, state, render function, event handling, styling) and diagrammed as a loop. This step exists so the *shape* of the code is understood before any file gets created.
- **Only then defined the data model.** The student object's exact fields (`name`, `photo`, `title`, `description`) were decided *after* architecture — because the render function and event logic already made clear what data needed to exist and how it would be used.
- **Sketched a wireframe before styling decisions got specific.** A low-fidelity layout (header banner, stacked card, indicator, button) was agreed on so CSS work later has a clear visual target instead of guessing.
- **Refined a small but real detail: description length.** A concrete word-count target (~30-40 words) plus a CSS safety net (`line-clamp`) was decided — a reminder that even "final polish" choices are easier to make once everything upstream is settled.
- **Ended by mapping code back to concepts.** The last step tied every piece of the architecture to the specific JS/CSS concept it teaches, turning the plan into a ready-made lesson sequence.

**The takeaway for students:** good planning moves from *problem → user → behavior → system design → data → visuals → polish*. Skipping ahead to code before these are settled usually means redoing work later. AI can be a useful thinking partner for this process — asking clarifying questions, sketching diagrams, and keeping a running document — but the judgment calls (what matters, what to simplify, what to skip) still come from the person building it.
