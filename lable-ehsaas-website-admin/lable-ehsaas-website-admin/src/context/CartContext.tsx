// import { createContext, useContext, useState, ReactNode } from "react";

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   size: string;
//   quantity: number;
//   image: string;
// }

// interface CartContextType {
//   items: CartItem[];
//   addItem: (item: Omit<CartItem, "quantity">) => void;
//   removeItem: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
//   totalItems: number;
//   subtotal: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [items, setItems] = useState<CartItem[]>([]);

//   const addItem = (newItem: Omit<CartItem, "quantity">) => {
//     setItems((prev) => {
//       const existing = prev.find((i) => i.id === newItem.id && i.size === newItem.size);
//       if (existing) {
//         return prev.map((i) =>
//           i.id === newItem.id && i.size === newItem.size
//             ? { ...i, quantity: i.quantity + 1 }
//             : i
//         );
//       }
//       return [...prev, { ...newItem, quantity: 1 }];
//     });
//   };

//   const removeItem = (id: string) => {
//     setItems((prev) => prev.filter((i) => i.id !== id));
//   };

//   const updateQuantity = (id: string, quantity: number) => {
//     if (quantity < 1) return;
//     setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
//   };

//   const clearCart = () => setItems([]);

//   const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
//   const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

//   return (
//     <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within CartProvider");
//   return context;
// };
// import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   size: string;
//   quantity: number;
//   image: string;
// }

// interface CartContextType {
//   items: CartItem[];
//   addItem: (item: Omit<CartItem, "quantity">) => void;
//   removeItem: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
//   totalItems: number;
//   subtotal: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   // 🔥 Load cart from localStorage on first render
//   const [items, setItems] = useState<CartItem[]>(() => {
//     const saved = localStorage.getItem("cart");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // 🔥 Save cart to localStorage whenever items change
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(items));
//   }, [items]);

//   const addItem = (newItem: Omit<CartItem, "quantity">) => {
//     setItems((prev) => {
//       const existing = prev.find(
//         (i) => i.id === newItem.id && i.size === newItem.size
//       );

//       if (existing) {
//         return prev.map((i) =>
//           i.id === newItem.id && i.size === newItem.size
//             ? { ...i, quantity: i.quantity + 1 }
//             : i
//         );
//       }

//       return [...prev, { ...newItem, quantity: 1 }];
//     });
//   };

//   const removeItem = (id: string) => {
//     setItems((prev) => prev.filter((i) => i.id !== id));
//   };

//   const updateQuantity = (id: string, quantity: number) => {
//     if (quantity < 1) return;
//     setItems((prev) =>
//       prev.map((i) => (i.id === id ? { ...i, quantity } : i))
//     );
//   };

//   const clearCart = () => setItems([]);

//   const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
//   const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addItem,
//         removeItem,
//         updateQuantity,
//         clearCart,
//         totalItems,
//         subtotal,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within CartProvider");
//   return context;
// };
// import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   size: string;
//   quantity: number;
//   image: string;
// }

// interface CartContextType {
//   items: CartItem[];
//   addItem: (item: Omit<CartItem, "quantity">) => void;
//   removeItem: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;

//   // ⭐ NEW
//   giftPackaging: boolean;
//   giftNote: string;
//   setGiftPackaging: (note: string) => void;
//   removeGiftPackaging: () => void;
 
//   setGiftNote: (note: string) => void;   // ⭐ ADD THIS
 
//   totalItems: number;
//   subtotal: number;
//   giftPrice: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {

//   // ✅ LOAD FROM LOCAL STORAGE
//   const [items, setItems] = useState<CartItem[]>(() => {
//     const saved = localStorage.getItem("cart");
//     return saved ? JSON.parse(saved) : [];
//   });

//   const [giftPackaging, setGiftPackagingState] = useState(() => {
//     return localStorage.getItem("giftPackaging") === "true";
//   });

//   const [giftNote, setGiftNote] = useState(() => {
//     return localStorage.getItem("giftNote") || "";
//   });

//   const giftPrice = 499;

//   // ✅ SAVE TO LOCAL STORAGE (Fix refresh issue)
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(items));
//   }, [items]);

//   useEffect(() => {
//     localStorage.setItem("giftPackaging", giftPackaging.toString());
//     localStorage.setItem("giftNote", giftNote);
//   }, [giftPackaging, giftNote]);

//   // ---------------- CART FUNCTIONS ----------------

//   const addItem = (newItem: Omit<CartItem, "quantity">) => {
//     setItems((prev) => {
//       const existing = prev.find(
//         (i) => i.id === newItem.id && i.size === newItem.size
//       );
//       if (existing) {
//         return prev.map((i) =>
//           i.id === newItem.id && i.size === newItem.size
//             ? { ...i, quantity: i.quantity + 1 }
//             : i
//         );
//       }
//       return [...prev, { ...newItem, quantity: 1 }];
//     });
//   };

//   const removeItem = (id: string) => {
//     setItems((prev) => prev.filter((i) => i.id !== id));
//   };

//   const updateQuantity = (id: string, quantity: number) => {
//     if (quantity < 1) return;
//     setItems((prev) =>
//       prev.map((i) => (i.id === id ? { ...i, quantity } : i))
//     );
//   };

//   const clearCart = () => setItems([]);

//   // ---------------- GIFT ----------------

//   const setGiftPackaging = (note: string) => {
//     setGiftPackagingState(true);
//     setGiftNote(note);
//   };

//   const removeGiftPackaging = () => {
//     setGiftPackagingState(false);
//     setGiftNote("");
//   };

//   // ---------------- TOTAL ----------------

//   const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

//   const itemsTotal = items.reduce(
//     (sum, i) => sum + i.price * i.quantity,
//     0
//   );

//   const subtotal = itemsTotal + (giftPackaging ? giftPrice : 0);

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addItem,
//         removeItem,
//         updateQuantity,
//         clearCart,

//         giftPackaging,
// giftNote,
// setGiftPackaging,
// setGiftNote,
// removeGiftPackaging,
// giftPrice,

//         totalItems,
//         subtotal,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within CartProvider");
//   return context;
// };
// import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   originalPrice?: number;
//   size: string;
//   quantity: number;
//   image: string;
// }

// interface CartContextType {
//   items: CartItem[];

//   addItem: (item: Omit<CartItem, "quantity">) => void;
//   removeItem: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;

//   // ⭐ CART DRAWER
//   isCartOpen: boolean;
//   openCart: () => void;
//   closeCart: () => void;

//   // ⭐ GIFT
//   giftPackaging: boolean;
//   giftNote: string;
//   setGiftPackaging: (note: string) => void;
//   removeGiftPackaging: () => void;
//   setGiftNote: (note: string) => void;

//   // ⭐ TOTALS
//   totalItems: number;
//   subtotal: number;
//   giftPrice: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider = ({ children }: { children: ReactNode }) => {

//   // ---------------- CART ----------------

//   const [items, setItems] = useState<CartItem[]>(() => {
//     const saved = localStorage.getItem("cart");
//     return saved ? JSON.parse(saved) : [];
//   });

//   // ⭐ DRAWER STATE
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const openCart = () => setIsCartOpen(true);
//   const closeCart = () => setIsCartOpen(false);

//   // ---------------- GIFT ----------------

//   const [giftPackaging, setGiftPackagingState] = useState(() => {
//     return localStorage.getItem("giftPackaging") === "true";
//   });

//   const [giftNote, setGiftNote] = useState(() => {
//     return localStorage.getItem("giftNote") || "";
//   });

//   const giftPrice = 499;

//   // ---------------- LOCAL STORAGE ----------------

//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(items));
//   }, [items]);

//   useEffect(() => {
//     localStorage.setItem("giftPackaging", giftPackaging.toString());
//     localStorage.setItem("giftNote", giftNote);
//   }, [giftPackaging, giftNote]);

//   // ---------------- CART FUNCTIONS ----------------

//   const addItem = (newItem: Omit<CartItem, "quantity">) => {
//     setItems((prev) => {
//       const existing = prev.find(
//         (i) => i.id === newItem.id && i.size === newItem.size
//       );

//       if (existing) {
//         return prev.map((i) =>
//           i.id === newItem.id && i.size === newItem.size
//             ? { ...i, quantity: i.quantity + 1 }
//             : i
//         );
//       }

//       return [...prev, { ...newItem, quantity: 1 }];
//     });
//   };

//   const removeItem = (id: string) => {
//     setItems((prev) => prev.filter((i) => i.id !== id));
//   };

//   const updateQuantity = (id: string, quantity: number) => {
//     if (quantity < 1) return;

//     setItems((prev) =>
//       prev.map((i) =>
//         i.id === id ? { ...i, quantity } : i
//       )
//     );
//   };

//   const clearCart = () => setItems([]);

//   // ---------------- GIFT FUNCTIONS ----------------

//   const setGiftPackaging = (note: string) => {
//     setGiftPackagingState(true);
//     setGiftNote(note);
//   };

//   const removeGiftPackaging = () => {
//     setGiftPackagingState(false);
//     setGiftNote("");
//   };

//   // ---------------- TOTALS ----------------

//   const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

//   const itemsTotal = items.reduce(
//     (sum, i) => sum + i.price * i.quantity,
//     0
//   );

//   const subtotal = itemsTotal + (giftPackaging ? giftPrice : 0);

//   // ---------------- PROVIDER ----------------

//   return (
//     <CartContext.Provider
//       value={{
//         items,
//         addItem,
//         removeItem,
//         updateQuantity,
//         clearCart,

//         // ⭐ CART DRAWER
//         isCartOpen,
//         openCart,
//         closeCart,

//         // ⭐ GIFT
//         giftPackaging,
//         giftNote,
//         setGiftPackaging,
//         setGiftNote,
//         removeGiftPackaging,
//         giftPrice,

//         // ⭐ TOTALS
//         totalItems,
//         subtotal,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within CartProvider");
//   }
//   return context;
// };
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  size: string;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];

  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;

  // ⭐ CART DRAWER
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // ⭐ GIFT
  giftPackaging: boolean;
  giftNote: string;
  setGiftPackaging: (note: string) => void;
  removeGiftPackaging: () => void;
  setGiftNote: (note: string) => void;

  // ⭐ TOTALS
  totalItems: number;
  subtotal: number;
  giftPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {

  // ---------------- CART ----------------

  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ⭐ DRAWER STATE
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // ---------------- GIFT ----------------

  const [giftPackaging, setGiftPackagingState] = useState(() => {
    return localStorage.getItem("giftPackaging") === "true";
  });

  const [giftNote, setGiftNote] = useState(() => {
    return localStorage.getItem("giftNote") || "";
  });

  const giftPrice = 499;

  // ---------------- LOCAL STORAGE ----------------

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("giftPackaging", giftPackaging.toString());
    localStorage.setItem("giftNote", giftNote);
  }, [giftPackaging, giftNote]);

  // ---------------- CART FUNCTIONS ----------------

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === newItem.id && i.size === newItem.size
      );

      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && i.size === newItem.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...newItem, quantity: 1 }];
    });

    // 🔥 AUTO OPEN CART DRAWER
    openCart();
  };

  // ✅ FIXED (id + size)
  const removeItem = (id: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.id === id && i.size === size))
    );
  };

  // ✅ FIXED (id + size)
  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) return;

    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  // ---------------- GIFT FUNCTIONS ----------------

  const setGiftPackaging = (note: string) => {
    setGiftPackagingState(true);
    setGiftNote(note);
  };

  const removeGiftPackaging = () => {
    setGiftPackagingState(false);
    setGiftNote("");
  };

  // ---------------- TOTALS ----------------

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const itemsTotal = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const subtotal = itemsTotal + (giftPackaging ? giftPrice : 0);

  // ---------------- PROVIDER ----------------

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,

        // ⭐ CART DRAWER
        isCartOpen,
        openCart,
        closeCart,

        // ⭐ GIFT
        giftPackaging,
        giftNote,
        setGiftPackaging,
        setGiftNote,
        removeGiftPackaging,
        giftPrice,

        // ⭐ TOTALS
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};