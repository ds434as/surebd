import React, { useState, useEffect } from 'react';
import axios from 'axios';
import blog_empty from "../../assets/blog_empty.png";
import Footer from '../../components/Footer';
import { NavLink } from 'react-router-dom';
import { CgArrowTopRight } from "react-icons/cg";
import Header from '../Header';
import { toast } from 'react-toastify';

const Hblog = () => {
  const [blogs, set_blogs] = useState([]);

  useEffect(() => {
    axios.get('https://surebdbackend.arbeittechnology.com/admin/blogs')
      .then((res) => {
        set_blogs(res.data.blogs); // Make sure the response structure matches
      })
      .catch((err) => {
        toast.error("Failed to fetch blogs");
        console.error(err);
      });
  }, []);

  return (
    <section className='font-baji'>
      <div className='px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] pt-[50px] pb-[20px] flex justify-between items-center flex-wrap'>
        <h1 className='text-[20px] md:text-[24px] lg:text-[23px] font-[600] text-title'>Our Blogs</h1>
        <NavLink className="flex justify-start items-center gap-[8px] md:gap-[10px] text-title hover:text-brand_color group">
          <span className="transform transition-transform duration-300 group-hover:animate-bounce-custom">
            View All
          </span>
          <CgArrowTopRight className="transform transition-transform duration-300 group-hover:animate-bounce-custom" />
        </NavLink>
      </div>

      {/* Blogs List */}
      <section className='px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] pb-[50px] md:pb-[60px] lg:pb-[70px]'>
        {blogs?.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[30px] lg:gap-[40px]">
            {blogs.slice(0, 3).map((data) => (
              <div className="group" key={data._id}>
                <div className="overflow-hidden rounded-[5px] cursor-pointer">
                  <NavLink to={`/single-blog/${data._id}`}>
                    <img
                      className="group-hover:scale-[1.1] w-full h-[250px] md:h-[200px]  lg:h-[270px] xl:h-[300px] group-hover:rotate-[3deg] transition-all duration-500 rounded-[5px]"
                      src={`https://surebdbackend.arbeittechnology.com/images/${data.image}`}
                      alt=""
                    />
                  </NavLink>
                </div>
                <div className="pt-[15px] md:pt-[20px]">
                  <div className="flex justify-start gap-[5px] mb-[8px] md:mb-[10px] text-[#999] text-[12px] md:text-[14px] items-center">
                    <p>{data.date}</p>
                    <p>-</p>
                    <p>{data.category}</p>
                  </div>
                  <h1 className="text-[18px] md:text-[20px] lg:text-[22px] mb-[10px] md:mb-[15px] font-[500] text-title cursor-pointer hover:text-black transition-all duration-150">
                    {data.title}
                  </h1>
                  <p className="text-title2 leading-[22px] md:leading-[25px] text-[14px] md:text-[16px] mb-[12px] md:mb-[15px]">
                    {data.description}
                  </p>
                  <NavLink to={`/single-blog/${data._id}`} className="flex justify-start items-center gap-[8px] md:gap-[10px] text-title hover:text-brand_color group">
                    <span className="transform transition-transform duration-300 group-hover:animate-bounce-custom">
                      Read more
                    </span>
                    <CgArrowTopRight className="transform transition-transform duration-300 group-hover:animate-bounce-custom" />
                  </NavLink>
                </div>
              </div>
            ))}
          </section>
        ) : (
          <section className="flex justify-center items-center py-[80px] md:py-[100px] flex-col">
            <img className="w-[180px] md:w-[220px] lg:w-[250px]" src={blog_empty} alt="Empty Blogs" />
            <h1 className="text-[18px] md:text-[20px] lg:text-[22px] font-[600] mt-[8px] md:mt-[10px] text-title">
              Blogs are empty.
            </h1>
          </section>
        )}
      </section>
    </section>
  );
};

export default Hblog;
