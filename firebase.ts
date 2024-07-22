// Import the functions you need from the SDKs you need
import {
  initializeApp,
  getApps,
  getApp,
} from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtjSykKePbZN8MoELafID05glpvT6aFMU",
  authDomain: "notion-ai-59c71.firebaseapp.com",
  projectId: "notion-ai-59c71",
  storageBucket: "notion-ai-59c71.appspot.com",
  messagingSenderId: "255735674016",
  appId: "1:255735674016:web:e7b92c840f18dd08e2c5c5",
};

// Initialize Firebase
const app =
  getApps.length === 0
    ? initializeApp(firebaseConfig)
    : getApp();

const db = getFirestore(app);

export { db };
