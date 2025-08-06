import React from 'react'

const Subscribebox = () => {
  return (
    <section className='px-[150px] font-poppins py-[70px] w-full flex justify-center items-center '>
         <section className='w-[70%] h-[400px] p-[30px] bg-[#F6F6F6] rounded-[10px] flex gap-[50px] justify-center items-center'>
               <div className='w-[50%]'>
                <h2 className='text-[30px] font-[500] mb-[10px]'>Stay Updated with <br /> Exclusive Offers!</h2>
                <p className='text-[16px] text-gray-600 mb-[20px] leading-[25px]'>Join Our Mailing List for Special Perks It is a long established fact that a reader
                will be distracted by the readable content of a page when looking at its layout.</p>
                <form action=""className='w-full flex justify-center items-center gap-[10px]'>
                    <input type="text"placeholder='Enter email' className='w-[80%] h-[50px] bg-white rounded-[5px] px-[20px] text-[17px] border-[2px] border-[#eee] outline-red-500'/>
                    <button className='w-[20%] h-[50px] bg-gray-800 text-white text-[16px] rounded-[5px] cursor-pointer'>Subscribe</button>
                </form>
               </div>
               <div className='w-[50%] relative flex justify-center items-center'>
                <img className='w-[70%]' src="https://demo.futureitlab.com/xura/assets/images/offer/offer1_1.png" alt="" />
               {/* Image 1 - Moves Up and Down */}
  <div className="absolute bottom-[10%] left-[10%] animate-up-down">
    <img src="https://demo.futureitlab.com/xura/assets/images/offer/offerIcon1_2.png" alt="" />
  </div>

  {/* Image 2 - Moves Side to Side */}
  <div className="absolute top-[60%] right-[10%] animate-side-to-side">
    <img src="https://demo.futureitlab.com/xura/assets/images/offer/offerIcon1_4.png" alt="" />
  </div>

  {/* Image 3 - Rotates */}
  <div className="absolute top-[10%] left-[10%] animate-rotate">
    <img src="https://demo.futureitlab.com/xura/assets/images/offer/offerIcon1_1.png" alt="" />
  </div>

  {/* Image 4 - Moves Diagonally */}
  <div className="absolute top-[8%] right-[10%] animate-diagonal">
    <img src="https://demo.futureitlab.com/xura/assets/images/offer/offerIcon1_3.png" alt="" />
  </div>
               </div>
         </section>
    </section>
  )
}

export default Subscribebox
