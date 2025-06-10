// Web Desa Kapoya - Clean JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏘️ Website Desa Kapoya loaded successfully!');
    
    // Initialize functions
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initAnimatedText();
    initHeroButtons();
    
    // Welcome message
    setTimeout(() => {
        showNotification('Selamat datang di Website Desa Kapoya! 🏘️', 'success');
    }, 1000);
});

// Animated Text for index.html
function initAnimatedText() {
    const animatedTextContainer = document.getElementById('animated-text');
    if (animatedTextContainer) {
        animateText();
    }
}

function animateText() {
    const text = "Kapoya_Banamange";
    const container = document.getElementById('animated-text');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i] === '_' ? ' ' : text[i];
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        span.style.transition = 'all 0.3s ease';
        span.style.display = 'inline-block';
        container.appendChild(span);
        
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, i * 100);
    }
    
    // Reset animation after completion
    setTimeout(() => {
        animateText();
    }, text.length * 100 + 2000);
}

// Mobile Menu - Simplified and Fixed
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-button');
    
    if (!menuBtn) return;
    
    // Create mobile menu if not exists
    if (!document.getElementById('mobile-menu')) {
        createMobileMenu();
    }
    
    // Simple click handler - remove all complex event handling
    menuBtn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const menu = document.getElementById('mobile-menu');
        if (!menu) return;
        
        if (menu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    };
    
    // Add CSS to ensure button is clickable
    menuBtn.style.cursor = 'pointer';
    menuBtn.style.userSelect = 'none';
    menuBtn.style.webkitUserSelect = 'none';
    menuBtn.style.touchAction = 'manipulation';
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('mobile-menu');
        if (menu && menu.classList.contains('active') && 
            !menu.contains(e.target) && !menuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

function createMobileMenu() {
    // Remove existing menu if any
    const existingMenu = document.getElementById('mobile-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    const mobileMenuHTML = `
        <div id="mobile-menu" class="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl transform translate-x-full transition-transform duration-300 z-[9999]">
            <button class="mobile-menu-close absolute top-4 right-4 text-gray-600 hover:text-gray-800 w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100" type="button">
                <i class="fas fa-times text-xl"></i>
            </button>
            <div class="pt-16 px-6">
                <div class="mb-8">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">Menu Navigasi</h3>
                    <div class="w-12 h-1 bg-blue-500"></div>
                </div>
                <ul class="space-y-1">
                    <li><a href="index.html" class="mobile-menu-link block py-4 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"><i class="fas fa-home mr-3"></i>Beranda</a></li>
                    <li><a href="profile.html" class="mobile-menu-link block py-4 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"><i class="fas fa-info-circle mr-3"></i>Profil Desa</a></li>
                    <li><a href="services.html" class="mobile-menu-link block py-4 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"><i class="fas fa-cogs mr-3"></i>Pelayanan</a></li>
                    <li><a href="news.html" class="mobile-menu-link block py-4 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"><i class="fas fa-newspaper mr-3"></i>Berita</a></li>
                    <li><a href="gallery.html" class="mobile-menu-link block py-4 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"><i class="fas fa-images mr-3"></i>Galeri</a></li>
                    <li><a href="contact.html" class="mobile-menu-link block py-4 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"><i class="fas fa-envelope mr-3"></i>Kontak</a></li>
                </ul>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', mobileMenuHTML);
    
    // Simple close button handler
    const closeBtn = document.querySelector('.mobile-menu-close');
    if (closeBtn) {
        closeBtn.onclick = function(e) {
            e.preventDefault();
            closeMobileMenu();
        };
    }
    
    // Simple menu link handlers
    document.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.onclick = function(e) {
            const href = this.getAttribute('href');
            closeMobileMenu();
            
            setTimeout(() => {
                window.location.href = href;
            }, 100);
        };
    });
}

function openMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-button');
    
    if (menu && menuBtn) {
        menu.classList.add('active');
        menu.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
        menuBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
        
        console.log('Mobile menu opened'); // Debug log
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-button');
    
    if (menu && menuBtn) {
        menu.classList.remove('active');
        menu.style.transform = 'translateX(100%)';
        document.body.style.overflow = '';
        menuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
        
        console.log('Mobile menu closed'); // Debug log
    }
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    // Add animations to elements
    document.querySelectorAll('.fade-in, .card').forEach(el => {
        observer.observe(el);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };
    
    notification.className = `fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg z-50 text-white transform translate-x-full transition-transform duration-300 ${colors[type]}`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show
    setTimeout(() => notification.classList.remove('translate-x-full'), 100);
    
    // Auto hide
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Hero Buttons Functionality
function initHeroButtons() {
    // Fix hero buttons clickability
    const heroButtons = document.querySelectorAll('.hero-section a');
    
    heroButtons.forEach(button => {
        // Ensure buttons are clickable
        button.style.pointerEvents = 'auto';
        button.style.position = 'relative';
        button.style.zIndex = '10';
        
        // Add click handlers
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Handle different link types
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else if (href && href.endsWith('.html')) {
                // For internal links, ensure they work
                window.location.href = href;
            } else if (href && href.startsWith('http')) {
                // For external links
                window.open(href, '_blank');
            }
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Specific handlers for hero section buttons
    const exploreBtn = document.querySelector('a[href="profile.html"]');
    const contactBtn = document.querySelector('a[href="contact.html"]');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Mengarahkan ke halaman Profil Desa...', 'info');
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 500);
        });
    }
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Mengarahkan ke halaman Kontak...', 'info');
            setTimeout(() => {
                window.location.href = 'contact.html';
            }, 500);
        });
    }
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.classList.add('shadow-lg');
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.90)';
        header.classList.remove('shadow-lg');
    }
});

// Export for global use
window.showNotification = showNotification;
window.animateText = animateText;
window.initHeroButtons = initHeroButtons;
