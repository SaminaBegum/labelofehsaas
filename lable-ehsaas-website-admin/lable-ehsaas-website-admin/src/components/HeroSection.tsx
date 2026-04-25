// import heroImg from "@/assets/hero-banner.jpeg";
// import { ArrowRight } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section
//       className="relative w-full h-screen min-h-[750px] bg-cover bg-center bg-no-repeat overflow-hidden"
//       style={{ backgroundImage: `url(${heroImg})` }}
//     >
      
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-6 h-full flex items-center justify-center">
//         <div className="max-w-5xl text-center mx-auto">
          
//           <p className="font-body text-xs font-light tracking-[0.4em] text-white/70 uppercase mb-6 animate-fade-up">
//             Ehsaas Label — Where Emotion Meets Elegance
//           </p>

//           <h1
//             className="font-heading text-5xl md:text-7xl lg:text-8xl font-light italic leading-[0.95] text-white mb-8 animate-fade-up"
//             style={{ animationDelay: "0.15s" }}
//           >
//             Where Tradition Meets Modern Elegance
//           </h1>

//           <p
//             className="font-body text-sm md:text-base font-light text-white/70 mb-10 max-w-md mx-auto leading-relaxed animate-fade-up"
//             style={{ animationDelay: "0.3s" }}
//           >
//             Curated collections blending the richness of Indian heritage with contemporary sophistication.
//           </p>

//           <div
//             className="flex flex-wrap justify-center gap-4 animate-fade-up"
//             style={{ animationDelay: "0.45s" }}
//           >
//            <a
//   href="/shop"
//   className="inline-flex items-center gap-3 bg-[#fed3e7] text-[#7a2e4d] font-body text-xs font-light tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#f7bcd7] transition-all duration-300"
// >
//   Shop New Arrivals <ArrowRight size={14} />
// </a>

//            <a
//   href="/collections"
//   className="inline-flex items-center gap-3 border border-white/40 text-white font-body text-xs font-light tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#fed3e7] hover:text-[#7a2e4d] transition-all duration-300"
// >
//   Explore Collections
// </a>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
// import { useEffect, useState } from "react";
// import { db } from "@/lib/firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";
// const HeroSection = () => {
//   const [banner, setBanner] = useState<any>(null);

//   useEffect(() => {
//     fetchHero();
//   }, []);

//   const fetchHero = async () => {
//     const snapshot = await getDocs(collection(db, "banners"));

//     const data = snapshot.docs
//       .map((doc) => ({ id: doc.id, ...doc.data() }))
      
//       // ✅ 👉 PUT YOUR FILTER HERE
//       .filter((b: any) => b.position === "hero" && b.active)

//       .sort((a: any, b: any) => a.order - b.order);

//     setBanner(data[0]); // first hero banner
//   };

//   if (!banner) return null;

//   return (
//     <section
//       className="relative w-full h-screen min-h-[700px] bg-cover bg-center"
//       style={{ backgroundImage: `url(${banner.image})` }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/40" />

//       {/* Content */}
//       <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
//         <div className="max-w-4xl">

//           <p className="text-xs uppercase tracking-widest text-white/70 mb-4">
//             {banner.subtitle}
//           </p>

//           <h1 className="text-5xl md:text-8xl text-white mb-6">
//             {banner.title}
//           </h1>

//          <Link
//   to={banner.buttonLink || "/shop"}
//   className="inline-flex items-center gap-2  bg-[#fed3e7] text-black px-8 py-3 uppercase text-xs"
// >
//   Shop Now <ArrowRight size={14} />
// </Link>

//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetchHero();
  }, []);

  // ✅ Fetch all hero banners
  const fetchHero = async () => {
    const snapshot = await getDocs(collection(db, "banners"));

    const data = snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((b: any) => b.position === "hero" && b.active)
      .sort((a: any, b: any) => a.order - b.order);

    setBanners(data);
  };

  // ✅ Auto slide
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000); // 5 sec

    return () => clearInterval(interval);
  }, [banners]);

  if (!banners.length) return null;

  const banner = banners[current];

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">

      {/* IMAGE */}
 <div className="absolute inset-0 w-full h-full overflow-hidden">
  {banner.image?.match(/\.(mp4|webm|mov)$/i) ? (
    <video
      src={banner.image}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover object-center scale-105"
    />
  ) : (
    <img
      src={banner.image}
      className="w-full h-full object-cover"
    />
  )}
</div>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/40" />

      {/* CONTENT */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
        <div className="max-w-4xl">

          <p className="text-xs uppercase tracking-widest text-white/70 mb-4">
            {banner.subtitle}
          </p>

          <h1 className="text-5xl md:text-8xl text-white mb-6">
            {banner.title}
          </h1>

            <Link
   to={banner.buttonLink || "/shop"}
   className="inline-flex items-center gap-2  bg-[#fed3e7] text-black px-8 py-3 uppercase text-xs"
 >
   Shop Now <ArrowRight size={14} />
</Link>

        </div>
      </div>

      {/* ✅ LEFT ARROW */}
      {/* <button
        onClick={() =>
          setCurrent((prev) =>
            prev === 0 ? banners.length - 1 : prev - 1
          )
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
      >
        <ChevronLeft />
      </button> */}

      {/* ✅ RIGHT ARROW */}
      {/* <button
        onClick={() =>
          setCurrent((prev) => (prev + 1) % banners.length)
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 p-2 rounded-full"
      >
        <ChevronRight />
      </button> */}

      {/* ✅ DOTS */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2">
        {banners.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full cursor-pointer ${
              i === current ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroSection;