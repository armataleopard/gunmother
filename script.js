// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add more floating elements randomly
    createFloatingElements();
    
    // Setup chaos mode
    setupChaosMode();
    
    // Add sound effects
    setupSoundEffects();
    
    // Random animations for elements
    randomizeAnimations();
});

// Create additional floating elements
function createFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    const maxElements = 15;
    
    // Add more bubbles
    for (let i = 0; i < maxElements; i++) {
        // Create bubble
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random size
        const size = Math.random() * 40 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random position
        bubble.style.left = `${Math.random() * 100}%`;
        bubble.style.top = `${Math.random() * 100}%`;
        
        // Random animation delay
        bubble.style.animationDelay = `${Math.random() * 10}s`;
        
        floatingContainer.appendChild(bubble);
        
        // Add some fish and cash occasionally
        if (i % 5 === 0) {
            const fish = document.createElement('div');
            fish.classList.add('fish');
            if (Math.random() > 0.5) fish.classList.add('reverse');
            fish.style.top = `${Math.random() * 100}%`;
            fish.style.animationDuration = `${15 + Math.random() * 10}s`;
            floatingContainer.appendChild(fish);
        }
        
        if (i % 7 === 0) {
            const cash = document.createElement('div');
            cash.classList.add('cash');
            cash.style.left = `${Math.random() * 100}%`;
            cash.style.top = `-20px`;
            cash.style.animationDelay = `${Math.random() * 5}s`;
            floatingContainer.appendChild(cash);
        }
    }
}

// Setup the chaos mode overlay
function setupChaosMode() {
    const triggerBtn = document.getElementById('triggerChaos');
    const closeBtn = document.getElementById('closeChaos');
    const chaosOverlay = document.getElementById('chaosOverlay');
    
    // Show chaos overlay when trigger button is clicked
    triggerBtn.addEventListener('click', function() {
        chaosOverlay.style.display = 'block';
        playSound('chaos');
        
        // Create flashing effect
        document.body.classList.add('chaos-active');
        
        // Randomize positions of chaos images every second
        const chaosInterval = setInterval(randomizeChaosImages, 500);
        
        // Store interval ID for cleanup
        chaosOverlay.dataset.intervalId = chaosInterval;
    });
    
    // Hide chaos overlay when close button is clicked
    closeBtn.addEventListener('click', function() {
        chaosOverlay.style.display = 'none';
        document.body.classList.remove('chaos-active');
        
        // Clear the interval
        clearInterval(parseInt(chaosOverlay.dataset.intervalId));
        
        playSound('stop');
    });
}

// Randomize positions of chaos images
function randomizeChaosImages() {
    const chaosImages = document.querySelectorAll('.chaos-img');
    
    chaosImages.forEach(img => {
        img.style.top = `${Math.random() * 90}%`;
        img.style.left = `${Math.random() * 90}%`;
        img.style.transform = `scale(${Math.random() + 0.5}) rotate(${Math.random() * 360}deg)`;
        img.style.filter = `hue-rotate(${Math.random() * 360}deg) contrast(${Math.random() + 1.5}) brightness(${Math.random() + 1})`;
    });
}

// Setup sound effects
function setupSoundEffects() {
    // Create audio elements
    const bubbleSound = createAudio('bubble', 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
    const cashSound = createAudio('cash', 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
    const chaosSound = createAudio('chaos', 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
    const stopSound = createAudio('stop', 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=');
    
    // Add event listeners for interactive elements
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.addEventListener('mouseenter', () => playSound('bubble'));
    });
    
    document.querySelectorAll('.cash').forEach(cash => {
        cash.addEventListener('mouseenter', () => playSound('cash'));
    });
}

// Create audio element
function createAudio(id, src) {
    const audio = document.createElement('audio');
    audio.id = id;
    audio.src = src;
    audio.preload = 'auto';
    document.body.appendChild(audio);
    return audio;
}

// Play sound
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Audio play failed:', e));
    }
}

// Randomize animations for elements
function randomizeAnimations() {
    // Make logo animation more dynamic
    const logo = document.querySelector('.logo');
    logo.addEventListener('mouseover', function() {
        this.style.animationDuration = `${Math.random() * 0.5 + 0.2}s`;
    });
    
    // Add hover effects to meme images
    document.querySelectorAll('.meme-img').forEach(img => {
        img.addEventListener('mouseover', function() {
            this.style.filter = `brightness(${Math.random() + 1}) contrast(${Math.random() + 1}) hue-rotate(${Math.random() * 360}deg)`;
        });
        
        img.addEventListener('mouseout', function() {
            this.style.filter = '';
        });
    });
    
    // Make CTA button more dynamic
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('mouseover', function() {
        this.style.transform = `scale(1.1) rotate(${Math.random() * 5 - 2.5}deg)`;
    });
    
    ctaButton.addEventListener('mouseout', function() {
        this.style.transform = '';
    });
    
    // Add scroll animation effects
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax effect for banner
        const banner = document.querySelector('.banner');
        if (banner) {
            banner.style.transform = `rotate(${scrollPosition * 0.05}deg)`;
        }
        
        // Animate timeline items when they come into view
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    });
}

// Create twinkling stars in the background
function createStars() {
    const starsContainer = document.createElement('div');
    starsContainer.classList.add('stars-container');
    document.body.appendChild(starsContainer);
    
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        starsContainer.appendChild(star);
    }
}

// Easter egg: Konami code
let konamiIndex = 0;
const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // up up down down left right left right B A
document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Activate super chaos mode
            document.body.classList.add('super-chaos');
            document.getElementById('triggerChaos').click();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
}); 