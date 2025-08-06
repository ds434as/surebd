import React, { useState,useEffect } from 'react'
import { GoArrowRight } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import axios from 'axios';
const Topbrand = () => {

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
  <section className='px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] font-baji'>
    <div className='flex justify-between items-center'>
            <h2 className='flex justify-center items-center gap-[3px] text-[18px] xl:text-[23px] font-[600]'>Top Brands </h2>
        </div>
        {/* ---------------------brands-----------------------*/}
         <section className='mt-[10px] lg:mt-[20px]'>
  {
    brands.length > 0 ?
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {brands.map((brand, index) => (
        <div
          key={index}
          className="bg-white w-full px-5 py-6 flex items-center justify-center border-[1px] border-gray-200 hover:shadow-xl transition-all duration-200 cursor-pointer rounded"
        >
          <img
            className=" object-contain"
            src={`https://surebdbackend.arbeittechnology.com/images/${brand.image}`}
            alt={brand.name}
          />
        </div>
      ))}
    </div>
    :""
  }
    
         </section>
        {/* -------------------------brands------------------ */}
  </section>
  )
}

export default Topbrand
