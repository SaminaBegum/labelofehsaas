import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product5 from "@/assets/product-5.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";
import catEthnic from "@/assets/category-ethnic.jpg";

const images = [product1, product2, catEthnic, product5, product7, product8];

const InstagramSection = () => {
  return (
    <section className="py-rhythm-4">
      <div className="text-center mb-rhythm-2">
        <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-4">
          Follow Us
        </p>
        <h2 className="font-heading text-4xl md:text-6xl font-bold italic animate-fade-up mb-2">
          @ehsaaslabel
        </h2>
        <p className="font-body text-sm font-light text-muted-foreground">
          Join our community of elegant women
        </p>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-6">
        {images.map((img, i) => (
          <a
            key={i}
            href="https://www.instagram.com/label.ehsaas/"
            target="_blank"
            rel="noopener noreferrer"
            className="aspect-square overflow-hidden group"
          >
            <img
              src={img}
              alt={`Instagram post ${i + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-500"
              loading="lazy"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection;