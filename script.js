/*
  =========================================================================
  1. DATA LAYER
  Concept: arrays of objects, key-value data.
  A hardcoded array of student objects is our "database" for this demo.
  Each object has exactly 4 fields: name, photo, title, description.
  =========================================================================
*/
const students = [
  {
    name: "Maya Chen",
    photo: "images/student1.jpg",
    title: "BiteBack: Food Waste Tracker",
    description:
      "A mobile app that helps restaurants log unsold food and suggests same-day donation pickups nearby. Maya built it after watching her family's diner throw away trays of food every night."
  },
  {
    name: "Jordan Lee",
    photo: "images/student2.jpg",
    title: "StudyLoop: Flashcard Scheduler",
    description:
      "A web app that schedules flashcard reviews using spaced repetition, so students spend less time cramming. Jordan designed it to fit around a full-time class schedule and a part-time job."
  },
  {
    name: "Priya Patel",
    photo: "images/student3.jpg",
    title: "CoinWise: Student Budget Coach",
    description:
      "A budgeting tool built for students living on a tight monthly allowance, with reminders before bills are due. Priya wanted something simpler than the finance apps she'd tried before."
  },
  {
    name: "Marcus Johnson",
    photo: "images/student4.jpg",
    title: "TrailMate: Local Hiking Guide",
    description:
      "A directory of nearby hiking trails with difficulty ratings, trail conditions, and photos submitted by other hikers. Marcus started it to help newcomers find trails that match their skill level."
  },
  {
    name: "Sofia Ramirez",
    photo: "images/student5.jpg",
    title: "PetPal: Neighborhood Pet Sitting",
    description:
      "A scheduling app that connects pet owners with trusted neighborhood sitters for short trips. Sofia built it after struggling to find a sitter for her dog during a busy finals week."
  }
];

/*
  =========================================================================
  2. STATE
  Concept: variables, primitive state.
  currentIndex is the single source of truth for "which student is showing
  right now." It lives here as a plain variable, not in the DOM, so it's
  easy to find and trace.
  =========================================================================
*/
let currentIndex = 0;

/*
  =========================================================================
  3. RENDER FUNCTION
  Concept: functions, DOM selection & manipulation.
  Reads the current student (data + state) and writes it into the page.
  This exact function runs on page load AND on every "Next" click -
  there is no separate/duplicated logic for either case.
  =========================================================================
*/
function renderStudent() {
  const student = students[currentIndex];

  const photoElement = document.querySelector("#student-photo");
  const nameElement = document.querySelector("#student-name");
  const titleElement = document.querySelector("#student-title");
  const descriptionElement = document.querySelector("#student-description");
  const indicatorElement = document.querySelector("#position-indicator");

  photoElement.src = student.photo;
  // alt text is built here from name + title, since the data model
  // intentionally has no stored alt field
  photoElement.alt = `${student.name} — ${student.title}`;

  nameElement.textContent = student.name;
  titleElement.textContent = student.title;
  descriptionElement.textContent = student.description;
  indicatorElement.textContent = `${currentIndex + 1} of ${students.length}`;
}

/*
  =========================================================================
  4. EVENT HANDLING
  Concept: event listeners, the modulo operator.
  Clicking "Next" advances currentIndex, wrapping back to 0 after the
  last student, then re-renders the page using the same render function.

  The fade is pure CSS (see the .fade-out rule in style.css) - this
  handler just toggles that class before and after the state/render
  update so the swap doesn't feel instant.
  =========================================================================
*/
const nextButton = document.querySelector("#next-button");
const studentCard = document.querySelector(".student-card");
const FADE_DURATION_MS = 200;

nextButton.addEventListener("click", () => {
  studentCard.classList.add("fade-out");

  setTimeout(() => {
    currentIndex = (currentIndex + 1) % students.length;
    renderStudent();
    studentCard.classList.remove("fade-out");
  }, FADE_DURATION_MS);
});

// Initial render on page load - same function used for every click above
renderStudent();
