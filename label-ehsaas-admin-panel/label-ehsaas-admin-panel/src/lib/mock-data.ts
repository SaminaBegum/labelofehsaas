export interface SizeStock {
  size: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  discountPrice?: number;
  totalStock: number;
  lowStockThreshold: number;
  sizes: SizeStock[];
  colors: string[];
  image: string;
  imageUrl?: string;
  images: string[];
  sku: string;
  description: string;
  fabric: string;
  featured: boolean;
  createdAt: string;
}

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

export function getStockStatus(product: Product): StockStatus {
  if (product.totalStock === 0) return "out_of_stock";
  if (product.totalStock <= product.lowStockThreshold) return "low_stock";
  return "in_stock";
}

export function calcTotalStock(sizes: SizeStock[]): number {
  return sizes.reduce((sum, s) => sum + s.stock, 0);
}

export function generateSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export interface Order {
  id: string; customer: string; email: string; total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  items: number; date: string; paymentMethod: string; paymentStatus: "paid" | "unpaid" | "refunded";
  products: string[];
}

export interface Customer {
  id: string; name: string; email: string; phone: string; orders: number;
  totalSpent: number; joinedAt: string; city: string;
}

export interface Category {
  id: number; name: string; count: number; icon: string; image?: string; showOnHomepage: boolean;
}

export interface Coupon {
  id: string; code: string; type: "percentage" | "flat"; value: number;
  minOrder: number; maxUses: number; usedCount: number; expiryDate: string; active: boolean;
}

export interface Banner {
  id: string; title: string; subtitle: string; image: string; buttonLink: string;
  position: "hero" | "featured" | "new_arrivals"; active: boolean; order: number;
}

export interface Review {
  id: string; productId: string; productName: string; customerName: string;
  rating: number; comment: string; date: string; approved: boolean;
}

export const products: Product[] = [
  { id: "P001", name: "Silk Anarkali Suit", slug: "silk-anarkali-suit", category: "Suits", price: 4999, discountPrice: 3999, totalStock: 25, lowStockThreshold: 5, sizes: [{ size: "S", stock: 5 }, { size: "M", stock: 8 }, { size: "L", stock: 7 }, { size: "XL", stock: 5 }], colors: ["Red", "Pink"], image: "👗", images: [], sku: "EHS-ANK-001", description: "Beautiful silk anarkali suit with intricate embroidery", fabric: "Pure Silk", featured: true, createdAt: "2024-01-15" },
  { id: "P002", name: "Chiffon Saree - Rose", slug: "chiffon-saree-rose", category: "Sarees", price: 3499, totalStock: 40, lowStockThreshold: 8, sizes: [{ size: "Free Size", stock: 40 }], colors: ["Rose", "Blush"], image: "🥻", images: [], sku: "EHS-SAR-002", description: "Elegant chiffon saree in rose color", fabric: "Chiffon", featured: true, createdAt: "2024-01-20" },
  { id: "P003", name: "Embroidered Lehenga", slug: "embroidered-lehenga", category: "Lehengas", price: 8999, totalStock: 10, lowStockThreshold: 5, sizes: [{ size: "S", stock: 2 }, { size: "M", stock: 3 }, { size: "L", stock: 3 }, { size: "XL", stock: 2 }], colors: ["Maroon", "Gold"], image: "👗", images: [], sku: "EHS-LEH-003", description: "Handcrafted embroidered lehenga for special occasions", fabric: "Velvet", featured: true, createdAt: "2024-02-01" },
  { id: "P004", name: "Cotton Kurti Set", slug: "cotton-kurti-set", category: "Kurtis", price: 1299, totalStock: 80, lowStockThreshold: 10, sizes: [{ size: "S", stock: 20 }, { size: "M", stock: 25 }, { size: "L", stock: 20 }, { size: "XL", stock: 15 }], colors: ["Blue", "White"], image: "👚", images: [], sku: "EHS-KUR-004", description: "Comfortable cotton kurti set for daily wear", fabric: "Cotton", featured: false, createdAt: "2024-02-10" },
  { id: "P005", name: "Banarasi Silk Dupatta", slug: "banarasi-silk-dupatta", category: "Dupattas", price: 1999, totalStock: 0, lowStockThreshold: 5, sizes: [{ size: "Free Size", stock: 0 }], colors: ["Golden"], image: "🧣", images: [], sku: "EHS-DUP-005", description: "Traditional Banarasi silk dupatta", fabric: "Banarasi Silk", featured: false, createdAt: "2024-02-15" },
  { id: "P006", name: "Palazzo Pant Set", slug: "palazzo-pant-set", category: "Kurtis", price: 1799, totalStock: 55, lowStockThreshold: 10, sizes: [{ size: "S", stock: 12 }, { size: "M", stock: 18 }, { size: "L", stock: 15 }, { size: "XL", stock: 10 }], colors: ["Black", "Navy"], image: "👚", images: [], sku: "EHS-KUR-006", description: "Stylish palazzo pant set", fabric: "Rayon", featured: false, createdAt: "2024-03-01" },
  { id: "P007", name: "Bridal Lehenga Gold", slug: "bridal-lehenga-gold", category: "Lehengas", price: 24999, discountPrice: 21999, totalStock: 5, lowStockThreshold: 3, sizes: [{ size: "S", stock: 1 }, { size: "M", stock: 2 }, { size: "L", stock: 1 }, { size: "XL", stock: 1 }], colors: ["Gold", "Red"], image: "👗", images: [], sku: "EHS-LEH-007", description: "Luxurious bridal lehenga in gold", fabric: "Heavy Silk", featured: true, createdAt: "2024-03-05" },
  { id: "P008", name: "Georgette Sharara Set", slug: "georgette-sharara-set", category: "Suits", price: 3999, totalStock: 30, lowStockThreshold: 5, sizes: [{ size: "S", stock: 6 }, { size: "M", stock: 10 }, { size: "L", stock: 8 }, { size: "XL", stock: 6 }], colors: ["Peach", "Mint"], image: "👗", images: [], sku: "EHS-SHA-008", description: "Elegant georgette sharara set", fabric: "Georgette", featured: false, createdAt: "2024-03-10" },
  { id: "P009", name: "Printed Lawn Suit", slug: "printed-lawn-suit", category: "Suits", price: 2499, totalStock: 60, lowStockThreshold: 10, sizes: [{ size: "S", stock: 15 }, { size: "M", stock: 18 }, { size: "L", stock: 15 }, { size: "XL", stock: 12 }], colors: ["Multi"], image: "👗", images: [], sku: "EHS-LAW-009", description: "Printed lawn suit for summer", fabric: "Lawn", featured: false, createdAt: "2024-03-15" },
  { id: "P010", name: "Velvet Shawl", slug: "velvet-shawl", category: "Dupattas", price: 2999, totalStock: 15, lowStockThreshold: 5, sizes: [{ size: "Free Size", stock: 15 }], colors: ["Burgundy", "Navy"], image: "🧣", images: [], sku: "EHS-SHW-010", description: "Premium velvet shawl for winter", fabric: "Velvet", featured: false, createdAt: "2024-03-20" },
];

export const orders: Order[] = [
  { id: "ORD-1001", customer: "Priya Sharma", email: "priya@email.com", total: 8998, status: "delivered", items: 2, date: "2024-03-25", paymentMethod: "UPI", paymentStatus: "paid", products: ["Silk Anarkali Suit", "Cotton Kurti Set"] },
  { id: "ORD-1002", customer: "Anita Verma", email: "anita@email.com", total: 24999, status: "confirmed", items: 1, date: "2024-03-24", paymentMethod: "Credit Card", paymentStatus: "paid", products: ["Bridal Lehenga Gold"] },
  { id: "ORD-1003", customer: "Meera Patel", email: "meera@email.com", total: 3499, status: "shipped", items: 1, date: "2024-03-23", paymentMethod: "Debit Card", paymentStatus: "paid", products: ["Chiffon Saree - Rose"] },
  { id: "ORD-1004", customer: "Kavita Singh", email: "kavita@email.com", total: 6298, status: "pending", items: 3, date: "2024-03-22", paymentMethod: "COD", paymentStatus: "unpaid", products: ["Cotton Kurti Set", "Palazzo Pant Set", "Velvet Shawl"] },
  { id: "ORD-1005", customer: "Ritu Gupta", email: "ritu@email.com", total: 4999, status: "delivered", items: 1, date: "2024-03-21", paymentMethod: "UPI", paymentStatus: "paid", products: ["Silk Anarkali Suit"] },
  { id: "ORD-1006", customer: "Sunita Joshi", email: "sunita@email.com", total: 1299, status: "cancelled", items: 1, date: "2024-03-20", paymentMethod: "Credit Card", paymentStatus: "refunded", products: ["Cotton Kurti Set"] },
  { id: "ORD-1007", customer: "Deepa Rao", email: "deepa@email.com", total: 11998, status: "confirmed", items: 2, date: "2024-03-19", paymentMethod: "UPI", paymentStatus: "paid", products: ["Embroidered Lehenga", "Velvet Shawl"] },
  { id: "ORD-1008", customer: "Neha Kapoor", email: "neha@email.com", total: 2499, status: "shipped", items: 1, date: "2024-03-18", paymentMethod: "Debit Card", paymentStatus: "paid", products: ["Printed Lawn Suit"] },
];

export const customers: Customer[] = [
  { id: "C001", name: "Priya Sharma", email: "priya@email.com", phone: "+91 98765 43210", orders: 8, totalSpent: 45990, joinedAt: "2023-06-15", city: "Mumbai" },
  { id: "C002", name: "Anita Verma", email: "anita@email.com", phone: "+91 98765 43211", orders: 3, totalSpent: 32997, joinedAt: "2023-08-20", city: "Delhi" },
  { id: "C003", name: "Meera Patel", email: "meera@email.com", phone: "+91 98765 43212", orders: 12, totalSpent: 67890, joinedAt: "2023-04-10", city: "Ahmedabad" },
  { id: "C004", name: "Kavita Singh", email: "kavita@email.com", phone: "+91 98765 43213", orders: 5, totalSpent: 22450, joinedAt: "2023-09-05", city: "Jaipur" },
  { id: "C005", name: "Ritu Gupta", email: "ritu@email.com", phone: "+91 98765 43214", orders: 15, totalSpent: 89500, joinedAt: "2023-02-28", city: "Kolkata" },
  { id: "C006", name: "Sunita Joshi", email: "sunita@email.com", phone: "+91 98765 43215", orders: 2, totalSpent: 5498, joinedAt: "2024-01-10", city: "Pune" },
  { id: "C007", name: "Deepa Rao", email: "deepa@email.com", phone: "+91 98765 43216", orders: 7, totalSpent: 41993, joinedAt: "2023-07-22", city: "Bangalore" },
  { id: "C008", name: "Neha Kapoor", email: "neha@email.com", phone: "+91 98765 43217", orders: 4, totalSpent: 18996, joinedAt: "2023-11-15", city: "Chandigarh" },
];

export const categories: Category[] = [
  { id: 1, name: "Ethnic Wear", count: 45, icon: "👗", showOnHomepage: true },
  { id: 2, name: "Kurta Sets", count: 32, icon: "👚", showOnHomepage: true },
  { id: 3, name: "Sarees", count: 28, icon: "🥻", showOnHomepage: true },
  { id: 4, name: "Lehengas", count: 18, icon: "👗", showOnHomepage: true },
  { id: 5, name: "Festive Collection", count: 24, icon: "✨", showOnHomepage: true },
  { id: 6, name: "Dupattas", count: 15, icon: "🧣", showOnHomepage: false },
  { id: 7, name: "Accessories", count: 12, icon: "💍", showOnHomepage: false },
];

export const coupons: Coupon[] = [
  { id: "CPN-001", code: "WELCOME10", type: "percentage", value: 10, minOrder: 999, maxUses: 100, usedCount: 45, expiryDate: "2024-06-30", active: true },
  { id: "CPN-002", code: "FLAT500", type: "flat", value: 500, minOrder: 2999, maxUses: 50, usedCount: 12, expiryDate: "2024-05-15", active: true },
  { id: "CPN-003", code: "BRIDAL20", type: "percentage", value: 20, minOrder: 9999, maxUses: 20, usedCount: 8, expiryDate: "2024-12-31", active: true },
  { id: "CPN-004", code: "SUMMER15", type: "percentage", value: 15, minOrder: 1499, maxUses: 200, usedCount: 180, expiryDate: "2024-04-30", active: false },
];

export const banners: Banner[] = [
  { id: "BNR-001", title: "New Bridal Collection", subtitle: "Stunning lehengas for your special day", image: "🎊", buttonLink: "/products?cat=lehengas", position: "hero", active: true, order: 1 },
  { id: "BNR-002", title: "Summer Sale - 30% Off", subtitle: "On all cotton kurtas and suits", image: "☀️", buttonLink: "/products?cat=kurtis", position: "hero", active: true, order: 2 },
  { id: "BNR-003", title: "Festive Specials", subtitle: "Handpicked collection for the season", image: "🪔", buttonLink: "/products?featured=true", position: "featured", active: true, order: 1 },
  { id: "BNR-004", title: "New Arrivals", subtitle: "Fresh designs added weekly", image: "🆕", buttonLink: "/products?sort=new", position: "new_arrivals", active: false, order: 1 },
];

export const reviews: Review[] = [
  { id: "REV-001", productId: "P001", productName: "Silk Anarkali Suit", customerName: "Priya Sharma", rating: 5, comment: "Absolutely gorgeous! The fabric quality is amazing.", date: "2024-03-20", approved: true },
  { id: "REV-002", productId: "P002", productName: "Chiffon Saree - Rose", customerName: "Meera Patel", rating: 4, comment: "Beautiful drape, love the color. Slightly thin material.", date: "2024-03-18", approved: true },
  { id: "REV-003", productId: "P007", productName: "Bridal Lehenga Gold", customerName: "Anita Verma", rating: 5, comment: "Worth every penny! Got so many compliments.", date: "2024-03-15", approved: true },
  { id: "REV-004", productId: "P004", productName: "Cotton Kurti Set", customerName: "Kavita Singh", rating: 3, comment: "Good for the price but sizing runs a bit large.", date: "2024-03-12", approved: false },
  { id: "REV-005", productId: "P003", productName: "Embroidered Lehenga", customerName: "Ritu Gupta", rating: 5, comment: "Stunning piece! The embroidery work is exquisite.", date: "2024-03-10", approved: true },
  { id: "REV-006", productId: "P006", productName: "Palazzo Pant Set", customerName: "Neha Kapoor", rating: 4, comment: "Very comfortable and trendy. Would buy again.", date: "2024-03-08", approved: false },
];

export const dashboardStats = {
  totalRevenue: 285430,
  totalOrders: 156,
  totalCustomers: 89,
  totalProducts: 142,
  revenueGrowth: 12.5,
  orderGrowth: 8.3,
  customerGrowth: 15.2,
  productGrowth: 5.1,
};

export const revenueData = [
  { month: "Jan", revenue: 18500 },
  { month: "Feb", revenue: 22300 },
  { month: "Mar", revenue: 28900 },
  { month: "Apr", revenue: 25100 },
  { month: "May", revenue: 31200 },
  { month: "Jun", revenue: 35400 },
  { month: "Jul", revenue: 29800 },
  { month: "Aug", revenue: 33600 },
  { month: "Sep", revenue: 38200 },
  { month: "Oct", revenue: 41500 },
  { month: "Nov", revenue: 45900 },
  { month: "Dec", revenue: 52000 },
];

export const categoryDistribution = [
  { name: "Ethnic Wear", value: 35 },
  { name: "Sarees", value: 25 },
  { name: "Lehengas", value: 15 },
  { name: "Kurta Sets", value: 18 },
  { name: "Dupattas", value: 7 },
];
