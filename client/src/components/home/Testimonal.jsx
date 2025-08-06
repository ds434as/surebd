import React from 'react'
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import { GoStarFill } from "react-icons/go";
import {Swiper,SwiperSlide} from "swiper/react"
import 'swiper/css';
import { FaQuoteLeft } from "react-icons/fa";
import 'swiper/css/free-mode';
import { FreeMode,Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css/autoplay";
const Testimonal = () => {
  return (
    <section className=''>
 <section className="  px-[20px] md:px-[140px] py-[10px] md:py-[50px] md:pt-[20px]">
  <div className="">

    <div className="flex flex-col items-center">
      <div className="text-left w-full">
           <h2 className='text-[18px] md:text-[30px] font-[600] mb-[10px] font-fredoka'>Our happy Customers say about us</h2>
           <p className='w-[100%] lg:w-[60%] text-[16px] text-neutral-500 leading-[25px]'>See how I've helped our clients succeed. IT’s a highly Customizable,creative, modern, visually stunning and Bootstrap5 HTML5 Template.</p>
      </div>
      <div className="w-full hidden md:flex justify-center   gap-[20px] pt-[10px] lg:pt-[50px] py-[10px] md:py-[20px] ">
      <Swiper
       freeMode={true}
       grabCursor={true}
       modules={[FreeMode,Autoplay, Pagination, Navigation]}
       autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
       className='mySwiper w-full justify-center items-center mt-[30px]'
       slidesPerView={3}
       spaceBetween={10}
       >
 <SwiperSlide>
 <div className="flex w-[100%] min-h-[330px]  mr-[20px] flex-col overflow-hidden  border-[1px] border-[#eee]">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png" alt />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">Leslie Alexander</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">Freelance React Developer</p>
                </div>
              </div>
            </div>
          </div>
 </SwiperSlide>
 <SwiperSlide>
 <div className="flex mr-[20px] min-h-[330px] flex-col w-[100%] overflow-hidden shadow-boxshadow5 border-[1px] border-[#eee]">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center text-[#FDB241] text-[18px] gap-[5px]">
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">“Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.”</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png" alt />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">Jacob Jones</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">Digital Marketer</p>
                </div>
              </div>
            </div>
          </div>
 </SwiperSlide>
 <SwiperSlide>
 <div className="flex mr-[20px] min-h-[330px] flex-col w-[100%] overflow-hidden  border-[1px] border-[#eee]">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center">
                <div className="flex items-center text-[#FDB241] text-[18px] gap-[5px]">
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                </div>
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">“I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish.”</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png" alt />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">Jenny Wilson</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">Graphic Designer</p>
                </div>
              </div>
            </div>
          </div>
 </SwiperSlide>
 <SwiperSlide>
        
 <div className="flex w-[100%] min-h-[330px] mr-[20px] flex-col overflow-hidden  border-[1px] border-[#eee]">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center">
                <div className="flex items-center text-[#FDB241] text-[18px] gap-[5px]">
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                </div>
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png" alt />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">Leslie Alexander</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">Freelance React Developer</p>
                </div>
              </div>
            </div>
          </div>
  </SwiperSlide>
  <SwiperSlide>
  <div className="flex mr-[20px] min-h-[330px] flex-col w-[100%] overflow-hidden  border-[1px] border-[#eee]">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center">
                <div className="flex items-center text-[#FDB241] text-[18px] gap-[5px]">
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                </div>
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">“Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.”</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png" alt />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">Jacob Jones</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">Digital Marketer</p>
                </div>
              </div>
            </div>
          </div>
  </SwiperSlide>
  <SwiperSlide>
  <div className="flex mr-[20px] min-h-[330px] flex-col w-[100%] overflow-hidden  border-[1px] border-[#eee]">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center">
                <div className="flex items-center text-[#FDB241] text-[18px] gap-[5px]">
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                </div>
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">“I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish.”</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png" alt />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">Jenny Wilson</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">Graphic Designer</p>
                </div>
              </div>
            </div>
          </div>
  </SwiperSlide>
        </Swiper>
        </div>
        {/* --------------------mobile trstomonal ----------------- */}
        <div className="w-full md:hidden flex justify-center  gap-[20px] pt-[50px] py-[20px] ">
        <Swiper
       freeMode={true}
       grabCursor={true}
       modules={[FreeMode,Autoplay, Pagination, Navigation]}
       autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
       className='mySwiper w-full justify-center items-center h-auto'
       slidesPerView={1}
       spaceBetween={10}
       >
 <SwiperSlide>
 <div className="flex w-[100%]  mr-[20px] flex-col overflow-hidden  border-[1px] border-[#eee]">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5 text-[#FDB241]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png" alt />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">Leslie Alexander</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">Freelance React Developer</p>
                </div>
              </div>
            </div>
          </div>
 </SwiperSlide>
 <SwiperSlide>
 <div className="flex mr-[20px] flex-col w-[100%] overflow-hidden shadow-boxshadow5 border-[1px] border-[#eee]">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center text-[#FDB241] text-[18px] gap-[5px]">
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">“Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.”</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png" alt />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">Jacob Jones</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">Digital Marketer</p>
                </div>
              </div>
            </div>
          </div>
 </SwiperSlide>
 <SwiperSlide>
 <div className="flex mr-[20px] flex-col w-[100%] overflow-hidden  border-[1px] border-[#eee]">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center">
                <div className="flex items-center text-[#FDB241] text-[18px] gap-[5px]">
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                </div>
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">“I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish.”</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png" alt />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">Jenny Wilson</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">Graphic Designer</p>
                </div>
              </div>
            </div>
          </div>
 </SwiperSlide>
 <SwiperSlide>
        
 <div className="flex w-[100%] mr-[20px] flex-col overflow-hidden  border-[1px] border-[#eee]">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center">
                <div className="flex items-center text-[#FDB241] text-[18px] gap-[5px]">
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                </div>
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">“You made it so simple. My new site is so much faster and easier to work with than my old site. I just choose the page, make the change.”</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-1.png" alt />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">Leslie Alexander</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">Freelance React Developer</p>
                </div>
              </div>
            </div>
          </div>
  </SwiperSlide>
  <SwiperSlide>
  <div className="flex mr-[20px] flex-col w-[100%] overflow-hidden  border-[1px] border-[#eee]">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center">
                <div className="flex items-center text-[#FDB241] text-[18px] gap-[5px]">
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                </div>
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">“Simply the best. Better than all the rest. I’d recommend this product to beginners and advanced users.”</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-male-2.png" alt />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">Jacob Jones</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">Digital Marketer</p>
                </div>
              </div>
            </div>
          </div>
  </SwiperSlide>
  <SwiperSlide>
  <div className="flex mr-[20px] flex-col w-[100%] overflow-hidden  border-[1px] border-[#eee]">
            <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-8 lg:px-7">
              <div className="flex-1">
                <div className="flex items-center">
                <div className="flex items-center text-[#FDB241] text-[18px] gap-[5px]">
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                    <GoStarFill/>
                </div>
                </div>
                <blockquote className="flex-1 mt-8">
                  <p className="text-lg leading-relaxed text-gray-900 font-pj">“I cannot believe that I have got a brand new landing page after getting Omega. It was super easy to edit and publish.”</p>
                </blockquote>
              </div>
              <div className="flex items-center mt-8">
                <img className="flex-shrink-0 object-cover rounded-full w-11 h-11" src="https://cdn.rareblocks.xyz/collection/clarity/images/testimonial/4/avatar-female.png" alt />
                <div className="ml-4">
                  <p className="text-base font-bold text-gray-900 font-pj">Jenny Wilson</p>
                  <p className="mt-0.5 text-sm font-pj text-gray-600">Graphic Designer</p>
                </div>
              </div>
            </div>
          </div>
  </SwiperSlide>
        </Swiper>
    
        </div>
        {/* -------------------mobile testimonal-------------------- */}
    </div>
  </div>
</section>


    </section>
  )
}

export default Testimonal