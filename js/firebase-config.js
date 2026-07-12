// Firebase configuration for Fox Industrial CMS
// This file initializes the Firebase app and exports Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

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
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, doc, getDoc, setDoc, collection, getDocs, addDoc, deleteDoc, updateDoc, signInWithEmailAndPassword, signOut, onAuthStateChanged };
