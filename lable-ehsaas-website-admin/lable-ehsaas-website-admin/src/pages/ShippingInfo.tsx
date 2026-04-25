import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Truck, MapPin, Clock, ShieldCheck } from "lucide-react";

const highlights = [
  { icon: Truck, title: "Free Shipping", desc: "On orders above ₹1,499" },
  { icon: Clock, title: "5–7 Days", desc: "Standard delivery across India" },
  { icon: MapPin, title: "Pan-India", desc: "We deliver to 25,000+ pin codes" },
  { icon: ShieldCheck, title: "Secure Packing", desc: "Premium packaging for every order" },
];

const shippingDetails = [
  { title: "Standard Shipping", content: "Delivery within 5–7 business days. Free on orders above ₹1,499. A flat fee of ₹99 applies for orders below this threshold." },
  { title: "Express Shipping", content: "Delivery within 2–3 business days. Available at checkout for an additional ₹199. Available for major cities and metros only." },
  { title: "Cash on Delivery", content: "COD is available on orders up to ₹10,000 for select pin codes. An additional COD fee of ₹49 may apply." },
  { title: "Order Processing", content: "Orders are processed within 24–48 hours (excluding weekends and holidays). You'll receive a confirmation email with tracking details once your order is shipped." },
  { title: "Tracking Your Order", content: "Once shipped, a tracking link is sent via email and SMS. You can also track your order by logging into your account on our website." },
  { title: "Delivery Attempts", content: "Our courier partners make up to 3 delivery attempts. If delivery fails after 3 attempts, the order is returned to us and a refund is initiated." },
];

const ShippingInfo = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="page-fade-in">
        <section className="bg-secondary text-primary-foreground py-16 sm:py-24 text-center">
          <div className="container mx-auto px-4">
            <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">DELIVERY</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">Shipping Information</h1>
           
          </div>
        </section>

        {/* Highlights */}
        <section className="container mx-auto px-4 py-12 sm:py-16 max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <div key={i} className="text-center border border-border p-5 sm:p-6 hover:border-secondary transition-colors duration-300">
                <h.icon size={24} strokeWidth={1.2} className="mx-auto mb-3 text-foreground" />
                <h3 className="font-heading text-sm sm:text-base font-medium text-foreground">{h.title}</h3>
                <p className="font-body text-[10px] sm:text-xs text-muted-foreground mt-1">{h.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Details */}
        <section className="bg-accent/20 py-12 sm:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            {shippingDetails.map((s, i) => (
              <div key={i} className="mb-8 sm:mb-10">
                <h2 className="font-heading text-lg sm:text-xl font-medium text-foreground mb-3">{s.title}</h2>
                <p className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">{s.content}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ShippingInfo;
