import React, { useContext,useState,useEffect} from 'react'
import { Appcontext } from '../../context/Appcontext';
import { MdOutlineDoubleArrow } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import Trendingproductbox from '../products/Trendingproductbox';
import {Swiper,SwiperSlide} from "swiper/react"
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode,Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css/autoplay";
const Trendingproducts = () => {
    const {trendingitems,addToitem,Trendingitems}=useContext(Appcontext);
    const [cartanimate,setcartanimate]=useState(false);
      // --------------------category slider------------------
      let scrollmainbox=document.querySelector(".containerbox3");
      const {products,activeitem,setactiveitem}=useContext(Appcontext);
      const [countitem,setcountitem]=useState(0);
      useEffect(()=>{
        Trendingitems();
      },[])
      function cartshow(){
          setcartanimate(true)
      }
      // add to cart button
      function addtocartbutton(){
          toast.success(`You have added ${data.title}`)
          setactiveitem(true)
             addToitem(data)
             setcountitem(1);
             setcartanimate(true);
            setTimeout(() => {
              setcartanimate(false);
            }, 3000);
      }
   // --------------------category slider------------------
  return (
    <div className='w-full h-auto px-[20px] md:px-[150px] py-[10px] pb-[20px] md:py-[50px] md:pt-[10px] '>
        <div className='pb-[10px] md:pb-[30px] pt-[20px] flex justify-between  items-center gap-[30px]'>
            <h1 className='text-[14px] md:text-headingsize font-[600] font-fredoka text-headingcolor mb-[8px]'>Best Sellers. <span className='text-[#6B7280] md:flex hidden'>Best selling of the month</span></h1>
            <div className='border-b-[1px] border-[#18756F] text-[#18756F] '>
                <NavLink to="/products" className="flex gap-[5px] font-fredoka justify-center pb-[4px] items-center text-[14px] md:text-[18px]">
                    View All
                    <MdOutlineDoubleArrow/>
                </NavLink>
            </div>
        </div>
        {/* ---------------------trending products------------------ */}
        <div className='containerbox3 flex w-full pt-[10px]'>
        <div className='w-full  md:flex hidden justify-between gap-x-[15px] gap-y-[10px] md:gap-[30px] flex-wrap md:flex-wrap  '>
        <Swiper
       freeMode={true}
       grabCursor={true}
       modules={[FreeMode,Autoplay, Pagination, Navigation]}
       autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
       className='mySwiper w-full'
       slidesPerView={4}
       spaceBetween={20}
       >
         {
                trendingitems?.length >0 ? trendingitems.map((data)=>{
                    return(
                        <SwiperSlide>
                        <Trendingproductbox data={data}/>
                      </SwiperSlide>
                    )
                }):<h1 className='text-[12px] md:text-[18px]'>Currently we do not have any product!</h1>
            }

        </Swiper>
          
          
   
         </div>
         {/* -------------------mobile version---------------- */}
         <div className='w-full flex md:hidden justify-between gap-x-[15px] gap-y-[10px] md:gap-[30px] flex-wrap md:flex-wrap  '>
        <Swiper
       freeMode={true}
       grabCursor={true}
       modules={[FreeMode,Autoplay, Pagination, Navigation]}
       autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
       className='mySwiper w-full'
       slidesPerView={2}
       spaceBetween={20}
       >
         {
                trendingitems?.length >0 ? trendingitems.map((data)=>{
                    return(
                        <SwiperSlide>
                        <Trendingproductbox data={data}/>
                      </SwiperSlide>
                    )
                }):<h1 className='text-[12px] md:text-[18px]'>Currently we do not have any product!</h1>
            }

        </Swiper>
          
          
   
         </div>
         {/* --------------------mobile version----------------- */}
        </div>
        {/* ---------------------trending products------------------ */}
    </div>
  )
}

export default Trendingproducts