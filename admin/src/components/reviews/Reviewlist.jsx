import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import Header from "../common/Header";
import { NavLink } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";

const Reviewlist = () => {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("https://surebdbackend.arbeittechnology.com/admin/review/all");
      setReviews(res.data);
      console.log(res)
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch reviews.");
    }
  };

  const handleStatusChange = async (reviewId, newStatus) => {
    try {
      await axios.patch(`https://surebdbackend.arbeittechnology.com/admin/review/status/${reviewId}`, { status: newStatus });
      fetchReviews(); // Refresh data
      toast.success("Status updated");
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`https://surebdbackend.arbeittechnology.com/admin/review/delete/${reviewId}`);
      fetchReviews(); // Refresh
      toast.success("Review deleted");
    } catch (err) {
      toast.error("Failed to delete review.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReviews = reviews.filter((review) =>
    review.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full font-baji overflow-y-auto">
      <Toaster/>
      <section className="">
        <div className="">
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2 sm:mb-0'>
                All Reviews
              </h1>
              <div className="relative w-[30%]">
                <input
                  type="text"
                  placeholder="Search by Customer Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse shadow-xl bg-white border-[1px] border-[#eee] rounded-md overflow-hidden">
                <thead>
                  <tr className="bg-[#4634FF] text-white text-nowrap">
                    <th className="py-3 px-4 text-left">Customer Name</th>
                    <th className="py-3 px-4 text-left">Comment</th>
                    <th className="py-3 px-4 text-left">Rating</th>
                    <th className="py-3 px-4 text-left">Product ID</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Change Status</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReviews.map((review, index) => (
                    <tr key={index} className="border-b even:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800">{review.name}</td>
                      <td className="py-3 px-4 text-gray-800">{review.comment}</td>
                      <td className="py-3 px-4 text-gray-800">{review.rating}</td>
                      <td className="py-3 px-4 text-gray-800">{review.product_id}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(review.status)}`}>
                          {review.status || "Pending"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          className="px-3 py-1 border rounded-md focus:ring-indigo-500"
                          value={review.status || "Pending"}
                          onChange={(e) => handleStatusChange(review._id, e.target.value)}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-gray-800">
                        {moment(review.createdAt).format("MMMM Do YYYY, h:mm A")}
                        <br />
                        <span className="text-gray-600">
                          {moment(review.createdAt).fromNow()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="flex items-center text-red-500 hover:text-red-600 border border-red-600 px-[10px] py-[4px] rounded-[5px]"
                        >
                          <AiOutlineDelete className="mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredReviews.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No reviews found.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviewlist;
