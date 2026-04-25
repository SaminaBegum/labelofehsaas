import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminLayout } from "@/components/AdminLayout";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import ProductsPage from "@/pages/ProductsPage";
import OrdersPage from "@/pages/OrdersPage";
import CustomersPage from "@/pages/CustomersPage";
import CategoriesPage from "@/pages/CategoriesPage";
import SettingsPage from "@/pages/SettingsPage";
import InventoryPage from "@/pages/InventoryPage";
import CouponsPage from "@/pages/CouponsPage";
import BannersPage from "@/pages/BannersPage";
import ReviewsPage from "@/pages/ReviewsPage";
import CollectionsPage from "@/pages/CollectionsPage";
import NotFound from "@/pages/NotFound";
import SignatureLooksPage from "@/pages/SignatureLooksPage";

const queryClient = new QueryClient();

const AdminPage = ({ children }: { children: React.ReactNode }) => (
  <AdminLayout>{children}</AdminLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<AdminPage><DashboardPage /></AdminPage>} />
          <Route path="/products" element={<AdminPage><ProductsPage /></AdminPage>} />
          <Route path="/orders" element={<AdminPage><OrdersPage /></AdminPage>} />
          <Route path="/customers" element={<AdminPage><CustomersPage /></AdminPage>} />
          <Route path="/categories" element={<AdminPage><CategoriesPage /></AdminPage>} />
          <Route path="/inventory" element={<AdminPage><InventoryPage /></AdminPage>} />
          <Route path="/coupons" element={<AdminPage><CouponsPage /></AdminPage>} />
          <Route path="/banners" element={<AdminPage><BannersPage /></AdminPage>} />
          <Route path="/reviews" element={<AdminPage><ReviewsPage /></AdminPage>} />
          <Route path="/settings" element={<AdminPage><SettingsPage /></AdminPage>} />
           <Route path="/collections" element={<AdminPage><CollectionsPage /></AdminPage>} />
            <Route path="/signature-looks" element={<AdminPage><SignatureLooksPage /></AdminPage>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
