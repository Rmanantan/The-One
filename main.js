/* ========================================
   THE ONE — Main JavaScript
   Digital Artist Portfolio
   ======================================== */

// ========================================
// 1. LOADER
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    }
});

// ========================================
// 2. NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// ========================================
// 3. SCROLL PROGRESS BAR
// ========================================
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', function() {
    if (progressBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    }
});

// ========================================
// 4. TYPING EFFECT
// ========================================
function initTyping() {
    const nameEl = document.getElementById('typedName');
    const roleEl = document.getElementById('typedRole');

    if (!nameEl || !roleEl) return;

    const nameText = 'Roger';
    const roleText = 'Digital Art';

    let nameIndex = 0;
    let roleIndex = 0;
    let nameDone = false;
    let roleDone = false;

    nameEl.textContent = '';
    roleEl.textContent = '';

    function typeName() {
        if (nameIndex < nameText.length) {
            nameEl.textContent += nameText.charAt(nameIndex);
            nameIndex++;
            setTimeout(typeName, 100);
        } else {
            nameDone = true;
            if (nameDone && !roleDone) {
                setTimeout(typeRole, 350);
            }
        }
    }

    function typeRole() {
        if (roleIndex < roleText.length) {
            roleEl.textContent += roleText.charAt(roleIndex);
            roleIndex++;
            setTimeout(typeRole, 80);
        } else {
            roleDone = true;
        }
    }

    typeName();
}

// ========================================
// 5. REVEAL ANIMATIONS ON SCROLL
// ========================================
function initReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// 6. SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

// ========================================
// 7. CONTACT FORM HANDLER
// ========================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const submitBtn = document.getElementById('submitBtn');
        const status = document.getElementById('formStatus');

        if (!name || !email || !message || !submitBtn || !status) return;

        const nameVal = name.value.trim();
        const emailVal = email.value.trim();
        const messageVal = message.value.trim();

        // Validation
        if (!nameVal || !emailVal || !messageVal) {
            status.className = 'error';
            status.innerHTML = '❌ Please fill in all fields.';
            return;
        }

        if (!emailVal.includes('@') || !emailVal.includes('.')) {
            status.className = 'error';
            status.innerHTML = '❌ Please enter a valid email address.';
            return;
        }

        // Simulate sending
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        status.className = 'loading';
        status.innerHTML = '⏳ Sending your message...';

        await new Promise(resolve => setTimeout(resolve, 1500));

        // Success
        status.className = 'success';
        status.innerHTML = '✅ Message sent successfully! I\'ll get back to you soon. 🎨';
        form.reset();

        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';

        // Auto hide after 5 seconds
        setTimeout(() => {
            status.className = '';
            status.innerHTML = '';
        }, 5000);
    });
}

// ========================================
// 8. COUNTER ANIMATION
// ========================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    let animated = false;

    function animateCounters() {
        if (animated) return;

        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            animated = true;

            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const current = Math.floor(progress * target);

                    counter.textContent = current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                }
                requestAnimationFrame(updateCounter);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    window.addEventListener('load', animateCounters);
}

// ========================================
// 9. KEYBOARD SHORTCUTS
// ========================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Prevent if typing in input/textarea
        const tag = e.target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

        if (e.key === 'h' && !e.ctrlKey && !e.metaKey) {
            window.location.href = 'index.html';
        }
        if (e.key === 'a' && !e.ctrlKey && !e.metaKey) {
            window.location.href = 'about.html';
        }
        if (e.key === 's' && !e.ctrlKey && !e.metaKey) {
            window.location.href = 'skills.html';
        }
        if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
            window.location.href = 'contact.html';
        }
    });
}

// ========================================
// 10. INITIALIZE ALL FUNCTIONS
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initTyping();
    initReveal();
    initSmoothScroll();
    initContactForm();
    initCounters();
    initKeyboardShortcuts();

    console.log('🎨 The One — Digital Artist Portfolio loaded!');
    console.log('📌 Keyboard Shortcuts: H=Home, A=About, S=Skills, C=Contact');
});

// ========================================
// 11. NAVIGATION ACTIVE LINK
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
