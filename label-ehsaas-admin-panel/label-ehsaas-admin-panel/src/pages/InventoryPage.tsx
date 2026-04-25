import { useState, useEffect, useMemo } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { Product, getStockStatus, StockStatus } from "@/lib/mock-data";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Package, AlertTriangle, XCircle, TrendingDown } from "lucide-react";

const STATUS_CONFIG: Record<StockStatus, { label: string; className: string; icon: React.ReactNode }> = {
  in_stock: { label: "In Stock", className: "bg-emerald-500/15 text-emerald-600 border-emerald-500/20", icon: <Package className="h-3 w-3" /> },
  low_stock: { label: "Low Stock", className: "bg-amber-500/15 text-amber-600 border-amber-500/20", icon: <AlertTriangle className="h-3 w-3" /> },
  out_of_stock: { label: "Out of Stock", className: "bg-red-500/15 text-red-600 border-red-500/20", icon: <XCircle className="h-3 w-3" /> },
};

const InventoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | StockStatus>("all");

  // Fetch real-time products from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filtered = useMemo(() => products.filter(p => {
    const status = getStockStatus(p);
    const matchesStatus = filterStatus === "all" || status === filterStatus;
    const q = search.toLowerCase();
    return matchesStatus && (p.name.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q));
  }), [products, filterStatus, search]);

  const stats = useMemo(() => {
    let inStock = 0, lowStock = 0, outOfStock = 0, totalUnits = 0;
    products.forEach(p => {
      const s = getStockStatus(p);
      if (s === "in_stock") inStock++;
      else if (s === "low_stock") lowStock++;
      else outOfStock++;
      totalUnits += p.totalStock;
    });
    return { inStock, lowStock, outOfStock, total: products.length, totalUnits };
  }, [products]);

  const lowStockProducts = useMemo(() =>
    products.filter(p => getStockStatus(p) === "low_stock" || getStockStatus(p) === "out_of_stock")
      .sort((a, b) => a.totalStock - b.totalStock), [products]);

  if (loading) return <p className="text-center py-12">Loading inventory...</p>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold">Inventory</h1>
        <p className="text-muted-foreground text-sm mt-1">Track stock levels and manage inventory</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Total Products", value: stats.total, color: "" },
          { label: "Total Units", value: stats.totalUnits, color: "" },
          { label: "In Stock", value: stats.inStock, color: "text-emerald-600" },
          { label: "Low Stock", value: stats.lowStock, color: "text-amber-600" },
          { label: "Out of Stock", value: stats.outOfStock, color: "text-red-600" },
        ].map(s => (
          <Card key={s.label} className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Low Stock Alerts */}
      {lowStockProducts.length > 0 && (
        <Card className="border-0 shadow-sm border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-display flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-amber-600" />
              Low Stock Alerts ({lowStockProducts.length} products)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {lowStockProducts.map(p => (
                <Badge key={p.id} variant="outline" className={`${getStockStatus(p) === "out_of_stock" ? "bg-red-500/10 text-red-600 border-red-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"}`}>
                  {p.name}: {p.totalStock} left
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search by name or SKU..." value={search} onChange={e => setSearch(e.target.value)} />
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

      {/* Table - Desktop */}
      <div className="hidden md:block rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Total Stock</TableHead>
              <TableHead>Sizes</TableHead>
              <TableHead>Threshold</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(product => {
              const status = getStockStatus(product);
              const cfg = STATUS_CONFIG[status];
              return (
                <TableRow key={product.id} className={status === "out_of_stock" ? "bg-red-500/5" : status === "low_stock" ? "bg-amber-500/5" : ""}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">{product.image}</div>
                      )}
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">₹{product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{product.sku}</TableCell>
                  <TableCell className="text-sm">{product.category}</TableCell>
                  <TableCell className="text-center">
                    <span className={`font-semibold ${status === "out_of_stock" ? "text-red-600" : status === "low_stock" ? "text-amber-600" : ""}`}>
                      {product.totalStock}
                    </span>
                    {status === "low_stock" && <p className="text-[10px] text-amber-600">Only {product.totalStock} left</p>}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {product.sizes?.map(s => (
                        <span key={s.size} className={`text-[10px] px-1.5 py-0.5 rounded ${s.stock > 0 ? "bg-muted" : "bg-red-500/10 text-red-500 line-through"}`}>
                          {s.size}: {s.stock}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{product.lowStockThreshold}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${cfg.className} gap-1`}>{cfg.icon}{cfg.label}</Badge>
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
          const cfg = STATUS_CONFIG[status];
          return (
            <Card key={product.id} className={`border-0 shadow-sm ${status === "out_of_stock" ? "ring-1 ring-red-500/20" : status === "low_stock" ? "ring-1 ring-amber-500/20" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">{product.image}</div>
                    <div>
                      <h3 className="font-medium text-sm">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.sku}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${cfg.className} gap-1 text-[10px]`}>{cfg.icon}{cfg.label}</Badge>
                </div>
                <div className="flex gap-1 flex-wrap mt-2">
                  {product.sizes?.map(s => (
                    <span key={s.size} className={`text-[10px] px-1.5 py-0.5 rounded ${s.stock > 0 ? "bg-muted" : "bg-red-500/10 text-red-500 line-through"}`}>
                      {s.size}: {s.stock}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t text-sm">
                  <span className="text-muted-foreground">Stock: <span className="font-semibold text-foreground">{product.totalStock}</span></span>
                  <span className="text-muted-foreground">Threshold: {product.lowStockThreshold}</span>
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

export default InventoryPage;