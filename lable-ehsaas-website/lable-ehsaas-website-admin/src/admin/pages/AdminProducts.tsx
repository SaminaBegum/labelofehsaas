import { useState } from "react";
import { Plus, Search, Edit, Trash2, Star, Sparkles, TrendingUp, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { products as initialProducts, type Product } from "../data/dummyData";

const AdminProducts = () => {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { toast } = useToast();

  // Form state
  const [form, setForm] = useState({
    name: "", description: "", price: "", discountPrice: "", sku: "",
    category: "", subcategory: "", tags: "", fabric: "", sizes: "",
    colors: "", stock: "", featured: false, newArrival: false, bestseller: false,
  });

  const categories = [...new Set(productList.map((p) => p.category))];

  const filtered = productList.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "all" || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: "", description: "", price: "", discountPrice: "", sku: "", category: "", subcategory: "", tags: "", fabric: "", sizes: "", colors: "", stock: "", featured: false, newArrival: false, bestseller: false });
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      name: p.name, description: p.description, price: p.price.toString(),
      discountPrice: p.discountPrice?.toString() || "", sku: p.sku,
      category: p.category, subcategory: p.subcategory, tags: p.tags.join(", "),
      fabric: p.fabric, sizes: p.sizes.join(", "), colors: p.colors.join(", "),
      stock: p.stock.toString(), featured: p.featured, newArrival: p.newArrival, bestseller: p.bestseller,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price || !form.sku) {
      toast({ title: "Missing fields", description: "Name, price, and SKU are required", variant: "destructive" });
      return;
    }
    const product: Product = {
      id: editProduct?.id || `p${Date.now()}`,
      name: form.name, description: form.description, price: Number(form.price),
      discountPrice: form.discountPrice ? Number(form.discountPrice) : undefined,
      sku: form.sku, category: form.category, subcategory: form.subcategory,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      fabric: form.fabric, sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
      stock: Number(form.stock), images: editProduct?.images || [], featured: form.featured,
      newArrival: form.newArrival, bestseller: form.bestseller, createdAt: editProduct?.createdAt || new Date().toISOString().slice(0, 10),
    };
    if (editProduct) {
      setProductList((prev) => prev.map((p) => (p.id === editProduct.id ? product : p)));
      toast({ title: "Product updated" });
    } else {
      setProductList((prev) => [product, ...prev]);
      toast({ title: "Product added" });
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
    toast({ title: "Product deleted" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground">Products</h1>
          <p className="text-sm text-muted-foreground mt-1">{productList.length} products</p>
        </div>
        <Button onClick={openAdd} className="gap-2">
          <Plus className="h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or SKU..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Product table */}
      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-4 font-medium text-muted-foreground">Product</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">SKU</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Price</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Stock</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Tags</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 object-cover rounded-sm bg-muted" />
                        <div>
                          <p className="font-medium text-foreground">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{p.sku}</td>
                    <td className="p-4">
                      <div>
                        <span className="font-medium text-foreground">₹{(p.discountPrice || p.price).toLocaleString()}</span>
                        {p.discountPrice && <span className="text-xs text-muted-foreground line-through ml-1">₹{p.price.toLocaleString()}</span>}
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <Badge variant={p.stock === 0 ? "destructive" : p.stock <= 5 ? "secondary" : "outline"} className="text-xs">
                        {p.stock === 0 ? "Out" : p.stock}
                      </Badge>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {p.featured && <Star className="h-3.5 w-3.5 text-amber-500" />}
                        {p.newArrival && <Sparkles className="h-3.5 w-3.5 text-blue-500" />}
                        {p.bestseller && <TrendingUp className="h-3.5 w-3.5 text-green-500" />}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(p)}>
                            <Edit className="h-3.5 w-3.5 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => setDeleteConfirm(p.id)}>
                            <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="text-center py-8 text-muted-foreground">No products found</p>}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">{editProduct ? "Edit Product" : "Add Product"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label>Product Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
            </div>
            <div>
              <Label>Price (₹) *</Label>
              <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            </div>
            <div>
              <Label>Discount Price (₹)</Label>
              <Input type="number" value={form.discountPrice} onChange={(e) => setForm({ ...form, discountPrice: e.target.value })} />
            </div>
            <div>
              <Label>SKU *</Label>
              <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            </div>
            <div>
              <Label>Stock</Label>
              <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div>
              <Label>Category</Label>
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            </div>
            <div>
              <Label>Subcategory</Label>
              <Input value={form.subcategory} onChange={(e) => setForm({ ...form, subcategory: e.target.value })} />
            </div>
            <div>
              <Label>Fabric</Label>
              <Input value={form.fabric} onChange={(e) => setForm({ ...form, fabric: e.target.value })} />
            </div>
            <div>
              <Label>Tags (comma separated)</Label>
              <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="festive, casual" />
            </div>
            <div>
              <Label>Sizes (comma separated)</Label>
              <Input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} placeholder="S, M, L, XL" />
            </div>
            <div>
              <Label>Colors (comma separated)</Label>
              <Input value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} placeholder="Pink, Ivory" />
            </div>
            <div className="sm:col-span-2 flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                <Label>Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.newArrival} onCheckedChange={(v) => setForm({ ...form, newArrival: v })} />
                <Label>New Arrival</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.bestseller} onCheckedChange={(v) => setForm({ ...form, bestseller: v })} />
                <Label>Bestseller</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editProduct ? "Update" : "Add Product"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
