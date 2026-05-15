// import ProductCard from "./ProductCard";
// import product1 from "@/assets/product-1.jpg";
// import product2 from "@/assets/product-2.jpg";
// import product3 from "@/assets/product-3.jpg";
// import product4 from "@/assets/product-4.jpg";
// import product5 from "@/assets/product-5.jpg";
// import product6 from "@/assets/product-6.jpg";
// import product7 from "@/assets/product-7.jpg";
// import product8 from "@/assets/product-8.jpg";

// const products = [
//   { name: "Ivory Gold Anarkali", price: 8499, originalPrice: 10999, image: product1, badge: "New" },
//   { name: "Blush Silk Kurta Set", price: 6299, originalPrice: 7999, image: product2, badge: "New" },
//   { name: "Black Embroidered Gown", price: 12599, image: product3 },
//   { name: "Champagne Gold Co-ord", price: 7199, originalPrice: 8999, image: product4 },
//   { name: "Ivory Lehenga Set", price: 15999, image: product5, badge: "Bestseller" },
//   { name: "Rose Embroidered Kurta", price: 5799, originalPrice: 7299, image: product6 },
//   { name: "Wine Festive Gown", price: 11299, image: product7 },
//   { name: "Beige Contemporary Set", price: 6999, originalPrice: 8499, image: product8 },
// ];

// const NewArrivalsSection = () => {
//   return (
//     <section className="container  mx-auto py-rhythm-4">
//       <div className="flex items-end justify-between mb-rhythm-2">
//         <div>
//           <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">
//             Just In
//           </p>
//           <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up">
//             New Arrivals
//           </h2>
//         </div>
//         <a
//           href="/new-arrivals"
//           className="font-body text-xs font-light tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 hidden sm:block border-b border-muted-foreground hover:border-foreground pb-1"
//         >
//           View All
//         </a>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {products.slice(0, 4).map((p) => (
//           <ProductCard key={p.name} {...p} />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default NewArrivalsSection;

// export const BestSellersSection = () => {
//   return (
//     <section className="container mx-auto  py-rhythm-4">
//       <div className="flex items-end justify-between mb-rhythm-2">
//         <div>
//           <p className="font-body text-xs font-bold  tracking-[0.3em] text-pink-dark uppercase mb-3">
//             Most Loved
//           </p>
//           <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up">
//             Best Sellers
//           </h2>
//         </div>
//         <a
//           href="/best-sellers"
//           className="font-body text-xs font-light tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300 hidden sm:block border-b border-muted-foreground hover:border-foreground pb-1"
//         >
//           View All
//         </a>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {products.slice(4).map((p) => (
//           <ProductCard key={p.name} {...p} />
//         ))}
//       </div>
//     </section>
//   );
// };

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../services/productService";

const NewArrivalsSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ SORT BY DATE (IMPORTANT FIX)
 const getTime = (date: any) => {
  if (!date) return 0;

  // ✅ Firestore Timestamp
  if (date.seconds) {
    return date.seconds * 1000;
  }

  // ✅ ISO string
  return new Date(date).getTime();
};

const newArrivals = [...products]
  .sort((a, b) => getTime(b.createdAt) - getTime(a.createdAt))
  .slice(0, 4);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <section className="container mx-auto py-rhythm-4">
      <div className="text-center mb-6">
          <p className="font-body text-xs tracking-[0.4em] font-bold text-pink-dark uppercase mb-4 animate-fade-up">
          Our most popular New Arrivals
        </p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up">New Arrivals</h2>
        <div className="w-24 h-px bg-secondary mx-auto mt-6 animate-fade-up" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {newArrivals.map((p) => (
          <ProductCard
            key={p.id}
            slug={p.slug}
            name={p.name}
            price={p.price}
            originalPrice={p.discountPercent}
            image={
              p?.variants?.[0]?.images?.[0] ||
              p?.imageUrl ||
              "/placeholder.png"
            }
            badge="New"
            sizes={p?.variants?.[0]?.sizes || []}
          />
        ))}
      </div>
    </section>
  );
};
export default NewArrivalsSection;
export const BestSellersSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ SMART SORTING (IMPORTANT FIX)
 const bestSellers = [...products]
  .filter(p => (p.totalStock || 0) > 0)
  .sort((a, b) => {
    const score = (p: any) => {
      return (
        (p.tags?.includes("best_seller") ? 50 : 0) +
        (p.featured ? 20 : 0) +
        Math.min(p.totalStock || 0, 50) // ✅ higher stock = better
      );
    };

    return score(b) - score(a);
  })
  .slice(0, 4);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <section className="container mx-auto py-rhythm-4">
      <div className="text-center mb-6">
        <p className="font-body text-xs tracking-[0.4em] font-bold text-pink-dark uppercase mb-4 animate-fade-up">
          Our most popular designs
        </p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up">Best Sellers</h2>
        <div className="w-24 h-px bg-secondary mx-auto mt-6 animate-fade-up" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {bestSellers.map((p) => (
          <ProductCard
            key={p.id}
            slug={p.slug}
            name={p.name}
            price={p.price}
            originalPrice={p.discountPercent}
            image={
              p?.variants?.[0]?.images?.[0] ||
              p?.imageUrl ||
              "/placeholder.png"
            }
            badge="Bestseller"
            sizes={p?.variants?.[0]?.sizes || []}
          />
        ))}
      </div>
    </section>
  );
};