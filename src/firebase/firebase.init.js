// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,

//   apiKey: "AIzaSyAa0uQNJb8AvCaHMkg2_sZpmmPFXuIO7y0",
//   authDomain: "edura-bb64d.firebaseapp.com",
//   projectId: "edura-bb64d",
//   storageBucket: "edura-bb64d.firebasestorage.app",
//   messagingSenderId: "526749369377",
//   appId: "1:526749369377:web:a66a772026b278ad55cf60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);