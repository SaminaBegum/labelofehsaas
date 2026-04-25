import { db } from "../services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const testFirestore = async () => {
  try {
    const ref = doc(db, "test", "connection");
    await getDoc(ref);
    console.log("🔥 Firestore connection SUCCESS");
  } catch (err) {
    console.error("❌ Firestore ERROR:", err);
  }
};