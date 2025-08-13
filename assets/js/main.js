// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or prefer color scheme
const currentTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
html.setAttribute('data-bs-theme', currentTheme);

// Update toggle icon
function updateToggleIcon() {
    const isDark = html.getAttribute('data-bs-theme') === 'dark';
    themeToggle.querySelector('.fa-moon').style.display = isDark ? 'none' : 'inline-block';
    themeToggle.querySelector('.fa-sun').style.display = isDark ? 'inline-block' : 'none';
}

// Initialize
updateToggleIcon();

// Toggle theme
themeToggle.addEventListener('click', () => {
    const newTheme = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon();
});

// Dynamic Background
function initDynamicBackground() {
    const body = document.body;
    const colors = [
        'rgba(108, 99, 255, 0.1)',
        'rgba(255, 101, 132, 0.1)',
        'rgba(101, 255, 178, 0.1)',
        'rgba(255, 203, 101, 0.1)'
    ];
    
    let currentIndex = 0;
    
    function updateBackground() {
        body.style.setProperty('--dynamic-bg', colors[currentIndex]);
        currentIndex = (currentIndex + 1) % colors.length;
    }
    
    updateBackground();
    setInterval(updateBackground, 10000);
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.glass-nav');
    const scrollClass = 'scrolled';
    const scrollTrigger = 100;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollTrigger) {
            navbar.classList.add(scrollClass);
        } else {
            navbar.classList.remove(scrollClass);
        }
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = document.querySelector('.glass-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate Stats Counting
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const start = 0;
                const increment = target / (duration / 16);
                let current = start;
                
                const timer = setInterval(() => {
                    current += increment;
                    stat.textContent = Math.floor(current);
                    
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    }
                }, 16);
                
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    initDynamicBackground();
    initNavbarScroll();
    initSmoothScroll();
    
    // Remove preloader after everything loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.querySelector('.preloader').classList.add('loaded');
        }, 500);
    });
});