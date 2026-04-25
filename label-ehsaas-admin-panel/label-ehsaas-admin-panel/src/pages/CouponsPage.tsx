import { useState } from "react";
import { coupons as initialCoupons, Coupon } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Tag, Percent, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CouponsPage = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({ code: "", type: "percentage" as "percentage" | "flat", value: "", minOrder: "", maxUses: "", expiryDate: "" });

  const openAdd = () => { setEditCoupon(null); setForm({ code: "", type: "percentage", value: "", minOrder: "", maxUses: "", expiryDate: "" }); setDialogOpen(true); };
  const openEdit = (c: Coupon) => {
    setEditCoupon(c);
    setForm({ code: c.code, type: c.type, value: String(c.value), minOrder: String(c.minOrder), maxUses: String(c.maxUses), expiryDate: c.expiryDate });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.code || !form.value) { toast({ title: "Please fill required fields", variant: "destructive" }); return; }
    if (editCoupon) {
      setCoupons(coupons.map(c => c.id === editCoupon.id ? { ...c, code: form.code.toUpperCase(), type: form.type, value: Number(form.value), minOrder: Number(form.minOrder), maxUses: Number(form.maxUses), expiryDate: form.expiryDate } : c));
      toast({ title: "Coupon updated!" });
    } else {
      setCoupons([...coupons, { id: `CPN-${Date.now()}`, code: form.code.toUpperCase(), type: form.type, value: Number(form.value), minOrder: Number(form.minOrder) || 0, maxUses: Number(form.maxUses) || 0, usedCount: 0, expiryDate: form.expiryDate, active: true }]);
      toast({ title: "Coupon created!" });
    }
    setDialogOpen(false);
  };

  const toggleActive = (id: string) => setCoupons(coupons.map(c => c.id === id ? { ...c, active: !c.active } : c));
  const handleDelete = (id: string) => { setCoupons(coupons.filter(c => c.id !== id)); toast({ title: "Coupon deleted", variant: "destructive" }); };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">Coupons & Offers</h1>
          <p className="text-muted-foreground text-sm mt-1">{coupons.length} discount codes</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" />Create Coupon</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle className="font-display">{editCoupon ? "Edit" : "Create"} Coupon</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-2">
              <div><Label>Coupon Code *</Label><Input value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="e.g. WELCOME10" className="uppercase" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Discount Type</Label>
                  <Select value={form.type} onValueChange={v => setForm({ ...form, type: v as typeof form.type })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="flat">Flat (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Value *</Label><Input type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} placeholder={form.type === "percentage" ? "e.g. 10" : "e.g. 500"} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Min Order (₹)</Label><Input type="number" value={form.minOrder} onChange={e => setForm({ ...form, minOrder: e.target.value })} /></div>
                <div><Label>Max Uses</Label><Input type="number" value={form.maxUses} onChange={e => setForm({ ...form, maxUses: e.target.value })} /></div>
              </div>
              <div><Label>Expiry Date</Label><Input type="date" value={form.expiryDate} onChange={e => setForm({ ...form, expiryDate: e.target.value })} /></div>
              <Button onClick={handleSave} className="w-full">{editCoupon ? "Update" : "Create"} Coupon</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-0 shadow-sm"><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{coupons.length}</p><p className="text-xs text-muted-foreground">Total Coupons</p></CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-emerald-600">{coupons.filter(c => c.active).length}</p><p className="text-xs text-muted-foreground">Active</p></CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-amber-600">{coupons.reduce((s, c) => s + c.usedCount, 0)}</p><p className="text-xs text-muted-foreground">Total Uses</p></CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-red-600">{coupons.filter(c => !c.active).length}</p><p className="text-xs text-muted-foreground">Expired</p></CardContent></Card>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Min Order</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map(coupon => (
              <TableRow key={coupon.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-primary" />
                    <span className="font-mono font-semibold">{coupon.code}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="gap-1">
                    {coupon.type === "percentage" ? <Percent className="h-3 w-3" /> : <IndianRupee className="h-3 w-3" />}
                    {coupon.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-semibold">{coupon.type === "percentage" ? `${coupon.value}%` : `₹${coupon.value}`}</TableCell>
                <TableCell>₹{coupon.minOrder.toLocaleString()}</TableCell>
                <TableCell>{coupon.usedCount}/{coupon.maxUses}</TableCell>
                <TableCell className="text-sm">{coupon.expiryDate}</TableCell>
                <TableCell><Switch checked={coupon.active} onCheckedChange={() => toggleActive(coupon.id)} /></TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-1 justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(coupon)}><Edit className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(coupon.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {coupons.map(coupon => (
          <Card key={coupon.id} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <span className="font-mono font-semibold">{coupon.code}</span>
                </div>
                <Switch checked={coupon.active} onCheckedChange={() => toggleActive(coupon.id)} />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <span className="text-muted-foreground">Discount: <span className="font-semibold text-foreground">{coupon.type === "percentage" ? `${coupon.value}%` : `₹${coupon.value}`}</span></span>
                <span className="text-muted-foreground">Min: <span className="font-semibold text-foreground">₹{coupon.minOrder}</span></span>
                <span className="text-muted-foreground">Used: {coupon.usedCount}/{coupon.maxUses}</span>
                <span className="text-muted-foreground">Expires: {coupon.expiryDate}</span>
              </div>
              <div className="flex gap-1 mt-3 pt-3 border-t">
                <Button variant="outline" size="sm" onClick={() => openEdit(coupon)}><Edit className="h-3 w-3 mr-1" />Edit</Button>
                <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(coupon.id)}><Trash2 className="h-3 w-3 mr-1" />Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CouponsPage;
