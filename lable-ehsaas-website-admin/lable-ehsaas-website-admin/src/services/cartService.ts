import { db } from "./firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { Product } from "../types/Product";

export const saveCartToDB = async (userId: string, cart: Product[]) => {
  await setDoc(doc(db, "cart", userId), { items: cart });
};

export const getCartFromDB = async (userId: string): Promise<Product[]> => {
  const snap = await getDoc(doc(db, "cart", userId));
  return snap.exists() ? (snap.data().items as Product[]) : [];
};