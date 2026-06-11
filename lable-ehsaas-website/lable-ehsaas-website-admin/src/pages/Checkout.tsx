import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, MapPin, CreditCard, Eye } from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { upsertCustomer } from "@/utils/upsertCustomer";
import { serverTimestamp } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
const steps = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Review", icon: Eye },
];

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
const directProduct = location.state?.product;
  const { items, subtotal, clearCart } = useCart();



 const { isAuthenticated, setShowAuthModal } = useAuth();

// ✅ STATES FIRST
const [currentStep, setCurrentStep] = useState(1);
const [shipping, setShipping] = useState({
  fullName: "", phone: "", email: "", address: "", city: "", state: "", pincode: "",
});
const [deliveryOption, setDeliveryOption] = useState("standard");
const [paymentMethod, setPaymentMethod] = useState("cod");

// ✅ DATA LOGIC AFTER STATE
const finalItems = directProduct
  ? [
      {
        ...directProduct,
        quantity: directProduct.quantity || 1,
      },
    ]
  : items;

const calculatedSubtotal = directProduct
  ? directProduct.price * (directProduct.quantity || 1)
  : subtotal;

const shippingCost = deliveryOption === "express" ? 199 : 0;
const total = calculatedSubtotal + shippingCost;

  



const saveOrderToDB = async (paymentStatus, paymentId = null) => {
  const orderData = {
    customer: shipping.fullName,
    email: shipping.email,
    phone: shipping.phone,
    address: shipping.address,
    city: shipping.city,
    state: shipping.state,
    pincode: shipping.pincode,

    products: finalItems.map(i => ({
      id: i.id,
      name: i.name,
      size: i.size,
      quantity: i.quantity,
      price: i.price,
      image: i.image,
    })),

    total,
    status: "pending",
    paymentStatus,
    paymentMethod,
    paymentId,
    deliveryOption,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "orders"), orderData);

  await upsertCustomer({
    name: shipping.fullName,
    email: shipping.email,
    phone: shipping.phone,
    city: shipping.city,
    orderAmount: total,
  });

  clearCart();
  navigate(`/order-confirmation/${docRef.id}`);
  toast.success("Order placed successfully!");
};

// 🔥 Razorpay Payment Function
// 🚀 HANDLE RAZORPAY PAYMENT
const handleRazorpayPayment = async () => {
  try {
    console.log("Sending amount to backend:", total);

    // 1️⃣ CREATE ORDER IN BACKEND
    const res = await fetch("http://187.127.158.162/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: total }),
    });

    const order = await res.json();
    console.log("Order created:", order);

    if (!order?.id) {
      toast.error("Failed to create order");
      return;
    }

    // 2️⃣ RAZORPAY POPUP OPTIONS
    const options = {
      key: "rzp_test_SfjvvnBL5CGsWr",
      amount: order.amount,
      currency: "INR",
      name: "Ehsaas Store",
      description: "Order Payment",
      order_id: order.id,

      // ⭐ UPDATED HANDLER (COPY-PASTE READY)
      handler: async function (response) {
        console.log("Razorpay Response:", response);

        const verify = await fetch("http://187.127.158.162/api/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...response,
            email: shipping.email,
            amount: total,

            // ✅ IMPORTANT ADDED DATA
            items: items,
            shipping: shipping,
          }),
        });

        const data = await verify.json();
        console.log("Verification Result:", data);

        if (data.success) {
          // KEEP YOUR EXISTING FLOW
          await saveOrderToDB("paid", response.razorpay_payment_id);

          toast.success("Payment Successful!");

          // OPTIONAL (if backend returns orderId)
          // navigate(`/order-confirmation/${data.orderId}`);
        } else {
          toast.error("Payment verification failed ❌");
        }
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function () {
      toast.error("Payment Failed ❌");
    });

    // 5️⃣ OPEN RAZORPAY POPUP
    rzp.open();

  } catch (err) {
    console.error(err);
    toast.error("Payment failed");
  }
};

// ⭐ MAIN PLACE ORDER BUTTON HANDLER
const handlePlaceOrder = async () => {
  if (!isAuthenticated) {
    setShowAuthModal(true);
    toast.error("Please sign in to place your order");
    return;
  }

  // VALIDATE SHIPPING DETAILS
  if (
    !shipping.fullName ||
    !shipping.phone ||
    !shipping.address ||
    !shipping.city ||
    !shipping.pincode
  ) {
    toast.error("Please fill all required fields");
    return;
  }

  try {
    // 🟤 COD PAYMENT
    if (paymentMethod === "cod") {
      await saveOrderToDB("unpaid");
    }

    // 🔵 RAZORPAY PAYMENT
    else if (paymentMethod === "razorpay") {
      await handleRazorpayPayment();
    }

    else {
      toast.error("Invalid payment method");
    }

  } catch (error) {
    console.error(error);
    toast.error("Failed to place order");
  }
};


 if (!directProduct && items.length === 0) {
    return (
      <div className="page-fade-in">
        <SiteHeader />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center animate-fade-up">
            <p className="font-heading text-2xl font-light italic text-foreground mb-4">Your cart is empty</p>
            <a href="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase px-10 py-4">
              Shop Now <ArrowRight size={14} />
            </a>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="page-fade-in">
      <SiteHeader />
      <main className="min-h-screen">
        <div className="bg-secondary py-rhythm-2">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-heading text-3xl md:text-5xl font-light italic text-foreground mb-8">Checkout</h1>
            <div className="flex items-center justify-center gap-2 md:gap-4 max-w-md mx-auto">
              {steps.map((step, i) => (
                <div key={step.id} className="flex items-center gap-2 md:gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      currentStep > step.id ? "bg-primary text-primary-foreground" :
                      currentStep === step.id ? "bg-secondary text-secondary-foreground border-2 border-foreground animate-pulse-pink" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {currentStep > step.id ? <Check size={16} /> : <step.icon size={16} />}
                    </div>
                    <span className="font-body text-[10px] font-light tracking-[0.1em] uppercase mt-2 text-muted-foreground">{step.label}</span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-12 md:w-20 h-px transition-colors duration-500 ${currentStep > step.id ? "bg-foreground" : "bg-border"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-rhythm-3">
          <div className="grid lg:grid-cols-3 gap-rhythm-3">
            <div className="lg:col-span-2">
              {/* Step 1 */}
              {currentStep === 1 && (
                <div className="animate-fade-up">
                  <h2 className="font-heading text-2xl font-light italic text-foreground mb-8">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Full Name", key: "fullName", type: "text", full: true },
                      { label: "Phone", key: "phone", type: "tel" },
                      { label: "Email", key: "email", type: "email" },
                      { label: "Address", key: "address", type: "text", full: true },
                      { label: "City", key: "city", type: "text" },
                      { label: "State", key: "state", type: "text" },
                      { label: "Pincode", key: "pincode", type: "text" },
                    ].map((field) => (
                      <div key={field.key} className={field.full ? "md:col-span-2" : ""}>
                        <label className="font-body text-xs font-light tracking-[0.15em] uppercase text-foreground mb-2 block">{field.label}</label>
                        <input
                          type={field.type}
                          value={shipping[field.key as keyof typeof shipping]}
                          onChange={(e) => setShipping({ ...shipping, [field.key]: e.target.value })}
                          className="w-full bg-transparent border border-border font-body text-sm font-light px-5 py-4 focus:outline-none focus:border-foreground transition-colors duration-300"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <h3 className="font-heading text-lg font-light italic text-foreground mb-4">Delivery Options</h3>
                    <div className="space-y-3">
                      {[
                        { id: "standard", label: "Standard Delivery", desc: "5-7 business days", price: "Free" },
                        { id: "express", label: "Express Delivery", desc: "2-3 business days", price: "₹199" },
                      ].map((opt) => (
                        <label key={opt.id} className={`flex items-center justify-between p-5 border cursor-pointer transition-all duration-300 ${deliveryOption === opt.id ? "border-foreground bg-secondary/30" : "border-border hover:border-muted-foreground"}`}>
                          <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryOption === opt.id ? "border-foreground" : "border-border"}`}>
                              {deliveryOption === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-foreground" />}
                            </div>
                            <div>
                              <p className="font-body text-sm font-light text-foreground">{opt.label}</p>
                              <p className="font-body text-xs font-light text-muted-foreground">{opt.desc}</p>
                            </div>
                          </div>
                          <span className="font-body text-sm font-light text-foreground">{opt.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setCurrentStep(2)} className="mt-8 inline-flex items-center gap-3 bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase px-10 py-4 hover:bg-foreground/80 transition-colors duration-300">
                    Continue to Payment <ArrowRight size={14} />
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {currentStep === 2 && (
                <div className="animate-fade-up">
                  <h2 className="font-heading text-2xl font-light italic text-foreground mb-8">Payment Method</h2>
                  <div className="space-y-3">
                {[
  // { id: "upi", label: "UPI", desc: "Coming soon", disabled: true },
  // { id: "card", label: "Credit / Debit Card", desc: "Coming soon", disabled: true },
  // { id: "netbanking", label: "Net Banking", desc: "Coming soon", disabled: true },
  // { id: "cod", label: "Cash on Delivery", desc: "Pay at doorstep", disabled: false },
  { id: "razorpay", label: "Pay Online", desc: "UPI / Card / NetBanking", disabled: false },
{ id: "cod", label: "Cash on Delivery", desc: "Pay at doorstep", disabled: false },
].map((method) => (
  <label
    key={method.id}
    className={`flex items-center gap-4 p-5 border transition-all duration-300 
      ${method.disabled 
        ? "opacity-50 cursor-not-allowed border-border" 
        : paymentMethod === method.id 
          ? "border-foreground bg-secondary/30 cursor-pointer" 
          : "border-border hover:border-muted-foreground cursor-pointer"
      }`}
    onClick={() => {
      if (!method.disabled) setPaymentMethod(method.id);
    }}
  >
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
      paymentMethod === method.id ? "border-foreground" : "border-border"
    }`}>
      {paymentMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-foreground" />}
    </div>

    <div>
      <p className="font-body text-sm font-light text-foreground">{method.label}</p>
      <p className="font-body text-xs font-light text-muted-foreground">{method.desc}</p>
    </div>
  </label>
))}
                  </div>
                  {paymentMethod === "card" && (
                    <div className="mt-6 space-y-4 animate-fade-up">
                      <div>
                        <label className="font-body text-xs font-light tracking-[0.15em] uppercase text-foreground mb-2 block">Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" className="w-full bg-transparent border border-border font-body text-sm font-light px-5 py-4 focus:outline-none focus:border-foreground transition-colors" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="font-body text-xs font-light tracking-[0.15em] uppercase text-foreground mb-2 block">Expiry</label>
                          <input type="text" placeholder="MM/YY" className="w-full bg-transparent border border-border font-body text-sm font-light px-5 py-4 focus:outline-none focus:border-foreground transition-colors" />
                        </div>
                        <div>
                          <label className="font-body text-xs font-light tracking-[0.15em] uppercase text-foreground mb-2 block">CVV</label>
                          <input type="text" placeholder="•••" className="w-full bg-transparent border border-border font-body text-sm font-light px-5 py-4 focus:outline-none focus:border-foreground transition-colors" />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setCurrentStep(1)} className="inline-flex items-center gap-2 border border-border font-body text-xs font-light tracking-[0.2em] uppercase px-8 py-4 hover:border-foreground transition-colors duration-300">
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button onClick={() => setCurrentStep(3)} className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase px-10 py-4 hover:bg-foreground/80 transition-colors duration-300">
                      Review Order <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {currentStep === 3 && (
                <div className="animate-fade-up">
                  <h2 className="font-heading text-2xl font-light italic text-foreground mb-8">Order Review</h2>
                  <div className="space-y-6 mb-8">
                    <div className="border border-border p-6">
                      <h3 className="font-body text-xs font-light tracking-[0.15em] uppercase text-muted-foreground mb-3">Shipping Address</h3>
                      <p className="font-body text-sm font-light text-foreground">
                        {shipping.fullName || "—"}<br />
                        {shipping.address || "—"}<br />
                        {shipping.city || "—"}, {shipping.state || "—"} {shipping.pincode || ""}<br />
                        {shipping.phone || "—"}
                      </p>
                    </div>
                    <div className="border border-border p-6">
                      <h3 className="font-body text-xs font-light tracking-[0.15em] uppercase text-muted-foreground mb-3">Payment Method</h3>
                      <p className="font-body text-sm font-light text-foreground capitalize">
{paymentMethod === "cod"
  ? `Cash on Delivery (Pay ₹${total} at doorstep)`
  : paymentMethod === "razorpay"
  ? "Online Payment (UPI / Card / NetBanking)"
  : "Unknown"}
</p>
                    </div>
                    <div className="border border-border p-6">
                      <h3 className="font-body text-xs font-light tracking-[0.15em] uppercase text-muted-foreground mb-4">Items</h3>
                      <div className="space-y-4">
                        {finalItems.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="w-16 h-20 overflow-hidden bg-secondary/20 flex-shrink-0">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 flex justify-between items-start">
                              <div>
                                <p className="font-body text-sm font-light text-foreground">{item.name}</p>
                                <p className="font-body text-xs font-light text-muted-foreground">Size: {item.size} · Qty: {item.quantity}</p>
                              </div>
                              <p className="font-body text-sm font-light text-foreground">₹{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {!isAuthenticated && (
                    <div className="border border-secondary bg-secondary/20 p-4 mb-6 animate-fade-up">
                      <p className="font-body text-sm font-light text-foreground">
                        Please <button onClick={() => setShowAuthModal(true)} className="underline text-pink-dark font-normal">sign in</button> to place your order.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button onClick={() => setCurrentStep(2)} className="inline-flex items-center gap-2 border border-border font-body text-xs font-light tracking-[0.2em] uppercase px-8 py-4 hover:border-foreground transition-colors duration-300">
                      <ArrowLeft size={14} /> Back
                    </button>
                    <button onClick={handlePlaceOrder} className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase px-10 py-4 hover:bg-foreground/80 transition-colors duration-300">
                      Place Order <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="bg-secondary p-6 md:p-8 h-fit border border-border animate-fade-up">
              <h3 className="font-heading text-lg font-light italic text-foreground mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                {finalItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-18 overflow-hidden bg-muted flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-light text-foreground truncate">{item.name}</p>
                      <p className="font-body text-[11px] font-light text-muted-foreground">{item.size} · x{item.quantity}</p>
                      <p className="font-body text-xs font-light text-foreground">₹{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between font-body text-sm font-light">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{calculatedSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-body text-sm font-light">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-heading text-lg font-light text-foreground">Total</span>
                  <span className="font-heading text-lg font-light text-foreground">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Checkout;
