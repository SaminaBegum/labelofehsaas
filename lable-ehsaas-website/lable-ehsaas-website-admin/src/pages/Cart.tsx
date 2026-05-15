// import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
// import { Link } from "react-router-dom";
// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";
// import { useCart } from "@/context/CartContext";
// import { useState } from "react";
// import { upsertCustomer } from "@/utils/upsertCustomer";
// const Cart = () => {
//   const { items, removeItem, updateQuantity, subtotal } = useCart();
//   const [coupon, setCoupon] = useState("");
//   const [couponApplied, setCouponApplied] = useState(false);

//   const shipping = subtotal > 999 ? 0 : 99;
//   const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
//   const total = subtotal + shipping - discount;

//   return (
//     <div className="page-fade-in">
//       <SiteHeader />
//       <main>
//         <div className="bg-secondary py-rhythm-3">
//           <div className="container mx-auto px-6 text-center">
//             <h1 className="font-heading text-4xl md:text-6xl font-light italic text-foreground">Shopping Cart</h1>
//           </div>
//         </div>

//         <div className="container mx-auto px-6 py-rhythm-4">
//           {items.length === 0 ? (
//             <div className="text-center py-rhythm-4 animate-fade-up">
//               <ShoppingBag size={48} strokeWidth={1} className="mx-auto text-muted-foreground mb-6" />
//               <p className="font-heading text-2xl font-light italic text-foreground mb-4">Your cart is empty</p>
//               <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase px-10 py-4 hover:bg-foreground/80 transition-colors duration-300">
//                 Continue Shopping <ArrowRight size={14} />
//               </Link>
//             </div>
//           ) : (
//             <div className="grid lg:grid-cols-3 gap-rhythm-3">
//               <div className="lg:col-span-2 space-y-6">
//                 {items.map((item, i) => (
//                   <div key={item.id + item.size} className="flex gap-4 md:gap-6 border-b border-border pb-6 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
//                     <div className="w-24 h-32 md:w-28 md:h-36 overflow-hidden bg-secondary/20 flex-shrink-0">
//                       <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between gap-2">
//                         <div className="min-w-0">
//                           <h3 className="font-heading text-base md:text-lg font-light text-foreground mb-1 truncate">{item.name}</h3>
//                           <p className="font-body text-xs font-light text-muted-foreground">Size: {item.size}</p>
//                         </div>
//                         <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
//                           <X size={18} strokeWidth={1.5} />
//                         </button>
//                       </div>
//                       <div className="flex items-center justify-between mt-4 md:mt-6">
//                         <div className="inline-flex items-center border border-border">
//                           <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"><Minus size={12} /></button>
//                           <span className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-body text-sm text-foreground border-x border-border">{item.quantity}</span>
//                           <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"><Plus size={12} /></button>
//                         </div>
//                         <span className="font-heading text-base md:text-lg font-light text-foreground">₹{(item.price * item.quantity).toLocaleString()}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="bg-secondary p-6 md:p-8 h-fit border border-border animate-fade-up">
//                 <h3 className="font-heading text-xl font-bold italic text-foreground mb-6">Order Summary</h3>
//                 <div className="space-y-4 mb-6">
//                   <div className="flex justify-between font-body text-sm font-light">
//                     <span className="text-muted-foreground">Subtotal</span>
//                     <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between font-body text-sm font-light">
//                     <span className="text-muted-foreground">Shipping</span>
//                     <span className="text-foreground">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
//                   </div>
//                   {couponApplied && (
//                     <div className="flex justify-between font-body text-sm font-light text-green-600">
//                       <span>Discount (10%)</span>
//                       <span>-₹{discount.toLocaleString()}</span>
//                     </div>
//                   )}
//                   <div className="border-t border-border pt-4 flex justify-between">
//                     <span className="font-heading text-lg font-light text-foreground">Total</span>
//                     <span className="font-heading text-lg font-light text-foreground">₹{total.toLocaleString()}</span>
//                   </div>
//                 </div>

//                 <div className="flex mb-6">
//                   <input
//                     type="text"
//                     value={coupon}
//                     onChange={(e) => setCoupon(e.target.value)}
//                     placeholder="Coupon code"
//                     className="flex-1 bg-transparent border border-border font-body text-sm font-light px-4 py-3 focus:outline-none focus:border-foreground transition-colors"
//                   />
//                   <button
//                     onClick={() => { if (coupon) setCouponApplied(true); }}
//                     className="bg-primary text-primary-foreground font-body text-xs tracking-[0.1em] uppercase px-4 py-3"
//                   >
//                     Apply
//                   </button>
//                 </div>

//                 <Link
//                   to="/checkout"
//                   className="w-full bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase py-4 hover:bg-foreground/80 transition-colors duration-300 mb-3 flex items-center justify-center gap-2"
//                 >
//                   Proceed to Checkout <ArrowRight size={14} />
//                 </Link>
//                 <Link to="/shop" className="block text-center font-body text-xs font-light text-muted-foreground hover:text-foreground transition-colors underline mt-3">
//                   Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//       <SiteFooter />
//     </div>
//   );
// };

// export default Cart;
import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import GiftModal from "@/components/GiftModal";
import giftBox from "@/assets/gift-image.jpeg";
// const Cart = () => {
//   const { items, removeItem, updateQuantity, subtotal } = useCart();
//   const [coupon, setCoupon] = useState("");
//   const [couponApplied, setCouponApplied] = useState(false);
// const [showGiftModal, setShowGiftModal] = useState(false);
// const { giftPackaging, giftNote, giftPrice, removeGiftPackaging } = useCart();
//   const shipping = subtotal > 999 ? 0 : 99;
//   const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
//   const total = subtotal + shipping - discount;
//   const { setGiftPackaging } = useCart(); 

  // ⭐ ADDED FOR GIFT PACKAGING
  const Cart = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,

    giftPackaging,
    giftNote,
    giftPrice,
    removeGiftPackaging,
    setGiftPackaging,
     setGiftNote,  // ⭐ IMPORTANT

  } = useCart();

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);

  const shipping = subtotal > 999 ? 0 : 99;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="page-fade-in">
      <SiteHeader />
      <main>
        <div className="bg-secondary py-rhythm-3">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-light italic text-foreground">
              Shopping Cart
            </h1>
          </div>
        </div>

        <div className="container mx-auto px-6 py-rhythm-4">
          {items.length === 0 ? (
            <div className="text-center py-rhythm-4 animate-fade-up">
              <ShoppingBag
                size={48}
                strokeWidth={1}
                className="mx-auto text-muted-foreground mb-6"
              />
              <p className="font-heading text-2xl font-light italic text-foreground mb-4">
                Your cart is empty
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase px-10 py-4 hover:bg-foreground/80 transition-colors duration-300"
              >
                Continue Shopping <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-rhythm-3">
              <div className="lg:col-span-2 space-y-6">
                {items.map((item, i) => (
                  <div
                    key={item.id + item.size}
                    className="flex gap-4 md:gap-6 border-b border-border pb-6 animate-fade-up"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="w-24 h-32 md:w-28 md:h-36 overflow-hidden bg-secondary/20 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-heading text-base md:text-lg font-light text-foreground mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="font-body text-xs font-light text-muted-foreground">
                            Size: {item.size}
                          </p>
                        </div>
                        <button
                         onClick={() => removeItem(item.id, item.size)}
                          className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                        >
                          <X size={18} strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4 md:mt-6">
                        <div className="inline-flex items-center border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.quantity - 1)
                            }
                            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                          >
                            <Minus size={12} />
                          </button>

                          <span className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-body text-sm text-foreground border-x border-border">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                             updateQuantity(item.id, item.size, item.quantity + 1)
                            }
                            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <span className="font-heading text-base md:text-lg font-light text-foreground">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-secondary p-6 md:p-8 h-fit border border-border animate-fade-up">
                <h3 className="font-heading text-xl font-bold italic text-foreground mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between font-body text-sm font-light">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                  </div>
{/* ➤ Gift Packaging Price */}
{giftPackaging && (
  <div className="flex justify-between text-sm mb-2">
    <span>Gift Packaging</span>
    <span>₹{giftPrice}</span>
  </div>
)}

{/* ➤ Gift Note */}
{giftNote && (
  <p className="text-xs text-muted-foreground mb-2">
    Message: {giftNote}
  </p>
)}

{/* ➤ Remove Button */}
{giftPackaging && (
  <button
    onClick={removeGiftPackaging}
    className="text-xs text-red-500 underline mb-3"
  >
    Remove Gift Packaging
  </button>
)}
                  <div className="flex justify-between font-body text-sm font-light">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between font-body text-sm font-light text-green-600">
                      <span>Discount (10%)</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="font-heading text-lg font-light text-foreground">
                      Total
                    </span>
                    <span className="font-heading text-lg font-light text-foreground">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Coupon Section */}
                <div className="flex mb-4">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 bg-transparent border border-border font-body text-sm font-light px-4 py-3"
                  />
                  <button
                    onClick={() => coupon && setCouponApplied(true)}
                    className="bg-primary text-primary-foreground font-body text-xs tracking-[0.1em] uppercase px-4 py-3"
                  >
                    Apply
                  </button>
                </div>

                {/* ⭐ GIFT PACKAGING BUTTON */}
               <button
  onClick={() => setShowGiftModal(true)}
  className="w-full bg-black text-white py-3 mb-4"
>
  + Add Gift Packaging
</button>

                <Link
                  to="/checkout"
                  className="w-full bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase py-4 hover:bg-foreground/80 transition-colors duration-300 mb-3 flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={14} />
                </Link>

                <Link
                  to="/shop"
                  className="block text-center font-body text-xs font-light text-muted-foreground hover:text-foreground transition-colors underline mt-3"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <SiteFooter />

      {/* ⭐ GIFT PACKAGING MODAL */}
    {showGiftModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white w-full max-w-4xl grid grid-cols-2 relative rounded-sm overflow-hidden">

      {/* ❌ Close Button */}
      <button
        onClick={() => setShowGiftModal(false)}
        className="absolute right-4 top-4 text-gray-500 hover:text-black z-10"
      >
        <X size={20} />
      </button>

      {/* ✅ LEFT SIDE - IMAGE */}
     <div className="bg-gray-100 h-full">
  <img
    src={giftBox}
    alt="Gift Packaging"
    className="w-full h-full object-cover"
  />
</div>

      {/* ✅ RIGHT SIDE - CONTENT */}
      <div className="p-8 flex flex-col justify-between">

        <div>
          <h2 className="text-2xl font-heading mb-2">
            Gift Packaging
          </h2>

          <p className="text-lg mb-3 font-medium">₹750.00</p>

          <p className="text-muted-foreground text-sm mb-6">
            Wrapped in our signature luxury gift box with ribbon detailing.
            Perfect for special occasions.
          </p>

          {/* TEXTAREA */}
          <div>
            <label className="text-xs uppercase tracking-wide mb-2 block">
              Gift Message (Optional)
            </label>

            <textarea
              placeholder="Write your message here..."
              value={giftNote}
              onChange={(e) => setGiftNote(e.target.value)}
              maxLength={120}
              className="w-full border border-border p-3 text-sm h-28 resize-none focus:outline-none focus:border-black"
            />

            <p className="text-xs text-gray-400 mt-1 text-right">
              {giftNote.length}/120
            </p>
          </div>
        </div>

        {/* BUTTON */}
    <button
  onClick={() => {
    setGiftPackaging(giftNote);   // ⭐ Save gift note + enable gift packaging
    setShowGiftModal(false);      // Close modal
  }}
  className="w-full bg-black text-white py-3 mt-6 hover:opacity-90 transition"
>
  Save Gift Option
</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default Cart;