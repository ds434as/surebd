import axios from 'axios';
import React, { useEffect,useState } from 'react'
import Marquee from "react-fast-marquee";
const Brand = () => {
   const [brands,set_brands]=useState([]);

	const all_brand=()=>{
		axios.get(`https://surebdbackend.arbeittechnology.com/admin/brands`)
		.then((res)=>{
			if(res.data.success){
				set_brands(res.data.data)
				console.log(res)
			}
		}).catch((err)=>{
			console.log(err)
		})
	}
	useEffect(()=>{
        all_brand();
	},[])
  return (
    <section className='px-[20px] md:px-[30px] lg:px-[50px] xl:px-[80px] 2xl:px-[150px] pb-[20px] xl:pb-[20px] '>
        <div>
            <div>
            <h1 className='text-[18px] 2xl:text-heading font-fredoka font-[500]  text-headingcolor mb-[3px] md:mb-[8px]'>Shop by Top Brand</h1>
            </div>
            {/* --------------------all brands-------------------- */}
           <section className='pt-[10px]'>
            {
               brands.length > 0 ? brands.map((data)=>{
                  return(
                     <div className='mr-[10px] md:mr-[20px]'>
               <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                 <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo7.png" alt="" />
                  <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>{data?.title}</h1>
               </div>
            </div>
                  )
               }):<section>
                  <h1>Loading....</h1>
               </section>
            }
           {/* <Marquee className=' py-[10px] md:py-[20px]'autoFill pauseOnClick>
           <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo7.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Clothings Brand</h1>
                  </div>
               </div>
               <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo5.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Pure Brand</h1>
                  </div>
               </div>
               <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo6.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Women Brand</h1>
                  </div>
               </div>
               <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo2.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Clothings Brand</h1>
                  </div>
               </div>
               <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo4.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Clothings Brand</h1>
                  </div>
               </div>
               <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo1.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Clothings Brand</h1>
                  </div>
               </div>
               <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo1.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Clothings Brand</h1>
                  </div>
               </div>
  </Marquee> */}
  {/* <Marquee className='pb-[10px] md:pb-[5px]'autoFill pauseOnClick direction='right' >
  <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo3.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Clothings Brand</h1>
                  </div>
               </div>
               <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo2.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Clothings Brand</h1>
                  </div>
               </div>
               <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo6.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Clothings Brand</h1>
                  </div>
               </div>
               <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo3.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Clothings Brand</h1>
                  </div>
               </div>
               <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo3.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Clothings Brand</h1>
                  </div>
               </div>
               <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo4.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Clothings Brand</h1>
                  </div>
               </div>
               <div className='mr-[10px] md:mr-[20px]'>
                  <div className='md:w-[200px] md:h-auto w-auto group  h-auto p-[20px] hover:shadow-md transition-all duration-200 cursor-pointer border-[1px] border-[#e7e9eb] bg-white  flex justify-center flex-col items-center'>
                    <img className='w-[60px] md:w-[100px] h-[30px] md:h-[50px]' src="https://bestwebcreator.com/shopwise/demo/assets/images/cl_logo3.png" alt="" />
                     <h1 className='mt-[5px] text-[12px] lg:text-[18px] font-fredoka group-hover:text-[#6364DB] font-[500] transition-all duration-200'>Clothings Brand</h1>
                  </div>
               </div>
  </Marquee> */}
        
           </section>
            {/* --------------------all brands-------------------- */}
        </div>
    </section>
  )
}

export default Brand