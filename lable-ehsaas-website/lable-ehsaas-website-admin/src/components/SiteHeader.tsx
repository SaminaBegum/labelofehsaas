import { useState, useEffect, useRef } from "react";
import { Search, User, Heart, ShoppingBag, Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import logoImg from "@/assets/logo-ehsaas.png";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { db } from "@/services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.jpg";
import product6 from "@/assets/product-6.jpg";
import product7 from "@/assets/product-7.jpg";
import product8 from "@/assets/product-8.jpg";

// const searchableProducts = [
//   { id: "ivory-gold-anarkali", name: "Ivory Gold Anarkali", price: 8499, image: product1, category: "Ethnic Wear" },
//   { id: "blush-silk-kurta-set", name: "Blush Silk Kurta Set", price: 6299, image: product2, category: "Co-ord Sets" },
//   { id: "black-embroidered-gown", name: "Black Embroidered Gown", price: 12599, image: product3, category: "Party Wear" },
//   { id: "champagne-gold-coord", name: "Champagne Gold Co-ord", price: 7199, image: product4, category: "Co-ord Sets" },
//   { id: "ivory-lehenga-set", name: "Ivory Lehenga Set", price: 15999, image: product5, category: "Ethnic Wear" },
//   { id: "rose-embroidered-kurta", name: "Rose Embroidered Kurta", price: 5799, image: product6, category: "Dresses" },
//   { id: "wine-festive-gown", name: "Wine Festive Gown", price: 11299, image: product7, category: "Party Wear" },
//   { id: "beige-contemporary-set", name: "Beige Contemporary Set", price: 6999, image: product8, category: "Indo-Western" },
// ];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  // { label: "New Arrivals", href: "/new-arrivals" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { isAuthenticated, user, logout, setShowAuthModal } = useAuth();
const [products, setProducts] = useState<any[]>([]);
 const filteredResults =
  searchQuery.trim().length > 0
    ? products.filter((p) =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.type?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
    
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []);
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setSearchOpen(false); setSearchQuery(""); }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleProductClick = (id: string) => {
    setSearchOpen(false);
    setSearchQuery("");
    navigate(`/product/${id}`);
  };
console.log(products);
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">

      {/* ⭐ Updated Announcement Slider ⭐ */}
      <div className="relative bg-[#fed3e7] py-2.5 overflow-hidden">
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{
            el: ".announcement-pagination",
            clickable: true,
          }}
          loop={true}
        >
          <SwiperSlide>
            <p className="text-center font-body text-[11px] font-light tracking-[0.25em] uppercase text-[#111]">
              Free Shipping on Orders Above ₹999 · Easy Returns
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <p className="text-center font-body text-[11px] font-light tracking-[0.25em] uppercase text-[#111]">
              New Arrivals Every Week · Premium Quality Guaranteed
            </p>
          </SwiperSlide>
        </Swiper>

        {/* Pagination dots right side */}
        {/* <div className="announcement-pagination !w-auto absolute right-4 top-1/2 -translate-y-1/2"></div> */}
      </div>

      <div className="container mx-auto px-6 flex items-center justify-between">
        
        {/* Mobile Menu */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logoImg} alt="Ehsaas Label" className="h-24 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-body text-xs font-light tracking-[0.2em] uppercase text-foreground hover:text-pink-dark transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setSearchOpen(true)}
            className="text-foreground hover:text-pink-dark transition"
          >
            <Search size={18} strokeWidth={1.5} />
          </button>

          {isAuthenticated ? (
            <div className="relative group">
              <button className="text-foreground hover:text-pink-dark transition flex items-center gap-1">
                <User size={18} strokeWidth={1.5} />
                <span className="hidden md:inline text-[10px]">{user?.name}</span>
              </button>

              <div className="absolute right-0 top-full mt-2 bg-background border shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all min-w-[140px]">
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-xs hover:bg-secondary/30"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button onClick={() => setShowAuthModal(true)} className="text-foreground hover:text-pink-dark">
              <User size={18} strokeWidth={1.5} />
            </button>
          )}

          <Link to="/wishlist" className="relative hidden sm:block text-foreground hover:text-pink-dark">
            <Heart size={18} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-secondary text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative text-foreground hover:text-pink-dark">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-secondary text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[60]" />
      )}

      {searchOpen && (
        <div ref={searchContainerRef} className="fixed top-0 left-0 right-0 z-[70] bg-background shadow-2xl">
          <div className="container mx-auto px-6 py-6">

            <div className="flex items-center gap-4">
              <Search size={20} className="text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-lg outline-none"
                placeholder="Search for products..."
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
                <X size={20} />
              </button>
            </div>

            {/* Search results */}
            {searchQuery.trim().length > 0 && (
              <div className="mt-6 border-t pt-6 max-h-[60vh] overflow-y-auto">
                {filteredResults.length > 0 ? (
                  <>
                    <p className="text-[10px] uppercase mb-4">
                      {filteredResults.length} result{filteredResults.length !== 1 ? "s" : ""} found
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {filteredResults.map((product) => (
                        <button
                          key={product.id}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/30"
                          onClick={() => handleProductClick(product.id)}
                        >
                          <div className="w-16 h-20 rounded overflow-hidden">
                            <img src={product.image} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm">{product.name}</p>
                            <p className="text-[10px] uppercase mt-0.5">{product.category}</p>
                            <p className="text-sm mt-1">₹{product.price.toLocaleString()}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <Search size={32} className="mx-auto mb-4" />
                    <p>No products found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {mobileOpen && (
        <nav className="lg:hidden bg-background border-t px-6 py-8 space-y-5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="block text-xl"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {!isAuthenticated && (
            <button
              onClick={() => { setMobileOpen(false); setShowAuthModal(true); }}
              className="block text-xl text-pink-dark"
            >
              Sign In
            </button>
          )}
        </nav>
      )}

    </header>
  );
};

export default SiteHeader;