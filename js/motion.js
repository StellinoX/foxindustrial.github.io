(function () {
  const docEl = document.documentElement;
  docEl.classList.add('motion-enhanced');

  const prefersReducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let reduceMotion = prefersReducedQuery.matches;

  const makeVisible = (el) => {
    if (!el.classList.contains('is-visible')) {
      el.classList.add('is-visible');
    }
  };

  const setTransitionDelay = (el) => {
    if (el.dataset.delay) {
      const delay = parseFloat(el.dataset.delay);
      if (!Number.isNaN(delay)) {
        el.style.transitionDelay = `${delay}s`;
      }
    }
  };

  const prepareStagger = () => {
    const groups = document.querySelectorAll('.stagger-children');
    groups.forEach((group) => {
      const step = parseFloat(group.dataset.stagger || '0.12');
      const children = Array.from(group.children).filter((child) => child.nodeType === 1);

      children.forEach((child, index) => {
        if (!child.dataset.delay) {
          const computedDelay = Number.isFinite(step) ? (index * step) : (index * 0.12);
          child.style.transitionDelay = `${computedDelay.toFixed(2)}s`;
        }
        child.style.setProperty('--index', index);
      });
    });
  };

  const animateElements = () => {
    const revealables = document.querySelectorAll('[data-animate]');

    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealables.forEach((el) => {
        setTransitionDelay(el);
        makeVisible(el);
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          setTransitionDelay(target);
          makeVisible(target);
          observer.unobserve(target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px'
    });

    revealables.forEach((el) => observer.observe(el));
  };

  const nav = document.querySelector('nav');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  let ticking = false;

  const handleScrollEffects = () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 24);
    }

    if (scrollIndicator) {
      const visible = window.scrollY < 160;
      scrollIndicator.style.opacity = visible ? '1' : '0';
    }

    ticking = false;
  };

  const initScrollEffects = () => {
    handleScrollEffects();
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScrollEffects);
        ticking = true;
      }
    }, { passive: true });
  };

  const initTilt = () => {
    if (!window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const tiltElements = document.querySelectorAll('.hover-tilt');
    tiltElements.forEach((element) => {
      const dampen = parseFloat(element.dataset.tiltStrength || '18');

      const update = (event) => {
        const bounds = element.getBoundingClientRect();
        const offsetX = event.clientX - bounds.left;
        const offsetY = event.clientY - bounds.top;
        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;

        const rotateX = ((offsetY - centerY) / centerY) * -dampen;
        const rotateY = ((offsetX - centerX) / centerX) * dampen;

        element.style.setProperty('--tiltX', `${rotateX.toFixed(2)}deg`);
        element.style.setProperty('--tiltY', `${rotateY.toFixed(2)}deg`);
        element.classList.add('is-hovered');
      };

      const reset = () => {
        element.style.setProperty('--tiltX', '0deg');
        element.style.setProperty('--tiltY', '0deg');
        element.classList.remove('is-hovered');
      };

      element.addEventListener('pointermove', update);
      element.addEventListener('pointerleave', reset);
      element.addEventListener('pointerup', reset);
    });
  };

  const init = () => {
    prepareStagger();
    animateElements();
    initScrollEffects();
    initTilt();
  };

  const handlePrefersReducedChange = (event) => {
    reduceMotion = event.matches;
    animateElements();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  if (typeof prefersReducedQuery.addEventListener === 'function') {
    prefersReducedQuery.addEventListener('change', handlePrefersReducedChange);
  } else if (typeof prefersReducedQuery.addListener === 'function') {
    prefersReducedQuery.addListener(handlePrefersReducedChange);
  }
}());
