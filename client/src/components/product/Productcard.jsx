import React,{useState} from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { CgHeart } from "react-icons/cg";
import { FaRegEye } from "react-icons/fa";
import {NavLink} from "react-router-dom"
const Productcard = ({data,rating}) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [currentRating, setCurrentRating] = useState(5);
  
    // Function to handle the mouse hover
    const handleMouseEnter = (value) => setHoverRating(value);
    const handleMouseLeave = () => setHoverRating(0);
  
    // Function to handle the rating click
    const handleClick = (value) => {
      setCurrentRating(value);
      console.log("New Rating:", value); // Check if the rating is updated
    };
  
    // Function to render stars based on rating
    const renderStars = () => {
      const stars = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= currentRating) {
          stars.push(<FaStar key={i} className=" text-orange-500" />);
        } else if (i - 0.5 <= currentRating && i - 1 >= currentRating) {
          stars.push(<FaStarHalfAlt key={i} className=" text-orange-500" />);
        } else {
          stars.push(
            <FaRegStar
              key={i}
              className="text-gray-300"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(i)}
            />
          );
        }
      }
      return stars;
    };

  return (
<NavLink to={`/single-product/${data._id}?category=${data.category}`}>
<div
  className="border border-[#eee] cursor-pointer group h-full  hover:shadow-md overflow-hidden transition-all duration-200 max-w-[400px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[400px]"
>
  {/* Image Section */}
  <div className="w-full relative flex justify-center  items-center overflow-hidden">
    <div className="relative w-full h-[150px] xs:h-[160px] sm:h-[180px]  md:h-[200px] lg:h-[230px] group">
      {/* First Image */}
      <img
        className="absolute inset-0 w-full h-full m-auto transition-opacity duration-500 opacity-100 group-hover:opacity-0"
        src={`https://surebdbackend.arbeittechnology.com/images/${data?.images[0]}`}
        alt="Product"
      />
      {/* Second Image (on Hover) */}
      {data?.images[1] && (
        <img
          className="absolute inset-0 w-auto h-full m-auto transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          src={`https://surebdbackend.arbeittechnology.com/images/${data?.images[1]}`}
          alt="Product"
        />
      )}
    </div>
    {/* Discount Badge */}
    {data.discount ? <span className="px-2 py-1 absolute top-2 left-2 rounded-md text-[10px] sm:text-[12px] font-medium text-white bg-red-500">
        {data.discount}% off
      </span>:null}
  </div>

  {/* Product Info */}
  <div className="px-3 sm:px-4 py-2 sm:py-3">
    {/* Category */}
    <h4 className="font-medium text-[12px] sm:text-[14px] text-gray-600">{data?.category}</h4>

    {/* Product Name */}
    <h1 className="text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-gray-800">
      {data.productName?.length > 40 ? `${data.productName.slice(0, 40)}...` : data.productName}
    </h1>

    {/* Rating */}
    <h2 className="flex items-center gap-1 mt-2 text-[12px] sm:text-[14px] md:text-[16px]">
      {renderStars()} {currentRating} <span className="text-gray-500">({data.reviews})</span>
    </h2>

    {/* Price Section */}
    <div className="flex items-center mt-2 gap-2">
      <h2 className="text-[14px] sm:text-[16px] md:text-[18px] text-[#e55101] font-bold">৳{data?.price}</h2>
      {data?.oldPrice && (
        <h3 className="text-[12px] sm:text-[14px] md:text-[16px] font-medium text-gray-500 line-through">৳{data?.oldPrice}</h3>
      )}
    </div>
  </div>
</div>

</NavLink>

  
  )
}

export default Productcard
