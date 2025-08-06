import React, { useRef, useState,useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Pagination,Autoplay} from 'swiper/modules';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
const Category = () => {
        const swiperRef = useRef(null);
    
    const [categoires,set_categories]=useState([])
    const base_url = import.meta.env.VITE_API_KEY_Base_URL;

    const all_category=()=>{
      axios.get(`https://surebdbackend.arbeittechnology.com/admin/category`)
      .then((res)=>{
        if(res.data.success){
          set_categories(res.data.data)
          console.log(res)
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
    useEffect(()=>{
          all_category();
    },[])
  return (
    <section className='font-baji px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] py-[20px] xl:pb-[50px]'>
     <div className=''>
     <div className='mb-[20px]'>
        <h1 className='text-[18px] 2xl:text-[23px] font-[600]'>All Categories</h1>
      </div>
       {
        categoires.length > 0 ?  <Swiper
        slidesPerView={3}
        spaceBetween={15}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1300: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
        }}
        className="mySwiper"
        modules={[Autoplay]}
        ref={swiperRef}
        navigation={false}  // Disable default navigation since we're using custom buttons
      >
        {categoires?.map((data) => (
          <SwiperSlide key={data.id}>
            <NavLink to={`/category-products/${data.title}`}>
            <div
  className={`border-[1px] group border-[#eaeaea] shadow-shadow1 rounded-[5px] h-[100px] lg:h-[150px] flex justify-center items-center flex-col gap-[10px] `}
>
  <div>
    <img
      className="w-[80%] group-hover:animate-bounce-custom m-auto max-h-[40px] xl:max-h-[80px]"
      src={`https://surebdbackend.arbeittechnology.com/images/${data.image}`}
      alt=""
    />
  </div>
  <h1 className="font-[600] text-[13px] lg:text-[16px] text-[#181818] hover:text-brand_color cursor-pointer">
  {data.title.length > 10 ? `${data.title.substring(0, 10)}...` : data.title}
</h1>

</div>
            </NavLink>


          </SwiperSlide>
        ))}
      </Swiper>:""
       }
     </div>
    </section>
  )
}

export default Category
