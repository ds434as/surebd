import React, { useState } from 'react';
import axios from 'axios';
import toast,{ Toaster } from 'react-hot-toast';
import Header from '../common/Header';

const Addblog = () => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'General',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Handle file input
    setImagePreview(URL.createObjectURL(file)); // Preview the image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('excerpt', formData.excerpt);
    formDataToSend.append('content', formData.content);
    formDataToSend.append('category', formData.category);
    if (image) formDataToSend.append('image', image); // Append image to formData if selected

    try {
      const response = await axios.post('https://surebdbackend.arbeittechnology.com/admin/add-blog', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Blog added successfully!');
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        category: 'General',
      });
      setImage(null); // Reset image field
      setImagePreview(null); // Reset image preview
    } catch (error) {
      toast.error('Error adding blog!');
    }
  };

  return (
    <section className='overflow-y-auto w-full font-baji'>
        <Toaster/>
        <div className="w-full mx-auto  bg-white rounded-lg shadow-lg text-gray-800 ">
      <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2 sm:mb-0'>Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 p-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            id="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 p-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            name="content"
            id="content"
            value={formData.content}
            onChange={handleChange}
            rows="6"
            className="mt-1 p-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Image Upload with Preview */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImageChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4 flex justify-center">
              <img src={imagePreview} alt="Preview" className="w-48 h-48 object-cover rounded-md shadow-lg" />
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-4 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="General">General</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Business">Business</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white py-3 px-8 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Blog
          </button>
        </div>
      </form>
    </div>
    </section>
  );
};

export default Addblog;
