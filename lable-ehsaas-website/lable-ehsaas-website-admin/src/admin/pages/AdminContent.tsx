import { useState } from "react";
import { Image, Plus, Edit, Trash2, GripVertical, Star, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Banner {
  id: string; title: string; subtitle: string; image: string; link: string; active: boolean;
}
interface Testimonial {
  id: string; name: string; text: string; rating: number;
}

const initialBanners: Banner[] = [
  { id: "b1", title: "Summer Collection 2024", subtitle: "Discover ethereal elegance", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=600", link: "/collections", active: true },
  { id: "b2", title: "Wedding Edit", subtitle: "Bridal lehengas & more", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600", link: "/category/lehengas", active: true },
  { id: "b3", title: "Festive Sale", subtitle: "Up to 40% off", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600", link: "/shop", active: false },
];

const initialTestimonials: Testimonial[] = [
  { id: "t1", name: "Priya S.", text: "The quality of Ehsaas Label outfits is unmatched. I received so many compliments!", rating: 5 },
  { id: "t2", name: "Ananya R.", text: "Beautiful designs and perfect stitching. My go-to for ethnic wear.", rating: 5 },
  { id: "t3", name: "Meera P.", text: "Loved the Noor co-ord set. Comfortable yet stylish!", rating: 4 },
];

const AdminContent = () => {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [bannerDialog, setBannerDialog] = useState(false);
  const [editBanner, setEditBanner] = useState<Banner | null>(null);
  const [bannerForm, setBannerForm] = useState({ title: "", subtitle: "", image: "", link: "" });
  const [testimonialDialog, setTestimonialDialog] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState({ name: "", text: "", rating: "5" });
  const { toast } = useToast();

  const openBannerAdd = () => {
    setEditBanner(null);
    setBannerForm({ title: "", subtitle: "", image: "", link: "" });
    setBannerDialog(true);
  };

  const openBannerEdit = (b: Banner) => {
    setEditBanner(b);
    setBannerForm({ title: b.title, subtitle: b.subtitle, image: b.image, link: b.link });
    setBannerDialog(true);
  };

  const saveBanner = () => {
    if (!bannerForm.title) { toast({ title: "Title required", variant: "destructive" }); return; }
    const banner: Banner = {
      id: editBanner?.id || `b${Date.now()}`, ...bannerForm, active: editBanner?.active ?? true,
    };
    if (editBanner) {
      setBanners((prev) => prev.map((b) => (b.id === editBanner.id ? banner : b)));
    } else {
      setBanners((prev) => [...prev, banner]);
    }
    setBannerDialog(false);
    toast({ title: editBanner ? "Banner updated" : "Banner added" });
  };

  const saveTestimonial = () => {
    if (!testimonialForm.name || !testimonialForm.text) { toast({ title: "Fields required", variant: "destructive" }); return; }
    setTestimonials((prev) => [...prev, {
      id: `t${Date.now()}`, name: testimonialForm.name, text: testimonialForm.text, rating: Number(testimonialForm.rating),
    }]);
    setTestimonialDialog(false);
    toast({ title: "Testimonial added" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground">Content Management</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage homepage banners, testimonials & more</p>
      </div>

      <Tabs defaultValue="banners">
        <TabsList>
          <TabsTrigger value="banners" className="gap-1"><Image className="h-3.5 w-3.5" /> Banners</TabsTrigger>
          <TabsTrigger value="testimonials" className="gap-1"><MessageSquare className="h-3.5 w-3.5" /> Testimonials</TabsTrigger>
        </TabsList>

        <TabsContent value="banners" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button onClick={openBannerAdd} className="gap-2"><Plus className="h-4 w-4" /> Add Banner</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {banners.map((b) => (
              <Card key={b.id} className="border-border overflow-hidden group">
                <div className="relative h-40">
                  <img src={b.image} alt={b.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-foreground/40 flex items-end p-4">
                    <div>
                      <p className="text-primary-foreground font-heading text-lg font-semibold">{b.title}</p>
                      <p className="text-primary-foreground/80 text-sm">{b.subtitle}</p>
                    </div>
                  </div>
                  <Badge variant={b.active ? "secondary" : "outline"} className="absolute top-3 right-3 text-xs">
                    {b.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardContent className="p-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => openBannerEdit(b)}>
                    <Edit className="h-3.5 w-3.5" /> Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive" onClick={() => {
                    setBanners((prev) => prev.filter((x) => x.id !== b.id));
                    toast({ title: "Banner deleted" });
                  }}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button onClick={() => { setTestimonialForm({ name: "", text: "", rating: "5" }); setTestimonialDialog(true); }} className="gap-2">
              <Plus className="h-4 w-4" /> Add Testimonial
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t) => (
              <Card key={t.id} className="border-border">
                <CardContent className="p-5">
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < t.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic mb-3">"{t.text}"</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">— {t.name}</p>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => {
                      setTestimonials((prev) => prev.filter((x) => x.id !== t.id));
                      toast({ title: "Testimonial deleted" });
                    }}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Banner dialog */}
      <Dialog open={bannerDialog} onOpenChange={setBannerDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">{editBanner ? "Edit Banner" : "Add Banner"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Title *</Label><Input value={bannerForm.title} onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })} /></div>
            <div><Label>Subtitle</Label><Input value={bannerForm.subtitle} onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })} /></div>
            <div><Label>Image URL</Label><Input value={bannerForm.image} onChange={(e) => setBannerForm({ ...bannerForm, image: e.target.value })} /></div>
            <div><Label>Link</Label><Input value={bannerForm.link} onChange={(e) => setBannerForm({ ...bannerForm, link: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBannerDialog(false)}>Cancel</Button>
            <Button onClick={saveBanner}>{editBanner ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Testimonial dialog */}
      <Dialog open={testimonialDialog} onOpenChange={setTestimonialDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Add Testimonial</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Customer Name *</Label><Input value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} /></div>
            <div><Label>Review *</Label><Textarea value={testimonialForm.text} onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })} rows={3} /></div>
            <div><Label>Rating</Label><Input type="number" min="1" max="5" value={testimonialForm.rating} onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTestimonialDialog(false)}>Cancel</Button>
            <Button onClick={saveTestimonial}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminContent;
