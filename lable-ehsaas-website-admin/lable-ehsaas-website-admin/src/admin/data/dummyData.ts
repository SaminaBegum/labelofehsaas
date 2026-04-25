// ── Dummy data for Ehsaas Label CMS ──

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  sku: string;
  category: string;
  subcategory: string;
  tags: string[];
  fabric: string;
  sizes: string[];
  colors: string[];
  stock: number;
  images: string[];
  featured: boolean;
  newArrival: boolean;
  bestseller: boolean;
  createdAt: string;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  phone: string;
  products: { name: string; qty: number; price: number }[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "unpaid" | "refunded";
  address: string;
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  joinedAt: string;
}

export interface Category {
  id: string;
  name: string;
  parent?: string;
  image: string;
  productCount: number;
  order: number;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder: number;
  expiresAt: string;
  active: boolean;
  usedCount: number;
}

export const products: Product[] = [
  { id: "p1", name: "Roshanara Anarkali Set", description: "Elegant floor-length anarkali in georgette with zari embroidery", price: 8999, discountPrice: 6999, sku: "EL-ANK-001", category: "Kurtis", subcategory: "Anarkali", tags: ["festive", "wedding"], fabric: "Georgette", sizes: ["S", "M", "L", "XL"], colors: ["Blush Pink", "Ivory"], stock: 24, images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400"], featured: true, newArrival: true, bestseller: true, createdAt: "2024-03-15" },
  { id: "p2", name: "Noor Co-ord Set", description: "Contemporary co-ord set with mirror work detailing", price: 5499, sku: "EL-CRD-002", category: "Co-ord Sets", subcategory: "Indo-Western", tags: ["casual", "festive"], fabric: "Cotton Silk", sizes: ["XS", "S", "M", "L"], colors: ["Sage Green", "Mauve"], stock: 38, images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400"], featured: false, newArrival: true, bestseller: false, createdAt: "2024-03-12" },
  { id: "p3", name: "Gulnaar Lehenga", description: "Bridal lehenga with heavy thread & sequin work", price: 24999, discountPrice: 21999, sku: "EL-LHG-003", category: "Lehengas", subcategory: "Bridal", tags: ["wedding", "festive"], fabric: "Raw Silk", sizes: ["S", "M", "L"], colors: ["Maroon", "Gold"], stock: 8, images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400"], featured: true, newArrival: false, bestseller: true, createdAt: "2024-02-28" },
  { id: "p4", name: "Meher Palazzo Suit", description: "Relaxed fit palazzo suit with block print", price: 3999, sku: "EL-PLZ-004", category: "Suits", subcategory: "Palazzo Suits", tags: ["casual"], fabric: "Cotton", sizes: ["S", "M", "L", "XL", "XXL"], colors: ["Indigo", "Off-White"], stock: 52, images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400"], featured: false, newArrival: false, bestseller: false, createdAt: "2024-03-01" },
  { id: "p5", name: "Zara Sharara Set", description: "Festive sharara set with gota patti work", price: 7499, discountPrice: 5999, sku: "EL-SHR-005", category: "Suits", subcategory: "Sharara Suits", tags: ["festive", "wedding"], fabric: "Chanderi", sizes: ["S", "M", "L"], colors: ["Dusty Rose", "Teal"], stock: 15, images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400"], featured: true, newArrival: true, bestseller: false, createdAt: "2024-03-18" },
  { id: "p6", name: "Aisha Kurti", description: "Daily wear cotton kurti with minimal embroidery", price: 1999, sku: "EL-KRT-006", category: "Kurtis", subcategory: "Straight", tags: ["casual"], fabric: "Cotton", sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["White", "Light Blue", "Yellow"], stock: 3, images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400"], featured: false, newArrival: false, bestseller: true, createdAt: "2024-01-20" },
  { id: "p7", name: "Tara Saree", description: "Banarasi silk saree with pure zari border", price: 12999, sku: "EL-SAR-007", category: "Sarees", subcategory: "Banarasi", tags: ["wedding", "festive"], fabric: "Banarasi Silk", sizes: ["Free Size"], colors: ["Red", "Purple"], stock: 12, images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=400"], featured: true, newArrival: false, bestseller: true, createdAt: "2024-02-10" },
  { id: "p8", name: "Diya Jumpsuit", description: "Indo-western jumpsuit with belt detailing", price: 4299, discountPrice: 3499, sku: "EL-JMP-008", category: "Indo-Western", subcategory: "Jumpsuits", tags: ["casual", "festive"], fabric: "Crepe", sizes: ["XS", "S", "M", "L"], colors: ["Black", "Wine"], stock: 0, images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400"], featured: false, newArrival: true, bestseller: false, createdAt: "2024-03-10" },
];

export const orders: Order[] = [
  { id: "ORD-1001", customer: "Priya Sharma", email: "priya@email.com", phone: "+91 98765 43210", products: [{ name: "Roshanara Anarkali Set", qty: 1, price: 6999 }], total: 6999, status: "delivered", paymentStatus: "paid", address: "42 MG Road, Jaipur, Rajasthan", createdAt: "2024-03-18" },
  { id: "ORD-1002", customer: "Ananya Reddy", email: "ananya@email.com", phone: "+91 87654 32109", products: [{ name: "Gulnaar Lehenga", qty: 1, price: 21999 }, { name: "Tara Saree", qty: 1, price: 12999 }], total: 34998, status: "shipped", paymentStatus: "paid", address: "15 Banjara Hills, Hyderabad", createdAt: "2024-03-17" },
  { id: "ORD-1003", customer: "Meera Patel", email: "meera@email.com", phone: "+91 76543 21098", products: [{ name: "Noor Co-ord Set", qty: 2, price: 10998 }], total: 10998, status: "confirmed", paymentStatus: "paid", address: "8 SG Highway, Ahmedabad", createdAt: "2024-03-16" },
  { id: "ORD-1004", customer: "Kavya Nair", email: "kavya@email.com", phone: "+91 65432 10987", products: [{ name: "Meher Palazzo Suit", qty: 1, price: 3999 }], total: 3999, status: "pending", paymentStatus: "unpaid", address: "23 Marine Drive, Kochi", createdAt: "2024-03-19" },
  { id: "ORD-1005", customer: "Ritu Singh", email: "ritu@email.com", phone: "+91 54321 09876", products: [{ name: "Zara Sharara Set", qty: 1, price: 5999 }, { name: "Aisha Kurti", qty: 3, price: 5997 }], total: 11996, status: "cancelled", paymentStatus: "refunded", address: "56 Connaught Place, New Delhi", createdAt: "2024-03-15" },
  { id: "ORD-1006", customer: "Neha Gupta", email: "neha@email.com", phone: "+91 43210 98765", products: [{ name: "Diya Jumpsuit", qty: 1, price: 3499 }], total: 3499, status: "pending", paymentStatus: "unpaid", address: "12 Park Street, Kolkata", createdAt: "2024-03-20" },
];

export const customers: Customer[] = [
  { id: "c1", name: "Priya Sharma", email: "priya@email.com", phone: "+91 98765 43210", orders: 5, totalSpent: 32495, joinedAt: "2023-11-10" },
  { id: "c2", name: "Ananya Reddy", email: "ananya@email.com", phone: "+91 87654 32109", orders: 3, totalSpent: 54997, joinedAt: "2023-12-05" },
  { id: "c3", name: "Meera Patel", email: "meera@email.com", phone: "+91 76543 21098", orders: 8, totalSpent: 28994, joinedAt: "2023-08-22" },
  { id: "c4", name: "Kavya Nair", email: "kavya@email.com", phone: "+91 65432 10987", orders: 1, totalSpent: 3999, joinedAt: "2024-03-19" },
  { id: "c5", name: "Ritu Singh", email: "ritu@email.com", phone: "+91 54321 09876", orders: 4, totalSpent: 19995, joinedAt: "2023-10-15" },
  { id: "c6", name: "Neha Gupta", email: "neha@email.com", phone: "+91 43210 98765", orders: 2, totalSpent: 10498, joinedAt: "2024-01-08" },
];

export const categories: Category[] = [
  { id: "cat1", name: "Kurtis", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=200", productCount: 24, order: 1 },
  { id: "cat2", name: "Anarkali", parent: "Kurtis", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200", productCount: 8, order: 2 },
  { id: "cat3", name: "Straight", parent: "Kurtis", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200", productCount: 16, order: 3 },
  { id: "cat4", name: "Lehengas", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=200", productCount: 12, order: 4 },
  { id: "cat5", name: "Co-ord Sets", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200", productCount: 18, order: 5 },
  { id: "cat6", name: "Sarees", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200", productCount: 15, order: 6 },
  { id: "cat7", name: "Suits", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=200", productCount: 20, order: 7 },
  { id: "cat8", name: "Indo-Western", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200", productCount: 10, order: 8 },
];

export const coupons: Coupon[] = [
  { id: "cp1", code: "EHSAAS20", type: "percentage", value: 20, minOrder: 2000, expiresAt: "2024-04-30", active: true, usedCount: 145 },
  { id: "cp2", code: "FLAT500", type: "fixed", value: 500, minOrder: 3000, expiresAt: "2024-03-31", active: true, usedCount: 89 },
  { id: "cp3", code: "WEDDING15", type: "percentage", value: 15, minOrder: 10000, expiresAt: "2024-06-30", active: true, usedCount: 32 },
  { id: "cp4", code: "NEWYEAR10", type: "percentage", value: 10, minOrder: 1500, expiresAt: "2024-01-31", active: false, usedCount: 256 },
];

export const revenueData = [
  { month: "Oct", revenue: 185000 },
  { month: "Nov", revenue: 245000 },
  { month: "Dec", revenue: 320000 },
  { month: "Jan", revenue: 198000 },
  { month: "Feb", revenue: 275000 },
  { month: "Mar", revenue: 310000 },
];

export const categoryRevenueData = [
  { name: "Kurtis", value: 125000 },
  { name: "Lehengas", value: 215000 },
  { name: "Sarees", value: 98000 },
  { name: "Co-ord Sets", value: 76000 },
  { name: "Suits", value: 89000 },
  { name: "Indo-Western", value: 45000 },
];
