import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import Footer from '../components/Footer';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [billingNumber, setBillingNumber] = useState('');
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!billingNumber) {
      setError('Billing Number is required.');
      return;
    }

    setError('');
    setLoading(true);
    setShowPopup(false);
    setOrderData([]);

    try {
      const res = await axios.post(`https://surebdbackend.arbeittechnology.com/user/track-my-order`, {
        billingNumber,
      });

      console.log(res);

      if (res.data.success && res.data.data) {
        setOrderData(res.data.data); // Make sure it's an array
        setShowPopup(true);
      } else {
        setError('Order not found. Please check your input.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='w-full font-baji '>
      <Header />
      <div className='flex flex-col items-center justify-center h-auto py-[100px] p-6'>
        <h2 className='text-[25px] lg:text-[36px] font-bold text-center mb-[12px]'>Track Your Order</h2>
        <p className='text-gray-600 text-center mb-[40px] w-[90%] md:w-[60%] lg:w-[40%]'>
          To track your order please enter your Billing Number below and
          press the "Track" button.
        </p>
        <div className='py-[50px] px-[50px] rounded-lg shadow-md w-full md:w-[80%] lg:w-[70%] xl:w-[40%] bg-gray-100'>
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
              {error}
            </div>
          )}

          <label className='block text-gray-700 font-semibold mb-2'>Billing Number</label>
          <input
            type='text'
            value={billingNumber}
            onChange={(e) => setBillingNumber(e.target.value)}
            className='w-full px-4 py-2 border rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <button
            onClick={handleTrack}
            disabled={loading}
            className='w-full bg-[#eb3b5a] text-white py-[10px] rounded-md hover:bg-green-500 transition'
          >
            {loading ? 'Tracking...' : 'TRACK'}
          </button>
        </div>
      </div>
      <Footer />

      {showPopup && Array.isArray(orderData) && orderData.length > 0 && (
     <div className='fixed inset-0 flex items-center justify-center  no-scrollbar bg-black bg-opacity-50 z-50 overflow-auto p-4'>
    <div className='space-y-8 max-h-[100vh] py-[40px] overflow-y-auto w-full no-scrollbar'>
            {orderData.map((order, index) => (
              <div
                key={index}
                className='bg-gradient-to-br from-indigo-100 to-white p-6 rounded-2xl shadow-2xl w-[90%] max-w-[550px] border border-indigo-300 mx-auto'
              >
                <h3 className='text-2xl font-bold text-indigo-700 mb-6 text-center'>📦 Order Summary</h3>

                <div className='space-y-3 text-gray-700 text-[15px]'>
                  <p><span className='font-semibold text-indigo-600'>Customer:</span> {order.customerName}</p>
                  <p><span className='font-semibold text-indigo-600'>Phone:</span> {order.phoneNumber}</p>
                  <p><span className='font-semibold text-indigo-600'>Address:</span> {order.address}</p>
                  <p><span className='font-semibold text-indigo-600'>Product:</span> {order.product?.name}</p>
                  <p><span className='font-semibold text-indigo-600'>Price:</span> ৳{order.product?.price}</p>
                  <p><span className='font-semibold text-indigo-600'>Quantity:</span> {order.product?.quantity}</p>
                  <p><span className='font-semibold text-indigo-600'>Delivery Option:</span> {order.deliveryOption}</p>
                  <p><span className='font-semibold text-indigo-600'>Total Amount:</span> <span className='text-green-600 font-bold'>৳{order.totalAmount}</span></p>
                  <p><span className='font-semibold text-indigo-600'>Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded text-white text-sm font-semibold ${
                      order.status === 'Pending' ? 'bg-yellow-500' :
                      order.status === 'Completed' ? 'bg-green-600' :
                      'bg-[#eb3b5a]'
                    }`}>
                      {order.status}
                    </span>
                  </p>
                  <p><span className='font-semibold text-indigo-600'>Invoice ID:</span> {order.invoiceId}</p>
                  <p><span className='font-semibold text-indigo-600'>Created At:</span> {new Date(order.createdAt).toLocaleString()}</p>
                </div>

                <div className='text-center mt-6'>
                  <button
                    onClick={() => setShowPopup(false)}
                    className='bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg shadow-sm transition duration-300'
                  >
                    Close
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TrackOrder;
