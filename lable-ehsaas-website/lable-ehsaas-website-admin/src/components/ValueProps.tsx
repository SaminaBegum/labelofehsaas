import { Sparkles, RotateCcw, Shield, Truck } from "lucide-react";

const props = [
  { icon: Sparkles, title: "Premium Fabrics", desc: "Handpicked quality materials" },
  { icon: RotateCcw, title: "Easy Returns", desc: "7-day hassle-free returns" },
  { icon: Shield, title: "Secure Payment", desc: "100% safe transactions" },
  { icon: Truck, title: "Fast Delivery", desc: "Express shipping available" },
];

const ValueProps = () => {
  return (
    <section className="relative border-y border-black/10 bg-gradient-to-b from-[#fff7fb] to-[#fed3e7]">
      
      {/* subtle top blur glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.6),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {props.map((p, i) => (
            <div
              key={p.title}
              className="group text-center transition-all duration-300 hover:-translate-y-1"
            >
              
              {/* Icon */}
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-5 
                rounded-full 
                bg-white/60 backdrop-blur-md 
                border border-white/40 
                shadow-[0_8px_30px_rgba(0,0,0,0.05)]
                flex items-center justify-center
                transition-all duration-300
                group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]
              ">
                <p.icon size={24} className="text-black/80" strokeWidth={1.3} />
              </div>

              {/* Title */}
              <h3 className="text-sm md:text-base font-medium tracking-wide text-black">
                {p.title}
              </h3>

              {/* Divider line */}
              <div className="w-6 h-[1px] bg-black/30 mx-auto my-2 opacity-60 group-hover:w-10 transition-all duration-300" />

              {/* Description */}
              <p className="text-xs md:text-sm text-black/60 leading-relaxed px-2 md:px-4">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ValueProps;