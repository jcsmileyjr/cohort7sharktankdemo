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
    name: "Shakenya Jenkins",
    photo: "images/shay-personal.png",
    title: "Second Act Studios",
    description:
      "A nonprofit organization designed to assist justice-impacted individuals by pairing documentary film production with technical training, wraparound support, and direct employer placement"
  },
  {
    name: "James Evely",
    photo: "images/student2.jpg",
    title: "Stockflow",
    description:
      "A Nashville-based service designed to help small business owners manage inventory and streamline daily operations."
  },
  {
    name: "Camiah Gillie",
    photo: "images/student3.jpg",
    title: "Virtual Assistant",
    description:
      "A virtual assistant business, focusing on providing reliable support to solo entrepreneurs and small business owners with one to five employees."
  },
  {
    name: "Marcus Johnson",
    photo: "images/student4.jpg",
    title: "TrailMate: Local Hiking Guide",
    description:
      "A directory of nearby hiking trails with difficulty ratings, trail conditions, and photos submitted by other hikers. Marcus started it to help newcomers find trails that match their skill level."
  },
  {
    name: "Carlos Seaborn",
    photo: "images/carlos-personal.png",
    title: "Memorable",
    description:
      "High‑value concept in early development. The core idea is intentionally withheld to protect future startup potential."
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
