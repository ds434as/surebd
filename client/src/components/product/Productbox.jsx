import React, { useState } from 'react'
import Productcard from './Productcard'

const Productbox = () => {
    const [products,set_products]=useState([
        {
            id:1,
            image:"https://demo.futureitlab.com/xura/assets/images/Product-Listing/productListingThumb1_6.png",
            title:"Label 20 RGB Keyboard",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt similique eveniet odit facere? Maxime, beatae ex dolore accusamus minus labore!",
            rating:4.5,
            price:200,
            discount:"5%",
            price2:220,
        }
    ])
  return (
    <section>
        {
            products.length > 0 ? <section className='grid grid-cols-4'>
                {
                    products.map((data,id)=>{
                        return(
                            <Productcard data={data} key={id}  />
                        )
                    })
                }
            </section>:""
        }
        
    </section>
  )
}

export default Productbox
