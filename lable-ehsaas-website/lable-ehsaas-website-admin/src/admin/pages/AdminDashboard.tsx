import { DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, orders, customers, revenueData } from "../data/dummyData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const stats = [
  { label: "Total Revenue", value: "₹6,48,000", change: "+12.5%", up: true, icon: DollarSign, color: "bg-secondary" },
  { label: "Total Orders", value: orders.length.toString(), change: "+8.2%", up: true, icon: ShoppingCart, color: "bg-secondary" },
  { label: "Total Customers", value: customers.length.toString(), change: "+15.3%", up: true, icon: Users, color: "bg-secondary" },
  { label: "Products", value: products.length.toString(), change: "-2.1%", up: false, icon: Package, color: "bg-muted" },
];

const statusColor: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const AdminDashboard = () => {
  const lowStock = products.filter((p) => p.stock <= 5);
  const topProducts = [...products].sort((a, b) => (b.discountPrice || b.price) * (b.bestseller ? 2 : 1) - (a.discountPrice || a.price) * (a.bestseller ? 2 : 1)).slice(0, 5);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Welcome back to Ehsaas Label CMS</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="border-border">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</p>
                  <p className="text-2xl font-heading font-bold text-foreground mt-1">{s.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {s.up ? <TrendingUp className="h-3 w-3 text-green-600" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
                    <span className={`text-xs font-medium ${s.up ? "text-green-600" : "text-destructive"}`}>{s.change}</span>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-full ${s.color} flex items-center justify-center`}>
                  <s.icon className="h-4 w-4 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-body font-medium">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip formatter={(v: number) => [`₹${(v / 1000).toFixed(0)}K`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-body font-medium">Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip formatter={(v: number) => [`₹${(v / 1000).toFixed(0)}K`, "Sales"]} />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--pink-dark))" strokeWidth={2} dot={{ fill: "hsl(var(--pink-dark))", r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-body font-medium">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="text-left py-2 font-medium">Order</th>
                    <th className="text-left py-2 font-medium">Customer</th>
                    <th className="text-left py-2 font-medium hidden sm:table-cell">Total</th>
                    <th className="text-left py-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="border-b border-border last:border-0">
                      <td className="py-2.5 font-medium text-foreground">{o.id}</td>
                      <td className="py-2.5 text-muted-foreground">{o.customer}</td>
                      <td className="py-2.5 hidden sm:table-cell text-foreground">₹{o.total.toLocaleString()}</td>
                      <td className="py-2.5">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[o.status]}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-body font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" /> Low Stock
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {lowStock.length === 0 && <p className="text-sm text-muted-foreground">All products well-stocked</p>}
              {lowStock.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground truncate max-w-[160px]">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.sku}</p>
                  </div>
                  <Badge variant={p.stock === 0 ? "destructive" : "secondary"} className="text-xs">
                    {p.stock === 0 ? "Out of stock" : `${p.stock} left`}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-body font-medium">Top Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topProducts.slice(0, 4).map((p, i) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground w-4">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">₹{(p.discountPrice || p.price).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
