import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineDoubleArrow } from "react-icons/md";
import Products from '../products/Products';
import { Appcontext } from '../../context/Appcontext';
import Justproducts from '../products/Justproducts';
const Justforyou = () => {
    const {products}=useContext(Appcontext)
  return (
    <div className='px-[20px] py-[15px] md:px-[140px] md:py-0   md:pb-[30px] font-poppins'>
        <div className='pb-[10px] lg:pb-[30px] flex justify-between items-center '>
            <div>
                <h1 className='text-[14px] md:text-headingsize font-[600] font-fredoka text-headingcolor mb-[3px] md:mb-[8px]'>Just For You</h1>
            </div>
            {/* <div className='border-b-[1px] border-[#18756F] text-[#18756F] '>
                <NavLink to="/products" className="flex gap-[5px] justify-center font-fredoka  pb-[4px] items-center text-[14px] md:text-[18px]">
                    View All
                    <MdOutlineDoubleArrow/>
                </NavLink>
            </div> */}
        </div>
        {/* -------------------products--------------------- */}
        <Justproducts/>
        {/* -------------------products--------------------- */}
    </div>
  )
}

export default Justforyou