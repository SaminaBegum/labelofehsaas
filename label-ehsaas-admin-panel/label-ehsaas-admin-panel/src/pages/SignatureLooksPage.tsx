import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, Gem } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

import {
  getAllSignatureLooks,
  addSignatureLook,
  updateSignatureLook,
  deleteSignatureLook,
} from "@/services/signatureLookService";

import { uploadToCloudinary } from "@/services/cloudinary";
interface SignatureLook {
  id: string;
  name: string;
  slug: string;
  productId: string; // 🔥 ADD THIS
  description: string;
  price: number;
 
  image: string;
  category: string;
  fabric: string;
  featured: boolean;
  showOnHomepage: boolean;
  createdAt: string;
}

const initialLooks: SignatureLook[] = [
  {
    id: "SL-001",
    name: "Royal Velvet Kurta Set",
    slug: "royal-velvet-kurta-set",
    productId: "prod_123", // 🔥 MUST MATCH FIRESTORE PRODUCT ID
    description: "Luxurious velvet kurta with intricate embroidery",
    price: 4999,

    image: "👑",
    category: "Kurta Sets",
    fabric: "Velvet",
    featured: true,
    showOnHomepage: true,
    createdAt: "2024-01-15",
  },
];

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function SignatureLooksPage() {

  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<SignatureLook | null>(null);
  const { toast } = useToast();
const [looks, setLooks] = useState<SignatureLook[]>([]);
const [loading, setLoading] = useState(true);
const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const emptyForm = { 
  name: "", 
  productId: "", // 🔥 ADD THIS
  description: "", 
  price: 0, 

  image: "", 
  category: "Ethnic Wear", 
  fabric: "", 
  featured: false, 
  showOnHomepage: true 
};
  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const filtered = looks.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditing(null); setForm(emptyForm); setImagePreview(null); setDialogOpen(true); };
  const openEdit = (l: SignatureLook) => {
    setEditing(l);
   setForm({ 
  name: l.name,
  productId: l.productId || "", // 🔥 ADD THIS
  description: l.description,
  price: l.price,

  image: l.image,
  category: l.category,
  fabric: l.fabric,
  featured: l.featured,
  showOnHomepage: l.showOnHomepage
});
    setImagePreview(null);
    setDialogOpen(true);
  };

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelectedFile(file); // ✅ IMPORTANT

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  }
};
useEffect(() => {
  const fetchLooks = async () => {
    try {
      const data = await getAllSignatureLooks();
      setLooks(data as SignatureLook[]);
    } catch (err) {
      toast({ title: "Failed to load looks", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  fetchLooks();
}, []);
 const handleSave = async () => {
  if (!form.name.trim()) {
    toast({ title: "Name required", variant: "destructive" });
    return;
  }

  let imageUrl = editing?.image || "";

  try {
    if (selectedFile) {
      imageUrl = await uploadToCloudinary(selectedFile);
    }
  } catch {
    toast({ title: "Image upload failed", variant: "destructive" });
    return;
  }

 const payload = {
  ...form,
  productId: form.productId, // 🔥 ADD THIS
  image: imageUrl,
  slug: generateSlug(form.name),
  createdAt: new Date().toISOString(),
};

  try {
    if (editing) {
      await updateSignatureLook(editing.id, payload);

      setLooks((prev) =>
        prev.map((l) =>
          l.id === editing.id ? { ...l, ...payload } : l
        )
      );

      toast({ title: "Updated successfully" });
    } else {
      const newLook = await addSignatureLook(payload);

      setLooks((prev) => [newLook as SignatureLook, ...prev]);

      toast({ title: "Added successfully" });
    }

    setDialogOpen(false);
  } catch (err: any) {
    toast({
      title: "Error saving data",
      description: err.message,
      variant: "destructive",
    });
  }
};
// const getDiscountPercent = (price: number, discountPrice: number) => {
//   if (!price || discountPrice >= price) return 0;

//   return Math.round(((price - discountPrice) / price) * 100);
// };
 const handleDelete = async (id: string) => {
  try {
    await deleteSignatureLook(id);

    setLooks((prev) => prev.filter((l) => l.id !== id));

    toast({ title: "Deleted successfully" });
  } catch {
    toast({ title: "Delete failed", variant: "destructive" });
  }
};
if (loading) {
  return <p className="text-center py-10">Loading Signature Looks...</p>;
}
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Signature Looks</h1>
          <p className="text-muted-foreground text-sm">Manage exclusive designer pieces for the Signature Looks section</p>
        </div>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" />Add Signature Look</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Looks", value: looks.length, icon: "💎" },
          { label: "Featured", value: looks.filter(l => l.featured).length, icon: "⭐" },
          { label: "On Homepage", value: looks.filter(l => l.showOnHomepage).length, icon: "🏠" },
          { label: "Avg Price", value: `₹${Math.round(looks.reduce((s, l) => s + l.price, 0) / (looks.length || 1))}`, icon: "💰" },
        ].map(s => (
          <Card key={s.label}><CardContent className="p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </CardContent></Card>
        ))}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search signature looks..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader><TableRow className="bg-muted/30">
            <TableHead>Look</TableHead><TableHead>Category</TableHead><TableHead>Fabric</TableHead>
            <TableHead>Price</TableHead><TableHead>Featured</TableHead><TableHead>Homepage</TableHead><TableHead className="text-right">Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filtered.map(l => (
              <TableRow key={l.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
  src={l.image}
  alt={l.name}
  className="h-12 w-12 rounded-lg object-cover"
/>
                    <div><div className="font-medium text-foreground">{l.name}</div><div className="text-xs text-muted-foreground">{l.description}</div></div>
                  </div>
                </TableCell>
                <TableCell><Badge variant="outline">{l.category}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{l.fabric}</TableCell>
                {/* <TableCell>
  <div>
    <div className="flex items-center gap-2">
      <p className="font-medium text-foreground">
        ₹{l.discountPrice.toLocaleString()}
      </p>

      {l.discountPrice < l.price && (
        <Badge className="text-[10px] bg-red-500/10 text-red-600">
          {getDiscountPercent(l.price, l.discountPrice)}% OFF
        </Badge>
      )}
    </div>

    {l.discountPrice < l.price && (
      <p className="text-xs text-muted-foreground line-through">
        ₹{l.price.toLocaleString()}
      </p>
    )}
  </div>
</TableCell> */}
                <TableCell>{l.featured ? <Badge className="bg-primary/10 text-primary border-primary/20">Yes</Badge> : <Badge variant="secondary">No</Badge>}</TableCell>
                <TableCell>{l.showOnHomepage ? <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Visible</Badge> : <Badge variant="secondary">Hidden</Badge>}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(l)}><Edit className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(l.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(l => (
          <Card key={l.id}><CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{l.image}</span>
                <div>
                  <div className="font-medium text-foreground">{l.name}</div>
                  <div className="text-xs text-muted-foreground">{l.description}</div>
             
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => openEdit(l)}><Edit className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(l.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent></Card>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Signature Look" : "Add Signature Look"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Product Name *</Label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Royal Velvet Kurta Set" /></div>
              {/* <div>
    <Label>Product ID *</Label>
    <Input
      value={form.productId || ""}
      onChange={(e) =>
        setForm((f) => ({ ...f, productId: e.target.value }))
      }
      placeholder="Enter Firestore Product ID"
    />
  </div> */}
            <div><Label>Slug</Label><Input value={generateSlug(form.name)} disabled className="bg-muted/50" /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe this signature look..." rows={3} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Price (₹)</Label><Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: Number(e.target.value) }))} /></div>
              {/* <div><Label>Discount Price (₹)</Label><Input type="number" value={form.discountPrice} onChange={e => setForm(f => ({ ...f, discountPrice: Number(e.target.value) }))} /></div> */}
            </div>
            <div><Label>Category</Label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {["Ethnic Wear", "Kurta Sets", "Sarees", "Festive Collection", "Bridal", "Indo-Western"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><Label>Fabric</Label><Input value={form.fabric} onChange={e => setForm(f => ({ ...f, fabric: e.target.value }))} placeholder="e.g. Silk, Velvet, Georgette" /></div>
            <div><Label>Product Image</Label>
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg" />}
            </div>
            {/* <div><Label>Emoji Icon</Label><Input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="💎" /></div> */}
            <div className="flex items-center justify-between"><Label>Featured Look</Label><Switch checked={form.featured} onCheckedChange={v => setForm(f => ({ ...f, featured: v }))} /></div>
            <div className="flex items-center justify-between"><Label>Show on Homepage</Label><Switch checked={form.showOnHomepage} onCheckedChange={v => setForm(f => ({ ...f, showOnHomepage: v }))} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={handleSave} className="bg-primary">{editing ? "Update" : "Add"} Look</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
