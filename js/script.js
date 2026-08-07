document.querySelectorAll(".bio-toggle").forEach(button => {

    button.addEventListener("click", function () {

        const card = this.closest(".team-card");
        const bio = card.querySelector(".bio");

        bio.classList.toggle("open");

        if (bio.classList.contains("open")) {
            this.textContent = "Hide Bio";
        } else {
            this.textContent = "Read Bio";
        }

    });

});
// Smooth scroll with easing, offset for fixed nav
function smoothScrollTo(targetY, duration = 800) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (!target) return;

        const navHeight = document.querySelector('nav').offsetHeight;
        const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;

        smoothScrollTo(targetY, 900);
        history.pushState(null, null, targetId);
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Subtle parallax drift on hero background image
const heroSection = document.querySelector('.opening');

function updateHeroParallax() {
    if (window.innerWidth <= 900) return; // skip on mobile, keeps it simple/stable there

    const rect = heroSection.getBoundingClientRect();
    const drift = rect.top * 0.25; // lower number = more subtle drift
    heroSection.style.backgroundPositionY = `calc(50% + ${drift}px)`;
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(updateHeroParallax);
});

updateHeroParallax(); // run once on load