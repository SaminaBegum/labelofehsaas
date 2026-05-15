import { db } from "./firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Product } from "../types/Product";

interface Order {
  userId: string;
  items: Product[];
  totalAmount: number;
  status: string;
  createdAt: number;
}

export const createOrder = (data: Order) =>
  addDoc(collection(db, "orders"), data);

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId)
  );

  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Order[];
};