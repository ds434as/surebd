import React,{useContext, useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { BiUser } from "react-icons/bi";
import { RiShoppingCartLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineMinus } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import { FaUserLarge } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { TbMenu2 } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import Cartpage from '../cart/Cartpage';
import { IoClose } from "react-icons/io5";
import { BsGridFill } from "react-icons/bs";
import Subheader from './Subheader';
import { HiOutlineShoppingBag } from "react-icons/hi2";

import Productdata from '../../data/Productdata';
import { BsSearch } from "react-icons/bs";
import { MdOutlineArrowOutward } from "react-icons/md";
import { Appcontext } from '../../context/Appcontext';
import { IoIosArrowDown } from "react-icons/io";
import { LuShoppingBasket } from "react-icons/lu";
import axios from "axios"
import { FcSearch } from "react-icons/fc";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { MdOutlineSearch } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
const Userheader = () => {
    const [navbar,activenavbar]=useState(false);
    const [activecart,setactivecart]=useState(false);
    const [colorgenerate,setcolor]=useState();
    const [activecategory,setactivecategory]=useState(false);
    const [activesidebar,setactivesidebar]=useState(false);
    const [searchmodel,setsearchmodel]=useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchvalue,setsearchvalue]=useState([]);
    const [searchvalueget,setgetsearchvalue]=useState("");
    const [mobilesearchvalue,setmobilesearchvalue]=useState("");
    const [searchvalue2,setsearchvalue2]=useState([]);
    const searchtab=document.querySelectorAll(".searchtab");
    searchtab.forEach((item)=>{
        item.addEventListener("click",()=>{
            setgetsearchvalue("");
            setsearchmodel(false)
        })
    })
    // handle search input
    function handlesearch(e){
        setgetsearchvalue(e.target.value)
    }
    const navigate=useNavigate();
    const handleToggle = () => {
      setIsOpen(!isOpen);
    };
    const {cartItems,usercart,incrementCartitem,removeitem,decrementCartitem,}=useContext(Appcontext)
    const {carts}=useContext(Appcontext);
    const user_info=JSON.parse(localStorage.getItem("user_info"));
    function closecartbox(){
        setactivecart(false)
    }
    function activecategoryfunction(){
        setactivecategory(!activecategory)
 }
 useEffect(()=>{
  usercart();
  console.log(carts)
 },[])
    // onscroll navbar style
    window.addEventListener("scroll",()=>{
        if(window.scrollY >0){
            activenavbar(true)
        }else{
            activenavbar(false)
        }
    })
    // navlinks

    // activecartfunction
    function activecartfunc(){
        setactivecart(true)
    }
    // logoutfunction
    function logoutfunction(){
        let confirmbox=confirm("Are you sure to log out?")
        if(confirmbox){
            const token=localStorage.removeItem("user_token");
            localStorage.removeItem("user_info");
            setTimeout(() => {
                navigate("/")
            }, 1000);
        }
    }
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
    useEffect(()=>{
        async function productsearch(){
        await  axios.get(`http://localhost:8800/search-produts?title=${searchvalueget}`)
          .then((res)=>{
              setsearchvalue(res.data.products);
          }).catch((err)=>{
             console.log(err)
          })   
        };
        async function productsearchsecond(){
          await  axios.get(`http://localhost:8800/search-produts?title=${mobilesearchvalue}`)
            .then((res)=>{
              setsearchvalue2(res.data.products);
            }).catch((err)=>{
               console.log(err)
            })   
          };
        productsearch();
        productsearchsecond();
      },[searchvalueget,mobilesearchvalue])
  return (
    <>
    <Subheader/>
    <div className='w-full h-auto px-[30px] md:px-[150px] py-[20px] flex justify-between items-center border-b-[1px] border-[#eee]'>
        <Cartpage activecart={activecart} setactivecart={setactivecart}/>
        <div className="logo">
            <img src="https://wphix.com/template/gota/gota/assets/img/logo/logo-1.png" alt="" />
        </div>
        <div className="search-box md:block hidden relative">
            <div className='w-[500px] h-[50px] flex justify-center items-center rounded-[5px]'>
               <div className='relative w-[100%] h-[100%]'>
                <input type="text"placeholder='Search product...'onChange={handlesearch} className='placeholder-gray-600 rounded-r-[5px] border-[1px]  bg-transparent border-[#eee] rounded-l-[5px] px-[15px] py-[5px] w-full outline-none h-[100%] text-[#777]'  />
                <div className='w-[15%] h-[100%] bg-[#43B18A] rounded-r-[5px]  text-black absolute top-0 right-0 flex justify-center items-center'>
                    <button className='w-[100%] text-[30px] h-[100%] text-white font-[700] rounded-r-[5px] flex justify-center items-center'><MdOutlineSearch/></button>
                </div>
               </div>
            </div>
           {
            searchvalueget.length >0 ?  <div className='absolute no-scrollbar  top-[100%] z-[1000000] left-o w-full h-[300px] overflow-y-auto rounded-b-[10px] bg-white shadow-2xl'>
            <ul className=''>
             {
              searchvalue?.length >0 ? searchvalue.map((item)=>{
                  return(
                      <NavLink to={`/user-search?productname=${item.title}&category=${item.category}`}>
                      <li className='searchtab px-[20px] py-[10px] hover:text-[#ffab02] hover:bg-slate-100 duration-150 flex justify-between items-center text-[15px]'><span>{item.title}</span><MdOutlineArrowOutward className='text-[25px] text-neutral-500 hover:text-neutral-800'/></li>
                       </NavLink>
                  )
              }):<h1>We do not find the product!</h1>
             }
            </ul>
          </div>:""
           }
        </div>
        <div>
        <div className='flex justify-center items-center gap-[20px] '>
                <button className='cursor-pointer text-[30px] md:hidden'onClick={showsearchtab}>
                   <IoIosSearch/>
                </button>
                <button className='text-[30px] cursor-pointer'>
                   <NavLink to="/user-wishlist-page"> <IoMdHeartEmpty/></NavLink>
                </button>
                <button className='cursor-pointer text-[30px]'onClick={activecartfunc}>
                  
               <div className='relative'>
             {carts?.length > 0 ? <div className="absolute top-[-15px] right-[-10px] font-quicksand font-[600] text-[15px] bg-orange-400 w-[30px] h-[30px] rounded-full flex justify-center items-center text-white">{carts?.length} </div>:"" }
               <HiOutlineShoppingBag/>
               </div>
                </button>
            </div>
        </div>
    </div>
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
                      <NavLink to={`/user-search?productname=${item.title}&category=${item.category}`}>
                      <li className='searchtab px-[20px] py-[10px] hover:text-[#ffab02] hover:bg-slate-100 duration-150 flex justify-between items-center text-[15px]'><span>{item.title}</span><MdOutlineArrowOutward className='text-[25px] text-neutral-500 hover:text-neutral-800'/></li>
                       </NavLink>
                  )
              }):<h1>We do not find the product!</h1>
             }
            </ul>
          </div>:""
           }
                   </section>
            </section>
        </section>
        <section className='w-full transition duration-200 h-[8vh] flex justify-between items-center px-[20px] bg-[#43B18A]  font-sora md:px-[150px]  py-[10px]'>
        <header className='w-full transition duration-200 h-[9vh] flex justify-between items-center font-sora '>
    <NavLink to="/categories">
    <div className='bg-[#291F51]  text-white h-[8vh]   cursor-pointer flex justify-center items-center gap-[12px] md:gap-[20px] px-[10px] py-[10px] md:px-[20px] md:py-[12px] rounded-[3px]'>
                    <HiOutlineMenuAlt1 className='text-[25px]'/>
                    <h1 className='font-[500] text-[14px]'>Browse Categories</h1>
                    {/* <button className='text-[20px]'>{activecategory ?  <IoIosArrowUp/>:<IoIosArrowDown/>}</button> */}
                </div>

                    </NavLink>
            <nav className='md:block hidden'>
                <div className="main-logo hidden">
                <img src={``} alt="" />
                </div>
            
                <ul className='flex gap-[35px] justify-center items-center'>
                <li className='text-white text-[15px] font-[500]'>
                    <NavLink to="/user">Home</NavLink>
                </li>
                <li className='text-white text-[15px] font-[500]'>
                    <NavLink to="/user-flash-sells">Flash Sells</NavLink>
                </li>
                <li className='text-white text-[15px] font-[500]'>
                    <NavLink to="/user-products">Products</NavLink>
                </li>
                <li className='text-white text-[15px] font-[500]'>
                    <NavLink to="/blogs-page">Blogs</NavLink>
                </li>            
                <li className='text-white text-[15px] font-[500]'>
                    <NavLink to="/contact-page">Contact</NavLink>
                </li>
                {/* =-----------------------profile drop down menu-------------------------- */}
                <div className="relative">
      <button
        onClick={handleToggle}   

        className="flex items-center justify-center  rounded-full bg-gray-300"
      >
        {/* Replace with your profile image */}
        <img src={`https://new.axilthemes.com/demo/template/splash/blogar/assets/images/demo/creative-blog.png`} alt="Profile" className="w-[50px] h-[50px] rounded-full hover:border-[2px] hover:border-[#fed330] transition-all duration-75" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-10 w-48 bg-white rounded-md shadow-lg font-quicksand"
          style={{ zIndex: 10 }}
        >
          <ul className="rounded-[5px] overflow-hidden">
        <NavLink to="/user-dashboard">
        <li className="px-[15px] py-[12px] hover:bg-gray-100 flex justify-start text-[18px] font-[500] items-center gap-[10px]"><FaUserLarge/>Profile</li>
        </NavLink>
        <NavLink>
        <li className="px-[15px] py-[12px] hover:bg-gray-100 flex justify-start text-[18px] font-[500] items-center gap-[10px]"><IoMdSettings/>Setting</li>
        </NavLink>
        <NavLink>
        <li className="px-[15px] py-[12px] hover:bg-gray-100 flex justify-start text-[18px] font-[500] items-center gap-[10px]"onClick={logoutfunction}><MdOutlineLogout/>Log Out</li>
        </NavLink>
          </ul>
        </div>   

      )}
             </div>
            </ul>
            
            </nav>
 {/* ------------------------------------responsive sidebar----------------------- */}
      <div className={activesidebar ? 'md:hidden fixed top-0 right-0  w-[100%] h-[100vh] z-[10000] bg-tranparentbg':"'md:hidden fixed top-0 right-[-200%]  w-[100%] h-[100vh] transition-all duration-300 z-[10000] '"}>
           <nav className={activesidebar ? 'absolute top-0 right-0 w-[60%] h-[100vh] transition-all duration-150  bg-white p-[20px]':'absolute top-0 right-[-200%] w-[60%] h-[100vh] transition-all duration-300  bg-white p-[20px]'}>
             
                <div className='flex justify-between items-center pb-[20px]'>
                <div className="main-logo">
                <img className='w-[50px]' src="https://wphix.com/template/gota/gota/assets/img/logo/logo-1.png" alt="" />
                </div>
                <div className="close text-[20px] cursor-pointer"onClick={closesidebar}>
                  <GrClose/>
            </div>
                </div>
                <ul className='block'>
               
                <NavLink to="/">
                <li className='text-black py-[20px] border-b-[1px] border-[#eee]'>
                Home
                </li>
                </NavLink>
                <NavLink to="/products">
                <li className='text-black py-[20px] border-b-[1px] border-[#eee]'>
                Products
                </li>
                </NavLink>
                <NavLink to="/user-flash-sells">
                <li className='text-black py-[20px] border-b-[1px] border-[#eee]'>
                Flash Sells
                </li>
                </NavLink>
                <NavLink to="/blogs">
                <li className='text-black py-[20px] border-b-[1px] border-[#eee]'>
                Blogs
                </li>
                </NavLink>
                <NavLink to="/contact">
                <li className='text-black py-[20px] border-b-[1px] border-[#eee]'>
                Contact
                </li>
                </NavLink>
         
        
            </ul>
          
            </nav>
           </div>
 {/* -----------------------------resposnive sidebar----------------------- */}
           <div className='flex justify-center items-center gap-[10px] md:hidden'>
           <div className="relative">
      <button
        onClick={handleToggle}   

        className="flex items-center justify-center  rounded-full bg-gray-300"
      >
        {/* Replace with your profile image */}
        <img src="https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Profile" className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] rounded-full hover:border-[2px] hover:border-[#fed330] transition-all duration-75" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-10 w-48 bg-white rounded-md shadow-lg font-quicksand"
          style={{ zIndex: 10 }}
        >
          <ul className="rounded-[5px] overflow-hidden">
        <NavLink to="/user-dashboard">
        <li className="px-[15px] py-[12px] hover:bg-gray-100 flex justify-start text-[18px] font-[500] items-center gap-[10px]"><FaUserLarge/>Profile</li>
        </NavLink>
        <NavLink>
        <li className="px-[15px] py-[12px] hover:bg-gray-100 flex justify-start text-[18px] font-[500] items-center gap-[10px]"><IoMdSettings/>Setting</li>
        </NavLink>
        <NavLink>
        <li className="px-[15px] py-[12px] hover:bg-gray-100 flex justify-start text-[18px] font-[500] items-center gap-[10px]"onClick={logoutfunction}><MdOutlineLogout/>Log Out</li>
        </NavLink>
          </ul>
        </div>   

      )}
    </div>
    <div className="menu text-[30px] block md:hidden cursor-pointer"onClick={sidebartoggle}>
                <FiMenu/>
            </div>
           </div>
       
        </header >
        </section>

    </>
  )
}

export default Userheader