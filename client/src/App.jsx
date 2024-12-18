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
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton"
import AdminProducts from "./pages/admin-view/products";

function App() {

  const { user, isAuthenticated, isLoading } =  useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  if(isLoading){
    console.log(isLoading, user);
    return <Skeleton className="w-full h-screen bg-gray-100 flex items-center justify-center">
    <div className="w-3/4 max-w-md space-y-4">
      {/* Title Skeleton */}
      <div className="h-6 bg-gray-300 rounded-md animate-pulse"></div>
  
      {/* Paragraph Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-4 bg-gray-300 rounded-md animate-pulse"></div>
      </div>
  
      {/* Button Skeleton */}
      <div className="h-10 w-32 bg-gray-300 rounded-full animate-pulse mx-auto"></div>
    </div>
  </Skeleton>
  
  

  }

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
          <Route path="products" element={<AdminProducts />} />
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
