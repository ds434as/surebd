import React,{useRef, useState,useEffect} from 'react'
import { GoArrowRight } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { ImEye } from "react-icons/im";
import { HiOutlineShoppingBag } from "react-icons/hi2";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Pagination,Autoplay} from 'swiper/modules';
import Flashsellbox from '../product/Flashsellbox';
import axios from 'axios';
const Flashsell = () => {
    const swiperRef = useRef(null);
  const [products,set_products]=useState([
            {
                id:1,
                images:["https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-23-600x600.jpg","https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-10-600x600.jpg"],
                title:"Label 20 RGB Keyboard",
                category:"Gadget",
                description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt similique eveniet odit facere? Maxime, beatae ex dolore accusamus minus labore!",
                rating:4.5,
                rating_number:20,
                price:200,
                discount:"5%",
                price2:220,
                remain_day:"23",
                remain_hour:"10",
                remain_minutes:"17",
                remain_seconds:"50",
                sold:20,
                stock:50,
                total:50,
                warranty:"1 year warranty",
                guranty:"Genuine Guranted"
            },
            {
                id:1,
                images:["https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-23-600x600.jpg","https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-24-600x600.jpg"],
                title:"Label 20 RGB Keyboard",
                category:"Gadget",
                description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt similique eveniet odit facere? Maxime, beatae ex dolore accusamus minus labore!",
                rating:4.5,
                rating_number:20,
                price:200,
                discount:"5%",
                price2:220,
                remain_day:"23",
                remain_hour:"10",
                remain_minutes:"17",
                remain_seconds:"50",
                sold:20,
                stock:50,
                total:50,
                warranty:"1 year warranty",
                guranty:"Genuine Guranted"
            },
            {
                id:1,
                images:["https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-36-600x600.jpg","https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-35-600x600.jpg"],
                title:"Label 20 RGB Keyboard",
                category:"Gadget",
                description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt similique eveniet odit facere? Maxime, beatae ex dolore accusamus minus labore!",
                rating:4.5,
                rating_number:20,
                price:200,
                discount:"5%",
                price2:220,
                remain_day:"23",
                remain_hour:"10",
                remain_minutes:"17",
                remain_seconds:"50",
                sold:20,
                stock:50,
                total:50,
                warranty:"1 year warranty",
                guranty:"Genuine Guranted"
            },
            {
                id:1,
                images:["https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-11-600x600.jpg","https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-18-600x600.jpg"],
                title:"Label 20 RGB Keyboard",
                category:"Gadget",
                description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt similique eveniet odit facere? Maxime, beatae ex dolore accusamus minus labore!",
                rating:4.5,
                rating_number:20,
                price:200,
                discount:"5%",
                price2:220,
                remain_day:"23",
                remain_hour:"10",
                remain_minutes:"17",
                remain_seconds:"50",
                sold:20,
                stock:50,
                total:50,
                warranty:"1 year warranty",
                guranty:"Genuine Guranted"
            },
            {
                id:1,
                images:["https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-41-600x600.jpg","https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-42-600x600.jpg"],
                title:"Label 20 RGB Keyboard",
                category:"Gadget",
                description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt similique eveniet odit facere? Maxime, beatae ex dolore accusamus minus labore!",
                rating:4.5,
                rating_number:20,
                price:200,
                discount:"5%",
                price2:220,
                remain_day:"23",
                remain_hour:"10",
                remain_minutes:"17",
                remain_seconds:"50",
                sold:20,
                stock:50,
                total:50,
                warranty:"1 year warranty",
                guranty:"Genuine Guranted"
            },
            {
                id:1,
                images:["https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-43-600x600.jpg","https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-41-600x600.jpg"],
                title:"Label 20 RGB Keyboard",
                category:"Gadget",
                description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt similique eveniet odit facere? Maxime, beatae ex dolore accusamus minus labore!",
                rating:4.5,
                rating_number:20,
                price:200,
                discount:"5%",
                price2:220,
                remain_day:"23",
                remain_hour:"10",
                remain_minutes:"17",
                remain_seconds:"50",
                sold:20,
                stock:50,
                total:50,
                warranty:"1 year warranty",
                guranty:"Genuine Guranted"
            },
            {
                id:1,
                images:["https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-13-600x600.jpg","https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-15-600x600.jpg"],
                title:"Label 20 RGB Keyboard",
                category:"Gadget",
                description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt similique eveniet odit facere? Maxime, beatae ex dolore accusamus minus labore!",
                rating:4.5,
                rating_number:20,
                price:200,
                discount:"5%",
                price2:220,
                remain_day:"23",
                remain_hour:"10",
                remain_minutes:"17",
                remain_seconds:"50",
                sold:20,
                stock:50,
                total:50,
                warranty:"1 year warranty",
                guranty:"Genuine Guranted"
            },
            {
                id:1,
                images:["https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/black-5-600x600.jpg","https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/2-18-600x600.jpg"],
                title:"Label 20 RGB Keyboard",
                category:"Gadget",
                description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt similique eveniet odit facere? Maxime, beatae ex dolore accusamus minus labore!",
                rating:4.5,
                rating_number:20,
                price:200,
                discount:"5%",
                price2:220,
                remain_day:"23",
                remain_hour:"10",
                remain_minutes:"17",
                remain_seconds:"50",
                sold:20,
                stock:50,
                total:50,
                warranty:"1 year warranty",
                guranty:"Genuine Guranted"
            },
            {
                id:1,
                images:["https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-23-600x600.jpg","https://ecommax.risingbamboo.com/wp-content/uploads/2024/04/1-10-600x600.jpg"],
                title:"Label 20 RGB Keyboard",
                category:"Gadget",
                description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt similique eveniet odit facere? Maxime, beatae ex dolore accusamus minus labore!",
                rating:4.5,
                rating_number:20,
                price:200,
                discount:"5%",
                price2:220,
                remain_day:"23",
                remain_hour:"10",
                remain_minutes:"17",
                remain_seconds:"50",
                sold:20,
                stock:50,
                total:50,
                warranty:"1 year warranty",
                guranty:"Genuine Guranted"
            },
            {
                id:1,
                images:["https://allmart.b-cdn.net/home-one/wp-content/uploads/sites/2/2024/12/Image-8.jpg","https://allmart.b-cdn.net/home-one/wp-content/uploads/sites/2/2024/12/Image-20.jpg"],
                title:"Label 20 RGB Keyboard",
                category:"Gadget",
                description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt similique eveniet odit facere? Maxime, beatae ex dolore accusamus minus labore!",
                rating:4.5,
                rating_number:20,
                price:200,
                discount:"5%",
                price2:220,
                remain_day:"23",
                remain_hour:"10",
                remain_minutes:"17",
                remain_seconds:"50",
                sold:20,
                stock:50,
                total:50,
                warranty:"1 year warranty",
                guranty:"Genuine Guranted"
            },
            
        ])

    const handlePrev = () => {
        if (swiperRef.current) {
          swiperRef.current.swiper.slidePrev();
        }
      };
    
      const handleNext = () => {
        if (swiperRef.current) {
          swiperRef.current.swiper.slideNext();
        }
      };
      const [product_list,set_productlist]=useState([])
      const flash_products=()=>{
          axios.get(`https://surebdbackend.arbeittechnology.com/admin/flash-products`)
          .then((res)=>{
              if(res.data.success){
                  set_productlist(res.data.data)
              }
          }).catch((err)=>{
              console.log(err)
          })
      }
      useEffect(()=>{
        flash_products();
      },[])
  
  return (
    <section className='px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] pb-[20px] xl:pb-[50px] font-baji'>
        <div className='flex justify-between items-center'>
               <h2 className='flex justify-center items-center gap-[3px] text-[18px] lg:text-[23px] xl:text-[23px] font-[600]'>Deals of The Day </h2>
                {/* <NavLink className="flex items-center gap-[5px] text-[15px] text-gray-700 font-[500]">
                   <span>View All</span>
                   <GoArrowRight className='text-[20px]'/>
                </NavLink> */}
           </div>
        {/* ------------------------product--------------------- */}
          <section className='mt-[20px]  xl:mt-[30px] 2xl:mt-[40px]'>
          <div className="relative">
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
        modules={[Autoplay]}
        ref={swiperRef}
        navigation={true}  // Disable default navigation since we're using custom buttons
      >
        {product_list.map((data) => (
          <SwiperSlide key={data.id}>
          <Flashsellbox data={data} rating={4} flashSaleEnd={data.flashSaleEnd}/>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons with React Icons */}
      {/* <div
        onClick={handlePrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 swiper-button-prev text-gray-700 cursor-pointer hover:text-indigo-600"
      >
        <FaChevronLeft size={24} />
      </div>
      <div
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 swiper-button-next text-gray-700 cursor-pointer hover:text-indigo-600"
      >
        <FaChevronRight size={24} />
      </div> */}
    </div>
          </section>
        {/* --------------------------product-------------------- */}
        </section>
  )
}

export default Flashsell
