// Magic Monday Frankfurt - Premium Pixel Art Retro Theme
// Features: Premium Preloader with Curtains, Starfield, Custom Cursor, Particle Effects, Mini-Game

// Configuration constants
const CONFIG = {
    PRELOADER_MIN_TIME: 1800, // Minimum preloader display time in ms
    CURTAIN_DELAY: 300, // Delay before curtains open
    CURSOR_EASING: 0.12, // Cursor follow smoothness (0-1, lower = smoother)
    TRAIL_THROTTLE: 2, // Create trail every N mouse moves
    TRAIL_TYPES: ['star', 'dot', 'glow'], // Trail particle types
    STAR_COUNT: 50, // Number of stars in background
    PARTICLE_LIMIT: 30 // Max particles on screen at once
};

let particleCount = 0;

document.addEventListener('DOMContentLoaded', function() {
    initStarfield();
    initPreloader();
    initCustomCursor();
    initCRTEffects();
    initEasterEgg();
    initNavSeparatorRemoval();
    initFooterGameButton();
});

// ===== ANIMATED STARFIELD =====
function initStarfield() {
    const starfield = document.createElement('div');
    starfield.id = 'starfield';
    document.body.appendChild(starfield);
    
    for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random size (2-6px for pixel look)
        const size = Math.floor(Math.random() * 3) * 2 + 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random twinkle timing
        star.style.setProperty('--twinkle-duration', (1.5 + Math.random() * 3) + 's');
        star.style.setProperty('--twinkle-delay', (Math.random() * 3) + 's');
        
        // Random colors (mostly gold, some red)
        if (Math.random() > 0.85) {
            star.style.background = '#C41E3A';
        } else if (Math.random() > 0.7) {
            star.style.background = '#FFE55C';
        }
        
        starfield.appendChild(star);
    }
}

// ===== PREMIUM PRELOADER WITH CURTAINS =====
function initPreloader() {
    // Create preloader element
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="card-shuffle">
            <div class="shuffle-card">♠</div>
            <div class="shuffle-card">♥</div>
            <div class="shuffle-card">♦</div>
        </div>
        <div class="preloader-text">Die Magie beginnt...</div>
    `;
    document.body.insertBefore(preloader, document.body.firstChild);
    
    // Create curtains
    const curtainLeft = document.createElement('div');
    curtainLeft.className = 'curtain-left';
    document.body.appendChild(curtainLeft);
    
    const curtainRight = document.createElement('div');
    curtainRight.className = 'curtain-right';
    document.body.appendChild(curtainRight);
    
    document.body.classList.add('loading');
    
    // Hide preloader after animation completes
    const startTime = Date.now();
    
    window.addEventListener('load', function() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, CONFIG.PRELOADER_MIN_TIME - elapsed);
        
        setTimeout(function() {
            // Hide preloader first
            preloader.classList.add('hidden');
            
            // Then open curtains after short delay
            setTimeout(function() {
                curtainLeft.classList.add('open');
                curtainRight.classList.add('open');
                
                document.body.classList.remove('loading');
                document.body.classList.add('loaded');
                
                // Remove elements after transitions
                setTimeout(function() {
                    if (preloader.parentNode) preloader.remove();
                    if (curtainLeft.parentNode) curtainLeft.remove();
                    if (curtainRight.parentNode) curtainRight.remove();
                }, 1500);
            }, CONFIG.CURTAIN_DELAY);
        }, remaining);
    });
}

// ===== CRT EFFECTS =====
function initCRTEffects() {
    // Create scanlines overlay
    const scanlines = document.createElement('div');
    scanlines.className = 'scanlines';
    document.body.appendChild(scanlines);
    
    // Create CRT vignette effect
    const crtEffect = document.createElement('div');
    crtEffect.className = 'crt-effect';
    document.body.appendChild(crtEffect);
    
    // Create chromatic aberration layer
    const crtAberration = document.createElement('div');
    crtAberration.className = 'crt-aberration';
    document.body.appendChild(crtAberration);
    
    // Create CRT curve effect
    const crtCurve = document.createElement('div');
    crtCurve.className = 'crt-curve';
    document.body.appendChild(crtCurve);
}

// ===== PREMIUM CUSTOM CURSOR =====
function initCustomCursor() {
    // Create custom cursor element
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    cursor.innerHTML = '<div class="wand"></div>';
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor following
    function updateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * CONFIG.CURSOR_EASING;
        cursorY += dy * CONFIG.CURSOR_EASING;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Click effect with enhanced particles
    document.addEventListener('mousedown', function(e) {
        cursor.classList.add('clicking');
        createSparkBurst(e.clientX, e.clientY);
    });
    
    document.addEventListener('mouseup', function() {
        cursor.classList.remove('clicking');
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
    
    // Premium magic trail effect on move
    let trailThrottle = 0;
    document.addEventListener('mousemove', function(e) {
        trailThrottle++;
        if (trailThrottle % CONFIG.TRAIL_THROTTLE === 0 && particleCount < CONFIG.PARTICLE_LIMIT) {
            createMagicTrail(e.clientX, e.clientY);
        }
    });
}

// Create premium spark burst on click
function createSparkBurst(x, y) {
    const numParticles = 12;
    
    for (let i = 0; i < numParticles; i++) {
        const spark = document.createElement('div');
        spark.className = 'cursor-spark';
        
        // Alternate between sizes and shapes
        if (i % 3 === 0) {
            spark.classList.add('star');
        } else if (i % 3 === 1) {
            spark.classList.add('large');
        }
        
        // Radial burst pattern
        const angle = (i / numParticles) * Math.PI * 2;
        const distance = 25 + Math.random() * 40;
        const sparkX = Math.cos(angle) * distance;
        const sparkY = Math.sin(angle) * distance;
        
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        spark.style.setProperty('--spark-x', sparkX + 'px');
        spark.style.setProperty('--spark-y', sparkY + 'px');
        
        // Varied colors (gold/red/white)
        const colorRand = Math.random();
        if (colorRand > 0.7) {
            spark.style.background = '#C41E3A';
            spark.style.boxShadow = '0 0 6px #C41E3A, 0 0 12px #C41E3A';
        } else if (colorRand > 0.4) {
            spark.style.background = '#FFE55C';
            spark.style.boxShadow = '0 0 6px #FFE55C, 0 0 12px #FFD700';
        } else {
            spark.style.background = '#FFD700';
            spark.style.boxShadow = '0 0 6px #FFD700, 0 0 12px #FFD700';
        }
        
        document.body.appendChild(spark);
        particleCount++;
        
        // Remove after animation
        setTimeout(function() {
            if (spark.parentNode) spark.remove();
            particleCount--;
        }, 800);
    }
}

// Create premium magic trail
function createMagicTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'magic-trail';
    
    // Random trail type
    const trailType = CONFIG.TRAIL_TYPES[Math.floor(Math.random() * CONFIG.TRAIL_TYPES.length)];
    trail.classList.add(trailType);
    
    // Slight random offset
    const offsetX = (Math.random() - 0.5) * 15;
    const offsetY = (Math.random() - 0.5) * 15;
    
    trail.style.left = (x + offsetX) + 'px';
    trail.style.top = (y + offsetY) + 'px';
    
    // Occasional red particles
    if (Math.random() > 0.8) {
        trail.style.background = '#C41E3A';
        if (trailType === 'glow') {
            trail.style.background = 'radial-gradient(circle, #C41E3A 0%, transparent 70%)';
        }
    }
    
    document.body.appendChild(trail);
    particleCount++;
    
    setTimeout(function() {
        if (trail.parentNode) trail.remove();
        particleCount--;
    }, 1000);
}

// ===== PREMIUM EASTER EGG MINI-GAME =====
function initEasterEgg() {
    // Create overlay for mini-game
    const overlay = document.createElement('div');
    overlay.id = 'easter-egg-overlay';
    overlay.innerHTML = `
        <div class="mini-game-container">
            <div class="mini-game-title">🎩 Hütchenspiel 🐰</div>
            <p style="font-family: 'VT323', monospace; font-size: 22px; color: #8888aa; margin-bottom: 10px;">
                Finde den Hasen! Klicke auf einen Hut.
            </p>
            <div class="cups-container">
                <div class="cup" data-cup="1"><span class="rabbit">🐰</span></div>
                <div class="cup" data-cup="2"><span class="rabbit">🐰</span></div>
                <div class="cup" data-cup="3"><span class="rabbit">🐰</span></div>
            </div>
            <p class="game-result" style="font-family: 'Press Start 2P', cursive; font-size: 12px; color: #FFD700; min-height: 30px;"></p>
            <button class="close-game">✕ Schließen</button>
        </div>
    `;
    document.body.appendChild(overlay);
    
    // Make header image clickable for Easter egg
    const headerImage = document.querySelector('#head img');
    if (headerImage) {
        headerImage.style.cursor = 'pointer';
        headerImage.addEventListener('click', function(e) {
            // Check if click is in the top portion (where logo/hat might be)
            const rect = headerImage.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const clickX = e.clientX - rect.left;
            
            // Trigger if clicking on upper middle area
            if (clickY < rect.height * 0.6 && 
                clickX > rect.width * 0.3 && 
                clickX < rect.width * 0.7) {
                openMiniGame();
            }
        });
    }
    
    // Close button
    overlay.querySelector('.close-game').addEventListener('click', closeMiniGame);
    
    // Click outside to close
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeMiniGame();
        }
    });
    
    // Cup click handlers
    const cups = overlay.querySelectorAll('.cup');
    cups.forEach(function(cup) {
        cup.addEventListener('click', function() {
            playGame(this);
        });
    });
}

// Add footer game button
function initFooterGameButton() {
    const footer = document.getElementById('footer');
    if (footer) {
        const gameBtn = document.createElement('button');
        gameBtn.className = 'footer-game-btn';
        gameBtn.innerHTML = '🎩 Hütchenspiel spielen';
        gameBtn.addEventListener('click', openMiniGame);
        
        const brElement = document.createElement('br');
        footer.insertBefore(brElement, footer.firstChild);
        footer.insertBefore(gameBtn, footer.firstChild);
    }
}

function openMiniGame() {
    const overlay = document.getElementById('easter-egg-overlay');
    overlay.classList.add('active');
    
    // Reset game state
    resetGame();
}

function closeMiniGame() {
    const overlay = document.getElementById('easter-egg-overlay');
    overlay.classList.remove('active');
}

function resetGame() {
    const cups = document.querySelectorAll('.cup');
    const result = document.querySelector('.game-result');
    
    cups.forEach(function(cup) {
        cup.classList.remove('lifted', 'reveal');
        cup.style.pointerEvents = 'auto';
    });
    
    result.textContent = '';
    
    // Randomly place rabbit under one cup
    const winningCup = Math.floor(Math.random() * 3) + 1;
    cups.forEach(function(cup) {
        if (parseInt(cup.dataset.cup) === winningCup) {
            cup.dataset.hasRabbit = 'true';
        } else {
            cup.dataset.hasRabbit = 'false';
        }
    });
}

function playGame(selectedCup) {
    const cups = document.querySelectorAll('.cup');
    const result = document.querySelector('.game-result');
    
    // Disable all cups
    cups.forEach(function(cup) {
        cup.style.pointerEvents = 'none';
    });
    
    // Lift selected cup
    selectedCup.classList.add('lifted');
    
    setTimeout(function() {
        if (selectedCup.dataset.hasRabbit === 'true') {
            selectedCup.classList.add('reveal');
            result.textContent = '🎉 Gewonnen! Du hast den Hasen gefunden!';
            result.style.color = '#FFD700';
        } else {
            // Show where rabbit actually was
            cups.forEach(function(cup) {
                if (cup.dataset.hasRabbit === 'true') {
                    cup.classList.add('lifted', 'reveal');
                }
            });
            result.textContent = '😅 Der Hase war woanders!';
            result.style.color = '#C41E3A';
        }
        
        // Reset after delay
        setTimeout(resetGame, 2500);
    }, 500);
}

// ===== NAVIGATION CLEANUP =====
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

// ===== KEYBOARD SHORTCUT FOR EASTER EGG =====
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    
    // Keep only last 10 keys
    if (konamiCode.length > 10) {
        konamiCode.shift();
    }
    
    // Check if matches Konami code
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        openMiniGame();
        konamiCode = [];
    }
});
