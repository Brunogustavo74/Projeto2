import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RedirectIfAuthenticated } from "@/components/auth/RedirectIfAuthenticated";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Marketplace from "./pages/Marketplace";
import ProductPage from "./pages/ProductPage";
import BecomeSeller from "./pages/BecomeSeller";
import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import SellerDashboard from "./pages/seller/SellerDashboard";
import CreateProduct from "./pages/seller/CreateProduct";
import SellerSettings from "./pages/seller/SellerSettings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSellers from "./pages/admin/AdminSellers";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminSettings from "./pages/admin/AdminSettings";
import HelpCenter from "./pages/HelpCenter";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<MainLayout />}>
              {/* Public */}
              <Route path="/" element={<Index />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/help" element={<HelpCenter />} />
              <Route path="/help/:category" element={<HelpCenter />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* Buyer */}
              <Route path="/become-seller" element={<ProtectedRoute><BecomeSeller /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/buyer/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/buyer/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/buyer/dashboard" element={<ProtectedRoute requiredRoles={['buyer']}><BuyerDashboard /></ProtectedRoute>} />

              {/* Seller */}
              <Route path="/seller/dashboard" element={<ProtectedRoute requiredRoles={['buyer']}><SellerDashboard /></ProtectedRoute>} />
              <Route path="/seller/new-product" element={<ProtectedRoute requiredRoles={['buyer']}><CreateProduct /></ProtectedRoute>} />
              <Route path="/seller/products/new" element={<ProtectedRoute requiredRoles={['buyer']}><CreateProduct /></ProtectedRoute>} />
              <Route path="/seller/settings" element={<ProtectedRoute requiredRoles={['buyer']}><SellerSettings /></ProtectedRoute>} />

              {/* Admin */}
              <Route path="/admin/dashboard" element={<ProtectedRoute requiredRoles={['buyer']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requiredRoles={['buyer']}><AdminUsers /></ProtectedRoute>} />
              <Route path="/admin/sellers" element={<ProtectedRoute requiredRoles={['buyer']}><AdminSellers /></ProtectedRoute>} />
              <Route path="/admin/products" element={<ProtectedRoute requiredRoles={['buyer']}><AdminProducts /></ProtectedRoute>} />
              <Route path="/admin/transactions" element={<ProtectedRoute requiredRoles={['buyer']}><AdminTransactions /></ProtectedRoute>} />
              <Route path="/admin/disputes" element={<ProtectedRoute requiredRoles={['buyer']}><AdminDisputes /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute requiredRoles={['buyer']}><AdminSettings /></ProtectedRoute>} />
            </Route>

            {/* Auth (no layout) */}
            <Route path="/login" element={<RedirectIfAuthenticated><Login /></RedirectIfAuthenticated>} />
            <Route path="/register" element={<RedirectIfAuthenticated><Register /></RedirectIfAuthenticated>} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
