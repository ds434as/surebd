import React from 'react'
import { NavLink } from 'react-router-dom'
import { GrCircleInformation } from "react-icons/gr";
import { IoPricetagsOutline } from "react-icons/io5";
import { AiOutlineShopping } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
const Usersidebar = () => {
    const navlink = [
        {   id:1,
            name:"Account Info",
            path:"/user-dashboard",
            icon:<GrCircleInformation size={20}/>
        },
        {   id:2,
            name:"Wish list",
            path:"/products",
            icon:<IoPricetagsOutline size={20}/>
        },
        {   id:3,
            name:"Order",
            path:"/sales",
            icon:<AiOutlineShopping size={20}/>
        },
        {    id:4,
            name:"Setting",
            path:"/about",
            icon:<GrCircleInformation size={20}/>
        },
        {    id:5,
            name:"Log Out",
            path:"/about",
            icon:<IoSettingsOutline size={20}/>
        },
    ]
  return (
    <div>
        <ul className='usersidebar flex flex-col p-[20px]'>
         {
            navlink.map((link)=>{
                return(
                    <NavLink to={link.path} className="p-[15px] text-[#a9abac] flex gap-[10px] rounded-[5px] justify-start items-center mb-[10px] text-[16px] ">
                       {link.icon} {link.name}
                    </NavLink>
                )
            })
         }
        </ul>
    </div>
  )
}

export default Usersidebar