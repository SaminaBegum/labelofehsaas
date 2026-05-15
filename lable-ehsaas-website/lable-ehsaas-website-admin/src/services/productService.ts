import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebaseConfig";

export interface SizeStock {
  size: string;
  stock: number;
}

export interface Variant {
  color: string;
  images: string[];
  sizes: SizeStock[];
}

export interface Product {
  id: string; // ✅ make required
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
  variants: Variant[]; // ✅ IMPORTANT
  createdAt?: any;
  collection?: string;
  tags?: string[];
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, "products"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id, // ✅ CRITICAL FIX
      ...doc.data(),
      variants: doc.data().variants || [], // ✅ safety fallback
    })) as Product[];

  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};