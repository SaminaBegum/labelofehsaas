import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "@/components/AuthModal";
import Index from "./pages/Index.tsx";
import Shop from "./pages/Shop.tsx";
import ProductDetails from "./pages/ProductDetails.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import Collections from "./pages/Collections.tsx";
import Cart from "./pages/Cart.tsx";
import Wishlist from "./pages/Wishlist.tsx";
import Checkout from "./pages/Checkout.tsx";
import OrderConfirmation from "./pages/OrderConfirmation.tsx";
import Category from "./pages/Category.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLayout from "./admin/components/AdminLayout.tsx";
import AdminDashboard from "./admin/pages/AdminDashboard.tsx";
import AdminProducts from "./admin/pages/AdminProducts.tsx";
import AdminOrders from "./admin/pages/AdminOrders.tsx";
import AdminCustomers from "./admin/pages/AdminCustomers.tsx";
import AdminCategories from "./admin/pages/AdminCategories.tsx";
import AdminCoupons from "./admin/pages/AdminCoupons.tsx";
import AdminContent from "./admin/pages/AdminContent.tsx";
import AdminAnalytics from "./admin/pages/AdminAnalytics.tsx";
import AdminSettings from "./admin/pages/AdminSettings.tsx";
import FAQ from "./pages/FAQ.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import TermsConditions from "./pages/TermsConditions.tsx";
import ReturnsRefunds from "./pages/ReturnsRefunds.tsx";
import ShippingInfo from "./pages/ShippingInfo.tsx";
import ChatBot from "./components/ChatBot.tsx";
import CartDrawer from "./components/CartDrawer.tsx";
import OrderSuccess from "./pages/OrderSuccess.tsx";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Toaster />
            <Sonner />
            <AuthModal />
              {/* <ChatBot /> */}
   
            <BrowserRouter>
            <CartDrawer />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/:category" element={<Shop />} />
                <Route path="/category/:slug" element={<Category />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop/:collections" element={<Shop />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/new-arrivals" element={<Shop />} />
                <Route path="/best-sellers" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                  <Route path="/faq" element={<FAQ />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/returns-refunds" element={<ReturnsRefunds />} />
                <Route path="/shipping-info" element={<ShippingInfo />} />
                <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="customers" element={<AdminCustomers />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="coupons" element={<AdminCoupons />} />
                  <Route path="content" element={<AdminContent />} />
                  <Route path="analytics" element={<AdminAnalytics />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
