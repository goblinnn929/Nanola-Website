document.querySelectorAll(".bio-toggle").forEach(button => {

    button.addEventListener("click", function () {

        const bio = this.nextElementSibling;

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