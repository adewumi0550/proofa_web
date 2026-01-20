// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCkRiWfGbEBeWSEV_pbhdEo4B9xQAb3f9U",
    authDomain: "proofa-1f184.firebaseapp.com",
    projectId: "proofa-1f184",
    storageBucket: "proofa-1f184.firebasestorage.app",
    messagingSenderId: "36981632973",
    appId: "1:36981632973:web:d03df2a004b94874395e84",
    measurementId: "G-XTREEQTWQQ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
