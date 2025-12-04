// Magic Monday Frankfurt - Clean Modern Interactions

document.addEventListener('DOMContentLoaded', function() {
    console.log('Magic Monday Frankfurt - Willkommen!');
    
    // Reveal content on scroll
    initScrollReveal();
    
    // Enhanced navigation
    initNavigation();
});

// Reveal elements as they scroll into view
function initScrollReveal() {
    var columns = document.querySelectorAll('.column');
    
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        columns.forEach(function(column) {
            column.style.opacity = '0';
            column.style.transform = 'translateY(16px)';
            column.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            observer.observe(column);
        });
    } else {
        // Fallback for older browsers
        columns.forEach(function(column) {
            column.style.opacity = '1';
        });
    }
}

// Navigation enhancement with active state indication
function initNavigation() {
    var nav = document.querySelector('#head_navigation');
    if (!nav) return;
    
    var lastScrollY = 0;
    var ticking = false;
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (lastScrollY > 50) {
                    nav.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                } else {
                    nav.style.boxShadow = 'none';
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}
