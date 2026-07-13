// Firebase configuration for Fox Industrial CMS
// This file initializes the Firebase app and exports Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFunctions, httpsCallable } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-functions.js';

const firebaseConfig = {
  apiKey: "AIzaSyBeCNdHZvODymQxSXYqO6IWAFqnAL43oEc",
  authDomain: "fox-industrial.firebaseapp.com",
  projectId: "fox-industrial",
  storageBucket: "fox-industrial.firebasestorage.app",
  messagingSenderId: "665503968122",
  appId: "1:665503968122:web:909d3efc92ce5809ca04c3",
  measurementId: "G-PS00FY66B8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app, 'us-central1'); // Default region

export { 
  auth, functions, 
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  httpsCallable
};
