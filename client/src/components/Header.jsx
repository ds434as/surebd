import React,{useEffect, useState,useRef} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoMdHeartEmpty } from "react-icons/io";
// import { IoCartOutline } from "react-icons/io5";
import { PiUserBold } from "react-icons/pi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import AuthModal from '../pages/AuthModal'; // Import the modal component
import shopping_img from "../assets/shopping.gif"
import { AiOutlineTruck } from "react-icons/ai";
import {AiFillFacebook, AiFillYoutube, AiFillInstagram } from "react-icons/ai";
import { IoMenu, IoClose } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import logo from "../assets/logo.png"
import axios from 'axios';
import toast,{ Toaster } from 'react-hot-toast';
import { FaHome, FaBoxOpen, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import {  FaWhatsapp, FaPhone, FaFacebookMessenger, FaExclamationTriangle, FaTimes } from "react-icons/fa";

const Header = () => {
    // -------------------menu item code----------
    const [isHovered, setIsHovered] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const base_url = "https://surebdbackend.arbeittechnology.com";
  const [isOpen, setIsOpen] = useState(false);

  
  
    const handleMouseEnter = (menuIndex) => {
      setIsHovered(menuIndex);
    };
  
    const handleMouseLeave = () => {
      setIsHovered(null);
    };
    // -------------------menu item code----------
    const [topbar,set_topbar]=useState(false);

    useEffect(()=>{
       window.addEventListener('scroll',()=>{
              if(window.scrollY>250){
                set_topbar(true)
              }else{
                set_topbar(false)
              }
         })
    },[])
    // ------------------sidebar--------------
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  // Disable page scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isSidebarOpen]);
// -----------------search-bar-typing-effect------------------
const placeholders = ["Search Something...", "Find Products...", "Explore Categories...", "Discover More..."];
const [placeholder, setPlaceholder] = useState("");
const [index, setIndex] = useState(0);
const [charIndex, setCharIndex] = useState(0);
const [isTyping, setIsTyping] = useState(true);

useEffect(() => {
  const currentPlaceholder = placeholders[index];
  let timeout;

  if (isTyping) {
    if (charIndex < currentPlaceholder.length) {
      timeout = setTimeout(() => {
        setPlaceholder((prev) => prev + currentPlaceholder[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);
    } else {
      timeout = setTimeout(() => setIsTyping(false), 1500); // Pause after completing typing
    }
  } else {
    if (charIndex > 0) {
      timeout = setTimeout(() => {
        setPlaceholder((prev) => prev.slice(0, -1));
        setCharIndex(charIndex - 1);
      }, 50);
    } else {
      setIsTyping(true);
      setIndex((prevIndex) => (prevIndex + 1) % placeholders.length); // Move to the next placeholder
    }
  }

  return () => clearTimeout(timeout);
}, [charIndex, isTyping, index, placeholders]);
// --------------------searchign suggestion-------------------

// Product Data
const [product] = useState([
  {
    id: 1,
    image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-23-600x600.jpg",
    title: "Label 20 RGB Keyboard",
  },
  {
    id: 2,
    image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-23-600x600.jpg",
    title: "Wireless Mouse",
  },
  {
    id: 3,
    image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-36-600x600.jpg",
    title: "Bluetooth Speaker",
  },
  {
    id: 4,
    image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-11-600x600.jpg",
    title: "Compact Cameras",
  },
  {
    id: 5,
    image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/black-5-600x600.jpg",
    title: "5G Smartphone",
  },
]);

// Filtered Suggestions

// ------------------------login popup--------------------------
const [isModalOpen, setModalOpen] = useState(false);

// --------------user authetication-----------------
const [user, setUser] = useState(null);
const [dropdownVisible, setDropdownVisible] = useState(false);
const navigate = useNavigate();
const dropdownRef = useRef(null);

useEffect(() => {
  // Get user data from localStorage
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }

  // Click outside handler
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

// Handle logout
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  navigate("/");
};
// -----------------trak-order---------------------------
useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
// -----------menu----------
const [menuVisible, setMenuVisible] = useState(false);

// -----------shopping-cart-------------------
const userInfo = JSON.parse(localStorage.getItem("user"));
const [products, setProducts] = useState([]);

// Fetch the cart data when the component mounts
useEffect(() => {
  const fetchCartData = async () => {
    try {
      const response = await axios.get(`${base_url}/user/cart/${userInfo?._id}`);
      if (response.data.success) {
        setProducts(response.data.cartData);
      }
    } catch (err) {
      console.error("Error fetching cart data", err);
    }
  };

  fetchCartData();
}, [userInfo]);

// Handle removing a product from the cart
// const handleRemoveProduct = async (productId) => {
//   try {
//     const response = await axios.delete(`${base_url}/user/cart/remove/${userInfo?._id}`, {
//       data: { productId }
//     });
//     if (response.data.success) {
//       setProducts(products.filter((product) => product.id !== productId));
//     }
//   } catch (err) {
//     console.error("Error removing product from cart", err);
//   }
// };

// Calculate total price
// const total = products.reduce((acc, product) => acc + product.price, 0);

const handlecartbar=()=>{
    toast.error("Please login first for add to cart!")
}
const [search, setSearch] = useState("");
const [showSuggestions, setShowSuggestions] = useState(false);
const [productList, setProductList] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);

// Fetch products
const fetchProducts = () => {
  axios
    .get(`${base_url}/admin/all-products`)
    .then((res) => {
      if (res.data.success) {
        setProductList(res.data.data);
      }
    })
    .catch((err) => console.log(err));
};

useEffect(() => {
  fetchProducts();
}, []);

// Filter products based on search query
useEffect(() => {
  if (search.trim() === "") {
    setFilteredProducts([]);
  } else {
    setFilteredProducts(
      productList.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      )
    );
  }
}, [search, productList]);
// -------------------category-------------------
const [categories, set_categories] = useState([]);

const all_category = () => {
  axios
    .get(`https://surebdbackend.arbeittechnology.com/admin/category`)
    .then((res) => {
      if (res.data.success) {
        set_categories(res.data.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

useEffect(() => {
  all_category();
}, []);
// ------------------cart-iteems-------------------------------------
const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Load cart items from localStorage when component mounts or cart opens
  useEffect(() => {
    if (isCartOpen) {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(savedCart);
    }
  }, [isCartOpen]);

  // Calculate total whenever cart items change
  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cartItems]);

  // Update localStorage whenever cart items change
  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cartItems));
  //   // Dispatch event to notify other components
  //   window.dispatchEvent(new Event('cartUpdated'));
  // }, [cartItems]);

  const handleRemoveProduct = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    toast.success("Product removed from cart");
  };

  const handleIncreaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  return (
   <section className='w-full  font-baji'>
    <Toaster/>
    {/* -----------------MARQUEE------------------ */}
    {/* <section className='px-[10px] py-[10px] hidden bg-red-500 text-white font-[600] xl:flex justify-center items-center font-roboto'>
      <marquee behavior="smooth" direction="">
      T-shirt/Clothing with your brand logo or design? We are delivering worldwide at unbeatable prices. 
      </marquee>
    </section> */}

    <section className='hidden lg:fle px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] py-[10px] border-b-[1px] border-gray-200 lg:flex justify-between items-center'>
      <ul className='flex justify-center items-center gap-[15px]'>
        <li className='hover:text-[#eb3b5a]'>
          <NavLink>About Us</NavLink>
        </li>
        <li className='hover:text-[#eb3b5a]'>
          <NavLink>FAQ</NavLink>
        </li>
        <li className='hover:text-[#eb3b5a]'>
          <NavLink>Help & Contact</NavLink>
        </li>
      </ul>

     <div className='flex justify-center items-center gap-[20px]'>
     {!user && (
            <li className="text-[17px] font-[500] flex items-center gap-[10px]">
              <NavLink to="/order-tracking" className="flex items-center gap-[8px]" onClick={() => setMenuVisible(false)}>
                <AiOutlineTruck className="text-[23px] text-[#eb3b5a]" />
                Track Your Order
              </NavLink>
            </li>
          )}

          <div className='flex justify-center items-center gap-[6px] text-[#eb3b5a]'>
            <FiPhoneCall/>
            <p>+8801608902082</p>
          </div>
     </div>

    </section>
    {/* -----------------------subheader-------------------- */}
        <div className="subheader px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] flex justify-between bg-white items-center py-[12px]">
        <NavLink to="/">
        <div className="logo flex justify-center items-center gap-[5px] lg:gap-[10px]">
            <img className='w-[120px] lg:w-[180px] ' src={logo} alt="" />
 
        </div>
        </NavLink>
        {/* --------------------searching suggestion---------------------- */}
        <div className="search w-full max-w-md lg:flex hidden mx-auto relative">
      {/* Search Input */}
      <div className="flex border-2 border-[#eb3b5a] overflow-hidden w-full rounded-md">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full outline-none bg-white text-gray-600 text-[16px] font-[500] px-4 py-3"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => setShowSuggestions(search.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        />
        <button
          type="button"
          className="flex items-center justify-center outline-none border-none bg-[#eb3b5a] text-white px-5"
        >
          <IoSearchSharp className="text-[23px]" />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
  <div
  className="absolute z-50 bg-white border border-gray-300 mt-1 rounded-md shadow-lg w-full max-h-64 overflow-y-auto thin-scrollbar"
  style={{ top: "100%", left: 0 }}
>
  {filteredProducts.length > 0 ? (
    filteredProducts.map((product) => (
      <NavLink to={`/single-product/${product?._id}?category=${product?.category}`} >
        <div
        key={product.id}
        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
      >
        <img
          src={`https://surebdbackend.arbeittechnology.com/images/${product?.images[0]}`}
          alt={product.productName}
          className="w-10 h-10 object-cover rounded-sm mr-3"
        />
        <div className="flex flex-col">
          <span className="text-gray-700 text-sm font-medium">{product?.productName}</span>
          <span className="text-gray-500 text-xs">
            {product?.description.length > 50
              ? product.description.slice(0, 50) + "..."
              : product.description}
          </span>
        </div>
      </div>
      </NavLink>
    ))
  ) : (
    <div className="px-4 py-2 text-gray-700 text-sm">No results found</div>
  )}
  <div className="px-4 py-2 text-red-500 text-sm font-medium cursor-pointer hover:underline">
    See all results ({filteredProducts.length})
  </div>
</div>

      )}
    </div>
    {/* ------------------------------searching suggestion------------- */}
        <div className="icons flex justify-center items-center gap-[25px]">
          {/* Heart Icon with Badge */}
          {/* <NavLink to="/loved-products">
          <div className="relative cursor-pointer">
        <IoMdHeartEmpty className="text-[27px] text-gray-700" />
        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-[500] w-5 h-5 flex items-center justify-center rounded-full">
          0
        </span>
      </div>
          </NavLink> */}
   
      {/* Cart Icon with Badge */}
 
      <div className="relative">
      {/* Cart Icon */}
{/* <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
        <IoCartOutline className="text-[27px] text-gray-700" />
        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-[500] w-5 h-5 flex items-center justify-center rounded-full">
            {products?.length}
          </span>
      </div> */}
        <div className="relative cursor-pointer" onClick={() => setIsCartOpen(!isCartOpen)}>
      <IoCartOutline className="text-[27px] text-gray-700" />
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-[500] w-5 h-5 flex items-center justify-center rounded-full">
          {cartItems.length}
        </span>
      )}
    </div>
      {/* Cart Sidebar */}
  <>
      {/* Blur Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[9999] transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 w-full sm:w-[80%] md:w-[50%] lg:w-[35%] xl:w-[25%] h-full z-[10000] bg-white shadow-lg border-l transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-base md:text-lg font-semibold">Shopping Cart ({cartItems.length})</h2>
          <AiOutlineClose 
            className="text-lg md:text-xl cursor-pointer" 
            onClick={() => setIsCartOpen(false)} 
          />
        </div>

        {/* Free Shipping Message */}
        {/* {cartItems.length > 0 && (
          <div className="bg-green-100 px-3 py-2 flex items-center text-xs md:text-sm">
            <span className="text-green-600 font-semibold mr-2">
              {total > 1000 ? "Congratulations! You've got FREE SHIPPING" : `Add ৳${(1000 - total).toFixed(2)} more for free shipping`}
            </span>
            <span className="text-green-600 text-lg">🚚</span>
          </div>
        )} */}

        {/* Cart Items */}
        <div className="px-3 py-3 flex-1 overflow-y-auto no-scrollbar space-y-3">
          {cartItems.length > 0 ? (
            cartItems.map((product) => (
              <div key={`${product.productId}-${product.size}-${product.color}`} className="flex items-start p-3 border rounded-lg shadow-sm">
                <img 
                  src={`https://surebdbackend.arbeittechnology.com/images/${product.image}`} 
                  alt={product.name} 
                  className="w-14 h-14 md:w-16 md:h-16 rounded object-cover" 
                />
                <div className="flex-1 ml-3">
                  <h3 className="text-sm md:text-base font-semibold text-gray-700 line-clamp-1">{product.name}</h3>
                  <p className="text-xs text-gray-500">
                    {product.size && `Size: ${product.size}`} 
                    {product.color && ` | Color: ${product.color}`}
                  </p>
                  <p className="text-sm md:text-base font-[500] text-gray-800 mt-1">
                    ৳{(product.price * product.quantity).toFixed(2)}
                  </p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2 border w-fit rounded">
                    <button
                      onClick={() => handleDecreaseQuantity(product.productId)}
                      className="px-2 py-1 text-sm font-bold hover:bg-gray-100"
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm">{product.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(product.productId)}
                      className="px-2 py-1 text-sm font-bold hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between h-full">
                  <AiOutlineDelete 
                    className="text-gray-500 cursor-pointer hover:text-red-500 text-sm md:text-base" 
                    title="Remove item" 
                    onClick={() => handleRemoveProduct(product.productId)} 
                  />
                  <p className="text-xs text-gray-500 mt-2">৳{product.price} each</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="text-base md:text-lg font-semibold">Your cart is empty 🛒</p>
              <p className="text-xs md:text-sm">Start adding products to your cart!</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t p-3 sticky bottom-0 bg-white flex flex-col">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm md:text-base font-semibold text-gray-700">Subtotal</span>
              <span className="text-lg md:text-xl font-bold">৳{total.toFixed(2)}</span>
            </div>
            {/* <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-gray-500">Shipping calculated at checkout</span>
            </div> */}
            <NavLink to="/view-cart" onClick={() => setIsCartOpen(false)}>
              <button className="w-full bg-gray-800 text-white py-2 text-sm md:text-base rounded mb-2 hover:bg-gray-700 transition">
                View Cart
              </button>
            </NavLink>
            {/* <NavLink to="/checkout" onClick={() => setIsCartOpen(false)}>
              <button className="w-full bg-green-600 text-white py-2 text-sm md:text-base rounded hover:bg-green-700 transition">
                Checkout Now
              </button>
            </NavLink> */}
          </div>
        )}
      </div>
    </>

    </div>
    <div className="relative">
  {/* If user exists, show profile */}
  {user ? (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        {/* Profile Picture or Initials */}
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 shadow-sm"
          />
        ) : (
          <div className="flex justify-center items-center bg-indigo-500 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 text-xl sm:text-2xl font-bold shadow-md">
            {user?.name?.charAt(0) || "U"}
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <div className="absolute top-full right-0 mt-2 w-48 sm:w-56 z-[10000] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-out animate-fade-in">
          <div className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border-b border-gray-200">
            {/* Profile Image */}
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="User Avatar"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
              />
            ) : null}
            <div>
              <p className="text-gray-800 font-semibold text-sm sm:text-base">
                {user?.username || "User"}
              </p>
              <p className="text-gray-500 text-xs sm:text-sm">
                {user?.email || "example@mail.com"}
              </p>
            </div>
          </div>

          {/* Menu Items */}
          <ul className="py-1 sm:py-2 text-sm sm:text-base">
            <li
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
              onClick={() => navigate("/my-account")}
            >
              My Profile
            </li>
            <li
              className="px-3 py-2 text-red-600 hover:bg-red-100 cursor-pointer font-medium"
              onClick={handleLogout}
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}
    </div>
  ) : (
    // Otherwise, show the login button
    <div
      className="flex justify-center items-center gap-2 cursor-pointer"
      onClick={() => setModalOpen(true)}
    >
      <PiUserBold className="text-xl sm:text-2xl text-gray-700" />
      <span className="text-sm sm:text-[17px] text-gray-700 font-[500]">
        Log In
      </span>
    </div>
  )}
</div>

    <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
        </div>
    {/* -----------------------subheader-------------------- */}
    <div>
      {/* Header */}
      <header className="flex px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] justify-between border-t-[1px] border-b-[1px]  border-[#eee] items-center  pt-[10px]  ">
      <div
  
  onClick={toggleSidebar}
>
  <div className="menu flex  px-[10px] xl:px-[25px] py-[9px] xl:py-[12px] justify-center cursor-pointer items-center gap-[15px] text-[15px] xl:text-[18px] font-[500]  rounded-t-[10px] bg-[#eb3b5a] text-white">
    <HiOutlineMenu className="text-[22px]" />
    <span>All Categories</span>
  </div>
</div>


    {/* ------------menu----------------------*/}
 {/* Mobile Menu Button */}
      {/* Mobile Menu Button */}
      <div className="text-[28px] cursor-pointer lg:hidden flex" onClick={() => setMenuVisible(true)}>
        <IoMenu />
      </div>

      {/* Sidebar Navigation */}
      <nav
  className={`fixed top-0 right-0 w-[280px] h-full bg-white shadow-lg z-50 transform ${
    menuVisible ? "translate-x-0" : "translate-x-full"
  } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:w-auto lg:shadow-none lg:bg-transparent flex flex-col`}
>
        {/* Close Button */}
        <div className="p-4 flex justify-end lg:hidden">
          <IoClose className="text-[28px] cursor-pointer" onClick={() => setMenuVisible(false)} />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-6 p-6 lg:p-0 flex-grow">
          <li className="text-[17px] font-[500]">
            <NavLink to="/" onClick={() => setMenuVisible(false)}>Home</NavLink>
          </li>
          <li className="text-[17px] font-[500]">
            <NavLink to="/products" onClick={() => setMenuVisible(false)}>Products</NavLink>
          </li>
          <li className="text-[17px] font-[500]">
            <NavLink to="/blogs" onClick={() => setMenuVisible(false)}>Blogs</NavLink>
          </li>
          <li className="text-[17px] font-[500]">
            <NavLink to="/contact" onClick={() => setMenuVisible(false)}>Contact</NavLink>
          </li>
          {/* <li className="text-[17px] font-[500]">
            <NavLink to="/contact" onClick={() => setMenuVisible(false)}>🔥Hot Deals</NavLink>
          </li> */}
        </ul>

        {/* Social Media Icons with Waving Animation */}
        <div className="relative  lg:hidden flex justify-center items-center p-6">
          {/* Animated Waving Background */}
          <div className="absolute w-40 h-12 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-xl opacity-70 animate-[wave_3s_infinite_ease-in-out]"></div>

          {/* Social Media Icons */}
          <div className="flex gap-5 relative z-10 animate-bounce">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <AiFillFacebook className="text-[28px] text-green-500 hover:text-blue-800 transition-transform duration-300 hover:scale-110" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <AiFillYoutube className="text-[28px] text-red-600 hover:text-red-800 transition-transform duration-300 hover:scale-110" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <AiFillInstagram className="text-[28px] text-pink-600 hover:text-pink-800 transition-transform duration-300 hover:scale-110" />
            </a>
          </div>
        </div>
      </nav>

      {/* Overlay when menu is open */}
      {menuVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden" onClick={() => setMenuVisible(false)}></div>
      )}

      {/* Tailwind Keyframes for Waving Animation */}
      <style>
        {`
          @keyframes wave {
            0% { transform: translateX(-10px) rotate(0deg); }
            25% { transform: translateX(10px) rotate(2deg); }
            50% { transform: translateX(-10px) rotate(0deg); }
            75% { transform: translateX(10px) rotate(-2deg); }
            100% { transform: translateX(-10px) rotate(0deg); }
          }
        `}
      </style>
    {/* ------------------------------------menu--------------- */}
      </header>

      {/* Sidebar */}
      <div
      className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6 h-full overflow-y-auto font-roboto">
        <h2 className="text-[20px] font-[600] font-jost mb-4">Categories</h2>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <NavLink to={`/category-products/${category?.title}`} key={index} className="border-b pb-2">
              <div
                className="flex justify-between items-center font-medium text-gray-700 cursor-pointer"
                onClick={() => toggleSubmenu(index)}
              >
                <span>{category.title}</span>
                {openSubmenu === index ? (
                  <FaMinus className="text-gray-600" />
                ) : (
                  <FaPlus className="text-gray-600" />
                )}
              </div>

              {/* Subcategories if available */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div
                  className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                    openSubmenu === index ? "max-h-[500px]" : "max-h-0"
                  }`}
                >
                  <ul className="pl-6 mt-2 space-y-2">
                    {category.subcategories.map((sub, subIdx) => (
                      <li key={subIdx} className="text-gray-600">
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </NavLink>
          ))}
        </ul>
      </div>

      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-600 text-[25px] cursor-pointer"
        onClick={toggleSidebar}
      >
        &times;
      </button>
    </div>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
   <header
  className={` fixed left-0 lg:flex hidden  z-[100] w-full px-[150px] bg-white shadow-lg justify-between items-center py-[17px] transition-all duration-500 ease-in-out transform ${
    topbar
      ? "top-0 opacity-100 translate-y-0"
      : "top-[-120%] opacity-0 translate-y-[-50px]"
  }`}
>
<div className="logo flex justify-center items-center gap-[10px]">
            <img className='w-[120px] md:w-[180px] ' src={logo} alt="" />
     
        </div>
  <nav>
  <ul className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-6 p-6 lg:p-0 flex-grow">
          <li className="text-[17px] font-[500]">
            <NavLink to="/" onClick={() => setMenuVisible(false)}>Home</NavLink>
          </li>
          <li className="text-[17px] font-[500]">
            <NavLink to="/products" onClick={() => setMenuVisible(false)}>Products</NavLink>
          </li>
          <li className="text-[17px] font-[500]">
            <NavLink to="/blogs" onClick={() => setMenuVisible(false)}>Blogs</NavLink>
          </li>
          <li className="text-[17px] font-[500]">
            <NavLink to="/contact" onClick={() => setMenuVisible(false)}>Contact</NavLink>
          </li>
          {/* <li className="text-[17px] font-[500]">
            <NavLink to="/contact" onClick={() => setMenuVisible(false)}>🔥Hot Deals</NavLink>
          </li> */}
        </ul>
  </nav>
</header>
 {/* Mobile Bottom Tab Bar */}
   <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200">
     <div className="flex justify-around items-center py-3">
       <NavLink 
         to="/" 
         className="flex flex-col items-center text-xs"
         activeClassName="text-[#eb3b5a]"
         exact
       >
         <FaHome className="text-xl mb-1 text-gray-800" />
         <span>Home</span>
       </NavLink>
       
       <NavLink 
         to="/products" 
         className="flex flex-col items-center text-xs"
         activeClassName="text-[#eb3b5a]"
       >
         <FaBoxOpen className="text-xl mb-1 text-gray-800" />
         <span>Products</span>
       </NavLink>
       
       <NavLink 
         to="/order-tracking" 
         className="flex flex-col items-center text-xs"
         activeClassName="text-[#eb3b5a]"
       >
         <FaMapMarkerAlt className="text-xl mb-1 text-gray-800" />
         <span>Track Order</span>
       </NavLink>
       
       <NavLink 
         to="/contact" 
         className="flex flex-col items-center text-xs text-gray-800"
         activeClassName="text-[#eb3b5a]"
       >
         <FaPhoneAlt className="text-xl mb-1" />
         <span>Contact</span>
       </NavLink>
     </div>
   </div>

<div className="fixed bottom-[80px] md:bottom-[20px] right-[10px] z-[1000]">
      {/* Contact Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="relative inline-flex items-center px-5 py-2 rounded-full bg-[#00FF66] shadow-lg animate-bounce cursor-pointer"
      >
        <div className="absolute -left-5 w-12 h-12 rounded-full border-[2px] p-[10px] border-[#00FF66] bg-white flex items-center justify-center shadow-md">
          <div className="bg-white w-full h-full flex justify-center items-center rounded-full">
            <FaPhoneAlt className="text-black text-xl" />
          </div>
        </div>
        <span className="text-black font-semibold pl-4 md:pl-6">Contact</span>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-64 border-[1px] border-gray-200 bg-white rounded-lg shadow-xl p-4 z-[1001]">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-600 text-lg"
          >
            <FaTimes />
          </button>

          {/* Popup Content */}
          <h2 className="text-lg font-bold text-black mb-1">Contact Us Now</h2>
          <p className="text-sm text-gray-600 mb-4">We will contact with you soon!</p>

          <div className="space-y-3">
            <button className="w-full bg-green-700 text-white flex items-center justify-center gap-2 py-2 rounded-md shadow-md">
              <FaWhatsapp />
              Whatsapp
            </button>

            <button className="w-full bg-green-700 text-white flex items-center justify-center gap-2 py-2 rounded-md shadow-md">
              <FaPhone />
              Call Us
            </button>

            <button className="w-full bg-green-700 text-white flex items-center justify-center gap-2 py-2 rounded-md shadow-md">
              <FaFacebookMessenger />
              Messenger
            </button>

          
          </div>
        </div>
      )}
    </div>

   </section>
  )
}

export default Header
