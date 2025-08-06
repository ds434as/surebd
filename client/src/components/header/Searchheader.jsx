import React,{useState} from 'react'
import { BsSearch } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import { BiUser } from "react-icons/bi";
import { RiShoppingCartLine } from "react-icons/ri";
import { TbMenu2 } from "react-icons/tb";
import Cartpage from '../../pages/Cartpage';
import { NavLink } from 'react-router-dom';
const Searchheader = () => {
    const [navbar,activenavbar]=useState(false);
    const [activecart,setactivecart]=useState(false);
  
  return (
    <div className='w-full h-auto px-[150px] py-[20px] flex justify-between items-center'>
             <Cartpage activecart={activecart} setactivecart={setactivecart}/>

        <div className="logo">
            <img src="https://wphix.com/template/gota/gota/assets/img/logo/logo-1.png" alt="" />
        </div>
        <div className="search-box">
            <div className='w-[500px] h-[55px] border-[1px] border-[#eee] flex justify-center items-center'>
               <div className='w-[35%] border-r-[1px] border-[#eee]'>
                <select name="" id=""className='w-full h-[100%] px-[10px] py-[5px] outline-none'>
                    <option value="">All Categories</option>
                    <option value="">Cloth</option>
                    <option value="">Electronics</option>
                    <option value="">Men</option>
                    <option value="">Women</option>
                </select>
               </div>
               <div className='relative w-[65%] px-[10px] py-[5px]'>
                <input type="text"placeholder='Search product...'className='focus::bg-[whitesmoke] w-full outline-none h-[100%]' />
                <div className='w-[20%] h-[100%] absolute top-0 right-0 flex justify-center items-center'>
                    <button className='text-[25px]'><IoIosSearch/></button>
                </div>
               </div>
            </div>
        </div>
        <div>
        <div className='flex justify-center items-center gap-[20px]'>
                <button className='text-[26px]'>
                   <IoIosSearch/>
                </button>
                <button className='text-[26px]'>
                   <NavLink to="/login"> <BiUser/></NavLink>
                </button>
                <button className='text-[26px]'onClick={activecartfunc}>
                   <RiShoppingCartLine/>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Searchheader