import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';  // Import initializeApp for Firebase
import { getAuth } from 'firebase/auth';  

const firebaseConfig = {
    apiKey: "AIzaSyC7EQG667NUcKXG0dG3Cr9OZr2WJVA1JP4",
    authDomain: "personalfinancetracker-63724.firebaseapp.com",
    projectId: "personalfinancetracker-63724",
    storageBucket: "personalfinancetracker-63724.firebasestorage.app",
    messagingSenderId: "298765692233",
    appId: "1:298765692233:web:6eb4ca77f7a2cbb4a23e98"
  };


const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { app, auth };