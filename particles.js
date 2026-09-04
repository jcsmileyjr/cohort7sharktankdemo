/*
  =========================================================================
  DECORATIVE PARTICLE BACKGROUND
  This file is a bonus visual effect, kept separate from script.js on
  purpose - it is NOT one of the 5 core architecture pieces (data, state,
  render, event handling, styling) that the lesson is built around.
  It just draws slow-drifting navy/gold dots on a full-screen <canvas>
  that sits behind the page content.
  =========================================================================
*/

const canvas = document.querySelector("#particle-background");
const context = canvas.getContext("2d");

const PARTICLE_COUNT = 60;
const PARTICLE_COLORS = ["#0b2545", "#c9a227"];

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.documentElement.scrollHeight;
}

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    speedY: Math.random() * 0.3 + 0.08,
    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    opacity: Math.random() * 0.35 + 0.08
  };
}

function createParticles() {
  particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(createParticle());
  }
}

function drawParticles() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.y -= particle.speedY;

    // once a particle drifts off the top, recycle it back in at the bottom
    if (particle.y < -10) {
      particle.y = canvas.height + 10;
      particle.x = Math.random() * canvas.width;
    }

    context.beginPath();
    context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    context.fillStyle = particle.color;
    context.globalAlpha = particle.opacity;
    context.fill();
  });

  context.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}

resizeCanvas();
createParticles();
drawParticles();

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});
