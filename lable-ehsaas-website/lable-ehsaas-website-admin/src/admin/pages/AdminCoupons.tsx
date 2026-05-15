import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { coupons as initialCoupons, type Coupon } from "../data/dummyData";

const AdminCoupons = () => {
  const [couponList, setCouponList] = useState<Coupon[]>(initialCoupons);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCoupon, setEditCoupon] = useState<Coupon | null>(null);
  const [form, setForm] = useState({ code: "", type: "percentage" as "percentage" | "fixed", value: "", minOrder: "", expiresAt: "" });
  const { toast } = useToast();

  const openAdd = () => {
    setEditCoupon(null);
    setForm({ code: "", type: "percentage", value: "", minOrder: "", expiresAt: "" });
    setDialogOpen(true);
  };

  const openEdit = (c: Coupon) => {
    setEditCoupon(c);
    setForm({ code: c.code, type: c.type, value: c.value.toString(), minOrder: c.minOrder.toString(), expiresAt: c.expiresAt });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.code || !form.value) { toast({ title: "Missing fields", variant: "destructive" }); return; }
    const coupon: Coupon = {
      id: editCoupon?.id || `cp${Date.now()}`, code: form.code.toUpperCase(), type: form.type,
      value: Number(form.value), minOrder: Number(form.minOrder), expiresAt: form.expiresAt,
      active: editCoupon?.active ?? true, usedCount: editCoupon?.usedCount || 0,
    };
    if (editCoupon) {
      setCouponList((prev) => prev.map((c) => (c.id === editCoupon.id ? coupon : c)));
      toast({ title: "Coupon updated" });
    } else {
      setCouponList((prev) => [coupon, ...prev]);
      toast({ title: "Coupon created" });
    }
    setDialogOpen(false);
  };

  const toggleActive = (id: string) => {
    setCouponList((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground">Coupons</h1>
          <p className="text-sm text-muted-foreground mt-1">{couponList.length} coupons</p>
        </div>
        <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" /> Create Coupon</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {couponList.map((c) => (
          <Card key={c.id} className="border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-mono text-lg font-bold text-foreground tracking-wider">{c.code}</p>
                  <Badge variant={c.active ? "secondary" : "outline"} className="text-xs mt-1">
                    {c.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <Switch checked={c.active} onCheckedChange={() => toggleActive(c.id)} />
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Discount</span>
                  <span className="text-foreground font-medium">{c.type === "percentage" ? `${c.value}%` : `₹${c.value}`}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Min. Order</span>
                  <span className="text-foreground">₹{c.minOrder.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Expires</span>
                  <span className="text-foreground">{c.expiresAt}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Used</span>
                  <span className="text-foreground">{c.usedCount} times</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-3 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => openEdit(c)}>
                  <Edit className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive gap-1" onClick={() => {
                  setCouponList((prev) => prev.filter((cp) => cp.id !== c.id));
                  toast({ title: "Coupon deleted" });
                }}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">{editCoupon ? "Edit Coupon" : "Create Coupon"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Coupon Code *</Label>
              <Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="font-mono uppercase" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={(v: "percentage" | "fixed") => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Value *</Label>
                <Input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Min. Order Value</Label>
              <Input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })} />
            </div>
            <div>
              <Label>Expiry Date</Label>
              <Input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editCoupon ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCoupons;
