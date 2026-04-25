import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { revenueData, categoryRevenueData, orders, customers, products } from "../data/dummyData";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
} from "recharts";

const COLORS = [
  "hsl(340, 90%, 92%)", "hsl(340, 60%, 75%)", "hsl(40, 45%, 60%)",
  "hsl(0, 0%, 85%)", "hsl(340, 30%, 96%)", "hsl(0, 0%, 70%)",
];

const customerGrowth = [
  { month: "Oct", customers: 120 },
  { month: "Nov", customers: 145 },
  { month: "Dec", customers: 189 },
  { month: "Jan", customers: 210 },
  { month: "Feb", customers: 248 },
  { month: "Mar", customers: 290 },
];

const ordersByStatus = [
  { name: "Pending", value: orders.filter((o) => o.status === "pending").length },
  { name: "Confirmed", value: orders.filter((o) => o.status === "confirmed").length },
  { name: "Shipped", value: orders.filter((o) => o.status === "shipped").length },
  { name: "Delivered", value: orders.filter((o) => o.status === "delivered").length },
  { name: "Cancelled", value: orders.filter((o) => o.status === "cancelled").length },
];

const AdminAnalytics = () => (
  <div className="space-y-6 animate-fade-in">
    <div>
      <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground">Analytics</h1>
      <p className="text-sm text-muted-foreground mt-1">Sales, revenue & customer insights</p>
    </div>

    {/* Summary cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Total Revenue", value: "₹6,48,000" },
        { label: "Avg. Order Value", value: `₹${Math.round(orders.reduce((s, o) => s + o.total, 0) / orders.length).toLocaleString()}` },
        { label: "Total Customers", value: customers.length.toString() },
        { label: "Products", value: products.length.toString() },
      ].map((s) => (
        <Card key={s.label} className="border-border">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className="text-xl font-heading font-bold text-foreground mt-1">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="border-border">
        <CardHeader className="pb-2"><CardTitle className="text-base font-body font-medium">Revenue by Month</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip formatter={(v: number) => [`₹${(v / 1000).toFixed(0)}K`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" fill="hsl(var(--secondary))" stroke="hsl(var(--pink-dark))" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="pb-2"><CardTitle className="text-base font-body font-medium">Revenue by Category</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryRevenueData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name }) => name}>
                  {categoryRevenueData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v: number) => [`₹${(v / 1000).toFixed(0)}K`, "Revenue"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="pb-2"><CardTitle className="text-base font-body font-medium">Customer Growth</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="customers" stroke="hsl(var(--pink-dark))" strokeWidth={2} dot={{ fill: "hsl(var(--pink-dark))", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardHeader className="pb-2"><CardTitle className="text-base font-body font-medium">Orders by Status</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ordersByStatus} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={80} />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default AdminAnalytics;
