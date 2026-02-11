/**
 * UI Enhancements for Fox Industrial Contracting
 * Includes: Scroll Progress Bar, Back to Top Button, and Performance Utilities
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initBackToTop();
});

/**
 * Initialize Reading Progress Bar
 */
function initScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.className = 'fixed top-0 left-0 h-1 bg-accent z-[60] transition-all duration-100 ease-out';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);

    // Update width on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercent}%`;
    }, { passive: true });
}

/**
 * Initialize Back to Top Button
 */
function initBackToTop() {
    // Create button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
    </svg>
  `;
    backToTopBtn.className = 'fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg opacity-0 translate-y-10 transition-all duration-300 z-40 hover:bg-accent focus:outline-none pointer-events-none hidden md:flex items-center justify-center';
    backToTopBtn.setAttribute('aria-label', i18n.t('ui.scrollToTop') || 'Scroll to top');
    document.body.appendChild(backToTopBtn);

    // Show/Hide logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
        } else {
            backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
    }, { passive: true });

    // Scroll to top logic
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
