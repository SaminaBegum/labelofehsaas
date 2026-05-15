import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly, such as your name, email address, phone number, shipping address, and payment details when you place an order. We also automatically collect browsing data, device information, and cookies to improve your shopping experience.`,
  },
  {
    title: "How We Use Your Information",
    content: `Your information is used to process orders, provide customer support, send order updates, personalize your experience, and improve our services. With your consent, we may also send promotional communications about new collections and offers.`,
  },
  {
    title: "Information Sharing",
    content: `We do not sell your personal information. We share data only with trusted partners necessary to fulfill orders (payment processors, shipping providers) and comply with legal obligations. All partners are bound by strict confidentiality agreements.`,
  },
  {
    title: "Data Security",
    content: `We implement industry-standard security measures including SSL encryption, secure payment gateways, and regular security audits to protect your personal information from unauthorized access, alteration, or disclosure.`,
  },
  {
    title: "Cookies & Tracking",
    content: `We use cookies and similar technologies to remember your preferences, analyze site traffic, and personalize content. You can manage cookie preferences through your browser settings. Disabling cookies may affect some site functionality.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. To exercise these rights, contact us at privacy@ehsaaslabel.com.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy periodically. Changes will be posted on this page with the updated date. We encourage you to review this policy regularly.`,
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="page-fade-in">
        <section className="bg-secondary text-primary-foreground py-16 sm:py-24 text-center">
          <div className="container mx-auto px-4">
            <p className="font-body text-xs font-bold tracking-[0.3em] text-pink-dark uppercase mb-3">LEGAL</p>
            <h1 className="font-heading text-4xl md:text-6xl font-bold italic text-foreground">Privacy Policy</h1>
           
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 sm:py-20 max-w-7xl">
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10">
            At Ehsaas Label, your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you visit our website or make a purchase.
          </p>
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

export default PrivacyPolicy;
