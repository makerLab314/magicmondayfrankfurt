// Magic Monday Frankfurt - Immersive Magic Effects

document.addEventListener('DOMContentLoaded', function() {
    console.log('%c✨ Magic Monday Frankfurt - Die Magie beginnt! ✨', 
        'color: #d4af37; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    
    // Initialize all magic effects
    fadeInContent();
    initMagicSparkles();
    initParallax();
    initAmbientStars();
    initMagicCursor();
    initEasterEggs();
    initNavSeparatorRemoval();
    initImageMagic();
    initSecretMessage();
});

// Remove navigation separators (dots) and clean up
function initNavSeparatorRemoval() {
    const nav = document.getElementById('head_navigation');
    if (nav) {
        // Replace text node dots with nothing
        nav.childNodes.forEach(function(node) {
            if (node.nodeType === 3) { // Text node
                node.textContent = node.textContent.replace(/[·•\u00B7\u2022]/g, ' ');
            }
        });
    }
}

// Smooth fade-in for main content with stagger effect
function fadeInContent() {
    const columns = document.querySelectorAll('.column, td.column');
    columns.forEach(function(column, index) {
        column.style.opacity = '0';
        column.style.transform = 'translateY(25px)';
        setTimeout(function() {
            column.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
            column.style.opacity = '1';
            column.style.transform = 'translateY(0)';
        }, 100 + index * 120);
    });
}

// Enhanced Magic sparkle effects
function initMagicSparkles() {
    let lastSparkleTime = 0;
    const sparkleThrottle = 80;
    const sparkleSymbols = ['✦', '✧', '⭐', '✨', '★', '·'];
    const colors = [
        'rgba(212, 175, 55, ',  // Gold
        'rgba(107, 91, 149, ',  // Purple
        'rgba(244, 207, 87, ',  // Light Gold
        'rgba(139, 123, 181, '  // Light Purple
    ];
    
    document.addEventListener('mousemove', function(e) {
        const now = Date.now();
        if (now - lastSparkleTime < sparkleThrottle) return;
        lastSparkleTime = now;
        
        // 15% chance to create sparkle
        if (Math.random() > 0.15) return;
        
        createSparkle(e.clientX, e.clientY, sparkleSymbols, colors);
    });
}

function createSparkle(x, y, symbols, colors) {
    const sparkle = document.createElement('div');
    sparkle.className = 'magic-particle';
    sparkle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const opacity = 0.5 + Math.random() * 0.5;
    const size = 8 + Math.random() * 12;
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    sparkle.style.cssText = 
        'position: fixed;' +
        'left: ' + (x + offsetX) + 'px;' +
        'top: ' + (y + offsetY) + 'px;' +
        'pointer-events: none;' +
        'font-size: ' + size + 'px;' +
        'color: ' + color + opacity + ');' +
        'z-index: 9999;' +
        'text-shadow: 0 0 10px ' + color + '0.8);' +
        'animation: sparkleFloat 1.2s ease-out forwards;';
    
    document.body.appendChild(sparkle);
    
    setTimeout(function() {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 1200);
}

// Parallax effect for background
function initParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                document.body.style.backgroundPositionY = scrolled * 0.2 + 'px';
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Create ambient floating stars in background
function initAmbientStars() {
    const numStars = 15;
    
    for (let i = 0; i < numStars; i++) {
        createAmbientStar();
    }
}

function createAmbientStar() {
    const star = document.createElement('div');
    star.className = 'star';
    
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = 2 + Math.random() * 3;
    const size = 2 + Math.random() * 3;
    
    star.style.cssText = 
        'left: ' + x + '%;' +
        'top: ' + y + '%;' +
        'width: ' + size + 'px;' +
        'height: ' + size + 'px;' +
        'animation-delay: ' + delay + 's;' +
        'animation-duration: ' + duration + 's;';
    
    document.body.appendChild(star);
}

// Magic cursor effect on special elements
function initMagicCursor() {
    const magicElements = document.querySelectorAll('h1, h2, .column img, #head img');
    
    magicElements.forEach(function(el) {
        el.classList.add('magic-hover');
    });
}

// Image magic - subtle glow on hover
function initImageMagic() {
    const images = document.querySelectorAll('.column img');
    
    images.forEach(function(img) {
        img.addEventListener('mouseenter', function() {
            createImageSparkles(img);
        });
    });
}

function createImageSparkles(img) {
    const rect = img.getBoundingClientRect();
    const numSparkles = 5;
    
    for (let i = 0; i < numSparkles; i++) {
        setTimeout(function() {
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            createSparkle(x, y, ['✨', '⭐'], ['rgba(212, 175, 55, ']);
        }, i * 100);
    }
}

// Easter eggs and hidden features
function initEasterEggs() {
    // Konami code easter egg
    initKonamiCode();
    
    // Triple click easter egg on header
    initTripleClickMagic();
    
    // Secret console message
    initSecretConsole();
}

// Konami code: ↑↑↓↓←→←→BA
function initKonamiCode() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                        'KeyB', 'KeyA'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateKonamiMagic();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

function activateKonamiMagic() {
    console.log('%c🎩 ABRAKADABRA! Du hast das Geheimnis entdeckt! 🎩', 
        'color: #d4af37; font-size: 24px; font-weight: bold;');
    
    // Create explosion of sparkles
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(function() {
            const angle = (i / 50) * Math.PI * 2;
            const radius = 50 + Math.random() * 150;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            createSparkle(x, y, ['✨', '⭐', '🎩', '🪄', '🐰'], 
                ['rgba(212, 175, 55, ', 'rgba(107, 91, 149, ']);
        }, i * 30);
    }
    
    // Add glow effect to page
    document.body.classList.add('konami-active');
    setTimeout(function() {
        document.body.classList.remove('konami-active');
    }, 3000);
    
    // Show secret message
    showSecretBanner('🎩 Abrakadabra! Du bist ein wahrer Zauber-Meister! 🪄');
}

// Triple click on header image reveals magic
function initTripleClickMagic() {
    const header = document.getElementById('head');
    if (!header) return;
    
    let clickCount = 0;
    let clickTimer;
    
    header.addEventListener('click', function() {
        clickCount++;
        
        if (clickCount === 3) {
            activateHeaderMagic();
            clickCount = 0;
        }
        
        clearTimeout(clickTimer);
        clickTimer = setTimeout(function() {
            clickCount = 0;
        }, 500);
    });
}

function activateHeaderMagic() {
    const header = document.getElementById('head');
    if (!header) return;
    
    header.classList.add('easter-egg', 'revealed');
    
    // Create sparkle trail around header
    const rect = header.getBoundingClientRect();
    const points = 20;
    
    for (let i = 0; i < points; i++) {
        setTimeout(function() {
            let x, y;
            if (i < points / 4) {
                x = rect.left + (rect.width / (points / 4)) * i;
                y = rect.top;
            } else if (i < points / 2) {
                x = rect.right;
                y = rect.top + (rect.height / (points / 4)) * (i - points / 4);
            } else if (i < points * 3 / 4) {
                x = rect.right - (rect.width / (points / 4)) * (i - points / 2);
                y = rect.bottom;
            } else {
                x = rect.left;
                y = rect.bottom - (rect.height / (points / 4)) * (i - points * 3 / 4);
            }
            createSparkle(x, y, ['✨', '⭐'], ['rgba(212, 175, 55, ']);
        }, i * 50);
    }
    
    setTimeout(function() {
        header.classList.remove('revealed');
    }, 5000);
}

function initSecretConsole() {
    console.log('%c🔮 Psst... Kennst du den Konami-Code? ↑↑↓↓←→←→BA', 
        'color: #6b5b95; font-size: 12px;');
}

// Secret message typing effect
function initSecretMessage() {
    // Check if user types "magic" anywhere
    let typedChars = '';
    
    document.addEventListener('keypress', function(e) {
        typedChars += e.key.toLowerCase();
        
        if (typedChars.length > 10) {
            typedChars = typedChars.slice(-10);
        }
        
        if (typedChars.includes('magic')) {
            showSecretBanner('✨ Die Magie ist überall! ✨');
            typedChars = '';
        }
        
        if (typedChars.includes('monday')) {
            showSecretBanner('🌙 Montag ist Zaubertag! 🌙');
            typedChars = '';
        }
    });
}

// Show animated banner for secrets
function showSecretBanner(message) {
    // Remove existing banner if present
    const existing = document.querySelector('.secret-banner');
    if (existing) existing.remove();
    
    const banner = document.createElement('div');
    banner.className = 'secret-banner';
    banner.textContent = message;
    banner.style.cssText = 
        'position: fixed;' +
        'top: 50%;' +
        'left: 50%;' +
        'transform: translate(-50%, -50%) scale(0);' +
        'background: linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%);' +
        'color: #d4af37;' +
        'padding: 20px 40px;' +
        'border-radius: 12px;' +
        'font-family: Cinzel, Georgia, serif;' +
        'font-size: 24px;' +
        'font-weight: bold;' +
        'text-align: center;' +
        'z-index: 10000;' +
        'box-shadow: 0 0 50px rgba(212, 175, 55, 0.5), 0 20px 60px rgba(0,0,0,0.5);' +
        'border: 2px solid #d4af37;' +
        'transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);';
    
    document.body.appendChild(banner);
    
    // Animate in
    setTimeout(function() {
        banner.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 50);
    
    // Animate out
    setTimeout(function() {
        banner.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(function() {
            banner.remove();
        }, 500);
    }, 3000);
}
