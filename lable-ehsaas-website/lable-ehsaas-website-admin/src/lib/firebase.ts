// src/lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQWPYzdPhW8qYr9bo2UxjuUTbp08i-SNM",
  authDomain: "ehsaas-3fff7.firebaseapp.com",
  projectId: "ehsaas-3fff7",
  storageBucket: "ehsaas-3fff7.appspot.com",
  messagingSenderId: "515306557160",
  appId: "1:515306557160:web:ae8bf9d62f146dc22c435d",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);