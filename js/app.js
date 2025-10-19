// Dati progetti
const projects = [
  {
    title: "Officine Tecnomec Taranto",
    images: [
      "./foto/officine tecnomec taranto (2024)1.jpg",
      "./foto/officine tecnomec taranto (2024)2.jpg",
      "./foto/officine tecnomec taranto (2024)3.jpg",
      "./foto/officine tecnomec taranto (2024)4.jpg",
      "./foto/officine tecnomec taranto (2024)5.jpg",
      "./foto/officine tecnomec taranto (2024)6.jpg"
    ]
  },
  {
    title: "Warehouse Nippon Gases",
    images: [
      "./foto/warehouse nippon gases (1).jpg",
      "./foto/warehouse nippon gases (2).jpg",
      "./foto/warehouse nippon gases (3).jpg",
      "./foto/warehouse nippon gases (4).jpg",
      "./foto/warehouse nippon gases (5).jpg",
      "./foto/warehouse nippon gases (6).jpg"
    ]
  }
];

let currentProjectIndex = 0;
let currentSlideIndex = 0;
let swipeListeners = [];
let currentHeroSlide = 0;
let heroInterval;

// Apri il modale
function openModal(projectIndex) {
  currentProjectIndex = projectIndex;
  const images = projects[projectIndex].images;
  const carousel = document.getElementById('carouselModal');
  const dotsContainer = document.getElementById('carouselDots');
  const modal = document.getElementById('imageModal');
  
  // Blocca completamente lo scroll della pagina
  const scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.overflow = 'hidden';
  document.body.style.width = '100%';
  // Salva la posizione di scroll
  document.body.setAttribute('data-scroll-y', scrollY.toString());
  
  // 🔥 PULISCI SEMPRE prima di ricreare
  carousel.innerHTML = '';
  dotsContainer.innerHTML = '';

  // Crea le immagini
  images.forEach((src, idx) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Foto ${idx + 1} di ${projects[projectIndex].title}`;
    img.style.display = idx === 0 ? 'block' : 'none';
    img.loading = 'eager';
    img.onerror = () => {
      img.src = 'https://via.placeholder.com/800x600/000/FFF?text=Immagine+non+trovata';
    };
    carousel.appendChild(img);
  });

  // Crea i pallini (dots)
  images.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.classList.toggle('active', idx === 0);
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  // Crea le frecce di navigazione nel modal-content invece che nel carousel
  const modalContent = modal.querySelector('.modal-content');
  
  const leftArrow = document.createElement('button');
  leftArrow.className = 'nav-button left';
  leftArrow.innerHTML = '&#10094;';
  leftArrow.onclick = () => prevSlide();
  modalContent.appendChild(leftArrow);

  const rightArrow = document.createElement('button');
  rightArrow.className = 'nav-button right';
  rightArrow.innerHTML = '&#10095;';
  rightArrow.onclick = () => nextSlide();
  modalContent.appendChild(rightArrow);

  modal.classList.add('active');
  currentSlideIndex = 0;
  
  // Aggiungi gestione swipe
  addSwipeGestures(carousel);
}

// Chiudi il modale
function closeModal() {
  const modal = document.getElementById('imageModal');
  const carousel = document.getElementById('carouselModal');
  
  modal.classList.remove('active');
  
  // Ripristina completamente lo scroll della pagina
  const scrollY = document.body.getAttribute('data-scroll-y');
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.right = '';
  document.body.style.overflow = '';
  document.body.style.width = '';
  document.body.removeAttribute('data-scroll-y');
  
  // Ripristina la posizione di scroll
  if (scrollY) {
    window.scrollTo(0, parseInt(scrollY));
  }
  
  // Rimuovi swipe
  removeSwipeGestures(carousel);
}

// Vai a slide specifica
function goToSlide(index) {
  const images = document.querySelectorAll('#carouselModal img');
  const dots = document.querySelectorAll('#carouselDots span');
  
  if (images.length === 0 || index >= images.length) return;

  // Nascondi tutte le immagini con fade out
  images.forEach((img, i) => {
    if (i === index) {
      img.style.display = 'block';
      img.classList.add('fade-in');
      // Rimuovi la classe dopo l'animazione
      setTimeout(() => {
        img.classList.remove('fade-in');
      }, 600);
    } else {
      img.style.display = 'none';
      img.classList.remove('fade-in');
    }
  });
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlideIndex = index;
}

// Vai avanti
function nextSlide() {
  const modal = document.getElementById('imageModal');
  if (!modal.classList.contains('active')) return;

  const images = projects[currentProjectIndex].images;
  currentSlideIndex = (currentSlideIndex + 1) % images.length;
  goToSlide(currentSlideIndex);
}

// Vai indietro
function prevSlide() {
  const modal = document.getElementById('imageModal');
  if (!modal.classList.contains('active')) return;

  const images = projects[currentProjectIndex].images;
  currentSlideIndex = (currentSlideIndex - 1 + images.length) % images.length;
  goToSlide(currentSlideIndex);
}

// Chiudi con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

// Chiudi cliccando fuori
const imageModal = document.getElementById('imageModal');
if (imageModal) {
    imageModal.addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
}


// === GESTIONE SWIPE PER MOBILE ===
let touchStartX = 0;
let touchEndX = 0;

function addSwipeGestures(element) {
  const handleTouchStart = (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
        touchStartX = e.changedTouches[0].screenX;
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches && e.changedTouches.length > 0) {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    }
  };

  const handleGesture = () => {
    const threshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  element.addEventListener('touchstart', handleTouchStart, { passive: true });
  element.addEventListener('touchend', handleTouchEnd, { passive: true });
  
  swipeListeners = [handleTouchStart, handleTouchEnd];
}

function removeSwipeGestures(element) {
  if (swipeListeners.length > 0 && element) {
    element.removeEventListener('touchstart', swipeListeners[0]);
    element.removeEventListener('touchend', swipeListeners[1]);
    swipeListeners = [];
  }
}

// Funzioni per il carosello fullscreen
function initHeroCarousel() {
  const heroCarousel = document.getElementById('hero-carousel');
  if (!heroCarousel) {
    return;
  }
  const images = heroCarousel.querySelectorAll('img');
  const dots = document.querySelectorAll('#hero-dots .dot');
  
  if (images.length === 0) {
    return;
  }

  heroInterval = setInterval(() => {
    nextSlideHero();
  }, 5000);

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentHeroSlide);
    });
  }
  
  updateDots();
}

function goToSlideHero(index) {
  const images = document.querySelectorAll('#hero-carousel img');
  if (images.length === 0) return;
  const dots = document.querySelectorAll('#hero-dots .dot');
  
  clearInterval(heroInterval);
  
  images.forEach(img => img.style.display = 'none');
  images[index].style.display = 'block';
  
  currentHeroSlide = index;
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  heroInterval = setInterval(() => {
    nextSlideHero();
  }, 5000);
}

function nextSlideHero() {
  const images = document.querySelectorAll('#hero-carousel img');
  if (images.length === 0) return;
  const totalSlides = images.length;
  
  clearInterval(heroInterval);
  images[currentHeroSlide].style.display = 'none';
  
  currentHeroSlide = (currentHeroSlide + 1) % totalSlides;
  images[currentHeroSlide].style.display = 'block';
  
  const dots = document.querySelectorAll('#hero-dots .dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentHeroSlide);
  });
  
  heroInterval = setInterval(() => {
    nextSlideHero();
  }, 5000);
}

function prevSlideHero() {
  const images = document.querySelectorAll('#hero-carousel img');
  if (images.length === 0) return;
  const totalSlides = images.length;
  
  clearInterval(heroInterval);
  images[currentHeroSlide].style.display = 'none';
  
  currentHeroSlide = (currentHeroSlide - 1 + totalSlides) % totalSlides;
  images[currentHeroSlide].style.display = 'block';
  
  const dots = document.querySelectorAll('#hero-dots .dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentHeroSlide);
  });
  
  heroInterval = setInterval(() => {
    nextSlideHero();
  }, 5000);
}

// Mobile menu
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const icon = document.getElementById('menuIcon');
  const body = document.body;
  
  if (!menu || !icon) return;
  
  const isOpen = menu.classList.contains('open');
  
  if (isOpen) {
    menu.classList.remove('open');
    body.style.overflow = '';
    icon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
  } else {
    menu.classList.add('open');
    body.style.overflow = 'hidden';
    icon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
  }
}

// Inizializzazione
document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  
  const firstImage = document.querySelector('#hero-carousel img');
  if (firstImage) {
    firstImage.style.display = 'block';
  }
  
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
  }
});
