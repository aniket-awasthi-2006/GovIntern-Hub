import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FirebaseOptions } from "firebase/app";

// 🔹 Replace with your Firebase config
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyCYWBtXJm2tadLw9-XTR78161as3z95kqw",
  authDomain: "governmentinternaimatch.firebaseapp.com",
  projectId: "governmentinternaimatch",
  storageBucket: "governmentinternaimatch.firebasestorage.app",
  messagingSenderId: "305179289696",
  appId: "1:305179289696:web:e1bced3e12ec99d502fb05",
  measurementId: "G-JTW9NG935E"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
