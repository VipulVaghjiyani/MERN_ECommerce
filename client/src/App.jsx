import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import Dashboard from "./pages/admin-view/dashboard";
import AdminOrders from "./pages/admin-view/orders";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import UnauthPage from "./pages/unAuth";
import CheckAuth from "./components/common/check-auth";

function App() {
  const isAuthenticated = false;  
  const user =null;
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/unauth-page" element={<UnauthPage />} />

        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
             <AuthLayout />
             </CheckAuth>
         }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route path="/admin" element={
           <CheckAuth isAuthenticated={isAuthenticated} user={user}>
           <AdminLayout />
           </CheckAuth>
          }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        <Route path="/shop" element={
           <CheckAuth isAuthenticated={isAuthenticated} user={user}>
           <ShoppingLayout />
           </CheckAuth>
          }>
        <Route path="listing" element={<ShoppingListing />} />
        <Route path="home" element={<ShoppingHome />} />
        <Route path="checkout" element={<ShoppingCheckout />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;
