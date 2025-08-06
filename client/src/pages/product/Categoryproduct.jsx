import React, { useState, useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Productcard from "../../components/product/Productcard";
import { AiOutlineSearch } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Categoryproduct = () => {
  const [brands, setBrands] = useState([]); // Store fetched brands
  const [activeBrand, setActiveBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(20);
  const [maxPrice, setMaxPrice] = useState(1500);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeColor, setActiveColor] = useState(null);
  const [productList, setProductList] = useState([]);
  const { pathname } = useLocation();
  const {category}=useParams();
  console.log(category)

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
    axios
      .get(`https://surebdbackend.arbeittechnology.com/user/category-product/${category}`)
      .then((res) => {
        if (res.data.success) {
          setProductList(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBrands();
    fetchProducts();
  }, []);

  // Handle brand selection
  const handleBrandClick = (brand) => {
    setActiveBrand(brand === activeBrand ? null : brand);
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
                  <span>${minPrice}</span>
                  <span>${maxPrice}</span>
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
          {filteredProducts.length > 0 ? (
            <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((data, id) => (
                <Productcard data={data} key={id} rating={data.rating} />
              ))}
            </section>
          ) : (
            <p className="text-center text-gray-500">No products match your criteria.</p>
          )}
        </div>
      </section>
      <Footer/>
    </section>
  );
};

export default Categoryproduct;
