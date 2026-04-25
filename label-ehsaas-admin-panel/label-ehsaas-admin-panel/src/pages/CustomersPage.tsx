
import { useState, useEffect } from "react";
import { db } from "@/services/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Mail, Phone } from "lucide-react";

const CustomersPage = () => {
  const [search, setSearch] = useState("");
  const [customers, setCustomers] = useState<any[]>([]);
  
useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "customers"), (snapshot) => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    setCustomers(data);
  });

  return () => unsubscribe();
}, []);
const filtered = customers.filter(c =>
  (c.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
  (c.email?.toLowerCase() || "").includes(search.toLowerCase()) ||
  (c.city?.toLowerCase() || "").includes(search.toLowerCase())
);
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold">Customers</h1>
        <p className="text-muted-foreground text-sm mt-1">{customers.length} registered customers</p>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(customer => (
       <Card
  key={customer.id}
  className="border-0 shadow-sm hover:shadow-md transition-shadow rounded-2xl"
>
  <CardContent className="p-5">
    {/* Header */}
    <div className="flex items-center gap-3 mb-4">
      <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
        {customer.name?.[0]?.toUpperCase() || "U"}
      </div>

      <div>
        <h3 className="font-medium">
          {customer.name || "Unknown User"}
        </h3>

        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {customer.city || "No city"}
        </p>
      </div>
    </div>

    {/* Contact Info */}
    <div className="space-y-2 text-sm">
      <p className="flex items-center gap-2 text-muted-foreground">
        <Mail className="h-3.5 w-3.5" />
        {customer.email || "No email"}
      </p>

      <p className="flex items-center gap-2 text-muted-foreground">
        <Phone className="h-3.5 w-3.5" />
        {customer.phone || "No phone"}
      </p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t text-center">
      <div>
        <p className="text-xs text-muted-foreground">Orders</p>
        <p className="font-semibold">
          {customer.orders ?? 0}
        </p>
      </div>

      <div>
        <p className="text-xs text-muted-foreground">Spent</p>
        <p className="font-semibold">
          ₹{((customer.totalSpent ?? 0) / 1000).toFixed(1)}k
        </p>
      </div>

      <div>
        <p className="text-xs text-muted-foreground">Since</p>
        <p className="font-semibold text-xs">
          {customer.joinedAt
            ? new Date(customer.joinedAt).toISOString().slice(0, 7)
            : "N/A"}
        </p>
      </div>
    </div>
  </CardContent>
</Card>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No customers found</p>}
    </div>
  );
};

export default CustomersPage;
