/* ═══════════════════════════════════════════
   NRG DAIRY PRODUCTS — Main JavaScript
   Lightweight vanilla JS for interactions
   ═══════════════════════════════════════════ */

(function () {
    'use strict';

    // ── DOM Elements ──
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const reveals = document.querySelectorAll('.reveal');

    // ── Create mobile nav overlay ──
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // ═══════════════════════════════════════════
    // 1. NAVBAR — Glassmorphism on scroll
    // ═══════════════════════════════════════════
    let lastScroll = 0;

    function handleNavScroll() {
        const scrollY = window.scrollY;

        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = scrollY;
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll(); // Run on load

    // ═══════════════════════════════════════════
    // 2. HAMBURGER MENU — Mobile toggle
    // ═══════════════════════════════════════════
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
        overlay.classList.toggle('show');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);

    // ═══════════════════════════════════════════
    // 3. SMOOTH SCROLL — Nav link click
    // ═══════════════════════════════════════════
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);

            if (targetEl) {
                const offset = navbar.offsetHeight + 10;
                const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }

            // Update active state
            navLinks.forEach(function (l) { l.classList.remove('active'); });
            this.classList.add('active');

            // Close mobile menu
            closeMobileMenu();
        });
    });

    // ═══════════════════════════════════════════
    // 4. ACTIVE NAV LINK — Highlight on scroll
    // ═══════════════════════════════════════════
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollY = window.scrollY + 200;

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

    // ═══════════════════════════════════════════
    // 5. SCROLL REVEAL — IntersectionObserver
    // ═══════════════════════════════════════════
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target); // Animate once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: show everything immediately
        reveals.forEach(function (el) {
            el.classList.add('active');
        });
    }

    // ═══════════════════════════════════════════
    // 6. CONTACT FORM — Validate & feedback
    // ═══════════════════════════════════════════
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !phone || !message) {
                return;
            }

            // Show success
            formSuccess.classList.add('show');

            // Reset form
            contactForm.reset();

            // Hide success after 5s
            setTimeout(function () {
                formSuccess.classList.remove('show');
            }, 5000);
        });
    }

    // ═══════════════════════════════════════════
    // 7. PERFORMANCE — Lazy background loading
    // ═══════════════════════════════════════════
    // Images already use loading="lazy" attribute in HTML.
    // This section is reserved for future dynamic loading if needed.

})();
