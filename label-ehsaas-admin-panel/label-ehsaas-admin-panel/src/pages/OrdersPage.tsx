import { useState , useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Eye, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { db } from "@/services/firebaseConfig";
 import { doc, updateDoc } from "firebase/firestore";
 import { collection, onSnapshot } from "firebase/firestore";
const statusStyle: Record<string, string> = {
  pending: "bg-warning/15 text-warning border-warning/20",
  confirmed: "bg-info/15 text-info border-info/20",
  shipped: "bg-primary/15 text-primary border-primary/20",
  delivered: "bg-success/15 text-success border-success/20",
  cancelled: "bg-destructive/15 text-destructive border-destructive/20",
};

const paymentStyle: Record<string, string> = {
  paid: "bg-emerald-500/15 text-emerald-600 border-emerald-500/20",
  unpaid: "bg-amber-500/15 text-amber-600 border-amber-500/20",
  refunded: "bg-red-500/15 text-red-600 border-red-500/20",
};

const STATUS_FLOW: Order["status"][] = ["pending", "confirmed", "shipped", "delivered"];

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const { toast } = useToast();

  const filtered = orders.filter(o =>
    (filterStatus === "all" || o.status === filterStatus) &&
    (o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase()))
  );

 



const updateStatus = async (id: string, status: Order["status"]) => {
  try {
    const docRef = doc(db, "orders", id);
    await updateDoc(docRef, { status });

    toast({ title: `Order ${id} updated to ${status}` });
  } catch (err) {
    console.error(err);
    toast({ title: "Failed to update status" });
  }
};

  const getNextStatus = (current: Order["status"]): Order["status"] | null => {
    const idx = STATUS_FLOW.indexOf(current);
    if (idx === -1 || idx === STATUS_FLOW.length - 1) return null;
    return STATUS_FLOW[idx + 1];
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    confirmed: orders.filter(o => o.status === "confirmed").length,
    shipped: orders.filter(o => o.status === "shipped").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  };
useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // ✅ FIX: handle Firestore Timestamp properly
    data.sort((a: any, b: any) => {
      const dateA = a.date?.seconds ? a.date.seconds : 0;
      const dateB = b.date?.seconds ? b.date.seconds : 0;
      return dateB - dateA; // latest first
    });

    setOrders(data);
  });

  return () => unsubscribe();
}, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold">Orders</h1>
        <p className="text-muted-foreground text-sm mt-1">{orders.length} total orders</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: "Total", value: stats.total, color: "" },
          { label: "Pending", value: stats.pending, color: "text-amber-600" },
          { label: "Confirmed", value: stats.confirmed, color: "text-blue-600" },
          { label: "Shipped", value: stats.shipped, color: "text-primary" },
          { label: "Delivered", value: stats.delivered, color: "text-emerald-600" },
        ].map(s => (
          <Card key={s.label} className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table */}
      <Card className="border-0 shadow-sm hidden md:block">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Products</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Total</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Payment</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => {
                  const next = getNextStatus(order.status);
                  return (
                    <tr key={order.id} className="border-b last:border-0 hover:bg-muted/20">
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>{order.customer}</div>
                        <div className="text-xs text-muted-foreground">{order.email}</div>
                      </td>
                      <td className="py-3 px-4 text-xs text-muted-foreground max-w-[150px] truncate">{order.products?.map((p: any) => p.name).join(", ")}</td>
                      <td className="py-3 px-4 font-medium">₹{order.total?.toLocaleString?.() || 0}</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={paymentStyle[order.paymentStatus]}>{order.paymentStatus}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={statusStyle[order.status]}>{order.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedOrder(order)}><Eye className="h-4 w-4" /></Button>
                          {next && (
                            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => updateStatus(order.id, next)}>
                              {next} <ChevronRight className="h-3 w-3 ml-1" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(order => {
          const next = getNextStatus(order.status);
          return (
            <Card key={order.id} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer} · {order.date}</p>
                  </div>
                  <Badge variant="outline" className={statusStyle[order.status]}>{order.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2 truncate">{order.products?.map((p: any) => `${p.name} (x${p.quantity})`).join(", ")}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                  <div className="flex gap-3">
                    <span className="font-semibold">₹{order.total?.toLocaleString?.() || 0}</span>
                    <Badge variant="outline" className={`${paymentStyle[order.paymentStatus]} text-[10px]`}>{order.paymentStatus}</Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}><Eye className="h-3 w-3 mr-1" />View</Button>
                    {next && <Button variant="outline" size="sm" className="text-xs" onClick={() => updateStatus(order.id, next)}>{next}</Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No orders found</p>}

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle className="font-display">Order Details</DialogTitle></DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Order ID:</span><p className="font-medium">{selectedOrder.id}</p></div>
                <div><span className="text-muted-foreground">Date:</span><p className="font-medium">{selectedOrder.date}</p></div>
                <div><span className="text-muted-foreground">Customer:</span><p className="font-medium">{selectedOrder.customer}</p></div>
                <div><span className="text-muted-foreground">Email:</span><p className="font-medium">{selectedOrder.email}</p></div>
                <div><span className="text-muted-foreground">Payment:</span><p className="font-medium">{selectedOrder.paymentMethod}</p></div>
                <div><span className="text-muted-foreground">Payment Status:</span><Badge variant="outline" className={paymentStyle[selectedOrder.paymentStatus]}>{selectedOrder.paymentStatus}</Badge></div>
                <div className="col-span-2"><span className="text-muted-foreground">Products:</span>
                  <div className="flex flex-wrap gap-1 mt-1">{selectedOrder.products.map((p: any, i: number) => (
  <Badge key={i}>{p.name} (x{p.quantity})</Badge>
))}</div>
                </div>
                <div><span className="text-muted-foreground">Total:</span><p className="font-bold text-lg">₹{Number(selectedOrder?.total || 0).toLocaleString("en-IN")}</p></div>
                <div><span className="text-muted-foreground">Status:</span><Badge variant="outline" className={statusStyle[selectedOrder.status]}>{selectedOrder.status}</Badge></div>
              </div>

              {/* Status Flow */}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-3">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {STATUS_FLOW.map(s => (
                    <Button key={s} variant={selectedOrder.status === s ? "default" : "outline"} size="sm"
                      onClick={() => updateStatus(selectedOrder.id, s)} disabled={selectedOrder.status === "cancelled"}>
                      {s}
                    </Button>
                  ))}
                  <Button variant="outline" size="sm" className="text-destructive"
                    onClick={() => updateStatus(selectedOrder.id, "cancelled")} disabled={selectedOrder.status === "cancelled" || selectedOrder.status === "delivered"}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrdersPage;
