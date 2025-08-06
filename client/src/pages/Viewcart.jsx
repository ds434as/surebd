import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { FaTrashAlt } from "react-icons/fa";
import Footer from '../components/Footer';
import AuthModal from './AuthModal';


const Viewcart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  // Load cart data from localStorage when component mounts
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setProducts(cartData);
  }, []);

  // Handle quantity change
  const handleQuantityChange = (productId, type) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.productId === productId
          ? {
              ...product,
              quantity: type === "increase" 
                ? product.quantity + 1 
                : Math.max(1, product.quantity - 1)
            }
          : product
      )
    );
  };

  // Handle product removal
  const handleRemoveProduct = (productId) => {
    const updatedCart = products.filter(product => product.productId !== productId);
    setProducts(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Update total price whenever products change
  useEffect(() => {
    const total = products.reduce(
      (acc, product) => acc + parseFloat(product.price) * product.quantity,
      0
    );
    setTotalPrice(total);
    
    // Update localStorage whenever products change
    localStorage.setItem('cart', JSON.stringify(products));
  }, [products]);

  // Update shipping fee
  const handleShippingChange = (fee) => {
    setShippingFee(fee);
  };

  // Handle checkout button click
  const handleCheckout = () => {
    setModalOpen(true);
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
            <li>Cart</li>
          </ul>
        </div>
      </section>

      {/* Cart Section */}
      <section className='px-[150px] py-[70px]'>
        <div className="container mx-auto mt-10 px-4 lg:px-0">
          {/* Free Shipping Message */}
          {products.length > 0 && (
            <div className="text-green-600 text-[18px] font-medium mb-6 flex items-center gap-2">
              <span>Congratulations! You've got</span>
              <span className="font-bold">FREE SHIPPING</span>
              <span className="text-[20px]">🚚</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Table */}
            <div className="lg:col-span-2">
              {products.length === 0 ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-bold">Your cart is empty</h3>
                  <p className="text-gray-600">Start shopping to add items to your cart</p>
                </div>
              ) : (
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
                        <tr key={product.productId} className="border-b">
                          <td className="px-4 py-[20px] flex items-center space-x-4">
                            <img
                              src={`https://surebdbackend.arbeittechnology.com/images/${product.image}`}
                              alt={product.name}
                              className="w-[80px] border-[1px] border-[#eee] h-[80px] rounded-md object-cover"
                            />
                            <div>
                              <span className="text-gray-700 text-[18px] font-bold block">
                                {product.name}
                              </span>
                              <span className="text-gray-500 text-sm">
                                Color: {product.color}, Size: {product.size}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-[500] text-gray-700 text-[18px]">
                            ৳{product.price}
                          </td>
                          <td className="px-4 py-3 font-[500] text-gray-700 text-[18px]">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handleQuantityChange(product.productId, "decrease")}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="text-[18px] font-medium">{product.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(product.productId, "increase")}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-[500] text-gray-700 text-[18px]">
                            ৳{(product.price * product.quantity).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button 
                              onClick={() => handleRemoveProduct(product.productId)}
                              className="text-gray-400 text-[20px] hover:text-red-500"
                            >
                              <FaTrashAlt />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Cart Totals - Only show if there are products */}
            {products.length > 0 && (
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
                  <button 
                    onClick={handleCheckout}
                    className="w-full mt-4 px-4 py-2 bg-[#eb3b5a] text-white rounded hover:bg-green-500"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Auth Modal */}
      <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default Viewcart;