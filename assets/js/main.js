// document.addEventListener('DOMContentLoaded', function() {
//   // Initialize Theme Manager
//   const themeToggle = document.getElementById('themeToggle');
//   const html = document.documentElement;

//   // Set initial theme
//   const currentTheme = localStorage.getItem('theme') || 
//                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
//   html.setAttribute('data-bs-theme', currentTheme);
//   updateToggleIcon();

//   // Theme toggle functionality
//   function updateToggleIcon() {
//     const isDark = html.getAttribute('data-bs-theme') === 'dark';
//     if (themeToggle) {
//       const moonIcon = themeToggle.querySelector('.fa-moon');
//       const sunIcon = themeToggle.querySelector('.fa-sun');
//       if (moonIcon) moonIcon.style.display = isDark ? 'none' : 'inline-block';
//       if (sunIcon) sunIcon.style.display = isDark ? 'inline-block' : 'none';
//     }
//   }

//   if (themeToggle) {
//     themeToggle.addEventListener('click', () => {
//       const newTheme = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
//       html.setAttribute('data-bs-theme', newTheme);
//       localStorage.setItem('theme', newTheme);
//       updateToggleIcon();
//     });
//   }

//   // Preloader functionality
//   const preloader = document.querySelector('.preloader');
//   if (preloader) {
//     // Hide preloader when all assets are loaded
//     window.addEventListener('load', function() {
//       // Add slight delay for smooth transition
//       setTimeout(function() {
//         preloader.style.opacity = '0';
//         preloader.style.visibility = 'hidden';
//         document.body.style.overflow = 'visible'; // Restore scrolling
//       }, 500);
//     });

//     // Fallback in case load event doesn't fire
//     setTimeout(function() {
//       if (preloader.style.opacity !== '0') {
//         preloader.style.opacity = '0';
//         preloader.style.visibility = 'hidden';
//         document.body.style.overflow = 'visible';
//       }
//     }, 3000); // 3 second timeout as fallback
//   }

//   // Navigation scroll effect
//   const navbar = document.querySelector('.glass-nav');
//   if (navbar) {
//     window.addEventListener('scroll', function() {
//       if (window.scrollY > 100) {
//         navbar.classList.add('scrolled');
//       } else {
//         navbar.classList.remove('scrolled');
//       }
//     });
//   }

//   // Smooth scroll for anchor links
//   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//     anchor.addEventListener('click', function(e) {
//       if (this.getAttribute('href') === '#') return;
      
//       e.preventDefault();
//       const target = document.querySelector(this.getAttribute('href'));
//       if (target) {
//         const navbarHeight = document.querySelector('.glass-nav')?.offsetHeight || 0;
//         const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
//         window.scrollTo({
//           top: targetPosition,
//           behavior: 'smooth'
//         });
//       }
//     });
//   });

//   // Initialize other components
//   initDynamicBackground();
//   animateStats();
// });
// Add this to your existing script.js or create a new one
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    // Set initial theme
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true;
    }

    // Toggle theme
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});
function initDynamicBackground() {
  const body = document.body;
  if (!body) return;

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

function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        let startTimestamp = null;
        
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          stat.textContent = Math.floor(progress * target);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        
        window.requestAnimationFrame(step);
        observer.unobserve(stat);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => observer.observe(stat));
}