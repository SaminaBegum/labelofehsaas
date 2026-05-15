import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

export const updateProductRating = async (productId: string) => {
  const q = query(
    collection(db, "reviews"),
    where("productId", "==", productId),
    where("approved", "==", true)
  );

  const snap = await getDocs(q);

  const reviews = snap.docs.map((d) => d.data());

  const ratingCount = reviews.length;

  const avg =
    ratingCount > 0
      ? reviews.reduce((s: number, r: any) => s + r.rating, 0) /
        ratingCount
      : 0;

  await updateDoc(doc(db, "products", productId), {
    rating: Number(avg.toFixed(1)),
    ratingCount,
  });
};