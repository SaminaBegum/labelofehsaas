// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";
// import { useEffect, useState } from "react";
// import { db } from "@/services/firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import { useParams, Link, useSearchParams } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import { normalize } from "@/utils/normalize";
// const Category = () => {
//   const { slug } = useParams();
//   const [searchParams] = useSearchParams();
//   const typeFromURL = searchParams.get("type");

//   const [category, setCategory] = useState<any>(null);
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch category
//   useEffect(() => {
//     const fetchCategory = async () => {
//       const snapshot = await getDocs(collection(db, "categories"));

//       const data = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       const matched = data.find(
//         (cat: any) =>
//           cat.name.toLowerCase().replace(/\s+/g, "-") === slug
//       );

//       setCategory(matched);
//     };

//     fetchCategory();
//   }, [slug]);

//   // ✅ Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "products"));

//         const data = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setProducts(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);
// console.log("products:", products);
// console.log("category:", category);
//  const filteredProducts = products.filter((p) => {
  
//   const productCategory = p.category?.toLowerCase().trim();
// const categoryType = category?.type?.toLowerCase().trim();
//   const urlType = (typeFromURL || "").toLowerCase().trim();

//   if (urlType) {
//     return productCategory === urlType;
//   }

//   if (!categoryType) return true;

//   return productCategory === categoryType;
// });
// const title = category?.name || "Collection";
//   return (
//     <div className="page-fade-in">
//       <SiteHeader />

//       <main>
//         {/* Breadcrumb */}
//         <div className="container mx-auto px-6 py-6">
//           <nav className="flex items-center gap-2 text-muted-foreground">
//             <Link to="/">Home</Link>
//             <span>/</span>
//             <span className="text-foreground">{title}</span>
//           </nav>
//         </div>

//         {/* PRODUCTS */}
//         <div className="container mx-auto px-6 pb-rhythm-4">
//           <p className="text-muted-foreground mb-8">
//   {filteredProducts.length} products
// </p>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
//             {filteredProducts.map((p) => (
//               <Link
//                 key={p.id}
//                to={`/category/${slug}?type=${cat.type}`}
//                 className="group relative overflow-hidden"
//               >
//                 {/* IMAGE */}
//                 <div className="aspect-[3/4] overflow-hidden">
//                   <img
//                     src={p.imageUrl}
//                     alt={p.name}
//                     className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-90"
//                   />
//                 </div>

//                 {/* OVERLAY */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 group-hover:opacity-90 transition" />

//                 {/* BADGE */}
//                 {p.badge && (
//                   <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-[9px] uppercase px-3 py-1">
//                     {p.badge}
//                   </span>
//                 )}

//                 {/* CONTENT */}
//                 <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
//                   <p className="text-[10px] text-secondary/80 uppercase mb-1">
//                     {category?.name}
//                   </p>

//                   <h3 className="text-xl md:text-2xl italic text-primary-foreground mb-2">
//                     {p.name}
//                   </h3>

//                   <div className="flex items-center justify-between">
//                     <span className="text-[10px] text-primary-foreground/60">
//                       ₹{p.price}
//                     </span>

//                     <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
//                       <span className="text-[10px] uppercase text-secondary">
//                         View
//                       </span>
//                       <ArrowRight size={12} className="text-secondary" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* LINE */}
//                 <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-secondary transition-all duration-700" />
//               </Link>
//             ))}
//           </div>
//         </div>
//       </main>

//       <SiteFooter />
//     </div>
//   );
// };

// export default Category;
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useEffect, useState } from "react";
import { db } from "@/services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { normalize } from "@/utils/normalize";

const CategoryList = () => {
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, "categories"));

      const data = snapshot.docs.map((doc) => {
        const d = doc.data();

        return {
          id: doc.id,
          ...d,
          slug: normalize(d.slug || d.name),
          type: normalize(d.type || ""),
        };
      });

      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="page-fade-in">
      <SiteHeader />

      <main className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">All Categories</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories
            .filter((cat) => cat.showOnHomepage !== false)
            .map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}?type=${cat.type}`}
                className="group block"
              >
                {/* IMAGE */}
                <div className="aspect-[4/5] overflow-hidden rounded-xl">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>

                {/* NAME */}
                <p className="text-center mt-3 font-medium">
                  {cat.name}
                </p>
              </Link>
            ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default CategoryList;