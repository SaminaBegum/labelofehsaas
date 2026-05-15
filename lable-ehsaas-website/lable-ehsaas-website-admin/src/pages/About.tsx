
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/1.jpg";

const About = () => {
  return (
    <div className="page-fade-in">
      <SiteHeader />

      <main>
        {/* HERO */}
      <div className="bg-secondary py-rhythm-3">
  <div className="container mx-auto px-6 text-center">
    
    <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">
      Our Story
    </p>

    <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">
      The Soul of Ehsaas
    </h1>

  </div>
</div>

        {/* BRAND STORY */}
        <section className="container mx-auto px-6 py-rhythm-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-6">
              The Meaning Behind Ehsaas
            </p>

            <h2 className="font-heading text-3xl md:text-4xl font-light italic text-foreground mb-8 leading-relaxed">
              More than clothing — Ehsaas is a feeling you wear.
            </h2>

            <div className="space-y-5 text-left md:text-center">
              <p className="font-body text-sm font-light text-muted-foreground leading-relaxed">
                Born from a deep love for Indian craftsmanship, Ehsaas Label is a
                celebration of subtle luxury, timeless design, and feminine
                strength. Every piece is thoughtfully created to reflect grace
                without trying too hard.
              </p>

              <p className="font-body text-sm font-light text-muted-foreground leading-relaxed">
                We don’t follow trends — we design pieces that stay relevant
                beyond seasons. Soft silhouettes, refined details, and effortless
                elegance define everything we create.
              </p>

              <p className="font-body text-sm font-light text-muted-foreground leading-relaxed">
                “Ehsaas” means emotion — and that emotion lives in every thread,
                every texture, and every moment you wear it.
              </p>
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="bg-secondary">
          <div className="container mx-auto px-6 py-rhythm-4">
            <div className="grid md:grid-cols-2 gap-rhythm-3 items-center">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={editorial2}
                  alt="Founder"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="max-w-lg">
                <p className="font-body text-xs font-light tracking-[0.3em] text-pink-dark uppercase mb-4">
                  The Founder
                </p>

                <h2 className="font-heading text-3xl md:text-4xl font-light italic text-foreground mb-6">
                  Designed with Purpose, Not Just Passion
                </h2>

                <p className="font-body text-sm font-light text-muted-foreground leading-relaxed mb-5">
                  Ehsaas Label began with a simple idea — clothing should make
                  you feel something. Not just look beautiful, but feel
                  confident, comfortable, and truly yourself.
                </p>

                <p className="font-body text-sm font-light text-muted-foreground leading-relaxed mb-5">
                  With a vision to bridge traditional aesthetics and modern
                  lifestyles, the brand creates pieces that move effortlessly
                  with you — from everyday moments to special occasions.
                </p>

                <p className="font-body text-sm font-light text-muted-foreground leading-relaxed">
                  Every collection reflects a balance of detail, simplicity, and
                  quiet luxury — designed for women who appreciate elegance
                  without excess.
                </p>
              </div>
            </div>
          </div>
        </section>
 
        {/* WHY EHSAAS */}
        <section className="container mx-auto px-6 py-rhythm-4">
          <div className="text-center mb-rhythm-2">
            <p className="font-body text-xs font-light tracking-[0.3em] text-pink-dark uppercase mb-4">
              Why Ehsaas
            </p>

            <h2 className="font-heading text-3xl md:text-4xl font-light italic text-foreground">
              What Sets Us Apart
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-rhythm-2 text-center">
            {[
              {
                title: "Thoughtful Craftsmanship",
                desc: "Every piece is designed with attention to detail, from fabric selection to final finishing.",
              },
              {
                title: "Timeless Over Trendy",
                desc: "We focus on silhouettes that remain elegant season after season.",
              },
              {
                title: "Comfort Meets Luxury",
                desc: "Soft, breathable fabrics that feel as good as they look.",
              },
              {
                title: "Limited Drops",
                desc: "Exclusive designs produced in small batches to keep your style unique.",
              },
            ].map((v) => (
              <div key={v.title}>
                <h3 className="font-heading text-lg font-light italic text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="font-body text-xs font-light text-muted-foreground">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* EXTRA TRUST SECTION */}
      
      </main>

      <SiteFooter />
    </div>
  );
};

export default About;