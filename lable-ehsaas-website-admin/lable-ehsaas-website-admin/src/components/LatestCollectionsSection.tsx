// import { Link } from "react-router-dom";
// import { ArrowRight } from "lucide-react";
// import categoryDresses from "@/assets/category-dresses.jpg";
// import categoryEthnic from "@/assets/category-ethnic.jpg";
// import categoryCoords from "@/assets/category-coords.jpg";
// import categoryParty from "@/assets/category-party.jpg";
// import categoryCasual from "@/assets/category-casual.jpg";
// import categoryTops from "@/assets/category-tops.jpg";

// const collections = [
//   { title: "Festive Edit", image: categoryEthnic, slug: "ethnic-wear", tag: "NEW" },
//   { title: "Indo-Western", image: categoryDresses, slug: "dresses", tag: "TRENDING" },
//   { title: "Co-ord Sets", image: categoryCoords, slug: "co-ord-sets", tag: "HOT" },
//   { title: "Party Wear", image: categoryParty, slug: "party-wear", tag: "JUST IN" },
//   { title: "Casual Chic", image: categoryCasual, slug: "casual-wear", tag: "NEW" },
//   { title: "Signature Tops", image: categoryTops, slug: "tops", tag: "TRENDING" },
// ];

// const LatestCollectionsSection = () => {
//   return (
//     <section className=" bg-background overflow-hidden">
//       <div className="container mx-auto px-6">

//         {/* Heading */}
//         <div className="text-center mb-16">
//           <p className="font-body text-xs tracking-[0.4em] font-bold text-pink-dark uppercase mb-4 animate-fade-up">
//             ✦ Just Landed ✦
//           </p>

//           <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up">
//             Shop by Collection
//           </h2>

//           <div className="w-24 h-px bg-secondary mx-auto mt-6 animate-fade-up" />
//         </div>

//         {/* Horizontal Scroll Row */}
//         <div className="flex gap-8 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
//           {collections.map((col, i) => (
//             <Link
//               key={col.slug}
//               to={`/category/${col.slug}`}
//               className="group relative w-[280px] md:w-[360px] aspect-[3/4] rounded-xl overflow-hidden snap-start shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-up"
//               style={{ animationDelay: `${0.07 * i}s` }}
//             >
//               <img
//                 src={col.image}
//                 alt={col.title}
//                 className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
//               />

//               {/* Gradient Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

//               {/* Tag */}
//               <span className="absolute top-4 left-4 bg-white/90 text-black text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full shadow">
//                 {col.tag}
//               </span>

//               {/* Text Content */}
//               <div className="absolute bottom-0 p-6">
//                 <h3 className="font-heading text-2xl font-light italic text-white mb-2 drop-shadow">
//                   {col.title}
//                 </h3>

//                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
//                   <span className="text-[11px] tracking-[0.25em] uppercase text-white/90">
//                     Shop Now
//                   </span>
//                   <ArrowRight size={14} className="text-white/90" />
//                 </div>
//               </div>

//               {/* Pink Line */}
//               <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-secondary transition-all duration-500" />
//             </Link>
//           ))}
//         </div>

//         {/* CTA Button */}
//         <div className="text-center mt-16">
//           <Link
//             to="/collections"
//             className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase px-14 py-4 rounded-md hover:bg-secondary transition-all duration-500 group"
//           >
//             View All Collections
//             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LatestCollectionsSection;
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { db } from "@/services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const LatestCollectionsSection = () => {

  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
const shopCollections = collections.filter(
  (c) => c.type === "shop" && c.showOnHomepage
);
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const snapshot = await getDocs(collection(db, "collections"));

        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Show only homepage collections
        const filtered = data.filter((c: any) => c.showOnHomepage);

        setCollections(filtered);

      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section className="bg-background overflow-hidden">
      <div className="container mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.4em] font-bold text-pink-dark uppercase mb-4 animate-fade-up">
            ✦ Just Landed ✦
          </p>

          <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up">
            Shop by Collection
          </h2>

          <div className="w-24 h-px bg-secondary mx-auto mt-6 animate-fade-up" />
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (

          /* Collections Row */
        <div className="
  flex md:grid md:grid-cols-4 
  gap-4 md:gap-8 
  overflow-x-auto md:overflow-visible 
  no-scrollbar 
  px-4 md:px-0 
  snap-x snap-mandatory 
  scroll-pl-4
">
            {collections.slice(0, 4).map((col, i) => (
           <Link
  key={col.id}
  to={`/shop?collection=${col.slug || col.name.toLowerCase().replace(/\s+/g, "-")}`}
 className="
  group relative 
  flex-shrink-0
  w-[85%] sm:w-[60%] 
  md:w-full
  aspect-[3/4] 
  rounded-xl overflow-hidden 
  snap-start md:snap-none
  shadow-lg hover:shadow-2xl 
  transition-all duration-500 
  animate-fade-up
"
  style={{ animationDelay: `${0.07 * i}s` }}
>

                {/* Image */}
                <img
                  src={col.image?.startsWith("http") ? col.image : "/placeholder.jpg"}
                  alt={col.name}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Tag */}
                <span className="absolute top-4 left-4 bg-white/90 text-black text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full shadow">
                  {col.tag || "NEW"}
                </span>

                {/* Text */}
                <div className="absolute bottom-0 p-6">
                  <h3 className="font-heading text-2xl font-light italic text-white mb-2 drop-shadow">
                    {col.name}
                  </h3>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-[11px] tracking-[0.25em] uppercase text-white/90">
                      Shop Now
                    </span>
                    <ArrowRight size={14} className="text-white/90" />
                  </div>
                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-secondary transition-all duration-500" />

              </Link>
            ))}
          </div>
        )}

        {/* CTA */}
        {/* <div className="text-center mt-16">
          <Link
            to="/collections"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground text-xs tracking-[0.25em] uppercase px-14 py-4 rounded-md hover:bg-secondary transition-all duration-500 group"
          >
            View All Collections
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div> */}

      </div>
    </section>
  );
};

export default LatestCollectionsSection;