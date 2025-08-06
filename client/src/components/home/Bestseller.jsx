import React, { useState,useEffect} from 'react'
import { GoArrowRight } from "react-icons/go";
import { NavLink } from 'react-router-dom';
import axios from "axios"
import Productcard from '../product/Productcard';
const Bestseller = () => {
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
                price2:220,
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
                price2:220,
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
                price2:220,
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
                price2:220,
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
                price2:220,
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
            },
            
        ])
        const [product_list,set_productlist]=useState([])
        const all_category=()=>{
            axios.get(`https://surebdbackend.arbeittechnology.com/admin/all-products`)
            .then((res)=>{
                if(res.data.success){
                    set_productlist(res.data.data)
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
        useEffect(()=>{
            all_category();
        },[])
  return (
   <section className='px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] pb-[20px] xl:pb-[50px] font-baji'>
      <div className='flex justify-between items-center'>
            <h2 className='flex justify-center items-center gap-[3px] text-[18px]  lg:text-[23px] font-[600]'> Best Sellers </h2>
             <NavLink to='/products' className="flex items-center gap-[5px] text-[15px] text-gray-700 font-[500]">
                <span>View All</span>
                <GoArrowRight className='text-[20px]'/>
             </NavLink>
        </div>
        {/* --------------best-seller---------------- */}
        
        {
            product_list.length > 0 ? <section className='grid mt-[20px] 2xl:mt-[40px] grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-[20px]'>
                {
                    product_list.map((data,id)=>{
                        return(
                            <Productcard data={data} key={id} rating={3}  />
                        )
                    })
                }
            </section>:""
        }
        {/* --------------best-seller---------------- */}
   </section>
  )
}

export default Bestseller
