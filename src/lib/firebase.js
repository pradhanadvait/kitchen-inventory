// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQri88OJWMi57m_NPHOnp8NYZkGNUT6Dc",
  authDomain: "kitchen-inventory-1e601.firebaseapp.com",
  projectId: "kitchen-inventory-1e601",
  storageBucket: "kitchen-inventory-1e601.firebasestorage.app",
  messagingSenderId: "948651838547",
  appId: "1:948651838547:web:14c7e49cbf49da70c38aa6",
  measurementId: "G-TF98GS23R4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);