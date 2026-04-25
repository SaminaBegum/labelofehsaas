// admin/src/services/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQWPYzdPhW8qYr9bo2UxjuUTbp08i-SNM",
  authDomain: "ehsaas-3fff7.firebaseapp.com",
  projectId: "ehsaas-3fff7",
  storageBucket: "ehsaas-3fff7.appspot.com", // ✅ Corrected
  messagingSenderId: "515306557160",
  appId: "1:515306557160:web:01f4fa657aab718e2c435d",
  measurementId: "G-Y2FGE6PRBV"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// 🔥 TEST FIRESTORE CONNECTION
export const testFirestoreConnection = async () => {
  try {
    await getDocs(collection(db, "test")); // collection name can be anything
    console.log("🔥 Firestore connection SUCCESS");
  } catch (error) {
    console.error("❌ Firestore connection FAILED:", error);
  }
};