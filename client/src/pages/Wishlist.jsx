import React, { useState } from "react";
import Header from "../components/Header";
import { FaTrashAlt } from "react-icons/fa";
import Footer from "../components/Footer";

const Wishlist = () => {
  const [products, setProducts] = useState([
    // {
    //   id: 1,
    //   image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/08/gaming-mouse.png",
    //   title: "Gaming Mouse",
    //   price: "$10.50",
    //   stockStatus: "In Stock",
    // },
    // {
    //   id: 2,
    //   image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/08/gaming-mouse.png",
    //   title: "Gaming Headset",
    //   price: "$10.50",
    //   stockStatus: "Out Stock",
    // },
    // {
    //   id: 3,
    //   image: "https://ecommax.risingbamboo.com/wp-content/uploads/2024/08/gaming-mouse.png",
    //   title: "Gaming Keyboard",
    //   price: "$10.50",
    //   stockStatus: "In Stock",
    // },
  ]);

  return (
    <section className="font-baji">
      <Header />
      {/* Breadcrumb Navigation */}
      <section className="px-[150px] py-[20px] bg-[#F9F9F9]">
        <div>
          <ul className="flex justify-start items-center gap-[5px] font-[500] text-[17px]">
            <li>Home</li>
            <li>/</li>
            <li>Wishlist</li>
          </ul>
        </div>
      </section>

      {/* Wishlist Content */}
      <section className="px-[150px] py-[70px]">
        {products.length > 0 ? (
          <div className="w-full mt-10 overflow-x-auto border-[1px] border-[#eee]">
            <table className="w-full border-collapse bg-white shadow-md overflow-hidden">
              <thead className="bg-gray-100">
                <tr className="text-left">
                  <th className="px-4 py-3 text-left text-[18px] font-bold text-nowrap text-gray-700 uppercase">Product</th>
                  <th className="px-4 py-3 text-left text-[18px] font-bold text-nowrap text-gray-700 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-[18px] font-bold text-nowrap text-gray-700 uppercase">Stock Status</th>
                  <th className="px-4 py-3 text-left text-[18px] font-bold text-nowrap text-gray-700 uppercase">Add to Cart</th>
                  <th className="px-4 py-3 text-left text-[18px] text-nowrap font-bold text-gray-700 uppercase">Remove</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b last:border-none">
                    <td className="px-4 py-[20px] flex items-center space-x-4">
                      <img src={product.image} alt={product.title} className="w-[80px] h-[80px] rounded-md object-cover" />
                      <span className="text-gray-700 text-[18px] font-bold">{product.title}</span>
                    </td>
                    <td className="px-4 py-3 font-[500] text-gray-700 text-[18px]">{product.price}</td>
                    <td className="px-4 py-3 text-[18px]">
                      <span className={`font-[600] ${product.stockStatus === "In Stock" ? "text-green-600" : "text-red-500"}`}>
                        {product.stockStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="px-[20px] py-[8px] text-white bg-red-500 hover:bg-red-600 text-[16px] rounded-full font-medium">
                        Add To Cart
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-gray-400 text-[20px] hover:text-gray-600">
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
            <p className="text-2xl font-semibold">Your wishlist is empty ❤️</p>
            <p className="text-lg">Start adding your favorite products!</p>
          </div>
        )}
      </section>

      <Footer />
    </section>
  );
};

export default Wishlist;
