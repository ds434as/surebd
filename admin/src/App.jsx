import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/common/Sidebar";
import Header from "./components/common/Header";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import Category from "./pages/Category"
import Addproduct from "./pages/Addproduct";
import AdminLogin from "./pages/AdminLogin";
import Brand from "./pages/Brand";
import Order from "./components/order/Order";
import OrderDetails from "./components/order/OrderDetails ";
import AddSlider from "./components/slider/Addslider";
import Sliderlist from "./components/slider/Sliderlist";
import Addblog from "./components/blog/Addblog";
import Bloglist from "./components/blog/Bloglist";
import Reviewlist from "./components/reviews/Reviewlist";
import Contactlist from "./contact/Contactlist";
import Newsletter from "./pages/Newsletter";
import FrontendContentPage from "./components/shop/FrontendContentPage";
import CreateCouponForm from "./components/coupon/CreateCouponForm";
import Couponlist from "./components/coupon/Couponlist";

function App() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/admin-login";
  const isAdminAuthenticated = localStorage.getItem("admin");
  
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Close mobile sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get current page title for header
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    if (path === "/category/list") return "Categories";
    if (path === "/brand/list") return "Brands";
    if (path.includes("/products")) return "Products";
    if (path.includes("/users")) return "Users";
    if (path.includes("/orders")) return "Orders";
    if (path.includes("/blog")) return "Blogs";
    if (path.includes("/review")) return "Reviews";
    if (path.includes("/contact")) return "Contacts";
    if (path.includes("/newsletter")) return "Newsletters";
    if (path.includes("/settings")) return "Settings";
    if (path.includes("/coupon")) return "Coupons";
    return "Admin Panel";
  };

  return (
    <div className='flex h-screen bg-gray-100 text-gray-800 overflow-hidden'>
      {!hideSidebar && (
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen}
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {!hideSidebar && (
          <Header 
            title={getPageTitle()}
            setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        )}
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <Routes>
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {!isAdminAuthenticated ? (
              <Route path="*" element={<Navigate to="/admin-login" replace />} />
            ) : (
              <>
                <Route path='/' element={<OverviewPage />} />
                <Route path='/category' element={<Category />} />
                <Route path='/frontend/add-banner' element={<AddSlider />} />
                <Route path='/frontend/banner-list' element={<Sliderlist />} />
                <Route path='/products' element={<ProductsPage />} />
                <Route path='/products/add' element={<Addproduct />} />
                <Route path='/products/list' element={<ProductsPage />} />
                <Route path='/users' element={<UsersPage />} />
                <Route path='/category/list' element={<Category />} />
                <Route path='/brand/list' element={<Brand />} />
                <Route path='/add-new-category' element={<Category />} />
                <Route path='/sales' element={<SalesPage />} />
                <Route path='/orders' element={<Order />} />
                <Route path='/order-details/:id' element={<OrderDetails />} />
                <Route path='/analytics' element={<AnalyticsPage />} />
                <Route path='/add-blog' element={<Addblog />} />
                <Route path='/blog-list' element={<Bloglist />} />
                <Route path='/review-list' element={<Reviewlist/>} />
                <Route path='/contact-list' element={<Contactlist/>} />
                <Route path='/newsletter-list' element={<Newsletter/>} />
                <Route path='/shop-information' element={<FrontendContentPage/>} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/create-coupon' element={<CreateCouponForm />} />
                <Route path='/coupon' element={<Couponlist />} />
              </>
            )}
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;