
import { useState, useEffect } from "react";
import {
  Heart,
  Minus,
  Plus,
  ArrowRight,
  Star,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import { useRef } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom";
import { db } from "@/lib/firebase";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ProductReviews from "@/components/ProductReviews";
import {
  Shirt,
  Sparkles,
  Palette,
  Calendar,
  Ruler,
  Maximize,
} from "lucide-react";


import { getProducts } from "@/services/productService";
import ProductCard from "@/components/ProductCard";
const ProductDetails = () => {
  const { slug } = useParams();
  console.log("slug:", slug);
  const location = useLocation();
  const { addItem, openCart } = useCart();
const [relatedProducts, setRelatedProducts] = useState([]);
const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  // const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
const [selectedColor, setSelectedColor] = useState<string | null>(null);
const [selectedSize, setSelectedSize] = useState<string | null>(null);
  // ✅ SAFE STATE (no crash)
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
const [zoomStyle, setZoomStyle] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);
  // const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] =
    useState<string | null>("description");
const scrollThumbnails = (direction: "left" | "right") => {
  if (!thumbRef.current) return;

  const scrollAmount = 120;

  thumbRef.current.scrollBy({
    left: direction === "left" ? -scrollAmount : scrollAmount,
    behavior: "smooth",
  });
};

  /* -------------------------------------------------
     ✅ FETCH LOGIC (FIXED)
  ------------------------------------------------- */
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // ✅ 1. Get from state (FAST)
        const stateProduct = location?.state?.product;

        if (stateProduct) {
          setProduct(stateProduct);
          return;
        }

        // ✅ 2. Fetch from Firebase
        const data = await getProducts();

        const found = data.find(
          (item: any) =>
            (item.slug ||
              item.title?.toLowerCase().replace(/\s+/g, "-")) === slug
        );

        setProduct(found || null);

      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);
  // ✅ SECOND useEffect → Related products (PASTE HERE)
 
  console.log("PRODUCT:", product);
useEffect(() => {
  if (product?.variants?.length > 0) {
    setSelectedColor(product.variants[0].color);
  }
}, [product]);
useEffect(() => {
  setSelectedImage(0);
}, [selectedColor]);
useEffect(() => {
  const fetchAllProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);

      if (product) {
        const related = data.filter(
          (item: any) =>
            item.category === product.category &&
            item.id !== product.id
        );

        setRelatedProducts(related.slice(0, 4));
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchAllProducts();
}, [product]);

  /* -------------------------------------------------
     ✅ SAFE UI GUARDS
  ------------------------------------------------- */
  if (loading)
    return <div className="text-center py-20">Loading...</div>;

  if (!product)
    return <div className="text-center py-20">Product not found</div>;
  // ✅ NORMALIZE VARIANTS (PUT HERE)
// ✅ SAFE VARIANTS (NO CRASH EVER)
const variants =
  Array.isArray(product?.variants) && product.variants.length > 0
    ? product.variants
    : [
        {
          color: "Default",
          images: product?.imageUrl ? [product.imageUrl] : [],
          sizes: product?.sizes || [],
        },
      ];

  /* -------------------------------------------------
     ✅ SAFE IDS
  ------------------------------------------------- */
  const productId =
    product.id ||
    product.slug ||
    product.title?.toLowerCase().replace(/\s+/g, "-");

  const wishlisted = isWishlisted(productId);

  /* -------------------------------------------------
     ACTIONS
  ------------------------------------------------- */
  
  const handleAddToCart = () => {
    if (!selectedSize) return toast.error("Please select a size");

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: productId,
        name: product.title || product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        size: selectedSize,
       image:
  variants?.find(v => v.color === selectedColor)?.images?.[0] ||
 variants?.[0]?.images?.[0]
      });
    }
 openCart(); // ✅ THIS OPENS SIDEBAR
    toast.success(`${product.title || product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!selectedSize) return toast.error("Please select a size");

    addItem({
      id: productId,
      name: product.title || product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      size: selectedSize,
      image: product.imageUrl || product.images?.[0],
    });

    navigate("/checkout");
  };
 // ✅ FIXED
  const handleWishlist = () => {
    toggleWishlist({
      id: productId,
      name: product.title || product.name,
      price: product.price,
      originalPrice: product.originalPrice,
     image:
 variants?.find(v => v.color === selectedColor)?.images?.[0] ||
  variants?.[0]?.images?.[0]
    });

    toast(
      wishlisted
        ? "Removed from wishlist"
        : "Added to wishlist ♡"
    );
  };

  /* -------------------------------------------------
  
     ✅ IMAGE SAFE FALLBACK
  ------------------------------------------------- */
 // Get images based on selected color

const getTime = (date: any) => {
  if (!date) return 0;
  if (date.seconds) return date.seconds * 1000;
  return new Date(date).getTime();
};

// fallback to first variant
// ✅ SAFE SELECTED VARIANT
// const selectedVariant =
//   variants.find((v: any) => v?.color === selectedColor) ||
//   variants[0] || { images: [], sizes: [] };
const selectedVariant =
  variants.find(
    (v) =>
      v?.color?.toLowerCase() === selectedColor?.toLowerCase()
  ) || variants[0];
// ✅ SAFE IMAGES
// const images =
//   Array.isArray(selectedVariant?.images) && selectedVariant.images.length > 0
//     ? selectedVariant.images
//     : [];
const images =
  selectedVariant?.images?.length > 0
    ? selectedVariant.images
    : product?.imageUrl
    ? [product.imageUrl]
    : [];
  /* -------------------------------------------------
     UI (UNCHANGED)
  ------------------------------------------------- */
  const handleMouseMove = (e: any) => {
  const { left, top, width, height } = e.target.getBoundingClientRect();

  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;

  setZoomStyle({
    transformOrigin: `${x}% ${y}%`,
    transform: "scale(2)",
  });
};
console.log("ALL PRODUCTS:", products);
console.log("CURRENT PRODUCT:", product);
console.log("RELATED:", relatedProducts);

const handleMouseLeave = () => {
  setZoomStyle({ transform: "scale(1)" });
};
  return (
    <div className="page-fade-in">
      <SiteHeader />

      <main>
        <div className="container mx-auto px-6 py-10">

          {/* BREADCRUMB */}
          <nav className="mb-8 text-sm text-gray-500">
            <Link to="/">Home</Link> /{" "}
            <Link to="/shop">Shop</Link> /{" "}
            <span className="text-black">
              {product.title || product.name}
            </span>
          </nav>

          <div className="grid md:grid-cols-2 gap-10">

            {/* LEFT - IMAGE */}
         <div>
  {/* MAIN IMAGE */}
  <div className="aspect-[3/2] overflow-hidden mb-4 border rounded-lg">
   <img
  key={selectedColor + selectedImage}   // 🔥 FORCE RE-RENDER
  src={images?.[selectedImage] || "/placeholder.png"}
  onMouseMove={handleMouseMove}
  onMouseLeave={handleMouseLeave}
  style={zoomStyle}
  className="w-full h-full object-cover transition-transform duration-200"
/>
  </div>

  {/* THUMBNAIL SLIDER */}
  <div className="relative flex items-center">

    {/* LEFT ARROW */}
    <button
      onClick={() => scrollThumbnails("left")}
      className="absolute left-0 z-10 bg-white shadow p-2 rounded-full"
    >
      ‹
    </button>

    {/* THUMBNAILS */}
    <div
      ref={thumbRef}
      className="flex gap-3 overflow-x-auto scroll-smooth px-8 scrollbar-hide"
    >
      {images.map((img: string, i: number) => (
        <img
          key={i}
          src={img}
          onClick={() => setSelectedImage(i)}
          className={`w-20 h-20 object-cover cursor-pointer rounded-md border-2 transition-all duration-200
            ${
              selectedImage === i
                ? "border-black scale-105 shadow-md"
                : "border-gray-200 opacity-70 hover:opacity-100"
            }`}
        />
      ))}
    </div>

    {/* RIGHT ARROW */}
    <button
      onClick={() => scrollThumbnails("right")}
      className="absolute right-0 z-10 bg-white shadow p-2 rounded-full"
    >
      ›
    </button>
  </div>
</div>

            {/* RIGHT - DETAILS */}
            <div>

              <h1 className="text-3xl font-bold">
                {product.title || product.name}
              </h1>

              <p className="text-gray-500 mt-2">
                {product.category}
              </p>

              {/* <div className="flex items-center gap-2 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} />
                ))}
                <span className="text-sm text-gray-500">
                  ({product.reviewCount || 120} reviews)
                </span>
              </div> */}

              <div className="mt-4 flex items-center gap-3">
                <span className="text-2xl font-semibold">
                  ₹{product.price}
                </span>

                {product.originalPrice && (
                  <span className="line-through text-gray-400">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
{/* COLOR SELECTION */}
<div className="mt-6">
  <p className="font-semibold mb-2">
    Color: {selectedColor}
  </p>

  <div className="flex gap-3 items-center">
    {variants?.map((variant: any, index: number) => {
      if (!variant?.color) return null;

      return (
        <div
          key={index}
          onClick={() => {
            setSelectedColor(variant.color);
            setSelectedImage(0);
          }}
          title={variant.color}
          className={`w-8 h-8 rounded-full cursor-pointer border transition-all
            ${
              selectedColor === variant.color
                ? "border-black ring-2 ring-black"
                : "border-gray-300"
            }`}
          style={{
            backgroundColor: variant.color.toLowerCase(),
          }}
        />
      );
    })}
  </div>
</div>
              {/* <p className="mt-4 text-gray-600">
                {product.description}
              </p> */}
{/* FABRIC DISPLAY */}
{product.fabric && (
  <div className="mt-4">
    <p className="font-semibold mb-1">
      Fabric:
    </p>

    <div className="inline-block px-3 py-1 border rounded-md bg-gray-100 text-sm">
      {product.fabric}
    </div>
  </div>
)}
              {/* SIZE */}
              <div className="mt-6">
                <p className="font-semibold mb-2">
                  Select Size:
                </p>

               <div className="flex gap-2">
  {(selectedVariant?.sizes || []).map((s: any, i: number) => {
    const sizeValue = typeof s === "string" ? s : s?.size;

    if (!sizeValue) return null; // extra safety

    return (
      <button
        key={i}
        onClick={() => setSelectedSize(sizeValue)}
        className={`px-4 py-2 border ${
          selectedSize === sizeValue
            ? "bg-black text-white"
            : "hover:bg-black hover:text-white"
        }`}
      >
        {sizeValue}
      </button>
    );
  })}
</div>
              </div>

              {/* QUANTITY */}
              <div className="mt-6 flex items-center gap-4">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus />
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>
                  <Plus />
                </button>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white px-6 py-3 flex items-center gap-2"
                >
                  <ShoppingBag size={16} />
                  Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="bg-gray-200 px-6 py-3"
                >
                  Buy Now
                </button>

                <button onClick={handleWishlist}>
                  <Heart fill={wishlisted ? "red" : "none"} />
                </button>
              </div>
              {/* DESCRIPTION ACCORDION */}
<div className="mt-8 border-t pt-4">

  {/* HEADER */}
  <button
    onClick={() =>
      setOpenAccordion(
        openAccordion === "description" ? null : "description"
      )
    }
    className="w-full flex justify-between items-center py-3 text-left"
  >
    <span className="font-semibold text-lg">
      Product Details
    </span>
    <ChevronDown
      className={`transition-transform ${
        openAccordion === "description" ? "rotate-180" : ""
      }`}
    />
  </button>

  {/* CONTENT */}
 {openAccordion === "description" && (
  <div className="pb-6 mt-4">

    {/* DESCRIPTION TEXT */}
    {product.description && (
      <p className="text-gray-600 leading-relaxed mb-6">
        {product.description}
      </p>
    )}

    {/* DIVIDER */}
    <div className="border-t mb-6"></div>

    {/* DETAILS GRID */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

      {/* FABRIC */}
      {product.fabric && (
        <div className="flex items-start gap-3">
          <Shirt size={18} className="text-gray-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">Fabric</p>
            <p className="text-gray-600">{product.fabric}</p>
          </div>
        </div>
      )}

      {/* WORK */}
      {product.work && (
        <div className="flex items-start gap-3">
          <Sparkles size={18} className="text-gray-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">Work / Embroidery</p>
            <p className="text-gray-600">{product.work}</p>
          </div>
        </div>
      )}

      {/* COLOR */}
      {product.color && (
        <div className="flex items-start gap-3">
          <Palette size={18} className="text-gray-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">Color</p>
            <p className="text-gray-600">{product.color}</p>
          </div>
        </div>
      )}

      {/* OCCASION */}
      {product.occasion && (
        <div className="flex items-start gap-3">
          <Calendar size={18} className="text-gray-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">Occasion</p>
            <p className="text-gray-600">{product.occasion}</p>
          </div>
        </div>
      )}

      {/* FIT */}
      {product.fit && (
        <div className="flex items-start gap-3">
          <Ruler size={18} className="text-gray-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">Fit Type</p>
            <p className="text-gray-600">{product.fit}</p>
          </div>
        </div>
      )}

      {/* LENGTH */}
      {product.length && (
        <div className="flex items-start gap-3">
          <Maximize size={18} className="text-gray-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">Length</p>
            <p className="text-gray-600">{product.length}</p>
          </div>
        </div>
      )}

    </div>
  </div>
)}
</div>
            </div>
          </div>

          {/* REVIEWS */}
          <div id="reviews" className="mt-20">
            <h2 className="text-2xl font-semibold mb-6">
              Customer Reviews
            </h2>

            <ProductReviews productId={productId} />
          </div>
   <div className="mt-16">
  <hr className="mb-10" />

  <h2 className="font-heading text-2xl text-center md:text-6xl font-bold italic mb-6 md:mb-8">
    You May Also Like
  </h2>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {(relatedProducts.length > 0
    ? relatedProducts
    : products.slice(0, 4)
  ).map((p) => (
    <ProductCard
      key={p.id}
      {...p}
      image={p.imageUrl || p.image || p.images?.[0]}
    />
  ))}
</div>
</div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default ProductDetails;