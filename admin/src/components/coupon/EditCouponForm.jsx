import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaPercentage, 
  FaDollarSign, 
  FaCalendarAlt, 
  FaTag,
  FaArrowLeft
} from 'react-icons/fa';
import { RiCoupon3Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import moment from 'moment';

const EditCouponForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
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
    applicableProducts: []
  });

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const { data } = await axios.get(`/api/coupons/${id}`);
        
        // Format dates for datetime-local input
        const formattedData = {
          ...data,
          startDate: moment(data.startDate).format('YYYY-MM-DDTHH:mm'),
          endDate: moment(data.endDate).format('YYYY-MM-DDTHH:mm')
        };
        
        setCouponData(formattedData);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load coupon');
        navigate('/coupons');
      } finally {
        setLoading(false);
      }
    };

    fetchCoupon();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCouponData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      await axios.put(`/api/coupons/${id}`, couponData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      toast.success('Coupon updated successfully!');
      navigate('/coupons');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update coupon');
      console.error('Error updating coupon:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <button
        onClick={() => navigate('/coupons')}
        className="flex items-center text-purple-600 hover:text-purple-800 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back to Coupons
      </button>

      <div className="flex items-center mb-6">
        <RiCoupon3Line className="text-2xl text-purple-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Edit Coupon</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coupon Code */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Coupon Code <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaTag className="text-gray-400" />
              </div>
              <input
                type="text"
                name="code"
                value={couponData.code}
                onChange={handleChange}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="SUMMER25"
                required
                disabled={couponData.currentUses > 0}
              />
            </div>
            {couponData.currentUses > 0 && (
              <p className="mt-1 text-sm text-gray-500">
                Cannot change code after coupon has been used
              </p>
            )}
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount Type <span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <select
                name="discountType"
                value={couponData.discountType}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
          </div>

          {/* Discount Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {couponData.discountType === 'percentage' ? 'Discount Percentage' : 'Discount Amount'} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {couponData.discountType === 'percentage' ? (
                  <FaPercentage className="text-gray-400" />
                ) : (
                  <FaDollarSign className="text-gray-400" />
                )}
              </div>
              <input
                type="number"
                name="discountValue"
                value={couponData.discountValue}
                onChange={handleChange}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder={couponData.discountType === 'percentage' ? '10' : '50'}
                min="0"
                required
              />
            </div>
          </div>

          {/* Minimum Order Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Order Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaDollarSign className="text-gray-400" />
              </div>
              <input
                type="number"
                name="minOrderAmount"
                value={couponData.minOrderAmount}
                onChange={handleChange}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Max Discount Amount (only for percentage) */}
          {couponData.discountType === 'percentage' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Discount Amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="maxDiscountAmount"
                  value={couponData.maxDiscountAmount}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="No limit"
                  min="0"
                />
              </div>
            </div>
          )}

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="datetime-local"
                name="startDate"
                value={couponData.startDate}
                onChange={handleChange}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaCalendarAlt className="text-gray-400" />
              </div>
              <input
                type="datetime-local"
                name="endDate"
                value={couponData.endDate}
                onChange={handleChange}
                className="pl-10 w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          {/* Max Uses */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Uses
            </label>
            <input
              type="number"
              name="maxUses"
              value={couponData.maxUses}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              placeholder="No limit"
              min="0"
            />
            {couponData.maxUses && (
              <p className="mt-1 text-sm text-gray-500">
                Current uses: {couponData.currentUses || 0}
              </p>
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={couponData.isActive}
              onChange={handleChange}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Active Coupon
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/coupons')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={updating}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updating ? 'Updating...' : 'Update Coupon'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCouponForm;