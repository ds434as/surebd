import React from 'react'

const Whychoose = () => {
  return (
  <section className='w-full h-auto px-[20px] md:px-[150px] md:pt-[20px] py-[30px] md:py-[50px]'>
    <div>
      <div className=' pb-[20px] md:pb-[40px]'>
        <h1 className='text-[14px] md:text-[25px] text-headingcolor font-bold font-fredoka'>Why People Choose Us</h1>
      </div>
      <section className='w-full h-auto flex justify-center items-center gap-[20px] md:gap-[30px] flex-wrap md:flex-nowrap'>
      <div className='w-[45%] md:w-[20%] h-[180px] md:h-[240px] hover:shadow-md transition-all duration-150 rounded-[5px] border-[1px] border-[#f1f1f1] flex justify-center items-center flex-col'>
        <div >
          <img className='w-[50px] md:w-[70px] ' src="https://new.axilthemes.com/demo/template/etrade/assets/images/icons/service6.png" alt="" />
        </div>
        <h1 className='text-[14px] md:text-[16px] font-[700] mt-[20px] text-center'>Fast & Secure <br /> Delivery</h1>
      </div>
      <div className='w-[45%] md:w-[20%] h-[180px] md:h-[240px] hover:shadow-md transition-all duration-150 rounded-[5px] border-[1px] border-[#f1f1f1] flex justify-center items-center flex-col'>
        <div >
          <img className='w-[50px] md:w-[70px] ' src="https://new.axilthemes.com/demo/template/etrade/assets/images/icons/service7.png" alt="" />
        </div>
        <h1 className='text-[14px] md:text-[16px] font-[700] mt-[20px] text-center'>100% Guarantee <br /> On Product</h1>
      </div>
      <div className='hidden  w-[20%] h-[180px] md:h-[240px] hover:shadow-md transition-all duration-150 rounded-[5px] border-[1px] border-[#f1f1f1] md:flex justify-center items-center flex-col'>
        <div >
          <img  className='w-[50px] md:w-[70px] ' src="https://new.axilthemes.com/demo/template/etrade/assets/images/icons/service8.png" alt="" />
        </div>
        <h1 className='text-[14px] md:text-[16px] font-[700] mt-[20px] text-center'>24 Hour Return <br /> Policy</h1>
      </div>
      <div className='w-[45%] md:w-[20%] h-[180px] md:h-[240px] hover:shadow-md transition-all duration-150 rounded-[5px] border-[1px] border-[#f1f1f1] flex justify-center items-center flex-col'>
        <div >
          <img className='w-[50px] md:w-[70px] ' src="https://new.axilthemes.com/demo/template/etrade/assets/images/icons/service9.png" alt="" />
        </div>
        <h1 className='text-[14px] md:text-[16px] font-[700] mt-[20px] text-center'>24 Hour Home <br /> Delivery</h1>
      </div>
      <div className='w-[45%] md:w-[20%] h-[180px] md:h-[240px] hover:shadow-md transition-all duration-150 rounded-[5px] border-[1px] border-[#f1f1f1] flex justify-center items-center flex-col'>
        <div >
          <img className='w-[50px] md:w-[70px] ' src="https://new.axilthemes.com/demo/template/etrade/assets/images/icons/service10.png" alt="" />
        </div>
        <h1 className='text-[14px] md:text-[16px] font-[700] mt-[20px] text-center'>Next Level Pro <br /> Quality</h1>
      </div>
      </section>
    </div>
  </section>
  )
}

export default Whychoose