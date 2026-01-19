// ============================================================================
// MAGIC MONDAY FRANKFURT - COMPLETE WEBSITE REDESIGN
// Enhanced JavaScript with Theme Switching and All Original Features
// ============================================================================

// Configuration
const CONFIG = {
    STAR_COUNT: 40,
    PARTICLE_COUNT: 20,
    CUP_GAME_AREA: {
        TOP_PERCENTAGE: 0.6,
        LEFT_PERCENTAGE: 0.3,
        RIGHT_PERCENTAGE: 0.7
    },
    THEMES: {
        RETRO_ARCADE: 'retro-arcade',
        ELEGANT_CLUB: 'elegant-club',
        MODERN_MINIMAL: 'modern-minimal',
        MYSTICAL_DARK: 'mystical-dark'
    },
    DEFAULT_THEME: 'retro-arcade',
    STORAGE_KEY: 'magicmonday-theme'
};

// ===== THEME MANAGEMENT =====
class ThemeManager {
    constructor() {
        this.currentTheme = this.loadTheme();
        this.init();
    }
    
    init() {
        // Apply theme on page load
        this.applyTheme(this.currentTheme);
        
        // Create theme switcher UI
        this.createThemeSwitcher();
        
        // Add smooth transition class after initial load
        setTimeout(() => {
            document.documentElement.classList.add('theme-transitions-enabled');
        }, 100);
    }
    
    loadTheme() {
        // Try to load theme from localStorage
        const saved = localStorage.getItem(CONFIG.STORAGE_KEY);
        return saved || CONFIG.DEFAULT_THEME;
    }
    
    saveTheme(theme) {
        localStorage.setItem(CONFIG.STORAGE_KEY, theme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.saveTheme(theme);
        this.updateActiveButton(theme);
    }
    
    createThemeSwitcher() {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.innerHTML = `
            <div class="theme-switcher-title">🎨 Themes</div>
            <div class="theme-buttons">
                <button class="theme-btn" data-theme="${CONFIG.THEMES.RETRO_ARCADE}">
                    ⚡ Retro Arcade
                </button>
                <button class="theme-btn" data-theme="${CONFIG.THEMES.ELEGANT_CLUB}">
                    🎩 Elegant Club
                </button>
                <button class="theme-btn" data-theme="${CONFIG.THEMES.MODERN_MINIMAL}">
                    ✨ Modern Minimal
                </button>
                <button class="theme-btn" data-theme="${CONFIG.THEMES.MYSTICAL_DARK}">
                    🌙 Mystical Dark
                </button>
            </div>
        `;
        
        document.body.appendChild(switcher);
        
        // Add event listeners
        const buttons = switcher.querySelectorAll('.theme-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                this.applyTheme(theme);
            });
        });
        
        // Set active button
        this.updateActiveButton(this.currentTheme);
    }
    
    updateActiveButton(theme) {
        const buttons = document.querySelectorAll('.theme-btn');
        buttons.forEach(btn => {
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
}

// ===== DOM READY INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager first
    const themeManager = new ThemeManager();
    
    // Initialize all other features
    initStarfield();
    initParticles();
    initPreloader();
    initEasterEgg();
    initFooterGameButton();
    initMascot();
    initNewEasterEggs();
});

// ===== STARFIELD BACKGROUND =====
function initStarfield() {
    const starfield = document.createElement('div');
    starfield.id = 'starfield';
    starfield.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(starfield);
    
    for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            background: currentColor;
            border-radius: 50%;
            animation: starTwinkle ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: 0.4;
            color: var(--text-muted, #a0a0cc);
        `;
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        const size = 1 + Math.random() * 2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        starfield.appendChild(star);
    }
    
    // Add keyframes for star twinkling
    if (!document.getElementById('star-keyframes')) {
        const style = document.createElement('style');
        style.id = 'star-keyframes';
        style.textContent = `
            @keyframes starTwinkle {
                0%, 100% { opacity: 0.2; transform: scale(1); }
                50% { opacity: 0.6; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== PRELOADER =====
function initPreloader() {
    if (document.readyState === 'complete') {
        return;
    }
    
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary, #0a0014);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 100000;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div class="preloader-content" style="text-align: center;">
            <div class="preloader-logo" style="
                font-family: 'Press Start 2P', monospace;
                font-size: 1rem;
                color: var(--color-cyan, #00ffff);
                letter-spacing: 0.1em;
                margin-bottom: 2rem;
                animation: fadeInUp 0.8s ease forwards;
            ">Magic Monday</div>
            <div class="preloader-spinner" style="
                width: 40px;
                height: 40px;
                border: 2px solid var(--glass-border, rgba(0, 255, 255, 0.3));
                border-top-color: var(--color-cyan, #00ffff);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto;
            "></div>
        </div>
    `;
    
    document.body.insertBefore(preloader, document.body.firstChild);
    document.body.classList.add('loading');
    
    // Add spinner animation
    if (!document.getElementById('spinner-keyframes')) {
        const style = document.createElement('style');
        style.id = 'spinner-keyframes';
        style.textContent = `
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            @keyframes fadeInUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            body.loading .container {
                opacity: 0;
                visibility: hidden;
            }
        `;
        document.head.appendChild(style);
    }
    
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.classList.remove('loading');
        
        setTimeout(function() {
            if (preloader.parentNode) {
                preloader.remove();
            }
        }, 500);
    });
}

// ===== PARTICLE EFFECTS =====
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
        createParticle(particleContainer);
    }
    
    // Create occasional sparks
    setInterval(function() {
        createSpark(particleContainer);
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--color-gold, #ffd700);
        border-radius: 50%;
        opacity: 0.6;
        box-shadow: 0 0 10px currentColor;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '-20px';
    
    const duration = 6 + Math.random() * 6;
    const drift = (Math.random() - 0.5) * 100;
    
    particle.style.animation = `floatParticle ${duration}s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 5 + 's';
    particle.style.setProperty('--drift-x', drift + 'px');
    
    container.appendChild(particle);
    
    setTimeout(function() {
        particle.remove();
        createParticle(container);
    }, (duration + 5) * 1000);
}

function createSpark(container) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--color-yellow, #ffff00);
        border-radius: 50%;
        box-shadow: 0 0 8px currentColor;
    `;
    
    spark.style.left = Math.random() * 100 + '%';
    spark.style.top = Math.random() * 100 + '%';
    
    const duration = 1 + Math.random() * 2;
    spark.style.animation = `sparkle ${duration}s ease-in-out infinite`;
    
    container.appendChild(spark);
    
    setTimeout(function() {
        spark.remove();
    }, duration * 1000);
}

// Add particle animations
if (!document.getElementById('particle-keyframes')) {
    const style = document.createElement('style');
    style.id = 'particle-keyframes';
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% {
                transform: translateY(0) translateX(0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            50% {
                transform: translateY(-100vh) translateX(var(--drift-x, 0px)) scale(1.5);
                opacity: 0.8;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-120vh) translateX(var(--drift-x, 0px)) scale(0.5);
                opacity: 0;
            }
        }
        
        @keyframes sparkle {
            0%, 100% {
                opacity: 0;
                transform: scale(0);
            }
            50% {
                opacity: 1;
                transform: scale(2);
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== EASTER EGG MINI-GAME =====
function initEasterEgg() {
    const overlay = document.createElement('div');
    overlay.id = 'easter-egg-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 10, 12, 0.95);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 100001;
        flex-direction: column;
        backdrop-filter: blur(10px);
    `;
    
    overlay.innerHTML = `
        <div class="mini-game-container" style="
            text-align: center;
            padding: 3rem;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 2px solid var(--glass-border);
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            box-shadow: var(--shadow-lg);
        ">
            <div class="mini-game-title" style="
                font-family: var(--font-pixel);
                font-size: 0.875rem;
                color: var(--color-cyan, #00ffff);
                margin-bottom: 1.5rem;
                line-height: 1.6;
            ">🎩 Hütchenspiel 🐰</div>
            <p class="game-instructions" style="margin-bottom: 1rem;">
                Finde den Hasen! Klicke auf einen Hut.
            </p>
            <div class="cups-container" style="
                display: flex;
                gap: 2rem;
                justify-content: center;
                margin: 2.5rem 0;
            ">
                <div class="cup" data-cup="1" style="
                    width: 80px;
                    height: 100px;
                    background: linear-gradient(180deg, #8c2a3d 0%, #6b1d2d 50%, #4a1420 100%);
                    border: 2px solid var(--color-gold, #ffd700);
                    border-radius: 0 0 40px 40px;
                    cursor: pointer;
                    transition: all 0.4s ease;
                    position: relative;
                    box-shadow: var(--shadow-md);
                ">
                    <span class="rabbit" style="
                        position: absolute;
                        bottom: -35px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 2.5rem;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    ">🐰</span>
                </div>
                <div class="cup" data-cup="2" style="
                    width: 80px;
                    height: 100px;
                    background: linear-gradient(180deg, #8c2a3d 0%, #6b1d2d 50%, #4a1420 100%);
                    border: 2px solid var(--color-gold, #ffd700);
                    border-radius: 0 0 40px 40px;
                    cursor: pointer;
                    transition: all 0.4s ease;
                    position: relative;
                    box-shadow: var(--shadow-md);
                ">
                    <span class="rabbit" style="
                        position: absolute;
                        bottom: -35px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 2.5rem;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    ">🐰</span>
                </div>
                <div class="cup" data-cup="3" style="
                    width: 80px;
                    height: 100px;
                    background: linear-gradient(180deg, #8c2a3d 0%, #6b1d2d 50%, #4a1420 100%);
                    border: 2px solid var(--color-gold, #ffd700);
                    border-radius: 0 0 40px 40px;
                    cursor: pointer;
                    transition: all 0.4s ease;
                    position: relative;
                    box-shadow: var(--shadow-md);
                ">
                    <span class="rabbit" style="
                        position: absolute;
                        bottom: -35px;
                        left: 50%;
                        transform: translateX(-50%);
                        font-size: 2.5rem;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    ">🐰</span>
                </div>
            </div>
            <p class="game-result" style="
                font-weight: 700;
                color: var(--color-gold, #ffd700);
                min-height: 1.5rem;
            "></p>
            <button class="close-game" style="
                font-family: var(--font-pixel);
                font-size: 0.5rem;
                color: var(--text-muted);
                background: transparent;
                border: 1px solid var(--glass-border);
                border-radius: 4px;
                padding: 0.75rem 1.5rem;
                cursor: pointer;
                margin-top: 1.5rem;
                transition: all 0.2s ease;
            ">Schließen</button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Make header image clickable
    const headerImage = document.querySelector('#head img');
    if (headerImage) {
        headerImage.style.cursor = 'pointer';
        headerImage.addEventListener('click', function(e) {
            const rect = headerImage.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const clickX = e.clientX - rect.left;
            
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
        
        // Hover effect
        cup.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        cup.addEventListener('mouseleave', function() {
            if (!this.classList.contains('lifted')) {
                this.style.transform = '';
            }
        });
    });
}

function initFooterGameButton() {
    const footer = document.getElementById('footer');
    if (footer) {
        const gameBtn = document.createElement('button');
        gameBtn.className = 'footer-game-btn';
        gameBtn.style.cssText = `
            display: inline-block;
            margin-top: 1rem;
            padding: 0.75rem 1.5rem;
            background: transparent;
            border: 2px solid var(--glass-border);
            color: var(--text-secondary);
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 8px;
        `;
        gameBtn.innerHTML = '🎩 Hütchenspiel spielen';
        gameBtn.addEventListener('click', openMiniGame);
        
        gameBtn.addEventListener('mouseenter', function() {
            this.style.background = 'var(--glass-border)';
            this.style.color = 'var(--text-primary)';
            this.style.transform = 'translateY(-2px)';
        });
        gameBtn.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.color = 'var(--text-secondary)';
            this.style.transform = '';
        });
        
        const brElement = document.createElement('br');
        footer.insertBefore(brElement, footer.firstChild);
        footer.insertBefore(gameBtn, footer.firstChild);
    }
}

function openMiniGame() {
    const overlay = document.getElementById('easter-egg-overlay');
    overlay.style.display = 'flex';
    resetGame();
}

function closeMiniGame() {
    const overlay = document.getElementById('easter-egg-overlay');
    overlay.style.display = 'none';
}

function resetGame() {
    const cups = document.querySelectorAll('.cup');
    const result = document.querySelector('.game-result');
    
    cups.forEach(function(cup) {
        cup.style.transform = '';
        cup.style.pointerEvents = 'auto';
        const rabbit = cup.querySelector('.rabbit');
        if (rabbit) rabbit.style.opacity = '0';
    });
    
    if (result) {
        result.textContent = '';
    }
    
    // Randomly place rabbit
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
    
    cups.forEach(function(cup) {
        cup.style.pointerEvents = 'none';
    });
    
    selectedCup.style.transform = 'translateY(-50px)';
    
    setTimeout(function() {
        if (selectedCup.dataset.hasRabbit === 'true') {
            const rabbit = selectedCup.querySelector('.rabbit');
            if (rabbit) rabbit.style.opacity = '1';
            if (result) {
                result.textContent = '🎉 Gewonnen! Du hast den Hasen gefunden!';
                result.style.color = 'var(--color-gold, #ffd700)';
            }
        } else {
            cups.forEach(function(cup) {
                if (cup.dataset.hasRabbit === 'true') {
                    cup.style.transform = 'translateY(-50px)';
                    const rabbit = cup.querySelector('.rabbit');
                    if (rabbit) rabbit.style.opacity = '1';
                }
            });
            if (result) {
                result.textContent = '😅 Der Hase war woanders!';
                result.style.color = 'var(--color-pink, #ff1493)';
            }
        }
        
        setTimeout(resetGame, 2500);
    }, 500);
}

// ===== ANIMATED MASCOT =====
let jokeIndex = 0;
const jokes = [
    "Willkommen zur Magic Monday Show! ✨",
    "Heute ist ein magischer Tag! 🎩",
    "Klick auf mich für mehr Magie! 🌟",
    "Abrakadabra! Simsalabim! 🪄",
    "Die beste Zaubershow in Frankfurt! 🎭",
    "Entdecke versteckte Easter Eggs! 🥚",
    "Halte Ausschau nach Geheimnissen... 👀",
    "Magische Momente warten auf dich! ✨"
];

function initMascot() {
    const mascotContainer = document.createElement('div');
    mascotContainer.id = 'mascot-container';
    mascotContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 10000;
        pointer-events: none;
    `;
    
    mascotContainer.innerHTML = `
        <div class="mascot" style="
            position: relative;
            width: 120px;
            height: 140px;
            cursor: pointer;
            pointer-events: auto;
            transition: transform 0.3s ease;
        ">
            <div class="top-hat" style="
                position: absolute;
                bottom: 40px;
                left: 50%;
                transform: translateX(-50%);
                width: 80px;
                height: 60px;
                background: linear-gradient(180deg, #1a1a1a 0%, #000 100%);
                border: 2px solid var(--color-gold, #ffd700);
                border-radius: 10px 10px 0 0;
                box-shadow: var(--shadow-md);
            "></div>
            <div class="eyes-container" style="
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: 60px;
                height: 30px;
                display: flex;
                justify-content: space-around;
                align-items: center;
                transition: transform 0.1s ease;
            ">
                <div class="eye" style="
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    position: relative;
                    border: 2px solid var(--color-gold, #ffd700);
                    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                ">
                    <div class="pupil" style="
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        background: #000;
                        border-radius: 50%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        transition: transform 0.1s ease;
                    "></div>
                </div>
                <div class="eye" style="
                    width: 20px;
                    height: 20px;
                    background: white;
                    border-radius: 50%;
                    position: relative;
                    border: 2px solid var(--color-gold, #ffd700);
                    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
                ">
                    <div class="pupil" style="
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        background: #000;
                        border-radius: 50%;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        transition: transform 0.1s ease;
                    "></div>
                </div>
            </div>
            <div class="speech-bubble" style="
                position: absolute;
                bottom: 150px;
                right: 0;
                background: var(--glass-bg);
                backdrop-filter: blur(20px);
                border: 2px solid var(--color-gold, #ffd700);
                border-radius: 12px;
                padding: 1rem 1.5rem;
                min-width: 200px;
                max-width: 300px;
                box-shadow: var(--shadow-md);
                opacity: 0;
                transform: translateX(20px);
                transition: opacity 0.3s ease, transform 0.3s ease;
                pointer-events: auto;
            ">
                <button class="close-bubble" style="
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: transparent;
                    border: none;
                    color: var(--color-gold, #ffd700);
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    line-height: 1;
                ">×</button>
                <p class="bubble-text" style="
                    font-size: 0.875rem;
                    margin: 0;
                    color: var(--text-primary);
                    line-height: 1.6;
                "></p>
            </div>
        </div>
    `;
    
    document.body.appendChild(mascotContainer);
    
    const mascot = mascotContainer.querySelector('.mascot');
    const eyes = mascotContainer.querySelectorAll('.eye');
    const pupils = mascotContainer.querySelectorAll('.pupil');
    const eyesContainer = mascotContainer.querySelector('.eyes-container');
    const speechBubble = mascotContainer.querySelector('.speech-bubble');
    const bubbleText = mascotContainer.querySelector('.bubble-text');
    const closeBubble = mascotContainer.querySelector('.close-bubble');
    
    // Eye tracking
    document.addEventListener('mousemove', function(e) {
        const mascotRect = mascot.getBoundingClientRect();
        const mascotCenterX = mascotRect.left + mascotRect.width / 2;
        const mascotCenterY = mascotRect.top + mascotRect.height / 2;
        
        const angle = Math.atan2(e.clientY - mascotCenterY, e.clientX - mascotCenterX);
        const distance = Math.min(4, Math.hypot(e.clientX - mascotCenterX, e.clientY - mascotCenterY) / 100);
        
        pupils.forEach(function(pupil) {
            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;
            pupil.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
        });
    });
    
    // Blinking animation
    setInterval(function() {
        eyes.forEach(function(eye) {
            eye.style.transform = 'scaleY(0.1)';
        });
        setTimeout(function() {
            eyes.forEach(function(eye) {
                eye.style.transform = 'scaleY(1)';
            });
        }, 150);
    }, 4000);
    
    // Show speech bubble on click
    mascot.addEventListener('click', function() {
        bubbleText.textContent = jokes[jokeIndex];
        jokeIndex = (jokeIndex + 1) % jokes.length;
        speechBubble.style.opacity = '1';
        speechBubble.style.transform = 'translateX(0)';
        
        setTimeout(function() {
            speechBubble.style.opacity = '0';
            speechBubble.style.transform = 'translateX(20px)';
        }, 5000);
    });
    
    // Hover effect
    mascot.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-5px)';
    });
    mascot.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    closeBubble.addEventListener('click', function(e) {
        e.stopPropagation();
        speechBubble.style.opacity = '0';
        speechBubble.style.transform = 'translateX(20px)';
    });
    
    closeBubble.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(90deg)';
    });
    closeBubble.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    // Show initial message
    setTimeout(function() {
        bubbleText.textContent = jokes[0];
        jokeIndex = 1;
        speechBubble.style.opacity = '1';
        speechBubble.style.transform = 'translateX(0)';
        
        setTimeout(function() {
            speechBubble.style.opacity = '0';
            speechBubble.style.transform = 'translateX(20px)';
        }, 5000);
    }, 3000);
}

// ===== ADDITIONAL EASTER EGGS =====
function initNewEasterEggs() {
    initSpellEasterEgg();
    initParticleBurstEasterEgg();
}

// Magic Spell Easter Egg
let spellBuffer = '';
let spellTimeout = null;

function initSpellEasterEgg() {
    document.addEventListener('keypress', function(e) {
        clearTimeout(spellTimeout);
        spellBuffer += e.key.toLowerCase();
        
        if (spellBuffer.length > 15) {
            spellBuffer = spellBuffer.substring(spellBuffer.length - 15);
        }
        
        if (spellBuffer.includes('abracadabra')) {
            showSpellEasterEgg();
            spellBuffer = '';
        }
        
        spellTimeout = setTimeout(function() {
            spellBuffer = '';
        }, 2000);
    });
}

function showSpellEasterEgg() {
    alert('🪄 ZAUBERSPRUCH AKTIVIERT! ✨\n\nDu hast das magische Wort gesprochen:\nABRACADABRA!');
}

// Particle Burst Easter Egg
function initParticleBurstEasterEgg() {
    document.addEventListener('keydown', function(e) {
        if (e.shiftKey && e.key.toLowerCase() === 'm') {
            triggerParticleBurst();
        }
    });
}

function triggerParticleBurst() {
    const burst = document.createElement('div');
    burst.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(burst);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: var(--color-gold, #ffd700);
            border-radius: 50%;
            box-shadow: 0 0 10px currentColor;
        `;
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 50 + Math.random() * 150;
        const duration = 0.5 + Math.random() * 0.5;
        
        burst.appendChild(particle);
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        });
    }
    
    setTimeout(function() {
        burst.remove();
    }, 1500);
}

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    
    if (konamiCode.length > 10) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        openMiniGame();
        konamiCode = [];
    }
});
