// Magic Monday Frankfurt - Pixel Art Retro Theme
// Features: Preloader, Custom Cursor, Particles, Easter Egg Mini-Game

document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initCustomCursor();
    initScanlines();
    initEasterEgg();
    initNavSeparatorRemoval();
});

// ===== PRELOADER =====
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
        <div class="preloader-text">Loading Magic...</div>
    `;
    document.body.insertBefore(preloader, document.body.firstChild);
    document.body.classList.add('loading');
    
    // Hide preloader after animation
    const minLoadTime = 2000; // Minimum display time for effect
    const startTime = Date.now();
    
    window.addEventListener('load', function() {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minLoadTime - elapsed);
        
        setTimeout(function() {
            preloader.classList.add('hidden');
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            // Remove preloader after transition
            setTimeout(function() {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }, remaining);
    });
}

// ===== SCANLINES & CRT EFFECT =====
function initScanlines() {
    // Create scanlines overlay
    const scanlines = document.createElement('div');
    scanlines.className = 'scanlines';
    document.body.appendChild(scanlines);
    
    // Create CRT vignette effect
    const crtEffect = document.createElement('div');
    crtEffect.className = 'crt-effect';
    document.body.appendChild(crtEffect);
}

// ===== CUSTOM CURSOR =====
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
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    updateCursor();
    
    // Click effect with particles
    document.addEventListener('mousedown', function(e) {
        cursor.classList.add('clicking');
        createSparkParticles(e.clientX, e.clientY);
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
    
    // Magic trail effect on move
    let trailThrottle = 0;
    document.addEventListener('mousemove', function(e) {
        trailThrottle++;
        if (trailThrottle % 3 === 0) {
            createMagicTrail(e.clientX, e.clientY);
        }
    });
}

// Create spark particles on click
function createSparkParticles(x, y) {
    const numParticles = 8;
    
    for (let i = 0; i < numParticles; i++) {
        const spark = document.createElement('div');
        spark.className = 'cursor-spark';
        
        // Random direction for each spark
        const angle = (i / numParticles) * Math.PI * 2;
        const distance = 20 + Math.random() * 30;
        const sparkX = Math.cos(angle) * distance;
        const sparkY = Math.sin(angle) * distance;
        
        spark.style.left = x + 'px';
        spark.style.top = y + 'px';
        spark.style.setProperty('--spark-x', sparkX + 'px');
        spark.style.setProperty('--spark-y', sparkY + 'px');
        
        // Random colors (gold/red)
        if (Math.random() > 0.5) {
            spark.style.background = '#FFD700';
            spark.style.boxShadow = '0 0 6px #FFD700, 0 0 10px #FFD700';
        } else {
            spark.style.background = '#C41E3A';
            spark.style.boxShadow = '0 0 6px #C41E3A, 0 0 10px #C41E3A';
        }
        
        document.body.appendChild(spark);
        
        // Remove after animation
        setTimeout(function() {
            if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
            }
        }, 600);
    }
}

// Create subtle magic trail
function createMagicTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'magic-trail';
    trail.style.left = (x + (Math.random() - 0.5) * 10) + 'px';
    trail.style.top = (y + (Math.random() - 0.5) * 10) + 'px';
    
    if (Math.random() > 0.7) {
        trail.style.background = '#C41E3A';
    }
    
    document.body.appendChild(trail);
    
    setTimeout(function() {
        if (trail.parentNode) {
            trail.parentNode.removeChild(trail);
        }
    }, 800);
}

// ===== EASTER EGG MINI-GAME =====
function initEasterEgg() {
    // Create overlay for mini-game
    const overlay = document.createElement('div');
    overlay.id = 'easter-egg-overlay';
    overlay.innerHTML = `
        <div class="mini-game-container">
            <div class="mini-game-title">🎩 Hütchenspiel 🐰</div>
            <p style="font-family: 'VT323', monospace; font-size: 20px; color: #888;">
                Finde den Hasen! Klicke auf einen Hut.
            </p>
            <div class="cups-container">
                <div class="cup" data-cup="1"><span class="rabbit">🐰</span></div>
                <div class="cup" data-cup="2"><span class="rabbit">🐰</span></div>
                <div class="cup" data-cup="3"><span class="rabbit">🐰</span></div>
            </div>
            <p class="game-result" style="font-family: 'Press Start 2P', cursive; font-size: 14px; color: #FFD700; min-height: 24px;"></p>
            <button class="close-game">× Schließen</button>
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
