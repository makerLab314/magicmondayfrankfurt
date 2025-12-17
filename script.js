// Magic Monday Frankfurt - Premium Brand Identity
// Elegant, Modern, and Sophisticated Effects

// Configuration constants
const CONFIG = {
    STAR_COUNT: 40, // Number of stars in background (subtle)
    PARTICLE_COUNT: 20, // Floating magic particles
    CUP_GAME_AREA: {
        TOP_PERCENTAGE: 0.6,
        LEFT_PERCENTAGE: 0.3,
        RIGHT_PERCENTAGE: 0.7
    }
};

document.addEventListener('DOMContentLoaded', function() {
    initStarfield();
    initParticles();
    initPreloader();
    initEasterEgg();
    initFooterGameButton();
    initMascot();
    initNewEasterEggs();
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

// ===== MAGICAL PARTICLE EFFECTS =====
function initParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.id = 'particle-container';
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
    
    // Random horizontal position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.bottom = '-20px';
    
    // Random animation duration (6-12 seconds)
    const duration = 6 + Math.random() * 6;
    particle.style.setProperty('--float-duration', duration + 's');
    
    // Random horizontal drift (-50px to 50px)
    const drift = (Math.random() - 0.5) * 100;
    particle.style.setProperty('--drift-x', drift + 'px');
    
    // Random delay
    particle.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(particle);
    
    // Remove and recreate after animation
    setTimeout(function() {
        particle.remove();
        createParticle(container);
    }, (duration + 5) * 1000);
}

function createSpark(container) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    
    // Random position
    spark.style.left = Math.random() * 100 + '%';
    spark.style.top = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = 1 + Math.random() * 2;
    spark.style.setProperty('--sparkle-duration', duration + 's');
    
    container.appendChild(spark);
    
    // Remove after animation
    setTimeout(function() {
        spark.remove();
    }, duration * 1000);
}

// ===== ANIMATED MASCOT - TOP HAT WITH EYES =====
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
    mascotContainer.innerHTML = `
        <div class="mascot">
            <div class="top-hat">
                <div class="hat-band"></div>
            </div>
            <div class="eyes-container">
                <div class="eye">
                    <div class="pupil"></div>
                </div>
                <div class="eye">
                    <div class="pupil"></div>
                </div>
            </div>
            <div class="magic-wand"></div>
            <div class="speech-bubble">
                <button class="close-bubble">×</button>
                <p class="bubble-text"></p>
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
        
        // Slight head tilt
        const tiltX = (e.clientY - mascotCenterY) / 100;
        const tiltY = -(e.clientX - mascotCenterX) / 100;
        eyesContainer.style.transform = `translateX(-50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });
    
    // Blinking animation
    setInterval(function() {
        eyes.forEach(function(eye) {
            eye.classList.add('blinking');
        });
        setTimeout(function() {
            eyes.forEach(function(eye) {
                eye.classList.remove('blinking');
            });
        }, 300);
    }, 4000);
    
    // Show speech bubble on click
    mascot.addEventListener('click', function() {
        bubbleText.textContent = jokes[jokeIndex];
        jokeIndex = (jokeIndex + 1) % jokes.length;
        speechBubble.classList.add('visible');
        
        // Auto-hide after 5 seconds
        setTimeout(function() {
            speechBubble.classList.remove('visible');
        }, 5000);
    });
    
    closeBubble.addEventListener('click', function(e) {
        e.stopPropagation();
        speechBubble.classList.remove('visible');
    });
    
    // Show initial message after delay
    setTimeout(function() {
        bubbleText.textContent = jokes[0];
        jokeIndex = 1;
        speechBubble.classList.add('visible');
        
        setTimeout(function() {
            speechBubble.classList.remove('visible');
        }, 5000);
    }, 3000);
    
    // Periodic random messages
    setInterval(function() {
        if (!speechBubble.classList.contains('visible')) {
            bubbleText.textContent = jokes[jokeIndex];
            jokeIndex = (jokeIndex + 1) % jokes.length;
            speechBubble.classList.add('visible');
            
            setTimeout(function() {
                speechBubble.classList.remove('visible');
            }, 5000);
        }
    }, 30000); // Every 30 seconds
}

// ===== NEW EASTER EGGS - SLIDE FROM LEFT =====
function initNewEasterEggs() {
    // Easter Egg #2: Magic Spell Effect (type "abracadabra")
    initSpellEasterEgg();
    
    // Easter Egg #3: Disappearing Elements (click logo 5 times quickly)
    initDisappearingEasterEgg();
    
    // Easter Egg #4: Particle Burst (press Shift+M)
    initParticleBurstEasterEgg();
}

// Easter Egg #2: Magic Spell
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
    const panel = document.createElement('div');
    panel.className = 'easter-egg-panel active';
    panel.innerHTML = `
        <button class="easter-egg-close">✕ Schließen</button>
        <div class="easter-egg-content">
            <h2 class="easter-egg-title">🪄 ZAUBERSPRUCH AKTIVIERT! 🪄</h2>
            <p style="font-size: 1.2rem; margin: 2rem 0; font-family: 'Exo 2', sans-serif; font-weight: 700;">
                Du hast das magische Wort gesprochen!<br>
                <span style="color: var(--color-gold); font-size: 1.5rem;">ABRACADABRA!</span>
            </p>
            <div id="spell-particles" style="position: relative; height: 200px;"></div>
        </div>
    `;
    document.body.appendChild(panel);
    
    // Create burst of particles
    const particleContainer = panel.querySelector('#spell-particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = '50%';
        particle.style.top = '50%';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = 'var(--color-gold)';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 10px rgba(255, 215, 0, 1)';
        
        const angle = (Math.PI * 2 * i) / 50;
        const velocity = 50 + Math.random() * 100;
        const duration = 1 + Math.random();
        
        particle.animate([
            { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
            { 
                transform: `translate(calc(-50% + ${Math.cos(angle) * velocity}px), calc(-50% + ${Math.sin(angle) * velocity}px)) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: duration * 1000,
            easing: 'ease-out'
        });
        
        particleContainer.appendChild(particle);
    }
    
    panel.querySelector('.easter-egg-close').addEventListener('click', function() {
        panel.classList.remove('active');
        setTimeout(function() { panel.remove(); }, 600);
    });
}

// Easter Egg #3: Disappearing Elements
let logoClickCount = 0;
let logoClickTimeout = null;

function initDisappearingEasterEgg() {
    const logo = document.querySelector('#head img');
    if (!logo) return;
    
    logo.addEventListener('click', function(e) {
        // Skip if it's the cup game trigger area
        const rect = logo.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const clickX = e.clientX - rect.left;
        
        if (clickY < rect.height * CONFIG.CUP_GAME_AREA.TOP_PERCENTAGE && 
            clickX > rect.width * CONFIG.CUP_GAME_AREA.LEFT_PERCENTAGE && 
            clickX < rect.width * CONFIG.CUP_GAME_AREA.RIGHT_PERCENTAGE) {
            return; // This is the cup game area
        }
        
        clearTimeout(logoClickTimeout);
        logoClickCount++;
        
        if (logoClickCount >= 5) {
            showDisappearingEasterEgg();
            logoClickCount = 0;
        }
        
        logoClickTimeout = setTimeout(function() {
            logoClickCount = 0;
        }, 2000);
    });
}

function showDisappearingEasterEgg() {
    const panel = document.createElement('div');
    panel.className = 'easter-egg-panel active';
    panel.innerHTML = `
        <button class="easter-egg-close">✕ Schließen</button>
        <div class="easter-egg-content">
            <h2 class="easter-egg-title">👻 VERSCHWINDIBUS! 👻</h2>
            <p style="font-size: 1.2rem; margin: 2rem 0; font-family: 'Exo 2', sans-serif; font-weight: 700;">
                Lass etwas verschwinden!
            </p>
            <div style="display: flex; gap: 2rem; justify-content: center; flex-wrap: wrap; margin: 2rem 0;">
                <button class="vanish-btn" data-target="h1">Überschrift</button>
                <button class="vanish-btn" data-target="img">Bilder</button>
                <button class="vanish-btn" data-target="p">Text</button>
                <button class="vanish-btn" data-target=".star">Sterne</button>
            </div>
            <button class="restore-btn" style="margin-top: 1rem;">🔄 Alles zurück</button>
        </div>
    `;
    document.body.appendChild(panel);
    
    const vanishedElements = [];
    
    panel.querySelectorAll('.vanish-btn').forEach(function(btn) {
        btn.style.cssText = 'font-family: "Exo 2", sans-serif; font-size: 1rem; font-weight: 700; padding: 1rem 2rem; background: var(--color-bordeaux); color: white; border: 2px solid var(--color-gold); border-radius: 8px; cursor: pointer; transition: var(--transition-smooth);';
        
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            const elements = document.querySelectorAll(target);
            
            elements.forEach(function(el) {
                if (el.style.opacity !== '0') {
                    vanishedElements.push({ element: el, originalOpacity: el.style.opacity || '1' });
                    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    el.style.opacity = '0';
                    el.style.transform = 'scale(0) rotate(360deg)';
                }
            });
        });
        
        btn.addEventListener('mouseenter', function() {
            this.style.background = 'var(--color-gold)';
            this.style.color = 'var(--color-bg-dark)';
            this.style.transform = 'scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.background = 'var(--color-bordeaux)';
            this.style.color = 'white';
            this.style.transform = 'scale(1)';
        });
    });
    
    const restoreBtn = panel.querySelector('.restore-btn');
    restoreBtn.style.cssText = 'font-family: "Exo 2", sans-serif; font-size: 1rem; font-weight: 700; padding: 1rem 2rem; background: var(--color-gold); color: var(--color-bg-dark); border: 2px solid var(--color-gold); border-radius: 8px; cursor: pointer; transition: var(--transition-smooth);';
    
    restoreBtn.addEventListener('click', function() {
        vanishedElements.forEach(function(item) {
            item.element.style.opacity = item.originalOpacity;
            item.element.style.transform = 'scale(1) rotate(0deg)';
        });
        vanishedElements.length = 0;
    });
    
    panel.querySelector('.easter-egg-close').addEventListener('click', function() {
        // Restore all before closing
        vanishedElements.forEach(function(item) {
            item.element.style.opacity = item.originalOpacity;
            item.element.style.transform = 'scale(1) rotate(0deg)';
        });
        
        panel.classList.remove('active');
        setTimeout(function() { panel.remove(); }, 600);
    });
}

// Easter Egg #4: Particle Burst
function initParticleBurstEasterEgg() {
    document.addEventListener('keydown', function(e) {
        if (e.shiftKey && e.key.toLowerCase() === 'm') {
            showParticleBurstEasterEgg();
        }
    });
}

function showParticleBurstEasterEgg() {
    const panel = document.createElement('div');
    panel.className = 'easter-egg-panel active';
    panel.innerHTML = `
        <button class="easter-egg-close">✕ Schließen</button>
        <div class="easter-egg-content">
            <h2 class="easter-egg-title">⭐ MAGISCHE EXPLOSION! ⭐</h2>
            <p style="font-size: 1.2rem; margin: 2rem 0; font-family: 'Exo 2', sans-serif; font-weight: 700;">
                Klicke irgendwo für Feuerwerk!
            </p>
            <div id="burst-container" style="position: relative; height: 300px; cursor: crosshair; border: 2px solid var(--color-gold); border-radius: 8px; background: rgba(0, 0, 0, 0.3);"></div>
        </div>
    `;
    document.body.appendChild(panel);
    
    const burstContainer = panel.querySelector('#burst-container');
    
    burstContainer.addEventListener('click', function(e) {
        const rect = burstContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create burst at click position
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '6px';
            particle.style.height = '6px';
            particle.style.borderRadius = '50%';
            
            const colors = ['#FFD700', '#FFF4A3', '#FF6B6B', '#4ECDC4', '#95E1D3'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.boxShadow = `0 0 10px ${particle.style.background}`;
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = 50 + Math.random() * 150;
            const duration = 0.5 + Math.random() * 0.5;
            
            particle.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(1)', 
                    opacity: 1 
                },
                { 
                    transform: `translate(calc(-50% + ${Math.cos(angle) * velocity}px), calc(-50% + ${Math.sin(angle) * velocity}px)) scale(0)`,
                    opacity: 0 
                }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });
            
            burstContainer.appendChild(particle);
            
            setTimeout(function() { particle.remove(); }, duration * 1000);
        }
    });
    
    panel.querySelector('.easter-egg-close').addEventListener('click', function() {
        panel.classList.remove('active');
        setTimeout(function() { panel.remove(); }, 600);
    });
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
