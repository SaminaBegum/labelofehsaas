
import { useState, useMemo, useEffect } from "react";

import {
  Product,
  SizeStock,
  getStockStatus,
  calcTotalStock,
  StockStatus,
  generateSlug
} from "@/lib/mock-data";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2, Package, AlertTriangle, XCircle, ImagePlus, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { uploadToCloudinary } from "../services/cloudinary";
import { collection as fsCollection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { serverTimestamp } from "firebase/firestore";


import {
  addProductToDB,
  updateProductInDB,
  getAllProductsFromDB   // ✅ ADD THIS
} from "@/services/productService";
const STATUS_CONFIG: Record<StockStatus, { label: string; className: string; icon: React.ReactNode }> = {
  in_stock: { label: "In Stock", className: "bg-emerald-500/15 text-emerald-600 border-emerald-500/20", icon: <Package className="h-3 w-3" /> },
  low_stock: { label: "Low Stock", className: "bg-amber-500/15 text-amber-600 border-amber-500/20", icon: <AlertTriangle className="h-3 w-3" /> },
  out_of_stock: { label: "Out of Stock", className: "bg-red-500/15 text-red-600 border-red-500/20", icon: <XCircle className="h-3 w-3" /> },
};

const DEFAULT_SIZES: SizeStock[] = [
  { size: "S", stock: 0 },
  { size: "M", stock: 0 },
  { size: "L", stock: 0 },
  { size: "XL", stock: 0 },
  { size: "XXL", stock: 0 },
  { size: "3XL", stock: 0 },
  { size: "4XL", stock: 0 },
  { size: "5XL", stock: 0 },
];
interface Variant {
  color: string;
  images: string[]; // ✅ NEW
  sizes: SizeStock[];
}
const CATEGORIES = ["Co-Ord Set", "Stitched", "Unstitched"];
const COLOR_OPTIONS = ["Red", "Pink", "Blue", "Black", "White", "Gold", "Maroon", "Lemon" ,"Yellow" , "Navy", "Peach", "Mint", "Green", "Multi"];

interface FormState {
  name: string;
  slug: string;
  price: string;
  discountPercent: string;
  sku: string;
  category: string;
  lowStockThreshold: string;

  variants: Variant[]; // ✅ important

  imagePreview: string;
  description: string;
  fabric: string;
  featured: boolean;
  tags: string[];
  collection: string;
}

const emptyForm: FormState = {
  name: "",
  slug: "",
  price: "",
  discountPercent: "",
  sku: "",
  category: "Ethnic Wear",
  lowStockThreshold: "5",

  // ✅ FIXED (no p here)
 variants: [
  {
    color: "",
    images: [], 
    sizes: DEFAULT_SIZES.map(s => ({ ...s })),
  }
],

  tags: [],
  imagePreview: "",
  description: "",
  fabric: "",
  featured: false,
  collection: "",
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const [filterStatus, setFilterStatus] = useState<"all" | StockStatus>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>({ ...emptyForm });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  
const [collections, setCollections] = useState<any[]>([]);
  const filtered = useMemo(() => products.filter(p => {
    const status = getStockStatus(p);
    const matchesStatus = filterStatus === "all" || status === filterStatus;
    const q = search.toLowerCase();
    const normalize = (c: string) => c.trim().toLowerCase();
    return matchesStatus && (p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  }), [products, filterStatus, search]);

  const stats = useMemo(() => {
    let inStock = 0, lowStock = 0, outOfStock = 0;
    products.forEach(p => { const s = getStockStatus(p); if (s === "in_stock") inStock++; else if (s === "low_stock") lowStock++; else outOfStock++; });
    return { inStock, lowStock, outOfStock, total: products.length };
  }, [products]);

 const openAdd = () => {
  setEditProduct(null);
  setForm({ ...emptyForm });
};
const openEdit = (p: Product) => {
  setEditProduct(p);

  setForm({
    name: p.name,
    slug: p.slug,
    price: String(p.price),
    discountPercent: p.discountPercent?.toString() || "",
    sku: p.sku,
    category: p.category,
    lowStockThreshold: String(p.lowStockThreshold),

variants: (p.variants || []).map((v: any) => ({
  color: v.color || "",
  images: Array.isArray(v.images)
    ? v.images
    : v.imageUrl
    ? [v.imageUrl]
    : p.imageUrl
    ? [p.imageUrl]
    : [],
  sizes: v.sizes || DEFAULT_SIZES,
})),

    imagePreview: p.imageUrl || "",
    description: p.description,
    fabric: p.fabric,
    featured: p.featured,
    tags: p.tags || [],
    collection: p.collection || "",
  });

  setDialogOpen(true);
};

const updateSizeStock = (variantIndex, sizeIndex, stock) => {
  setForm(prev => {
    const updated = [...prev.variants];

    updated[variantIndex] = {
      ...updated[variantIndex],
      sizes: updated[variantIndex].sizes.map((s, i) =>
        i === sizeIndex ? { ...s, stock: Number(stock) } : s
      )
    };

    return { ...prev, variants: updated };
  });
};

  // const toggleColor = (color: string) => {
  //   setForm(prev => ({ ...prev, colors: prev.colors.includes(color) ? prev.colors.filter(c => c !== color) : [...prev.colors, color] }));
  // };
const toggleTag = (tag: string) => {
  setForm(prev => ({
    ...prev,
    tags: prev.tags.includes(tag)
      ? prev.tags.filter(t => t !== tag)
      : [...prev.tags, tag],
  }));
};
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (file) {
    setSelectedFile(file); // ✅ IMPORTANT

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({
        ...prev,
        imagePreview: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  }
};
const handleVariantImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  variantIndex: number
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const url = await uploadToCloudinary(file);

    const updated = [...safeVariants];

    // ✅ THIS IS YOUR LINE
    updated[variantIndex].images.push(url);

    setForm({ ...form, variants: updated });

  } catch (err) {
    toast({
      title: "Upload failed",
      variant: "destructive",
    });
  }
};

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getAllProductsFromDB();
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Failed to load products",
        variant: "destructive"
      });
    } finally {
      setLoading(false); // ✅ THIS IS MISSING IN YOUR CODE
    }
  };

  fetchProducts();
}, []);
useEffect(() => {
  const fetchCollections = async () => {
    const snap = await getDocs(fsCollection(db, "collections"));

    const data = snap.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Collections:", data); // 👈 ADD THIS

    setCollections(data);
  };

  fetchCollections();
}, []);
  const handleNameChange = (name: string) => setForm(prev => ({ ...prev, name, slug: generateSlug(name) }));
const safeVariants = form.variants.map((v) => ({
  ...v,
  images: Array.isArray(v.images) ? v.images : [],
}));
const handleSave = async () => {
  // ✅ Basic validations
  if (!form.name.trim()) {
    toast({ title: "Product name is required", variant: "destructive" });
    return;
  }
const safeVariants = form.variants.map((v) => ({
  ...v,
  images: Array.isArray(v.images) ? v.images : [],
}));
  if (!form.price || Number(form.price) <= 0) {
    toast({ title: "Valid price is required", variant: "destructive" });
    return;
  }

  if (Number(form.discountPercent) > 90) {
    toast({
      title: "Discount cannot be more than 90%",
      variant: "destructive"
    });
    return;
  }

  if (!form.sku.trim()) {
    toast({ title: "SKU is required", variant: "destructive" });
    return;
  }

  // ✅ Variant validations
  if (safeVariants.length === 0) {
    toast({
      title: "Add at least one variant",
      variant: "destructive"
    });
    return;
  }

  // ✅ Color required
  const hasEmptyColor = safeVariants.some(v => !v.color.trim());
  if (hasEmptyColor) {
    toast({
      title: "All variants must have a color",
      variant: "destructive"
    });
    return;
  }

  // ✅ Image required
 const hasNoImages = safeVariants.some(
  (v) => !Array.isArray(v.images) || v.images.length === 0
);
  if (hasNoImages) {
    toast({
      title: "Each variant must have at least one image",
      variant: "destructive"
    });
    return;
  }

  // ✅ Duplicate color check
  const seen = new Set<string>();
  for (const v of safeVariants) {
    const color = v.color.toLowerCase().trim();

    if (seen.has(color)) {
      toast({
        title: "Duplicate colors not allowed",
        variant: "destructive"
      });
      return;
    }

    seen.add(color);
  }

  // ✅ Image upload
  let uploadedImageURL = editProduct?.imageUrl || "";

  try {
    if (selectedFile) {
      uploadedImageURL = await uploadToCloudinary(selectedFile);
    }
  } catch (error) {
    console.error(error);
    toast({ title: "Image upload failed ❌", variant: "destructive" });
    return;
  }

  // ✅ Prepare product data
  const totalStock = safeVariants.reduce(
    (total, v) => total + calcTotalStock(v.sizes),
    0
  );

  // 👉 continue your existing code...


const productData = {
  name: form.name,
  slug: form.slug,
  price: Number(form.price),
  discountPercent: Number(form.discountPercent) || 0, // ✅ ADD THIS LINE
  sku: form.sku,
  category: form.category,
  lowStockThreshold: Number(form.lowStockThreshold),

  variants: safeVariants,

  totalStock,

  imageUrl: uploadedImageURL, // ✅ ADD THIS BACK

  tags: form.tags,
  description: form.description,
  fabric: form.fabric,
  featured: form.featured,
  collection: form.collection,
createdAt: serverTimestamp()
};

  // 2️⃣ Save to Firestore
 // 2️⃣ Save to Firestore + Update UI instantly
try {
  if (editProduct) {
    await updateProductInDB(editProduct.id, productData);

    // ✅ Update UI instantly
    setProducts(prev =>
      prev.map(p =>
        p.id === editProduct.id ? { ...p, ...productData } : p
      )
    );

    toast({ title: "Product updated!" });

  } else {
    const newProduct = await addProductToDB(productData);

    // ✅ Add to UI instantly
    setProducts(prev => [newProduct, ...prev]);

    toast({ title: "Product added!" });
  }

} catch (err: any) {
  console.error(err);

  toast({
    title: "Failed saving product",
    description: err.message,
    variant: "destructive"
  });

  return;
}

  setDialogOpen(false);
};
  const handleDelete = (id: string) => { setProducts(products.filter(p => p.id !== id)); toast({ title: "Product deleted", variant: "destructive" }); };
 const formTotalStock = safeVariants.reduce(
  (total, v) => total + calcTotalStock(v.sizes),
  0
);
if (loading) {
  return <p className="text-center py-10">Loading products...</p>;
}
const getDiscountedPrice = (price: number, discountPercent?: number) => {
  if (!discountPercent) return price;
  return Math.round(price - (price * discountPercent) / 100);
};
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">{products.length} total products</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" />Add Product</Button></DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* <DialogHeader><DialogTitle className="font-display">{editProduct ? "Edit" : "Add"} Product</DialogTitle></DialogHeader> */}
             <DialogHeader>
    <DialogTitle>
      {editProduct ? "Edit" : "Add"} Product
    </DialogTitle>

    <DialogDescription>
      Fill in the product details and save to add it to your store.
    </DialogDescription>
  </DialogHeader>
            
            <div className="space-y-5 mt-2">
              {/* Image */}
              <div>
                <Label>Product Image</Label>
                <div className="mt-1.5 flex items-center gap-4">
                  {form.imagePreview ? (
                    <img src={form.imagePreview} alt="Preview" className="h-20 w-20 rounded-xl object-cover border" />
                  ) : (
                    <div className="h-20 w-20 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center"><ImagePlus className="h-6 w-6 text-muted-foreground/50" /></div>
                  )}
                  <label className="cursor-pointer"><input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} /><span className="text-sm text-primary hover:underline font-medium">Upload Image</span></label>
                </div>
              </div>

              {/* Name, Slug, SKU */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><Label>Product Name *</Label><Input value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="e.g. Silk Anarkali" /></div>
                <div><Label>Slug</Label><Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated" className="text-muted-foreground" /></div>
                <div><Label>SKU *</Label><Input value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} placeholder="EHS-XXX-000" /></div>
              </div>

              {/* Price, Discount, Category */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><Label>Price (₹) *</Label><Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
                <div><Label>Discount (%)</Label>
<Input
  type="number"
  value={form.discountPercent}
  onChange={e => setForm({ ...form, discountPercent: e.target.value })}
  placeholder="e.g. 20"
/></div>
                <div>
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              </div>
<div>
  <Label>Collection</Label>
  <select
    className="w-full border rounded-md px-3 py-2"
    value={form.collection}
    onChange={(e) =>
      setForm((f) => ({
        ...f,
        collection: e.target.value,
      }))
    }
  >
    <option value="">Select Collection</option>

    {collections.map((c) => (
      <option key={c.id} value={c.slug}>
        {c.name}
      </option>
    ))}
  </select>
</div>
              {/* Description & Fabric */}
              <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Product description..." rows={3} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Fabric / Material</Label><Input value={form.fabric} onChange={e => setForm({ ...form, fabric: e.target.value })} placeholder="e.g. Pure Silk" /></div>
                <div className="flex items-center gap-3 pt-6">
                  <Switch checked={form.featured} onCheckedChange={v => setForm({ ...form, featured: v })} />
                  <Label className="flex items-center gap-1"><Star className="h-4 w-4 text-amber-400" />Featured Product</Label>
                </div>
              </div>

              {/* Colors */}
              {/* <div>
                <Label>Colors</Label>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  {COLOR_OPTIONS.map(color => (
                    <Badge key={color} variant="outline"
                      className={`cursor-pointer transition-all ${form.colors.includes(color) ? "bg-primary/15 text-primary border-primary/30" : "hover:bg-muted"}`}
                      onClick={() => toggleColor(color)}>
                      {color}
                    </Badge>
                  ))}
                </div>
              </div> */}
{/* Tags */}
<div>
  <Label>Product Tags</Label>
  <div className="flex gap-2 mt-2">
    <Badge
      variant="outline"
      className={`cursor-pointer ${
        form.tags.includes("new_arrival")
          ? "bg-primary/15 text-primary border-primary/30"
          : "hover:bg-muted"
      }`}
      onClick={() => toggleTag("new_arrival")}
    >
      New Arrival
    </Badge>

    <Badge
      variant="outline"
      className={`cursor-pointer ${
        form.tags.includes("best_seller")
          ? "bg-primary/15 text-primary border-primary/30"
          : "hover:bg-muted"
      }`}
      onClick={() => toggleTag("best_seller")}
    >
      Best Seller
    </Badge>
  </div>
</div>
              {/* Sizes */}
          <div>
  <Label>Size-wise Stock</Label>

  {safeVariants.map((variant, vIndex) => (
    <div key={vIndex} className="mt-4 border p-4 rounded-lg relative">
  {/* ✅ REMOVE BUTTON HERE */}
    {safeVariants.length > 1 && (
      <Button
        variant="destructive"
        size="sm"
        className="absolute top-2 right-2"
        onClick={() => {
          const updated = safeVariants.filter((_, i) => i !== vIndex);
          setForm({ ...form, variants: updated });
        }}
      >
        Remove
      </Button>
    )}
      {/* Color */}
      {/* <div className="mb-3">
        <Label>Color</Label>
        <Input
          value={variant.color}
          placeholder="Enter color (e.g. Red)"
          onChange={(e) => {
            const updated = [...form.variants];
            updated[vIndex].color = e.target.value;
            setForm({ ...form, variants: updated });
          }}
        />
      </div> */}
<div className="mb-3">
  <Label>Select Color</Label>

  {/* 🎨 Color Picker Buttons */}
  <div className="flex flex-wrap gap-2 mt-2">
    {COLOR_OPTIONS.map((color) => {
      const isSelected = variant.color === color;

      return (
        <button
          key={color}
          type="button"
          onClick={() => {
            const updated = [...safeVariants];
            updated[vIndex].color = color;
            setForm({ ...form, variants: updated });
          }}
          className={`px-3 py-1 rounded-full text-sm border
            ${isSelected
              ? "bg-primary text-white border-primary"
              : "bg-muted hover:bg-muted/70"
            }`}
        >
          {color}
        </button>
      );
    })}
  </div>

  {/* ✍️ CUSTOM COLOR INPUT (👉 PUT HERE) */}
  <div className="mt-2">
    <Input
      placeholder="Or type custom color"
      value={variant.color}
      onChange={(e) => {
        const updated = [...safeVariants];
        updated[vIndex].color = e.target.value;
        setForm({ ...form, variants: updated });
      }}
    />
  </div>
</div>
{/* Upload Images for this Variant */}
<div className="mt-3">
  <Label>Variant Images</Label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleVariantImageUpload(e, vIndex)}
  />

  {/* Show Images */}
<div className="flex gap-2 mt-2 flex-wrap">
  {(variant?.images ?? []).map((img, i) => (
    <div key={i} className="relative">
      <img
        src={img}
        className="h-16 w-16 object-cover rounded border"
      />

      <button
        type="button"
        onClick={() => {
          const updated = [...safeVariants];
          updated[vIndex].images.splice(i, 1);
          setForm({ ...form, variants: updated });
        }}
        className="absolute top-0 right-0 bg-black text-white text-xs px-1 rounded"
      >
        ×
      </button>
    </div>
  ))}
</div>
</div>
      {/* Sizes Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
        {variant.sizes.map((s, i) => (
          <div key={s.size} className="flex flex-col items-center">
            <span className="text-xs font-medium text-muted-foreground mb-1">
              {s.size}
            </span>

            <Input
              type="number"
              value={s.stock}
              className="w-full text-center"
              onChange={(e) =>
                updateSizeStock(vIndex, i, parseInt(e.target.value) || 0)
              }
            />
          </div>
        ))}
      </div>
    </div>
  ))}
 <Button
    type="button"
    className="mt-4"
    onClick={() =>
      setForm(prev => ({
        ...prev,
        variants: [
          ...prev.variants,
          {
            color: "",
            images: [],
            sizes: DEFAULT_SIZES.map(s => ({ ...s })),
          },
        ],
      }))
    }
  >
    + Add Color Variant
  </Button> 
  <p className="text-xs text-muted-foreground mt-2">
    Total Stock:{" "}
    <span className="font-semibold text-foreground">
      {formTotalStock}
    </span>
  </p>
</div>
               

              {/* Threshold */}
              <div>
                <Label>Low Stock Threshold</Label>
                <Input type="number" value={form.lowStockThreshold} onChange={e => setForm({ ...form, lowStockThreshold: e.target.value })} />
              </div>

              <Button onClick={handleSave} className="w-full">{editProduct ? "Update" : "Add"} Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-0 shadow-sm"><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stats.total}</p><p className="text-xs text-muted-foreground">Total</p></CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-emerald-600">{stats.inStock}</p><p className="text-xs text-muted-foreground">In Stock</p></CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-amber-600">{stats.lowStock}</p><p className="text-xs text-muted-foreground">Low Stock</p></CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p><p className="text-xs text-muted-foreground">Out of Stock</p></CardContent></Card>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={filterStatus} onValueChange={v => setFilterStatus(v as typeof filterStatus)}>
          <SelectTrigger className="w-full sm:w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in_stock">In Stock</SelectItem>
            <SelectItem value="low_stock">Low Stock</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {filtered.map(product => {
  const status = getStockStatus(product);
  const cfg = STATUS_CONFIG[status];

  // ✅ ADD THIS LINE
  const firstImage =
  product.variants?.[0]?.images?.[0] ||
  product.imageUrl ||
  "";
              return (
                <TableRow key={product.id} className={status === "out_of_stock" ? "bg-red-500/5" : status === "low_stock" ? "bg-amber-500/5" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                    {firstImage ? (
  <img
    src={firstImage}
    alt={product.name}
    className="h-12 w-12 rounded-xl object-cover"
  />
) : (
  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
    {product.name[0]}
  </div>
)}
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        {product.featured && <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-600 border-amber-500/20 mt-0.5"><Star className="h-2.5 w-2.5 mr-0.5" />Featured</Badge>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                  <TableCell className="text-sm">{product.category}</TableCell>
              <TableCell>
  <div>
    {product.discountPercent ? (
      <>
        {/* Original Price */}
        <p className="text-sm line-through text-muted-foreground">
          ₹{product.price.toLocaleString()}
        </p>

        {/* Discounted Price */}
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-emerald-600">
            ₹{getDiscountedPrice(product.price, product.discountPercent).toLocaleString()}
          </p>

          <Badge className="text-[10px] bg-red-500/10 text-red-600">
            {product.discountPercent}% OFF
          </Badge>
        </div>
      </>
    ) : (
      /* No Discount */
      <p className="text-sm font-semibold">
        ₹{product.price.toLocaleString()}
      </p>
    )}
  </div>
</TableCell>
                  <TableCell className="text-center">
                    <span className={`font-semibold ${status === "out_of_stock" ? "text-red-600" : status === "low_stock" ? "text-amber-600" : ""}`}>{product.totalStock}</span>
                    {status === "low_stock" && <p className="text-[10px] text-amber-600">Only {product.totalStock} left</p>}
                  </TableCell>
                  <TableCell><Badge variant="outline" className={`${cfg.className} gap-1`}>{cfg.icon}{cfg.label}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(product)}><Edit className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(product.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(product => {
          const status = getStockStatus(product);
          // const firstImage = product.variants?.[0]?.images?.[0];
          const firstImage =
  product.variants?.[0]?.images?.[0] ||
  product.imageUrl ||
  "";
          const cfg = STATUS_CONFIG[status];
          return (
            <Card key={product.id} className={`border-0 shadow-sm ${status === "out_of_stock" ? "ring-1 ring-red-500/20" : status === "low_stock" ? "ring-1 ring-amber-500/20" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                  {firstImage ? (
  <img
    src={firstImage}
    alt={product.name}
    className="h-10 w-10 rounded-lg object-cover"
  />
) : (
  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">
    {product.name[0]}
  </div>
)}
                    <div>
                      <h3 className="font-medium text-sm">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.sku} · {product.category}</p>
                      {product.featured && <Badge variant="outline" className="text-[10px] bg-amber-500/10 text-amber-600 border-amber-500/20 mt-0.5"><Star className="h-2.5 w-2.5 mr-0.5" />Featured</Badge>}
                    </div>
                  </div>
                  <Badge variant="outline" className={`${cfg.className} gap-1 text-[10px]`}>{cfg.icon}{cfg.label}</Badge>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex gap-4">
                    <div>
                      <p className="text-[10px] text-muted-foreground">Price</p>
                     <div className="font-semibold text-sm">
  {product.discountPercent ? (
    <div className="flex items-center gap-2">
      <span className="line-through text-muted-foreground">
        ₹{product.price}
      </span>

      <span className="text-emerald-600">
       ₹{getDiscountedPrice(product.price, product.discountPercent)}
      </span>

      {/* <Badge className="text-[10px] bg-red-500/10 text-red-600 border-red-500/20">
        {getDiscountPercent(product.price, product.discountPercent)}% OFF
      </Badge> */}
    </div>
  ) : (
    `₹${product.price.toLocaleString()}`
  )}
</div>
                    </div>
                    <div>
                      <p className="text-[10px] text-muted-foreground">Stock</p>
                      <p className={`font-semibold text-sm ${status === "out_of_stock" ? "text-red-600" : status === "low_stock" ? "text-amber-600" : ""}`}>{product.totalStock}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={() => openEdit(product)}><Edit className="h-3 w-3 mr-1" />Edit</Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(product.id)}><Trash2 className="h-3 w-3" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No products found</p>}
    </div>
  );
};

export default ProductsPage;
