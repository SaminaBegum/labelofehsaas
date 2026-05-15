import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { RotateCcw, Clock, PackageCheck, CreditCard } from "lucide-react";

const steps = [
  { icon: RotateCcw, title: "Initiate Return", desc: "Contact us within 7 days of delivery with your order ID and reason." },
  { icon: PackageCheck, title: "Pack & Ship", desc: "Pack the item in original condition. We'll arrange a free pickup." },
  { icon: Clock, title: "Quality Check", desc: "Our team inspects the returned item within 48 hours of receiving it." },
  { icon: CreditCard, title: "Refund Processed", desc: "Refund is credited to your original payment method in 7–10 business days." },
];

const policies = [
  { title: "Eligible for Return", items: ["Unused, unwashed items with original tags", "Items returned within 7 days of delivery", "Damaged or defective products", "Wrong item received"] },
  { title: "Not Eligible for Return", items: ["Sale or discounted items", "Customized or altered products", "Innerwear and accessories", "Items without original packaging/tags"] },
];

const ReturnsRefunds = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="page-fade-in">
        <section className="bg-secondary text-primary-foreground py-16 sm:py-24 text-center">
          <div className="container mx-auto px-4">
            <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">CUSTOMER CARE</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">Returns & Refunds</h1>
           
          </div>
        </section>

        {/* Steps */}
        <section className="container mx-auto px-4 py-12 sm:py-20 max-w-7xl">
          <h2 className="font-heading text-xl sm:text-2xl text-center text-foreground mb-10 sm:mb-14">How It Works</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 border border-border flex items-center justify-center group-hover:bg-secondary/30 transition-colors duration-300">
                  <step.icon size={22} strokeWidth={1.2} className="text-foreground" />
                </div>
                <h3 className="font-heading text-sm sm:text-base font-medium text-foreground mb-1">{step.title}</h3>
                <p className="font-body text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Policies */}
        <section className="bg-secondary py-12 sm:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid sm:grid-cols-2 gap-8 sm:gap-12">
              {policies.map((policy, i) => (
                <div key={i}>
                  <h2 className="font-heading text-lg sm:text-xl font-medium text-foreground mb-5">{policy.title}</h2>
                  <ul className="space-y-3">
                    {policy.items.map((item, j) => (
                      <li key={j} className="font-body text-xs sm:text-sm text-muted-foreground flex items-start gap-2">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${i === 0 ? 'bg-green-500' : 'bg-destructive'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="container mx-auto px-4 py-12 sm:py-16 text-center max-w-7xl">
          <h2 className="font-heading text-lg sm:text-xl text-foreground mb-3">Still Have Questions?</h2>
          <p className="font-body text-xs sm:text-sm text-muted-foreground mb-6">Reach out to us at <span className="text-foreground font-medium">support@ehsaaslabel.com</span> and we'll respond within 24 hours.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default ReturnsRefunds;
