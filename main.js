// Update the showMenu function
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        const toggleMenu = (e) => {
            e.preventDefault();
            nav.classList.toggle('show');
        }

        // Click and touch event
        toggle.addEventListener('click', toggleMenu);
        toggle.addEventListener('touchstart', toggleMenu, { passive: true });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('show');
            }
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

// Mute/Unmute Toggle Buttons for Each Video
document.querySelectorAll('.video-container').forEach(container => {
    const video = container.querySelector('video');
    const button = container.querySelector('.mute-btn');

    if (video && button) {
        button.addEventListener('click', () => {
            video.muted = !video.muted;
            button.textContent = video.muted ? '🔇' : '🔊';
        });
    }
});

// Add active class to the clicked navigation link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            window.scrollTo({
                top: target.offsetTop - 50,
                behavior: "smooth"
            });
        }
    });
});

// Optimized scroll listener with debounce
function debounce(func, wait = 100) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

let lastScroll = 0;
window.addEventListener('scroll', debounce(() => {
    const currentScroll = window.pageYOffset;
    if (Math.abs(currentScroll - lastScroll) > 100) {
        scrollActive();
        lastScroll = currentScroll;
    }
}));

// Scroll Active Function
function scrollActive() {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav-list a[href*=" + sectionId + "]").classList.add("active");
        } else {
            document.querySelector(".nav-list a[href*=" + sectionId + "]").classList.remove("active");
        }
    });
}

// In main.js, update the contact form observer to target the form element
const contactFormElement = document.querySelector('.contact-form'); // Changed from .contact-container
if (contactFormElement) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(contactFormElement);
}

// Close menu when clicking nav links on mobile
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            document.getElementById('nav-menu').classList.remove('show');
        }
    });
});

// Ensure menu closes on resize when switching from mobile to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.getElementById('nav-menu').classList.remove('show');
    }
});

// Update ScrollReveal initialization in main.js
const sr = ScrollReveal({
    origin: 'bottom',
    distance: '50px',
    duration: 1200,
    reset: false, // Changed from true to prevent re-animation
    mobile: true
});

// Apply ScrollReveal to elements with debug logs
sr.reveal('.home-title', { beforeReveal: () => console.log('Animating home-title') });
sr.reveal('.home-scroll', { delay: 200 });
sr.reveal('.home-img', { origin: 'right', delay: 400 });

sr.reveal('.about-img', { delay: 500 });
sr.reveal('.about-subtitle', { delay: 300 });
sr.reveal('.about-profession', { delay: 400 });
sr.reveal('.about-text', { delay: 500 });
sr.reveal('.about-social-icon', { delay: 600, interval: 200 });

sr.reveal('.skills-subtitle', {});
sr.reveal('.skills-name', { distance: '20px', delay: 50, interval: 100 });
sr.reveal('.skills-img', { delay: 400 });

sr.reveal('.portfolio-img', { interval: 200 });

sr.reveal('.contact-subtitle', {});
sr.reveal('.contact-text', { interval: 200 });
sr.reveal('.contact-input', { delay: 400 });
sr.reveal('.contact-button', { delay: 600 });