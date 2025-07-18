// Toggle About Text
function toggleAboutText() {
  const moreText = document.getElementById("more-text");
  const btn = document.getElementById("see-more-btn");

  if (moreText.classList.contains("visible")) {
    moreText.classList.remove("visible");
    btn.textContent = "See More";
  } else {
    moreText.classList.add("visible");
    btn.textContent = "See Less";
  }
}

// Create Floating Particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Intersection Observer for Fade-In Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Typewriter Effect for Heading and Subheading
function typeWriter(element, text, speed, callback) {
  let i = 0;
  element.classList.add('typewriter-cursor');
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      element.classList.remove('typewriter-cursor');
      if (callback) callback();
    }
  }
  type();
}

window.addEventListener('load', () => {
  const heading = document.getElementById('animated-heading');
  const subheading = document.getElementById('animated-subheading');
  heading.textContent = '';
  subheading.textContent = '';
  typeWriter(heading, "Sandun Tharaka Perera", 100, () => {
    typeWriter(subheading, "Software Engineer", 100);
  });
  createParticles();
});

// Mouse Movement Parallax Effect for Particles
document.addEventListener('mousemove', (e) => {
  const particles = document.querySelectorAll('.particle');
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  particles.forEach((particle, index) => {
    const speed = (index % 5 + 1) * 0.5;
    const xPos = (x - 0.5) * speed;
    const yPos = (y - 0.5) * speed;
    particle.style.transform = `translate(${xPos}px, ${yPos}px)`;
  });
});

// Contact Form Submission (Basic Example)
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Placeholder for form submission logic (e.g., API call)
  console.log('Form submitted:', { name, email, subject, message });
  alert('Message sent! (This is a placeholder - actual submission requires a backend.)');
  document.getElementById('contactForm').reset();
});