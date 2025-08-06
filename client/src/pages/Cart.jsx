import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { FaTrashAlt } from "react-icons/fa";
import Footer from '../components/Footer';
import axios from 'axios';

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0); // Track the selected shipping fee
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);

  // Fetch the cart data when the component mounts
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`https://surebdbackend.arbeittechnology.com/user/cart/${userInfo?._id}`);
        if (response.data.success) {
          setProducts(response.data.cartData);
        }
      } catch (err) {
        console.error("Error fetching cart data", err);
      }
    };

    fetchCartData();
  }, []);

  // Handle the quantity change (increase or decrease)
  const handleQuantityChange = (id, type) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: type === "increase" ? product.quantity + 1 : Math.max(1, product.quantity - 1),
            }
          : product
      )
    );
  };

  // Calculate the total price dynamically
  useEffect(() => {
    const total = products.reduce(
      (acc, product) => acc + parseFloat(product.price) * product.quantity,
      0
    );
    setTotalPrice(total);
  }, [products]);

  // Update the shipping fee based on the selected option
  const handleShippingChange = (fee) => {
    setShippingFee(fee);
  };

  return (
    <section className='font-baji'>
      <Header />
      {/* Wishlist Breadcrumb */}
      <section className='px-[150px] py-[20px] bg-[#F9F9F9]'>
        <div>
          <ul className='flex justify-start items-center gap-[5px] font-[500] text-[17px]'>
            <li>Home</li>
            <li>/</li>
            <li>Wishlist</li>
          </ul>
        </div>
      </section>

      {/* Cart Section */}
      <section className='px-[150px] py-[70px]'>
        <div className="container mx-auto mt-10 px-4 lg:px-0">
          {/* Free Shipping Message */}
          <div className="text-green-600 text-[18px] font-medium mb-6 flex items-center gap-2">
            <span>Congratulations! You’ve got</span>
            <span className="font-bold">FREE SHIPPING</span>
            <span className="text-[20px]">🚚</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Table */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full border-collapse bg-white">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-[18px] font-bold text-gray-700 uppercase">
                        Product
                      </th>
                      <th className="px-4 py-3 text-left text-[18px] font-bold text-gray-700 uppercase">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-[18px] font-bold text-gray-700 uppercase">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-[18px] font-bold text-gray-700 uppercase">
                        Subtotal
                      </th>
                      <th className="px-4 py-3 text-[18px] font-bold text-gray-700 uppercase">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="px-4 py-[20px] flex items-center space-x-4">
                          <img
                               src={`https://surebdbackend.arbeittechnology.com/images/${product.image}`}
                            alt={product.title}
                            className="w-[80px] border-[1px] border-[#eee] h-[80px] rounded-md object-cover"
                          />
                          <span className="text-gray-700 text-[18px] font-bold">
                            {product.title}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-[500] text-gray-700 text-[18px]">
                        ৳{product.price}
                        </td>
                        <td className="px-4 py-3 font-[500] text-gray-700 text-[18px]">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleQuantityChange(product.id, "decrease")}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="text-[18px] font-medium">{product.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(product.id, "increase")}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-[500] text-gray-700 text-[18px]">
                        ৳{`${(parseFloat(product.price) * product.quantity).toFixed(2)}`}
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-gray-400 text-[20px] hover:text-red-500">
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Cart Totals */}
            <div>
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                <h2 className="text-[20px] font-bold mb-4">Cart Totals</h2>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-[16px] text-gray-600">Subtotal</span>
                  <span className="text-[16px] font-bold">৳{totalPrice.toFixed(2)}</span>
                </div>
                <div className="py-4 border-b border-gray-200">
                  <p className="text-[16px] text-gray-600">ডেলিভারি চার্জ সিলেক্ট করুন</p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="flat_rate"
                        name="shipping"
                        className="cursor-pointer"
                        defaultChecked
                        onChange={() => handleShippingChange(110)}
                      />
                      <label
                        htmlFor="flat_rate"
                        className="text-[16px] text-gray-600 cursor-pointer"
                      >
                       ঢাকা সিটির বাইরে - 110.00Tk
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="local_pickup"
                        name="shipping"
                        className="cursor-pointer"
                        onChange={() => handleShippingChange(65)}
                      />
                      <label
                        htmlFor="local_pickup"
                        className="text-[16px] text-gray-600 cursor-pointer"
                      >
                    ঢাকা সিটির মধ্যে - 65.00Tk
                      </label>
                    </div>
                    <p className="text-[14px] text-gray-400 mt-2">
                      Shipping options will be updated during checkout.
                    </p>
                  </div>
                </div>
                <div className="flex justify-between py-4 border-b border-gray-200">
                  <span className="text-[18px] font-bold">Total</span>
                  <span className="text-[18px] font-bold text-[#eb3b5a]">৳{(totalPrice + shippingFee).toFixed(2)}</span>
                </div>
                <button className="w-full mt-4 px-4 py-2 bg-[#eb3b5a] text-white rounded hover:bg-green-500">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </section>
  );
};

export default Cart;
