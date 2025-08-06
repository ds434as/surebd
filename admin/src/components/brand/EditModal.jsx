import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const EditModal = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    numberOfProducts: "",
    image: null, // Changed from string to null (for image file)
  });
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (category) {
      setFormData({
        title: category.title,
        numberOfProducts: category.numberOfProducts,
        image: null, // Reset image on modal open
      });
      setPreviewImage(`https://surebdbackend.arbeittechnology.com/images/${category.image}`);
    }
  }, [category]);

  // Handle input change for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file, // Store the file itself in formData
      });

      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Set preview image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    updatedFormData.append("title", formData.title);
    updatedFormData.append("numberOfProducts", formData.numberOfProducts);
    if (formData.image) {
      updatedFormData.append("image", formData.image); // Append the image if exists
    }

    axios
      .put(`https://surebdbackend.arbeittechnology.com/admin/update-brand/${category._id}`, updatedFormData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data", // Ensure the request uses multipart/form-data
        },
      })
      .then((res) => {
        if (res.data.success) {
          Swal.fire("Success", "Brand updated successfully", "success");
          onSave(); // Refresh brands in parent
          onClose(); // Close the modal
        } else {
          Swal.fire("Error", res.data.message, "error");
        }
      })
      .catch((err) => {
        Swal.fire("Error", "Something went wrong!", "error");
        console.error(err);
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 text-gray-700 rounded-md shadow-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Brand</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Brand Name</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Products Count</label>
            <input
              type="number"
              name="numberOfProducts"
              value={formData.numberOfProducts}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Image Upload Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Brand Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
            {previewImage && (
              <div className="mt-2">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-md">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
