// // // import { useState } from "react";
// // import { Heart, ShoppingBag } from "lucide-react";
// // import { Link } from "react-router-dom";
// // import { useCart } from "@/context/CartContext";
// // import { useWishlist } from "@/context/WishlistContext";
// // import { toast } from "sonner";
// // import React, { useState } from "react";
// // interface ProductCardProps {
// //   slug: string;
// //   name: string;
// //   price: number;
// //   originalPrice?: number;
// //   image: string;
// //   badge?: string;
// // }

// // const ProductCard = ({ slug, name, price, originalPrice, image, badge }: ProductCardProps) => {
// //   const [added, setAdded] = useState(false);
// //   const { addItem } = useCart();
// //   const { isWishlisted, toggleWishlist } = useWishlist();

// //   // Use slug as the product unique ID
// //   // const productId = slug;
// // const productId = slug || name.toLowerCase().replace(/\s+/g, "-");
// //   const wishlisted = isWishlisted(productId);

// //   const handleAddToCart = () => {
// //     addItem({ id: productId, name, price, originalPrice, size: "M", image });
// //     setAdded(true);
// //     toast.success(`${name} added to cart!`, { duration: 2000 });
// //     setTimeout(() => setAdded(false), 1500);
// //   };

// //   const handleWishlist = () => {
// //     toggleWishlist({ id: productId, name, price, originalPrice, image });
// //     toast(wishlisted ? "Removed from wishlist" : "Added to wishlist ♡", { duration: 1500 });
// //   };

// //   const discount = originalPrice
// //     ? Math.round(((originalPrice - price) / originalPrice) * 100)
// //     : 0;

// //   return (
// //     <div className={`group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${added ? "animate-scale-down" : ""}`}>
// //       {/* Open correct product details using slug */}
// //       <Link to={`/product/${productId}`} className="block relative aspect-[3/4] overflow-hidden bg-secondary/30">
// //         <img
// //           src={image}
// //           alt={name}
// //           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
// //           loading="lazy"
// //         />

// //         {badge && (
// //           <span className="absolute top-4 left-4 bg-primary text-primary-foreground font-body text-[10px] font-light tracking-[0.15em] uppercase px-3 py-1.5">
// //             {badge}
// //           </span>
// //         )}

// //         {discount > 0 && (
// //           <span className="absolute top-4 right-12 bg-secondary text-secondary-foreground font-body text-[10px] px-2 py-1">
// //             -{discount}%
// //           </span>
// //         )}

// //         {/* Wishlist Button */}
// //         <button
// //           onClick={(e) => { e.preventDefault(); handleWishlist(); }}
// //           className="absolute top-4 right-4 text-foreground/50 hover:text-pink-dark transition-colors duration-300"
// //           aria-label="Add to wishlist"
// //         >
// //           <Heart
// //             size={18}
// //             strokeWidth={1.5}
// //             fill={wishlisted ? "hsl(340, 90%, 92%)" : "none"}
// //             className={wishlisted ? "text-pink-dark" : ""}
// //           />
// //         </button>

// //         {/* Add to Cart Slide-up Button */}
// //         <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
// //           <button
// //             onClick={(e) => { e.preventDefault(); handleAddToCart(); }}
// //             className="w-full bg-[#fed3e7] text-primary-foreground font-body text-[11px] font-light tracking-[0.2em] uppercase py-3.5 hover:bg-[#f7c0d8] transition-colors duration-300 flex items-center justify-center gap-2"
// //           >
// //             <ShoppingBag size={14} />
// //             {added ? "✓ Added" : "Add to Cart"}
// //           </button>
// //         </div>

// //         {/* Green Check Animation */}
// //         {added && (
// //           <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-background/20">
// //             <svg width="48" height="48" viewBox="0 0 48 48" className="text-pink-dark">
// //               <path
// //                 d="M14 24 L22 32 L34 16"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 strokeWidth="1.5"
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeDasharray="24"
// //                 className="animate-draw-check"
// //               />
// //             </svg>
// //           </div>
// //         )}
// //       </Link>

// //       {/* Text Section */}
// //       <div className="pt-4 pb-2">
// //         <h3 className="font-heading text-base font-light text-foreground mb-1 line-clamp-1">
// //           {name}
// //         </h3>

// //         <div className="flex items-center gap-2">
// //           <span className="font-body text-sm font-normal text-foreground">
// //             ₹{price.toLocaleString()}
// //           </span>

// //           {originalPrice && (
// //             <span className="font-body text-xs text-muted-foreground line-through">
// //               ₹{originalPrice.toLocaleString()}
// //             </span>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductCard;
// import { Heart, ShoppingBag } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useCart } from "@/context/CartContext";
// import { useWishlist } from "@/context/WishlistContext";
// import { toast } from "sonner";
// import React, { useState } from "react";

// interface ProductCardProps {
//   slug: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   image: string;
//   badge?: string;
//   category?: string;
// }

// const ProductCard = ({
//   slug,
//   name,
//   price,
//   originalPrice,
//   image,
//   badge,
//   category,
// }: ProductCardProps) => {
//   const [added, setAdded] = useState(false);
//   const { addItem } = useCart();
//   const { isWishlisted, toggleWishlist } = useWishlist();

//   // const productId = slug || name.toLowerCase().replace(/\s+/g, "-");
//   const productId = slug;
//   const wishlisted = isWishlisted(productId);
// const [selectedSize, setSelectedSize] = useState<string | null>(null);
// const [showSize, setShowSize] = useState(false);
//   /* -------------------------------------------------
//      ✅ FULL PRODUCT OBJECT (IMPORTANT)
//   ------------------------------------------------- */
//   const product = {
//     id: productId,
//     slug: productId,
//     title: name,
//     name,
//     price,
//     originalPrice,
//     imageUrl: image,
//     images: [image],
//     badge,
//     category,
//     sizes: ["S", "M", "L", "XL"], // default (can come from Firebase later)
//     stock: 10,
//     description: "",
//   };

//  const handleAddToCart = () => {
//   if (!selectedSize) {
//     setShowSize(true);
//     toast.error("Please select size");
//     return;
//   }

//   addItem({
//     id: productId,
//     name,
//     price,
//     originalPrice,
//     size: selectedSize, // ✅ FIXED
//     image,
//   });

//   setAdded(true);
//   toast.success(`${name} added to cart!`, { duration: 2000 });
//   setTimeout(() => setAdded(false), 1500);

//   setSelectedSize(null);
//   setShowSize(false);
// };

//   const handleWishlist = () => {
//     toggleWishlist({
//       id: productId,
//       name,
//       price,
//       originalPrice,
//       image,
//     });

//     toast(wishlisted ? "Removed from wishlist" : "Added to wishlist ♡", {
//       duration: 1500,
//     });
//   };

//   const discount = originalPrice
//     ? Math.round(((originalPrice - price) / originalPrice) * 100)
//     : 0;

//   return (
//     <div
//       className={`group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
//         added ? "animate-scale-down" : ""
//       }`}
//     >
//       {/* ✅ PASS FULL PRODUCT HERE */}
//       <Link
//         to={`/product/${productId}`}
//         className="block relative aspect-[3/4] overflow-hidden bg-secondary/30"
//       >
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//           loading="lazy"
//         />

//         {badge && (
//           <span className="absolute top-4 left-4 bg-primary text-primary-foreground font-body text-[10px] tracking-[0.15em] uppercase px-3 py-1.5">
//             {badge}
//           </span>
//         )}

//         {discount > 0 && (
//           <span className="absolute top-4 right-12 bg-secondary text-secondary-foreground text-[10px] px-2 py-1">
//             -{discount}%
//           </span>
//         )}

//         {/* Wishlist */}
//       <button
//   onClick={(e) => {
//     e.preventDefault();
//     handleWishlist();
//   }}
//   className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm hover:scale-105 transition"
// >
//   <Heart
//     size={16}
//     fill={wishlisted ? "hsl(340, 90%, 92%)" : "none"}
//     className={wishlisted ? "text-pink-dark" : "text-foreground/60"}
//   />
// </button>

//       {showSize && (
//   <div className="absolute bottom-14 left-0 right-0 bg-white p-3 z-10 shadow-md">
//     <p className="text-xs mb-2 text-center">Select Size</p>

//     <div className="flex justify-center gap-2">
//       {product.sizes.map((size) => (
//         <button
//           key={size}
//           onClick={(e) => {
//             e.preventDefault();
//             setSelectedSize(size);
//           }}
//           className={`px-2 py-1 border text-xs ${
//             selectedSize === size
//               ? "bg-black text-white"
//               : "bg-white"
//           }`}
//         >
//           {size}
//         </button>
//       ))}
//     </div>

//     {/* Confirm Button */}
//     <button
//       onClick={(e) => {
//         e.preventDefault();
//         handleAddToCart();
//       }}
//       className="mt-3 w-full bg-black text-white py-2 text-sm"
//     >
//       Confirm
//     </button>
//   </div>
// )}  {/* Add to Cart */}
//         <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               handleAddToCart();
//             }}
//             className="w-full bg-[#fed3e7] py-3 flex items-center justify-center gap-2"
//           >
//             <ShoppingBag size={14} />
//             {added ? "✓ Added" : "Add to Cart"}
//           </button>
//         </div>

//         {/* Animation */}
//         {added && (
//           <div className="absolute inset-0 flex items-center justify-center bg-background/20">
//             ✓
//           </div>
//         )}
//       </Link>

//       {/* TEXT */}
//       <div className="pt-4 pb-2">
//         <h3 className="text-base mb-1 line-clamp-1">{name}</h3>

//         <div className="flex gap-2">
//           <span>₹{price.toLocaleString()}</span>

//           {originalPrice && (
//             <span className="line-through text-sm text-gray-400">
//               ₹{originalPrice.toLocaleString()}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import React, { useState } from "react";

interface ProductCardProps {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  category?: string;
}

const ProductCard = ({
  slug,
  name,
  price,
  originalPrice,
  image,
  badge,
  category,
}: ProductCardProps) => {
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSize, setShowSize] = useState(false);

  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const productId = slug;
  const wishlisted = isWishlisted(productId);

  const sizes = ["S", "M", "L", "XL" , "XXL", "2XL", "3XL", "4XL", "5XL"];

  /* -------------------------
      ADD TO CART
  -------------------------- */
  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSize(true);
      toast.error("Please select a size!");
      return;
    }

    addItem({
      id: productId,
      name,
      price,
      originalPrice,
      size: selectedSize,
      image,
    });

    setAdded(true);
    toast.success(`${name} added to cart!`, { duration: 1500 });
    setTimeout(() => setAdded(false), 1200);

    setShowSize(false);
    setSelectedSize(null);
  };

  /* -------------------------
      WISHLIST
  -------------------------- */
  const handleWishlist = () => {
    toggleWishlist({ id: productId, name, price, originalPrice, image });

    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist ♡", {
      duration: 1200,
    });
  };

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    // <div
    //   className={`group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg ${
    //     added ? "animate-scale-down" : ""
    //   }`}
    // >
    //   <Link
    //     to={`/product/${productId}`}
    //     className="block relative aspect-[3/4] overflow-hidden bg-secondary/30"
    //   >
    //     {/* PRODUCT IMAGE */}
    //     <img
    //       src={image}
    //       alt={name}
    //       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    //       loading="lazy"
    //     />

    //     {/* BADGE */}
    //     {badge && (
    //       <span className="absolute top-4 left-4 bg-primary text-white text-[10px] px-3 py-1.5 uppercase tracking-[0.15em]">
    //         {badge}
    //       </span>
    //     )}

    //     {/* DISCOUNT TAG */}
    //     {discount > 0 && (
    //       <span className="absolute top-4 right-12 bg-secondary text-black text-[10px] px-2 py-1">
    //         -{discount}%
    //       </span>
    //     )}

    //     {/* ❤️ WISHLIST BUTTON */}
    //     <button
    //       onClick={(e) => {
    //         e.preventDefault();
    //         handleWishlist();
    //       }}
    //       className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-sm hover:scale-105 transition"
    //     >
    //       <Heart
    //         size={16}
    //         fill={wishlisted ? "hsl(340, 90%, 92%)" : "none"}
    //         className={wishlisted ? "text-pink-dark" : "text-foreground/60"}
    //       />
    //     </button>

    //     {/* SIZE SELECTION POPUP */}
    //     {showSize && (
    //       <div className="absolute bottom-14 left-0 right-0 bg-white p-3 z-10 shadow-md">
    //         <p className="text-xs mb-2 text-center">Select Size</p>

    //         <div className="flex justify-center gap-2">
    //           {sizes.map((size) => (
    //             <button
    //               key={size}
    //               onClick={(e) => {
    //                 e.preventDefault();
    //                 setSelectedSize(size);
    //               }}
    //               className={`px-3 py-1 border text-xs rounded ${
    //                 selectedSize === size
    //                   ? "bg-black text-white"
    //                   : "bg-white"
    //               }`}
    //             >
    //               {size}
    //             </button>
    //           ))}
    //         </div>

    //         <button
    //           onClick={(e) => {
    //             e.preventDefault();
    //             handleAddToCart();
    //           }}
    //           className="mt-3 w-full bg-black text-white py-2 text-sm rounded"
    //         >
    //           Confirm
    //         </button>
    //       </div>
    //     )}

    //     {/* ADD TO CART BUTTON */}
    //     <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
    //       <button
    //         onClick={(e) => {
    //           e.preventDefault();
    //           handleAddToCart();
    //         }}
    //         className="w-full bg-[#fed3e7] py-3 flex items-center justify-center gap-2"
    //       >
    //         <ShoppingBag size={14} />
    //         {added ? "✓ Added" : "Add to Cart"}
    //       </button>
    //     </div>

    //     {/* CHECK MARK ANIMATION */}
    //     {added && (
    //       <div className="absolute inset-0 flex items-center justify-center bg-background/20">
    //         ✓
    //       </div>
    //     )}
    //   </Link>

    //   {/* PRODUCT TEXT */}
    //   <div className="pt-4 pb-2">
    //     <h3 className="text-base mb-1 line-clamp-1">{name}</h3>

    //     <div className="flex gap-2 items-center">
    //       <span>₹{price.toLocaleString()}</span>

    //       {originalPrice && (
    //         <span className="line-through text-sm text-muted-foreground">
    //           ₹{originalPrice.toLocaleString()}
    //         </span>
    //       )}
    //     </div>
    //   </div>
    // </div>
    <div
  className={`group transition-all duration-500 hover:-translate-y-1 ${
    added ? "animate-scale-down" : ""
  }`}
>
  <Link
    to={`/product/${productId}`}
    className="block relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-100"
  >
    {/* IMAGE */}
    <img
      src={image}
      alt={name}
      className="w-full h-full object-cover transition duration-700 ease-out group-hover:scale-105"
      loading="lazy"
    />

    {/* SOFT OVERLAY (premium effect) */}
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition duration-500" />

    {/* BADGE */}
    {badge && (
      <span className="absolute top-3 left-3 bg-black text-white text-[10px] px-2 py-1 rounded-sm tracking-wide">
        {badge}
      </span>
    )}

    {/* DISCOUNT */}
    {discount > 0 && (
      <span className="absolute top-3 right-12 bg-white text-black text-[10px] px-2 py-1 rounded shadow-sm">
        -{discount}%
      </span>
    )}

    {/* ❤️ WISHLIST */}
    <button
      onClick={(e) => {
        e.preventDefault();
        handleWishlist();
      }}
      className="absolute top-3 right-3 bg-white/90 backdrop-blur rounded-full p-2 shadow-sm hover:scale-110 transition"
    >
      <Heart
        size={16}
        fill={wishlisted ? "hsl(340, 90%, 92%)" : "none"}
        className={wishlisted ? "text-pink-500" : "text-gray-600"}
      />
    </button>

    {/* SIZE SELECT */}
    {showSize && (
      <div className="absolute bottom-16 left-2 right-2 bg-white rounded-lg p-3 shadow-xl z-10 animate-fade-in">
        <p className="text-xs mb-2 text-center text-gray-600">
          Select Size
        </p>

        <div className="flex justify-center gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={(e) => {
                e.preventDefault();
                setSelectedSize(size);
              }}
              className={`px-3 py-1 text-xs rounded border transition ${
                selectedSize === size
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
          className="mt-3 w-full bg-black text-white py-2 text-sm rounded-md hover:bg-gray-900 transition"
        >
          Confirm
        </button>
      </div>
    )}

    {/* ADD TO CART */}
    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-all duration-500">
      <button
        onClick={(e) => {
          e.preventDefault();
          handleAddToCart();
        }}
        className="w-full bg-secondary backdrop-blur border-t py-3 flex items-center justify-center gap-2 text-sm font-medium hover:bg-secondary transition"
      >
        <ShoppingBag size={14} />
        {added ? "✓ Added" : "Add to Cart"}
      </button>
    </div>

    {/* ADDED OVERLAY */}
    {added && (
      <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur text-lg font-semibold">
        ✓
      </div>
    )}
  </Link>

  {/* TEXT */}
  <div className="pt-3 pb-2 px-1">
    <h3 className="text-sm md:text-base font-medium text-gray-900 line-clamp-1 group-hover:text-black transition">
      {name}
    </h3>

    <div className="flex items-center gap-2 mt-1">
      <span className="text-sm font-semibold text-black">
        ₹{price.toLocaleString()}
      </span>

      {originalPrice && (
        <span className="text-xs text-gray-400 line-through">
          ₹{originalPrice.toLocaleString()}
        </span>
      )}
    </div>
  </div>
</div>
  );
};

export default ProductCard;