// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { dashboardStats, revenueData, orders, categoryDistribution, products, getStockStatus } from "@/lib/mock-data";
// // import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, AlertTriangle } from "lucide-react";
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// // import { Badge } from "@/components/ui/badge";

// // const COLORS = ["hsl(340,60%,65%)", "hsl(340,45%,75%)", "hsl(340,30%,82%)", "hsl(340,20%,88%)", "hsl(340,15%,92%)"];

// // const statCards = [
// //   { title: "Total Revenue", value: `₹${dashboardStats.totalRevenue.toLocaleString()}`, growth: dashboardStats.revenueGrowth, icon: DollarSign },
// //   { title: "Total Orders", value: dashboardStats.totalOrders, growth: dashboardStats.orderGrowth, icon: ShoppingCart },
// //   { title: "Customers", value: dashboardStats.totalCustomers, growth: dashboardStats.customerGrowth, icon: Users },
// //   { title: "Products", value: dashboardStats.totalProducts, growth: dashboardStats.productGrowth, icon: Package },
// // ];

// // const statusColor: Record<string, string> = {
// //   pending: "bg-warning/15 text-warning border-warning/20",
// //   confirmed: "bg-info/15 text-info border-info/20",
// //   shipped: "bg-primary/15 text-primary border-primary/20",
// //   delivered: "bg-success/15 text-success border-success/20",
// //   cancelled: "bg-destructive/15 text-destructive border-destructive/20",
// // };

// // const lowStockProducts = products.filter(p => {
// //   const s = getStockStatus(p);
// //   return s === "low_stock" || s === "out_of_stock";
// // }).sort((a, b) => a.totalStock - b.totalStock);

// // const DashboardPage = () => (
// //   <div className="space-y-6 animate-fade-in">
// //     <div>
// //       <h1 className="text-2xl md:text-3xl font-display font-bold">Dashboard</h1>
// //       <p className="text-muted-foreground text-sm mt-1">Welcome back to Label Ehsaas Admin</p>
// //     </div>

// //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //       {statCards.map((stat) => (
// //         <Card key={stat.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
// //           <CardContent className="p-5">
// //             <div className="flex items-center justify-between">
// //               <div>
// //                 <p className="text-sm text-muted-foreground">{stat.title}</p>
// //                 <p className="text-2xl font-bold mt-1">{stat.value}</p>
// //                 <div className="flex items-center gap-1 mt-2">
// //                   {stat.growth > 0 ? <TrendingUp className="h-3 w-3 text-success" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
// //                   <span className={`text-xs font-medium ${stat.growth > 0 ? "text-success" : "text-destructive"}`}>{stat.growth}%</span>
// //                   <span className="text-xs text-muted-foreground">vs last month</span>
// //                 </div>
// //               </div>
// //               <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
// //                 <stat.icon className="h-6 w-6 text-primary" />
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       ))}
// //     </div>

// //     {/* Low Stock Alert */}
// //     {lowStockProducts.length > 0 && (
// //       <Card className="border-0 shadow-sm border-l-4 border-l-amber-500">
// //         <CardHeader className="pb-2">
// //           <CardTitle className="text-sm font-display flex items-center gap-2">
// //             <AlertTriangle className="h-4 w-4 text-amber-600" />
// //             Low Stock Alert ({lowStockProducts.length} products)
// //           </CardTitle>
// //         </CardHeader>
// //         <CardContent>
// //           <div className="flex flex-wrap gap-2">
// //             {lowStockProducts.map(p => (
// //               <Badge key={p.id} variant="outline" className={`${p.totalStock === 0 ? "bg-red-500/10 text-red-600 border-red-500/20" : "bg-amber-500/10 text-amber-600 border-amber-500/20"}`}>
// //                 {p.name}: {p.totalStock === 0 ? "Out of stock" : `${p.totalStock} left`}
// //               </Badge>
// //             ))}
// //           </div>
// //         </CardContent>
// //       </Card>
// //     )}

// //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //       <Card className="lg:col-span-2 border-0 shadow-sm">
// //         <CardHeader><CardTitle className="font-display">Revenue Overview</CardTitle></CardHeader>
// //         <CardContent>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <BarChart data={revenueData}>
// //               <XAxis dataKey="month" tick={{ fontSize: 12 }} />
// //               <YAxis tick={{ fontSize: 12 }} />
// //               <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
// //               <Bar dataKey="revenue" fill="hsl(340,60%,65%)" radius={[6, 6, 0, 0]} />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </CardContent>
// //       </Card>

// //       <Card className="border-0 shadow-sm">
// //         <CardHeader><CardTitle className="font-display">Sales by Category</CardTitle></CardHeader>
// //         <CardContent>
// //           <ResponsiveContainer width="100%" height={220}>
// //             <PieChart>
// //               <Pie data={categoryDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
// //                 {categoryDistribution.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
// //               </Pie>
// //               <Tooltip />
// //             </PieChart>
// //           </ResponsiveContainer>
// //           <div className="flex flex-wrap gap-2 mt-2 justify-center">
// //             {categoryDistribution.map((c, i) => (
// //               <div key={c.name} className="flex items-center gap-1.5 text-xs">
// //                 <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
// //                 <span className="text-muted-foreground">{c.name}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>

// //     <Card className="border-0 shadow-sm">
// //       <CardHeader><CardTitle className="font-display">Recent Orders</CardTitle></CardHeader>
// //       <CardContent>
// //         <div className="overflow-x-auto">
// //           <table className="w-full text-sm">
// //             <thead>
// //               <tr className="border-b">
// //                 <th className="text-left py-3 px-2 font-medium text-muted-foreground">Order</th>
// //                 <th className="text-left py-3 px-2 font-medium text-muted-foreground">Customer</th>
// //                 <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
// //                 <th className="text-left py-3 px-2 font-medium text-muted-foreground">Total</th>
// //                 <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {orders.slice(0, 5).map((order) => (
// //                 <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30">
// //                   <td className="py-3 px-2 font-medium">{order.id}</td>
// //                   <td className="py-3 px-2">{order.customer}</td>
// //                   <td className="py-3 px-2 hidden sm:table-cell text-muted-foreground">{order.date}</td>
// //                   <td className="py-3 px-2">₹{order.total.toLocaleString()}</td>
// //                   <td className="py-3 px-2">
// //                     <Badge variant="outline" className={statusColor[order.status]}>{order.status}</Badge>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </CardContent>
// //     </Card>
// //   </div>
// // );

// // export default DashboardPage;
// import { useEffect } from "react";
// import { testFirestoreConnection } from "@/services/firebaseConfig";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { dashboardStats, revenueData, orders, categoryDistribution, products, getStockStatus } from "@/lib/mock-data";
// import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, AlertTriangle } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// import { Badge } from "@/components/ui/badge";

// const COLORS = ["hsl(340,60%,65%)", "hsl(340,45%,75%)", "hsl(340,30%,82%)", "hsl(340,20%,88%)", "hsl(340,15%,92%)"];

// const statCards = [
//   { title: "Total Revenue", value: `₹${dashboardStats.totalRevenue.toLocaleString()}`, growth: dashboardStats.revenueGrowth, icon: DollarSign },
//   { title: "Total Orders", value: dashboardStats.totalOrders, growth: dashboardStats.orderGrowth, icon: ShoppingCart },
//   { title: "Customers", value: dashboardStats.totalCustomers, growth: dashboardStats.customerGrowth, icon: Users },
//   { title: "Products", value: dashboardStats.totalProducts, growth: dashboardStats.productGrowth, icon: Package },
// ];

// const statusColor: Record<string, string> = {
//   pending: "bg-warning/15 text-warning border-warning/20",
//   confirmed: "bg-info/15 text-info border-info/20",
//   shipped: "bg-primary/15 text-primary border-primary/20",
//   delivered: "bg-success/15 text-success border-success/20",
//   cancelled: "bg-destructive/15 text-destructive border-destructive/20",
// };

// const lowStockProducts = products
//   .filter(p => ["low_stock", "out_of_stock"].includes(getStockStatus(p)))
//   .sort((a, b) => a.totalStock - b.totalStock);

// const DashboardPage = () => {

//   // ✅ FIRESTORE TEST (will log SUCCESS or FAILED in console)
//   useEffect(() => {
//     testFirestoreConnection();
//   }, []);

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div>
//         <h1 className="text-2xl md:text-3xl font-display font-bold">Dashboard</h1>
//         <p className="text-muted-foreground text-sm mt-1">Welcome back to Label Ehsaas Admin</p>
//       </div>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {statCards.map((stat) => (
//           <Card key={stat.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
//             <CardContent className="p-5">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">{stat.title}</p>
//                   <p className="text-2xl font-bold mt-1">{stat.value}</p>
//                   <div className="flex items-center gap-1 mt-2">
//                     {stat.growth > 0 ? <TrendingUp className="h-3 w-3 text-success" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
//                     <span className={`text-xs font-medium ${stat.growth > 0 ? "text-success" : "text-destructive"}`}>
//                       {stat.growth}%
//                     </span>
//                     <span className="text-xs text-muted-foreground">vs last month</span>
//                   </div>
//                 </div>
//                 <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
//                   <stat.icon className="h-6 w-6 text-primary" />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Low Stock Alert */}
//       {lowStockProducts.length > 0 && (
//         <Card className="border-0 shadow-sm border-l-4 border-l-amber-500">
//           <CardHeader className="pb-2">
//             <CardTitle className="text-sm font-display flex items-center gap-2">
//               <AlertTriangle className="h-4 w-4 text-amber-600" />
//               Low Stock Alert ({lowStockProducts.length} products)
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-wrap gap-2">
//               {lowStockProducts.map(p => (
//                 <Badge
//                   key={p.id}
//                   variant="outline"
//                   className={`${
//                     p.totalStock === 0
//                       ? "bg-red-500/10 text-red-600 border-red-500/20"
//                       : "bg-amber-500/10 text-amber-600 border-amber-500/20"
//                   }`}
//                 >
//                   {p.name}: {p.totalStock === 0 ? "Out of stock" : `${p.totalStock} left`}
//                 </Badge>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <Card className="lg:col-span-2 border-0 shadow-sm">
//           <CardHeader><CardTitle className="font-display">Revenue Overview</CardTitle></CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={revenueData}>
//                 <XAxis dataKey="month" tick={{ fontSize: 12 }} />
//                 <YAxis tick={{ fontSize: 12 }} />
//                 <Tooltip formatter={(v: number) => `₹${v.toLocaleString()}`} />
//                 <Bar dataKey="revenue" fill="hsl(340,60%,65%)" radius={[6, 6, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card className="border-0 shadow-sm">
//           <CardHeader><CardTitle className="font-display">Sales by Category</CardTitle></CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={220}>
//               <PieChart>
//                 <Pie
//                   data={categoryDistribution}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={50}
//                   outerRadius={80}
//                   paddingAngle={4}
//                   dataKey="value"
//                 >
//                   {categoryDistribution.map((_, i) => (
//                     <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//             <div className="flex flex-wrap gap-2 mt-2 justify-center">
//               {categoryDistribution.map((c, i) => (
//                 <div key={c.name} className="flex items-center gap-1.5 text-xs">
//                   <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
//                   <span className="text-muted-foreground">{c.name}</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Orders */}
//       <Card className="border-0 shadow-sm">
//         <CardHeader><CardTitle className="font-display">Recent Orders</CardTitle></CardHeader>
//         <CardContent>
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b">
//                   <th className="text-left py-3 px-2 font-medium text-muted-foreground">Order</th>
//                   <th className="text-left py-3 px-2 font-medium text-muted-foreground">Customer</th>
//                   <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden sm:table-cell">Date</th>
//                   <th className="text-left py-3 px-2 font-medium text-muted-foreground">Total</th>
//                   <th className="text-left py-3 px-2 font-medium text-muted-foreground">Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.slice(0, 5).map((order) => (
//                   <tr key={order.id} className="border-b last:border-0 hover:bg-muted/30">
//                     <td className="py-3 px-2 font-medium">{order.id}</td>
//                     <td className="py-3 px-2">{order.customer}</td>
//                     <td className="py-3 px-2 hidden sm:table-cell text-muted-foreground">{order.date}</td>
//                     <td className="py-3 px-2">₹{order.total.toLocaleString()}</td>
//                     <td className="py-3 px-2">
//                       <Badge variant="outline" className={statusColor[order.status]}>
//                         {order.status}
//                       </Badge>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default DashboardPage;
import { useEffect, useState } from "react";
import { testFirestoreConnection, db } from "@/services/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  AlertTriangle,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { Badge } from "@/components/ui/badge";

/* ---------------- COLORS (UNCHANGED UI) ---------------- */
const COLORS = [
  "hsl(340,60%,65%)",
  "hsl(340,45%,75%)",
  "hsl(340,30%,82%)",
  "hsl(340,20%,88%)",
  "hsl(340,15%,92%)",
];

/* ---------------- STOCK STATUS ---------------- */
const getStockStatus = (p: any) => {
  if (p.totalStock === 0) return "out_of_stock";
  if (p.totalStock < 5) return "low_stock";
  return "in_stock";
};

export default function DashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  /* ---------------- FIRESTORE REAL-TIME ---------------- */
  useEffect(() => {
    testFirestoreConnection();

    const unsubOrders = onSnapshot(collection(db, "orders"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    });

    const unsubProducts = onSnapshot(collection(db, "products"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    });

    return () => {
      unsubOrders();
      unsubProducts();
    };
  }, []);

  /* ---------------- SAME UI CALCULATIONS ---------------- */
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.total || o.amount || 0),
    0
  );

  const statCards = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      growth: 12,
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: orders.length,
      growth: 8,
      icon: ShoppingCart,
    },
    {
      title: "Customers",
      value: new Set(orders.map((o) => o.customer)).size,
      growth: 5,
      icon: Users,
    },
    {
      title: "Products",
      value: products.length,
      growth: 3,
      icon: Package,
    },
  ];

  /* ---------------- LOW STOCK (UNCHANGED UI) ---------------- */
  const lowStockProducts = products
    .filter((p) =>
      ["low_stock", "out_of_stock"].includes(getStockStatus(p))
    )
    .sort((a, b) => a.totalStock - b.totalStock);

  /* ---------------- CHART DATA (LIVE) ---------------- */
  const revenueData = Object.values(
    orders.reduce((acc: any, order) => {
      const date = order.createdAt?.seconds
        ? new Date(order.createdAt.seconds * 1000)
        : new Date();

      const month = date.toLocaleString("default", {
        month: "short",
      });

      if (!acc[month]) acc[month] = { month, revenue: 0 };
      acc[month].revenue += order.total || order.amount || 0;

      return acc;
    }, {})
  );

  const categoryMap: Record<string, number> = {};
  products.forEach((p) => {
    categoryMap[p.category] =
      (categoryMap[p.category] || 0) + 1;
  });

  const categoryDistribution = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  /* ---------------- STATUS COLORS (UNCHANGED) ---------------- */
  const statusColor: Record<string, string> = {
    pending: "bg-warning/15 text-warning border-warning/20",
    confirmed: "bg-info/15 text-info border-info/20",
    shipped: "bg-primary/15 text-primary border-primary/20",
    delivered: "bg-success/15 text-success border-success/20",
    cancelled:
      "bg-destructive/15 text-destructive border-destructive/20",
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* HEADER (UNCHANGED UI) */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back to Label Ehsaas Admin
        </p>
      </div>

      {/* STAT CARDS (UNCHANGED UI) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card
            key={stat.title}
            className="border-0 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold mt-1">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.growth > 0 ? (
                      <TrendingUp className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        stat.growth > 0
                          ? "text-success"
                          : "text-destructive"
                      }`}
                    >
                      {stat.growth}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      vs last month
                    </span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* LOW STOCK (UNCHANGED UI) */}
      {lowStockProducts.length > 0 && (
        <Card className="border-0 shadow-sm border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-display flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              Low Stock Alert ({lowStockProducts.length} products)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {lowStockProducts.map((p) => (
                <Badge
                  key={p.id}
                  variant="outline"
                  className={
                    p.totalStock === 0
                      ? "bg-red-500/10 text-red-600 border-red-500/20"
                      : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                  }
                >
                  {p.name}:{" "}
                  {p.totalStock === 0
                    ? "Out of stock"
                    : `${p.totalStock} left`}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* CHARTS (UNCHANGED UI) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(v: number) =>
                    `₹${v.toLocaleString()}`
                  }
                />
                <Bar
                  dataKey="revenue"
                  fill="hsl(340,60%,65%)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="font-display">
              Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryDistribution.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* RECENT ORDERS (UNCHANGED UI, NOW LIVE) */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="font-display">
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                    Order
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                    Total
                  </th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="py-3 px-2 font-medium">
                      {order.id}
                    </td>
                    <td className="py-3 px-2">
                      {order.customer}
                    </td>
                    <td className="py-3 px-2 hidden sm:table-cell text-muted-foreground">
                      {order.date}
                    </td>
                    <td className="py-3 px-2">
                      ₹{(order.total || order.amount || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-2">
                      <Badge
                        variant="outline"
                        className={statusColor[order.status]}
                      >
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}