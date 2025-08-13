function initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 5), 150);
    
    // Color palette
    const colors = [
        'hsla(245, 100%, 70%, 0.5)',  // Primary
        'hsla(340, 100%, 70%, 0.5)',  // Secondary
        'hsla(160, 100%, 70%, 0.5)',  // Accent
        'hsla(220, 100%, 70%, 0.3)'
    ];
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.originalX = this.x;
            this.originalY = this.y;
            this.density = Math.random() * 30 + 1;
        }
        
        update(mouse) {
            // Mouse interaction
            if (mouse.x && mouse.y) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = 100;
                const force = (maxDistance - distance) / maxDistance;
                
                if (distance < maxDistance) {
                    this.x -= forceDirectionX * force * this.density;
                    this.y -= forceDirectionY * force * this.density;
                } else {
                    // Return to original position
                    if (this.x !== this.originalX) {
                        const dx = this.originalX - this.x;
                        this.x += dx / 10;
                    }
                    if (this.y !== this.originalY) {
                        const dy = this.originalY - this.y;
                        this.y += dy / 10;
                    }
                }
            } else {
                // Normal movement
                this.x += this.speedX;
                this.y += this.speedY;
                
                // Boundary check with bounce
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    // Mouse position
    const mouse = {
        x: null,
        y: null
    };
    
    // Handle mouse movement
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    canvas.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });
    
    // Create particles
    function init() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        particles.forEach(particle => {
            particle.update(mouse);
            particle.draw();
        });
        
        // Connect particles
        connectParticles();
        
        requestAnimationFrame(animate);
    }
    
    // Connect nearby particles
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = 1 - distance / 100;
                    ctx.strokeStyle = `hsla(245, 100%, 70%, ${opacity * 0.3})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Start everything
    init();
    animate();
}