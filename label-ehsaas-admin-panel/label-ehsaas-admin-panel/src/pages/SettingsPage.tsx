// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";
// import { useToast } from "@/hooks/use-toast";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// const SettingsPage = () => {
//   const { toast } = useToast();
//   const [store, setStore] = useState({ name: "Label Ehsaas", email: "contact@labelehsaas.com", phone: "+91 98765 43210", address: "123 Fashion Street, Mumbai, Maharashtra 400001", currency: "INR", gst: "22AAAAA0000A1Z5" });
//   const [notifications, setNotifications] = useState({ orderEmail: true, orderSms: false, lowStock: true, newsletter: true });
//   const [social, setSocial] = useState({ instagram: "https://instagram.com/labelehsaas", facebook: "https://facebook.com/labelehsaas", whatsapp: "+91 98765 43210", youtube: "" });

//   const save = () => toast({ title: "Settings saved successfully!" });

//   return (
//     <div className="space-y-6 animate-fade-in">
//       <div>
//         <h1 className="text-2xl md:text-3xl font-display font-bold">Settings</h1>
//         <p className="text-muted-foreground text-sm mt-1">Manage store settings</p>
//       </div>
//       <Tabs defaultValue="general" className="space-y-6">
//         <TabsList className="flex-wrap">
//           <TabsTrigger value="general">General</TabsTrigger>
//           <TabsTrigger value="notifications">Notifications</TabsTrigger>
//           <TabsTrigger value="shipping">Shipping</TabsTrigger>
//           <TabsTrigger value="social">Social Links</TabsTrigger>
//         </TabsList>

//         <TabsContent value="general">
//           <Card className="border-0 shadow-sm">
//             <CardHeader><CardTitle className="font-display">Store Information</CardTitle></CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div><Label>Store Name</Label><Input value={store.name} onChange={e => setStore({ ...store, name: e.target.value })} /></div>
//                 <div><Label>Contact Email</Label><Input value={store.email} onChange={e => setStore({ ...store, email: e.target.value })} /></div>
//                 <div><Label>Phone</Label><Input value={store.phone} onChange={e => setStore({ ...store, phone: e.target.value })} /></div>
//                 <div><Label>GST Number</Label><Input value={store.gst} onChange={e => setStore({ ...store, gst: e.target.value })} /></div>
//               </div>
//               <div><Label>Address</Label><Textarea value={store.address} onChange={e => setStore({ ...store, address: e.target.value })} /></div>
//               <Button onClick={save}>Save Changes</Button>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="notifications">
//           <Card className="border-0 shadow-sm">
//             <CardHeader><CardTitle className="font-display">Notification Preferences</CardTitle></CardHeader>
//             <CardContent className="space-y-6">
//               {([["orderEmail", "Order Email Notifications", "Get email alerts for new orders"], ["orderSms", "SMS Notifications", "Get SMS alerts for new orders"], ["lowStock", "Low Stock Alerts", "Get notified when products are low in stock"], ["newsletter", "Marketing Newsletter", "Receive marketing tips and updates"]] as const).map(([key, title, desc]) => (
//                 <div key={key} className="flex items-center justify-between">
//                   <div><p className="font-medium text-sm">{title}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
//                   <Switch checked={notifications[key]} onCheckedChange={v => setNotifications({ ...notifications, [key]: v })} />
//                 </div>
//               ))}
//               <Button onClick={save}>Save Preferences</Button>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="shipping">
//           <Card className="border-0 shadow-sm">
//             <CardHeader><CardTitle className="font-display">Shipping Settings</CardTitle></CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div><Label>Free Shipping Above (₹)</Label><Input defaultValue="2999" type="number" /></div>
//                 <div><Label>Standard Shipping (₹)</Label><Input defaultValue="99" type="number" /></div>
//                 <div><Label>Express Shipping (₹)</Label><Input defaultValue="199" type="number" /></div>
//                 <div><Label>Processing Time (days)</Label><Input defaultValue="2" type="number" /></div>
//               </div>
//               <Button onClick={save}>Save Shipping Settings</Button>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="social">
//           <Card className="border-0 shadow-sm">
//             <CardHeader><CardTitle className="font-display">Social Media Links</CardTitle></CardHeader>
//             <CardContent className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div><Label>Instagram</Label><Input value={social.instagram} onChange={e => setSocial({ ...social, instagram: e.target.value })} placeholder="Instagram URL" /></div>
//                 <div><Label>Facebook</Label><Input value={social.facebook} onChange={e => setSocial({ ...social, facebook: e.target.value })} placeholder="Facebook URL" /></div>
//                 <div><Label>WhatsApp</Label><Input value={social.whatsapp} onChange={e => setSocial({ ...social, whatsapp: e.target.value })} placeholder="WhatsApp number" /></div>
//                 <div><Label>YouTube</Label><Input value={social.youtube} onChange={e => setSocial({ ...social, youtube: e.target.value })} placeholder="YouTube URL" /></div>
//               </div>
//               <Button onClick={save}>Save Social Links</Button>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default SettingsPage;
import { useState, useEffect } from "react";
import { db } from "@/services/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SettingsPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  // ✅ STATES
  const [store, setStore] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    currency: "INR",
    gst: "",
  });

  const [notifications, setNotifications] = useState({
    orderEmail: false,
    orderSms: false,
    lowStock: false,
    newsletter: false,
  });

  const [social, setSocial] = useState({
    instagram: "",
    facebook: "",
    whatsapp: "",
    youtube: "",
  });

  const [shipping, setShipping] = useState({
    freeAbove: 0,
    standard: 0,
    express: 0,
    processingDays: 0,
  });

  // ✅ FETCH DATA FROM FIREBASE
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, "settings", "storeConfig");
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();

          setStore(data.store || {});
          setNotifications(data.notifications || {});
          setSocial(data.social || {});
          setShipping(data.shipping || {});
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // ✅ SAVE TO FIREBASE
  const save = async () => {
    try {
      await setDoc(
        doc(db, "settings", "storeConfig"),
        {
          store,
          notifications,
          social,
          shipping,
        },
        { merge: true }
      );

      toast({ title: "Settings saved successfully!" });
    } catch (error) {
      toast({ title: "Error saving settings" });
    }
  };

  if (loading) return <p className="p-6">Loading settings...</p>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage store settings
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
        </TabsList>

        {/* ================= GENERAL ================= */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Store Name"
                  value={store.name || ""}
                  onChange={(e) =>
                    setStore({ ...store, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Email"
                  value={store.email || ""}
                  onChange={(e) =>
                    setStore({ ...store, email: e.target.value })
                  }
                />
                <Input
                  placeholder="Phone"
                  value={store.phone || ""}
                  onChange={(e) =>
                    setStore({ ...store, phone: e.target.value })
                  }
                />
                <Input
                  placeholder="GST"
                  value={store.gst || ""}
                  onChange={(e) =>
                    setStore({ ...store, gst: e.target.value })
                  }
                />
              </div>

              <Textarea
                placeholder="Address"
                value={store.address || ""}
                onChange={(e) =>
                  setStore({ ...store, address: e.target.value })
                }
              />

              <Button onClick={save}>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= NOTIFICATIONS ================= */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(notifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center"
                >
                  <p className="text-sm">{key}</p>
                  <Switch
                    checked={value}
                    onCheckedChange={(v) =>
                      setNotifications({
                        ...notifications,
                        [key]: v,
                      })
                    }
                  />
                </div>
              ))}

              <Button onClick={save}>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= SHIPPING ================= */}
        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle>Shipping</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder="Free Above"
                value={shipping.freeAbove}
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    freeAbove: Number(e.target.value),
                  })
                }
              />
              <Input
                type="number"
                placeholder="Standard"
                value={shipping.standard}
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    standard: Number(e.target.value),
                  })
                }
              />
              <Input
                type="number"
                placeholder="Express"
                value={shipping.express}
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    express: Number(e.target.value),
                  })
                }
              />
              <Input
                type="number"
                placeholder="Processing Days"
                value={shipping.processingDays}
                onChange={(e) =>
                  setShipping({
                    ...shipping,
                    processingDays: Number(e.target.value),
                  })
                }
              />

              <Button onClick={save}>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ================= SOCIAL ================= */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Instagram"
                value={social.instagram}
                onChange={(e) =>
                  setSocial({ ...social, instagram: e.target.value })
                }
              />
              <Input
                placeholder="Facebook"
                value={social.facebook}
                onChange={(e) =>
                  setSocial({ ...social, facebook: e.target.value })
                }
              />
              <Input
                placeholder="WhatsApp"
                value={social.whatsapp}
                onChange={(e) =>
                  setSocial({ ...social, whatsapp: e.target.value })
                }
              />
              <Input
                placeholder="YouTube"
                value={social.youtube}
                onChange={(e) =>
                  setSocial({ ...social, youtube: e.target.value })
                }
              />

              <Button onClick={save}>Save</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;