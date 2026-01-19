/* ============================================================================
   MAGIC MONDAY FRANKFURT - SUBTLE INTERACTIONS
   
   Refined JavaScript for smooth, professional interactions.
   No gimmicky Easter eggs - just polished user experience.
============================================================================ */

(function() {
  'use strict';

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
    // Only on larger screens
    if (window.innerWidth < 768) return;
    
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
    const internalLinks = document.querySelectorAll('a[href^="/"]:not([target="_blank"]), a[href$=".html"]:not([target="_blank"])');
    
    internalLinks.forEach(link => {
      // Skip if it's an external link or download
      if (link.hostname !== window.location.hostname) return;
      
      link.addEventListener('click', (e) => {
        // Don't prevent default for keyboard navigation
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        
        e.preventDefault();
        const href = link.getAttribute('href');
        
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

  // ===== INITIALIZE ON DOM READY =====
  function init() {
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
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
