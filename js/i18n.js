/**
 * Internationalization (i18n) System for Fox Industrial Contracting
 * 
 * This module provides translation support for JavaScript-generated text,
 * enabling browser translation tools to work properly.
 */
(function() {
  'use strict';
  
  // Default language
  const defaultLang = 'it';
  
  // Translations object
  const translations = {
    it: {
      // Carousel and modal
      carousel: {
        projectAlt: 'Progetto {index} - Fox Industrial Contracting',
        photoAlt: 'Foto {index} di {title}',
        prevImage: 'Immagine precedente',
        nextImage: 'Immagine successiva',
        prevProject: 'Progetto Precedente',
        nextProject: 'Progetto Successivo',
        imageNotFound: 'Immagine non trovata',
        imageNotAvailable: 'Immagine non disponibile',
        modalTitle: 'Galleria immagini del progetto'
      },
      
      // Form validation
      form: {
        nameMinLength: 'Il nome deve contenere almeno 2 caratteri',
        emailInvalid: 'Inserisci un indirizzo email valido',
        phoneInvalid: 'Inserisci un numero di telefono valido',
        messageMinLength: 'Il messaggio deve contenere almeno 10 caratteri',
        sending: 'Invio in corso...',
        successContact: 'Il tuo messaggio verrà inviato tramite il client email. Se non si apre automaticamente, copia il contenuto e invialo a info@foxindustrialcontractingsrl.com',
        successCandidature: 'La tua candidatura verrà inviata tramite il client email. Se non si apre automaticamente, copia il contenuto e invialo a info@foxindustrialcontractingsrl.com',
        contactSubject: 'Richiesta di contatto da {name}',
        candidatureSubject: 'Candidatura - {name}',
        candidatureFrom: 'Candidatura da: {name}'
      },
      
      // General UI
      ui: {
        openMenu: 'Apri menu',
        closeMenu: 'Chiudi menu',
        contactUs: 'Contattaci',
        scrollToContinue: 'Scorri per continuare',
        skipToMain: 'Salta al contenuto principale'
      }
    },
    
    // English translations (for future use)
    en: {
      carousel: {
        projectAlt: 'Project {index} - Fox Industrial Contracting',
        photoAlt: 'Photo {index} of {title}',
        prevImage: 'Previous image',
        nextImage: 'Next image',
        prevProject: 'Previous Project',
        nextProject: 'Next Project',
        imageNotFound: 'Image not found',
        imageNotAvailable: 'Image not available',
        modalTitle: 'Project image gallery'
      },
      
      form: {
        nameMinLength: 'Name must be at least 2 characters',
        emailInvalid: 'Please enter a valid email address',
        phoneInvalid: 'Please enter a valid phone number',
        messageMinLength: 'Message must be at least 10 characters',
        sending: 'Sending...',
        successContact: 'Your message will be sent via email client. If it doesn\'t open automatically, copy the content and send it to info@foxindustrialcontractingsrl.com',
        successCandidature: 'Your application will be sent via email client. If it doesn\'t open automatically, copy the content and send it to info@foxindustrialcontractingsrl.com',
        contactSubject: 'Contact request from {name}',
        candidatureSubject: 'Application - {name}',
        candidatureFrom: 'Application from: {name}'
      },
      
      ui: {
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        contactUs: 'Contact us',
        scrollToContinue: 'Scroll to continue',
        skipToMain: 'Skip to main content'
      }
    }
  };
  
  /**
   * Get the current language from html lang attribute or default
   */
  function getCurrentLang() {
    const htmlLang = document.documentElement.lang;
    return translations[htmlLang] ? htmlLang : defaultLang;
  }
  
  /**
   * Get a nested property from an object using dot notation
   * e.g., getNestedValue(obj, 'carousel.projectAlt')
   */
  function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  }
  
  /**
   * Replace placeholders in a string
   * e.g., replaceParams('Hello {name}', { name: 'World' }) => 'Hello World'
   */
  function replaceParams(str, params) {
    if (!params) return str;
    
    return Object.keys(params).reduce((result, key) => {
      const regex = new RegExp(`\\{${key}\\}`, 'g');
      return result.replace(regex, params[key]);
    }, str);
  }
  
  /**
   * Translate a key with optional parameters
   * @param {string} key - The translation key (e.g., 'carousel.projectAlt')
   * @param {object} params - Optional parameters for placeholder replacement
   * @returns {string} The translated string or the key if not found
   */
  function t(key, params) {
    const lang = getCurrentLang();
    const translation = getNestedValue(translations[lang], key);
    
    if (translation === null) {
      console.warn(`[i18n] Missing translation for key: ${key}`);
      return key;
    }
    
    return replaceParams(translation, params);
  }
  
  /**
   * Get all translations for a specific namespace
   * @param {string} namespace - The namespace (e.g., 'form')
   * @returns {object} All translations in that namespace
   */
  function getNamespace(namespace) {
    const lang = getCurrentLang();
    return translations[lang][namespace] || {};
  }
  
  /**
   * Set the current language
   * @param {string} lang - The language code (e.g., 'it', 'en')
   */
  function setLang(lang) {
    if (translations[lang]) {
      document.documentElement.lang = lang;
      return true;
    }
    return false;
  }
  
  /**
   * Get available languages
   * @returns {string[]} Array of available language codes
   */
  function getAvailableLangs() {
    return Object.keys(translations);
  }
  
  // Export to global scope
  window.i18n = {
    t: t,
    getNamespace: getNamespace,
    setLang: setLang,
    getCurrentLang: getCurrentLang,
    getAvailableLangs: getAvailableLangs
  };
})();
