import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import AuthModal from '../../pages/AuthModal';

const Description = ({ data }) => {
  const [activeTab, setActiveTab] = useState('description');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    name: '',
    comment: '',
    rating: 0,
  });
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`https://surebdbackend.arbeittechnology.com/admin/review/${data._id}`);
      setReviews(res.data);
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    }
  };

  useEffect(() => {
    if (data?._id) {
      fetchReviews();
    }
  }, [data]);

  const handleRating = (ratingValue) => {
    setNewReview((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      setModalOpen(true); // Show the auth modal when not logged in
      return;
    }
  
    const user = JSON.parse(storedUser);
    if (!newReview.name || !newReview.comment || newReview.rating === 0) {
      toast.error('Please fill in all review fields');
      return;
    }
  
    try {
      const payload = {
        product_id: data._id,
        user_id: user._id,
        name: newReview.name,
        comment: newReview.comment,
        rating: newReview.rating,
      };
  
      await axios.post('https://surebdbackend.arbeittechnology.com/admin/review/add', payload);
      setNewReview({ name: '', comment: '', rating: 0 });
      toast.success('Review submitted successfully');
      fetchReviews();
    } catch (err) {
      console.error('Failed to submit review', err);
      toast.error('Failed to submit review');
    }
  };

  return (
    <div className="w-full mt-10 px-4 lg:px-10 xl:px-[80px] 2xl:px-[250px] py-[20px]">
      <Toaster/>
      {/* Auth Modal */}
      <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6 space-x-6">
        {['description', 'additional', 'reviews'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-lg capitalize focus:outline-none ${
              activeTab === tab
                ? 'border-b-2 border-black font-semibold text-black'
                : 'text-gray-500'
            }`}
          >
            {tab === 'description' && 'Description'}
            {tab === 'reviews' && `Reviews (${reviews.length})`}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="text-gray-700 leading-relaxed">
        {activeTab === 'description' && (
          <div>
            <h2 className="text-xl font-semibold mb-2">{data?.productName}</h2>
            <p className="mb-2 text-sm text-brand_color">{data?.category}</p>
            <p>{data?.description}</p>
          </div>
        )}

        {activeTab === 'additional' && (
          <div>
            <ul className="list-disc pl-5 space-y-1">
              <li>Dimensions: 247.6 x 178.5 x 6.1 mm</li>
              <li>Weight: 460 grams</li>
              <li>OS: iPadOS</li>
              <li>Display: 10.9 inches Liquid Retina</li>
            </ul>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Existing reviews */}
            <div className="space-y-4">
              {reviews.map((review, idx) => (
                <div key={idx} className="border p-4 rounded-md bg-gray-50">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Review form */}
            <form
              onSubmit={handleSubmit}
              className="border-t pt-6 mt-6 space-y-4"
            >
              <h3 className="text-lg font-semibold">Add a Review</h3>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border px-4 py-2 rounded-md"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
              <textarea
                placeholder="Your Review"
                className="w-full border px-4 py-2 rounded-md"
                rows="3"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview((prev) => ({ ...prev, comment: e.target.value }))
                }
                required
              />

              {/* Star rating */}
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((val) => (
                  <FaStar
                    key={val}
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                      newReview.rating >= val ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => handleRating(val)}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;