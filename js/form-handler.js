// Improved form handler for contact and candidature forms
// Uses i18n system for translatable strings
(function () {
  'use strict';

  // Form validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^[\d\s\+\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
  }

  function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');

    // Remove existing error
    const existingError = input.parentElement.querySelector('.form-error');
    if (existingError) {
      existingError.remove();
    }

    input.classList.add('error');
    input.parentElement.appendChild(errorDiv);
    input.focus();
  }

  function removeError(input) {
    const errorDiv = input.parentElement.querySelector('.form-error');
    if (errorDiv) {
      errorDiv.remove();
    }
    input.classList.remove('error');
  }

  function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.setAttribute('role', 'alert');
    successDiv.innerHTML = `
      <div style="background: #10b981; color: white; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
        <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    return successDiv;
  }

  // Contact form handler
  function handleContactForm(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = form.querySelector('[name="nome"]')?.value.trim();
      const email = form.querySelector('[name="email"]')?.value.trim();
      const telefono = form.querySelector('[name="telefono"]')?.value.trim();
      const messaggio = form.querySelector('[name="messaggio"]')?.value.trim();

      let isValid = true;

      // Validate name
      if (!nome || nome.length < 2) {
        showError(form.querySelector('[name="nome"]'), i18n.t('form.nameMinLength'));
        isValid = false;
      } else {
        removeError(form.querySelector('[name="nome"]'));
      }

      // Validate email
      if (!email || !validateEmail(email)) {
        showError(form.querySelector('[name="email"]'), i18n.t('form.emailInvalid'));
        isValid = false;
      } else {
        removeError(form.querySelector('[name="email"]'));
      }

      // Validate phone (if present)
      if (telefono && !validatePhone(telefono)) {
        showError(form.querySelector('[name="telefono"]'), i18n.t('form.phoneInvalid'));
        isValid = false;
      } else if (telefono) {
        removeError(form.querySelector('[name="telefono"]'));
      }

      // Validate message
      if (!messaggio || messaggio.length < 10) {
        showError(form.querySelector('[name="messaggio"]'), i18n.t('form.messageMinLength'));
        isValid = false;
      } else {
        removeError(form.querySelector('[name="messaggio"]'));
      }

      if (!isValid) {
        return;
      }

      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = i18n.t('form.sending');

      // Create mailto link with better formatting
      const subject = encodeURIComponent(i18n.t('form.contactSubject', { name: nome }));
      const body = encodeURIComponent(
        `Nome: ${nome}\n` +
        `Email: ${email}\n` +
        (telefono ? `Telefono: ${telefono}\n` : '') +
        `\nMessaggio:\n${messaggio}`
      );

      const mailtoLink = `mailto:info@foxindustrialcontractingsrl.com?subject=${subject}&body=${body}`;

      // Try to open email client
      window.location.href = mailtoLink;

      // Show success message
      setTimeout(() => {
        const success = showSuccess(i18n.t('form.successContact'));
        form.insertBefore(success, form.firstChild);

        // Reset form after 5 seconds
        setTimeout(() => {
          form.reset();
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          success.remove();
        }, 5000);
      }, 500);
    });
  }

  // Candidature form handler
  function handleCandidatureForm(form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nome = form.querySelector('[name="nome"]')?.value.trim();
      const email = form.querySelector('[name="email"]')?.value.trim();
      const messaggio = form.querySelector('[name="messaggio"]')?.value.trim();

      let isValid = true;

      if (!nome || nome.length < 2) {
        showError(form.querySelector('[name="nome"]'), i18n.t('form.nameMinLength'));
        isValid = false;
      } else {
        removeError(form.querySelector('[name="nome"]'));
      }

      if (!email || !validateEmail(email)) {
        showError(form.querySelector('[name="email"]'), i18n.t('form.emailInvalid'));
        isValid = false;
      } else {
        removeError(form.querySelector('[name="email"]'));
      }

      if (!messaggio || messaggio.length < 10) {
        showError(form.querySelector('[name="messaggio"]'), i18n.t('form.messageMinLength'));
        isValid = false;
      } else {
        removeError(form.querySelector('[name="messaggio"]'));
      }

      if (!isValid) {
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = i18n.t('form.sending');

      const subject = encodeURIComponent(i18n.t('form.candidatureSubject', { name: nome }));
      const body = encodeURIComponent(
        i18n.t('form.candidatureFrom', { name: nome }) + `\n` +
        `Email: ${email}\n\n` +
        `Messaggio:\n${messaggio}`
      );

      const mailtoLink = `mailto:info@foxindustrialcontractingsrl.com?subject=${subject}&body=${body}`;

      window.location.href = mailtoLink;

      setTimeout(() => {
        const success = showSuccess(i18n.t('form.successCandidature'));
        form.insertBefore(success, form.firstChild);

        setTimeout(() => {
          form.reset();
          submitButton.disabled = false;
          submitButton.textContent = originalText;
          success.remove();
        }, 5000);
      }, 500);
    });
  }

  // Initialize forms on page load
  document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      handleContactForm(contactForm);
    }

    const candidaturaForm = document.getElementById('candidaturaForm');
    if (candidaturaForm) {
      handleCandidatureForm(candidaturaForm);
    }

    // Remove errors on input
    document.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', function () {
        if (this.classList.contains('error')) {
          removeError(this);
        }
      });
    });
  });
})();
