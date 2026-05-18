// Mobile menu with sidebar and backdrop
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

// Create backdrop element
let backdrop = document.querySelector('.menu-overlay');
if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'menu-overlay';
    document.body.appendChild(backdrop);
}

function closeMenu() {
    navMenu.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = ''; // restore scroll
}

function openMenu() {
    navMenu.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
}

mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (navMenu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Close menu when clicking on backdrop
backdrop.addEventListener('click', closeMenu);

// Close menu when a link inside nav-menu is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ---------- Hero Slider ----------
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let currentSlide = 0;
const totalSlides = slides.length;
let slideInterval;

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    showSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
    showSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});
prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'));
        showSlide(slideIndex);
        resetAutoSlide();
    });
});

startAutoSlide();

// ---------- Industries Tabs ----------
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// ---------- KPI Counters & Progress Bar Animation ----------
function animateValue(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('fa-IR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('fa-IR');
        }
    }, 16);
}

const kpiObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const chartCards = entry.target.querySelectorAll('.chart-card');
            chartCards.forEach(card => {
                const valueEl = card.querySelector('.chart-value');
                const fillEl = card.querySelector('.progress-fill');
                if (valueEl && !valueEl.classList.contains('animated')) {
                    const target = parseInt(valueEl.getAttribute('data-target'));
                    animateValue(valueEl, target);
                    valueEl.classList.add('animated');
                }
                if (fillEl && !fillEl.classList.contains('animated')) {
                    const targetWidth = fillEl.getAttribute('data-width') + '%';
                    fillEl.style.width = targetWidth;
                    fillEl.classList.add('animated');
                }
            });
            kpiObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const kpiSection = document.getElementById('kpi');
if (kpiSection) {
    kpiObserver.observe(kpiSection);
}

// ---------- Language Switch (demo) ----------
document.querySelectorAll('.language-switch button').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.language-switch button').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        alert('تغییر زبان به ' + this.textContent + ' (نمونه)');
    }); 
});