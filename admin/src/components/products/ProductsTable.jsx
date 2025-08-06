import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlinePlus } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const ProductsTable = () => {
  const [productList, setProductList] = useState([]);
  const [editProductData, setEditProductData] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  const all_category = () => {
    axios
      .get(`https://surebdbackend.arbeittechnology.com/admin/all-products`)
      .then((res) => {
        if (res.data.success) {
          setProductList(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    all_category();
  }, []);

  const deleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://surebdbackend.arbeittechnology.com/admin/delete-product/${id}`)
          .then((res) => {
            if (res.data.success) {
              Swal.fire("Deleted!", `${res.data.message}`, "success");
              all_category();
            }
          })
          .catch((err) => {
            Swal.fire("Error!", "Something went wrong.", "error");
            console.log(err.name);
          });
      }
    });
  };

  const editProduct = (product) => {
    setEditProductData(product);
    setImages([]);
    setImagePreviews(product.images);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setImages(fileArray);
      const filePreviews = fileArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(filePreviews);
    }
  };

  const handleUpdate = async () => {
    const { 
      _id, 
      productName, 
      brand, 
      category, 
      price, 
      stock, 
      description, 
      youtubeVideo, 
      images: currentImages,
      sizes,
      colors,
      oldPrice,
      discount,
      product_type,
      tax,
      flashSale,
      flashSalePrice,
      flashSaleStart,
      flashSaleEnd
    } = editProductData;

    // Validation
    if (!productName || !brand || !category || isNaN(price)) {
      Swal.fire("Validation Error", "Please fill in all required fields.", "error");
      return;
    }

    const formData = new FormData();
    
    // Append all fields to formData
    formData.append("productName", productName);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("price", price);
    if (stock) formData.append("stock", stock);
    if (description) formData.append("description", description);
    if (youtubeVideo) formData.append("youtubeVideo", youtubeVideo);
    if (sizes) formData.append("sizes", sizes.join(","));
    if (colors) formData.append("colors", colors.join(","));
    if (oldPrice) formData.append("oldPrice", oldPrice);
    if (discount) formData.append("discount", discount);
    if (product_type) formData.append("productType", product_type);
    if (tax) formData.append("tax", tax);
    if (flashSale) formData.append("flashSale", flashSale);
    if (flashSalePrice) formData.append("flashSalePrice", flashSalePrice);
    if (flashSaleStart) formData.append("flashSaleStart", flashSaleStart);
    if (flashSaleEnd) formData.append("flashSaleEnd", flashSaleEnd);

    // Append new images if any
    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.put(
        `https://surebdbackend.arbeittechnology.com/admin/update-product/${_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.data) {
        Swal.fire("Updated!", "Product has been updated successfully.", "success");
        setEditProductData(false)
        all_category();
        setEditProductData(null);
        setImages([]);
        setImagePreviews([]);
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message || "Failed to update product.", "error");
      console.error("Update error:", error);
    }
  };

  return (
<motion.div 
  className="mb-8 mx-4 sm:mx-6 lg:mx-8"
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ delay: 0.2 }}
>
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 font-baji">
    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-4 sm:mb-0">
      Product List
    </h2>
    <NavLink
      to="/products/add"
      className="flex items-center bg-green-500 hover:bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-md shadow-sm transition-colors text-sm sm:text-base w-full sm:w-auto justify-center"
    >
      <AiOutlinePlus className="mr-2" /> 
      Add Product
    </NavLink>
  </div>

  <div className="overflow-x-auto border border-gray-200 rounded-lg">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Category</th>
          <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Stock</th>
          <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Sales</th>
          <th className="px-4 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200 font-baji">
        {productList.map((product) => (
          <motion.tr 
            key={product._id} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.3 }}
            className="hover:bg-gray-50"
          >
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img 
                    src={`https://surebdbackend.arbeittechnology.com/images/${product.images[0]}`} 
                    alt="Product" 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-[200px]">
                    {product.productName.length > 15 
                      ? `${product.productName.substring(0, 15)}...` 
                      : product.productName}
                  </div>
                </div>
              </div>
            </td>

            <td className="px-4 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{product.category}</div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">৳{product.price.toFixed(2)}</div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{product.stock}</div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{product.sales}</div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex space-x-2">
                <button 
                  onClick={() => editProduct(product)} 
                  className="text-indigo-600 hover:text-indigo-900"
                  aria-label="Edit"
                >
                  <Edit size={20} />
                </button>
                <button 
                  onClick={() => deleteProduct(product._id)} 
                  className="text-red-600 hover:text-red-900"
                  aria-label="Delete"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Edit Product Modal */}
  {editProductData && (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Edit Product</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
                <input
                  type="text"
                  value={editProductData.productName || ''}
                  onChange={(e) => setEditProductData({ ...editProductData, productName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand*</label>
                <input
                  type="text"
                  value={editProductData.brand || ''}
                  onChange={(e) => setEditProductData({ ...editProductData, brand: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                <input
                  type="text"
                  value={editProductData.category || ''}
                  onChange={(e) => setEditProductData({ ...editProductData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Price*</label>
                <input
                  type="number"
                  value={editProductData.price || ''}
                  onChange={(e) => setEditProductData({ ...editProductData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={editProductData.stock || ''}
                  onChange={(e) => setEditProductData({ ...editProductData, stock: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Old Price</label>
                <input
                  type="number"
                  value={editProductData.oldPrice || ''}
                  onChange={(e) => setEditProductData({ ...editProductData, oldPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
                <input
                  type="number"
                  value={editProductData.discount || ''}
                  onChange={(e) => setEditProductData({ ...editProductData, discount: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
                <input
                  type="text"
                  value={editProductData.product_type || ''}
                  onChange={(e) => setEditProductData({ ...editProductData, product_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={editProductData.description || ''}
                onChange={(e) => setEditProductData({ ...editProductData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Video URL</label>
              <input
                type="text"
                value={editProductData.youtubeVideo || ''}
                onChange={(e) => setEditProductData({ ...editProductData, youtubeVideo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://www.youtube.com/watch?v=..."
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Images</label>
              <div className="flex gap-2 mb-4 flex-wrap">
                {editProductData.images?.map((img, index) => (
                  <img 
                    key={index} 
                    src={`https://surebdbackend.arbeittechnology.com/images/${img}`} 
                    alt="Product" 
                    className="w-24 h-24 object-cover rounded-md border border-gray-200"
                  />
                ))}
              </div>
              
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Images</label>
              <input 
                type="file" 
                multiple 
                onChange={handleImageChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" 
                accept="image/*"
              />
              
              {imagePreviews.length > 0 && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Image Previews</label>
                  <div className="flex gap-2 flex-wrap">
                    {imagePreviews.map((preview, index) => (
                      <img 
                        key={index} 
                        src={preview} 
                        alt={`preview-${index}`} 
                        className="w-24 h-24 object-cover rounded-md border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <button 
                onClick={() => setEditProductData(null)} 
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpdate} 
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</motion.div>
  );
};

export default ProductsTable;