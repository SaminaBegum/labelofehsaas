// import { useParams, Link } from "react-router-dom";
// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";
// import ProductCard from "@/components/ProductCard";
// import product1 from "@/assets/product-1.jpg";
// import product2 from "@/assets/product-2.jpg";
// import product3 from "@/assets/product-3.jpg";
// import product4 from "@/assets/product-4.jpg";
// import product5 from "@/assets/product-5.jpg";
// import product6 from "@/assets/product-6.jpg";
// import product7 from "@/assets/product-7.jpg";
// import product8 from "@/assets/product-8.jpg";
// import catDresses from "@/assets/category-dresses.jpg";
// import catEthnic from "@/assets/category-ethnic.jpg";
// import catTops from "@/assets/category-tops.jpg";
// import catCoords from "@/assets/category-coords.jpg";
// import catCasual from "@/assets/category-casual.jpg";
// import catParty from "@/assets/category-party.jpg";

// const categoryMeta: Record<string, { title: string; subtitle: string; banner: string }> = {
//   "dresses": { title: "Dresses", subtitle: "Effortless elegance for every occasion", banner: catDresses },
//   "ethnic-wear": { title: "Ethnic Wear", subtitle: "Timeless Indian silhouettes", banner: catEthnic },
//   "tops": { title: "Tops", subtitle: "Chic & contemporary styles", banner: catTops },
//   "co-ord-sets": { title: "Co-ord Sets", subtitle: "Matching sets, effortless style", banner: catCoords },
//   "casual-wear": { title: "Casual Wear", subtitle: "Everyday luxury comfort", banner: catCasual },
//   "party-wear": { title: "Party Wear", subtitle: "Celebrate in style", banner: catParty },
// };

// const allProducts = [
//   { name: "Ivory Gold Anarkali", price: 8499, originalPrice: 10999, image: product1, badge: "New" },
//   { name: "Blush Silk Kurta Set", price: 6299, originalPrice: 7999, image: product2, badge: "New" },
//   { name: "Black Embroidered Gown", price: 12599, image: product3 },
//   { name: "Champagne Gold Co-ord", price: 7199, originalPrice: 8999, image: product4 },
//   { name: "Ivory Lehenga Set", price: 15999, image: product5, badge: "Bestseller" },
//   { name: "Rose Embroidered Kurta", price: 5799, originalPrice: 7299, image: product6 },
//   { name: "Wine Festive Gown", price: 11299, image: product7 },
//   { name: "Beige Contemporary Set", price: 6999, originalPrice: 8499, image: product8 },
// ];

// const Category = () => {
//   const { slug } = useParams();
//   const meta = categoryMeta[slug || ""] || { title: "Collection", subtitle: "Explore our curated pieces", banner: catDresses };

//   return (
//     <div className="page-fade-in">
//       <SiteHeader />
//       <main>
//         {/* Category hero banner */}
//         <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
//           <img src={meta.banner} alt={meta.title} className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />
//           <div className="absolute inset-0 bg-foreground/40" />
//           <div className="relative z-10 h-full flex items-center justify-center text-center">
//             <div>
//               <p className="font-body text-xs font-light tracking-[0.4em] text-primary-foreground/70 uppercase mb-3 animate-fade-up">{meta.subtitle}</p>
//               <h1 className="font-heading text-5xl md:text-7xl font-light italic text-primary-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
//                 {meta.title}
//               </h1>
//             </div>
//           </div>
//         </div>

//         {/* Breadcrumb */}
//         <div className="container mx-auto px-6 py-6">
//           <nav className="flex items-center gap-2 font-body text-xs font-light text-muted-foreground">
//             <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
//             <span>/</span>
//             <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
//             <span>/</span>
//             <span className="text-foreground">{meta.title}</span>
//           </nav>
//         </div>

//         {/* Products grid */}
//         <div className="container mx-auto px-6 pb-rhythm-4">
//           <p className="font-body text-xs font-light text-muted-foreground mb-8">
//             {allProducts.length} products
//           </p>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {allProducts.map((p, i) => (
//               <div key={`${p.name}-${i}`} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
//                 <ProductCard {...p} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//       <SiteFooter />
//     </div>
//   );
// };

// export default Category;
import { useParams, Link, useSearchParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { db } from "@/services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { normalize } from "@/utils/normalize";

const Category = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const urlType = normalize(searchParams.get("type") || "");

  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch categories (for title only)
  useEffect(() => {
    const fetchCategory = async () => {
      const snapshot = await getDocs(collection(db, "categories"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const matched = data.find(
        (cat: any) =>
          normalize(cat.name) === normalize(slug || "")
      );

      setCategory(matched);
    };

    fetchCategory();
  }, [slug]);

  // ✅ Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // ✅ FILTER LOGIC (same system as CategoriesSection)
  const filteredProducts = products.filter((p) => {
    const productType = normalize(p.category || "");

    if (urlType) {
      return productType === urlType;
    }

    const categoryType = normalize(category?.type || "");
    return productType === categoryType;
  });

  const title = category?.name || "Collection";

  return (
    <div className="page-fade-in">
      <SiteHeader />

      <main>
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 py-6">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/">Home</Link>
            <span>/</span>
            <span className="text-foreground">{title}</span>
          </nav>
        </div>

        {/* Products count */}
        <div className="container mx-auto px-6 pb-4">
          <p className="text-xs text-muted-foreground">
            {filteredProducts.length} products
          </p>
        </div>

        {/* Products grid */}
        <div className="container mx-auto px-6 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p, i) => (
              <div
                key={p.id}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <ProductCard {...p} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Category;