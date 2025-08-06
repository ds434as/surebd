import React,{useState} from 'react'
import { NavLink } from 'react-router-dom';
import { GoArrowRight } from "react-icons/go";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { ImEye } from "react-icons/im";
import { HiOutlineShoppingBag } from "react-icons/hi2";
const Homeproduct = () => {
    const [activeTab, setActiveTab] = useState('FEATURED');
    const products = [
        { id: 1, image: "https://htmlbeans.com/html/schon/images/products/img01.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Puff Chair", price: "€ 287,00", rating: 4.5 },
        { id: 2, image: "https://htmlbeans.com/html/schon/images/products/img02.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Lounge Chair", price: "€ 150,00", rating: 4 },
        { id: 3, image: "https://htmlbeans.com/html/schon/images/products/img03.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Modern Sofa", price: "€ 399,00", rating: 5 },
        { id: 4, image: "https://htmlbeans.com/html/schon/images/products/img04.jpg",  image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg",title: "Luxury Bed", price: "€ 549,00", rating: 4.5 },
        { id: 5, image: "https://htmlbeans.com/html/schon/images/products/img05.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Coffee Table", price: "€ 120,00", rating: 4 },
        { id: 6, image: "https://htmlbeans.com/html/schon/images/products/img06.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Office Desk", price: "€ 250,00", rating: 3.5 },
        { id: 7, image: "https://htmlbeans.com/html/schon/images/products/img07.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Armchair", price: "€ 180,00", rating: 4 },
        { id: 8, image: "https://htmlbeans.com/html/schon/images/products/img08.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Dining Set", price: "€ 700,00", rating: 5 },
        { id: 9, image: "https://htmlbeans.com/html/schon/images/products/img09.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "TV Unit", price: "€ 450,00", rating: 4 },
        { id: 10, image: "https://htmlbeans.com/html/schon/images/products/img10.jpg",  image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg",title: "Bookshelf", price: "€ 130,00", rating: 4.5 },
        { id: 4, image: "https://htmlbeans.com/html/schon/images/products/img04.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Luxury Bed", price: "€ 549,00", rating: 4.5 },
        { id: 5, image: "https://htmlbeans.com/html/schon/images/products/img05.jpg",  image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg",title: "Coffee Table", price: "€ 120,00", rating: 4 },
        { id: 6, image: "https://htmlbeans.com/html/schon/images/products/img06.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Office Desk", price: "€ 250,00", rating: 3.5 },
        { id: 7, image: "https://htmlbeans.com/html/schon/images/products/img07.jpg",  image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg",title: "Armchair", price: "€ 180,00", rating: 4 },
        { id: 8, image: "https://htmlbeans.com/html/schon/images/products/img08.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Dining Set", price: "€ 700,00", rating: 5 },
        { id: 9, image: "https://htmlbeans.com/html/schon/images/products/img09.jpg",  image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg",title: "TV Unit", price: "€ 450,00", rating: 4 },
        { id: 10, image: "https://htmlbeans.com/html/schon/images/products/img10.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Bookshelf", price: "€ 130,00", rating: 4.5 },
        { id: 10, image: "https://htmlbeans.com/html/schon/images/products/img10.jpg",  image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg",title: "Bookshelf", price: "€ 130,00", rating: 4.5 },
      
    ];
    const products2 = [
        { id: 7, image: "https://htmlbeans.com/html/schon/images/products/img07.jpg", title: "Armchair", price: "€ 180,00", rating: 4 },
        { id: 8, image: "https://htmlbeans.com/html/schon/images/products/img08.jpg", title: "Dining Set", price: "€ 700,00", rating: 5 },
        { id: 9, image: "https://htmlbeans.com/html/schon/images/products/img09.jpg", title: "TV Unit", price: "€ 450,00", rating: 4 },
        { id: 10, image: "https://htmlbeans.com/html/schon/images/products/img10.jpg", title: "Bookshelf", price: "€ 130,00", rating: 4.5 },
        { id: 4, image: "https://htmlbeans.com/html/schon/images/products/img04.jpg", title: "Luxury Bed", price: "€ 549,00", rating: 4.5 },
        { id: 5, image: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Coffee Table", price: "€ 120,00", rating: 4 },
        { id: 6, image: "https://htmlbeans.com/html/schon/images/products/img06.jpg", title: "Office Desk", price: "€ 250,00", rating: 3.5 },
        { id: 7, image: "https://htmlbeans.com/html/schon/images/products/img07.jpg", title: "Armchair", price: "€ 180,00", rating: 4 },
        { id: 8, image: "https://htmlbeans.com/html/schon/images/products/img08.jpg", title: "Dining Set", price: "€ 700,00", rating: 5 },
        { id: 9, image: "https://htmlbeans.com/html/schon/images/products/img09.jpg", title: "TV Unit", price: "€ 450,00", rating: 4 },
        { id: 10, image: "https://htmlbeans.com/html/schon/images/products/img10.jpg", title: "Bookshelf", price: "€ 130,00", rating: 4.5 },
        { id: 10, image: "https://htmlbeans.com/html/schon/images/products/img10.jpg", title: "Bookshelf", price: "€ 130,00", rating: 4.5 },
      
    ];
    const products3 = [
      { id: 5, image: "https://htmlbeans.com/html/schon/images/products/img05.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Coffee Table", price: "€ 120,00", rating: 4 },
        { id: 6, image: "https://htmlbeans.com/html/schon/images/products/img06.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Office Desk", price: "€ 250,00", rating: 3.5 },
        { id: 7, image: "https://htmlbeans.com/html/schon/images/products/img07.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Armchair", price: "€ 180,00", rating: 4 },
        { id: 8, image: "https://htmlbeans.com/html/schon/images/products/img08.jpg", image2: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Dining Set", price: "€ 700,00", rating: 5 },
        { id: 9, image: "https://htmlbeans.com/html/schon/images/products/img09.jpg", title: "TV Unit", price: "€ 450,00", rating: 4 },
        { id: 10, image: "https://htmlbeans.com/html/schon/images/products/img10.jpg", title: "Bookshelf", price: "€ 130,00", rating: 4.5 },
        { id: 4, image: "https://htmlbeans.com/html/schon/images/products/img04.jpg", title: "Luxury Bed", price: "€ 549,00", rating: 4.5 },
        { id: 5, image: "https://htmlbeans.com/html/schon/images/products/img05.jpg", title: "Coffee Table", price: "€ 120,00", rating: 4 },
        { id: 6, image: "https://htmlbeans.com/html/schon/images/products/img06.jpg", title: "Office Desk", price: "€ 250,00", rating: 3.5 },
        { id: 7, image: "https://htmlbeans.com/html/schon/images/products/img07.jpg", title: "Armchair", price: "€ 180,00", rating: 4 },
        { id: 8, image: "https://htmlbeans.com/html/schon/images/products/img08.jpg", title: "Dining Set", price: "€ 700,00", rating: 5 },
        { id: 9, image: "https://htmlbeans.com/html/schon/images/products/img09.jpg", title: "TV Unit", price: "€ 450,00", rating: 4 },
        { id: 10, image: "https://htmlbeans.com/html/schon/images/products/img10.jpg", title: "Bookshelf", price: "€ 130,00", rating: 4.5 },
        { id: 10, image: "https://htmlbeans.com/html/schon/images/products/img10.jpg", title: "Bookshelf", price: "€ 130,00", rating: 4.5 },
      
    ];
  return (
    <section className='font-poppins px-[150px] pb-[50px]'>
    <div className="">
      <div className="flex items-center justify-between  py-2">
        <div className="flex">
          <button
            onClick={() => setActiveTab('FEATURED')}
            className={`text-[20px] font-semibold pr-[20px] font-roboto uppercase ${
              activeTab === 'FEATURED' ? 'text-[#3a3a3a]' : 'text-gray-500'
            }`}
          >
            FEATURED
          </button>
          <button
            onClick={() => setActiveTab('LATEST')}
            className={`text-[20px] font-semibold border-l-[1px] px-[20px] border-[#d8d8d8] font-roboto uppercase ${
              activeTab === 'LATEST' ? 'text-[#3a3a3a]' : 'text-gray-500'
            }`}
          >
            LATEST
          </button>
          <button
            onClick={() => setActiveTab('BEST SELLER')}
            className={`text-[20px] font-semibold border-l-[1px] px-[20px] border-[#d8d8d8] font-roboto uppercase ${
              activeTab === 'BEST SELLER' ? 'text-[#3a3a3a]' : 'text-gray-500'
            }`}
          >
            BEST SELLER
          </button>
        </div>

        <div className="flex space-x-2">
        <NavLink className="flex items-center gap-[5px] text-[15px] text-gray-700 font-[500]">
                <span>View All</span>
                <GoArrowRight className='text-[20px]'/>
             </NavLink>
        </div>
      </div>

      <div className="mt-6">
        <div
          className={`p-4  grid grid-cols-6 gap-[30px] ${
            activeTab === 'FEATURED' ? 'block' : 'hidden'
          }`}
        >
            {
                products.map((data)=>{
                    return(
                        <div className="relative group cursor-pointer">
                        <div className="relative ">
                         <div className='w-full overflow-hidden'>
                         <img
                            src={data.image}
                            alt=""
                            className="transition-transform group-hover:hidden duration-500 ease-in-out transform group-hover:translate-x-[20%]"
                          />
                            <img
                            src={data.image2}
                            alt=""
                            className="transition-transform duration-500 hidden group-hover:block ease-in-out transform group-hover:translate-x-[20%]"
                          />
                         </div>
                          {/* --------------box-------------- */}
                          <div className="icon_box w-full flex justify-center absolute bottom-[-10%] left-0 bg-white items-center border-[1px] border-border1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0">
                            <div className="flex p-[10px] w-full gap-[5px]">
                              <HiOutlineShoppingBag className="text-[20px] transition-all duration-200 hover:text-red-500 text-gray-700" />
                              <span className="text-[14px] text-gray-500 transition-all duration-200 hover:text-red-500">add to cart</span>
                            </div>
                            <div className="px-[15px] py-[10px] group cursor-pointer border-l-[1px] transition-all duration-200 border-border1">
                              <IoMdHeartEmpty className="text-[20px] hover:text-red-500 text-gray-700" />
                            </div>
                            <div className="px-[15px] py-[10px] flex justify-center group items-center text-center cursor-pointer border-l-[1px] border-border1">
                              <ImEye className="text-[20px] hover:text-red-500 transition-all duration-200 text-gray-700" />
                            </div>
                          </div>
                          {/* --------------box-------------- */}
                        </div>
                        {/* Product Details */}
                        <span className="absolute top-0 left-0 px-[10px] py-[3px] text-[14px] bg-black text-white font-roboto">New</span>
                        <div className="text-center mt-[5px]">
                          <div className="star flex justify-center items-center gap-1 mb-[7px] text-yellow-400">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStarHalfStroke />
                          </div>
                          <h3 className="text-[16px] font-semibold text-[#757575] hover:text-red-500 cursor-pointer">{data.title}</h3>
                          <p className="text-gray-700 font-bold text-[15px] mt-[4px]">€ {data.price}</p>
                        </div>
                      </div>
                      
                    )
                })
            }


        </div>

        <div
          className={`p-4  grid grid-cols-6 gap-[30px] ${
            activeTab === 'LATEST' ? 'block' : 'hidden'
          }`}
        >
            {
                products2.map((data)=>{
                    return(
                        <div className="relative group cursor-pointer">
                        <div className="relative ">
                         <div className='w-full overflow-hidden'>
                         <img
                            src={data.image}
                            alt=""
                            className="transition-transform duration-500 ease-in-out transform group-hover:translate-x-[20%]"
                          />
                         </div>
                          {/* --------------box-------------- */}
                          <div className="icon_box w-full flex justify-center absolute bottom-[-10%] left-0 bg-white items-center border-[1px] border-border1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0">
                            <div className="flex p-[10px] w-full gap-[5px]">
                              <HiOutlineShoppingBag className="text-[20px] transition-all duration-200 hover:text-red-500 text-gray-700" />
                              <span className="text-[14px] text-gray-500 transition-all duration-200 hover:text-red-500">add to cart</span>
                            </div>
                            <div className="px-[15px] py-[10px] group cursor-pointer border-l-[1px] transition-all duration-200 border-border1">
                              <IoMdHeartEmpty className="text-[20px] hover:text-red-500 text-gray-700" />
                            </div>
                            <div className="px-[15px] py-[10px] flex justify-center group items-center text-center cursor-pointer border-l-[1px] border-border1">
                              <ImEye className="text-[20px] hover:text-red-500 transition-all duration-200 text-gray-700" />
                            </div>
                          </div>
                          {/* --------------box-------------- */}
                        </div>
                        {/* Product Details */}
                        <span className="absolute top-0 left-0 px-[10px] py-[3px] text-[14px] bg-black text-white font-roboto">New</span>
                        <div className="text-center mt-[5px]">
                          <div className="star flex justify-center items-center gap-1 mb-[7px] text-yellow-400">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStarHalfStroke />
                          </div>
                          <h3 className="text-[16px] font-semibold text-[#757575] hover:text-red-500 cursor-pointer">{data.title}</h3>
                          <p className="text-gray-700 font-bold text-[15px] mt-[4px]">€ {data.price}</p>
                        </div>
                      </div>
                      
                    )
                })
            }
        </div>

        <div
          className={`p-4  grid grid-cols-6 gap-[30px]  ${
            activeTab === 'BEST SELLER' ? 'block' : 'hidden'
          }`}
        >
  {
                products3.map((data)=>{
                    return(
                        <div className="relative group cursor-pointer">
                        <div className="relative ">
                         <div className='w-full overflow-hidden'>
                         <img
                            src={data.image}
                            alt=""
                            className="transition-transform duration-500 ease-in-out transform group-hover:translate-x-[20%]"
                          />
                         </div>
                          {/* --------------box-------------- */}
                          <div className="icon_box w-full flex justify-center absolute bottom-[-10%] left-0 bg-white items-center border-[1px] border-border1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out transform group-hover:translate-y-0">
                            <div className="flex p-[10px] w-full gap-[5px]">
                              <HiOutlineShoppingBag className="text-[20px] transition-all duration-200 hover:text-red-500 text-gray-700" />
                              <span className="text-[14px] text-gray-500 transition-all duration-200 hover:text-red-500">add to cart</span>
                            </div>
                            <div className="px-[15px] py-[10px] group cursor-pointer border-l-[1px] transition-all duration-200 border-border1">
                              <IoMdHeartEmpty className="text-[20px] hover:text-red-500 text-gray-700" />
                            </div>
                            <div className="px-[15px] py-[10px] flex justify-center group items-center text-center cursor-pointer border-l-[1px] border-border1">
                              <ImEye className="text-[20px] hover:text-red-500 transition-all duration-200 text-gray-700" />
                            </div>
                          </div>
                          {/* --------------box-------------- */}
                        </div>
                        {/* Product Details */}
                        <span className="absolute top-0 left-0 px-[10px] py-[3px] text-[14px] bg-black text-white font-roboto">New</span>
                        <div className="text-center mt-[5px]">
                          <div className="star flex justify-center items-center gap-1 mb-[7px] text-yellow-400">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaRegStarHalfStroke />
                          </div>
                          <h3 className="text-[16px] font-semibold text-[#757575] hover:text-red-500 cursor-pointer">{data.title}</h3>
                          <p className="text-gray-700 font-bold text-[15px] mt-[4px]">€ {data.price}</p>
                        </div>
                      </div>
                      
                    )
                })
            }
        </div>
      </div>
    </div>
   </section>
  )
}

export default Homeproduct
