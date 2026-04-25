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
import { Plus, Edit, Trash2, Search, Layers } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { useEffect } from "react";



interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
  showOnHomepage: boolean;
  season: string;
  type: string;
  createdAt: number;
}

// const initialCollections: Collection[] = [
//   { 
//     id: "COL-001",
//     name: "Festive Edit",
//     slug: "festive-edit",
//     description: "Curated festive wear for every celebration",
//     image: "✨",
//     productCount: 18,
//     featured: true,
//     showOnHomepage: true,
//     season: "All Season",
//     type: "festive", // ✅ ADD
//     createdAt: "2024-01-10"
//   },
//   { 
//     id: "COL-002",
//     name: "Festive Collection",
//     slug: "festive-collection",
//     description: "Traditional festive outfits with modern touch",
//     image: "🪔",
//     productCount: 24,
//     featured: true,
//     showOnHomepage: true,
//     season: "Festive",
//     type: "festive", // ✅ ADD
//     createdAt: "2024-02-05"
//   },
//   { 
//     id: "COL-003",
//     name: "Signature Looks",
//     slug: "signature-looks",
//     description: "Exclusive designer pieces from Label Ehsaas",
//     image: "💎",
//     productCount: 12,
//     featured: true,
//     showOnHomepage: true,
//     season: "All Season",
//     type: "shop", // ✅ ADD
//     createdAt: "2024-03-01"
//   },
// ];

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null);
  const { toast } = useToast();

  const fetchCollections = async () => {
  const snapshot = await getDocs(collection(db, "collections"));

  const data = snapshot.docs.map(doc => ({
    id: doc.id,
    productCount: 0,
    ...doc.data(),
  }));

  // ✅ USE FALLBACK
  if (data.length === 0) {
    setCollections(initialCollections);
  } else {
    setCollections(data);
  }
};

  useEffect(() => {
    fetchCollections();
  }, []);

  const emptyForm: Omit<Collection, "id" | "slug" | "productCount" | "createdAt"> = {
    name: "",
    description: "",
    image: "",
    featured: false,
    showOnHomepage: true,
    season: "All Season",
     type: "shop", 
  };

  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const filtered = collections.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingCollection(null);
    setForm(emptyForm);
    setImagePreview(null);
    setDialogOpen(true);
  };

const openEdit = (c: Collection) => {
  setEditingCollection(c);

  setForm({
    name: c.name || "",
    description: c.description || "",
    image: c.image || "",
    featured: c.featured ?? false,
    showOnHomepage: c.showOnHomepage ?? true,
    season: c.season || "All Season",
    type: c.type || "shop", // ✅ FIXED
  });

  setImagePreview(null);
  setDialogOpen(true);
};

 const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ecommerce_upload");

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dcd6m260p/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      setImagePreview(data.secure_url);

      // ✅ SAVE CLOUDINARY URL
      setForm(f => ({
        ...f,
        image: data.secure_url,
      }));
    }

  } catch (err) {
    console.error(err);
  }
};

  const handleSave = async () => {
  try {
    if (!form.name.trim()) {
      toast({ title: "Name required", variant: "destructive" });
      return;
    }

  const payload = {
  name: form.name || "",
  description: form.description || "",
  image: form.image || "",
  type: form.type || "shop", // ✅ NEVER undefined
  featured: form.featured ?? false,
  showOnHomepage: form.showOnHomepage ?? true,
  season: form.season || "All Season",
  slug: generateSlug(form.name),
  productCount: 0,
  createdAt: Date.now(),
};

    console.log("Saving data:", payload); // DEBUG

    if (editingCollection) {
      await updateDoc(doc(db, "collections", editingCollection.id), payload);
      toast({ title: "Collection updated" });
    } else {
      await addDoc(collection(db, "collections"), payload);
      toast({ title: "Collection added" });
    }

    setDialogOpen(false);
    fetchCollections();

  } catch (error) {
    console.error("Firebase Error:", error);
    toast({ title: "Error saving collection", variant: "destructive" });
  }
};

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "collections", id));
    toast({ title: "Collection deleted" });

    fetchCollections(); // ✅ REFRESH UI
  };

 

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Shop by Collection</h1>
          <p className="text-muted-foreground text-sm">Manage curated collections for your storefront</p>
        </div>
        <Button onClick={openAdd} className="bg-primary hover:bg-primary/90"><Plus className="mr-2 h-4 w-4" />Add Collection</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Collections", value: collections.length, icon: "📁" },
          { label: "Featured", value: collections.filter(c => c.featured).length, icon: "⭐" },
          { label: "On Homepage", value: collections.filter(c => c.showOnHomepage).length, icon: "🏠" },
          { label: "Total Products", value: collections.reduce((s, c) => s + c.productCount, 0), icon: "👗" },
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
        <Input placeholder="Search collections..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-xl border bg-card overflow-hidden">
        <Table>
          <TableHeader><TableRow className="bg-muted/30">
            <TableHead>Collection</TableHead><TableHead>Season</TableHead><TableHead>Products</TableHead>
            <TableHead>Featured</TableHead><TableHead>Homepage</TableHead><TableHead className="text-right">Actions</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {filtered.map(c => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {c.image?.startsWith("http") ? (
  <img
    src={c.image}
    alt={c.name}
    className="w-12 h-12 object-cover rounded"
  />
) : (
  <span className="text-2xl">{c.image}</span> // fallback emoji
)}
                    <div><div className="font-medium text-foreground">{c.name}</div><div className="text-xs text-muted-foreground">{c.description}</div></div>
                  </div>
                </TableCell>
                <TableCell><Badge variant="outline">{c.season}</Badge></TableCell>
                <TableCell className="font-medium">{c.productCount}</TableCell>
                <TableCell>{c.featured ? <Badge className="bg-primary/10 text-primary border-primary/20">Yes</Badge> : <Badge variant="secondary">No</Badge>}</TableCell>
                <TableCell>{c.showOnHomepage ? <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Visible</Badge> : <Badge variant="secondary">Hidden</Badge>}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Edit className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map(c => (
          <Card key={c.id}><CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.image}</span>
                <div>
                  <div className="font-medium text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.description}</div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">{c.season}</Badge>
                    <Badge variant="outline" className="text-xs">{c.productCount} products</Badge>
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Edit className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(c.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </div>
          </CardContent></Card>
        ))}
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingCollection ? "Edit Collection" : "Add Collection"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
       <div>
  <Label>Collection Name *</Label>
  <Input
    value={form.name}
    onChange={(e) =>
      setForm((f) => ({
        ...f,
        name: e.target.value,
      }))
    }
    placeholder="e.g. Festive Edit"
  />
</div>
            <div><Label>Slug</Label><Input value={generateSlug(form.name)} disabled className="bg-muted/50" /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe this collection..." rows={3} /></div>
            <div><Label>Season</Label>
              <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.season} onChange={e => setForm(f => ({ ...f, season: e.target.value }))}>
                {["All Season", "Summer", "Winter", "Festive", "Bridal", "Monsoon"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
  <Label>Collection Type</Label>
  <select
    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
    value={form.type}
    onChange={(e) =>
      setForm((f) => ({
        ...f,
        type: e.target.value,
      }))
    }
  >
    <option value="shop">Shop Collection</option>
    <option value="festive">Festive Collection</option>
    <option value="bridal">Bridal Collection</option>
  </select>
</div>
            <div><Label>Collection Image</Label>
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg" />}
            </div>
            <div><Label>Emoji Icon</Label><Input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="✨" /></div>
            <div className="flex items-center justify-between"><Label>Featured Collection</Label><Switch checked={form.featured} onCheckedChange={v => setForm(f => ({ ...f, featured: v }))} /></div>
            <div className="flex items-center justify-between"><Label>Show on Homepage</Label><Switch checked={form.showOnHomepage} onCheckedChange={v => setForm(f => ({ ...f, showOnHomepage: v }))} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button><Button onClick={handleSave} className="bg-primary">{editingCollection ? "Update" : "Add"} Collection</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
