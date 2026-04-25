import { useState } from "react";
import { Shield, User, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface Admin {
  id: string; name: string; email: string; role: "super_admin" | "manager";
}

const initialAdmins: Admin[] = [
  { id: "a1", name: "Ehsaas Admin", email: "admin@ehsaaslabel.com", role: "super_admin" },
  { id: "a2", name: "Store Manager", email: "manager@ehsaaslabel.com", role: "manager" },
];

const AdminSettings = () => {
  const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "manager" as Admin["role"] });
  const { toast } = useToast();

  const handleAdd = () => {
    if (!form.name || !form.email) { toast({ title: "All fields required", variant: "destructive" }); return; }
    setAdmins((prev) => [...prev, { id: `a${Date.now()}`, ...form }]);
    setDialogOpen(false);
    toast({ title: "Admin added" });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-heading text-2xl lg:text-3xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage admin access & roles</p>
      </div>

      <Tabs defaultValue="roles">
        <TabsList>
          <TabsTrigger value="roles" className="gap-1"><Shield className="h-3.5 w-3.5" /> Admin & Roles</TabsTrigger>
          <TabsTrigger value="general" className="gap-1"><User className="h-3.5 w-3.5" /> General</TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Button onClick={() => { setForm({ name: "", email: "", role: "manager" }); setDialogOpen(true); }} className="gap-2">
              <Plus className="h-4 w-4" /> Add Admin
            </Button>
          </div>

          <Card className="border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                      <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Email</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Role</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map((a) => (
                      <tr key={a.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold">
                              {a.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <span className="font-medium text-foreground">{a.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground hidden sm:table-cell">{a.email}</td>
                        <td className="p-4">
                          <Badge variant={a.role === "super_admin" ? "default" : "secondary"} className="text-xs capitalize">
                            {a.role.replace("_", " ")}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          {a.role !== "super_admin" && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => {
                              setAdmins((prev) => prev.filter((x) => x.id !== a.id));
                              toast({ title: "Admin removed" });
                            }}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-body font-medium">Role Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                {[
                  { perm: "Manage Products", super: true, manager: true },
                  { perm: "Manage Orders", super: true, manager: true },
                  { perm: "View Analytics", super: true, manager: true },
                  { perm: "Manage Coupons", super: true, manager: false },
                  { perm: "Manage Content", super: true, manager: false },
                  { perm: "Manage Admin Users", super: true, manager: false },
                  { perm: "Delete Products", super: true, manager: false },
                ].map((row) => (
                  <div key={row.perm} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                    <span className="text-foreground">{row.perm}</span>
                    <div className="flex gap-8">
                      <div className="flex items-center gap-1.5 w-24">
                        <Switch checked={row.super} disabled className="scale-75" />
                        <span className="text-xs text-muted-foreground">Super</span>
                      </div>
                      <div className="flex items-center gap-1.5 w-24">
                        <Switch checked={row.manager} disabled className="scale-75" />
                        <span className="text-xs text-muted-foreground">Manager</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card className="border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-body font-medium">Store Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Store Name</Label>
                <Input defaultValue="Ehsaas Label" />
              </div>
              <div>
                <Label>Contact Email</Label>
                <Input defaultValue="hello@ehsaaslabel.com" />
              </div>
              <div>
                <Label>Support Phone</Label>
                <Input defaultValue="+91 98765 43210" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Add Admin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label>Name *</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Email *</Label><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div>
              <Label>Role</Label>
              <Select value={form.role} onValueChange={(v: Admin["role"]) => setForm({ ...form, role: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Admin</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSettings;
