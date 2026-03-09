/* ============================================================
   SANDUN PERERA PORTFOLIO — script.js
   ============================================================ */

(function () {
  'use strict';

  /* ── Custom Cursor ── */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursor) {
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    }
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    if (follower) {
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
    }
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    if (cursor)   cursor.style.opacity = '0';
    if (follower) follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (cursor)   cursor.style.opacity = '1';
    if (follower) follower.style.opacity = '1';
  });

  /* ── Navbar Scroll ── */
  const navbar = document.getElementById('navbar');
  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  /* ── Active Nav Link on Scroll ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const sectionTop    = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId     = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ── Mobile Menu Toggle ── */
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNav  = document.getElementById('mobileNav');

  if (mobileMenu && mobileNav) {
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });
    // Close on link click
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileMenu.classList.remove('open');
        mobileNav.classList.remove('open');
      }
    });
  }

  /* ── Typed Text Effect ── */
  const typedEl = document.getElementById('typed-text');
  const words   = ['Engineer', 'Developer', 'Architect', 'Problem Solver'];
  let  wordIdx  = 0;
  let  charIdx  = 0;
  let  isDeleting = false;
  let  typingTimeout;

  function type() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
    } else {
      typedEl.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 80 : 120;

    if (!isDeleting && charIdx === currentWord.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      speed = 400;
    }
    typingTimeout = setTimeout(type, speed);
  }
  if (typedEl) type();

  /* ── Scroll Reveal ── */
  const revealElements  = document.querySelectorAll('.reveal');
  const revealChildren  = document.querySelectorAll('.reveal-child');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Also trigger children inside this section
          entry.target.querySelectorAll('.reveal-child').forEach((child, i) => {
            setTimeout(() => child.classList.add('visible'), i * 100);
          });
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  const childObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
  revealChildren.forEach((el) => childObserver.observe(el));

  /* ── About See More Toggle ── */
  window.toggleAboutText = function () {
    const moreText = document.getElementById('more-text');
    const btn      = document.getElementById('see-more-btn');
    if (!moreText || !btn) return;

    moreText.classList.toggle('hidden');
    const isHidden = moreText.classList.contains('hidden');
    btn.innerHTML = isHidden
      ? '<span>See More</span> <i class="fas fa-chevron-down"></i>'
      : '<span>See Less</span> <i class="fas fa-chevron-up"></i>';
  };

  /* ── Project Filter ── */
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          // Re-trigger reveal
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ── Contact Form ── */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = contactForm.querySelector('.submit-btn');
      const originalHTML = btn.innerHTML;

      // Loading state
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      // Simulate form submission (replace with actual endpoint or EmailJS)
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        contactForm.reset();

        if (formSuccess) {
          formSuccess.classList.add('show');
          setTimeout(() => formSuccess.classList.remove('show'), 5000);
        }
      }, 1800);
    });
  }

  /* ── Smooth Scroll for all anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href   = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = 72;
        const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Skill Item Hover Micro-interaction ── */
  document.querySelectorAll('.skill-item').forEach((item) => {
    item.addEventListener('mouseenter', function () {
      this.style.paddingLeft = '10px';
    });
    item.addEventListener('mouseleave', function () {
      this.style.paddingLeft = '';
    });
  });

  /* ── Image Error Fallback ── */
  document.querySelectorAll('img').forEach((img) => {
    img.addEventListener('error', function () {
      this.style.display = 'none';
      const fallback = document.createElement('div');
      fallback.style.cssText = `
        width: 100%; height: 100%;
        background: linear-gradient(135deg, #111827, #1a2234);
        display: flex; align-items: center; justify-content: center;
        color: #4a5568; font-size: 2rem;
      `;
      fallback.innerHTML = '<i class="fas fa-code"></i>';
      this.parentNode.insertBefore(fallback, this);
    });
  });

  /* ── Tilt effect on exp cards ── */
  function addTiltEffect(selector) {
    document.querySelectorAll(selector).forEach((card) => {
      card.addEventListener('mousemove', function (e) {
        const rect    = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX  = (e.clientX - centerX) / (rect.width / 2);
        const deltaY  = (e.clientY - centerY) / (rect.height / 2);
        const rotateX = deltaY * -4;
        const rotateY = deltaX * 4;
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', function () {
        this.style.transform = '';
      });
    });
  }
  addTiltEffect('.project-card');
  addTiltEffect('.edu-card');

  /* ── Timeline dot activation on scroll ── */
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const dot = entry.target.querySelector('.timeline-dot');
          if (dot) {
            setTimeout(() => {
              dot.style.transform = 'scale(1.3)';
              setTimeout(() => { dot.style.transform = ''; }, 300);
            }, 200);
          }
        }
      });
    },
    { threshold: 0.2 }
  );
  timelineItems.forEach((item) => timelineObserver.observe(item));

  /* ── Counter Animation for hero stats ── */
  function animateCounter(el, target, duration = 1500) {
    let start     = 0;
    const step    = target / (duration / 16);
    const timer   = setInterval(() => {
      start += step;
      if (start >= target) {
        el.textContent = target + '+';
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(start) + '+';
      }
    }, 16);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.stat-num').forEach((num) => {
            const raw = parseInt(num.textContent);
            if (!isNaN(raw)) animateCounter(num, raw);
          });
          statsObserver.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);

  /* ── Page Load Progress ── */
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });

  /* ── Keyboard navigation support ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      mobileNav.classList.remove('open');
    }
  });

})();