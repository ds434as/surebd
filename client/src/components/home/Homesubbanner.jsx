import React from 'react'

const Homesubbanner = () => {
  return (
   <section className='w-full flex justify-center items-center gap-[8px] lg:gap-[10px] h-auto px-[20px] md:px-[140px] pt-[10px] pb-[20px]  md:pb-[30px]'>
      <section className='w-[50%]'>
        <div className='w-full mb-[10px]'>
            <img className='w-full h-[150px] lg:h-[300px]' src="https://img.lazcdn.com/us/domino/3d4776e3-2d3e-485b-b0d1-7cb1ab005a85_BD-1976-688.jpg_2200x2200q80.jpg" alt="" />
        </div>
            <div className='w-full'>
            <img className='w-full h-[150px] lg:h-[300px]' src="https://img.lazcdn.com/us/domino/6e52b6c6-2820-483a-9a58-4de415253a37_BD-1976-688.jpg_2200x2200q80.jpg" alt="" />
        </div>
      </section>
          <section className='w-[50%]'>
        <div className='w-full mb-[10px]'>
            <img className='w-full h-[150px] lg:h-[300px]' src="https://img.lazcdn.com/us/domino/b619c13c-9a2c-402d-8015-5dc8c598e476_BD-1976-688.jpg_2200x2200q80.jpg" alt="" />
        </div>
            <div className='w-full'>
            <img className='w-full h-[150px] lg:h-[300px]' src="https://img.lazcdn.com/us/domino/10a2e566-efbe-4838-bdc5-94e021d0a63c_BD-1976-688.jpg_2200x2200q80.jpg" alt="" />
        </div>
      </section>
   </section>
  )
}

export default Homesubbanner