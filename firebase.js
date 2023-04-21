// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByLN6ZgNQTfBm7qCj_zWvYSfktZVLTklE",
  authDomain: "tinderrh-52144.firebaseapp.com",
  projectId: "tinderrh-52144",
  storageBucket: "tinderrh-52144.appspot.com",
  messagingSenderId: "497994295868",
  appId: "1:497994295868:web:bd3317ed821cf3db603139",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export { auth, db };
