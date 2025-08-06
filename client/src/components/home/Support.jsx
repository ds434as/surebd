import React from 'react'
import truck_img from "../../assets/truck.gif"
import desk_img from "../../assets/helpdesk.gif"
import bus_img from "../../assets/bus.gif"

const Support = () => {
  return (
   <section className='px-[150px] py-[50px] pb-[150px]'>
      <section className='w-[70%] m-auto grid grid-cols-3 gap-[50px] font-poppins'>
      <div className='text-center'>
         <img className='w-[150px] block m-auto' src={truck_img} alt="" />
           <h1 className='text-[25px] font-[600] text-gray-800 mb-[5px] '>Free Shipping</h1>
           <p className='text-[17px] text-neutral-700 font-[500]'>Free Shopping on order over $100
           Mobile apps are software</p>
       </div>
       <div className='text-center'>
         <img className='w-[150px] block m-auto' src={desk_img} alt="" />
           <h1 className='text-[25px] font-[600] text-gray-800 mb-[5px] '>24/7 Customer Service</h1>
           <p className='text-[17px] text-neutral-700 font-[500]'>Free Shopping on order over $100
           Mobile apps are software</p>
       </div>
       <div className='text-center'>
         <img className='w-[150px] block m-auto' src={bus_img} alt="" />
           <h1 className='text-[25px] font-[600] text-gray-800 mb-[5px] '>Return Policy</h1>
           <p className='text-[17px] text-neutral-700 font-[500]'>Free Shopping on order over $100
           Mobile apps are software</p>
       </div>
      </section>
   </section>
  )
}

export default Support
