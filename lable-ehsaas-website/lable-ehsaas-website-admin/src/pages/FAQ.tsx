import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    category: "Orders & Shipping",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery takes 5–7 business days. Express shipping is available at checkout for 2–3 business day delivery across India." },
      { q: "Do you ship internationally?", a: "Currently, we ship within India only. International shipping will be available soon. Stay tuned!" },
      { q: "How can I track my order?", a: "Once your order is shipped, you'll receive a tracking link via email and SMS. You can also track your order from the 'My Orders' section." },
      { q: "Can I change my delivery address after placing an order?", a: "Address changes can be made within 2 hours of placing the order. Please contact our support team immediately." },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      { q: "What is your return policy?", a: "We accept returns within 7 days of delivery for unused, unwashed items with original tags intact. Sale items are non-returnable." },
      { q: "How do I initiate a return?", a: "Contact us at support@ehsaaslabel.com with your order ID and reason for return. We'll arrange a pickup within 48 hours." },
      { q: "When will I receive my refund?", a: "Refunds are processed within 7–10 business days after we receive and inspect the returned item." },
      { q: "Can I exchange a product for a different size?", a: "Yes! Exchanges are available for different sizes of the same product, subject to availability." },
    ],
  },
  {
    category: "Products & Sizing",
    items: [
      { q: "How do I find my size?", a: "Each product page has a detailed size chart. We recommend measuring yourself and comparing with our chart for the best fit." },
      { q: "Are your fabrics sustainable?", a: "We prioritize quality and sustainability. Many of our collections use organic cotton, handloom fabrics, and eco-friendly dyes." },
      { q: "Can I request customization?", a: "Custom sizing and minor alterations are available on select products. Please reach out to us before placing your order." },
    ],
  },
  {
    category: "Payments & Security",
    items: [
      { q: "What payment methods do you accept?", a: "We accept UPI, credit/debit cards, net banking, wallets, and Cash on Delivery (COD) on eligible orders." },
      { q: "Is my payment information secure?", a: "Absolutely. All transactions are encrypted with SSL and processed through trusted payment gateways." },
      { q: "Do you offer COD?", a: "Yes, Cash on Delivery is available on orders up to ₹10,000 for select pin codes." },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="page-fade-in">
        {/* Hero */}
        <section className="bg-secondary text-primary-foreground py-16 sm:py-24 text-center">
          <div className="container mx-auto px-4">
            <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">HELP CENTER</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">Frequently Asked Questions</h1>
          
          </div>
        </section>

        {/* FAQ Content */}
        <section className="container mx-auto px-4 py-12 sm:py-20 max-w-7xl">
          {faqs.map((section, idx) => (
            <div key={idx} className="mb-10 sm:mb-14">
              <h2 className="font-heading text-xl sm:text-2xl font-medium text-foreground mb-4 sm:mb-6">{section.category}</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {section.items.map((item, i) => (
                  <AccordionItem key={i} value={`${idx}-${i}`} className="border border-border/50 rounded-none px-4 sm:px-6">
                    <AccordionTrigger className="font-body text-xs sm:text-sm font-medium text-foreground hover:no-underline">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
};

export default FAQ;
