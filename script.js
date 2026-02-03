// Smooth scrolling for navigation links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
});

// Typing effect for hero (optional enhancement)
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    
    setTimeout(() => {
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 50);
    }, 1000);
}

// Add cursor effect on hero section
const hero = document.querySelector('.hero');
hero.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    hero.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0, 255, 255, 0.1), transparent 50%)`;
});

// Parallax effect for stats
window.addEventListener('scroll', () => {
    const stats = document.querySelectorAll('.stat');
    const scrolled = window.pageYOffset;
    
    stats.forEach((stat, index) => {
        const speed = 0.5 + (index * 0.1);
        stat.style.transform = `translateY(${scrolled * speed * 0.01}px)`;
    });
});

console.log('%c🚀 Welcome to the Matrix 🚀', 'color: #00ffff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with passion by Tanmoy', 'color: #ff00ff; font-size: 14px;');
