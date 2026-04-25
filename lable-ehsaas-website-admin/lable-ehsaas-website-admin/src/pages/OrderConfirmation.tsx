import { useEffect, useState } from "react";
import { Check, Package, Truck, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import product1 from "@/assets/product-1.jpg";
import product3 from "@/assets/product-3.jpg";
import { useParams } from "react-router-dom";
import { db } from "@/services/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { upsertCustomer } from "@/utils/upsertCustomer";
// const trackingSteps = [
//   { id: "placed", label: "Order Placed", icon: Check, desc: "Your order has been confirmed", date: "Mar 11, 2026" },
//   { id: "shipping", label: "Shipped", icon: Package, desc: "Package handed to courier", date: "Mar 13, 2026" },
//   { id: "transit", label: "In Transit", icon: Truck, desc: "On the way to your address", date: "Mar 15, 2026" },
//   { id: "delivered", label: "Delivered", icon: MapPin, desc: "Package delivered successfully", date: "Mar 16, 2026" },
// ];

const OrderConfirmation = () => {
  const [animateCheck, setAnimateCheck] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
const { id } = useParams();
const [order, setOrder] = useState<any>(null);
const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (order) {
    setAnimateCheck(true);
    setActiveStep(getStepFromStatus(order.status));
   
  }
}, [order]);
  const getStepFromStatus = (status: string) => {
  switch (status) {
    case "pending": return 0;
    case "confirmed": return 1;
    case "shipped": return 2;
    case "delivered": return 3;
    default: return 0;
  }
};
// Add N business days to a date
function addBusinessDays(startDate: Date, days: number): Date {
  const date = new Date(startDate);
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) added++; // skip weekends
  }
  return date;
}

// Format a date like "Apr 12, 2026"
function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
useEffect(() => {
  if (!id) return;

  const docRef = doc(db, "orders", id);

  const unsubscribe = onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = { id: snapshot.id, ...snapshot.data() };

      // 🔥 Compute dynamic delivery dates
      const orderDate = data.createdAt ? data.createdAt.toDate() : new Date(); // assuming Firestore timestamp
      const dynamicSteps = [
        { id: "placed", label: "Order Placed", icon: Check, desc: "Your order has been confirmed", date: formatDate(orderDate) },
        { id: "shipping", label: "Shipped", icon: Package, desc: "Package handed to courier", date: formatDate(addBusinessDays(orderDate, 2)) },
        { id: "transit", label: "In Transit", icon: Truck, desc: "On the way to your address", date: formatDate(addBusinessDays(orderDate, 4)) },
        { id: "delivered", label: "Delivered", icon: MapPin, desc: "Package delivered successfully", date: formatDate(addBusinessDays(orderDate, 5)) },
      ];

      setOrder({ ...data, trackingSteps: dynamicSteps });

      setActiveStep(getStepFromStatus(data.status));
      setAnimateCheck(true);
    } else {
      console.log("No order found");
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, [id]);

 console.log("LIVE STATUS:", order?.status);
  const orderId = id?.toUpperCase();
if (loading) {
  return <div className="text-center py-20">Loading...</div>;
}

if (!order) {
  return <div className="text-center py-20">Order not found</div>;
}
  return (
    <div className="page-fade-in">
      <SiteHeader />
      <main className="min-h-screen">
        {/* Success hero */}
        <div className="bg-secondary py-rhythm-4">
          <div className="container mx-auto px-6 text-center">
            <div className={`w-20 h-20 mx-auto mb-8 rounded-full bg-primary flex items-center justify-center transition-all duration-700 ${animateCheck ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
              <svg width="32" height="32" viewBox="0 0 32 32" className="text-primary-foreground">
                <path
                  d="M8 16 L14 22 L24 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="30"
                  className={animateCheck ? "animate-draw-check" : ""}
                  style={{ strokeDashoffset: animateCheck ? 0 : 30 }}
                />
              </svg>
            </div>
            <p className="font-body text-xs font-light tracking-[0.3em] text-pink-dark uppercase mb-3 animate-fade-up">Thank You</p>
            <h1 className="font-heading text-4xl md:text-6xl font-light italic text-foreground mb-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Order Placed Successfully!
            </h1>
            <p className="font-body text-sm font-light text-muted-foreground mb-2 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Order ID: <span className="text-foreground font-normal">{orderId}</span>
            </p>
            <p className="font-body text-sm font-light text-muted-foreground animate-fade-up" style={{ animationDelay: "0.3s" }}>
              We've sent a confirmation email with your order details.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 py-rhythm-4">
          <div className="grid lg:grid-cols-2 gap-rhythm-4">
            {/* Tracking timeline */}
            <div>
              <h2 className="font-heading text-2xl font-light italic text-foreground mb-8">Order Tracking</h2>
              <div className="relative">
               {order.trackingSteps.map((step, i) => (
  <div key={step.id} className="flex gap-6 mb-8 last:mb-0">
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
        i <= activeStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      }`} style={{ transitionDelay: `${i * 200}ms` }}>
        <step.icon size={16} />
      </div>
      {i < order.trackingSteps.length - 1 && (
        <div className={`w-px h-12 transition-colors duration-500 ${i < activeStep ? "bg-foreground" : "bg-border"}`} style={{ transitionDelay: `${i * 200 + 100}ms` }} />
      )}
    </div>
    <div className={`pt-2 transition-opacity duration-500 ${i <= activeStep ? "opacity-100" : "opacity-40"}`} style={{ transitionDelay: `${i * 200}ms` }}>
      <p className="font-body text-sm font-light text-foreground">{step.label}</p>
      <p className="font-body text-xs font-light text-muted-foreground">{step.desc}</p>
      <p className="font-body text-[11px] font-light text-pink-dark mt-1">
        {i <= activeStep ? step.date : "Estimated: " + step.date}
      </p>
    </div>
  </div>
))}
              </div>
            </div>

            {/* Order details */}
            <div>
              <h2 className="font-heading text-2xl font-light italic text-foreground mb-8">Order Details</h2>

              <div className="border border-border p-6 mb-6">
                <h3 className="font-body text-xs font-light tracking-[0.15em] uppercase text-muted-foreground mb-4">Items Ordered</h3>
                <div className="space-y-4">
                 {order?.products?.map((item: any, i: number) => (
  <div key={i} className="flex gap-4">
    <div className="w-16 h-20 overflow-hidden bg-secondary/20 flex-shrink-0">
      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1 flex justify-between">
      <div>
        <p className="font-body text-sm">{item.name}</p>
        <p className="text-xs text-muted-foreground">
          Size: {item.size} · Qty: {item.quantity}
        </p>
      </div>
      <p className="text-sm">₹{(item.price * item.quantity).toLocaleString()}</p>
    </div>
  </div>
))}
                </div>
              </div>

              <div className="border border-border p-6 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between font-body text-sm font-light">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{order?.total?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm font-light">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">Free</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-heading text-lg font-light text-foreground">Total Paid</span>
                    <span className="font-heading text-lg font-light text-foreground">₹{order?.total?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

             {/* Delivery Address */}
<div className="border border-border p-6">
  <h3 className="font-body text-xs font-light tracking-[0.15em] uppercase text-muted-foreground mb-3">
    Delivery Address
  </h3>
  <p className="font-body text-sm font-light text-foreground leading-relaxed">
    {order?.customer}<br />
    {order?.address}<br />
    {order?.city}, {order?.state} {order?.pincode}<br />
    {order?.phone}
  </p>
</div>

{/* 🔥 Payment Section */}
<div className="border border-border p-6 mt-6">
  <h3 className="font-body text-xs font-light tracking-[0.15em] uppercase text-muted-foreground mb-3">
    Payment
  </h3>
  <p className="font-body text-sm font-light text-foreground">
    {order?.paymentMethod === "cod"
      ? "Cash on Delivery (Pay at doorstep)"
      : order?.paymentMethod}
  </p>
</div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase px-8 py-4 hover:bg-foreground/80 transition-colors duration-300"
                >
                  Continue Shopping <ArrowRight size={14} />
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center gap-2 border border-border font-body text-xs font-light tracking-[0.2em] uppercase px-8 py-4 hover:border-foreground transition-colors duration-300"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default OrderConfirmation;
