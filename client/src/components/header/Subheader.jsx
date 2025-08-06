import React, { useContext } from 'react'
import { FaFacebookF } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { GrInstagram } from "react-icons/gr";
import { Appcontext } from '../../context/Appcontext';
import { RiInstagramFill } from "react-icons/ri";
import { ImYoutube } from "react-icons/im";
import { RiTwitterXLine } from "react-icons/ri";
import { GrPinterest } from "react-icons/gr";
import { GiCheckMark } from "react-icons/gi";
import { BsThreadsFill } from "react-icons/bs";
import { RiFacebookFill } from "react-icons/ri";
const Subheader = () => {
  const {offertext,social_data}=useContext(Appcontext);
  return (
    <div className="subheader w-[100%] h-[6vh] font-poppins bg-white md:flex hidden md:px-[150px] px-[30px]  justify-between items-center">
 <div className='border-b-[1px] border-[#0000001a] flex justify-between items-center w-full py-[10px] '>
 <div className='hidden md:block'>
            <ul className='flex gap-[20px]'>
              <li className='text-[13px] font-[700] text-black'>
                <NavLink>Shipping</NavLink>
              </li>
              <li className='text-[13px] font-[700]  text-black'>
                <NavLink>Order</NavLink>
              </li>
              <li className='text-[13px] font-[700] text-black'>
                <NavLink>FAQ</NavLink>
              </li>
            </ul>
         </div>
         <div className='w-full h-[5vh]  flex justify-center items-center'>
          {/* {
            offertext?.length > 0 ? <>
            {
              offertext.slice(0,1).map((data)=>{
                return(
                  <h1 className="relative ml-3 h-[100%] text-[15px] text-black font-[400] flex justify-center items-center  w-[400px] overflow-hidden">
                  {data.title}
            </h1>
                )
              })
            }
            </>:""
          } */}
          <h2 className='flex justify-center items-center gap-[5px] text-[14px]'> <span className='flex cursor-pointer text-[#43b18a] font-[600] justify-center items-center gap-[5px] underline'><GiCheckMark className='text-green-700 text-[15px]'/> Free exchange</span> <span className='font-[400]'>of products within 30 days</span></h2>

</div>
{
  social_data?.length > 0 ?          <div className='flex justify-center items-center gap-[20px]'>
  <ul className='flex gap-[15px] md:gap-[10px] justify-center items-center'>
    
    {
      social_data.map((account_data)=>{
        return(
          <li className='text-[14px] md:text-[18px] text-black w-[30px] h-[30px] border-[1px] border-[#eee] rounded-full flex justify-center items-center'>
          <a href={`${account_data.name}`} target='_blank'>
          {account_data.icon_name=="RiFacebookFill" ? <RiFacebookFill className=' text-[18px]'/>:""}
                            {account_data.icon_name=="ImYoutube" ? <ImYoutube className='text-[18px]'/>:""}
                            {account_data.icon_name=="RiTwitterXLine" ? <RiTwitterXLine className='text-[18px]'/>:""}
                            {account_data.icon_name=="GrPinterest" ? <GrPinterest className='text-[18px]'/>:""}
                            {account_data.icon_name=="RiInstagramFill" ? <RiInstagramFill className='text-[18px]'/>:""}
                            {account_data.icon_name=="BsThreadsFill" ? <BsThreadsFill className='text-[18px]'/>:""}
          </a>
        </li>
        )
      })
    }
  </ul>
  {/* <select name="" id=""className='bg-transparent text-[12px] md:text-[16px] text-black'>
    <option value=""className='bg-transparent'>Eng</option>
    <option value=""className='bg-transparent'>Ban</option>
  </select> */}
</div>:""
}
  <ul className='flex justify-center items-center gap-[12px]'>
    <li ><FaFacebookF className='text-black text-[17px]'/> </li>
    <li><RiInstagramFill className='text-black text-[17px]'/></li>
    <li><RiTwitterXLine className='text-black text-[17px]'/></li>
    <li><GrPinterest className='text-black text-[17px]'/></li>
  </ul>
 </div>
    </div>
  )
}

export default Subheader