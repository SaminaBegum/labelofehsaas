import { useState } from "react";
import { ArrowRight } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="bg-primary py-rhythm-4">
      <div className="container mx-auto px-6 text-center">
        <p className="font-body text-xs font-light tracking-[0.3em] text-secondary uppercase mb-4">
          Newsletter
        </p>
        <h2 className="font-heading text-3xl md:text-5xl font-light italic text-primary-foreground mb-4">
          Stay in the Loop
        </h2>
        <p className="font-body text-sm font-light text-primary-foreground/60 mb-10 max-w-md mx-auto leading-relaxed">
          Be the first to experience new collections and exclusive offers.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 bg-transparent border border-primary-foreground/25 text-primary-foreground font-body text-sm font-light px-6 py-4 placeholder:text-primary-foreground/30 focus:outline-none focus:border-secondary transition-colors duration-300"
          />
          <button
            type="submit"
            className="bg-secondary text-secondary-foreground font-body text-xs tracking-[0.15em] uppercase px-6 py-4 hover:bg-pink-dark hover:text-primary-foreground transition-colors duration-300 flex items-center gap-2"
          >
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
