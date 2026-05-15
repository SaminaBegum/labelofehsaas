import { createContext, useContext, useState, ReactNode } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (item: WishlistItem) => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const addItem = (item: WishlistItem) => {
    setItems((prev) => (prev.find((i) => i.id === item.id) ? prev : [...prev, item]));
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const isWishlisted = (id: string) => items.some((i) => i.id === id);

  const toggleWishlist = (item: WishlistItem) => {
    if (isWishlisted(item.id)) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  const totalItems = items.length;

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isWishlisted, toggleWishlist, totalItems }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};
