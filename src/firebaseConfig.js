// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4jkEUtImgAJLYl9aAGMeJjSy7M3Fwvdo",
  authDomain: "fitness-app-1fe3d.firebaseapp.com",
  projectId: "fitness-app-1fe3d",
  storageBucket: "fitness-app-1fe3d.appspot.com",
  messagingSenderId: "670546905502",
  appId: "1:670546905502:web:300c5b6b529bb67d9dae8f",
  measurementId: "G-HZDPZEX5WL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);