import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FaPercentage,
  FaDollarSign,
  FaCalendarAlt,
  FaTag,
} from 'react-icons/fa';
import { RiCoupon3Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Header from '../common/Header';

const CreateCouponForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const admin_info=JSON.parse(localStorage.getItem("admin"));
  const [couponData, setCouponData] = useState({
    code: '',
    discountType: 'percentage',
    discountValue: '',
    minOrderAmount: '',
    maxDiscountAmount: '',
    startDate: '',
    endDate: '',
    maxUses: '',
    isActive: true,
    applicableCategories: [],
    applicableProducts: [],
    admin_id:admin_info._id
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCouponData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('https://surebdbackend.arbeittechnology.com/api/coupons', couponData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success('Coupon created successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create coupon');
      console.error('Error creating coupon:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-full font-baji'>
             <Header/>
             <div className="max-w-4xl mx-auto p-8 bg-white text-gray-700 rounded-xl shadow-sm border-[1px] border-gray-300 mt-[40px]">
      <div className="flex items-center gap-2 mb-6">
        <RiCoupon3Line className="text-3xl text-purple-600" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Create New Coupon
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coupon Code */}
          <div className="col-span-2">
            <label htmlFor="code" className="form-label">
              Coupon Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaTag className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                id="code"
                name="code"
                value={couponData.code}
                onChange={handleChange}
                className="form-input pl-10 outline-green-500 p-[10px] border-[1px] border-gray-300 rounded-[5px]"
                placeholder="SUMMER25"
                required
              />
            </div>
          </div>

          {/* Discount Type */}
          <div>
            <label htmlFor="discountType" className="form-label">
              Discount Type <span className="text-red-500">*</span>
            </label>
            <select
              id="discountType"
              name="discountType"
              value={couponData.discountType}
              onChange={handleChange}
              className="form-input p-[10px] border-[1px] border-gray-300 rounded-[5px]"
              required
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>

          {/* Discount Value */}
          <div>
            <label htmlFor="discountValue" className="form-label">
              {couponData.discountType === 'percentage'
                ? 'Discount Percentage'
                : 'Discount Amount'}{' '}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              {couponData.discountType === 'percentage' ? (
                <FaPercentage className="absolute left-3 top-3 text-gray-400" />
              ) : (
                <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
              )}
              <input
                type="number"
                id="discountValue"
                name="discountValue"
                value={couponData.discountValue}
                onChange={handleChange}
                className="form-input pl-10 p-[10px] border-[1px] border-gray-300 rounded-[5px]"
                placeholder={
                  couponData.discountType === 'percentage' ? '10' : '50'
                }
                min="0"
                required
              />
            </div>
          </div>

          {/* Minimum Order Amount */}
          <div>
            <label htmlFor="minOrderAmount" className="form-label">
              Minimum Order Amount
            </label>
            <div className="relative">
              <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                id="minOrderAmount"
                name="minOrderAmount"
                value={couponData.minOrderAmount}
                onChange={handleChange}
                className="form-input pl-10 p-[10px] border-[1px] border-gray-300 rounded-[5px]"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Max Discount Amount */}
          {couponData.discountType === 'percentage' && (
            <div>
              <label htmlFor="maxDiscountAmount" className="form-label">
                Maximum Discount Amount
              </label>
              <div className="relative">
                <FaDollarSign className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  id="maxDiscountAmount"
                  name="maxDiscountAmount"
                  value={couponData.maxDiscountAmount}
                  onChange={handleChange}
                  className="form-input pl-10 p-[10px] border-[1px] border-gray-300 rounded-[5px]"
                  placeholder="No limit"
                  min="0"
                />
              </div>
            </div>
          )}

          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="form-label">
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={couponData.startDate}
                onChange={handleChange}
                className="form-input pl-10 p-[10px] border-[1px] border-gray-300 rounded-[5px]"
                required
              />
            </div>
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="form-label">
              End Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={couponData.endDate}
                onChange={handleChange}
                className="form-input pl-10 p-[10px] border-[1px] border-gray-300 rounded-[5px]"
                required
              />
            </div>
          </div>

          {/* Max Uses */}
          <div>
            <label htmlFor="maxUses" className="form-label">
              Maximum Uses
            </label>
            <input
              type="number"
              id="maxUses"
              name="maxUses"
              value={couponData.maxUses}
              onChange={handleChange}
              className="form-input p-[10px] border-[1px] border-gray-300 rounded-[5px]"
              placeholder="No limit"
              min="0"
            />
          </div>

          {/* Active */}
          <div className="flex items-center mt-6">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={couponData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 p-[10px] border-[1px] border-gray-300 rounded-[5px]"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Active Coupon
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6">
   
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#eb3b5a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Coupon'}
          </button>
        </div>
      </form>
    </div>
    </section>
  );
};

export default CreateCouponForm;
