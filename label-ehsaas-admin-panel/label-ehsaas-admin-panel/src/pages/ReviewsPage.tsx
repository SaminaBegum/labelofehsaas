// import { useState, useMemo } from "react";
// import { reviews as initialReviews, Review } from "@/lib/mock-data";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Search, Star, Check, X, Trash2 } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const ReviewsPage = () => {
//   const [reviews, setReviews] = useState<Review[]>(initialReviews);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("all");
//   const { toast } = useToast();

//   const filtered = useMemo(() => reviews.filter(r => {
//     const matchFilter = filter === "all" || (filter === "approved" && r.approved) || (filter === "pending" && !r.approved);
//     const q = search.toLowerCase();
//     return matchFilter && (r.productName.toLowerCase().includes(q) || r.customerName.toLowerCase().includes(q) || r.comment.toLowerCase().includes(q));
//   }), [reviews, filter, search]);

//   const stats = useMemo(() => {
//     const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0";
//     return { total: reviews.length, approved: reviews.filter(r => r.approved).length, pending: reviews.filter(r => !r.approved).length, avgRating: avg };
//   }, [reviews]);

//   const toggleApproval = (id: string) => {
//     setReviews(reviews.map(r => r.id === id ? { ...r, approved: !r.approved } : r));
//     toast({ title: "Review status updated" });
//   };

//   const handleDelete = (id: string) => {
//     setReviews(reviews.filter(r => r.id !== id));
//     toast({ title: "Review deleted", variant: "destructive" });
//   };

//   const renderStars = (rating: number) => (
//     <div className="flex gap-0.5">
//       {[1, 2, 3, 4, 5].map(i => (
//         <Star key={i} className={`h-3.5 w-3.5 ${i <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
//       ))}
//     </div>
//   );

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div>
//         <h1 className="text-2xl md:text-3xl font-display font-bold">Reviews</h1>
//         <p className="text-muted-foreground text-sm mt-1">Manage product reviews and ratings</p>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//         <Card className="border-0 shadow-sm"><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{stats.total}</p><p className="text-xs text-muted-foreground">Total Reviews</p></CardContent></Card>
//         <Card className="border-0 shadow-sm"><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-emerald-600">{stats.approved}</p><p className="text-xs text-muted-foreground">Approved</p></CardContent></Card>
//         <Card className="border-0 shadow-sm"><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-amber-600">{stats.pending}</p><p className="text-xs text-muted-foreground">Pending</p></CardContent></Card>
//         <Card className="border-0 shadow-sm"><CardContent className="p-4 text-center">
//           <div className="flex items-center justify-center gap-1">
//             <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
//             <p className="text-2xl font-bold">{stats.avgRating}</p>
//           </div>
//           <p className="text-xs text-muted-foreground">Avg Rating</p>
//         </CardContent></Card>
//       </div>

//       {/* Search & Filter */}
//       <div className="flex flex-col sm:flex-row gap-3">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//           <Input className="pl-9" placeholder="Search reviews..." value={search} onChange={e => setSearch(e.target.value)} />
//         </div>
//         <Select value={filter} onValueChange={setFilter}>
//           <SelectTrigger className="w-full sm:w-40"><SelectValue /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Reviews</SelectItem>
//             <SelectItem value="approved">Approved</SelectItem>
//             <SelectItem value="pending">Pending</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Desktop Table */}
//       <div className="hidden md:block rounded-xl border shadow-sm overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-muted/50">
//               <TableHead>Product</TableHead>
//               <TableHead>Customer</TableHead>
//               <TableHead>Rating</TableHead>
//               <TableHead>Comment</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {filtered.map(review => (
//               <TableRow key={review.id}>
//                 <TableCell className="font-medium text-sm">{review.productName}</TableCell>
//                 <TableCell className="text-sm">{review.customerName}</TableCell>
//                 <TableCell>{renderStars(review.rating)}</TableCell>
//                 <TableCell className="max-w-[200px] text-sm text-muted-foreground truncate">{review.comment}</TableCell>
//                 <TableCell className="text-sm text-muted-foreground">{review.date}</TableCell>
//                 <TableCell>
//                   <Badge variant="outline" className={review.approved ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/20" : "bg-amber-500/15 text-amber-600 border-amber-500/20"}>
//                     {review.approved ? "Approved" : "Pending"}
//                   </Badge>
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <div className="flex gap-1 justify-end">
//                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleApproval(review.id)}>
//                       {review.approved ? <X className="h-3.5 w-3.5 text-amber-600" /> : <Check className="h-3.5 w-3.5 text-emerald-600" />}
//                     </Button>
//                     <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(review.id)}>
//                       <Trash2 className="h-3.5 w-3.5" />
//                     </Button>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="md:hidden space-y-3">
//         {filtered.map(review => (
//           <Card key={review.id} className="border-0 shadow-sm">
//             <CardContent className="p-4">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h3 className="font-medium text-sm">{review.productName}</h3>
//                   <p className="text-xs text-muted-foreground">{review.customerName} · {review.date}</p>
//                 </div>
//                 <Badge variant="outline" className={review.approved ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/20 text-[10px]" : "bg-amber-500/15 text-amber-600 border-amber-500/20 text-[10px]"}>
//                   {review.approved ? "Approved" : "Pending"}
//                 </Badge>
//               </div>
//               <div className="mt-2">{renderStars(review.rating)}</div>
//               <p className="text-sm text-muted-foreground mt-2">{review.comment}</p>
//               <div className="flex gap-1 mt-3 pt-3 border-t">
//                 <Button variant="outline" size="sm" onClick={() => toggleApproval(review.id)}>
//                   {review.approved ? <><X className="h-3 w-3 mr-1" />Unapprove</> : <><Check className="h-3 w-3 mr-1" />Approve</>}
//                 </Button>
//                 <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(review.id)}><Trash2 className="h-3 w-3 mr-1" />Delete</Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//       {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No reviews found</p>}
//     </div>
//   );
// };

// export default ReviewsPage;
import { useState, useEffect, useMemo } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Search, Star, Check, X, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/* ---------------- TYPES ---------------- */
type Review = {
  id: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  approved: boolean;
  date?: string;
};

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [productsMap, setProductsMap] = useState<Record<string, string>>({});
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  /* ---------------- FETCH FROM FIRESTORE ---------------- */
  useEffect(() => {
  const fetchProducts = async () => {
    const snap = await getDocs(collection(db, "products"));

    const map: Record<string, string> = {};

    snap.docs.forEach((doc) => {
      const data = doc.data();
      map[data.slug || doc.id] = data.name; // adjust if needed
    });

    setProductsMap(map);
  };

  fetchProducts();
}, []);
  useEffect(() => {
    const fetchReviews = async () => {
      const snap = await getDocs(collection(db, "reviews"));

     const data: Review[] = snap.docs.map((d) => {
  const r = d.data();

  return {
    id: d.id,
    productName:
      productsMap[r.productId] || r.productId || "Unknown Product",
    customerName: r.name || "Anonymous",
    rating: r.rating || 0,
    comment: r.comment || "",
    approved: r.approved ?? false,
    date: r.createdAt?.toDate?.().toLocaleDateString() || "",
  };
});

      setReviews(data);
    };

    fetchReviews();
  }, []);

  /* ---------------- FILTER ---------------- */
  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const matchFilter =
        filter === "all" ||
        (filter === "approved" && r.approved) ||
        (filter === "pending" && !r.approved);

      const q = search.toLowerCase();

      return (
        matchFilter &&
        (r.productName?.toLowerCase().includes(q) ||
          r.customerName?.toLowerCase().includes(q) ||
          r.comment?.toLowerCase().includes(q))
      );
    });
  }, [reviews, filter, search]);

  /* ---------------- STATS ---------------- */
  const stats = useMemo(() => {
    const avg = reviews.length
      ? (
          reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

    return {
      total: reviews.length,
      approved: reviews.filter((r) => r.approved).length,
      pending: reviews.filter((r) => !r.approved).length,
      avgRating: avg,
    };
  }, [reviews]);

  /* ---------------- APPROVE / UNAPPROVE ---------------- */
  const toggleApproval = async (id: string, current: boolean) => {
    await updateDoc(doc(db, "reviews", id), {
      approved: !current,
    });

    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, approved: !current } : r
      )
    );

    toast({ title: "Review status updated" });
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "reviews", id));

    setReviews((prev) => prev.filter((r) => r.id !== id));

    toast({ title: "Review deleted", variant: "destructive" });
  };

  /* ---------------- STARS ---------------- */
  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold">
          Reviews
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage product reviews and ratings
        </p>
      </div>

      {/* ---------------- STATS ---------------- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total Reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {stats.approved}
            </p>
            <p className="text-xs text-muted-foreground">Approved</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">
              {stats.pending}
            </p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center flex flex-col items-center">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <p className="text-2xl font-bold">{stats.avgRating}</p>
            </div>
            <p className="text-xs text-muted-foreground">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* ---------------- SEARCH + FILTER ---------------- */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reviews</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ---------------- TABLE ---------------- */}
      <div className="hidden md:block border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.map((review) => (
              <TableRow key={review.id}>
                <TableCell>{review.productName}</TableCell>
                <TableCell>{review.customerName}</TableCell>
                <TableCell>{renderStars(review.rating)}</TableCell>
                <TableCell className="max-w-[200px] truncate">
                  {review.comment}
                </TableCell>

                <TableCell>
                  <Badge
                    className={
                      review.approved
                        ? "bg-emerald-500/15 text-emerald-600"
                        : "bg-amber-500/15 text-amber-600"
                    }
                  >
                    {review.approved ? "Approved" : "Pending"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      toggleApproval(review.id, review.approved)
                    }
                  >
                    {review.approved ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Check className="h-4 w-4" />
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(review.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ---------------- MOBILE ---------------- */}
      <div className="md:hidden space-y-3">
        {filtered.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">
                    {review.productName}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {review.customerName}
                  </p>
                </div>

                <Badge
                  className={
                    review.approved
                      ? "bg-emerald-500/15 text-emerald-600"
                      : "bg-amber-500/15 text-amber-600"
                  }
                >
                  {review.approved ? "Approved" : "Pending"}
                </Badge>
              </div>

              <div className="mt-2">{renderStars(review.rating)}</div>

              <p className="text-sm mt-2 text-muted-foreground">
                {review.comment}
              </p>

              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    toggleApproval(review.id, review.approved)
                  }
                >
                  {review.approved ? "Unapprove" : "Approve"}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-500"
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-10">
          No reviews found
        </p>
      )}
    </div>
  );
};

export default ReviewsPage;