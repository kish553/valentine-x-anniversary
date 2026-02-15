const PHOTOS = [
    { src: 'images/img1.jpg' },
    { src: 'images/img2.jpg' },
    { src: 'images/img3.jpg' },
    { src: 'images/img4.jpg' },
    { src: 'images/img5.jpg' },
    { src: 'images/img6.jpg' },
    { src: 'images/img7.jpg' },
    { src: 'images/img8.jpg' },
    { src: 'images/img9.jpg' },
    { src: 'images/img10.jpg' },
    { src: 'images/img11.jpg' },
    { src: 'images/img12.jpg' },
    { src: 'images/img13.jpg' },
    { src: 'images/img14.jpg' },
    { src: 'images/img15.jpg' },
    { src: 'images/img16.jpg' },
];

let currentPhoto = 0;
let noClickCount = 0;

function initAuroraEffect() {
    const canvas = document.getElementById('auroraCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    let time = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        time += 0.002;
        
        for (let i = 0; i < 3; i++) {
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            
            if (i === 0) {
                gradient.addColorStop(0, 'rgba(167, 139, 250, 0.1)');
                gradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.05)');
                gradient.addColorStop(1, 'transparent');
            } else if (i === 1) {
                gradient.addColorStop(0, 'transparent');
                gradient.addColorStop(0.5, 'rgba(244, 114, 182, 0.08)');
                gradient.addColorStop(1, 'rgba(244, 114, 182, 0.03)');
            } else {
                gradient.addColorStop(0, 'rgba(139, 92, 246, 0.06)');
                gradient.addColorStop(1, 'transparent');
            }
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            
            for (let x = 0; x < canvas.width; x += 10) {
                const y = canvas.height / 2 + 
                    Math.sin(x * 0.01 + time + i * 2) * 100 +
                    Math.sin(x * 0.005 + time * 0.5) * 50;
                
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fill();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function initFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '💖';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (8 + Math.random() * 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 12000);
    }
    
    setInterval(createHeart, 3000);
    
    for (let i = 0; i < 5; i++) {
        setTimeout(createHeart, i * 600);
    }
}

function initMagneticHover() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const strength = (maxDistance - distance) / maxDistance;
                const moveX = (x / distance) * strength * 15;
                const moveY = (y / distance) * strength * 15;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.02)`;
            }
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
}

function initInteractiveGlow() {
    const glowCards = document.querySelectorAll('.glass, .gallery-item');
    
    glowCards.forEach(card => {
        const glow = document.createElement('div');
        glow.className = 'interactive-glow';
        glow.style.position = 'absolute';
        glow.style.width = '200px';
        glow.style.height = '200px';
        glow.style.borderRadius = '50%';
        glow.style.background = 'radial-gradient(circle, rgba(167, 139, 250, 0.3), transparent)';
        glow.style.pointerEvents = 'none';
        glow.style.opacity = '0';
        glow.style.transition = 'opacity 0.3s';
        glow.style.transform = 'translate(-50%, -50%)';

        if (window.getComputedStyle(card).position === 'static') {
            card.style.position = 'relative';
        }
        
        card.appendChild(glow);
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
            glow.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    });
}

function initButtonFeedback() {
    const buttons = document.querySelectorAll('button, .eye-crop');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = button.style.transform.replace('scale(1)', 'scale(0.95)') || 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', () => {
            setTimeout(() => {
                button.style.transform = button.style.transform.replace('scale(0.95)', 'scale(1)');
            }, 100);
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = button.style.transform.replace('scale(0.95)', 'scale(1)');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initAuroraEffect();
    initLiquidCanvas();
    initFloatingHearts();
    initCursorTrail();
    initMagneticHover();
    initInteractiveGlow();
    initButtonFeedback();
    initEye();
    initStory();
    initGallery();
    initQuestion();
    initLightbox();
    initScrollAnimations();
    initCardTilt();
});

function initLiquidCanvas() {
    const canvas = document.getElementById('liquidCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    const ripples = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('click', (e) => {
        ripples.push({
            x: e.clientX,
            y: e.clientY,
            radius: 0,
            maxRadius: 250,
            alpha: 1
        });
    });
    
    const particles = [];
    const colors = ['rgba(167, 139, 250, 0.5)', 'rgba(244, 114, 182, 0.5)'];
    
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            baseX: Math.random() * canvas.width,
            baseY: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: Math.random() * 50 + 25,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(9, 9, 11, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = 'rgba(167, 139, 250, 0.1)';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 150) {
                    const alpha = (150 - dist) / 150;
                    ctx.strokeStyle = `rgba(167, 139, 250, ${alpha * 0.15})`;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        particles.forEach(p => {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const force = Math.min(250 / (dist + 1), 2.5);
            
            if (dist < 250) {
                p.vx -= (dx / dist) * force * 0.015;
                p.vy -= (dy / dist) * force * 0.015;
            }
            
            p.vx += (p.baseX - p.x) * 0.0008;
            p.vy += (p.baseY - p.y) * 0.0008;
            
            p.vx *= 0.96;
            p.vy *= 0.96;
            
            p.x += p.vx;
            p.y += p.vy;
            
            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
            
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(0.5, p.color.replace('0.5', '0.2'));
            gradient.addColorStop(1, 'transparent');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        for (let i = ripples.length - 1; i >= 0; i--) {
            const r = ripples[i];
            r.radius += 5;
            r.alpha -= 0.015;
            
            if (r.alpha <= 0) {
                ripples.splice(i, 1);
                continue;
            }
            
            for (let j = 0; j < 3; j++) {
                const offset = j * 15;
                ctx.strokeStyle = `rgba(167, 139, 250, ${r.alpha * 0.4})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius + offset, 0, Math.PI * 2);
                ctx.stroke();
                
                ctx.strokeStyle = `rgba(244, 114, 182, ${r.alpha * 0.25})`;
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius + offset + 8, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
        
        requestAnimationFrame(animate);
    }
    animate();
}

function initEye() {
    const eyeCrop = document.getElementById('eyeCrop');
    const eyeSection = document.getElementById('eyeSection');
    const storyCard = document.getElementById('storyCard');
    
    eyeCrop.addEventListener('click', () => {
        eyeSection.style.opacity = '0';
        setTimeout(() => {
            eyeSection.style.display = 'none';
        }, 600);
        
        setTimeout(() => {
            storyCard.classList.add('active');
        }, 300);
    });
}

function initStory() {
    const storyCard = document.getElementById('storyCard');
    const closeStory = document.getElementById('closeStory');
    const continueBtn = document.getElementById('continueBtn');
    const eyeSection = document.getElementById('eyeSection');
    const mainContent = document.getElementById('mainContent');
    
    closeStory.addEventListener('click', () => {
        storyCard.classList.remove('active');
        setTimeout(() => {
            eyeSection.style.display = 'flex';
            setTimeout(() => {
                eyeSection.style.opacity = '1';
            }, 50);
        }, 600);
    });
    
    continueBtn.addEventListener('click', () => {
        animatePhotosSpiral();
        
        storyCard.classList.remove('active');
        
        setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.pointerEvents = 'all';
            
            setTimeout(() => {
                document.querySelector('.gallery-section').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }, 300);
        }, 600);
    });
}

function animatePhotosSpiral() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.style.transform = 'translateX(-100vw) scale(1.3)';
        item.style.opacity = '0';
        item.style.transition = 'none';
        
        const delay = index * 150;
        
        setTimeout(() => {
            item.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            item.style.transform = 'translateX(0) scale(1)';
            item.style.opacity = '1';
        }, delay + 100);
        
        setTimeout(() => {
            item.style.transition = '';
        }, delay + 1400);
    });
}

function initGallery() {
    const gallery = document.getElementById('gallery');
    
    PHOTOS.forEach((photo, i) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.style.transitionDelay = (i * 0.1) + 's';
        item.innerHTML = `<img src="${photo.src}" alt="Memory ${i + 1}" onerror="this.src='https://via.placeholder.com/500/1a1a2e/a78bfa?text=Memory+${i + 1}'">`;
        
        item.addEventListener('click', () => {
            currentPhoto = i;
            showLightbox();
        });
        
        gallery.appendChild(item);
    });
}

function initScrollAnimations() {
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.gallery-item').forEach(item => {
        galleryObserver.observe(item);
    });
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15
    });
    
    document.querySelectorAll('section').forEach(section => {
        sectionObserver.observe(section);
    });
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const sections = document.querySelectorAll('section');
                
                sections.forEach((section, index) => {
                    const rect = section.getBoundingClientRect();
                    const inView = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (inView) {
                        const offset = (rect.top - window.innerHeight / 2) * 0.05;
                        section.style.transform = `translateY(${offset}px)`;
                    }
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

function initQuestion() {
    const yesBtn = document.getElementById('yesBtn');
    const successOverlay = document.getElementById('successOverlay');
    const eyeSection = document.getElementById('eyeSection');
    const mainContent = document.getElementById('mainContent');
    
    yesBtn.addEventListener('click', () => {
        createParticleBurst(yesBtn);
        
        yesBtn.style.boxShadow = '0 0 80px rgba(167, 139, 250, 1), 0 0 120px rgba(244, 114, 182, 1)';
        setTimeout(() => {
            yesBtn.style.boxShadow = '';
        }, 1000);
        
        successOverlay.classList.add('active');
        
        setTimeout(() => {
            successOverlay.classList.remove('active');
            
            mainContent.style.opacity = '0';
            mainContent.style.pointerEvents = 'none';
            
            setTimeout(() => {
                eyeSection.style.display = 'flex';
                setTimeout(() => {
                    eyeSection.style.opacity = '1';
                }, 50);
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 600);
        }, 3000);
    });
}

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    const lbClose = document.getElementById('lbClose');
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');
    
    window.showLightbox = function() {
        lbImg.src = PHOTOS[currentPhoto].src;
        lightbox.classList.add('active');
    };
    
    lbClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    
    lbPrev.addEventListener('click', () => {
        currentPhoto = (currentPhoto - 1 + PHOTOS.length) % PHOTOS.length;
        showLightbox();
    });
    
    lbNext.addEventListener('click', () => {
        currentPhoto = (currentPhoto + 1) % PHOTOS.length;
        showLightbox();
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            lbPrev.click();
        } else if (e.key === 'ArrowRight') {
            lbNext.click();
        }
    });
}

console.log('%c💖 Love is Endless', 'font-size: 20px; font-weight: bold; background: linear-gradient(135deg, #a78bfa, #f472b6); -webkit-background-clip: text; color: transparent;');

function initCursorTrail() {
    let lastX = 0;
    let lastY = 0;
    let isMoving = false;
    const trailParticles = [];
    
    document.addEventListener('mousemove', (e) => {
        if (!isMoving) {
            isMoving = true;
            setTimeout(() => isMoving = false, 30);
            
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            
            const colors = ['#a78bfa', '#f472b6', '#c084fc'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            trail.style.background = `radial-gradient(circle, ${color}, transparent)`;
            
            document.body.appendChild(trail);
            
            setTimeout(() => trail.remove(), 1000);
        }
        
        lastX = e.clientX;
        lastY = e.clientY;
    });
}

function initCardTilt() {
    const cards = document.querySelectorAll('.story-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            card.style.transform = card.classList.contains('active')
                ? `translate(-50%, -50%) scale(1) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
                : `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = card.classList.contains('active')
                ? 'translate(-50%, -50%) scale(1)'
                : '';
        });
    });
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 50;
            const rotateY = (centerX - x) / 50;
            
            item.style.transform = `translateY(-8px) scale(1.03) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = '';
        });
    });
}

function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const colors = ['#a78bfa', '#f472b6', '#c084fc', '#fb7185'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 3 + Math.random() * 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0;
        let y = 0;
        let opacity = 1;
        
        const animate = () => {
            x += vx;
            y += vy;
            opacity -= 0.02;
            
            particle.style.transform = `translate(${x}px, ${y}px) scale(${opacity})`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}