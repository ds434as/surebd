import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import Header from "../common/Header";
import Swal from "sweetalert2";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("General");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch blogs from the backend
  const fetchBlogs = () => {
    axios.get("https://surebdbackend.arbeittechnology.com/admin/blogs")
      .then((res) => {
        if (res.data.success) {
          setBlogs(res.data.blogs);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle file change for image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle form submission for adding/editing blogs
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !excerpt || !content) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("category", category);
    if (image) formData.append("image", image);

    try {
      if (editMode) {
        // Use PUT for updates
        await axios.put(
          `https://surebdbackend.arbeittechnology.com/admin/update-blog/${editData._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Blog updated successfully");
      } else {
        // Use POST for new blogs
        await axios.post(
          "https://surebdbackend.arbeittechnology.com/admin/add-blog",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Blog added successfully");
      }
      fetchBlogs();
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving blog");
      console.error("Error:", err);
    }
  };

  // Reset form fields after submission
  const resetForm = () => {
    setShowModal(false);
    setTitle("");
    setExcerpt("");
    setCategory("General");
    setContent("");
    setImage(null);
    setImagePreview(null);
    setEditMode(false);
    setEditData(null);
  };

  // Handle edit button click
  const handleEdit = (blog) => {
    setEditData(blog);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setCategory(blog.category);
    setContent(blog.content);
    setImagePreview(blog.image ? `https://surebdbackend.arbeittechnology.com/images/${blog.image}` : null);
    setShowModal(true);
    setEditMode(true);
  };

  // Handle delete button click
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this action!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://surebdbackend.arbeittechnology.com/admin/delete-blog/${id}`)
          .then(() => {
            fetchBlogs();
            toast.success("Blog deleted successfully");
          })
          .catch((err) => toast.error("Error deleting blog"));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        toast.info("Blog deletion canceled");
      }
    });
  };

  // Function to truncate text
  const truncateText = (text, length) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Toaster />
    <section>
  <div className="min-h-screen font-baji">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-700'>All Blogs</h1>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center bg-green-500 hover:bg-blue-700 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-[5px] shadow-md transition w-full sm:w-auto justify-center"
      >
        Add Blog
      </button>
    </div>

    {/* Mobile View - Cards */}
    <div className="md:hidden space-y-4">
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{truncateText(blog.title, 30)}</h3>
                <p className="text-sm text-gray-600">{blog.category}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="text-[#eb3b5a] hover:text-blue-700 p-2 rounded-[5px] border border-green-500 hover:bg-blue-50 transition"
                >
                  <AiOutlineEdit className="text-lg" />
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-[5px] border border-red-600 hover:bg-red-50 transition"
                >
                  <AiOutlineDelete className="text-lg" />
                </button>
              </div>
            </div>

            <p className="mt-2 text-gray-700">{truncateText(blog.excerpt, 50)}</p>

            {blog.image && (
              <div className="mt-3">
                <img
                  src={`https://surebdbackend.arbeittechnology.com/images/${blog.image}`}
                  alt="Blog"
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">No blogs found</div>
      )}
    </div>

    {/* Desktop View - Table */}
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full border-collapse text-gray-800 shadow-xl bg-white border-[1px] border-[#eee] rounded-md overflow-hidden">
        <thead>
          <tr className="bg-[#4634FF] text-white">
            <th className="py-3 px-4 sm:px-6 border-b">Title</th>
            <th className="py-3 px-4 sm:px-6 border-b">Category</th>
            <th className="py-3 px-4 sm:px-6 border-b">Excerpt</th>
            <th className="py-3 px-4 sm:px-6 border-b">Image</th>
            <th className="py-3 px-4 sm:px-6 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="hover:bg-gray-50">
              <td className="py-3 px-4 sm:px-6 border-b">{truncateText(blog.title, 20)}</td>
              <td className="py-3 px-4 sm:px-6 border-b">{blog.category}</td>
              <td className="py-3 px-4 sm:px-6 border-b">{truncateText(blog.excerpt, 20)}</td>
              <td className="py-3 px-4 sm:px-6 border-b">
                {blog.image && (
                  <img
                    src={`https://surebdbackend.arbeittechnology.com/images/${blog.image}`}
                    alt="Blog"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                  />
                )}
              </td>
              <td className="py-3 px-4 sm:px-6 border-b">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-[#eb3b5a] hover:text-blue-700 px-3 py-1 sm:px-4 sm:py-2 rounded-[5px] border border-green-500 hover:bg-blue-50 transition"
                  >
                    <AiOutlineEdit className="text-lg sm:text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-500 hover:text-red-700 px-3 py-1 sm:px-4 sm:py-2 rounded-[5px] border border-red-600 hover:bg-red-50 transition"
                  >
                    <AiOutlineDelete className="text-lg sm:text-xl" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {blogs.length === 0 && (
        <div className="text-center py-8 text-gray-500">No blogs found</div>
      )}
    </div>

    {/* Modal for Add/Edit Blog */}
    {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
            {editMode ? "Edit Blog" : "Add New Blog"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
              <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 text-gray-800 focus:ring-[#eb3b5a] focus:border-[#eb3b5a]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt*</label>
              <input
                type="text"
                placeholder="Short description"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 text-gray-800 focus:ring-[#eb3b5a] focus:border-[#eb3b5a]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content*</label>
              <textarea
                placeholder="Blog content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 sm:p-3 border rounded-md h-32 focus:ring-2 text-gray-800 focus:ring-[#eb3b5a] focus:border-[#eb3b5a]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 sm:p-3 border rounded-md focus:ring-2 text-gray-800 focus:ring-[#eb3b5a] focus:border-[#eb3b5a]"
              >
                <option value="General">General</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {editMode ? "Update Image" : "Upload Image"}
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="w-full text-sm p-1 sm:p-2 border rounded-md file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 text-gray-800 file:px-2 sm:file:px-4 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            {(imagePreview || (editMode && editData.image)) && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preview</label>
                <img
                  src={imagePreview || `https://surebdbackend.arbeittechnology.com/images/${editData.image}`}
                  alt="Preview"
                  className="w-full h-32 sm:h-40 object-contain rounded-md border"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-[5px] hover:bg-gray-300 transition order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-[5px] hover:bg-blue-700 transition order-1 sm:order-2"
            >
              {editMode ? "Update Blog" : "Add Blog"}
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
</section>
    </div>
  );
};

export default BlogList;