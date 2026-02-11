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
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.5rem';

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
      <div style="background: #10b981; color: white; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; display: flex; align-items: center; gap: 0.5rem; animation: slideDown 0.5s ease-out;">
        <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    return successDiv;
  }

  function showFailure(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-failure';
    errorDiv.setAttribute('role', 'alert');
    errorDiv.innerHTML = `
      <div style="background: #ef4444; color: white; padding: 1rem; border-radius: 0.5rem; margin: 1rem 0; display: flex; align-items: center; gap: 0.5rem; animation: slideDown 0.5s ease-out;">
        <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>${message}</span>
      </div>
    `;
    return errorDiv;
  }

  // Generic Netlify Form Handler
  function handleNetlifyForm(form, successMessageKey) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic Validation
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;

      inputs.forEach(input => {
        if (!input.value.trim()) {
          showError(input, i18n.t('form.requiredField') || 'Campo obbligatorio');
          isValid = false;
        } else {
          if (input.type === 'email' && !validateEmail(input.value)) {
            showError(input, i18n.t('form.emailInvalid'));
            isValid = false;
          } else {
            removeError(input);
          }
        }
      });

      if (!isValid) return;

      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = i18n.t('form.sending') || 'Invio in corso...';

      // Prepare form data for Netlify
      const formData = new FormData(form);

      fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      })
        .then(() => {
          // Success
          const successmsg = i18n.t(successMessageKey) || 'Messaggio inviato con successo!';
          const successEl = showSuccess(successmsg);
          form.insertBefore(successEl, form.firstChild);
          form.reset();

          // Remove success message after 5 seconds
          setTimeout(() => {
            if (successEl && successEl.parentNode) successEl.remove();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }, 5000);
        })
        .catch((error) => {
          // Error
          console.error('Form submission error:', error);
          const errorEl = showFailure(i18n.t('form.errorGeneric') || 'Si è verificato un errore. Riprova più tardi.');
          form.insertBefore(errorEl, form.firstChild);

          setTimeout(() => {
            if (errorEl && errorEl.parentNode) errorEl.remove();
            submitButton.disabled = false;
            submitButton.textContent = originalText;
          }, 5000);
        });
    });
  }

  // Initialize forms on page load
  document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      handleNetlifyForm(contactForm, 'form.successContact');
    }

    const candidaturaForm = document.getElementById('candidaturaForm');
    if (candidaturaForm) {
      handleNetlifyForm(candidaturaForm, 'form.successCandidature');
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
