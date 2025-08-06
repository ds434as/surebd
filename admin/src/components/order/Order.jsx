import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import moment from "moment";
import Header from "../common/Header";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-blue-100 text-blue-700 border-[#eb3b5a]";
      case "ready to ship":
        return "bg-orange-100 text-orange-700 border-orange-500";
      case "shipping":
        return "bg-blue-100 text-blue-700 border-blue-500";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-500";
      case "canceled":
        return "bg-red-100 text-red-700 border-red-500";
      default:
        return "bg-gray-100 text-gray-700 border-gray-500";
    }
  };

  const fetchOrders = () => {
    axios
      .get("https://surebdbackend.arbeittechnology.com/admin/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    axios
      .put(`https://surebdbackend.arbeittechnology.com/admin/orders/${orderId}`, { status: newStatus })
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://surebdbackend.arbeittechnology.com/admin/orders/${id}`)
          .then(() => {
            setOrders((prev) => prev.filter((order) => order._id !== id));
            Swal.fire("Deleted!", "The order has been deleted.", "success");
          })
          .catch((error) => {
            Swal.fire("Error!", "Failed to delete the order.", "error");
            console.error("Delete error:", error);
          });
      }
    });
  };

  const filteredOrders = orders.filter((order) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      order.customerName.toLowerCase().includes(searchLower) ||
      order.phoneNumber.toLowerCase().includes(searchLower) ||
      order.invoiceId.toLowerCase().includes(searchLower) ||
      order.address.toLowerCase().includes(searchLower) ||
      order.product.name.toLowerCase().includes(searchLower) ||
      order.totalAmount.toString().includes(searchLower) ||
      order.status.toLowerCase().includes(searchLower) ||
      moment(order.createdAt).format("MMMM Do YYYY, h:mm A").toLowerCase().includes(searchLower)
    );
  });

  return (
  <div className="w-full font-baji overflow-y-auto p-2 sm:p-4">
      <section>
        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
              All Orders
            </h1>

            <div className="relative w-full sm:w-[30%]">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-full inline-block align-middle">
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#4634FF]">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Invoice ID
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden sm:table-cell"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden md:table-cell"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Product
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Total
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden lg:table-cell"
                      >
                        Change Status
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden xl:table-cell"
                      >
                        Ordered At
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredOrders.map((order, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.invoiceId}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden sm:table-cell">
                          <div>
                            <strong>{order.customerName}</strong>
                            <br />
                            <span className="text-gray-600 text-xs">
                              {order.address}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden md:table-cell">
                          {order.phoneNumber}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            {order.product.name}
                            <br />
                            <span className="text-gray-600 text-xs">
                              ৳{order.product.price} x {order.product.quantity}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                          ৳{order.totalAmount}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden lg:table-cell">
                          <select
                            className={`px-2 py-1 border rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 ${getStatusColor(
                              order?.status
                            )}`}
                            value={order?.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                          >
                            <option value="processing">Processing</option>
                            <option value="ready to ship">Ready to ship</option>
                            <option value="shipping">Shipping</option>
                            <option value="delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 hidden xl:table-cell">
                          <div>
                            {moment(order.createdAt).format("MMMM Do YYYY")}
                            <br />
                            <span className="text-gray-600 text-xs">
                              {moment(order.createdAt).fromNow()}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex space-x-2">
                            <NavLink to={`/order-details/${order._id}`}>
                              <button className="flex items-center border border-[#eb3b5a] px-2 py-1 rounded text-[#eb3b5a] hover:text-green-500 text-xs sm:text-sm">
                                <AiOutlineEdit className="mr-1" /> Details
                              </button>
                            </NavLink>
                            <button
                              className="flex items-center text-red-500 hover:text-red-600 border border-red-600 px-2 py-1 rounded text-xs sm:text-sm"
                              onClick={() => handleDelete(order._id)}
                            >
                              <AiOutlineDelete className="mr-1" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No orders found.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Order;