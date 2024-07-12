// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0ccOGMM2nqsaONnkNiygDMiitrbEshjM",
  authDomain: "react-notes-cde7a.firebaseapp.com",
  projectId: "react-notes-cde7a",
  storageBucket: "react-notes-cde7a.appspot.com",
  messagingSenderId: "1062833748795",
  appId: "1:1062833748795:web:8f8fd377176aeb0596551e",
  measurementId: "G-T4HDTV049T",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
