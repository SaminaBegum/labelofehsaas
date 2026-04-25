// import bannerImg from "@/assets/seasonal-banner.jpg";
// import { ArrowRight } from "lucide-react";

// const SeasonalBanner = () => {
//   return (
//     <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden">
//       <img
//         src={bannerImg}
//         alt="Festive Collection"
//         className="absolute inset-0 w-full h-full object-cover"
//         loading="lazy"
//       />
//       <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/25 to-transparent" />
//       <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
//         <div className="max-w-lg">
//           <p className="font-body text-xs font-light tracking-[0.4em] text-primary-foreground/70 uppercase mb-4">
//             Limited Edition
//           </p>
//           <h2 className="font-heading text-4xl md:text-6xl font-light italic text-primary-foreground mb-6 leading-tight">
//             Festive Edit 2026
//           </h2>
//           <p className="font-body text-sm font-light text-primary-foreground/70 mb-8 leading-relaxed">
//             A curated collection celebrating the spirit of festivity with handcrafted details and premium fabrics.
//           </p>
//           <a
//             href="/collections"
//             className="inline-flex items-center gap-3 bg-secondary text-secondary-foreground font-body text-xs font-light tracking-[0.2em] uppercase px-10 py-4 hover:bg-pink-dark hover:text-primary-foreground transition-all duration-300"
//           >
//             Explore Now <ArrowRight size={14} />
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SeasonalBanner;
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
const SeasonalBanner = () => {
  const [banner, setBanner] = useState<any>(null);

  useEffect(() => {
    fetchBanner();
  }, []);

  const fetchBanner = async () => {
    const snapshot = await getDocs(collection(db, "banners"));

    const data = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((b: any) => b.position === "seasonal" && b.active)
      .sort((a: any, b: any) => a.order - b.order);

    setBanner(data[0]); // 👉 first hero banner
  };

  if (!banner) return null;

  return (
    <section className="relative w-full h-[55vh] min-h-[420px] overflow-hidden">
      
      {/* IMAGE */}
      <img
        src={banner.image}
        alt={banner.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* CONTENT */}
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-lg">

          <p className="text-xs tracking-[0.4em] uppercase mb-4 text-white/70">
            {banner.subtitle}
          </p>

          <h2 className="text-4xl md:text-6xl font-light italic text-white mb-6">
            {banner.title}
          </h2>

         <Link
  to={banner.buttonLink || "/shop"}
  className="inline-flex items-center gap-3 bg-white text-black text-xs uppercase px-10 py-4 hover:bg-pink-500 hover:text-white transition"
>
  Explore Now <ArrowRight size={14} />
</Link>

        </div>
      </div>
    </section>
  );
};

export default SeasonalBanner;