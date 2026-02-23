// Carousel and Modal functionality for homepage
(function () {
  'use strict';

  // Array con TUTTE le immagini, ESCLUSA l'immagine di sfondo statico (Warehouse Nippon Gases (4).jpg)
  const allImages = [
    // Prime foto in primo piano
    "./foto/webp/Immagine WhatsApp 2025-09-23 ore 08.29.26_fdef9781.webp",
    "./foto/webp/warehouse nippon gases (6).webp",
    "./foto/newfoto11022026/WhatsApp Image 2026-02-02 at 16.41.12.webp",
    // Warehouse Nippon Gases (Immagine 4 RIMOSSA)
    "./foto/webp/warehouse nippon gases (2).webp",
    "./foto/webp/warehouse nippon gases (3).webp",
    "./foto/webp/warehouse nippon gases (5).webp",
    // Nuove foto
    "./foto/webp/IMG-20251006-WA0017.webp",
    // Nuove foto 11 febbraio 2026
    "./foto/newfoto11022026/WhatsApp Image 2026-02-02 at 16.41.11 (1).webp",
    "./foto/newfoto11022026/WhatsApp Image 2026-02-02 at 16.41.12 (2).webp",
    "./foto/newfoto11022026/WhatsApp Image 2026-02-02 at 16.41.12 (3).webp",
    "./foto/newfoto11022026/WhatsApp Image 2026-02-02 at 16.41.12 (4).webp",
    "./foto/newfoto11022026/WhatsApp Image 2026-02-02 at 16.41.12 (5).webp",
    "./foto/newfoto11022026/WhatsApp Image 2026-02-02 at 16.41.12.webp",
    "./foto/newfoto11022026/WhatsApp Image 2026-02-02 at 16.43.03 (1).webp",
    "./foto/newfoto11022026/WhatsApp Image 2026-02-02 at 16.43.03.webp",
    "./foto/newfoto11022026/WhatsApp Image 2026-02-02 at 16.45.18 (2).webp"
  ];

  // Encode URLs to handle spaces and special characters
  for (let i = 0; i < allImages.length; i++) {
    allImages[i] = encodeURI(allImages[i]).replace(/\(/g, '%28').replace(/\)/g, '%29');
  }

  console.log('Carousel initialized with images:', allImages);

  // Variabili globali per lo stato dei caroselli
  let currentModalSlideIndex = 0;
  let swipeListeners = [];

  // === GESTIONE MODALE (quando si clicca su una foto) ===
  function openModal(startIndex) {
    const carousel = document.getElementById('carouselModal');
    const dotsContainer = document.getElementById('carouselDots');
    const modal = document.getElementById('imageModal');

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.overflow = 'hidden';
    document.body.setAttribute('data-scroll-y', scrollY.toString());

    carousel.innerHTML = '';
    dotsContainer.innerHTML = '';

    allImages.forEach((src, idx) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = i18n.t('carousel.projectAlt', { index: idx + 1 });
      img.style.display = idx === startIndex ? 'block' : 'none';
      img.loading = idx === startIndex ? 'eager' : 'lazy';
      img.decoding = 'async';
      img.onerror = () => img.src = `https://via.placeholder.com/800x600/000/FFF?text=${encodeURIComponent(i18n.t('carousel.imageNotFound'))}`;
      carousel.appendChild(img);
    });

    allImages.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dot.classList.toggle('active', idx === startIndex);
      dot.addEventListener('click', () => goToModalSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const modalContent = modal.querySelector('.modal-content');
    // Rimuove le frecce del carosello 3D se sono state aggiunte per sbaglio
    const existingArrows = modalContent.querySelectorAll('.nav-button');
    existingArrows.forEach(el => el.remove());

    const leftArrow = document.createElement('button');
    leftArrow.className = 'nav-button left';
    leftArrow.innerHTML = '&#10094;';
    leftArrow.setAttribute('aria-label', i18n.t('carousel.prevImage'));
    leftArrow.onclick = () => prevModalSlide();
    modalContent.appendChild(leftArrow);

    const rightArrow = document.createElement('button');
    rightArrow.className = 'nav-button right';
    rightArrow.innerHTML = '&#10095;';
    rightArrow.setAttribute('aria-label', i18n.t('carousel.nextImage'));
    rightArrow.onclick = () => nextModalSlide();
    modalContent.appendChild(rightArrow);

    modal.classList.add('active');
    currentModalSlideIndex = startIndex;

    // Inizializza il contatore
    const counter = document.getElementById('imageCounter');
    if (counter) {
      counter.textContent = `${startIndex + 1} / ${allImages.length}`;
    }

    addSwipeGestures(carousel);
  }

  function closeModal() {
    const modal = document.getElementById('imageModal');
    const carousel = document.getElementById('carouselModal');
    modal.classList.remove('active');
    const scrollY = document.body.getAttribute('data-scroll-y');
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.overflow = '';
    document.body.removeAttribute('data-scroll-y');
    if (scrollY) window.scrollTo(0, parseInt(scrollY));
    removeSwipeGestures(carousel);
  }

  function goToModalSlide(index) {
    const images = document.querySelectorAll('#carouselModal img');
    const dots = document.querySelectorAll('#carouselDots .dot');
    const counter = document.getElementById('imageCounter');

    if (images.length === 0 || index >= images.length) return;

    images.forEach((img, i) => {
      if (i === index) {
        img.style.display = 'block';
        img.classList.add('fade-in');
        setTimeout(() => img.classList.remove('fade-in'), 600);
      } else {
        img.style.display = 'none';
        img.classList.remove('fade-in');
      }
    });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    currentModalSlideIndex = index;

    // Aggiorna il contatore
    if (counter) {
      counter.textContent = `${index + 1} / ${images.length}`;
    }
  }

  function nextModalSlide() {
    currentModalSlideIndex = (currentModalSlideIndex + 1) % allImages.length;
    goToModalSlide(currentModalSlideIndex);
  }

  function prevModalSlide() {
    currentModalSlideIndex = (currentModalSlideIndex - 1 + allImages.length) % allImages.length;
    goToModalSlide(currentModalSlideIndex);
  }

  // === GESTIONE SWIPE (solo per il modale) ===
  let touchStartX = 0;
  let touchEndX = 0;
  function addSwipeGestures(element) {
    const handleTouchStart = (e) => touchStartX = e.changedTouches[0].screenX;
    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) diff > 0 ? nextModalSlide() : prevModalSlide();
    };
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    swipeListeners = [handleTouchStart, handleTouchEnd];
  }
  function removeSwipeGestures(element) {
    if (swipeListeners.length > 0) {
      element.removeEventListener('touchstart', swipeListeners[0]);
      element.removeEventListener('touchend', swipeListeners[1]);
      swipeListeners = [];
    }
  }

  // === GESTIONE MENU MOBILE ===
  function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const icon = document.getElementById('menuIcon');
    if (!menu || !icon) return;
    const isOpen = menu.classList.contains('open');
    if (isOpen) {
      menu.classList.remove('open');
      document.body.style.overflow = '';
      icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    } else {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
      icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
    }
  }

  // === NUOVA GESTIONE CAROSELLO PROGETTI 3D ===
  let currentProjectSlide = 0;
  let projectAutoplayInterval;
  let carouselInitialized = false;

  function getSlideIndex(offset) {
    return (currentProjectSlide + offset + allImages.length) % allImages.length;
  }

  function init3DCarousel() {
    const carousel = document.getElementById('projects-carousel-3d');
    if (!carousel) return;

    // Rimuove slide precedenti se ricaricato
    carousel.querySelectorAll('.slide-3d').forEach(slide => slide.remove());

    allImages.forEach((src, index) => {
      const slide = document.createElement('div');
      slide.className = 'slide-3d';
      slide.setAttribute('data-index', index);
      slide.onclick = () => {
        // Apre la modale solo se è la slide centrale
        if (slide.classList.contains('center')) {
          openModal(index);
        } else {
          // Se non è la slide centrale, la porta al centro
          if (slide.classList.contains('left')) {
            prev3DSlide();
          } else if (slide.classList.contains('right')) {
            next3DSlide();
          }
        }
      };

      const img = document.createElement('img');
      img.src = src;
      img.alt = i18n.t('carousel.projectAlt', { index: index + 1 });
      img.loading = 'lazy';
      img.decoding = 'async';
      img.onerror = () => img.src = `https://via.placeholder.com/800x450/000/FFF?text=${encodeURIComponent(i18n.t('carousel.imageNotAvailable'))}`;

      slide.appendChild(img);
      carousel.appendChild(slide);
    });

    update3DCarousel();
    carousel.dataset.initialized = 'true';
    carouselInitialized = true;

    // Aggiungi gestione swipe per mobile
    addCarouselSwipeGestures(carousel);
  }

  function update3DCarousel() {
    const slides = document.querySelectorAll('#projects-carousel-3d .slide-3d');
    if (slides.length === 0) return;

    const prevIndex = getSlideIndex(-1);
    const centerIndex = getSlideIndex(0);
    const nextIndex = getSlideIndex(1);

    slides.forEach((slide, index) => {
      slide.classList.remove('center', 'left', 'right');
      if (index === centerIndex) {
        slide.classList.add('center');
      } else if (index === prevIndex) {
        slide.classList.add('left');
      } else if (index === nextIndex) {
        slide.classList.add('right');
      }
    });
  }

  function start3DAutoplay() {
    if (allImages.length < 2) return;
    clearInterval(projectAutoplayInterval);
    projectAutoplayInterval = setInterval(next3DSlide, 5000); // 5 secondi
  }

  function ensureCarouselInitialized() {
    if (carouselInitialized) return true;
    const carousel = document.getElementById('projects-carousel-3d');
    if (!carousel) return false;
    init3DCarousel();
    start3DAutoplay();
    return carouselInitialized;
  }

  function scheduleCarouselInit() {
    const carousel = document.getElementById('projects-carousel-3d');
    if (!carousel) return;

    const initIfNeeded = () => {
      ensureCarouselInitialized();
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            initIfNeeded();
            observer.disconnect();
          }
        });
      }, { rootMargin: '400px 0px 0px 0px' });
      observer.observe(carousel);
    } else if ('requestIdleCallback' in window) {
      window.requestIdleCallback(initIfNeeded);
    } else {
      setTimeout(initIfNeeded, 200);
    }
  }

  function next3DSlide() {
    if (!ensureCarouselInitialized()) return;
    currentProjectSlide = getSlideIndex(1);
    update3DCarousel();
    start3DAutoplay();
  }

  function prev3DSlide() {
    if (!ensureCarouselInitialized()) return;
    currentProjectSlide = getSlideIndex(-1);
    update3DCarousel();
    start3DAutoplay();
  }

  // === GESTIONE SWIPE PER CAROUSEL 3D ===
  let carouselTouchStartX = 0;
  let carouselTouchStartY = 0;
  let carouselTouchEndX = 0;
  let carouselIsHorizontal = null; // null = not yet determined

  function addCarouselSwipeGestures(carousel) {
    const handleTouchStart = (e) => {
      if (e.changedTouches && e.changedTouches.length > 0) {
        carouselTouchStartX = e.changedTouches[0].screenX;
        carouselTouchStartY = e.changedTouches[0].screenY;
        carouselTouchEndX = carouselTouchStartX;
        carouselIsHorizontal = null; // reset
      }
    };

    const handleTouchMove = (e) => {
      if (!e.changedTouches || e.changedTouches.length === 0) return;
      const dx = e.changedTouches[0].screenX - carouselTouchStartX;
      const dy = e.changedTouches[0].screenY - carouselTouchStartY;

      // Determine direction on first significant movement
      if (carouselIsHorizontal === null && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
        carouselIsHorizontal = Math.abs(dx) > Math.abs(dy);
      }

      if (carouselIsHorizontal) {
        // Horizontal swipe: update end position (don't block scroll here, passive)
        carouselTouchEndX = e.changedTouches[0].screenX;
      }
      // If vertical, do nothing — let the browser scroll naturally
    };

    const handleTouchEnd = () => {
      if (carouselIsHorizontal) {
        const threshold = 50;
        const diff = carouselTouchStartX - carouselTouchEndX;
        if (Math.abs(diff) > threshold) {
          if (diff > 0) {
            next3DSlide();
          } else {
            prev3DSlide();
          }
        }
      }
      carouselIsHorizontal = null;
    };

    carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    carousel.addEventListener('touchmove', handleTouchMove, { passive: true });
    carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
  }

  // Rende le funzioni globali con il nome corretto
  window.next3DSlide = next3DSlide;
  window.prev3DSlide = prev3DSlide;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.toggleMobileMenu = toggleMobileMenu;

  // === INIZIALIZZAZIONE DI TUTTO ===
  document.addEventListener('DOMContentLoaded', () => {
    scheduleCarouselInit();
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) mobileMenu.classList.remove('open');
  });

  // === GESTIONE TASTI (per il modale) ===
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('imageModal');
    if (modal && modal.classList.contains('active')) {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextModalSlide();
      if (e.key === 'ArrowLeft') prevModalSlide();
    }
  });

  const imageModal = document.getElementById('imageModal');
  if (imageModal) {
    imageModal.addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });
  }
})();
