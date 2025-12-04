// Magic Monday Frankfurt - Immersive Magic Effects

document.addEventListener('DOMContentLoaded', function() {
    console.log('Magic Monday Frankfurt - Die Magie beginnt! ✨');
    
    // Sanftes Einblenden des Inhalts
    fadeInContent();
    
    // Magische Sparkle-Effekte bei Mausbewegung
    initMagicSparkles();
    
    // Parallax-Effekt für den Hintergrund
    initParallax();
});

// Sanftes Einblenden des Hauptinhalts
function fadeInContent() {
    var columns = document.querySelectorAll('.column');
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

// Magische Sparkle-Effekte
function initMagicSparkles() {
    var lastSparkleTime = 0;
    var sparkleThrottle = 100; // ms zwischen Sparkles
    
    document.addEventListener('mousemove', function(e) {
        var now = Date.now();
        if (now - lastSparkleTime < sparkleThrottle) return;
        lastSparkleTime = now;
        
        // Nur gelegentlich Sparkles erzeugen (20% Chance)
        if (Math.random() > 0.2) return;
        
        createSparkle(e.clientX, e.clientY);
    });
}

function createSparkle(x, y) {
    var sparkle = document.createElement('div');
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
    
    // Sparkle nach Animation entfernen
    setTimeout(function() {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1000);
}

// Parallax-Effekt für den Hintergrund
function initParallax() {
    var ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                var scrolled = window.pageYOffset;
                document.body.style.backgroundPositionY = scrolled * 0.3 + 'px';
                ticking = false;
            });
            ticking = true;
        }
    });
}

// CSS für Sparkle-Animation dynamisch hinzufügen
var styleSheet = document.createElement('style');
styleSheet.textContent = 
    '@keyframes sparkleFloat {' +
    '    0% { opacity: 1; transform: translateY(0) rotate(0deg) scale(1); }' +
    '    100% { opacity: 0; transform: translateY(-30px) rotate(180deg) scale(0); }' +
    '}';
document.head.appendChild(styleSheet);
