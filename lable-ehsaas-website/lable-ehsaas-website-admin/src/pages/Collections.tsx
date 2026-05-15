import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

import { db } from "@/services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Collections = () => {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // 🔥 FETCH FROM FIREBASE
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const snapshot = await getDocs(collection(db, "collections"));

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCollections(data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // 🎯 FILTER (ONLY SHOP COLLECTIONS)
  const visibleCollections = collections
    .filter((c) => c.type === "shop")
    .sort((a, b) => b.createdAt - a.createdAt);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading collections...
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      <SiteHeader />

      <main>
        {/* HERO */}
        <section className="bg-secondary py-20 md:py-28">
          <div className="container mx-auto px-6 flex justify-center">
            <div className="max-w-xl text-center animate-slide-up">
              <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">
                Explore Our Collection
              </p>

              <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">
                Our Collections
              </h1>
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mt-0 m-10">
              <p className="font-body text-[10px] md:text-xs font-bold tracking-[0.4em] text-pink-dark uppercase mb-3">
                ✦ Curated For You ✦
              </p>

              <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light italic text-foreground">
                Our Collections
              </h2>

              <div className="w-16 md:w-20 h-px bg-secondary mx-auto mt-5" />
            </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {visibleCollections.map((col, i) => (
    <Link to={`/shop/${col.id}`} key={col.id}>
  <div
    className="group relative overflow-hidden cursor-pointer"
    onMouseEnter={() => setHoveredIdx(i)}
    onMouseLeave={() => setHoveredIdx(null)}
  >
                  {/* IMAGE */}
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={
                        col.image?.startsWith("http")
                          ? col.image
                          : "/placeholder.jpg"
                      }
                      alt={col.name}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredIdx === i
                          ? "scale-110 brightness-90"
                          : "scale-100"
                      }`}
                    />
                  </div>

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-60 group-hover:opacity-90 transition" />

                  {/* TAG */}
                  <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-[9px] uppercase px-3 py-1">
                    {col.tag || "NEW"}
                  </span>

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                    <p className="text-[10px] text-secondary/80 uppercase mb-1">
                      {col.subtitle || col.description}
                    </p>

                    <h3 className="text-xl md:text-2xl italic text-primary-foreground mb-2">
                      {col.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-primary-foreground/60">
                        {col.productCount || 0} Styles
                      </span>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                        <span className="text-[10px] uppercase text-secondary">
                          Shop Now
                        </span>
                        <ArrowRight size={12} className="text-secondary" />
                      </div>
                    </div>
                  </div>

                  {/* LINE */}
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-secondary transition-all duration-700" />
               </div></Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Collections;