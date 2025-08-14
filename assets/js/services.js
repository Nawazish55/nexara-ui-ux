document.addEventListener('DOMContentLoaded', function() {
  // Initialize Splide carousel
  new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    perMove: 1,
    gap: '2rem',
    pagination: false,
    breakpoints: {
      768: {
        perPage: 1
      }
    }
  }).mount();

  // Animate service visual elements on scroll
  const serviceVisual = document.querySelector('.service-visual');
  if (serviceVisual) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.visual-element').forEach((el, i) => {
            el.style.transform = `translateY(0) rotate(${i * 10}deg)`;
          });
        }
      });
    }, { threshold: 0.5 });

    observer.observe(serviceVisual);
  }

  // Service card hover effects
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
});