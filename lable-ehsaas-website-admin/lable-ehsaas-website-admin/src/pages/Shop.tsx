//  import { useState } from "react";
// import { Filter, ChevronDown } from "lucide-react";
// import { useParams } from "react-router-dom";
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

// // ❗ Added unique slug to each product
// const allProducts = [
//   { id: 1, slug: "ivory-gold-anarkali", name: "Ivory Gold Anarkali", price: 8499, originalPrice: 10999, image: product1, badge: "New", category: "Ethnic Wear" },
//   { id: 2, slug: "blush-silk-kurta-set", name: "Blush Silk Kurta Set", price: 6299, originalPrice: 7999, image: product2, badge: "New", category: "Co-ord Sets" },
//   { id: 3, slug: "black-embroidered-gown", name: "Black Embroidered Gown", price: 12599, image: product3, category: "Party Wear" },
//   { id: 4, slug: "champagne-gold-coord", name: "Champagne Gold Co-ord", price: 7199, originalPrice: 8999, image: product4, category: "Co-ord Sets" },
//   { id: 5, slug: "ivory-lehenga-set", name: "Ivory Lehenga Set", price: 15999, image: product5, badge: "Bestseller", category: "Ethnic Wear" },
//   { id: 6, slug: "rose-embroidered-kurta", name: "Rose Embroidered Kurta", price: 5799, originalPrice: 7299, image: product6, category: "Dresses" },
//   { id: 7, slug: "wine-festive-gown", name: "Wine Festive Gown", price: 11299, image: product7, category: "Party Wear" },
//   { id: 8, slug: "beige-contemporary-set", name: "Beige Contemporary Set", price: 6999, originalPrice: 8499, image: product8, category: "Indo-Western" },
//   { id: 9, slug: "champagne-anarkali-suit", name: "Champagne Anarkali Suit", price: 9499, image: product1, category: "Ethnic Wear" },
//   { id: 10, slug: "blush-festive-lehenga", name: "Blush Festive Lehenga", price: 18999, originalPrice: 22999, image: product5, badge: "Limited", category: "Ethnic Wear" },
//   { id: 11, slug: "noir-silk-kurta", name: "Noir Silk Kurta", price: 7899, image: product3, category: "Ethnic Wear" },
//   { id: 12, slug: "ivory-indo-western-dress", name: "Ivory Indo-Western Dress", price: 8999, originalPrice: 10999, image: product8, category: "Indo-Western" },
// ];

// const categories = ["All", "Ethnic Wear", "Indo-Western", "Co-ord Sets", "Party Wear", "Dresses"];
// const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Best Selling"];

// const Shop = () => {
//   const { category: urlCategory } = useParams();
//   const initialCategory = urlCategory
//     ? categories.find(c => c.toLowerCase().replace(/\s+/g, "-") === urlCategory) || "All"
//     : "All";

//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);
//   const [sortBy, setSortBy] = useState("Newest");
//   const [showFilters, setShowFilters] = useState(false);

//   const filteredProducts = allProducts
//     .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
//     .sort((a, b) => {
//       if (sortBy === "Price: Low to High") return a.price - b.price;
//       if (sortBy === "Price: High to Low") return b.price - a.price;
//       return 0;
//     });

//   return (
//     <div className="page-fade-in">
//       <SiteHeader />
//       <main>
//         <div className="bg-secondary py-rhythm-3">
//           <div className="container mx-auto px-6 text-center">
//             <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">
//               Explore Our Collection
//             </p>
//             <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">
//               {selectedCategory === "All" ? "Shop" : selectedCategory}
//             </h1>
//           </div>
//         </div>

//         <div className="container mx-auto px-6 py-rhythm-2">
//           <div className="flex items-center justify-between mb-rhythm-2 pb-6 border-b border-border">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 font-body text-xs font-light tracking-[0.15em] uppercase text-foreground hover:text-pink-dark transition-colors duration-300 md:hidden"
//             >
//               <Filter size={16} strokeWidth={1.5} /> Filters
//             </button>

//             <div className="hidden md:flex items-center gap-8">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`font-body text-xs font-light tracking-[0.15em] uppercase transition-colors duration-300 pb-1 ${
//                     selectedCategory === cat
//                       ? "text-foreground border-b border-foreground"
//                       : "text-muted-foreground hover:text-foreground"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             <div className="relative group">
//               <button className="flex items-center gap-2 font-body text-xs font-light tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-300">
//                 Sort by: {sortBy} <ChevronDown size={14} strokeWidth={1.5} />
//               </button>
//               <div className="absolute right-0 top-full mt-2 bg-card border border-border py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-20">
//                 {sortOptions.map((opt) => (
//                   <button
//                     key={opt}
//                     onClick={() => setSortBy(opt)}
//                     className={`block w-full text-left px-4 py-2 font-body text-xs font-light ${
//                       sortBy === opt ? "text-foreground" : "text-muted-foreground hover:text-foreground"
//                     } transition-colors duration-200`}
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {showFilters && (
//             <div className="md:hidden mb-6 flex flex-wrap gap-3 animate-fade-up">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => {
//                     setSelectedCategory(cat);
//                     setShowFilters(false);
//                   }}
//                   className={`font-body text-xs font-light tracking-[0.1em] uppercase px-4 py-2 border transition-colors duration-300 ${
//                     selectedCategory === cat
//                       ? "border-foreground text-foreground bg-secondary"
//                       : "border-border text-muted-foreground"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           )}

//           <p className="font-body text-xs font-light text-muted-foreground mb-8">
//             {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
//           </p>

//           {/* ⬇ Passed slug to ProductCard */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((p, i) => (
//               <ProductCard
//                 key={`${p.name}-${i}`}
//                 slug={p.slug}
//                 name={p.name}
//                 price={p.price}
//                 originalPrice={p.originalPrice}
//                 image={p.image}
//                 badge={p.badge}
//               />
//             ))}
//           </div>
//         </div>
//       </main>
//       <SiteFooter />
//     </div>
//   );
// };

// export default Shop;
// import { useState, useEffect } from "react";
// import { Filter, ChevronDown } from "lucide-react";
// import { useParams } from "react-router-dom";
// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";
// import ProductCard from "@/components/ProductCard";
// import { getProducts } from "@/services/productService";
// import { normalize } from "@/utils/normalize";
// const categories = ["All", "Co-Ord Set", "Stitched", "Unstitched"];
// const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Best Selling"];

// const Shop = () => {
//   const { category: urlCategory } = useParams();

//   const initialCategory = urlCategory
//     ? categories.find(c => c.toLowerCase().replace(/\s+/g, "-") === urlCategory) || "All"
//     : "All";

//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);
//   const [sortBy, setSortBy] = useState("Newest");
//   const [showFilters, setShowFilters] = useState(false);

//   const [allProducts, setAllProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 🔥 Fetch from Firebase
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await getProducts();

//         const formatted = data.map((item: any) => ({
//           id: item.id,
//           slug: item.slug || item.title.toLowerCase().replace(/\s+/g, "-"),
//          name: item.name,
//           price: item.price,
//           originalPrice: item.originalPrice || null,
//           image: item.imageUrl,
//           badge: item.badge || null,
//           category: item.category,
//         }));

//         setAllProducts(formatted);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // 🔥 Filtering + Sorting
//   const filteredProducts = allProducts
//     .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
//     .sort((a, b) => {
//       if (sortBy === "Price: Low to High") return a.price - b.price;
//       if (sortBy === "Price: High to Low") return b.price - a.price;
//       return 0;
//     });

//   // 🔥 Loading UI
//   if (loading) {
//     return (
//       <div className="text-center py-20">
//         <SiteHeader />
//         <p>Loading products...</p>
//         <SiteFooter />
//       </div>
//     );
//   }

//   return (
//     <div className="page-fade-in">
//       <SiteHeader />

//       <main>
//         <div className="bg-secondary py-rhythm-3">
//           <div className="container mx-auto px-6 text-center">
//             <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">
//               Explore Our Collection
//             </p>
//             <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">
//               {selectedCategory === "All" ? "Shop" : selectedCategory}
//             </h1>
//           </div>
//         </div>

//         <div className="container mx-auto px-6 py-rhythm-2">
//           <div className="flex items-center justify-between mb-rhythm-2 pb-6 border-b border-border">

//             {/* Mobile Filter Button */}
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className="flex items-center gap-2 font-body text-xs font-light tracking-[0.15em] uppercase text-foreground hover:text-pink-dark transition"
//             >
//               <Filter size={16} strokeWidth={1.5} /> Filters
//             </button>

//             {/* Desktop Categories */}
//             <div className="hidden md:flex items-center gap-8">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => setSelectedCategory(cat)}
//                   className={`font-body text-xs uppercase pb-1 ${
//                     selectedCategory === cat
//                       ? "text-foreground border-b border-foreground"
//                       : "text-muted-foreground hover:text-foreground"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>

//             {/* Sort */}
//             <div className="relative group">
//               <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
//                 Sort by: {sortBy} <ChevronDown size={14} />
//               </button>

//               <div className="absolute right-0 top-full mt-2 bg-card border py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition z-20">
//                 {sortOptions.map((opt) => (
//                   <button
//                     key={opt}
//                     onClick={() => setSortBy(opt)}
//                     className="block w-full text-left px-4 py-2 text-xs hover:text-foreground"
//                   >
//                     {opt}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Mobile Filters */}
//           {showFilters && (
//             <div className="md:hidden mb-6 flex flex-wrap gap-3">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => {
//                     setSelectedCategory(cat);
//                     setShowFilters(false);
//                   }}
//                   className={`text-xs px-4 py-2 border ${
//                     selectedCategory === cat
//                       ? "border-foreground text-foreground"
//                       : "border-border text-muted-foreground"
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* Count */}
//           <p className="text-xs text-muted-foreground mb-8">
//             {filteredProducts.length} products
//           </p>

//           {/* Products Grid */}
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((p, i) => (
//               <ProductCard
//                 key={`${p.id}-${i}`}
//                 slug={p.slug}
//                 name={p.name}
//                 price={p.price}
//                 originalPrice={p.originalPrice}
//                 image={p.image}
//                 badge={p.badge}
//               />
//             ))}
//           </div>
//         </div>
//       </main>

//       <SiteFooter />
//     </div>
//   );
// };

// export default Shop;
import { useState, useEffect } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/productService";
import { normalize } from "@/utils/normalize";

const categories = ["All", "Co-Ord Set", "Stitched", "Unstitched"];
const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Best Selling"];

const ITEMS_PER_PAGE = 8;

const Shop = () => {
  const { category: urlCategory } = useParams();
  const navigate = useNavigate();

  const initialCategory = urlCategory
    ? categories.find(c => c.toLowerCase().replace(/\s+/g, "-") === urlCategory) || "All"
    : "All";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("Newest");
  const [showFilters, setShowFilters] = useState(false);

  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // 🔥 Fetch products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();

        const formatted = data.map((item: any) => ({
          id: item.id,
          slug: item.slug || item.title.toLowerCase().replace(/\s+/g, "-"),
          name: item.name,
          price: item.price,
          originalPrice: item.originalPrice || null,
          image: item.imageUrl,
          badge: item.badge || null,
          category: item.category,
        }));

        setAllProducts(formatted);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔥 Filtering + Sorting (unchanged)
  const filteredProducts = allProducts
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ✅ Reset page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  // 🔥 Loading UI
  if (loading) {
    return (
      <div className="text-center py-20">
        <SiteHeader />
        <p>Loading products...</p>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      <SiteHeader />

      <main>
        {/* Header */}
        <div className="bg-secondary py-rhythm-3">
          <div className="container mx-auto px-6 text-center">
            <p className="text-xs tracking-[0.3em] text-pink-dark uppercase mb-3">
              Explore Our Collection
            </p>

            <h1 className="text-4xl md:text-6xl font-bold italic">
              {selectedCategory === "All" ? "Shop" : selectedCategory}
            </h1>

            <p className="text-sm text-muted-foreground mt-2">
              {filteredProducts.length} products available
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-rhythm-2">

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b">

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs uppercase hover:text-pink-dark"
            >
              <Filter size={16} /> Filters
            </button>

            {/* Categories */}
            <div className="hidden md:flex items-center gap-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    navigate(`/shop/${normalize(cat)}`);
                  }}
                  className={`text-xs uppercase pb-2 ${
                    selectedCategory === cat
                      ? "text-black border-b border-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative group">
              <button className="flex items-center gap-2 text-xs">
                Sort: {sortBy} <ChevronDown size={14} />
              </button>

              <div className="absolute right-0 mt-2 bg-white border shadow rounded py-2 min-w-[180px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSortBy(opt)}
                    className="block w-full text-left px-4 py-2 text-xs hover:bg-gray-100"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="md:hidden mb-6 flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowFilters(false);
                  }}
                  className={`text-xs px-4 py-2 border ${
                    selectedCategory === cat
                      ? "border-black text-black"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Count */}
          <p className="text-xs text-muted-foreground mb-6">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length}
          </p>

          {/* Products */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((p, i) => (
              <ProductCard
                key={`${p.id}-${i}`}
                slug={p.slug}
                name={p.name}
                price={p.price}
                originalPrice={p.originalPrice}
                image={p.image}
                badge={p.badge}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">

            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-xs border rounded disabled:opacity-40"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-xs border rounded ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages)
              )}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-xs border rounded disabled:opacity-40"
            >
              Next
            </button>

          </div>

        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Shop;