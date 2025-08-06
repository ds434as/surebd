import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { IoIosArrowForward } from "react-icons/io";
import blog_empty from "../assets/blog_empty.png";
import { NavLink } from 'react-router-dom';
import { CgArrowTopRight } from "react-icons/cg";
import Footer from '../components/Footer';
import axios from 'axios';

const Blog = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const blogsPerPage = 6;

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get('https://surebdbackend.arbeittechnology.com/admin/blogs');
      setAllBlogs(data.blogs);
    } catch (err) {
      console.error("Error fetching blogs", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(allBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = allBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[30px] lg:gap-[40px]">
      {[...Array(blogsPerPage)].map((_, index) => (
        <div key={index} className="group">
          {/* Image placeholder */}
          <div className="overflow-hidden rounded-[5px] cursor-pointer">
            <div className="h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px] w-full bg-gray-200 animate-pulse rounded-[5px]"></div>
          </div>
          <div className="pt-[15px] sm:pt-[20px]">
            {/* Date/Category placeholder */}
            <div className="flex gap-[5px] mb-[8px]">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
            {/* Title placeholder */}
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            {/* Description placeholder */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
            {/* Read more placeholder */}
            <div className="flex items-center gap-[8px] mt-3">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );

  return (
    <section>
      <Header />
      {/* Breadcrumb */}
      <div className="w-full bg-[#FCFCFC] h-[80px] sm:h-[100px] mb-[10px] sm:mb-[20px] flex items-center font-poppins">
        <div className="w-full px-[15px] sm:px-[20px] md:px-[80px] lg:px-[150px]">
          <ul className="flex gap-[8px] sm:gap-[10px] text-sm sm:text-[14px] md:text-[16px]">
            <li>Home</li>
            <li><IoIosArrowForward /></li>
            <li>Blogs</li>
          </ul>
        </div>
      </div>

      {/* Blogs */}
      <section className="px-[15px] sm:px-[20px] md:px-[80px] lg:px-[150px] pb-[50px] sm:pb-[70px]">
        {isLoading ? (
          <SkeletonLoader />
        ) : currentBlogs.length > 0 ? (
          <>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[30px] lg:gap-[40px]">
              {currentBlogs.map((data) => (
                <div className="group" key={data.id}>
                  <div className="overflow-hidden rounded-[5px] cursor-pointer">
                    <NavLink to={`/single-blog/${data._id}`}>
                      <img
                        className="group-hover:scale-[1.1] h-[220px] sm:h-[250px] md:h-[280px] lg:h-[300px] w-full group-hover:rotate-[3deg] transition-all duration-500 rounded-[5px]"
                        src={`https://surebdbackend.arbeittechnology.com/images/${data.image}`}
                        alt=""
                      />
                    </NavLink>
                  </div>
                  <div className="pt-[15px] sm:pt-[20px]">
                    <div className="flex gap-[5px] mb-[8px] text-[#999] text-xs sm:text-sm md:text-[14px]">
                      <p>{data.date}</p>
                      <p>-</p>
                      <p>{data.category}</p>
                    </div>
                    <h1 className="text-[18px] sm:text-[20px] md:text-[22px] font-[500] text-title hover:text-black cursor-pointer transition-all duration-150">
                      {data.title}
                    </h1>
                    <p className="text-title2 leading-[22px] sm:leading-[25px] text-sm sm:text-base mb-[12px] sm:mb-[15px]">
                      {data.description}
                    </p>
                    <NavLink to={`/single-blog/${data._id}`} className="flex items-center gap-[8px] text-title hover:text-brand_color group">
                      <span className="transition duration-300 group-hover:animate-bounce-custom text-sm sm:text-base">
                        Read more
                      </span>
                      <CgArrowTopRight className="transition-transform duration-300 group-hover:animate-bounce-custom" />
                    </NavLink>
                  </div>
                </div>
              ))}
            </section>

            {/* Enhanced Pagination */}
            <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
              <button
                className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &laquo;
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    className={`px-3 py-1 rounded-md border ${
                      currentPage === pageNum
                        ? "bg-[#eb3b5a] text-white border-[#eb3b5a]"
                        : "border-gray-300 hover:bg-gray-50"
                    } transition-colors`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                className="px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &raquo;
              </button>
            </div>
          </>
        ) : (
          <section className="flex justify-center items-center py-[80px] sm:py-[100px] flex-col">
            <img className="w-[180px] sm:w-[200px] md:w-[250px]" src={blog_empty} alt="Empty Blogs" />
            <h1 className="text-[18px] sm:text-[20px] md:text-[22px] font-[600] mt-[10px] text-title">
              Blogs are empty.
            </h1>
          </section>
        )}
      </section>
      <Footer />
    </section>
  );
};

export default Blog;