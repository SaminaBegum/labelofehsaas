import { motion } from "framer-motion";
import editorial2 from "@/assets/2.jpg";

const BrandStorySection = () => {
  return (
    <section className="container mx-auto px-6 py-12 md:py-16">
      <div className="grid md:grid-cols-2 gap-14 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative aspect-[3/2] rounded-3xl overflow-hidden shadow-xl"
        >
          <img
            src={editorial2}
            alt="The feeling behind Ehsaas"
            className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-[1200ms]"
            loading="lazy"
          />

          {/* Soft Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/20" />
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-xll"
        >
          <p className="font-body text-xs tracking-[0.35em] font-bold text-pink-dark uppercase mb-5">
            Our Story
          </p>

          <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up mb-8">
            The Feeling Behind Ehsaas
          </h2>

          <div className="space-y-6">
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Ehsaas Label was born from a desire to celebrate the modern Indian woman — confident, graceful, and expressive.
            </p>

            <p className="font-body text-base text-muted-foreground leading-relaxed">
              Each design blends the richness of Indian heritage with the sophistication of contemporary fashion. From festive elegance to everyday luxury, Ehsaas Label is created for women who wear their emotions with style.
            </p>
          </div>

          {/* CTA */}
          <a
            href="/about"
            className="inline-block mt-10 font-body text-xs tracking-[0.25em] uppercase relative inline-flex items-center transition-all"
          >
            <span className="pb-1 border-b border-foreground transition-all duration-300 hover:border-pink-dark hover:text-pink-dark">
              Read Our Story
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandStorySection;