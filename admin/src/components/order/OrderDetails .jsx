import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTruck, FaCheckCircle } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../common/Header";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    phoneNumber: "",
    address: "",
    deliveryOption: "",
    deliveryCharge: 0,
    totalAmount: 0,
    notes: "",
    status: "Pending",
    product: {
      name: "",
      price: 0,
      quantity: 1,
      image: ""
    }
  });

  useEffect(() => {
    axios
      .get(`https://surebdbackend.arbeittechnology.com/admin/orders/${id}`)
      .then((res) => {
        setOrder(res.data);
        setFormData({
          customerName: res.data.customerName || "",
          phoneNumber: res.data.phoneNumber || "",
          address: res.data.address || "",
          deliveryOption: res.data.deliveryOption || "",
          deliveryCharge: res.data.deliveryCharge || 0,
          totalAmount: res.data.totalAmount || 0,
          notes: res.data.notes || "",
          status: res.data.status || "Pending",
          product: {
            name: res.data.product?.name || "",
            price: res.data.product?.price || 0,
            quantity: res.data.product?.quantity || 1,
            image: res.data.product?.image || "",
          }
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      product: {
        ...prev.product,
        [name]: name === "quantity" || name === "price" ? parseInt(value) : value,
      },
    }));
  };

  const handleUpdate = () => {
    const {
      customerName,
      phoneNumber,
      address,
      deliveryOption,
      deliveryCharge,
      status,
      product,
      notes,
    } = formData;

    if (
      !customerName ||
      !phoneNumber ||
      !address ||
      !deliveryOption ||
      !deliveryCharge ||
      !product.name ||
      !product.price ||
      !product.quantity ||
      !status
    ) {
      return toast.error("All fields must be filled correctly.");
    }

    const totalAmount = product.price * product.quantity + parseInt(deliveryCharge);

    axios
      .put(`https://surebdbackend.arbeittechnology.com/admin/update-order/${id}`, {
        customerName,
        phoneNumber,
        address,
        deliveryOption,
        deliveryCharge,
        totalAmount,
        notes,
        status,
        product,
      })
      .then(() => {
        toast.success("Order updated successfully!");
        setFormData((prev) => ({ ...prev, totalAmount }));
        setTimeout(() => {
            navigate("/orders")
        }, 500);
      })
      .catch(() => {
        toast.error("Failed to update order.");
      });
  };

  if (!order) {
    return <div className="text-center text-gray-600">Loading order details...</div>;
  }

  return (
    <section className="w-full font-baji">
      <Toaster />
      <div className="w-full flex items-center justify-center bg-gray-100 ">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2 sm:mb-0'>
            Order Details <span className="text-indigo-600">#{order.invoiceId}</span>
          </h2>

          {/* Customer Details */}
          <div className="border-b pb-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              placeholder="Customer Name"
              className="p-2 border rounded-md text-gray-900 outline-blue-500 bg-gray-50"
            />
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-2 border rounded-md text-gray-900 outline-blue-500 bg-gray-50"
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="p-2 border rounded-md text-gray-900 bg-gray-50 outline-blue-500 col-span-full"
            />
            <input
              name="deliveryOption"
              value={formData.deliveryOption}
              onChange={handleChange}
              placeholder="Delivery Option"
              className="p-2 border rounded-md text-gray-900 outline-blue-500 bg-gray-50"
            />
            <input
              name="deliveryCharge"
              type="number"
              value={formData.deliveryCharge}
              onChange={handleChange}
              placeholder="Delivery Charge"
              className="p-2 border rounded-md text-gray-900 outline-blue-500 bg-gray-50"
            />
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Notes"
              className="p-2 border rounded-md text-gray-900 outline-blue-500 bg-gray-50 col-span-full"
            />
          </div>

          {/* Product Details */}
          <div className="border-b pb-4 mb-4 flex items-start gap-4">
            <img
              src={`https://surebdbackend.arbeittechnology.com/images/${formData.product.image}`}
              alt={formData.product.name}
              className="w-24 h-24 object-cover rounded-md border"
            />
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.product.name}
                onChange={handleProductChange}
                placeholder="Product Name"
                className="p-2 border rounded-md text-gray-900 outline-blue-500 bg-gray-50"
              />
              <input
                type="number"
                name="price"
                value={formData.product.price}
                onChange={handleProductChange}
                placeholder="Price"
                className="p-2 border rounded-md text-gray-900 outline-blue-500 bg-gray-50"
              />
              <input
                type="number"
                name="quantity"
                value={formData.product.quantity}
                onChange={handleProductChange}
                placeholder="Quantity"
                className="p-2 border rounded-md text-gray-900 outline-blue-500 bg-gray-50"
              />
              <p className="text-gray-700 p-2">
                <strong>Total:</strong> {formData.product.price * formData.product.quantity} BDT
              </p>
            </div>
          </div>

          {/* Status Update */}
          <div className="mt-4">
            <label className="font-semibold text-gray-900 block mb-1">Status:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="p-2 border rounded-md text-gray-900 bg-gray-50"
            >
           <option value="processing">Processing</option>
                          <option value="ready to ship">Ready to ship</option>
                          <option value="shipping">Shipping</option>
                          <option value="delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Status Indicator */}
          <div className="mt-6 flex items-center space-x-4">
            {formData.status === "processing" && (
              <div className="flex items-center gap-2 text-yellow-500">
                <MdPendingActions className="text-2xl" /> Processing
              </div>
            )}
            {formData.status === "ready to ship" && (
              <div className="flex items-center gap-2 text-[#eb3b5a]">
                <FaTruck className="text-2xl" /> Ready to ship
              </div>
            )}
            {formData.status === "delivered" && (
              <div className="flex items-center gap-2 text-green-500">
                <FaCheckCircle className="text-2xl" /> Delivered
              </div>
            )}
          </div>

          {/* Update Button */}
          <div className="mt-6 text-right">
            <button
              onClick={handleUpdate}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              Update Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
