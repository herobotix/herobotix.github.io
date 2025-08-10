// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAebfSk5rUu0Yyl-vtiq4ed17PtZGZOnq4",
    authDomain: "herobotix-email-service.firebaseapp.com",
    projectId: "herobotix-email-service",
    storageBucket: "herobotix-email-service.firebasestorage.app",
    messagingSenderId: "972248405749",
    appId: "1:972248405749:web:896cae0182bf41f6f957bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
