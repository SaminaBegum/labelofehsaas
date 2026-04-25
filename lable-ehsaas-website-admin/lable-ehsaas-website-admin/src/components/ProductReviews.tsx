// import { useState } from "react";
// import { Star } from "lucide-react";
// import { motion } from "framer-motion";

// import { db } from "@/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// type Review = {
//   id: string;
//   name: string;
//   rating: number;
//   date: string;
//   comment: string;
//   verified: boolean;
// };

// const dummyReviews: Review[] = [
//   {
//     id: "1",
//     name: "Ayesha Khan",
//     rating: 5,
//     date: "March 2026",
//     comment: "Absolutely loved the fabric and fitting. Looks premium!",
//     verified: true,
//   },
// ];

// const ProductReviews = ({ productId }: { productId: string }) => {
//   const [reviews, setReviews] = useState<Review[]>(dummyReviews);

//   const [newReview, setNewReview] = useState({
//     name: "",
//     rating: 5,
//     comment: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // ⭐ Rating calc
//   const averageRating =
//     reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

//   const ratingCount = (star: number) =>
//     reviews.filter((r) => r.rating === star).length;

//   // Submit Review
//   const handleSubmit = async () => {
//     if (!newReview.name.trim() || !newReview.comment.trim()) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       // Add review to Firestore
//       const docRef = await addDoc(collection(db, "reviews"), {
//         productId,
//         name: newReview.name,
//         rating: newReview.rating,
//         comment: newReview.comment,
//         verified: false,
//         createdAt: serverTimestamp(),
//       });

//       // Update UI
//       const newEntry = {
//         id: docRef.id,
//         name: newReview.name,
//         rating: newReview.rating,
//         comment: newReview.comment,
//         date: "Just now",
//         verified: false,
//       };

//       setReviews((prev) => [newEntry, ...prev]);

//       // Reset
//       setNewReview({ name: "", rating: 5, comment: "" });

//     } catch (error: any) {
//       console.error("FULL ERROR:", error);
//       alert(error?.message || "Error submitting review");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mt-16 border-t pt-10">
//       <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>

//       {/* ⭐ Rating Summary */}
//       <div className="flex flex-col md:flex-row gap-10 mb-10">
//         <div>
//           <div className="text-4xl font-bold">
//             {averageRating.toFixed(1)}
//           </div>

//           <div className="flex mt-2">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={20}
//                 className={`${
//                   i < Math.round(averageRating)
//                     ? "fill-yellow-400 text-yellow-400"
//                     : "text-gray-300"
//                 }`}
//               />
//             ))}
//           </div>

//           <p className="text-sm text-gray-500">
//             Based on {reviews.length} reviews
//           </p>
//         </div>

//         <div className="flex-1">
//           {[5, 4, 3, 2, 1].map((star) => (
//             <div key={star} className="flex gap-3 mb-2">
//               <span>{star}★</span>
//               <div className="flex-1 h-2 bg-gray-200 rounded">
//                 <div
//                   className="h-2 bg-yellow-400 rounded"
//                   style={{
//                     width: `${
//                       (ratingCount(star) / reviews.length) * 100
//                     }%`,
//                   }}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* ✍️ WRITE REVIEW */}
//       <div className="mb-10 border p-5 rounded-xl">
//         <h3 className="font-semibold mb-4">Write a Review</h3>

//         <input
//           type="text"
//           placeholder="Your Name"
//           className="w-full border p-2 mb-3 rounded"
//           value={newReview.name}
//           onChange={(e) =>
//             setNewReview({ ...newReview, name: e.target.value })
//           }
//         />

//         <textarea
//           placeholder="Your Review"
//           className="w-full border p-2 mb-3 rounded"
//           value={newReview.comment}
//           onChange={(e) =>
//             setNewReview({ ...newReview, comment: e.target.value })
//           }
//         />

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="mt-4 px-6 py-2 bg-black text-white rounded-full"
//         >
//           {loading ? "Submitting..." : "Submit Review"}
//         </button>
//       </div>

//       {/* 🧾 REVIEWS */}
//       <div className="space-y-6">
//         {reviews.map((review) => (
//           <motion.div key={review.id} className="border p-5 rounded-xl">
//             <div className="flex justify-between">
//               <h4>{review.name}</h4>
//               <span className="text-sm text-gray-400">
//                 {review.date}
//               </span>
//             </div>

//             <div className="flex my-2">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   size={16}
//                   className={`${
//                     i < review.rating
//                       ? "fill-yellow-400 text-yellow-400"
//                       : "text-gray-300"
//                   }`}
//                 />
//               ))}
//             </div>

//             <p>{review.comment}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductReviews;
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Star } from "lucide-react";

const ProductReviews = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<any[]>([]);

  // ✅ NEW: Review Form State
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const [loading, setLoading] = useState(false);

  /* ---------------- FETCH REVIEWS ---------------- */
  useEffect(() => {
    if (!productId) return;

    const q = query(
      collection(db, "reviews"),
      where("productId", "==", productId)
    );

    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setReviews(data);
    });

    return () => unsubscribe();
  }, [productId]);

  /* ---------------- SUBMIT REVIEW ---------------- */
  const handleSubmit = async () => {
    if (!newReview.name.trim() || !newReview.comment.trim()) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "reviews"), {
        productId,
        name: newReview.name,
        rating: newReview.rating,
        comment: newReview.comment,
        approved: false, // admin will approve
        verified: false, // will upgrade later
        createdAt: serverTimestamp(),
      });

      // Reset form
      setNewReview({ name: "", rating: 5, comment: "" });

    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- FILTER APPROVED ---------------- */
  const approvedReviews = reviews.filter((r) => r.approved);

  return (
    <div className="space-y-6">

      {/* ✍️ REVIEW FORM */}
      <div className="border p-4 rounded">
        <h3 className="font-semibold mb-3">Write a Review</h3>

        <input
          placeholder="Your name"
          className="border p-2 w-full mb-2 rounded"
          value={newReview.name}
          onChange={(e) =>
            setNewReview({ ...newReview, name: e.target.value })
          }
        />

        <textarea
          placeholder="Your review"
          className="border p-2 w-full mb-2 rounded"
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
        />

        {/* ⭐ Rating Selector */}
        <div className="flex gap-2 mb-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={18}
              onClick={() =>
                setNewReview({ ...newReview, rating: i })
              }
              className={`cursor-pointer ${
                i <= newReview.rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>

      {/* 🧾 REVIEWS LIST */}
      <div className="space-y-4">
        {approvedReviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          approvedReviews.map((r) => (
            <div key={r.id} className="border-b pb-4">

              <div className="flex items-center gap-2">
                <p className="font-semibold">
                  {r.name || "Anonymous"}
                </p>

                {r.verified && (
                  <span className="text-xs text-green-600">
                    ✓ Verified Purchase
                  </span>
                )}
              </div>

              <div className="flex mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i <= r.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>

              <p className="text-sm text-gray-600 mt-1">
                {r.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReviews;