import { useState } from "react";
import { Search, Eye, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { customers, orders } from "../data/dummyData";

const AdminCustomers = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof customers[0] | null>(null);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase())
  );

  const customerOrders = selected ? orders.filter((o) => o.email === selected.email) : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground">Customers</h1>
        <p className="text-sm text-muted-foreground mt-1">{customers.length} customers</p>
      </div>

      <Card className="border-border">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden md:table-cell">Phone</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Orders</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Total Spent</th>
                  <th className="text-left p-4 font-medium text-muted-foreground hidden lg:table-cell">Joined</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.email}</p>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{c.phone}</td>
                    <td className="p-4 text-foreground hidden sm:table-cell">{c.orders}</td>
                    <td className="p-4 font-medium text-foreground">₹{c.totalSpent.toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">{c.joinedAt}</td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelected(c)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">{selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" /> {selected.email}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" /> {selected.phone}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Card className="border-border">
                  <CardContent className="p-3 text-center">
                    <p className="text-lg font-heading font-bold text-foreground">{selected.orders}</p>
                    <p className="text-xs text-muted-foreground">Orders</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-3 text-center">
                    <p className="text-lg font-heading font-bold text-foreground">₹{(selected.totalSpent / 1000).toFixed(1)}K</p>
                    <p className="text-xs text-muted-foreground">Spent</p>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardContent className="p-3 text-center">
                    <p className="text-lg font-heading font-bold text-foreground">{selected.joinedAt.slice(0, 7)}</p>
                    <p className="text-xs text-muted-foreground">Joined</p>
                  </CardContent>
                </Card>
              </div>
              {customerOrders.length > 0 && (
                <div className="border-t border-border pt-3">
                  <p className="text-sm font-medium text-foreground mb-2">Order History</p>
                  {customerOrders.map((o) => (
                    <div key={o.id} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium text-foreground">{o.id}</p>
                        <p className="text-xs text-muted-foreground">{o.createdAt}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-foreground">₹{o.total.toLocaleString()}</p>
                        <p className="text-xs capitalize text-muted-foreground">{o.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCustomers;
