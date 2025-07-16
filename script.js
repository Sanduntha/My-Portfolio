// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initAnimations();
    
    // Setup navigation
    setupNavigation();
    
    // Setup scrolling effects
    setupScrolling();
    
    // Setup skill animations
    setupSkillAnimations();
    
    // Setup form submission
    setupContactForm();
  });
  
  // Initialize animations with delay
  function initAnimations() {
    const fadeElements = document.querySelectorAll('.hero-text h1, .hero-text h2, .hero-text p, .hero-buttons');
    
    fadeElements.forEach((element, index) => {
      element.classList.add('fade-in');
      element.classList.add(`delay-${index + 1}`);
    });
  }
  
  // Setup mobile navigation and scroll effects
  function setupNavigation() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('#navbar');
    
    // Toggle navigation menu
    burger.addEventListener('click', () => {
      // Toggle nav
      nav.classList.toggle('nav-active');
      
      // Animate links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
        link.classList.toggle('fade');
      });
      
      // Burger animation
      burger.classList.toggle('toggle');
    });
    
    // Close menu when clicking a nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
        navLinks.forEach(l => {
          l.style.animation = '';
          l.classList.remove('fade');
        });
      });
    });
    
    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // Setup scrolling effects and active nav links
  function setupScrolling() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
  
  // Setup skill bar animations when in viewport
  function setupSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Initial state (width: 0)
    skillBars.forEach(bar => {
      bar.style.width = '0';
    });
    
    // Animate when in viewport
    function animateSkills() {
      const skillsSection = document.getElementById('skills');
      const sectionPosition = skillsSection.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if (sectionPosition < screenPosition) {
        skillBars.forEach(bar => {
          const width = bar.getAttribute('style').split(':')[1];
          if (width === '0px' || width === ' 0px') {
            bar.style.width = bar.parentElement.getAttribute('style').split(':')[1];
          }
        });
        window.removeEventListener('scroll', animateSkills);
      }
    }
    
    window.addEventListener('scroll', animateSkills);
    // Also run once on load in case the skills section is already in view
    animateSkills();
  }
  
  // Setup contact form submission
  function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the data to a server
        // For this example, we'll just show an alert
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
        
        // Reset the form
        contactForm.reset();
      });
    }
  }
  
  // Typewriter effect for the hero section
  class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      // Current index of word
      const current = this.wordIndex % this.words.length;
      // Get full text of current word
      const fullTxt = this.words[current];
  
      // Check if deleting
      if (this.isDeleting) {
        // Remove char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        // Add char
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      // Insert txt into element
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      // Initial Type Speed
      let typeSpeed = 100;
  
      if (this.isDeleting) {
        typeSpeed /= 2;
      }
  
      // If word is complete
      if (!this.isDeleting && this.txt === fullTxt) {
        // Make pause at end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  // Init On DOM Load
  document.addEventListener('DOMContentLoaded', init);
  
  // Init App
  function init() {
    const txtElement = document.querySelector('.txt-type');
    
    if (txtElement) {
      const words = JSON.parse(txtElement.getAttribute('data-words'));
      const wait = txtElement.getAttribute('data-wait');
      // Init TypeWriter
      new TypeWriter(txtElement, words, wait);
    }
  }