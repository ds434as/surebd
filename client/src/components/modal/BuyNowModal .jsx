import React, { useState, useEffect } from "react";
import { FaTimes, FaRegUser, FaPhone, FaMapMarkerAlt, FaCommentDots, FaTag } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import OrderConfirmation from "../../pages/OrderConfirmation";

const BuyNowModal = ({ product, quantity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [deliveryCharge, setDeliveryCharge] = useState(110);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  
  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  
  const productPrice = product.price * quantity;
  const subtotal = productPrice;
  
  // Calculate discount based on coupon type
  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    
    if (appliedCoupon.discountType === "fixed") {
      return Math.min(appliedCoupon.discountValue, subtotal);
    } else if (appliedCoupon.discountType === "percentage") {
      const discount = subtotal * (appliedCoupon.discountValue / 100);
      return appliedCoupon.maxDiscountAmount 
        ? Math.min(discount, appliedCoupon.maxDiscountAmount)
        : discount;
    }
    return 0;
  };
  
  const discountAmount = calculateDiscount();
  const totalBeforeDelivery = subtotal - discountAmount;
  const totalPrice = totalBeforeDelivery + deliveryCharge;

  // Validate coupon
  const validateCoupon = async () => {
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code");
      return;
    }
    
    setCouponLoading(true);
    setCouponError("");
    
    try {
      const response = await axios.get(`https://surebdbackend.arbeittechnology.com/api/coupons/${couponCode}`);
      
      if (response.data) {
        const coupon = response.data;
        
        // Check if coupon is active
        if (!coupon.isActive) {
          setCouponError("This coupon is not active");
          return;
        }
        
        // Check if coupon has expired
        const now = new Date();
        const startDate = new Date(coupon.startDate);
        const endDate = new Date(coupon.endDate);
        
        if (now < startDate) {
          setCouponError("This coupon is not valid yet");
          return;
        }
        
        if (now > endDate) {
          setCouponError("This coupon has expired");
          return;
        }
        
        // Check minimum order amount
        if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
          setCouponError(`Minimum order amount is ${coupon.minOrderAmount}`);
          return;
        }
        
        // Check max uses
        if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
          setCouponError("This coupon has reached its usage limit");
          return;
        }
        
        // If all validations pass
        setAppliedCoupon(coupon);
        toast.success("Coupon applied successfully!");
      } else {
        setCouponError("Invalid coupon code");
      }
    } catch (error) {
      console.error("Coupon validation error:", error);
      setCouponError(error.response?.data?.message || "Failed to validate coupon");
    } finally {
      setCouponLoading(false);
    }
  };

  // Remove coupon
  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  // Form validation
  const validateForm = () => {
    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return false;
    }
    if (!phone.trim() || !/^\d{11}$/.test(phone)) {
      toast.error("সঠিক ১১ ডিজিটের ফোন নম্বর লিখুন");
      return false;
    }
    if (!address.trim()) {
      toast.error("আপনার ঠিকানা লিখুন");
      return false;
    }
    return true;
  };

  // Handle Order Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const orderData = {
      customerName: name,
      phoneNumber: phone,
      address,
      notes: comment,
      product: {
        name: product.productName,
        price: product.price,
        quantity,
        image: product?.images[0] || "",
      },
      deliveryOption: deliveryCharge === 110 ? "ঢাকা সিটির বাইরে" : "ঢাকা সিটির মধ্যে",
      deliveryCharge,
      totalAmount: totalPrice,
      coupon: appliedCoupon ? {
        code: appliedCoupon.code,
        discountAmount: discountAmount,
        discountType: appliedCoupon.discountType
      } : null
    };

    try {
      const response = await axios.post(`https://surebdbackend.arbeittechnology.com/user/create-order`, orderData);
      toast.success("অর্ডার সফল হয়েছে!");
      setOrderDetails(response.data.order);
      setIsConfirmationOpen(true); 
      
      // Reset form
      setName("");
      setPhone("");
      setAddress("");
      setComment("");
      setDeliveryCharge(110);
      setCouponCode("");
      setAppliedCoupon(null);
      
    } catch (error) {
      console.error("Order Error:", error);
      toast.error("অর্ডার করতে ব্যর্থ হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Toaster />
      <button
        className="w-full py-3 bg-green-600 text-white text-sm md:text-base font-semibold rounded-md shadow-lg hover:bg-green-700"
        onClick={() => setIsOpen(true)}
      >
        Buy Now
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <div className="bg-white w-[95%] sm:w-[90%] md:w-[70%] lg:w-[50%] rounded-lg shadow-lg p-4 md:p-5 relative max-h-[90vh] overflow-y-auto">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setIsOpen(false)}>
              <FaTimes size={18} />
            </button>

            <h2 className="text-sm md:text-lg font-semibold text-center mb-2 md:mb-3 text-gray-700">
              ক্যাশ অন ডেলিভারির অর্ডার করতে আপনার তথ্য দিন
            </h2>

            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center border p-2 md:p-3 rounded-md bg-gray-100">
                <FaRegUser className="text-gray-500 mr-2" />
                <input type="text" placeholder="আপনার নাম" className="w-full bg-transparent outline-none text-sm" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="flex items-center border p-2 md:p-3 rounded-md bg-gray-100">
                <FaPhone className="text-gray-500 mr-2" />
                <input type="text" placeholder="ফোন নম্বর" className="w-full bg-transparent outline-none text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="flex items-center border p-2 md:p-3 rounded-md bg-gray-100">
                <FaMapMarkerAlt className="text-gray-500 mr-2" />
                <input type="text" placeholder="এড্রেস (থানা + জেলা) লিখুন" className="w-full bg-transparent outline-none text-sm" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>

            <div className="flex items-center my-3 md:my-4 border-b pb-2">
              <img src={`https://surebdbackend.arbeittechnology.com/images/${product?.images[0]}`} alt="Product" className="w-10 h-10 md:w-12 md:h-12 rounded mr-2 md:mr-3" />
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm md:text-base">{product?.productName}</p>
                <div className="flex items-center gap-1 md:gap-2 text-gray-600 text-sm">
                  <span>{product?.price}.00Tk</span>
                  <IoCloseOutline />
                  <span>{quantity} PCS</span>
                </div>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="mb-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center border p-2 rounded-md bg-gray-100">
                  <FaTag className="text-gray-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="w-full bg-transparent outline-none text-sm"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    disabled={appliedCoupon}
                  />
                </div>
                {appliedCoupon ? (
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="bg-red-500 text-white px-3 py-2 rounded-md text-sm"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={validateCoupon}
                    disabled={couponLoading}
                    className="bg-[#eb3b5a] text-white px-3 py-2 rounded-md text-sm"
                  >
                    {couponLoading ? "Applying..." : "Apply"}
                  </button>
                )}
              </div>
              {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
              {appliedCoupon && (
                <p className="text-green-600 text-xs mt-1">
                  Coupon applied: {appliedCoupon.code} ({appliedCoupon.discountType === 'fixed' ? 
                  `৳${appliedCoupon.discountValue} off` : 
                  `${appliedCoupon.discountValue}% off`})
                </p>
              )}
            </div>

            <p className="font-semibold text-gray-700 text-sm md:text-base">ডেলিভারি চার্জ সিলেক্ট করুন..</p>
            <div className="space-y-2 mt-2">
              <label className="flex items-center space-x-2 border p-2 md:p-3 rounded-md bg-gray-100 cursor-pointer text-sm">
                <input type="radio" name="delivery" checked={deliveryCharge === 110} onChange={() => setDeliveryCharge(110)} />
                <span>ঢাকা সিটির বাইরে - 110.00Tk</span>
              </label>
              <label className="flex items-center space-x-2 border p-2 md:p-3 rounded-md bg-gray-100 cursor-pointer text-sm">
                <input type="radio" name="delivery" checked={deliveryCharge === 65} onChange={() => setDeliveryCharge(65)} />
                <span>ঢাকা সিটির মধ্যে - 65.00Tk</span>
              </label>
            </div>

            <div className="mt-3 md:mt-4 border-t pt-2 text-xs md:text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>{subtotal}.00Tk</span>
              </div>
              
              {appliedCoupon && (
                <div className="flex justify-between text-gray-700">
                  <span>Discount ({appliedCoupon.discountType === 'fixed' ? 
                    `৳${appliedCoupon.discountValue} off` : 
                    `${appliedCoupon.discountValue}% off`})</span>
                  <span className="text-green-600">-{discountAmount}.00Tk</span>
                </div>
              )}
              
              <div className="flex justify-between text-gray-700">
                <span>Delivery charge</span>
                <span>{deliveryCharge}.00Tk</span>
              </div>
              <div className="flex justify-between font-semibold text-sm md:text-lg mt-2 text-gray-800">
                <span>Total</span>
                <span>{totalPrice}.00Tk</span>
              </div>
            </div>

            <div className="flex items-center border p-2 md:p-3 rounded-md mt-2 md:mt-3 bg-gray-100">
              <FaCommentDots className="text-gray-500 mr-2" />
              <input type="text" placeholder="কোনো মন্তব্য থাকলে লিখুন..." className="w-full bg-transparent outline-none text-sm" value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>

            <OrderConfirmation 
              isOpen={isConfirmationOpen} 
              onClose={() => setIsConfirmationOpen(false)} 
              order={orderDetails} 
            />
            
            <button 
              type="submit" 
              className="w-full bg-green-500 text-white py-2 md:py-3 rounded-md mt-3 md:mt-4 font-semibold text-sm md:text-base" 
              disabled={loading}
            >
              {loading ? "অর্ডার হচ্ছে..." : "Complete your order"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BuyNowModal;