import { useState } from "react";
import { Search, Eye, Download, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { orders as initialOrders, type Order } from "../data/dummyData";

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const paymentColor: Record<string, string> = {
  paid: "bg-green-100 text-green-700",
  unpaid: "bg-amber-100 text-amber-700",
  refunded: "bg-red-100 text-red-700",
};

const AdminOrders = () => {
  const [orderList, setOrderList] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  const filtered = orderList.filter((o) => {
    const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = (orderId: string, status: Order["status"]) => {
    setOrderList((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    if (selectedOrder?.id === orderId) setSelectedOrder({ ...selectedOrder, status });
    toast({ title: `Order ${orderId} updated to ${status}` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground mt-1">{orderList.length} orders</p>
      </div>

      <Card className="border-border">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by ID or customer..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
                  <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-4 font-medium text-muted-foreground">Order</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Customer</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Total</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Payment</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Date</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-foreground">{o.id}</td>
                    <td className="p-4 text-muted-foreground hidden sm:table-cell">{o.customer}</td>
                    <td className="p-4 font-medium text-foreground">₹{o.total.toLocaleString()}</td>
                    <td className="p-4 hidden md:table-cell">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${paymentColor[o.paymentStatus]}`}>{o.paymentStatus}</span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[o.status]}`}>{o.status}</span>
                    </td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">{o.createdAt}</td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedOrder(o)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <p className="text-center py-8 text-muted-foreground">No orders found</p>}
          </div>
        </CardContent>
      </Card>

      {/* Order detail dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Order {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Customer</p>
                  <p className="font-medium text-foreground">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{selectedOrder.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground">{selectedOrder.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium text-foreground">{selectedOrder.createdAt}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Address</p>
                  <p className="font-medium text-foreground">{selectedOrder.address}</p>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <p className="text-sm font-medium text-foreground mb-2">Products</p>
                {selectedOrder.products.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-1">
                    <span className="text-muted-foreground">{item.name} × {item.qty}</span>
                    <span className="text-foreground">₹{item.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex justify-between text-sm font-semibold pt-2 border-t border-border mt-2">
                  <span>Total</span>
                  <span>₹{selectedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="border-t border-border pt-3">
                <p className="text-sm font-medium text-foreground mb-2">Update Status</p>
                <Select value={selectedOrder.status} onValueChange={(v) => updateStatus(selectedOrder.id, v as Order["status"])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["pending", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline" className="w-full gap-2" onClick={() => toast({ title: "Invoice downloaded" })}>
                <Download className="h-4 w-4" /> Download Invoice
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminOrders;
