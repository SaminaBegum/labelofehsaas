import { useState } from "react";
// import { categories as initialCats, Category } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, ImagePlus, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { db } from "@/services/firebaseConfig";
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect } from "react";
import { getDocs } from "firebase/firestore";
import { uploadToCloudinary } from "../services/cloudinary";
const CategoriesPage = () => {
  // const [categories, setCategories] = useState<Category[]>(initialCats);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [editId, setEditId] = useState<number | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [showOnHomepage, setShowOnHomepage] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const [type, setType] = useState<"stitched" | "unstitched" | "co-ords">("stitched");
  const { toast } = useToast();
type Category = {
  id: string;
  name: string;
  image?: string;
  showOnHomepage: boolean;
  type?: string;
};
  const openAdd = () => { setEditId(null); setName(""); setShowOnHomepage(true); setImagePreview(""); setDialogOpen(true); };
  const openEdit = (c: Category) => {
  setEditId(c.id);
  setName(c.name);
  setShowOnHomepage(c.showOnHomepage);
  setImagePreview(c.image || "");
  setDialogOpen(true);
};
  // const openEdit = (c: Category) => { setEditId(c.id); setName(c.name); setShowOnHomepage(c.showOnHomepage); setImagePreview(c.image || ""); setDialogOpen(true); };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) { const reader = new FileReader(); reader.onloadend = () => setImagePreview(reader.result as string); reader.readAsDataURL(file); }
  // };
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

    console.log("Cloudinary response:", data); // ✅ ADD THIS

    if (data.secure_url) {
      setImagePreview(data.secure_url);
    } else {
      console.error("Upload failed:", data);
      alert("Image upload failed ❌");
    }

  } catch (err) {
    console.error(err);
  }
};
  // const handleSave = () => {
  //   if (!name) return;
  //   if (editId) {
  //     setCategories(categories.map(c => c.id === editId ? { ...c, name, showOnHomepage, image: imagePreview || c.image } : c));
  //     toast({ title: "Category updated!" });
  //   } else {
  //     setCategories([...categories, { id: Date.now(), name, count: 0, icon: "📦", showOnHomepage, image: imagePreview }]);
  //     toast({ title: "Category added!" });
  //   }
  //   setDialogOpen(false);
  // };
  useEffect(() => {
  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, "categories"));

    const data = snapshot.docs.map(doc => ({
      id: doc.id, // ✅ VERY IMPORTANT
      ...doc.data(),
    })) as Category[];

    setCategories(data);
  };

  fetchCategories();
}, []);
const handleSave = async () => {
  if (!name) return;

  try {
    if (editId) {
      const ref = doc(db, "categories", String(editId));

     await updateDoc(ref, {
  name,
  showOnHomepage,
  image: imagePreview,
  type, // ✅ MUST
});
      

      toast({ title: "Category updated!" });
    } else {
  await addDoc(collection(db, "categories"), {
  name,
  showOnHomepage,
  image: imagePreview || "",
  type, // ✅ MUST
  createdAt: Date.now(),
});

      toast({ title: "Category added!" });
    }

    setDialogOpen(false);
  } catch (err) {
    console.error(err);
    toast({ title: "Error saving category", variant: "destructive" });
  }
};
  // const handleDelete = (id: number) => { setCategories(categories.filter(c => c.id !== id)); toast({ title: "Category deleted", variant: "destructive" }); };
  const handleDelete = async (id: string) => {
  await deleteDoc(doc(db, "categories", id));
  toast({ title: "Category deleted", variant: "destructive" });
};
  // const toggleHomepage = (id: number) => setCategories(categories.map(c => c.id === id ? { ...c, showOnHomepage: !c.showOnHomepage } : c));
  const toggleHomepage = async (id: string, current: boolean) => {
  await updateDoc(doc(db, "categories", id), {
    showOnHomepage: !current,
  });

  setCategories(prev =>
    prev.map(c =>
      c.id === id ? { ...c, showOnHomepage: !current } : c
    )
  );
};

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold">Categories</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage product categories</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" />Add Category</Button></DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader><DialogTitle className="font-display">{editId ? "Edit" : "Add"} Category</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-2">
              {/* Category Image */}
              <div>
                <Label>Category Image</Label>
                <div className="mt-1.5">
                {imagePreview ? (
  <img
    src={imagePreview}
    alt="Preview"
    className="w-full h-24 rounded-xl object-cover border"
  />
) : (
  <div className="w-full h-24 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
    <ImagePlus className="h-6 w-6 text-muted-foreground/50" />
  </div>
)}
                  <label className="cursor-pointer mt-2 inline-block">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    <span className="text-sm text-primary hover:underline font-medium">Upload Image</span>
                  </label>
                </div>
              </div>
              <div><Label>Name</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="Category name" /></div>
              <div>
  <Label>Category Type</Label>
 <select
  value={type}
  onChange={(e) =>
    setType(e.target.value as "stitched" | "unstitched" | "co-ords")
  }
  className="w-full border rounded-md px-3 py-2 mt-1"
>
  <option value="stitched">Stitched</option>
  <option value="unstitched">Unstitched</option>
  <option value="co-ords">Co-ords Set</option> {/* ✅ NEW */}
</select>
</div>
              <div className="flex items-center gap-3">
                <Switch checked={showOnHomepage} onCheckedChange={setShowOnHomepage} />
                <Label>Show on Homepage</Label>
              </div>
              <Button onClick={handleSave} className="w-full">{editId ? "Update" : "Add"} Category</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(cat => (
          <Card key={cat.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center">
  {cat.image ? (
    <img
      src={cat.image}
      alt={cat.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <span className="text-2xl">📦</span>
  )}
</div>
                  <div>
                    <h3 className="font-medium">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground">Products</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge variant="outline" className={`text-[10px] ${cat.showOnHomepage ? "bg-emerald-500/15 text-emerald-600 border-emerald-500/20" : "bg-muted text-muted-foreground"}`}>
                    {cat.showOnHomepage ? <><Eye className="h-2.5 w-2.5 mr-0.5" />Visible</> : <><EyeOff className="h-2.5 w-2.5 mr-0.5" />Hidden</>}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1 mt-3 pt-3 border-t">
                <Button variant="ghost" size="sm" onClick={() => openEdit(cat)}><Edit className="h-3.5 w-3.5 mr-1" />Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => toggleHomepage(cat.id, cat.showOnHomepage)}>
                  {cat.showOnHomepage ? <><EyeOff className="h-3.5 w-3.5 mr-1" />Hide</> : <><Eye className="h-3.5 w-3.5 mr-1" />Show</>}
                </Button>
                <Button variant="ghost" size="sm" className="text-destructive ml-auto" onClick={() => handleDelete(cat.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
