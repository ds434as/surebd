import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import Header from "../components/common/Header";

const Newsletter = () => {
  const [newsletterList, setNewsletterList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch newsletter data
  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const res = await axios.get("https://surebdbackend.arbeittechnology.com/admin/newsletter");
        setNewsletterList(res.data.newsletters || []);
      } catch (err) {
        console.error("Failed to fetch newsletters:", err);
      }
    };

    fetchNewsletters();
  }, []);

  // Filter emails by search
  const filteredEmails = newsletterList.filter((emailObj) =>
    emailObj.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Optional: Delete handler (if API supports it)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://surebdbackend.arbeittechnology.com/admin/newsletter/${id}`);
      setNewsletterList(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Failed to delete email:", err);
    }
  };

  return (
    <div className="w-full font-baji overflow-y-auto">
      <section className="">
        <div className="">
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2 sm:mb-0'>
                All Newsletter Emails
              </h1>

              <div className="relative w-[30%]">
                <input
                  type="text"
                  placeholder="Search by email..."
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
                  <tr className="bg-[#4634FF] text-white">
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Subscribed At</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmails.map((item, index) => (
                    <tr key={index} className="border-b even:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800">{item.email}</td>
                      <td className="py-3 px-4 text-gray-800">
                        {moment(item.createdAt).format("MMMM Do YYYY, h:mm A")}
                        <br />
                        <span className="text-gray-500 text-sm">
                          {moment(item.createdAt).fromNow()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="flex items-center text-red-500 hover:text-red-600 border border-red-600 px-[10px] py-[4px] rounded-[5px]"
                        >
                          <AiOutlineDelete className="mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredEmails.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No emails found.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
