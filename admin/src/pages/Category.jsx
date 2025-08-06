// Category.jsx
import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import Header from "../components/common/Header";
import Categorytable from "../components/products/Categorytable";
import toast,{Toaster} from "react-hot-toast"
const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [productNumber, setProductNumber] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchCategories = () => {
    axios.get("https://surebdbackend.arbeittechnology.com/admin/category").then((res) => {
      if (res.data.success) {
        setCategories(res.data.data);
      }
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName || !productNumber) return alert("All fields required");

    const formData = new FormData();
    formData.append("title", categoryName);
    formData.append("numberOfProducts", productNumber);
    if (image) formData.append("file", image);

    const url = editMode
      ? `https://surebdbackend.arbeittechnology.com/admin/update-category/${editData._id}`
      : "https://surebdbackend.arbeittechnology.com/admin/category";

    axios
      .post(url, formData)
      .then((res) => {
        fetchCategories();
        resetForm(res.data.message);
        toast.success()
      })
      .catch((err) => console.log(err));
  };

  const resetForm = () => {
    setShowModal(false);
    setCategoryName("");
    setProductNumber("");
    setImage(null);
    setImagePreview(null);
    setEditMode(false);
    setEditData(null);
  };

  const handleEdit = (category) => {
    setEditData(category);
    setCategoryName(category.title);
    setProductNumber(category.numberOfProducts);
    setImagePreview(`https://surebdbackend.arbeittechnology.com/images/${category.image}`);
    setShowModal(true);
    setEditMode(true);
  };

  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <Toaster/>
<section>
  <div className='  min-h-screen font-baji'>
    <div className='flex  justify-between items-start sm:items-center mb-4 sm:mb-6'>
      <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2 sm:mb-0'>Categories</h1>
      <button
        onClick={() => setShowModal(true)}
        className='flex items-center bg-green-500 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3 rounded-[5px] shadow-md transition text-sm sm:text-base'
      >
        <AiOutlinePlus className='mr-1 sm:mr-2' /> Add Category
      </button>
    </div>

    <div className="overflow-x-auto">
      <Categorytable data={categories} onEdit={handleEdit} onDelete={fetchCategories} />
    </div>

    {showModal && (
      <form
        onSubmit={handleSubmit}
        className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4'
      >
        <div className='bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md md:w-2/3 lg:w-1/3'>
          <h2 className='text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4'>
            {editMode ? "Edit Category" : "Add New Category"}
          </h2>
          <input
            type='text'
            placeholder='Category Name'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className='w-full p-2 sm:p-3 border rounded-md mb-2 sm:mb-3 text-black text-sm sm:text-base'
          />
          <input
            type='number'
            placeholder='Number of Products'
            value={productNumber}
            onChange={(e) => setProductNumber(e.target.value)}
            className='w-full p-2 sm:p-3 border rounded-md mb-2 sm:mb-3 text-black text-sm sm:text-base'
          />
          <input
            type='file'
            onChange={handleFileChange}
            className='w-full text-black p-2 sm:p-3 border rounded-md mb-2 sm:mb-3 text-sm sm:text-base'
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt='Preview'
              className='w-full h-32 sm:h-40 object-cover mb-2 sm:mb-3 rounded-md'
            />
          )}
          <div className='flex justify-end space-x-2 sm:space-x-3'>
            <button
              type='button'
              onClick={resetForm}
              className='px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 text-gray-800 rounded-[5px] hover:bg-gray-300 transition text-sm sm:text-base'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white rounded-[5px] hover:bg-blue-700 transition text-sm sm:text-base'
            >
              {editMode ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>
    )}
  </div>
</section>
    </div>
  );
};

export default Category;
