import { db } from "@/services/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

type CustomerPayload = {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  orderAmount: number;
};

export const upsertCustomer = async ({
  name,
  email,
  phone = "",
  city = "",
  orderAmount,
}: CustomerPayload) => {
  try {
    // ✅ Safe Firestore ID
    const safeId = email.replace(/\./g, "_");

    const ref = doc(db, "customers", safeId);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      // 🆕 Create new customer
      await setDoc(ref, {
        name: name || "Unknown User",
        email,
        phone,
        city,
        orders: 1,
        totalSpent: Number(orderAmount),
        joinedAt: new Date().toISOString(),
        lastOrderAt: serverTimestamp(),
      });

      console.log("✅ New customer created:", email);
    } else {
      const existing = snap.data();

      // 🔄 Update existing customer
      await updateDoc(ref, {
        name: name || existing.name || "Unknown User",
        phone: phone || existing.phone || "",
        city: city || existing.city || "",
        orders: increment(1),
        totalSpent: increment(Number(orderAmount)),
        lastOrderAt: serverTimestamp(),
      });

      console.log("🔄 Customer updated:", email);
    }
  } catch (error) {
    console.error("❌ Customer error:", error);
  }
};