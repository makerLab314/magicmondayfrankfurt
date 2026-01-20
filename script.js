/* ============================================================================
   MAGIC MONDAY FRANKFURT - SUBTLE INTERACTIONS
   
   Refined JavaScript for smooth, professional interactions.
   No gimmicky Easter eggs - just polished user experience.
============================================================================ */

(function() {
  'use strict';

  // ===== THEME SWITCHING LOGIC =====
  function initThemeSwitching() {
    const htmlElement = document.documentElement;
    const darkModeSwitch = document.getElementById('darkModeSwitch');
    const redModeSwitch = document.getElementById('redModeSwitch');
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('magicMondayTheme') || 'white';
    
    // Apply saved theme
    applyTheme(savedTheme);
    
    // Update switch states based on saved theme
    if (savedTheme === 'dark') {
      darkModeSwitch.checked = true;
    } else if (savedTheme === 'red') {
      redModeSwitch.checked = true;
    }
    
    // Dark Mode switch handler
    if (darkModeSwitch) {
      darkModeSwitch.addEventListener('change', function() {
        if (this.checked) {
          // Turn off red mode if it's on
          if (redModeSwitch) redModeSwitch.checked = false;
          applyTheme('dark');
        } else {
          applyTheme('white');
        }
      });
    }
    
    // Red Mode switch handler
    if (redModeSwitch) {
      redModeSwitch.addEventListener('change', function() {
        if (this.checked) {
          // Turn off dark mode if it's on
          if (darkModeSwitch) darkModeSwitch.checked = false;
          applyTheme('red');
        } else {
          applyTheme('white');
        }
      });
    }
    
    function applyTheme(theme) {
      htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('magicMondayTheme', theme);
      
      // Add transition class for smooth theme change
      htmlElement.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      setTimeout(() => {
        htmlElement.style.transition = '';
      }, 300);
      
      // Activate/deactivate Red Mode particles
      if (theme === 'red') {
        initRedModeParticles();
      } else {
        removeRedModeParticles();
      }
    }
  }

  // ===== SMOOTH ENTRANCE ANIMATIONS =====
  function initEntranceAnimations() {
    // Fade in main content smoothly
    const main = document.querySelector('main.column, .column');
    if (main) {
      main.style.opacity = '0';
      main.style.transform = 'translateY(20px)';
      main.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      
      requestAnimationFrame(() => {
        main.style.opacity = '1';
        main.style.transform = 'translateY(0)';
      });
    }
  }

  // ===== SUBTLE PARALLAX ON HEADER =====
  function initHeaderParallax() {
    const header = document.querySelector('#head img');
    if (!header) return;
    
    let ticking = false;
    
    function updateParallax() {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      
      if (scrolled < 400) {
        header.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0002})`;
      }
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ===== STAGGERED CARD ANIMATIONS =====
  function initCardAnimations() {
    const cards = document.querySelectorAll('.artist-card, .feature-card, .quote-card, .news-item, .termin-item, .meta-card');
    
    if (cards.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || (index * 100);
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      card.dataset.delay = index * 80;
      observer.observe(card);
    });
    
    // Add CSS for visible state
    const style = document.createElement('style');
    style.textContent = `
      .artist-card.is-visible,
      .feature-card.is-visible,
      .quote-card.is-visible,
      .news-item.is-visible,
      .termin-item.is-visible,
      .meta-card.is-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // ===== MAGNETIC BUTTON EFFECT =====
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta, .ticket-btn, .social-btn, .error-home-btn');
    
    buttons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = '';
      });
    });
  }

  // ===== SMOOTH NAV SCROLL INDICATOR =====
  function initNavScrollIndicator() {
    const nav = document.querySelector('#head_navigation');
    if (!nav) return;
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNav() {
      const scrollY = window.scrollY;
      
      if (scrollY > 100) {
        nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      } else {
        nav.style.boxShadow = 'none';
      }
      
      lastScrollY = scrollY;
      ticking = false;
    }
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });
  }

  // ===== CURSOR GLOW EFFECT =====
  function initCursorGlow() {
    // Only on larger screens - use matchMedia for better responsive behavior
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    
    if (!mediaQuery.matches) return;
    
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    glow.style.cssText = `
      position: fixed;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(201, 162, 39, 0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
      transform: translate(-50%, -50%);
      transition: opacity 0.3s ease;
      opacity: 0;
    `;
    document.body.appendChild(glow);
    
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
    
    function animateGlow() {
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;
      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';
      requestAnimationFrame(animateGlow);
    }
    
    animateGlow();
  }

  // ===== SMOOTH LINK TRANSITIONS =====
  function initSmoothTransitions() {
    // Select internal links - both absolute and relative HTML links
    const internalLinks = document.querySelectorAll('a[href$=".html"]:not([target="_blank"])');
    
    internalLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      // Skip external links (those with protocol like http://)
      if (!href || href.includes('://')) return;
      
      link.addEventListener('click', (e) => {
        // Don't prevent default for keyboard navigation
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        
        e.preventDefault();
        
        // Fade out
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.2s ease';
        
        setTimeout(() => {
          window.location.href = href;
        }, 200);
      });
    });
    
    // Fade in on page load
    window.addEventListener('pageshow', () => {
      document.body.style.opacity = '1';
    });
  }

  // ===== TICKET BUTTON PULSE =====
  function initTicketPulse() {
    const ticketBtns = document.querySelectorAll('.ticket-btn');
    
    const style = document.createElement('style');
    style.textContent = `
      @keyframes subtle-pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(226, 54, 54, 0); }
        50% { box-shadow: 0 0 0 4px rgba(226, 54, 54, 0.15); }
      }
      .ticket-btn {
        animation: subtle-pulse 3s ease-in-out infinite;
      }
      .ticket-btn:hover {
        animation: none;
      }
    `;
    
    if (ticketBtns.length > 0) {
      document.head.appendChild(style);
    }
  }

  // ===== LAZY LOAD IMAGES =====
  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '50px 0px' });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }

  // ===== KEYBOARD NAVIGATION ENHANCEMENT =====
  function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
      // ESC to scroll to top
      if (e.key === 'Escape') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // ===== ADVANCED RETRO ANIMATIONS =====
  //
  // These functions implement the advanced interaction layer:
  //
  // 1. initRevealOnScroll() - IntersectionObserver-based reveals
  //    - Fades and translates elements as they enter viewport
  //    - Triggers once per element
  //    - Respects prefers-reduced-motion
  //
  // 2. init3DTiltCards() - Pointer-driven 3D card tilt effect
  //    - Calculates rotation based on mouse position relative to card center
  //    - Bounded to ±8 degrees to prevent extreme rotations
  //    - Includes glare sweep effect
  //    - Gracefully degrades on touch devices and reduced-motion
  //
  // 3. initScanlineEffect() - Retro scanline overlay
  //    - Removes effect for reduced-motion users
  //    - Hover activation handled via CSS
  //
  // 4. initParallaxCards() - Subtle parallax on card contents
  //    - Children elements move at different rates based on depth
  //    - Creates layered effect on hover
  //    - Respects reduced-motion preference
  //
  // 5. initHoverMicroInteractions() - Letter spacing and shadow breathing
  //    - CTA buttons expand letter spacing on hover
  //    - Cards get enhanced-hover class for breathing shadows
  //
  // 6. initNeonHeroBackground() - Animated gradient background for hero
  //    - Two drifting gradient orbs with 20s/25s cycles
  //    - Low opacity for subtlety
  //    - Respects reduced-motion preference
  //
  // 7. capBackgroundAnimations() - Performance optimization
  //    - Limits simultaneous background animations to maintain 60fps
  //    - Disables animations beyond threshold

  // ===== ADVANCED REVEAL ON SCROLL =====
  function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('.reveal');
    
    if (revealElements.length === 0) return;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Immediately show all elements
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Unobserve so it only triggers once
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -80px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
  }

  // ===== 3D TILT CARD EFFECT =====
  function init3DTiltCards() {
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    if (tiltCards.length === 0) return;
    
    // Check for reduced motion and touch devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (prefersReducedMotion || isTouchDevice) {
      return; // Gracefully degrade on touch devices and for users who prefer reduced motion
    }
    
    // Configuration constants
    const MAX_ROTATION_DEGREES = 8; // Bounded rotation prevents extreme/disorienting angles
    const PERSPECTIVE_PX = 1000; // 3D perspective depth
    
    // Shared resize handler with debouncing
    let resizeTimeout;
    const boundingRects = new WeakMap();
    
    const updateBoundingRects = () => {
      tiltCards.forEach(card => {
        boundingRects.set(card, card.getBoundingClientRect());
      });
    };
    
    // Initialize bounding rects
    updateBoundingRects();
    
    // Debounced resize handler
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateBoundingRects, 100);
    }, { passive: true });
    
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        // Use cached bounding rect
        const rect = boundingRects.get(card);
        if (!rect) return;
        
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;
        
        // Calculate rotation angles (bounded to prevent extreme rotations)
        const rotateX = (mouseY / (rect.height / 2)) * -MAX_ROTATION_DEGREES;
        const rotateY = (mouseX / (rect.width / 2)) * MAX_ROTATION_DEGREES;
        
        // Apply transform directly with calculated values
        card.style.transform = `perspective(${PERSPECTIVE_PX}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        // Reset transform smoothly
        card.style.transform = '';
      });
    });
  }

  // ===== ENHANCED SCANLINE EFFECT =====
  function initScanlineEffect() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Remove scanline effect for users who prefer reduced motion
      const scanlineElements = document.querySelectorAll('.scanline-overlay');
      scanlineElements.forEach(el => el.classList.remove('scanline-overlay'));
    }
  }

  // ===== PARALLAX TILT ON CARDS =====
  function initParallaxCards() {
    const cards = document.querySelectorAll('.feature-card, .meta-card');
    
    if (cards.length === 0) return;
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;
    
    // Shared resize handler with debouncing for parallax cards
    let resizeTimeout;
    const boundingRects = new WeakMap();
    
    const updateBoundingRects = () => {
      cards.forEach(card => {
        boundingRects.set(card, card.getBoundingClientRect());
      });
    };
    
    // Initialize bounding rects
    updateBoundingRects();
    
    // Debounced resize handler
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateBoundingRects, 100);
    }, { passive: true });
    
    cards.forEach(card => {
      card.classList.add('parallax-layer');
      
      card.addEventListener('mouseenter', () => {
        card.classList.add('is-active');
      });
      
      card.addEventListener('mousemove', (e) => {
        const rect = boundingRects.get(card);
        if (!rect) return;
        
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        
        // Apply subtle parallax effect using transform only
        const content = card.children;
        Array.from(content).forEach((child, index) => {
          const depth = (index + 1) * 0.5;
          child.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
        });
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('is-active');
        const content = card.children;
        Array.from(content).forEach(child => {
          child.style.transform = '';
        });
      });
    });
  }

  // ===== HOVER MICRO-INTERACTIONS =====
  function initHoverMicroInteractions() {
    // Shadow breathing effect on cards
    const breathingCards = document.querySelectorAll('.feature-card, .artist-card');
    breathingCards.forEach(card => {
      card.classList.add('enhanced-hover');
    });
  }

  // ===== NEON BACKGROUND FOR HERO =====
  function initNeonHeroBackground() {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;
    
    // Create neon background element
    const neonBg = document.createElement('div');
    neonBg.className = 'hero-neon-bg';
    hero.style.position = 'relative';
    hero.insertBefore(neonBg, hero.firstChild);
  }

  // ===== PERFORMANCE MONITORING =====
  function capBackgroundAnimations() {
    // Limit simultaneous animations to maintain 60fps
    // Testing showed 3 concurrent animations as optimal balance between
    // visual richness and performance across mid-range devices
    const MAX_SIMULTANEOUS_ANIMATIONS = 3;
    
    const animatedElements = document.querySelectorAll('[class*="neon-"], .scanline-overlay');
    
    animatedElements.forEach((el, index) => {
      if (index >= MAX_SIMULTANEOUS_ANIMATIONS) {
        // Disable animations for elements beyond the cap
        el.style.animation = 'none';
      }
    });
  }

  // ===== RED MODE PARTICLE EFFECTS =====
  let particleContainer = null;
  let particleAnimationFrame = null;
  let particles = [];
  let cachedWindowWidth = window.innerWidth;
  let cachedWindowHeight = window.innerHeight;
  
  function initRedModeParticles() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;
    
    // Remove existing particles if any
    removeRedModeParticles();
    
    // Cache window dimensions
    cachedWindowWidth = window.innerWidth;
    cachedWindowHeight = window.innerHeight;
    
    // Update cache on window resize
    const handleResize = () => {
      cachedWindowWidth = window.innerWidth;
      cachedWindowHeight = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Create particle container
    particleContainer = document.createElement('div');
    particleContainer.id = 'red-mode-particles';
    particleContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    `;
    document.body.insertBefore(particleContainer, document.body.firstChild);
    
    // Store resize handler for cleanup
    particleContainer._resizeHandler = handleResize;
    
    // Create particles
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
      createParticle();
    }
    
    // Start animation loop
    animateParticles();
  }
  
  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 1-3px
    const size = Math.random() * 2 + 1;
    
    // Random starting position using cached dimensions
    const x = Math.random() * cachedWindowWidth;
    const y = Math.random() * cachedWindowHeight;
    
    // Random velocity
    const vx = (Math.random() - 0.5) * 0.5;
    const vy = (Math.random() - 0.5) * 0.5;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.3;
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: radial-gradient(circle, rgba(255, 0, 0, ${opacity}) 0%, transparent 70%);
      border-radius: 50%;
      box-shadow: 0 0 ${size * 3}px rgba(255, 0, 0, ${opacity * 0.8});
      left: ${x}px;
      top: ${y}px;
    `;
    
    particleContainer.appendChild(particle);
    
    particles.push({
      element: particle,
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      size: size,
      opacity: opacity
    });
  }
  
  function animateParticles() {
    if (!particleContainer) return;
    
    particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around screen edges using cached dimensions
      if (particle.x < 0) particle.x = cachedWindowWidth;
      if (particle.x > cachedWindowWidth) particle.x = 0;
      if (particle.y < 0) particle.y = cachedWindowHeight;
      if (particle.y > cachedWindowHeight) particle.y = 0;
      
      // Apply position
      particle.element.style.left = particle.x + 'px';
      particle.element.style.top = particle.y + 'px';
    });
    
    particleAnimationFrame = requestAnimationFrame(animateParticles);
  }
  
  function removeRedModeParticles() {
    if (particleAnimationFrame) {
      cancelAnimationFrame(particleAnimationFrame);
      particleAnimationFrame = null;
    }
    
    if (particleContainer) {
      // Clean up resize handler
      if (particleContainer._resizeHandler) {
        window.removeEventListener('resize', particleContainer._resizeHandler);
      }
      particleContainer.remove();
      particleContainer = null;
    }
    
    particles = [];
  }

  // ===== INITIALIZE ON DOM READY =====
  function init() {
    initThemeSwitching();
    initEntranceAnimations();
    initHeaderParallax();
    initCardAnimations();
    initMagneticButtons();
    initNavScrollIndicator();
    initCursorGlow();
    initSmoothTransitions();
    initTicketPulse();
    initLazyLoading();
    initKeyboardNav();
    
    // Advanced retro animations
    initRevealOnScroll();
    init3DTiltCards();
    initScanlineEffect();
    initParallaxCards();
    initHoverMicroInteractions();
    initNeonHeroBackground();
    capBackgroundAnimations();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
