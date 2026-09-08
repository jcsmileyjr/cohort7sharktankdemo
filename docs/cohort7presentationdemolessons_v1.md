# Cohort 7 — Presentation Demo Lessons (v1)

_4-day curriculum guide for the Shark Tank Showcase teaching demo._

## Day 1 — Vision & Planning
- How human direction + AI assistance worked together in the planning stage
- Walk through the Project Brief build: problem → user → architecture → data (in that order, and why)
- The meta-lesson: getting AI to ask clarifying questions instead of accepting "build an app"
- Demo the finished app — static view only, one student card, no clicking "Next" yet
- Set expectation: "this is where we're headed over the next 3 days"

## Day 2 — Design Theory & Data
- Visual design decisions: navy/gold palette, contrast rules (dark text on gold, light text on navy)
- Mobile-first, single-layout responsive thinking (why one layout beats separate mobile/desktop designs)
- The data model: array of student objects, 4 fields (name, photo, title, description)
- Move through multiple students' data/images — build static HTML/CSS around real array values
- Touch on description-length consistency and the line-clamp safety net

## Day 3 — JavaScript & State Management
- State: the currentIndex variable, what "state" means and why it lives outside the DOM
- The render function: one reusable function reading data + state, writing to the DOM
- Event listener: connecting the "Next" button click to logic
- Wraparound math: the modulo operator, looping instead of erroring past the array
- Accessibility check-in: alt text built from name + title in the render function

## Day 4 — Reflection
- Trace the full arc: planning → design → data → logic → finished app
- Concept-to-code review: map every concept taught back to the line of code that used it
- Discuss: what would change if requirements changed (more students, previous button, etc.)
- Open discussion: how AI-assisted planning shaped decisions along the way
