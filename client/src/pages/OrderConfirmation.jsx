import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"
const OrderConfirmation = ({ isOpen, onClose, order }) => {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 flex items-center h-[100vh] justify-center z-[100] bg-white px-4 overflow-y-auto">
      {showConfetti && (
  <div className="fixed inset-0 z-[101] pointer-events-none">
  </div>
)}
    <Confetti width={width} height={height} />

    <div className="bg-white p-2 sm:p-6 z-[1] md:py-[50px] w-full max-w-[100%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] xl:max-w-[55%] m-auto h-auto relative rounded-lg">

  
      {/* Close Button */}
      <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900">
        <FaTimes size={18} />
      </button>
  
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-3">
          <div className="flex items-center space-x-2">
            <FaCheckCircle className="text-green-500 text-xl sm:text-2xl" />
            <div>
              <p className=" text-[20px] sm:text-[22px] text-green-500">Invoice ID: <strong>{order.invoiceId}</strong></p>
              <h2 className="text-base sm:text-lg font-semibold">Thank you, {order.customerName}!</h2>
              <p className="text-gray-500 text-xs sm:text-sm">Your order has been placed successfully. We will contact you soon!</p>
            </div>
          </div>
  
          {/* Address */}
          <div className="mt-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
            <p className="text-gray-700 text-sm sm:text-base font-semibold">Shipping Address</p>
            <p className="text-gray-600 text-xs sm:text-sm">{order.address}</p>
          </div>
  
          {/* Google Map Embed */}
          <div className="mt-4">
            <iframe
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] rounded-lg border"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.83187894154!2d90.33728812288355!3d23.780975728197344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2z4Kai4Ka-4KaV4Ka-!5e0!3m2!1sbn!2sbd!4v1740566089537!5m2!1sbn!2sbd"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
  
        {/* Right Section */}
        <div className="w-full lg:w-1/2 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex justify-center items-center gap-[5px]">
            <img src={logo} alt="Store Logo" className="w-10 sm:w-20" />
            <h1>Tech10</h1>
          </div>
  
          {/* Product Details */}
          <div className="mt-3 flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
            <img src={`https://surebdbackend.arbeittechnology.com/images/${order.product?.image}`} alt={order.product.name} className="w-14 h-14 rounded-lg border border-gray-300" />
            <div>
              <p className="text-gray-700 text-sm sm:text-base font-semibold">{order.product.name}</p>
              <p className="text-gray-500 text-xs sm:text-sm">৳{order.product.price.toFixed(2)}</p>
              <p className="text-gray-500 text-xs sm:text-sm">Quantity: {order.product.quantity}</p>
            </div>
          </div>
  
          {/* Order Summary */}
          <div className="mt-3 border-t pt-3">
            <div className="flex justify-between text-gray-600 text-xs sm:text-sm">
              <p>Subtotal</p>
              <p>৳{(order.product.price * order.product.quantity).toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-gray-600 text-xs sm:text-sm">
              <p>Shipping</p>
              <p>৳{order.deliveryCharge.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-semibold text-sm sm:text-lg mt-2">
              <p>Total</p>
              <p>৳{order.totalAmount.toFixed(2)}</p>
            </div>
          </div>
  
          {/* Back to Shop Button */}
          <div className="mt-4 text-center">
            <div
              onClick={() => navigate("/products")}
              className="bg-indigo-600 cursor-pointer text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base hover:bg-indigo-700 transition"
            >
              Back to Shop
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default OrderConfirmation;
