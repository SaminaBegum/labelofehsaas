import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const reviews = [
  { name: "Priya M.", text: "The fabric quality is incredible...", rating: 5 },
  { name: "Ananya S.", text: "Love the ethnic collection!", rating: 5 },
  { name: "Riya K.", text: "Fast delivery and stunning work.", rating: 5 },
  { name: "Meera P.", text: "Beautiful outfits, premium feel.", rating: 5 },
  { name: "Sana A.", text: "Loved the material and finish!", rating: 5 },
  { name: "Kavya L.", text: "Elegant and comfortable fabrics.", rating: 5 },
];

const ReviewsSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="container mx-auto px-6 py-10">
      <div className="text-center mb-rhythm-2">
        <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-4">
          Testimonials
        </p>
         <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up mb-2">
          What Our Customers Say
        </h2>
        <div className="w-24 h-px bg-secondary mx-auto mt-6 animate-fade-up" />
      </div>

      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 gap-8"
          style={{
            transform: `translateX(-${index * 320}px)`,
          }}
        >
          {[...reviews, ...reviews].map((r, i) => (
            <div
              key={i}
              className="min-w-[400px] bg-card p-6 border text-center flex-shrink-0"
            >
              <div className="flex gap-1 justify-center mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    fill={j < r.rating ? "#f9c5d1" : "none"}
                  />
                ))}
              </div>

              <p className="italic mb-4">"{r.text}"</p>
              <p className="text-xs uppercase">{r.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;