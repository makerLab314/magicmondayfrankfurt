// Magic Monday Frankfurt - Dynamic Responsive Effects

document.addEventListener('DOMContentLoaded', function() {
    console.log('Magic Monday Frankfurt - Willkommen zur Show!');
    
    // Responsive image handling
    handleResponsiveImages();
    
    // Smooth scroll animations
    initSmoothAnimations();
    
    // Dynamic navigation behavior
    initDynamicNav();
    
    // Handle window resize
    window.addEventListener('resize', debounce(handleResponsiveImages, 250));
});

// Debounce function for resize events
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

// Handle responsive images based on screen size
function handleResponsiveImages() {
    var images = document.querySelectorAll('.column img, td.column img');
    var windowWidth = window.innerWidth;
    
    images.forEach(function(img) {
        if (windowWidth < 768) {
            img.style.width = '100%';
            img.style.maxWidth = '100%';
            img.style.float = 'none';
            img.style.margin = '0 0 1rem 0';
            img.style.display = 'block';
        } else if (windowWidth < 1200) {
            if (img.getAttribute('style') && img.getAttribute('style').indexOf('float') !== -1) {
                img.style.maxWidth = '45%';
            }
        } else {
            if (img.getAttribute('style') && img.getAttribute('style').indexOf('float') !== -1) {
                img.style.maxWidth = '40%';
            }
        }
    });
}

// Smooth fade-in animations
function initSmoothAnimations() {
    // Check for reduced motion preference
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    var elements = document.querySelectorAll('.column, article.column, section.column, td.column');
    
    if (prefersReducedMotion) {
        // Skip animations for users who prefer reduced motion
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
                    entry.target.style.transform = 'translateX(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.05,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(function(el, index) {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-20px)';
            el.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
            observer.observe(el);
        });
    } else {
        elements.forEach(function(el) {
            el.style.opacity = '1';
        });
    }
}

// Dynamic navigation with scroll behavior
function initDynamicNav() {
    var nav = document.querySelector('#head_navigation');
    if (!nav) return;
    
    var lastScroll = 0;
    var scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        var currentScroll = window.pageYOffset;
        
        if (currentScroll > scrollThreshold) {
            nav.style.background = 'rgba(15, 52, 96, 0.98)';
            nav.style.boxShadow = '0 4px 20px rgba(233, 69, 96, 0.3)';
        } else {
            nav.style.background = 'rgba(15, 52, 96, 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}
