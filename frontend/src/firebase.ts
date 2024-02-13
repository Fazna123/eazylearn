// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "eazylearn-443cb.firebaseapp.com",
  projectId: "eazylearn-443cb",
  storageBucket: "eazylearn-443cb.appspot.com",
  messagingSenderId: "590550989679",
  appId: "1:590550989679:web:86642f2db4781b2ac3469a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
