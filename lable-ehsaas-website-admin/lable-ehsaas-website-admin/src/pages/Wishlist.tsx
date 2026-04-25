import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const Wishlist = () => {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const moveToCart = (item: typeof items[0]) => {
    addItem({ id: item.id, name: item.name, price: item.price, originalPrice: item.originalPrice, size: "M", image: item.image });
    removeItem(item.id);
    toast.success(`${item.name} moved to cart!`);
  };

  return (
    <div className="page-fade-in">
      <SiteHeader />
      <main>
        <div className="bg-secondary py-rhythm-3">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-light italic text-foreground">Wishlist</h1>
          </div>
        </div>

        <div className="container mx-auto px-6 py-rhythm-4">
          {items.length === 0 ? (
            <div className="text-center py-rhythm-4 animate-fade-up">
              <Heart size={48} strokeWidth={1} className="mx-auto text-muted-foreground mb-6" />
              <p className="font-heading text-2xl font-light italic text-foreground mb-4">Your wishlist is empty</p>
              <Link to="/shop" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body text-xs font-light tracking-[0.2em] uppercase px-10 py-4">
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((item, i) => (
                <div key={item.id} className="group animate-fade-up hover:-translate-y-1 transition-all duration-500 hover:shadow-lg" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="relative aspect-[3/4] overflow-hidden bg-secondary/20 mb-4">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <button
                      onClick={() => { removeItem(item.id); toast("Removed from wishlist"); }}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                      <button
                        onClick={() => moveToCart(item)}
                        className="w-full bg-primary text-primary-foreground font-body text-[11px] font-light tracking-[0.2em] uppercase py-3.5 flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} /> Move to Cart
                      </button>
                    </div>
                  </div>
                  <h3 className="font-heading text-base font-light text-foreground mb-1 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm text-foreground">₹{item.price.toLocaleString()}</span>
                    {item.originalPrice && (
                      <span className="font-body text-xs text-muted-foreground line-through">₹{item.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Wishlist;
