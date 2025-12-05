// Magic Monday Frankfurt - Monochrome Glass Effects

document.addEventListener('DOMContentLoaded', function() {
    console.log('Magic Monday Frankfurt - Willkommen!');
    
    // Responsive image handling
    handleResponsiveImages();
    
    // Smooth fade animations
    initFadeAnimations();
    
    // Navigation scroll effects
    initNavScroll();
    
    // Handle window resize
    window.addEventListener('resize', debounce(handleResponsiveImages, 200));
});

// Debounce utility
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

// Responsive image handling
function handleResponsiveImages() {
    var images = document.querySelectorAll('.column img, td.column img');
    var windowWidth = window.innerWidth;
    
    images.forEach(function(img) {
        if (windowWidth < 768) {
            img.style.width = '100%';
            img.style.maxWidth = '100%';
            img.style.float = 'none';
            img.style.margin = '0 0 1.25rem 0';
            img.style.display = 'block';
        } else if (windowWidth < 1200) {
            if (img.getAttribute('style') && img.getAttribute('style').indexOf('float') !== -1) {
                img.style.maxWidth = '42%';
            }
        } else {
            if (img.getAttribute('style') && img.getAttribute('style').indexOf('float') !== -1) {
                img.style.maxWidth = '38%';
            }
        }
    });
}

// Fade-in animations
function initFadeAnimations() {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var elements = document.querySelectorAll('.column, article.column, section.column, td.column');
    
    if (prefersReducedMotion) {
        elements.forEach(function(el) {
            el.style.opacity = '1';
        });
        return;
    }
    
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.08,
            rootMargin: '0px 0px -30px 0px'
        });
        
        elements.forEach(function(el, index) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(15px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(el);
        });
    } else {
        elements.forEach(function(el) {
            el.style.opacity = '1';
        });
    }
}

// Navigation scroll effect - monochrome only
function initNavScroll() {
    var nav = document.querySelector('#head_navigation');
    if (!nav) return;
    
    var scrollThreshold = 80;
    
    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset;
        
        if (currentScroll > scrollThreshold) {
            nav.style.background = 'rgba(0, 0, 0, 0.9)';
            nav.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6)';
        } else {
            nav.style.background = 'rgba(0, 0, 0, 0.7)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        }
    });
}
