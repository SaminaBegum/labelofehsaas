// import { useState } from "react";
// import { banners as initialBanners, Banner } from "@/lib/mock-data";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import { Switch } from "@/components/ui/switch";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Plus, Edit, Trash2, ImagePlus, GripVertical, Eye } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// const POSITIONS = [
//   { value: "hero", label: "Hero Banner" },
//   { value: "featured", label: "Featured Section" },
//   { value: "new_arrivals", label: "New Arrivals" },
// ];

// const BannersPage = () => {
//   const [banners, setBanners] = useState<Banner[]>(initialBanners);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [editBanner, setEditBanner] = useState<Banner | null>(null);
//   const { toast } = useToast();

//   const [form, setForm] = useState({ title: "", subtitle: "", buttonLink: "", position: "hero" as Banner["position"], imagePreview: "" });

//   const openAdd = () => { setEditBanner(null); setForm({ title: "", subtitle: "", buttonLink: "", position: "hero", imagePreview: "" }); setDialogOpen(true); };
//   const openEdit = (b: Banner) => {
//     setEditBanner(b);
//     setForm({ title: b.title, subtitle: b.subtitle, buttonLink: b.buttonLink, position: b.position, imagePreview: b.image.startsWith("http") || b.image.startsWith("data:") ? b.image : "" });
//     setDialogOpen(true);
//   };

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setForm(prev => ({ ...prev, imagePreview: reader.result as string }));
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSave = () => {
//     if (!form.title) { toast({ title: "Title is required", variant: "destructive" }); return; }
//     if (editBanner) {
//       setBanners(banners.map(b => b.id === editBanner.id ? { ...b, title: form.title, subtitle: form.subtitle, buttonLink: form.buttonLink, position: form.position, image: form.imagePreview || b.image } : b));
//       toast({ title: "Banner updated!" });
//     } else {
//       setBanners([...banners, { id: `BNR-${Date.now()}`, title: form.title, subtitle: form.subtitle, image: form.imagePreview || "🖼️", buttonLink: form.buttonLink, position: form.position, active: true, order: banners.length + 1 }]);
//       toast({ title: "Banner created!" });
//     }
//     setDialogOpen(false);
//   };

//   const toggleActive = (id: string) => setBanners(banners.map(b => b.id === id ? { ...b, active: !b.active } : b));
//   const handleDelete = (id: string) => { setBanners(banners.filter(b => b.id !== id)); toast({ title: "Banner deleted", variant: "destructive" }); };

//   const groupedBanners = POSITIONS.map(p => ({
//     ...p,
//     items: banners.filter(b => b.position === p.value).sort((a, b) => a.order - b.order),
//   }));

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-display font-bold">Banner & Homepage</h1>
//           <p className="text-muted-foreground text-sm mt-1">Control your website banners and homepage sections</p>
//         </div>
//         <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
//           <DialogTrigger asChild><Button onClick={openAdd}><Plus className="h-4 w-4 mr-2" />Add Banner</Button></DialogTrigger>
//           <DialogContent className="max-w-md">
//             <DialogHeader><DialogTitle className="font-display">{editBanner ? "Edit" : "Add"} Banner</DialogTitle></DialogHeader>
//             <div className="space-y-4 mt-2">
//               {/* Image Upload */}
//               <div>
//                 <Label>Banner Image</Label>
//                 <div className="mt-1.5">
//                   {form.imagePreview ? (
//                     <img src={form.imagePreview} alt="Preview" className="w-full h-32 rounded-xl object-cover border" />
//                   ) : (
//                     <div className="w-full h-32 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
//                       <ImagePlus className="h-8 w-8 text-muted-foreground/50" />
//                     </div>
//                   )}
//                   <label className="cursor-pointer mt-2 inline-block">
//                     <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
//                     <span className="text-sm text-primary hover:underline font-medium">Upload Image</span>
//                   </label>
//                 </div>
//               </div>
//               <div><Label>Title *</Label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Banner title" /></div>
//               <div><Label>Subtitle</Label><Input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="Banner subtitle" /></div>
//               <div><Label>Button Link</Label><Input value={form.buttonLink} onChange={e => setForm({ ...form, buttonLink: e.target.value })} placeholder="/products?cat=sarees" /></div>
//               <div>
//                 <Label>Position</Label>
//                 <Select value={form.position} onValueChange={v => setForm({ ...form, position: v as Banner["position"] })}>
//                   <SelectTrigger><SelectValue /></SelectTrigger>
//                   <SelectContent>{POSITIONS.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
//                 </Select>
//               </div>
//               <Button onClick={handleSave} className="w-full">{editBanner ? "Update" : "Add"} Banner</Button>
//             </div>
//           </DialogContent>
//         </Dialog>
//       </div>

//       {/* Grouped by position */}
//       {groupedBanners.map(group => (
//         <div key={group.value} className="space-y-3">
//           <h2 className="text-lg font-display font-semibold flex items-center gap-2">
//             {group.label}
//             <Badge variant="outline">{group.items.length}</Badge>
//           </h2>
//           {group.items.length === 0 ? (
//             <Card className="border-0 shadow-sm"><CardContent className="p-8 text-center text-muted-foreground">No banners in this section</CardContent></Card>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {group.items.map(banner => (
//                 <Card key={banner.id} className={`border-0 shadow-sm overflow-hidden ${!banner.active ? "opacity-60" : ""}`}>
//                   <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/30 flex items-center justify-center text-4xl">
//                     {banner.image.startsWith("data:") || banner.image.startsWith("http") ? (
//                       <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
//                     ) : (
//                       <span>{banner.image}</span>
//                     )}
//                   </div>
//                   <CardContent className="p-4">
//                     <div className="flex items-start justify-between">
//                       <div>
//                         <h3 className="font-medium">{banner.title}</h3>
//                         <p className="text-sm text-muted-foreground">{banner.subtitle}</p>
//                         {banner.buttonLink && <p className="text-xs text-primary mt-1">{banner.buttonLink}</p>}
//                       </div>
//                       <Switch checked={banner.active} onCheckedChange={() => toggleActive(banner.id)} />
//                     </div>
//                     <div className="flex gap-1 mt-3 pt-3 border-t">
//                       <Button variant="outline" size="sm" onClick={() => openEdit(banner)}><Edit className="h-3 w-3 mr-1" />Edit</Button>
//                       <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDelete(banner.id)}><Trash2 className="h-3 w-3 mr-1" />Delete</Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BannersPage;
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import { Plus, Edit, Trash2, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonLink: string;
  position: "hero" | "seasonal" | "featured" | "new_arrivals"; // ✅ ADD seasonal
  active: boolean;
  order: number;
};

const POSITIONS = [
  { value: "hero", label: "Hero Banner" },
  { value: "seasonal", label: "Seasonal Banner" }, // ✅ NEW
  { value: "featured", label: "Featured Section" },
  { value: "new_arrivals", label: "New Arrivals" },
];

const BannersPage = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    buttonLink: "",
    position: "hero" as Banner["position"],
    imagePreview: "",
  });

  // ✅ FETCH FROM FIRESTORE
  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    const snapshot = await getDocs(collection(db, "banners"));

    const data = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...docItem.data(),
    })) as Banner[];

    setBanners(data);
  };

  // ✅ OPEN MODALS
  const openAdd = () => {
    setEditBanner(null);
    setForm({
      title: "",
      subtitle: "",
      buttonLink: "",
      position: "hero",
      imagePreview: "",
    });
    setDialogOpen(true);
  };

  const openEdit = (b: Banner) => {
    setEditBanner(b);
    setForm({
      title: b.title,
      subtitle: b.subtitle,
      buttonLink: b.buttonLink,
      position: b.position,
      imagePreview:
        b.image.startsWith("http") || b.image.startsWith("data:")
          ? b.image
          : "",
    });
    setDialogOpen(true);
  };

  // ✅ IMAGE UPLOAD (base64 preview)
const handleImageUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ecommerce_upload");

  try {
    const res = await fetch(
  "https://api.cloudinary.com/v1_1/dcd6m260p/auto/upload",
  {
    method: "POST",
    body: formData,
  }
);

    const data = await res.json();

    if (data.secure_url) {
      setForm((prev) => ({
        ...prev,
        imagePreview: data.secure_url,
      }));

      toast({ title: "Upload successful ✅" });
    } else {
      toast({ title: "Upload failed ❌", variant: "destructive" });
    }
  } catch (err) {
    toast({ title: "Upload error ❌", variant: "destructive" });
  }
};

  // ✅ SAVE (CREATE + UPDATE)
  const handleSave = async () => {
    if (!form.title) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }

    try {
      if (editBanner) {
        await updateDoc(doc(db, "banners", editBanner.id), {
          title: form.title,
          subtitle: form.subtitle,
          buttonLink: form.buttonLink,
          position: form.position,
          image: form.imagePreview || editBanner.image,
        });

        toast({ title: "Banner updated!" });
      } else {
        await addDoc(collection(db, "banners"), {
          title: form.title,
          subtitle: form.subtitle,
          buttonLink: form.buttonLink,
          position: form.position,
          image: form.imagePreview || "",
          active: true,
          order: banners.length + 1,
          createdAt: new Date(),
        });

        toast({ title: "Banner created!" });
      }

      fetchBanners();
      setDialogOpen(false);
    } catch {
      toast({ title: "Error saving banner", variant: "destructive" });
    }
  };

  // ✅ TOGGLE ACTIVE
  const toggleActive = async (id: string, active: boolean) => {
    await updateDoc(doc(db, "banners", id), {
      active: !active,
    });

    fetchBanners();
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "banners", id));
    toast({ title: "Banner deleted", variant: "destructive" });
    fetchBanners();
  };

  // ✅ GROUPING
  const groupedBanners = POSITIONS.map((p) => ({
    ...p,
    items: banners
      .filter((b) => b.position === p.value)
      .sort((a, b) => a.order - b.order),
  }));

  return (
    <div className="space-y-6 animate-fade-in">

      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Banner CMS</h1>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAdd}>
              <Plus className="mr-2 h-4 w-4" />
              Add Banner
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editBanner ? "Edit" : "Add"} Banner
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">

              {/* IMAGE */}
              <div>
                <Label>Image</Label>
             {form.imagePreview ? (
  form.imagePreview.includes(".mp4") ||
  form.imagePreview.includes("video") ? (
    <video
      src={form.imagePreview}
      controls
      className="h-32 w-full object-cover rounded"
    />
  ) : (
    <img
      src={form.imagePreview}
      className="h-32 w-full object-cover rounded"
    />
  )
) : (
  <div className="h-32 border flex items-center justify-center">
    <ImagePlus />
  </div>
)}

               <input
  type="file"
  accept="image/*,video/*"
  onChange={handleImageUpload}
  className="mt-2"
/>
              </div>

              <Input
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <Input
                placeholder="Subtitle"
                value={form.subtitle}
                onChange={(e) =>
                  setForm({ ...form, subtitle: e.target.value })
                }
              />

              <Input
                placeholder="Link"
                value={form.buttonLink}
                onChange={(e) =>
                  setForm({ ...form, buttonLink: e.target.value })
                }
              />

              <Select
                value={form.position}
                onValueChange={(v) =>
                  setForm({
                    ...form,
                    position: v as Banner["position"],
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button onClick={handleSave}>
                {editBanner ? "Update" : "Create"}
              </Button>

            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* LIST */}
      {groupedBanners.map((group) => (
        <div key={group.value}>
          <h2 className="font-semibold mb-2">
            {group.label} ({group.items.length})
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {group.items.map((banner) => (
              <Card key={banner.id}>
               <div className="h-32">
  {banner.image?.includes(".mp4") ||
  banner.image?.includes("video") ? (
    <video
      src={banner.image}
      className="w-full h-full object-cover"
      controls
    />
  ) : (
    <img
      src={banner.image}
      className="w-full h-full object-cover"
    />
  )}
</div>

                <CardContent>
                  <h3>{banner.title}</h3>
                  <p>{banner.subtitle}</p>

                  <Switch
                    checked={banner.active}
                    onCheckedChange={() =>
                      toggleActive(banner.id, banner.active)
                    }
                  />

                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => openEdit(banner)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(banner.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannersPage;