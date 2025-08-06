import React from 'react'

const Userheader3 = () => {
  return (
    <section className=' px-[20px] md:px-[150px] pb-[5px] mt-[5px]'>

     <nav className='w-full h-[50px] bg-white flex'>
       <div className='w-[200px] h-[100%] bg-[#43B18A] flex justify-center items-center text-white text-[12px] md:text-[16px] font-[500]'>
          <h1>Mern Commerce</h1>
       </div>
       <div className='w-full h-[100%] text-[14px] md:text-[16px]  flex justify-center items-center text-black pl-[5px] '>
         <marquee behavior="smooth" direction="left">We are glad to introduce you to the sultaan.net , Holiday Festival Going On. Please ensure your product with unbelievable discount ever! *After receiving your order, our standard product delivery period is up to 03 days in Dhaka and up to 07 days outside of Dhaka.
         *Regular Grocery delivery applicable only for Dhaka City. *In addition, during the Holiday Festival, all products are available across Bangladesh. After receiving your order, Holiday Festival products can take up to 7 days in Dhaka and up to 14 days outside of Dhaka to arrive. *Call us at 01842-151060-69 for further information.</marquee>
       </div>
     </nav>
    </section>
  )
}

export default Userheader3