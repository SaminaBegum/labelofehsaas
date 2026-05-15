// import { useState } from "react";
// import { Link } from "react-router-dom";
// import catDresses from "@/assets/category-dresses.jpg";
// import catEthnic from "@/assets/category-ethnic.jpg";
// import catTops from "@/assets/category-tops.jpg";
// import catCoords from "@/assets/category-coords.jpg";
// import catCasual from "@/assets/category-casual.jpg";
// import catParty from "@/assets/category-party.jpg";

// const categories = [
//   { name: "Dresses", image: catDresses },
//   { name: "Ethnic Wear", image: catEthnic },
//   { name: "Tops", image: catTops },
//   { name: "Co-ord Sets", image: catCoords },
//   { name: "Casual Wear", image: catCasual },
//   { name: "Party Wear", image: catParty },
// ];

// type FilterType = "all" | "stitched" | "unstitched";

// const CategoriesSection = () => {
//   const [filter, setFilter] = useState<FilterType>("all");

//   return (
//     <section className="container mx-auto px-6 py-rhythm-4">
//       <div className="text-center mb-rhythm-2">
//         <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-4">
//           Explore
//         </p>
//         <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up mb-8">
//           Shop by Category
//         </h2>

//         {/* Stitched / Unstitched Toggle */}
//         <div className="inline-flex items-center gap-1 p-1 rounded-full border border-border bg-secondary backdrop-blur-sm">
//           {(["all", "stitched", "unstitched"] as FilterType[]).map((type) => (
//             <button
//               key={type}
//               onClick={() => setFilter(type)}
//               className={`
//                 px-5 py-2 rounded-full font-body text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300
//                 ${filter === type
//                   ? "bg-foreground text-background shadow-lg scale-105"
//                   : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
//                 }
//               `}
//             >
//               {type === "all" ? "All" : type === "stitched" ? "Stitched" : "Unstitched"}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//         {categories.map((cat, i) => (
//           <Link
//             key={cat.name}
//             to={`/category/${cat.name.toLowerCase().replace(/\s+/g, '-')}${filter !== "all" ? `?type=${filter}` : ""}`}
//             className="group block animate-fade-up"
//             style={{ animationDelay: `${i * 0.07}s` }}
//           >
//             <div className="aspect-[3/4] overflow-hidden mb-4 rounded-sm relative">
//               <img
//                 src={cat.image}
//                 alt={cat.name}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                 loading="lazy"
//               />
//               {/* Overlay badge showing current filter */}
//               {filter !== "all" && (
//                 <span className="absolute top-3 left-3 bg-foreground/80 text-background text-[10px] font-body font-medium tracking-[0.15em] uppercase px-3 py-1 rounded-full backdrop-blur-sm animate-fade-in">
//                   {filter}
//                 </span>
//               )}
//               {/* Hover overlay */}
//               <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500 flex items-center justify-center">
//                 <span className="font-body text-xs font-light tracking-[0.2em] uppercase text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-foreground/60 px-4 py-2 rounded-full backdrop-blur-sm">
//                   Shop Now
//                 </span>
//               </div>
//             </div>
//             <p className="font-body text-xs font-light tracking-[0.2em] uppercase text-center text-foreground group-hover:text-pink-dark transition-colors duration-300">
//               {cat.name}
//             </p>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CategoriesSection;
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "@/services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

type FilterType = "all" | "stitched" | "unstitched" | "co-ords";

type Category = {
  id: string;
  name: string;
  image?: string;
  showOnHomepage: boolean;
  type?: string;
  createdAt?: any;
  slug?: string;
};

const CategoriesSection = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [categories, setCategories] = useState<Category[]>([]);
  const getSlug = (type?: string) => {
    const t = type?.toLowerCase().trim();

    if (t === "co-ords") return "co-ord-set";
    if (t === "stitched") return "stitched";
    if (t === "unstitched") return "unstitched";

    return "all";
  };
  // ✅ PUT HERE
  const normalize = (str: string = "") =>
    str.toLowerCase().trim().replace(/\s+/g, "-");

 useEffect(() => {
  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, "categories"));
const categoryRouteMap: Record<string, string> = {
  "co-ords": "co-ord-set",
  stitched: "stitched",
  unstitched: "unstitched",
  all: "all",
};
    const data = snapshot.docs.map((doc) => {
      const d = doc.data();

      return {
        id: doc.id,
        ...d,
        type: d.type?.toLowerCase().trim().replace(/\s+/g, "-") || "all",
      };
    }) as Category[];

    setCategories(data.filter((cat) => cat.showOnHomepage));
  };

  fetchCategories();
}, []);

 return (
  <section className="container mx-auto px-4 md:px-6 py-10 md:py-16">
    
    {/* HEADER */}
    <div className="text-center mb-10 md:mb-14">
      <p className="text-[10px] md:text-xs font-semibold tracking-[0.4em] text-pink-500 uppercase mb-3">
        Explore
      </p>

      <h2 className="text-3xl md:text-6xl pb-2 font-bold italic tracking-tight bg-gradient-to-r from-black via-gray-700 to-black bg-clip-text text-transparent">
        Shop by Category
      </h2>
<div className="w-24 h-px bg-secondary mx-auto mt-6 animate-fade-up" />
      {/* PREMIUM FILTER BAR */}
      <div className="flex md:inline-flex overflow-x-auto no-scrollbar gap-2 mt-6 p-1.5 rounded-full backdrop-blur-md bg-white/60 border border-gray-200 shadow-sm">
        {(["all", "stitched", "unstitched", "co-ords"] as FilterType[]).map(
          (type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-[11px] md:text-xs uppercase whitespace-nowrap transition-all duration-300 ${
                filter === type
                  ? "bg-black text-white shadow-md scale-105"
                  : "text-gray-600 hover:text-black hover:bg-gray-100"
              }`}
            >
              {type === "co-ords" ? "Co-ords Set" : type}
            </button>
          )
        )}
      </div>
    </div>

    {/* GRID */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
      {categories
        .filter((cat) => {
          const type = (cat.type || "").toLowerCase().replace(/\s+/g, "-");
          return filter === "all" || type === filter;
        })
        .slice(0, 4)
        .map((cat) => {
          const slug =
            cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-");

          return (
            <Link
              key={cat.id}
              to={`/shop/${getSlug(cat.type)}`}
              className="group block"
            >
              {/* IMAGE CARD */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:rounded-3xl shadow-md hover:shadow-xl transition-all duration-500">
                
                {/* IMAGE */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition duration-500" />

                {/* TEXT OVER IMAGE (HOVER) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
                  <span className="text-white text-sm md:text-base tracking-wide border border-white px-4 py-2 rounded-full backdrop-blur-sm">
                    View Collection
                  </span>
                </div>
              </div>

              {/* TITLE */}
              <p className="text-center mt-3 text-sm md:text-base font-medium tracking-wide group-hover:text-black transition">
                {cat.name}
              </p>
            </Link>
          );
        })}
    </div>
  </section>
);
  
};

export default CategoriesSection;