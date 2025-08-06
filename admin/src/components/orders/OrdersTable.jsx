import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import moment from "moment";

const OrdersTable = ({ filteredOrders, handleStatusChange, handleDelete }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "ready to ship":
        return "bg-blue-100 text-blue-800";
      case "shipping":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen md:min-w-0">
        {/* Mobile View - Cards */}
        <div className="md:hidden space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-800">#{order.invoiceId}</h3>
                    <p className="text-sm text-gray-500">
                      {moment(order.createdAt).format("MMM D, YYYY")}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>

                <div className="mt-3">
                  <p className="font-medium text-gray-800">{order.customerName}</p>
                  <p className="text-sm text-gray-600">{order.phoneNumber}</p>
                  <p className="text-sm text-gray-600 truncate">{order.address}</p>
                </div>

                <div className="mt-2">
                  <p className="font-medium">{order.product.name}</p>
                  <p className="text-sm text-gray-600">
                    ৳{order.product.price} × {order.product.quantity}
                  </p>
                </div>

                <div className="mt-3 flex justify-between items-center">
                  <p className="font-bold text-gray-800">৳{order.totalAmount}</p>
                  <div className="flex space-x-2">
                    <NavLink to={`/order-details/${order._id}`}>
                      <button className="flex items-center border border-[#eb3b5a] px-2 py-1 rounded text-[#eb3b5a] text-sm">
                        <AiOutlineEdit className="mr-1" /> Details
                      </button>
                    </NavLink>
                    <button
                      className="flex items-center text-red-500 border border-red-500 px-2 py-1 rounded text-sm"
                      onClick={() => handleDelete(order._id)}
                    >
                      <AiOutlineDelete className="mr-1" /> Delete
                    </button>
                  </div>
                </div>

                <div className="mt-3">
                  <select
                    className={`w-full p-1 border rounded-md text-sm focus:ring-indigo-500 ${getStatusColor(order?.status)}`}
                    value={order?.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="processing">Processing</option>
                    <option value="ready to ship">Ready to ship</option>
                    <option value="shipping">Shipping</option>
                    <option value="delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">No orders found.</div>
          )}
        </div>

        {/* Desktop View - Table */}
        <table className="hidden md:table w-full border-collapse shadow-xl bg-white border-[1px] border-[#eee] rounded-md overflow-hidden">
          <thead>
            <tr className="bg-[#4634FF] text-white text-nowrap">
              <th className="py-3 px-4 text-left">Invoice ID</th>
              <th className="py-3 px-4 text-left">Customer</th>
              <th className="py-3 px-4 text-left">Phone</th>
              <th className="py-3 px-4 text-left">Product</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Change Status</th>
              <th className="py-3 px-4 text-left">Ordered At</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index} className="border-b even:bg-gray-50 text-nowrap">
                <td className="py-3 px-4 text-gray-800 font-semibold">{order.invoiceId}</td>
                <td className="py-3 px-4 text-gray-800">
                  <strong>{order.customerName}</strong>
                  <br />
                  <span className="text-gray-600">{order.address}</span>
                </td>
                <td className="py-3 px-4 text-gray-800">{order.phoneNumber}</td>
                <td className="py-3 px-4 text-gray-800 text-nowrap">
                  {order.product.name} <br />
                  <span className="text-gray-600">
                    ৳{order.product.price} x {order.product.quantity}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-800 font-bold">৳{order.totalAmount}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <select
                    className={`px-3 py-1 border rounded-md focus:ring-indigo-500 ${getStatusColor(order?.status)}`}
                    value={order?.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="processing">Processing</option>
                    <option value="ready to ship">Ready to ship</option>
                    <option value="shipping">Shipping</option>
                    <option value="delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-gray-800">
                  {moment(order.createdAt).format("MMMM Do YYYY, h:mm A")}
                  <br />
                  <span className="text-gray-600">{moment(order.createdAt).fromNow()}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <NavLink to={`/order-details/${order._id}`}>
                      <button className="flex items-center border border-[#eb3b5a] px-2 py-1 rounded text-[#eb3b5a] hover:text-green-500 text-sm">
                        <AiOutlineEdit className="mr-1" /> Details
                      </button>
                    </NavLink>
                    <button
                      className="flex items-center text-red-500 hover:text-red-600 border border-red-500 px-2 py-1 rounded text-sm"
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

        {filteredOrders.length === 0 && (
          <div className="text-center py-4 text-gray-500">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;