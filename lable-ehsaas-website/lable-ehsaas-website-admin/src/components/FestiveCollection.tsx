// import { motion } from "framer-motion";
// import ProductCard from "./ProductCard";

// // ✅ Import festive images (separate from other sections)
// import festive1 from "@/assets/product-1.jpg";
// import festive2 from "@/assets/product-2.jpg";
// import festive3 from "@/assets/product-3.jpg";
// import festive4 from "@/assets/product-4.jpg";

// // 🎉 Separate Festive Products Data
// const festiveProducts = [
//   { name: "Royal Silk Saree", price: 9499, originalPrice: 11999, image: festive1, badge: "Festive" },
//   { name: "Bridal Lehenga Set", price: 18999, image: festive2, badge: "Trending" },
//   { name: "Golden Anarkali", price: 7999, originalPrice: 9999, image: festive3 },
//   { name: "Designer Festive Kurti", price: 3499, originalPrice: 4999, image: festive4 },
// ];

// // ✅ Separate Festive Collection Component
// export default function FestiveCollection() {
//   return (
//     <section className="container mx-auto px-6 py-12 ">
//       {/* Heading */}
//       <div className="flex items-end justify-between mb-8">
//         <div>
//           <p className="text-xs font-bold tracking-[0.3em] text-pink-600 uppercase mb-2">
//             Festive Edit
//           </p>
//           <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up">
//             Festive Collection ✨
//           </h2>
//         </div>
//         <a
//           href="/new-arrivals"
//           className="text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-black transition hidden sm:block border-b border-gray-400 hover:border-black pb-1"
//         >
//           View All
//         </a>
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//         {festiveProducts.map((p, index) => (
//           <motion.div
//             key={p.name}
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: index * 0.1 }}
//           >
//             <ProductCard {...p} />
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

import { db } from "@/services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function FestiveCollection() {
  const [products, setProducts] = useState<any[]>([]);
const [collectionData, setCollectionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ 1. Get Collections
        const colSnap = await getDocs(collection(db, "collections"));

        const collectionsData = colSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ✅ Find Festive Collection
        const festiveCollection = collectionsData.find(
          (c: any) => c.slug === "festive-collection"
        );

        setCollectionData(festiveCollection);

        // ✅ 2. Get Products
        const prodSnap = await getDocs(collection(db, "products"));

        const productsData = prodSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // ✅ FILTER using collection slug
        // const festiveProducts = productsData.filter(
        //   (p: any) => p.collection === "festive-collection"
        // );
if (!festiveCollection) {
  console.warn("Festive collection not found");
  setProducts([]);
  setLoading(false);
  return;
}

const LIMIT = 4;

const festiveProducts = productsData.filter(
  (p: any) =>
    p.collection &&
    p.collection.toLowerCase().trim() ===
      festiveCollection.slug.toLowerCase().trim()
);

// ✅ ONLY THIS
setProducts(festiveProducts.slice(0, LIMIT));
       

      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="container mx-auto px-6 py-12">
      
      {/* Heading */}
      <div className="flex items-end justify-between mb-8">
        <div>
         <p className="text-xs font-bold tracking-[0.3em] text-pink-600 uppercase mb-2">
  {collectionData?.name || "Collection"}
</p>

<h2 className="font-heading text-4xl md:text-6xl font-bold italic">
  {collectionData?.name || " Festive Collection"} ✨
</h2>
        </div>

        <a
          href="/collections"
          className="text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-black transition hidden sm:block border-b border-gray-400 hover:border-black pb-1"
        >
          View All
        </a>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No festive products found
        </p>
      ) : (

        /* Grid */
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ProductCard
                name={p.name}
                price={p.price}
                originalPrice={p.originalPrice}
               image={
  p.imageUrl?.startsWith("http")
    ? p.imageUrl
    : "/placeholder.jpg"
}
                badge={p.badge}
              />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
