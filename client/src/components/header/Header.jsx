import React,{useContext, useEffect, useRef, useState} from 'react'
import Subheader from './Subheader';
import { GrClose } from "react-icons/gr";
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { CiShoppingBasket } from "react-icons/ci";
import { MdOutlineArrowOutward } from "react-icons/md";
import axios from "axios"
import cart_logo from "../../assets/cart_logo.gif"
import { HiOutlineShoppingBag } from "react-icons/hi2";
import logo from "../../assets/logo.png"
import { IoIosSearch } from "react-icons/io";
import { FiMenu } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import { AiOutlineTruck } from "react-icons/ai";
import baki_express from "../../assets/baki_express.png"
import Cartpage from '../../pages/Cartpage';
import { FcSearch } from "react-icons/fc";
import { NavLink, useNavigate } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineMinus } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Appcontext } from '../../context/Appcontext';
import Carditembox from './Carditembox';
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { PiShoppingCartSimple } from "react-icons/pi";
import Header3 from './Header3';
import Header4 from './Header4';
import { IoMdHeartEmpty } from "react-icons/io";
// import { IoCartOutline } from "react-icons/io5";
import { PiUserBold } from "react-icons/pi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { FaPlus, FaMinus } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";

const Header = () => {
    const [navbar,activenavbar]=useState(false);
    const [activecart,setactivecart]=useState(false);
    const [activecategory,setactivecategory]=useState(false);
    const [activesidebar,setactivesidebar]=useState(false);
    const [searchmodel,setsearchmodel]=useState(false);
    const {handlesearchpageproducts,getcategorysearch,setgetcategorysearch,searchvalue,searchvalueget,setgetsearchvalue,cartItems,incrementCartitem,removeitem,decrementCartitem,activeitem,setactiveitem}=useContext(Appcontext);
    const [mobilesearchvalue,setmobilesearchvalue]=useState("");
    const [searchvalue2,setsearchvalue2]=useState([]);
    const searchtab=document.querySelectorAll(".searchtab");
    const backend_link="https://surebdbackend.arbeittechnology.com/";
    const [searchproduct,setsearchproduct]=useState("");
    const [findproducts,setfindproducts]=useState([]);
 // -------------------menu item code----------
    const [isHovered, setIsHovered] = useState(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Sample Products
    const products = [
      {
        id: 1,
        name: "Mini Fridge Portable Cosmetic Beauty Refrigerator",
        price: 125,
        image:
          "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-44-768x768.jpg",
      },
      {
        id: 2,
        name: "Vinova Galaxy Fold 256GB Original Phone",
        price: 350,
        image:
          "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-46-768x768.jpg",
      },
      {
        id: 1,
        name: "Mini Fridge Portable Cosmetic Beauty Refrigerator",
        price: 125,
        image:
          "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-10-600x600.jpg",
      },
      {
        id: 2,
        name: "Vinova Galaxy Fold 256GB Original Phone",
        price: 350,
        image:
          "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-14-600x600.jpg",
      },
      {
        id: 1,
        name: "Mini Fridge Portable Cosmetic Beauty Refrigerator",
        price: 125,
        image:
          "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-15-600x600.jpg",
      },
      {
        id: 2,
        name: "Vinova Galaxy Fold 256GB Original Phone",
        price: 350,
        image:
          "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-11-600x600.jpg",
      },
      {
        id: 3,
        name: "Vinova Ultra 256GB Original Snapdragon Android Phone",
        price: 120,
        image:
          "https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-44-768x768.jpg",
      },
    ];
  
    const total = products.reduce((sum, product) => sum + product.price, 0);
  
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
const [search, setSearch] = useState("");
const [showSuggestions, setShowSuggestions] = useState(false);

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
const filteredProducts = product.filter((product) =>
  product.title.toLowerCase().includes(search.toLowerCase())
);
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
    function activeitemfunction(){
        setactiveitem(!activeitem)
    }
    searchtab.forEach((item)=>{
        item.addEventListener("click",()=>{
            setgetsearchvalue("");
            setsearchproduct("")
        })
    })
    let total_price=0;
    cartItems.map((e)=>{
          total_price=e.price*e.quantity+total_price;
    });
    // handle search input
    function handlesearch(e){
        setsearchproduct(e.target.value);
        if(e.target.value.length > 0){
            setsearchmodel(true)
        }
    }

// useEffect(()=>{

//   async function productsearchsecond(){
//     await  axios.get(`${backend_link}/search-produts/${mobilesearchvalue}`)
//       .then((res)=>{
//         setsearchvalue2(res.data.products);
//         console.log(res.data.products)
        
//       }).catch((err)=>{
//          console.log(err)
//       })   
//     };
//   console.log(searchvalueget)
//   productsearchsecond();
// },[searchvalueget,mobilesearchvalue])
    function closecartbox(){
        setactivecart(false)
    }
    // onscroll navbar style
    window.addEventListener("scroll",()=>{
        if(window.scrollY >400){
            activenavbar(true)
        }else if(window.scrollY <400){
            activenavbar(false)
        }
    })
    function activecartfunc(){
        setactivecart(true);
    }
    // setactivesidebar
    function sidebartoggle(){
        setactivesidebar(true)
    }
    function closesidebar(){
        setactivesidebar(false)
    }
    // ------------search model-------------
    function showsearchtab(){
        setsearchmodel(true)
    }
    function closesearch(){
        setsearchmodel(false);
    }
    // navlinks
    const navlink = [
        {   id:1,
            name:"Home",
            path:"/"
        },
        {   id:2,
            name:"Products",
            path:"/products"
        },
        {   id:3,
            name:"Sales",
            path:"/sales"
        },
        {    id:4,
            name:"About",
            path:"/about"
        },
        {    id:5,
            name:"Blogs",
            path:"/blogs"
        },
        {   id:6,
            name:"Contact",
            path:"/contact"
        }
    ]
    // active category button
    function activecategoryfunction(){
           setactivecategory(!activecategory)
    }
//   slick slider
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
// ====================search product====================
const searchingproduct=()=>{
    axios.get(`${backend_link}/search-produts/${searchproduct}`)
    .then((res)=>{
        setfindproducts(res.data.products)
    }).catch((err)=>{
        console.log(err)
    })
}
useEffect(()=>{
    searchingproduct()
},[searchproduct])
    return (
        <section className=''>
    {/* -----------------MARQUEE------------------ */}
    <section className='px-[10px] py-[10px] bg-red-500 text-white font-[600] flex justify-center items-center font-baji'>
      <marquee behavior="smooth" direction="">
      T-shirt/Clothing with your brand logo or design? We are delivering worldwide at unbeatable prices. 
      </marquee>
    </section>
          <div className='w-full h-auto px-[20px] border-b-[1px] border-[#eee] md:px-[150px] py-[15px] flex justify-between items-center'>
        {/* -------------------bottom cart-page----------------- */}
        <div className={activeitem ? 'fixed bottom-0 left-0 transition-all duration-300 w-full h-[250px] md:h-[120px] z-[100000]':'fixed transition-all duration-300 bottom-0 left-0 w-full h-0 z-[100000]'}>
              <div onClick={activeitemfunction} className='absolute bottom-[100%] py-[8px] md:py-[10px] left-0 bg-[#00a8ff] text-white cursor-pointer flex justify-center items-center gap-[10px] w-[200px]'>
                    <h1 className='text-[13px] md:text-[14px]'>{cartItems.length} Items In Your Cart</h1>
                    <button><IoIosArrowDown/></button>
                </div>
             <section className={activeitem ? 'w-full  h-[250px] md:h-[120px] bg-white shadow-boxshadow4 fixed z-[20000] bottom-0 transition-all duration-300 left-0':'w-full h-[100px] transition-all duration-300 bg-white shadow-boxshadow4 fixed z-[20000] bottom-[-120%] left-0'}>
              <div className='md:flex-row flex flex-col '>
              <section className=' relative w-[100%] overflow-x-auto no-scrollbar md:w-[70%] h-[120px] md:h-auto p-[10px] flex gap-[10px] items-center '>
             {
                cartItems?.length > 0 ?           <Glider
                draggable
                slidesToShow={7}
                slidesToScroll={1}
              >
              {
                              cartItems.map((item)=>{
                                  return(
                                    
                                  <Carditembox data={item}/>
                                  )
                              })
                             }
                  </Glider>:<section className='w-full h-full flex justify-center items-center'>
                    <div className='flex justify-center items-center flex-col'>
                        <img className='w-[100px]' src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fempty-cart.373610ed.png&w=384&q=75" alt="" />
                        <h1 className='text-[16px] mt-[10px] font-fredoka '>Your cart is empty!</h1>
                    </div>
                  </section>

             }
    
               
             
               
              
                 
                   
               </section>
               <section className='w-[100%] md:w-[30%] h-[130px] md:h-[120px] border-l-[2px]  md:flex md:flex-row flex flex-col border-[#F1F1F1] p-[10px]  justify-between items-center'>
                <div className='w-[100%] md:w-[50%]'>
                    <div className='flex gap-[10px]'>
                        <h1 className='text-[16px] '>Total Items :</h1>
                        <h1 className='text-[16px] font-[600]'>{cartItems?.length}</h1>
                    </div>
                    <div className='flex gap-[10px] font-fredoka mt-[10px]'>
                        <h1 className='text-[18px]'>Total Price</h1>
                        <h1 className='text-[18px] font-[500] text-[#eb3b5a]'>${total_price}</h1>
                    </div>
                </div>
                <div className='w-[100%] md:w-[50%] flex gap-[10px]'>
                    <NavLink to="/view-cart" className='bg-btncolor w-[50%] md:w-auto h-[50px] md:h-auto text-white px-[12px] py-[15px] text-[14px]'>View Cart</NavLink>
                    <NavLink to="/checkout-page" className='bg-btncolor w-[50%] md:w-auto h-[50px] md:h-auto text-white px-[12px] text-[14px] py-[15px]'>Checkout</NavLink>
                </div>
               </section>
              </div>
            </section>
         </div>
            {/* ----------------cart page------------------- */}
        <div className={activecart ? 'w-[100%] bg-[rgba(0,0,0,0.4)] h-[100vh] fixed top-0 right-0 z-[105656565000]':"w-[100%] bg-[rgba(0,0,0,0.4)] overflow-auto fixed top-0 z-[105656565000] right-[-200%]"}>
           <div className={activecart ? 'w-[100%] md:w-[25%] h-[100%] overflow-y-auto no-scrollbar bg-white absolute top-0 right-0 p-[20px] transition-all duration-300 ':'absolute top-0 right-[-120%] transition-all duration-300 '}>
                       <div className='w-full py-[20px] flex justify-between items-center'>
                        <h2 className='text-[18px] font-[600]'>Shopping Cart</h2>
                        <button className='text-[25px]'onClick={closecartbox}><IoClose/></button>
                       </div>
                       {/* --------------------cart product------------------ */}
                        {
                            cartItems?.length > 0 ?  <div className=''>
                            <section className='w-full h-[60vh] overflow-auto no-scrollbar'>
                            {
                              cartItems.map((item)=>{
                                  return(
                                      <div className='w-full h-auto py-[15px] flex gap-[15px] border-t-[1px] border-[#eee]'>
                                      <div className='w-[30%] md:w-[30%] h-auto md:h-[100px]'>
                                      {
  item.photo.slice(0,1).map((images)=>{
    return(
      <img className='md:w-[100%] h-[100%] md:h-[100px] rounded-[10px]' src={`${backend_link}/images/${images}`} alt="" />
    )
  })
}
                                       </div>
                                       <div className='w-[100%]'>
                                           <h2 className='text-[14px] mb-[5px]'>{item.title}</h2>
                                           <div className='flex justify-start items-center mb-[5px]'>
                                               <h2>${item.price}</h2>
                                               <span className='flex justify-center items-center'><IoClose/>{item.quantity}</span>
                                           </div>
                                           <div className='flex justify-between items-center'>
                                           <div className='flex items-center border-[1px] border-[#EEE] px-[10px] py-[6px]'>
                                           <button className='px-[7px] py-[3px] text-[#171717]'onClick={()=>{incrementCartitem(item._id)}}><AiOutlinePlus/></button>
                                           <h2 className='px-[7px] py-[3px]'>{item.quantity}</h2>
                                           <button className='px-[7px] py-[3px]'onClick={()=>{decrementCartitem(item._id)}}><HiOutlineMinus/></button>
                                       </div>
                                       <div>
                                           <button className='p-[8px] text-white bg-red-400 rounded-[5px]'onClick={()=>{removeitem(item._id)}}><MdDelete/></button>
                                       </div>
                                           </div>
                                       </div>
                                      </div>
                                  )
                              })
                            }
                            </section>
                            <section className='w-full h-[40%] py-[30px] border-t-[2px] border-[#eee]'>
                              <div className='w-full flex justify-between items-center pb-[20px]'>
                                <h1 className='text-[20px] font-[500] font-fredoka '>Subtotal</h1>
                                <h1 className='text-[20px] font-fredoka text-[#6364DB] font-[500]'>400$</h1>
                              </div>
                            <div className='w-full flex gap-[10px] flex-col'>
                            <NavLink to="/view-cart"className='w-[100%] h-[50px] bg-[#F1F1F1] text-black hover:bg-[#03041c] hover:text-white  transition-all duration-200 font-poppins text-[18px] font-[500] flex justify-center items-center'><button>View Cart</button></NavLink>
                             <NavLink to="/checkout-page"className='w-[100%] h-[50px] border-[1px] border-[#F1F1F1] hover:bg-[#03041c] transition-all duration-200 hover:text-white mt-[10px] text-black flex justify-center items-center'><button>Checkout</button></NavLink>
                           </div>    
                            </section>
                           </div>:
                          <section className='w-full h-[80vh]'>
                             <section className='w-full h-[60%] flex justify-center items-center'>
                                   <div className=' text-center'>
                                    <div className="flex justify-center items-center">
                                        <img className='w-[80%] m-auto:' src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fempty-cart.373610ed.png&w=384&q=75" alt="" />
                                    </div>
                                    <h1 className='text-[18px] font-fredoka mt-[10px]'>Your cart is empty</h1>
                                    <NavLink to="/products"><button className='mt-[15px] px-[30px] py-[12px] text-[17px] cursor-pointer font-fredoka bg-[#F1F1F1]'>Go To Shop</button></NavLink>
                                   </div>
                            </section>
                            <section className='w-full h-[40%] py-[30px] border-t-[2px] border-[#eee]'>
                              <div className='w-full flex justify-between items-center pb-[20px]'>
                                <h1 className='text-[20px] font-[500] font-fredoka '>Subtotal</h1>
                                <h1 className='text-[20px] font-fredoka text-[#6364DB] font-[500]'>400$</h1>
                              </div>
                            <div className='w-full flex gap-[10px] flex-col'>
                            <NavLink to="/view-cart"className='w-[100%] h-[50px] bg-[#F1F1F1] text-black hover:bg-[#03041c] hover:text-white  transition-all duration-200 font-poppins text-[18px] font-[500] flex justify-center items-center'><button>View Cart</button></NavLink>
                             <NavLink to="/checkout-page"className='w-[100%] h-[50px] border-[1px] border-[#F1F1F1] hover:bg-[#03041c] transition-all duration-200 hover:text-white mt-[10px] text-black flex justify-center items-center'><button>Checkout</button></NavLink>
                           </div>    
                            </section>
                          </section>


                        }
                        
                       {/* --------------------cart product------------------ */}
           </div>
    </div>
        <div className="logo">
        <NavLink to="/">
        <div className="logo">
            <img src="https://htmlbeans.com/html/schon/images/mt-logo.png" alt="" />
        </div>
          
            </NavLink>
        </div>
        <div className="search-box w-[30%] md:block hidden relative">
            <div className="flex rounded-md border-2 border-yellow-400 overflow-hidden w-full">
              <input
                type="text"
                placeholder={placeholder} // Set animated placeholder
                className="w-full outline-none bg-white text-gray-600 text-[16px] font-[500] px-4 py-3"
                onChange={handlesearch} 
              />
              <button type="button" className="flex items-center justify-center bg-yellow-400 px-5">
                <IoSearchSharp className="text-[23px]" />
              </button>
            </div>
           {
            searchproduct.length >0 ?  <div className='absolute no-scrollbar  top-[100%] z-[1000000] left-o w-full h-[300px] overflow-y-auto rounded-b-[10px] bg-white shadow-2xl'>
            <ul className=''>
               <div className='px-[20px] py-[10px] w-full flex justify-between items-center'>
               <div className=' text-[16px] font-space text-green-500'>{findproducts.length} Product Match</div>
               <button className='text-[16px] font-[600] font-space text-neutral-600 hover:text-green-500'>Shop Now</button>
               </div>
             {
              findproducts?.length >0 ? findproducts.map((item)=>{
                  return(
                      <NavLink to={`/search-result/product?category=${item.main_category}&sub_category=${item.sub_category}&sub_sub_category=${item.sub_sub_category}`} onClick={()=>{setgetcategorysearch(item.main_category)}}>
                      <li className='searchtab px-[20px] py-[10px] hover:text-[#ffab02] hover:bg-slate-100 duration-150 flex justify-between items-center text-[15px]'><span>{item.title}</span><MdOutlineArrowOutward className='text-[25px] text-neutral-500 hover:text-neutral-800'/></li>
                       </NavLink>
                  )
              }):<section className='w-full h-[200px] flex flex-col justify-center items-center'>
              <div>
              <img className='w-[100px]' src={cart_logo} alt="" />
              </div>
              <h1 className='font-quicksand mt-[10px] text-[18px] font-[600] text-neutral-500'>{searchvalueget} did not found!</h1>
      </section>
             }
            </ul>
          </div>:""
           }
        </div>
        <div>
        <div className='flex justify-center items-center  md:gap-[10px]'>
                <button className='md:hidden cursor-pointer text-[26px]  md:w-[50px] md:h-[50px] w-[45px] h-[45px] rounded-full flex justify-center items-center'onClick={showsearchtab}>
                   <IoIosSearch className='text-[25px]'/>
                </button>
                <button className='text-[26px] cursor-pointer   md:h-[50px] md:w-[50px] w-[45px] h-[45px] rounded-full flex justify-center items-center '>
                   <NavLink to="/login"> <BiUser className='text-[25px] md:text-[30px] font-[400]'/></NavLink>
                </button>
                <button className='text-[30px] cursor-pointer relative  md:h-[50px] md:w-[50px] w-[45px] h-[45px] rounded-full flex justify-center items-center'onClick={activecartfunc}>
             {cartItems?.length > 0 ? <div className='w-[23px] md:w-[31px] absolute md:top-[-5px] md:right-[-10px] top-[-5px] right-[-5px] rounded-full h-[23px]  md:h-[31px] bg-white flex justify-center items-center'><div className=" font-quicksand font-[600] text-[14px] bg-[#F7931E] w-[20px] h-[20px]  md:w-[25px] md:h-[25px] rounded-full flex justify-center items-center text-white">{cartItems?.length}</div> </div>:"" }
                   <HiOutlineShoppingBag className='text-[25px] md:text-[30px]'/>
                </button>
            </div>
        </div>
          </div>
    {/* bg-[#ffab02] */}
    {/* -----------------------search-page----------------- */}
        <section className={searchmodel ? 'fixed top-0 left-0 bg-tranparentbg w-full md:hidden h-[100vh] z-[10000] transition-all duration-300 flex justify-center items-center':"fixed top-0 left-[-200%] transition-all duration-300 bg-tranparentbg w-full md:hidden h-[100vh] z-[10000] flex justify-center items-center"}>
            <section className="w-[90%] h-[70vh] bg-white rounded-[40px] relative p-[20px]">
                   <div className="close absolute cursor-pointer top-[30px] right-[20px] text-[20px]"onClick={closesearch}>
                   <GrClose/>
                   </div>
                   <section className='relative'>
                       <form className='w-full h-[60px] relative  mt-[50px]'>
                        <div className='absolute top-0 left-0 w-[15%] flex justify-center items-center h-[100%]'>
                             <button className='text-[25px] cursor-pointer'><FcSearch/></button>   
                        </div>
                        <input onChange={(e)=>{setmobilesearchvalue(e.target.value)}} type="text"placeholder='Write Something...'className='pl-[15%] w-full  border-[1px] h-[60px] rounded-[5px] border-[#eee]' />
                       </form>
                       {
            setmobilesearchvalue.length >0 ?  <div className='absolute no-scrollbar  top-[100%] z-[1000000] left-o w-full h-[300px] overflow-y-auto rounded-b-[10px] bg-white'>
            <ul className=''>
             {
              searchvalue2?.length >0 ? searchvalue2.map((item)=>{
                  return(
                      <NavLink to={`/search-result?productname=${item.title}&category=${item.category}`}>
                      <li className='searchtab px-[20px] py-[10px] hover:text-[#ffab02] hover:bg-slate-100 duration-150 flex justify-between items-center text-[15px]'><span>{item.title}</span><MdOutlineArrowOutward className='text-[25px] text-neutral-500 hover:text-neutral-800'/></li>
                       </NavLink>
                  )
              }):<section>
                  <div>
                    <img src={cart_logo} alt="" />
                  </div>
              </section>

             }
            </ul>
          </div>:""
           }
                   </section>
            </section>
        </section>
        {/* -------------------------login popup------------------------- */}
        <section>

        </section>
      {/* Header */}
      <header className="flex px-[150px] justify-between border-t-[1px] border-b-[1px] border-[#eee] items-center py-[25px]  ">
        <div
          className="menu flex bg-[#FDD330] px-[20px] py-[12px] justify-center cursor-pointer items-center gap-[10px] text-[18px] font-[500]"
          onClick={toggleSidebar}
        >
          <HiOutlineMenu className="text-[22px]" />
          <span>All Categories</span>
        </div>
        <nav className="main_header">
        <ul className="flex justify-center items-center gap-[30px] relative">
        <li className="text-[17px] font-[500]">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="text-[17px] font-[500]">
          <NavLink to="#">About Us</NavLink>
        </li>
        <li className="text-[17px] font-[500]">
          <NavLink to="/products">Products</NavLink>
        </li>
        <li className="text-[17px] font-[500]">
          <NavLink to="/blogs">Blogs</NavLink>
        </li>
        <li className="text-[17px] font-[500]">
          <NavLink to="/contact">Contact</NavLink>
        </li>

        {/* Show "Track Your Order" only if no user is logged in */}
        {!user && (
          <li className="text-[17px] font-[500] flex items-center gap-[10px]">
            <NavLink to="/order-tracking" className="flex items-center gap-[8px] ">
              <AiOutlineTruck className="text-[23px] text-[#eb3b5a]" />
              Track Your Order
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
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
                  {/* Desktop */}
                  <li className="border-b pb-2 flex justify-between items-center font-medium text-gray-700 cursor-pointer">
                    Desktop
                  </li>
      
                  {/* Laptop */}
                  <li className="border-b pb-2">
                    <div
                      className="flex justify-between items-center font-medium text-gray-700 cursor-pointer"
                      onClick={() => toggleSubmenu(1)}
                    >
                      <span>Laptop</span>
                      {openSubmenu === 1 ? (
                        <FaMinus className="text-gray-600" />
                      ) : (
                        <FaPlus className="text-gray-600" />
                      )}
                    </div>
                    <div
                      className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                        openSubmenu === 1 ? "max-h-[500px]" : "max-h-0"
                      }`}
                    >
                      <ul className="pl-6 mt-2 space-y-2">
                        <li className="text-gray-600">All Laptop</li>
                        <li className="text-gray-600">Gaming Laptop</li>
                        <li className="text-gray-600">Premium Ultrabook</li>
                        <li className="text-gray-600">Laptop Bag</li>
                        <li className="text-gray-600">Laptop Accessories</li>
                      </ul>
                    </div>
                  </li>
      
                  {/* Component */}
                  <li className="border-b pb-2">
                    <div
                      className="flex justify-between items-center font-medium text-gray-700 cursor-pointer"
                      onClick={() => toggleSubmenu(2)}
                    >
                      <span>Component</span>
                      {openSubmenu === 2 ? (
                        <FaMinus className="text-gray-600" />
                      ) : (
                        <FaPlus className="text-gray-600" />
                      )}
                    </div>
                    <div
                      className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                        openSubmenu === 2 ? "max-h-[500px]" : "max-h-0"
                      }`}
                    >
                      <ul className="pl-6 mt-2 space-y-2">
                        <li className="text-gray-600">Motherboards</li>
                        <li className="text-gray-600">Processors</li>
                        <li className="text-gray-600">Graphics Cards</li>
                        <li className="text-gray-600">RAM</li>
                        <li className="text-gray-600">Storage</li>
                      </ul>
                    </div>
                  </li>
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
               <header
              className={`flex fixed left-0  w-full px-[150px] z-[100] bg-white shadow-lg justify-between items-center py-[30px] transition-all duration-500 ease-in-out transform ${
                topbar
                  ? "top-0 opacity-100 translate-y-0"
                  : "top-[-120%] opacity-0 translate-y-[-50px]"
              }`}
            >
              <div className="logo">
                <img src="https://htmlbeans.com/html/schon/images/mt-logo.png" alt="" />
              </div>
              <nav>
                <ul className="flex justify-center items-center gap-[30px] relative">
                  {/* Home Dropdown */}
                  <li className="text-[17px] font-[500]">
                            <NavLink to="/">Home</NavLink>
                          </li>
                          <li className="text-[17px] font-[500]">
                            <NavLink to="#">About Us</NavLink>
                          </li>
                          <li className="text-[17px] font-[500]">
                            <NavLink to="/products">Products</NavLink>
                          </li>
                          {/* Products Dropdown */}
                          {/* <li
                            className="relative text-[17px] font-[500] group"
                            onMouseEnter={() => handleMouseEnter(1)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <NavLink to="#" className="flex items-center">
                              Products
                              <span
                                className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${
                                  isHovered === 1 ? "rotate-180" : "rotate-0"
                                }`}
                              >
                                <FaChevronDown />
                              </span>
                            </NavLink>
                            <ul
                              className={`absolute left-0 overflow-hidden bg-white shadow-lg rounded-lg mt-2 w-40 transition-all duration-300 ease-in-out ${
                                isHovered === 1 ? "max-h-40 py-2" : "max-h-0"
                              }`}
                            >
                              <li className="px-4 py-2 hover:ml-[10px] transition-all duration-200">
                                <NavLink to="#">Product One</NavLink>
                              </li>
                              <li className="px-4 py-2 hover:ml-[10px] transition-all duration-200">
                                <NavLink to="#">Product Two</NavLink>
                              </li>
                            </ul>
                          </li> */}
                    
                          {/* <li className="text-[17px] font-[500]">
                            <NavLink to="/campigns">Campaign</NavLink>
                          </li> */}
                          <li className="text-[17px] font-[500]">
                            <NavLink to="/blogs">Blogs</NavLink>
                          </li>
                          <li className="text-[17px] font-[500]">
                            <NavLink to="/contact">Contact</NavLink>
                          </li>
                  <div className="relative cursor-pointer">
                    <IoMdHeartEmpty className="text-2xl text-gray-700" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-[500] w-5 h-5 flex items-center justify-center rounded-full">
                      1
                    </span>
                  </div>
                  {/* Cart Icon with Badge */}
                  <div className="relative cursor-pointer">
                    <IoCartOutline className="text-2xl text-gray-700" />
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-[500] w-5 h-5 flex items-center justify-center rounded-full">
                      0
                    </span>
                  </div>
                </ul>
              </nav>
            </header>
        {/* -----------------------scrolling header------------------- */}
        </section>
  )
}

export default Header