// // import editorial1 from "@/assets/editorial-1.jpg";
// // import editorial2 from "@/assets/editorial-2.jpg";
// // import editorial3 from "@/assets/editorial-3.jpg";
// // import { useEffect, useState } from "react";
// // import { getAllSignatureLooks } from "@/services/signatureLookService";
// // const looks = [
// //   { image: editorial1, title: "Festive Grandeur", subtitle: "Heritage meets opulence" },
// //   { image: editorial2, title: "Blush Romance", subtitle: "Soft elegance redefined" },
// //   { image: editorial3, title: "Noir Sophistication", subtitle: "Bold & timeless" },
// // ];

// // const SignatureLooksSection = () => {
// //   const [looks, setLooks] = useState<any[]>([]);
// // const [loading, setLoading] = useState(true);
// // useEffect(() => {
// //   const fetchLooks = async () => {
// //     try {
// //       const data = await getAllSignatureLooks();

// //       // ✅ Only show homepage items
// //       const filtered = data.filter((l: any) => l.showOnHomepage);

// //       setLooks(filtered);
// //     } catch (err) {
// //       console.error("Failed to fetch looks");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   fetchLooks();
// // }, []);
// //   return (
// //     <section className="py-rhythm-2">
// //       <div className="container mx-auto px-6 mb-rhythm-2 text-center">
// //         <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-4">
// //           Editorial
// //         </p>
// //         <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up">
// //           Signature Looks
// //         </h2>
// //       </div>
// //       <div className="grid md:grid-cols-3 gap-1">
// //       {looks.map((look) => (
// //   <a
// //     key={look.id}
// //     href={`/product/${look.slug}`}
// //     className="group relative aspect-[3/4] overflow-hidden"
// //   >
// //     <img
// //       src={look.image}
// //       alt={look.name}
// //       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
// //       loading="lazy"
// //     />

// //     <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

// //     <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
// //       <h3 className="font-heading text-2xl font-light italic text-primary-foreground mb-1">
// //         {look.name}
// //       </h3>

// //       <p className="font-body text-xs tracking-[0.15em] text-primary-foreground/70 uppercase">
// //         {look.category}
// //       </p>
// //     </div>
// //   </a>
// // ))}
// //       </div>
// //     </section>
// //   );
// // };

// // export default SignatureLooksSection;
// import { useEffect, useState } from "react";
// import { getAllSignatureLooks } from "@/services/signatureLookService";
// import { Link } from "react-router-dom";
// const SignatureLooksSection = () => {
//   const [looks, setLooks] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const fetchLooks = async () => {
//     try {
//       const data = await getAllSignatureLooks();
//       console.log("Signature looks:", data); // 🔍 check field names

//       const filtered = data
//         .filter((l: any) => l.showOnHomepage)
//         .slice(0, 4);

//       setLooks(filtered);
//     } catch (err) {
//       console.error("Failed to fetch looks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchLooks();
// }, []);

//   // ✅ Loading state
//   if (loading) {
//     return (
//       <section className="py-rhythm-2 text-center">
//         <p>Loading Signature Looks...</p>
//       </section>
//     );
//   }

//   return (
//     <section className="container py-rhythm-2">
//       <div className="container mx-auto px-6 mb-rhythm-2 text-center">
//         <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-4">
//           Editorial
//         </p>
//         <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up">
//           Signature Looks
//         </h2>
//       </div>

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//        {looks.map((look) => (
//   <a
//   key={look.id}
//   href={`/product/${look.slug}`}   // use slug here
//   className="group relative aspect-[3/4] overflow-hidden"
// >
//             <img
//               src={look.image}
//               alt={look.name}
//               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//               loading="lazy"
//             />

//             <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//             <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
//               <h3 className="font-heading text-2xl font-light italic text-primary-foreground mb-1">
//                 {look.name}
//               </h3>

//               <p className="font-body text-xs tracking-[0.15em] text-primary-foreground/70 uppercase">
//                 {look.category}
//               </p>
//             </div>
//           </a>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default SignatureLooksSection;
import { useEffect, useState } from "react";
import { getAllSignatureLooks } from "@/services/signatureLookService";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface StockItem {
  size: string;
  stock: number;
}

interface SignatureLook {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  stock?: StockItem[]; // optional
  showOnHomepage: boolean;
}

const SignatureLooksSection = () => {
  const [looks, setLooks] = useState<SignatureLook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLooks = async () => {
      try {
        const data = await getAllSignatureLooks();
        const filtered = (data as SignatureLook[])
          .filter((l) => l.showOnHomepage)
          .slice(0, 4); // show only first 4
        setLooks(filtered);
      } catch (err) {
        console.error("Failed to fetch looks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLooks();
  }, []);

  if (loading) {
    return (
      <section className="py-rhythm-2 text-center">
        <p>Loading Signature Looks...</p>
      </section>
    );
  }

  return (
    <section className="container py-rhythm-2">
      <div className="container mx-auto px-6 mb-rhythm-2 text-center">
        <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-4">
          Editorial
        </p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up">
          Signature Looks
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {looks.map((look) => (
          <Link
            key={look.id}
            to="/collections"
            className="group relative aspect-[3/4] overflow-hidden"
          >
            <img
              src={look.image}
              alt={look.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black/70 via-transparent to-transparent">
              <h3 className="font-heading text-lg md:text-2xl font-light italic text-primary-foreground mb-1">
                {look.name}
              </h3>

              <p className="font-body text-xs tracking-[0.15em] text-primary-foreground/70 uppercase mb-2">
                {look.category}
              </p>

              {look.stock && look.stock.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {look.stock.map((s) => (
                    <Badge
                      key={s.size}
                      variant="outline"
                      className="text-xs bg-white/10 text-white"
                    >
                      {s.size}: {s.stock}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SignatureLooksSection;