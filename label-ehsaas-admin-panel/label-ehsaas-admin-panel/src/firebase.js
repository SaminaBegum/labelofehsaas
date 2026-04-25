// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQWPYzdPhW8qYr9bo2UxjuUTbp08i-SNM",
  authDomain: "ehsaas-3fff7.firebaseapp.com",
  projectId: "ehsaas-3fff7",
  storageBucket: "ehsaas-3fff7.appspot.com",
  messagingSenderId: "515306557160",
  appId: "1:515306557160:web:01f4fa657aab718e2c435d",
  measurementId: "G-Y2FGE6PRBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);