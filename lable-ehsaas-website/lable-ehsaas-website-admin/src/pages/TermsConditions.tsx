import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  {
    title: "Acceptance of Terms",
    content: "By accessing and using the Ehsaas Label website, you agree to be bound by these Terms & Conditions. If you do not agree, please refrain from using our services.",
  },
  {
    title: "Products & Pricing",
    content: "All product descriptions, images, and pricing are as accurate as possible. However, we reserve the right to correct errors and update information without prior notice. Prices are listed in Indian Rupees (₹) and are inclusive of applicable taxes unless stated otherwise.",
  },
  {
    title: "Orders & Payment",
    content: "Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel orders due to pricing errors, stock unavailability, or suspected fraud. Payment must be completed at the time of order placement unless COD is selected.",
  },
  {
    title: "Shipping & Delivery",
    content: "Estimated delivery timelines are provided at checkout and may vary based on location and product availability. Ehsaas Label is not responsible for delays caused by courier partners or unforeseen circumstances.",
  },
  {
    title: "Intellectual Property",
    content: "All content on this website — including designs, photographs, text, logos, and graphics — is the property of Ehsaas Label and protected under applicable intellectual property laws. Unauthorized reproduction is strictly prohibited.",
  },
  {
    title: "User Conduct",
    content: "You agree not to use our website for any unlawful purpose, to impersonate others, or to interfere with the functionality of the site. We reserve the right to terminate access for any user who violates these terms.",
  },
  {
    title: "Limitation of Liability",
    content: "Ehsaas Label shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products. Our maximum liability is limited to the amount paid for the specific product in question.",
  },
  {
    title: "Governing Law",
    content: "These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi, India.",
  },
];

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="page-fade-in">
        <section className="bg-secondary text-primary-foreground py-16 sm:py-24 text-center">
          <div className="container mx-auto px-4">
            <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">LEGAL</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">Terms & Conditions</h1>
            
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 sm:py-20 max-w-7xl">
          {sections.map((s, i) => (
            <div key={i} className="mb-8 sm:mb-10">
              <h2 className="font-heading text-lg sm:text-xl font-medium text-foreground mb-3">{`${i + 1}. ${s.title}`}</h2>
              <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">{s.content}</p>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default TermsConditions;
