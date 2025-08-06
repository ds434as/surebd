import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { IoIosArrowForward } from "react-icons/io";
import Productcard from "../components/product/Productcard";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const Product = () => {
  const [brands, setBrands] = useState([]);
  const [activeBrand, setActiveBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(20);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeColor, setActiveColor] = useState(null);
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Fetch brands
  const fetchBrands = () => {
    axios
      .get("https://surebdbackend.arbeittechnology.com/admin/brands")
      .then((res) => {
        if (res.data.success) {
          setBrands(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  // Fetch products
  const fetchProducts = () => {
    setIsLoading(true);
    axios
      .get("https://surebdbackend.arbeittechnology.com/admin/all-products")
      .then((res) => {
        if (res.data.success) {
          setProductList(res.data.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchBrands();
    fetchProducts();
  }, []);

  // Handle brand selection
  const handleBrandClick = (brand) => {
    setActiveBrand(brand === activeBrand ? null : brand);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Product filtering logic
  const filteredProducts = productList.filter((product) => {
    const matchesSearch =
      searchQuery === "" || product.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesColor = !activeColor || product.color?.toLowerCase() === activeColor.toLowerCase();
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesBrand = !activeBrand || product.brand?.toLowerCase() === activeBrand.toLowerCase();

    return matchesSearch && matchesColor && matchesPrice && matchesBrand;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
          {/* Image placeholder */}
          <div className="bg-gray-200 h-48 w-full animate-pulse"></div>
          
          {/* Content placeholder */}
          <div className="p-4">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
            
            {/* Price placeholder */}
            <div className="flex items-center justify-between">
              <div className="h-5 bg-gray-300 rounded w-1/3 animate-pulse"></div>
              <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
            </div>
            
            {/* Rating placeholder */}
            <div className="flex mt-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 w-3 bg-gray-200 rounded-full mr-1 animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className="font-baji">
      <Header />
      <section className="w-full px-4 md:px-10 lg:px-20 xl:px-[150px] py-[12px]">
        <ul className="flex justify-start items-center gap-2 md:gap-4">
          <li>Home</li>
          <li>
            <IoIosArrowForward />
          </li>
          <li>Products</li>
        </ul>
      </section>

      {/* Products Section */}
      <section className="px-4 md:px-10 lg:px-20 xl:px-[150px] py-6 flex flex-col md:flex-row gap-6">
        {/* Filter Box */}
        <div className="w-full md:w-1/4">
          <div className="w-full bg-white p-6 shadow-lg border border-gray-200 rounded-lg sticky top-[10vh]">
            {/* Search Bar */}
            <div className="mb-6 px-4 py-3 border border-gray-300 rounded-lg flex items-center gap-2">
              <AiOutlineSearch className="text-xl text-gray-600" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full outline-none"
              />
            </div>

            {/* Filter by Price */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Filter By Price</h3>
              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>৳{minPrice}</span>
                  <span>৳{maxPrice}</span>
                </div>
                <div className="relative h-2 bg-gray-300 rounded-full">
                  <div
                    className="absolute h-2 bg-[#eb3b5a] rounded-full"
                    style={{
                      left: `${((minPrice - 30) / (1500 - 30)) * 100}%`,
                      right: `${100 - ((maxPrice - 30) / (1500 - 30)) * 100}%`,
                    }}
                  ></div>
                  <input
                    type="range"
                    min="30"
                    max="1500"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="absolute top-0 w-full h-2 appearance-none bg-transparent"
                    style={{ zIndex: 2 }}
                  />
                  <input
                    type="range"
                    min="30"
                    max="1500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="absolute top-0 w-full h-2 appearance-none bg-transparent"
                    style={{ zIndex: 3 }}
                  />
                </div>
              </div>
            </div>

            {/* Brands Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Brands</h3>
              <ul className="space-y-3">
                {brands.map((brand, index) => (
                  <li
                    key={index}
                    className={`flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-all ${
                      activeBrand === brand.name ? "font-bold text-[#eb3b5a]" : "text-gray-700"
                    }`}
                    onClick={() => handleBrandClick(brand.title)}
                  >
                    <span>{brand.title}</span>
                    <span className="text-gray-500">{brand.count || 0}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          {isLoading ? (
            <SkeletonLoader />
          ) : filteredProducts.length > 0 ? (
            <>
              <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {currentProducts.map((data, id) => (
                  <Productcard data={data} key={id} rating={data.rating} />
                ))}
              </section>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <nav className="flex items-center gap-1">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors"
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
                          onClick={() => paginate(pageNum)}
                          className={`px-3 py-1 rounded-md border ${
                            currentPage === pageNum
                              ? "bg-[#eb3b5a] text-white border-[#eb3b5a]"
                              : "border-gray-300 hover:bg-gray-50"
                          } transition-colors`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded-md border border-gray-300 disabled:opacity-50 hover:bg-gray-50 transition-colors"
                    >
                      &raquo;
                    </button>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 mb-4 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700">No products found</h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Product;