import { useState } from "react";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { categories as initialCats, type Category } from "../data/dummyData";

const AdminCategories = () => {
  const [catList, setCatList] = useState<Category[]>(initialCats);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCat, setEditCat] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", parent: "none" });
  const { toast } = useToast();

  const parents = catList.filter((c) => !c.parent);

  const openAdd = () => {
    setEditCat(null);
    setForm({ name: "", parent: "none" });
    setDialogOpen(true);
  };

  const openEdit = (c: Category) => {
    setEditCat(c);
    setForm({ name: c.name, parent: c.parent || "none" });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name) { toast({ title: "Name required", variant: "destructive" }); return; }
    const cat: Category = {
      id: editCat?.id || `cat${Date.now()}`,
      name: form.name, parent: form.parent === "none" ? undefined : form.parent,
      image: editCat?.image || "https://images.unsplash.com/photo-1583391733956-6c78276477e1?w=200",
      productCount: editCat?.productCount || 0, order: editCat?.order || catList.length + 1,
    };
    if (editCat) {
      setCatList((prev) => prev.map((c) => (c.id === editCat.id ? cat : c)));
      toast({ title: "Category updated" });
    } else {
      setCatList((prev) => [...prev, cat]);
      toast({ title: "Category added" });
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setCatList((prev) => prev.filter((c) => c.id !== id));
    toast({ title: "Category deleted" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1">{catList.length} categories</p>
        </div>
        <Button onClick={openAdd} className="gap-2"><Plus className="h-4 w-4" /> Add Category</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {catList.map((c) => (
          <Card key={c.id} className="border-border group hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="cursor-grab text-muted-foreground/50 mt-1"><GripVertical className="h-4 w-4" /></div>
                <img src={c.image} alt={c.name} className="w-12 h-12 rounded-sm object-cover bg-muted" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{c.name}</p>
                  {c.parent && <Badge variant="secondary" className="text-xs mt-1">{c.parent}</Badge>}
                  <p className="text-xs text-muted-foreground mt-1">{c.productCount} products</p>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(c)}>
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(c.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">{editCat ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Category Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <Label>Parent Category</Label>
              <Select value={form.parent} onValueChange={(v) => setForm({ ...form, parent: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (top level)</SelectItem>
                  {parents.map((p) => <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editCat ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCategories;
