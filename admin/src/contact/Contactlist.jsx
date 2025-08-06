import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import Header from "../components/common/Header";

const Contactlist = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`https://surebdbackend.arbeittechnology.com/admin/contact`);
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this contact?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://surebdbackend.arbeittechnology.com/admin/contact/${id}`);
          toast.success("Contact deleted successfully!");
          fetchContacts();
        } catch (error) {
          toast.error("Failed to delete contact!");
        }
      }
    });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full font-baji overflow-y-auto">
      <section className="">
        <div className="">
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2 sm:mb-5'>
                All Contact Messages
              </h1>
              <div className="relative w-[30%]">
                <input
                  type="text"
                  placeholder="Search by Name..."
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
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Phone</th>
                    <th className="py-3 px-4 text-left">Subject</th>
                    <th className="py-3 px-4 text-left">Message</th>
                    <th className="py-3 px-4 text-left">Submitted At</th>
                    <th className="py-3 px-4 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact._id} className="border-b even:bg-gray-50">
                      <td className="py-3 px-4 text-gray-800">{contact.name}</td>
                      <td className="py-3 px-4 text-gray-800">{contact.email}</td>
                      <td className="py-3 px-4 text-gray-800">{contact.phone}</td>
                      <td className="py-3 px-4 text-gray-800">{contact.subject}</td>
                      <td className="py-3 px-4 text-gray-800">{contact.message}</td>
                      <td className="py-3 px-4 text-gray-800">
                        {moment(contact.createdAt).format("MMM D, YYYY h:mm A")}
                        <br />
                        <span className="text-sm text-gray-500">
                          {moment(contact.createdAt).fromNow()}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          className="flex items-center text-red-500 hover:text-red-600 border border-red-500 px-[10px] py-[4px] rounded-[5px]"
                          onClick={() => handleDelete(contact._id)}
                        >
                          <AiOutlineDelete className="mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredContacts.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  No contacts found.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contactlist;
