import DOMPurify from 'https://cdn.jsdelivr.net/npm/dompurify@3.1.5/dist/purify.es.mjs';
import { signOut } from './firebase-config.js';

// ── SESSION MANAGEMENT ──
const SESSION_TIMEOUT_MS = 2 * 60 * 60 * 1000; // 2 hours
let lastActivityTime = Date.now();

export function setupSessionTimeout(auth) {
  const resetTimer = () => { lastActivityTime = Date.now(); };
  ['click', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, resetTimer, { passive: true });
  });

  setInterval(() => {
    if (auth.currentUser && Date.now() - lastActivityTime > SESSION_TIMEOUT_MS) {
      signOut(auth).then(() => {
        alert("Sessione scaduta per inattività. Esegui nuovamente l'accesso.");
        window.location.reload();
      });
    }
  }, 60000); // check every minute
}

// ── SANITIZATION ──
export function sanitizeHtml(dirty) {
  if (typeof dirty !== 'string') return '';
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br', 'p'] });
}

export function sanitizeText(dirty) {
  if (typeof dirty !== 'string') return '';
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [] }).trim();
}

// ── VALIDATION SCHEMAS ──
export function validateWorkData(data) {
  const errors = [];
  if (!data.client || data.client.length > 200) errors.push("Il nome del cliente è obbligatorio e deve essere < 200 caratteri.");
  if (data.description && data.description.length > 2000) errors.push("La descrizione non può superare i 2000 caratteri.");
  if (data.location && data.location.length > 200) errors.push("Il luogo non può superare i 200 caratteri.");
  
  if (errors.length > 0) throw new Error(errors.join("\n"));
  return true;
}

// ── BRUTE FORCE PROTECTION (Client Side UI) ──
const LOGIN_ATTEMPTS_KEY = 'cms_login_attempts';
const LOGIN_LOCKOUT_KEY = 'cms_login_lockout';

export function checkLoginBruteForce() {
  const lockout = localStorage.getItem(LOGIN_LOCKOUT_KEY);
  if (lockout && Date.now() < parseInt(lockout)) {
    const remainingMin = Math.ceil((parseInt(lockout) - Date.now()) / 60000);
    throw new Error(`Troppi tentativi falliti. Riprova tra ${remainingMin} minuti.`);
  }
}

export function recordFailedLogin() {
  let attempts = parseInt(localStorage.getItem(LOGIN_ATTEMPTS_KEY) || '0');
  attempts++;
  localStorage.setItem(LOGIN_ATTEMPTS_KEY, attempts.toString());
  
  if (attempts >= 5) {
    // 15 minutes lockout
    localStorage.setItem(LOGIN_LOCKOUT_KEY, (Date.now() + 15 * 60000).toString());
    localStorage.setItem(LOGIN_ATTEMPTS_KEY, '0');
    throw new Error("Troppi tentativi falliti. Account bloccato per 15 minuti.");
  }
}

export function clearFailedLogin() {
  localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
  localStorage.removeItem(LOGIN_LOCKOUT_KEY);
}
