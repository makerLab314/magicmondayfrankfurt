// Magic Monday Frankfurt - Immersive Magic Effects

document.addEventListener('DOMContentLoaded', function() {
    console.log('Magic Monday Frankfurt - Die Magie beginnt! ✨');
    
    // Smooth fade-in effect for content
    fadeInContent();
    
    // Magic sparkle effects on mouse movement
    initMagicSparkles();
    
    // Parallax effect for background
    initParallax();
});

// Smooth fade-in for main content
function fadeInContent() {
    const columns = document.querySelectorAll('.column');
    columns.forEach(function(column, index) {
        column.style.opacity = '0';
        column.style.transform = 'translateY(20px)';
        setTimeout(function() {
            column.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            column.style.opacity = '1';
            column.style.transform = 'translateY(0)';
        }, 100 + index * 150);
    });
}

// Magic sparkle effects
function initMagicSparkles() {
    let lastSparkleTime = 0;
    const sparkleThrottle = 100; // ms between sparkles
    
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastSparkleTime < sparkleThrottle) return;
        lastSparkleTime = now;
        
        // Only create sparkles occasionally (20% chance)
        if (Math.random() > 0.2) return;
        
        createSparkle(e.clientX, e.clientY);
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'magic-particle';
    sparkle.innerHTML = '✦';
    sparkle.style.cssText = 
        'position: fixed;' +
        'left: ' + x + 'px;' +
        'top: ' + y + 'px;' +
        'pointer-events: none;' +
        'font-size: ' + (8 + Math.random() * 8) + 'px;' +
        'color: rgba(212, 175, 55, ' + (0.5 + Math.random() * 0.5) + ');' +
        'z-index: 9999;' +
        'animation: sparkleFloat 1s ease-out forwards;';
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(function() {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// Parallax effect for background
function initParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                document.body.style.backgroundPositionY = scrolled * 0.3 + 'px';
                ticking = false;
            });
            ticking = true;
        }
    });
}
