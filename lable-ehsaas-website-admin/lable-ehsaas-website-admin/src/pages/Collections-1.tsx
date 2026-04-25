// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";
// import editorial1 from "@/assets/editorial-1.jpg";
// import editorial2 from "@/assets/editorial-2.jpg";
// import editorial3 from "@/assets/editorial-3.jpg";
// import catDresses from "@/assets/category-dresses.jpg";
// import catCoords from "@/assets/category-coords.jpg";

// const collections = [
//   { name: "New Arrivals", subtitle: "Fresh designs for the season", image: editorial2, href: "/shop" },
//   { name: "Festive Edit", subtitle: "Celebrate in elegance", image: editorial1, href: "/shop" },
//   { name: "Indo-Western", subtitle: "Where tradition meets modernity", image: editorial3, href: "/shop" },
//   { name: "Co-ord Sets", subtitle: "Effortless matching looks", image: catCoords, href: "/shop" },
//   { name: "Signature Ethnic", subtitle: "Timeless Indian silhouettes", image: catDresses, href: "/shop" },
// ];

// const Collections = () => {
//   return (
//     <div className="page-fade-in">
//       <SiteHeader />
//       <main>
//         <div className="bg-secondary py-rhythm-3">
//           <div className="container mx-auto px-6 text-center">
//             <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">Curated For You</p>
//             <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">Collections</h1>
//           </div>
//         </div>

//         <div className="container mx-auto px-6 py-rhythm-4">
//           <div className="space-y-1">
//             {collections.map((col, i) => (
//               <Link
//                 key={col.name}
//                 to={col.href}
//                 className="group grid md:grid-cols-2 gap-0"
//               >
//                 <div className={`aspect-[4/3] overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}>
//                   <img src={col.image} alt={col.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
//                 </div>
//                 <div className={`bg-secondary/20 flex items-center justify-center p-12 ${i % 2 === 1 ? "md:order-1" : ""}`}>
//                   <div className="text-center">
//                     <p className="font-body text-xs font-light tracking-[0.3em] text-pink-dark uppercase mb-3">{col.subtitle}</p>
//                     <h2 className="font-heading text-3xl md:text-4xl font-light italic text-foreground mb-6">{col.name}</h2>
//                     <span className="inline-flex items-center gap-2 font-body text-xs font-light tracking-[0.2em] uppercase text-foreground border-b border-foreground pb-1 group-hover:text-pink-dark group-hover:border-pink-dark transition-colors duration-300">
//                       Shop Now <ArrowRight size={14} />
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </main>
//       <SiteFooter />
//     </div>
//   );
// };

// export default Collections;
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/editorial-2.jpg";
import editorial3 from "@/assets/editorial-3.jpg";
import catDresses from "@/assets/category-dresses.jpg";
import catCoords from "@/assets/category-coords.jpg";

const collections = [
  {
    name: "Co-ord Sets",
    subtitle: "Effortless matching looks",
    image: catCoords,
    href: "/shop?category=coordsets",
  },
  {
    name: "Stitched Suits",
    subtitle: "Ready-to-wear elegance",
    image: editorial1,
    href: "/shop?category=stitched-suits",
  },
  {
    name: "Unstitched Suits",
    subtitle: "Design your perfect fit",
    image: editorial2,
    href: "/shop?category=unstitched-suits",
  },
  {
    name: "Dresses",
    subtitle: "Modern feminine silhouettes",
    image: catDresses,
    href: "/shop?category=dresses",
  },
  {
    name: "Kaftans",
    subtitle: "Relaxed and luxurious fits",
    image: editorial3,
    href: "/shop?category=kaftans",
  },
  {
    name: "Indo-Western",
    subtitle: "Fusion of tradition & style",
    image: editorial1,
    href: "/shop?category=indo-western",
  },
  {
    name: "Festive Wear",
    subtitle: "Perfect for celebrations",
    image: editorial2,
    href: "/shop?category=festive",
  },
];

const Collections = () => {
  return (
    <div className="page-fade-in">
      <SiteHeader />

      <main>
        {/* Header */}
        <div className="bg-secondary py-rhythm-3">
          <div className="container mx-auto px-6 text-center">
            <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">
              Shop By Category
            </p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">
              Collections
            </h1>
          </div>
        </div>

        {/* Collections */}
        <div className="container mx-auto px-6 py-rhythm-4">
          <div className="space-y-1">
            {collections.map((col, i) => (
              <Link
                key={col.name}
                to={col.href}
                className="group grid md:grid-cols-2 gap-0"
              >
                {/* Image */}
                <div
                  className={`aspect-[4/3] overflow-hidden ${
                    i % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div
                  className={`bg-secondary flex items-center justify-center p-12 ${
                    i % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <div className="text-center">
                    <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">
                      {col.subtitle}
                    </p>

                    <h2 className="font-heading text-3xl md:text-4xl font-light italic text-foreground mb-6">
                      {col.name}
                    </h2>

                    <span className="inline-flex items-center gap-2 font-body text-xs font-light tracking-[0.2em] uppercase text-foreground border-b border-foreground pb-1 group-hover:text-pink-dark group-hover:border-pink-dark transition-colors duration-300">
                      Shop Now <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Collections;