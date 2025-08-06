import React from 'react'
import { GoArrowRight } from "react-icons/go";
import { NavLink } from 'react-router-dom';
const Collections = () => {
    
  return (
    <section className='px-[150px] py-[50px] font-poppins'>
        <div className='flex justify-between items-center'>
            <h2 className='flex justify-center items-center gap-[3px] text-heading font-[500]'>Best Deals <img src="https://demo.futureitlab.com/xura/assets/images/icon/fire.png" alt="" /></h2>
             <NavLink className="flex items-center gap-[5px] text-[15px] text-gray-700 font-[500]">
                <span>View All</span>
                <GoArrowRight className='text-[20px]'/>
             </NavLink>
        </div>
        {/* -----------------------boxes-------------------- */}
        <section className='w-full flex mt-[40px] font-poppins gap-[20px]'>
            <div className='w-[60%] grid grid-cols-2 gap-[10px]'>
            <div className="w-full h-[300px] flex justify-normal items-end p-[30px] relative bg-[#F6F6F6] overflow-hidden rounded-[5px]">
            <div className="absolute top-0 right-0">
  <img className="z-[1] animate-move-slowly" src="https://demo.futureitlab.com/xura/assets/images/best-deals/bestDealsThumb1_1.png" alt="Best Deal" />
</div>
      <div className="z-[10] w-[50%]">
        <h1 className="font-[600] text-[25px]">Beauty Product</h1>
        <button className="px-[15px] py-[7px] bg-[#343434] rounded-[5px] text-white mt-[15px] text-[14px]">
          Shop Now
        </button>
      </div>
    </div>
                   <div className='w-full h-[300px] flex justify-normal items-end p-[30px]  relative bg-[#F6F6F6]  overflow-hidden rounded-[5px]'>
                          <div className='absolute top-0 right-0'>
                                  <img className='z-[1]' src="https://demo.futureitlab.com/xura/assets/images/best-deals/bestDealsThumb1_2.png" alt="" />
                          </div>
                          <div className='z-[10] w-[50%]'>
                            <h1 className='font-[600] text-[25px]'>Shoe Appliance</h1>
                            <button className='px-[15px] py-[7px] bg-[#343434] rounded-[5px] text-white mt-[15px] text-[14px]'>Shop Now</button>
                          </div>
                   </div>
            </div>
            <div className='w-[40%]'>
            <div className='w-full h-[300px] flex justify-normal items-end p-[30px] relative bg-[#EAE1A6]  overflow-hidden rounded-[5px]'>
                          <div className='absolute top-0 right-0'>
                                  <img className='z-[1]' src="https://demo.futureitlab.com/xura/assets/images/best-deals/bestDealsThumb1_3.png" alt="" />
                          </div>
                          <div className='z-[10] w-[50%]'>
                            <h1 className='font-[600] text-[25px]'>Laptop & Gadgets Acessories</h1>
                            <button className='px-[15px] py-[7px] bg-[#343434] rounded-[5px] text-white mt-[15px] text-[14px]'>Shop Now</button>
                          </div>
                   </div> 
            </div>
        </section>
    </section>
  )
}

export default Collections
