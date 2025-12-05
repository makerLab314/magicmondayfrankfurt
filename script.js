// Magic Monday Frankfurt - Premium Brand Identity
// Elegant, Modern, and Sophisticated Effects

// Configuration constants
const CONFIG = {
    STAR_COUNT: 40, // Number of stars in background (subtle)
};

document.addEventListener('DOMContentLoaded', function() {
    initStarfield();
    initPreloader();
    initEasterEgg();
    initFooterGameButton();
});

// ===== ELEGANT STARFIELD =====
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
        
        // Small, subtle sizes (1-3px)
        const size = 1 + Math.random() * 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Slow, subtle twinkle timing
        star.style.setProperty('--twinkle-duration', (3 + Math.random() * 4) + 's');
        star.style.setProperty('--twinkle-delay', (Math.random() * 5) + 's');
        
        starfield.appendChild(star);
    }
}

// ===== SMART PRELOADER - Only shows when needed =====
function initPreloader() {
    // Check if page is already loaded
    if (document.readyState === 'complete') {
        // Page already loaded, no preloader needed
        return;
    }
    
    // Create preloader element only if page is still loading
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">Magic Monday</div>
            <div class="preloader-spinner"></div>
        </div>
    `;
    document.body.insertBefore(preloader, document.body.firstChild);
    
    document.body.classList.add('loading');
    
    // Hide preloader immediately when page loads
    window.addEventListener('load', function() {
        preloader.classList.add('hidden');
        document.body.classList.remove('loading');
        
        // Remove preloader from DOM after fade transition
        setTimeout(function() {
            if (preloader.parentNode) {
                preloader.remove();
            }
        }, 500);
    });
}

// ===== EASTER EGG MINI-GAME =====
function initEasterEgg() {
    // Create overlay for mini-game
    const overlay = document.createElement('div');
    overlay.id = 'easter-egg-overlay';
    overlay.innerHTML = `
        <div class="mini-game-container">
            <div class="mini-game-title">🎩 Hütchenspiel 🐰</div>
            <p class="game-instructions">
                Finde den Hasen! Klicke auf einen Hut.
            </p>
            <div class="cups-container">
                <div class="cup" data-cup="1"><span class="rabbit">🐰</span></div>
                <div class="cup" data-cup="2"><span class="rabbit">🐰</span></div>
                <div class="cup" data-cup="3"><span class="rabbit">🐰</span></div>
            </div>
            <p class="game-result"></p>
            <button class="close-game">Schließen</button>
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
    
    if (result) {
        result.textContent = '';
    }
    
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
            if (result) {
                result.textContent = '🎉 Gewonnen! Du hast den Hasen gefunden!';
                result.classList.remove('game-result-lose');
                result.classList.add('game-result-win');
            }
        } else {
            // Show where rabbit actually was
            cups.forEach(function(cup) {
                if (cup.dataset.hasRabbit === 'true') {
                    cup.classList.add('lifted', 'reveal');
                }
            });
            if (result) {
                result.textContent = '😅 Der Hase war woanders!';
                result.classList.remove('game-result-win');
                result.classList.add('game-result-lose');
            }
        }
        
        // Reset after delay
        setTimeout(resetGame, 2500);
    }, 500);
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
