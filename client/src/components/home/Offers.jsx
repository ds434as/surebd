import React,{useEffect} from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import AOS from "aos";
import { MdArrowForwardIos } from "react-icons/md";
import "aos/dist/aos.css";
const Offers = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <div className='px-[10px] md:px-[140px] ]  md:py-[50px] md:pt-[30px]'>
       <section className='w-full flex justify-between items-center gap-[10px] md:gap-[30px]'>
       <div data-aos="fade-right" className='w-[50%] h-[170px] md:h-[350px] overflow-hidden  relative'>
          <div className='w-full  h-[170px] lg:h-[350px] '>
            <img className='w-full h-[100%]  ' src="https://eurotas-demo.myshopify.com/cdn/shop/files/banner-v3-img1.jpg?v=1613749092" alt="" />
          </div>
          <div className='absolute z-[10000]  top-0 left-0 w-full h-[100%] flex justify-start items-center px-[15px] py-[20px] md:p-[30px]'>
            <div className=''>
              <h2 className='text-white mb-[5px] lg:mb-[10px] text-[12px] lgtext-[16px]'>Fashion</h2>
              <h1 className='text-[14px] md:text-[40px] font-bold  md:leading-[50px] text-white mb-[8px] md:mb-[15px] '>Minimal <br /> Collection</h1>
              <button className='bg-transparent lg:px-[15px] lg:py-[8px]  text-[12px] font-[400] md:text-[16px] md:font-[600]  text-green-600 lg:text-black lg:bg-white  flex justify-center items-center gap-[5px] transition-all duration-150 hover:bg-indigo-500 hover:text-white '>Shop Now <MdArrowForwardIos className=''/></button>
            </div>
          </div>
       </div>
       <div className='w-[50%] h-[170px] md:h-[350px] overflow-hidden  relative'>
          <div className='w-full h-[170px] lg:h-[350px] '>
            <img className='w-full h-[100%]  ' src="https://eurotas-demo.myshopify.com/cdn/shop/files/banner-v3-img2.jpg?v=1613749092" alt="" />
          </div>
          <div className='absolute z-[10000]  top-0 left-0 w-full h-[100%] flex justify-start items-center px-[15px] py-[20px] md:p-[30px]'>
          <div className=''>
              <h2 className='text-white mb-[5px] lg:mb-[10px] text-[12px] lgtext-[16px]'>Fashion</h2>
              <h1 className='text-[14px] md:text-[40px] font-bold  md:leading-[50px] text-white mb-[8px] md:mb-[15px] '>Minimal <br /> Collection</h1>
              <button className='bg-transparent lg:px-[15px] lg:py-[8px]  text-[12px] font-[400] md:text-[16px] md:font-[600]  text-white lg:text-black lg:bg-white  flex justify-center items-center gap-[5px] transition-all duration-150 hover:bg-indigo-500 hover:text-white '>Shop Now <MdArrowForwardIos className=''/></button>
            </div>
          </div>
       </div>
       </section>
    </div>
  )
}

export default Offers