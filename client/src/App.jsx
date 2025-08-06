import React from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
// import Contact from './pages/Contact'
// import Blogs from './pages/Blogs'
import Campaign from './pages/Campaign'
import Product from './pages/Product'
// import Productdetails from './pages/Productdetails'
import SplashScreen from './pages/SplashScreen'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import NotFoundPage from './pages/NotFoundPage'
import OrderConfirmation from './pages/OrderConfirmation'
import FAQPage from './pages/FAQPage'
import AccountPage from './pages/user/AccountPage'
import Trackorder from './pages/Trackorder'
import ProductSection from './pages/ProductSection' 
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import About from './pages/About'
import Categoryproduct from './pages/product/Categoryproduct'
import Checkout from './pages/Checkout'
import Singleblog from './components/blog/Singleblog'
import Viewcart from './pages/Viewcart'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Product/>} />
        <Route path="/category-products/:category" element={<Categoryproduct/>} />
        <Route path="/single-product/:id" element={<ProductSection/>} />
        <Route path="/campigns" element={<Campaign/>} />
        <Route path="/Contact" element={<Contact/>} />
        <Route path="/blogs" element={<Blog/>} />
        <Route path="/single-blog/:id" element={<Singleblog/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/checkout" element={<Checkout/>} />

        {/* <Route path="/blogs" element={<Blogs/>} /> */}
        {/* <Route path="/contact" element={<Contact/>} /> */}
        <Route path="/loved-products" element={<Wishlist/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/view-cart" element={<Viewcart/>} />
        {/* <Route path="/checkout" element={<Checkout/>} /> */}
        <Route path="/confirm-order" element={<OrderConfirmation/>} />
        <Route path="/faq" element={<FAQPage/>} />
        <Route path="/order-tracking" element={<Trackorder/>} />
        <Route path="/*" element={<NotFoundPage/>} />
        {/* --------------------user-pages--------------- */}
        <Route path="/my-account" element={<AccountPage/>} />
        {/* --------------------user-pages--------------- */}

      </Routes>
      <SplashScreen/>
    </Router>
  )
}

export default App
