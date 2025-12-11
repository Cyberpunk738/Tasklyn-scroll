// Tasklyn Web3 Website - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navMenu.classList.toggle('show');
            navToggle.classList.toggle('active');
            
            // Debug logging
            console.log('Toggle clicked, menu show:', navMenu.classList.contains('show'));
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navToggle && navMenu && !navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        }
    });

    // Close mobile menu when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            navToggle.classList.remove('active');
        }
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .workflow-step, .blockchain-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax Effect for Hero Section (disabled - keeping grid static)
    const heroBackground = document.querySelector('.hero-background');
    
    function handleParallax() {
        // Parallax disabled - grid stays static
        // if (window.innerWidth > 768) { // Only on tablets and larger
        //     window.addEventListener('scroll', function() {
        //         const scrolled = window.pageYOffset;
        //         const rate = scrolled * -0.5;
        //         
        //         if (heroBackground) {
        //             heroBackground.style.transform = `translateY(${rate}px)`;
        //         }
        //     });
        // }
    }
    
    handleParallax();

    // Interactive Blockchain Visual
    const chainItems = document.querySelectorAll('.chain-item');
    
    chainItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) { // Only on larger screens
                this.style.transform = 'translateY(-10px) scale(1.05)';
                this.style.borderColor = 'var(--primary)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) { // Only on larger screens
                this.style.transform = 'translateY(0) scale(1)';
                this.style.borderColor = 'var(--border-primary)';
            }
        });
    });

    // Form Submission
    const ctaForm = document.querySelector('.cta-form');
    
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.form-input');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show success message
                showNotification('Success! You\'ve been added to the waitlist.', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }

    // Email Validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Responsive positioning
        const isMobile = window.innerWidth <= 768;
        const topPosition = isMobile ? '80px' : '100px';
        const rightPosition = isMobile ? '10px' : '20px';
        const maxWidth = isMobile ? 'calc(100vw - 20px)' : '300px';
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: ${topPosition};
            right: ${rightPosition};
            background: ${type === 'success' ? 'var(--secondary)' : type === 'error' ? 'var(--warning)' : 'var(--primary)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: ${maxWidth};
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
    }

    // Button Hover Effects (only on larger screens)
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        if (window.innerWidth > 768) {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        }
    });

    // Feature Card Interactions (only on larger screens)
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        if (window.innerWidth > 768) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.borderColor = 'var(--primary)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.borderColor = 'var(--border-secondary)';
            });
        }
    });

    // Blockchain Card Interactions (only on larger screens)
    const blockchainCards = document.querySelectorAll('.blockchain-card');
    
    blockchainCards.forEach(card => {
        if (window.innerWidth > 768) {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.borderColor = 'var(--primary)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.borderColor = 'var(--border-secondary)';
            });
        }
    });

    // Smooth Reveal Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateNumber(element) {
        const finalNumber = element.textContent;
        const isInfinity = finalNumber === '∞';
        const isPercentage = finalNumber.includes('%');
        
        if (isInfinity) {
            element.textContent = '∞';
            return;
        }
        
        const numericValue = parseInt(finalNumber.replace('%', ''));
        let currentValue = 0;
        const increment = numericValue / 50;
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                currentValue = numericValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentValue) + (isPercentage ? '%' : '');
        }, 30);
    }

    // Responsive touch interactions for mobile/tablet
    function addTouchInteractions() {
        if (window.innerWidth <= 1024) { // Tablets and mobile
            // Add touch feedback for cards
            const touchCards = document.querySelectorAll('.feature-card, .blockchain-card, .workflow-step');
            
            touchCards.forEach(card => {
                card.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                    this.style.transition = 'transform 0.1s ease';
                });
                
                card.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                    this.style.transition = 'transform 0.3s ease';
                });
            });
            
            // Add touch feedback for buttons
            const touchButtons = document.querySelectorAll('.btn');
            
            touchButtons.forEach(button => {
                button.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.95)';
                    this.style.transition = 'transform 0.1s ease';
                });
                
                button.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                    this.style.transition = 'transform 0.3s ease';
                });
            });
        }
    }
    
    addTouchInteractions();

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reinitialize touch interactions on resize
            addTouchInteractions();
            
            // Reinitialize parallax
            handleParallax();
        }, 250);
    });

    // Initialize AOS-like animations
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        
        elements.forEach(element => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        element.classList.add('aos-animate');
                    }
                });
            });
            
            observer.observe(element);
        });
    }

    // Call initialization
    initScrollAnimations();
    
    // Debug: Log navigation elements
    console.log('Navigation elements found:', {
        navToggle: navToggle,
        navMenu: navMenu,
        navLinks: navLinks.length
    });
});

// Add some Web3-specific interactions
document.addEventListener('DOMContentLoaded', function() {
    // Simulate blockchain connection
    const connectWalletBtn = document.querySelector('.btn-outline');
    
    if (connectWalletBtn) {
        connectWalletBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            this.disabled = true;
            
            // Simulate connection delay
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Connected';
                this.style.background = 'var(--gradient-secondary)';
                this.style.borderColor = 'var(--secondary)';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-wallet"></i> Connect Wallet';
                    this.style.background = 'transparent';
                    this.style.borderColor = 'var(--border-primary)';
                    this.disabled = false;
                }, 3000);
            }, 2000);
        });
    }

    // Add particle effect to hero section (only on larger screens)
    function createParticle() {
        if (window.innerWidth > 768) { // Only on tablets and larger
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--primary);
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.6;
            `;
            
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.appendChild(particle);
                
                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * window.innerHeight;
                const endX = startX + (Math.random() - 0.5) * 200;
                const endY = startY + (Math.random() - 0.5) * 200;
                
                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';
                
                particle.animate([
                    { transform: 'translate(0, 0)', opacity: 0.6 },
                    { transform: `translate(${endX - startX}px, ${endY - startY}px)`, opacity: 0 }
                ], {
                    duration: 3000 + Math.random() * 2000,
                    easing: 'ease-out'
                }).onfinish = () => {
                    particle.remove();
                };
            }
        }
    }

    // Create particles periodically (only on larger screens)
    if (window.innerWidth > 768) {
        setInterval(createParticle, 1000);
    }

    // Responsive form handling
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary)';
            this.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'var(--border-primary)';
            this.style.boxShadow = 'none';
        });
        
        // Add mobile-specific handling
        if (window.innerWidth <= 768) {
            input.addEventListener('focus', function() {
                // Scroll to input on mobile to ensure it's visible
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
        }
    });

    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate layout after orientation change
            window.dispatchEvent(new Event('resize'));
        }, 100);
    });
});
