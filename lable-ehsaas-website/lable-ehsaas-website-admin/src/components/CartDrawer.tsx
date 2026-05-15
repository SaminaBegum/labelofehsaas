// import { useCart } from "@/context/CartContext";

// const CartDrawer = () => {
//   const { items, closeCart, isCartOpen } = useCart();

//   return (
//     <div
//       className={`fixed top-0 right-0 h-full w-[350px] bg-white shadow-lg z-50 transform transition-transform duration-300
//       ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
//     >
//       {/* HEADER */}
//       <div className="flex justify-between p-4 border-b">
//         <h2 className="font-semibold">Your Cart</h2>
//         <button onClick={closeCart}>✕</button>
//       </div>

//       {/* ITEMS */}
//       <div className="p-4 space-y-4 overflow-y-auto h-[70%]">
        
//         {items.length === 0 ? (
//           <p className="text-center text-gray-500">
//             Your cart is empty
//           </p>
//         ) : (
//           items.map((item, i) => (
//             <div key={i} className="flex gap-3">
//               <img src={item.image} className="w-16 h-16 object-cover" />
//               <div>
//                 <p className="text-sm">{item.name}</p>
//                 <p className="text-xs text-gray-500">{item.size}</p>
//                 <p className="text-sm font-semibold">₹{item.price}</p>
//               </div>
//             </div>
//           ))
//         )}

//       </div>

//       {/* FOOTER */}
//       <div className="p-4 border-t">
//         <button className="w-full bg-black text-white py-2">
//           Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CartDrawer;
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import giftImage from "@/assets/gift-image.jpeg";
const CartDrawer = () => {
  const {
    items,
    subtotal,
    giftPackaging,
    giftNote,
    giftPrice,
    setGiftPackaging,
    setGiftNote,
    closeCart,
    isCartOpen,
  } = useCart();

  // ⭐ ADD THIS
  const [showGiftModal, setShowGiftModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "auto";
  }, [isCartOpen]);

  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <>
      {/* OVERLAY */}
      {isCartOpen && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/40 z-[9998]"
        />
      )}

      {/* DRAWER */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-[9999]
        transform transition-transform duration-300
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex justify-between p-4 border-b">
          <h2 className="font-semibold">Your Cart</h2>
          <button onClick={closeCart}>✕</button>
        </div>

        {/* ITEMS */}
        <div className="p-4 space-y-4 overflow-y-auto h-[55%]">
          {items.length === 0 ? (
            <p className="text-center text-gray-500">
              Your cart is empty
            </p>
          ) : (
            items.map((item, i) => (
              <div key={i} className="flex gap-3">
                <img src={item.image} className="w-16 h-16 object-cover" />
                <div>
                  <p className="text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">{item.size}</p>
                  <p className="text-sm font-semibold">₹{item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* ⭐ ADD GIFT BUTTON */}
        <div className="px-4">
          <button
            onClick={() => setShowGiftModal(true)}
            className="w-full bg-black text-white py-2 mb-3"
          >
            + Add Gift Packaging
          </button>
        </div>

        {/* SUMMARY */}
        <div className="p-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          {giftPackaging && (
            <>
              <div className="flex justify-between text-sm">
                <span>Gift Packaging</span>
                <span>₹{giftPrice}</span>
              </div>

              {giftNote && (
                <p className="text-xs text-gray-500">
                  "{giftNote}"
                </p>
              )}
            </>
          )}

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t">
          <Link
            to="/checkout"
            onClick={closeCart}
            className="block w-full bg-black text-white py-2 text-center"
          >
            Checkout
          </Link>
        </div>
      </div>

      {/* ⭐ GIFT MODAL (SAME AS CART PAGE) */}
      {/* ⭐ GIFT MODAL — UPDATED DESIGN LIKE YOUR SCREENSHOT */}
{showGiftModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[10000]">
    <div className="bg-white w-full max-w-3xl rounded-lg overflow-hidden relative shadow-xl">

      {/* Close Button */}
      <button
        onClick={() => setShowGiftModal(false)}
        className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
      >
        ✕
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* LEFT IMAGE */}
       <div className="w-full h-full">
  <img
    src={giftImage}
    className="w-full h-full object-cover"
    alt="Gift Packaging"
  />
</div>

        {/* RIGHT CONTENT */}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-1">Gift Packaging</h2>

          <p className="text-lg font-bold mb-4">₹{giftPrice}.00</p>

          <p className="text-gray-600 text-sm mb-4">
            Wrapped in our signature luxury gift box with ribbon detailing.
            Perfect for special occasions.
          </p>

          <label className="text-xs font-semibold">GIFT MESSAGE (OPTIONAL)</label>

          <textarea
            placeholder="Write your message here..."
            value={giftNote}
            onChange={(e) => setGiftNote(e.target.value)}
            maxLength={120}
            className="w-full border p-3 mt-1 mb-2 h-28 text-sm focus:outline-none"
          />

          <div className="text-right text-xs text-gray-500 mb-4">
            {giftNote?.length || 0}/120
          </div>

          <button
            onClick={() => {
              setGiftPackaging(true);
              setShowGiftModal(false);
            }}
            className="w-full bg-black text-white py-3 text-sm"
          >
            Save Gift Option
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
};

export default CartDrawer;