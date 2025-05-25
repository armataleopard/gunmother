// Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false
    });

    // Create and preload sound effects
    const sounds = {
        gunshot: new Audio('https://www.soundjay.com/gun/sounds/gun-gunshot-01.mp3'),
        explosion: new Audio('https://www.soundjay.com/explosion/sounds/explosion-01.mp3'),
        click: new Audio('https://www.soundjay.com/button/sounds/button-3.mp3')
    };

    // Lower volume for sounds
    Object.values(sounds).forEach(sound => {
        sound.volume = 0.3;
    });

    // Handle Lore Button
    const loreButton = document.getElementById('lore-button');
    const loreReveal = document.getElementById('lore-reveal');
    
    if (loreButton && loreReveal) {
        loreButton.addEventListener('click', function() {
            sounds.explosion.play();
            loreReveal.classList.toggle('hidden');
            setTimeout(() => {
                loreReveal.classList.toggle('show');
            }, 100);
        });
    }

    // Add sound effects to buttons
    const buttons = document.querySelectorAll('button, .cta-nav');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            sounds.click.play();
        });
        
        button.addEventListener('click', () => {
            if (button !== loreButton) {
                sounds.gunshot.play();
            }
        });
    });

    // Show graffiti tags on scroll
    const graffitiTags = document.querySelectorAll('.graffiti');
    
    function showGraffitiOnScroll() {
        graffitiTags.forEach(tag => {
            const tagPosition = tag.getBoundingClientRect();
            if (tagPosition.top < window.innerHeight) {
                setTimeout(() => {
                    tag.classList.add('show-graffiti');
                }, Math.random() * 1000);
            }
        });
    }

    window.addEventListener('scroll', showGraffitiOnScroll);
    
    // Trigger once on load
    showGraffitiOnScroll();

    // Glitch effect for gallery images
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    function applyGlitchEffect() {
        const randomItem = galleryItems[Math.floor(Math.random() * galleryItems.length)];
        
        randomItem.style.filter = 'hue-rotate(90deg) brightness(1.5)';
        
        setTimeout(() => {
            randomItem.style.filter = '';
        }, 100);
    }
    
    // Apply glitch effect at random intervals
    setInterval(applyGlitchEffect, 3000);

    // Explosive cursor effect
    document.addEventListener('click', createExplosion);

    function createExplosion(event) {
        const explosion = document.createElement('div');
        explosion.className = 'cursor-explosion';
        
        // Position the explosion at click coordinates
        explosion.style.left = `${event.clientX}px`;
        explosion.style.top = `${event.clientY}px`;
        
        // Add the explosion to the DOM
        document.body.appendChild(explosion);
        
        // Remove after animation completes
        setTimeout(() => {
            explosion.remove();
        }, 1000);
    }

    // Add CSS for the explosion effect
    const explosionStyle = document.createElement('style');
    explosionStyle.innerHTML = `
        .cursor-explosion {
            position: fixed;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: radial-gradient(circle, var(--neon-green), var(--red));
            transform: scale(0);
            z-index: 9999;
            pointer-events: none;
            animation: explode 0.8s ease-out forwards;
        }
        
        @keyframes explode {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            50% {
                opacity: 0.8;
            }
            100% {
                transform: scale(15);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(explosionStyle);

    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                sounds.gunshot.play();
            }
        });
    });

    // Add floating bullet animations
    createFloatingElements('💥', 5);
    createFloatingElements('🔫', 3);
    createFloatingElements('💰', 4);

    function createFloatingElements(emoji, count) {
        const floatingStyle = document.createElement('style');
        floatingStyle.innerHTML = `
            .floating-element {
                position: fixed;
                font-size: 24px;
                pointer-events: none;
                z-index: 999;
                animation: float 15s linear infinite;
                opacity: 0.7;
            }
            
            @keyframes float {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                }
            }
        `;
        
        document.head.appendChild(floatingStyle);
        
        for (let i = 0; i < count; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.textContent = emoji;
            
            // Random horizontal position
            element.style.left = `${Math.random() * 100}vw`;
            
            // Random animation duration
            const duration = 15 + Math.random() * 15;
            element.style.animationDuration = `${duration}s`;
            
            // Random size
            const size = 24 + Math.random() * 24;
            element.style.fontSize = `${size}px`;
            
            // Random starting position
            element.style.top = `${100 + Math.random() * 100}vh`;
            
            document.body.appendChild(element);
        }
    }
}); 