import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import axios from "axios";
import moment from "moment";
import Header from '../components/common/Header';
import Swal from 'sweetalert2';
import { FaWhatsapp } from "react-icons/fa";
const Activeuser = () => {
  const [active_users, set_activeusers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const active_user_info = () => {
    axios.get(`https://surebdbackend.arbeittechnology.com/admin/users`)
      .then((res) => {
        set_activeusers(res.data.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    active_user_info();
  }, []);

  const filterusers = active_users.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "User will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://surebdbackend.arbeittechnology.com/admin/users/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            active_user_info();
          }).catch((err) => {
            console.log(err);
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const handleEdit = (user) => {
    setSelectedUser({ ...user });
    setModalOpen(true);
  };

  const handleUpdate = () => {
    axios.put(`https://surebdbackend.arbeittechnology.com/admin/users/${selectedUser._id}`, selectedUser)
      .then(() => {
        Swal.fire("Success!", "User updated successfully.", "success");
        setModalOpen(false);
        active_user_info();
      }).catch((err) => {
        console.log(err);
        Swal.fire("Error!", "Failed to update user.", "error");
      });
  };

  return (
    <div className="w-full font-baji">
      <section className="">
        <div className="">
          <div className="w-full ">
            <div className="flex justify-between items-center mb-4">
              <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2 sm:mb-0'>Active Users</h1>

              <div className="relative w-[30%]">
                <input
                  type="text"
                  placeholder="Search..."
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
                   <th className='px-6 py-3 text-left text-[14px] font-[700] md:text-[16px] md:font-medium  uppercase tracking-wider'>User</th>
                     <th className='px-6 py-3 text-left text-[14px] font-[700] md:text-[16px] md:font-medium uppercase tracking-wider'>Email</th>
                      <th className='px-6 py-3 text-left text-[14px] font-[700] md:text-[16px] md:font-medium uppercase tracking-wider'>Whatsapp Number</th>
                     <th className='px-6 py-3 text-left text-[14px] font-[700] md:text-[16px] md:font-medium uppercase tracking-wider'>Joined At</th>
                     <th className='px-6 py-3 text-left text-[14px] font-[700] md:text-[16px] md:font-medium uppercase tracking-wider'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterusers.length > 0 ? (
                    filterusers.map((user, index) => (
                      <tr key={index} className="border-b even:bg-gray-50">
                        <td className="py-3 px-4 text-gray-800">
                          <strong>{user?.name}</strong><br />
                          <span className="text-gray-600">{user.username}</span>
                        </td>
                        <td className="py-3 px-4 text-gray-800">
                          <span>{user.email}</span><br />
                        </td>
                      <td className="py-3 px-4 text-gray-800">
  <span className="text-gray-600 flex items-center gap-2">
    {user.phone}
    <a
      href={`https://api.whatsapp.com/send?phone=${user.phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-green-600 hover:text-green-800"
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={18} />
    </a>
  </span>
</td>
                        <td className="py-3 px-4 text-gray-800">
                          <span className='font-[600] text-[14px]'>{moment(user?.createdAt).format("MMMM Do YYYY, h:mm A")}</span><br />
                          <span className="text-gray-600">{moment(user?.createdAt).fromNow()}</span>
                        </td>
                        <td className="py-3 px-4 flex items-center space-x-2">
                          <button
                            className="flex items-center border-[1px] border-[#eb3b5a] px-[10px] py-[4px] rounded-[5px] text-[#eb3b5a] hover:text-green-500"
                            onClick={() => handleEdit(user)}
                          >
                            <AiOutlineEdit className="mr-1" /> Edit
                          </button>
                          <button
                            className="flex items-center text-red-500 hover:text-red-600 border border-red-600 px-[10px] py-[4px] rounded-[5px]"
                            onClick={() => handleDelete(user._id)}
                          >
                            <AiOutlineDelete className="mr-1" /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-gray-500">
                        No users registered.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Modal for Edit */}
            {isModalOpen && selectedUser && (
              <div className="fixed inset-0 bg-black text-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg w-[400px] p-6 shadow-lg relative">
                  <button
                    className="absolute top-2 right-3 text-xl font-bold"
                    onClick={() => setModalOpen(false)}
                  >
                    ×
                  </button>
                  <h2 className="text-xl font-semibold mb-4 text-center">Edit User</h2>
                  <div className="flex flex-col gap-4">
                  <label className="text-sm font-semibold">Name</label>
                    <input
                      type="text"
                      value={selectedUser.username}
                      onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                      placeholder="Username"
                      className="border p-2 rounded"
                    />
                    <label className="text-sm font-semibold">Email</label>
                    <input
                      type="email"
                      value={selectedUser.email}
                      placeholder="Email"
                      className="border p-2 rounded"
                    />
                    <label className="text-sm font-semibold">Mobile</label>
                    <input
                      type="text"
                      value={selectedUser.phone}
                      onChange={(e) => setSelectedUser({ ...selectedUser, mobile: e.target.value })}
                      placeholder="Mobile"
                      className="border p-2 rounded"
                    />
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  );
};

export default Activeuser;
