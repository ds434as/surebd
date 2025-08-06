import React from 'react'
import Marquee from "react-fast-marquee";
import { NavLink } from 'react-router-dom';
const Header4 = () => {
  return (
    <section className='px-[10px] md:px-[150px] pb-[15px]'>
      <section className='w-full h-auto'>
      <Marquee pauseOnClick>
      <div className='xl:w-[220px] w-[120px] h-[70px] xl:h-[120px] rounded-[5px] overflow-hidden mr-[10px]'>
             <NavLink>
                <div className='w-full h-[100%]'>
                    <img className='w-full h-full' src="https://htmldemo.net/rozer/rozer/assets/images/banner-image/9.jpg" alt="" />
                </div>
             </NavLink>
        </div>
        <div className='xl:w-[220px] w-[120px] h-[70px] xl:h-[120px] rounded-[5px] overflow-hidden mr-[10px]'>
             <NavLink>
                <div className='w-full h-[100%]'>
                    <img className='w-full h-full' src="https://tunatheme.com/tf/html/broccoli-preview/broccoli/img/banner/2.jpg" alt="" />
                </div>
             </NavLink>
        </div>
        <div className='xl:w-[220px] w-[120px] h-[70px] xl:h-[120px] rounded-[5px] overflow-hidden mr-[10px]'>
             <NavLink>
                <div className='w-full h-[100%]'>
                    <img className='w-full h-full' src="https://tunatheme.com/tf/html/broccoli-preview/broccoli/img/banner/1.jpg" alt="" />
                </div>
             </NavLink>
        </div>
        <div className='xl:w-[220px] w-[120px] h-[70px] xl:h-[120px] rounded-[5px] overflow-hidden mr-[10px]'>
             <NavLink>
                <div className='w-full h-[100%]'>
                    <img className='w-full h-full' src="https://tunatheme.com/tf/html/broccoli-preview/broccoli/img/banner/3.jpg" alt="" />
                </div>
             </NavLink>
        </div>
        <div className='xl:w-[220px] w-[120px] h-[70px] xl:h-[120px] rounded-[5px] overflow-hidden mr-[10px]'>
             <NavLink>
                <div className='w-full h-[100%]'>
                    <img className='w-full h-full' src="https://tunatheme.com/tf/html/broccoli-preview/broccoli/img/banner/15.png" alt="" />
                </div>
             </NavLink>
        </div>
        <div className='xl:w-[220px] w-[120px] h-[70px] xl:h-[120px] rounded-[5px] overflow-hidden mr-[10px]'>
             <NavLink>
                <div className='w-full h-[100%]'>
                    <img className='w-full h-full' src="https://htmldemo.net/rozer/rozer/assets/images/banner-image/9.jpg" alt="" />
                </div>
             </NavLink>
        </div>
        <div className='xl:w-[220px] w-[120px] h-[70px] xl:h-[120px] rounded-[5px] overflow-hidden mr-[10px]'>
             <NavLink>
                <div className='w-full h-[100%]'>
                    <img className='w-full h-full' src="https://tunatheme.com/tf/html/broccoli-preview/broccoli/img/banner/14.png" alt="" />
                </div>
             </NavLink>
        </div>
   
        <div className='xl:w-[220px] w-[120px] h-[70px] xl:h-[120px] rounded-[5px] overflow-hidden mr-[10px]'>
             <NavLink>
                <div className='w-full h-[100%]'>
                    <img className='w-full h-full' src="https://htmldemo.net/rozer/rozer/assets/images/banner-image/10.jpg" alt="" />
                </div>
             </NavLink>
        </div>
  </Marquee>
    
      </section>
    </section>
  )
}

export default Header4