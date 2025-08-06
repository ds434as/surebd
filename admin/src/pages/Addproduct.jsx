import { useState, useEffect } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import Header from "../components/common/Header";
import Swal from 'sweetalert2';
const colorsList = ["#2D2D5D", "#F4B400", "#FFFFFF", "#FF6D00", "#34A853", "#EA4335", "#A7E1E7", "#5D6D7E"];

const Addproduct = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    weight: "",
    category: "",
    sizes: [],
    sizeInput: "",
    colors: [],
    description: "",
    tagNumber: "",
    stock: "",
    price: "",
    oldPrice: "",
    discount: "",
    tax: "",
    productType: "",
    images: [],
    flashSale: false,
    flashSalePrice: "",
    flashSaleStart: "",
    flashSaleEnd: "",
    youtubeUrl: "", // ✅ New Field
  });

  // Fetch all categories
  const all_category = () => {
    axios
      .get(`https://surebdbackend.arbeittechnology.com/admin/category`)
      .then((res) => {
        if (res.data.success) {
          setCategories(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  };

  // Fetch all brands
  const all_brand = () => {
    axios
      .get(`https://surebdbackend.arbeittechnology.com/admin/brands`)
      .then((res) => {
        if (res.data.success) {
          setBrands(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching brands:", err);
      });
  };

  useEffect(() => {
    all_category();
    all_brand();
  }, []);

  const handleColorSelect = (color) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter((c) => c !== color)
        : [...prev.colors, color],
    }));
  };

  const handleSizeAdd = (e) => {
    e.preventDefault();
    if (formData.sizeInput && !formData.sizes.includes(formData.sizeInput)) {
      setFormData((prev) => ({
        ...prev,
        sizes: [...prev.sizes, formData.sizeInput],
        sizeInput: "",
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  const handleSizeRemove = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size),
    }));
  };

  const handleImageDelete = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getYouTubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2] ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.brand || !formData.price || !formData.productType) {
      alert("Please fill all required fields.");
      return;
    }

    const productData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((image) => productData.append("images", image));
      } else {
        productData.append(key, formData[key]);
      }
    });

    axios
    .post(`https://surebdbackend.arbeittechnology.com/admin/add-product`, productData)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Product Created Successfully!',
        showConfirmButton: false,
        timer: 2000
      });
    })
    .catch((err) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong!',
        text: err.response?.data?.message || 'Failed to create product.',
      });
    });
  };

  return (
    <div className="flex-1 overflow-auto relative font-baji z-10">
      <main className="">
        <form className=" rounded-lg shadow-lg space-y-6" onSubmit={handleSubmit}>
          <h1 className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2 sm:mb-0'>Add New Product</h1>

          {/* Image Upload */}
          <div className="border-[2px] p-6 flex flex-col items-center border-[#eee]">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Upload Product Images</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg shadow-lg"
                  />
                  <AiOutlineClose
                    className="absolute top-0 right-0 text-white cursor-pointer bg-gray-600 p-1 rounded-full"
                    onClick={() => handleImageDelete(index)}
                  />
                </div>
              ))}
            </div>
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex items-center justify-center text-white px-6 py-[9px] rounded-full bg-green-500 transition"
            >
              <FaCloudUploadAlt className="mr-2 text-[25px]" />
              Upload Images
            </label>
            <input
              type="file"
              id="image-upload"
              name="images"
              accept="image/*"
              onChange={handleImageChange}
              multiple
              className="hidden"
            />
          </div>

          {/* Category & Brand */}
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-700">Select Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="border p-4 w-full rounded text-gray-700 outline-[#eb3b5a]">
              <option value="">Choose a Category</option>
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat._id} value={cat.title}>
                    {cat.title}
                  </option>
                ))
              ) : (
                <option disabled>Loading Categories...</option>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-700">Select Brand</label>
            <select name="brand" value={formData.brand} onChange={handleChange} className="border p-4 w-full rounded text-gray-700 outline-[#eb3b5a]">
              <option value="">Choose a Brand</option>
              {brands.length > 0 ? (
                brands.map((brand) => (
                  <option key={brand._id} value={brand.title}>
                    {brand.title}
                  </option>
                ))
              ) : (
                <option disabled>Loading Brands...</option>
              )}
            </select>
          </div>

          {/* Product Info */}
          <div className="grid grid-cols-2 gap-6">
            <input type="text" name="productName" placeholder="Product Name" className="border p-4 outline-[#eb3b5a] text-gray-700 rounded-lg" onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" className="border p-4 rounded-lg text-gray-700 outline-[#eb3b5a]" onChange={handleChange} />
            <input type="number" name="oldPrice" placeholder="Old Price" className="border p-4 rounded-lg text-gray-700 outline-[#eb3b5a]" onChange={handleChange} />
            <input type="number" name="discount" placeholder="Discount" className="border p-4 rounded-lg text-gray-700 outline-[#eb3b5a]" onChange={handleChange} />
            <input type="number" name="tax" placeholder="Tax" className="border p-4 rounded-lg text-gray-700 outline-[#eb3b5a]" onChange={handleChange} />
          </div>

          {/* Product Type */}
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-700 ">Product Type</label>
            <select name="productType" className="border p-4 w-full rounded-lg text-gray-700 outline-[#eb3b5a]" onChange={handleChange} value={formData.productType}>
              <option value="">Select Product Type</option>
              <option value="New Arrival">New Arrival</option>
              <option value="Best Seller">Best Seller</option>
            </select>
          </div>

          {/* Flash Sale */}
          <div className="mb-4">
            <label className="flex items-center text-gray-700 font-semibold">
              <input type="checkbox" name="flashSale" checked={formData.flashSale} onChange={handleChange} className="mr-2" />
              Flash Sale
            </label>
          </div>

          {formData.flashSale && (
            <div className="grid grid-cols-1 gap-2">
              <label className="block font-semibold text-gray-700">Flash Sale Price</label>
              <input type="number" name="flashSalePrice" placeholder="Flash Sale Price" className="border p-4 rounded-lg text-gray-700 outline-[#eb3b5a]" onChange={handleChange} />
              <label className="block font-semibold text-gray-700">Flash Sale Start Date</label>
              <input type="date" name="flashSaleStart" className="border p-4 rounded-lg text-gray-700 outline-[#eb3b5a]" onChange={handleChange} />
              <label className="block font-semibold text-gray-700">Flash Sale End Date</label>
              <input type="date" name="flashSaleEnd" className="border p-4 rounded-lg text-gray-700 outline-[#eb3b5a]" onChange={handleChange} />
            </div>
          )}

          {/* Description */}
          <div className="mb-2">
            <label className="block font-semibold mb-2 text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Product Description" className="outline-[#eb3b5a] border p-4 w-full text-gray-700 rounded-lg" rows="4" />
          </div>

          {/* Size Input */}
          <div className="mb-2">
            <label className="block font-semibold text-gray-700">Tags</label>
            <div className="flex items-center mt-[5px]">
              <input type="text" name="sizeInput" value={formData.sizeInput} onChange={handleChange} placeholder="Add Size" className="border p-4 w-full rounded-lg text-gray-700 outline-[#eb3b5a]" />
              <button type="button" onClick={handleSizeAdd} className="ml-2 bg-[#eb3b5a] text-white p-4 rounded-lg">Add</button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.sizes.map((size, index) => (
                <div key={index} className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-gray-700">
                  <span>{size}</span>
                  <AiOutlineClose className="ml-2 text-red-500 cursor-pointer" onClick={() => handleSizeRemove(size)} />
                </div>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-gray-700">Colors</label>
            <div className="flex gap-4 flex-wrap">
              {colorsList.map((color, index) => (
                <div key={index} className={`w-8 h-8 rounded-full cursor-pointer border-2 ${formData.colors.includes(color) ? "border-[#eb3b5a]" : "border-[#eee]"}`} style={{ backgroundColor: color }} onClick={() => handleColorSelect(color)} />
              ))}
            </div>
          </div>

          {/* ✅ YouTube Video URL */}
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-700">YouTube Video URL (optional)</label>
            <input
              type="url"
              name="youtubeUrl"
              value={formData.youtubeUrl}
              onChange={handleChange}
              placeholder="https://www.youtube.com/watch?v=example"
              className="border p-4 rounded-lg text-gray-700 w-full outline-[#eb3b5a]"
            />
            {getYouTubeEmbedUrl(formData.youtubeUrl) && (
              <iframe
                src={getYouTubeEmbedUrl(formData.youtubeUrl)}
                className="mt-4 rounded-lg w-full h-[300px]"
                title="YouTube Video Preview"
                frameBorder="0"
                allowFullScreen
              />
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="bg-green-600 w-full text-white py-3 px-6 rounded-lg hover:bg-green-500 transition duration-300">Create Product</button>
        </form>
      </main>
    </div>
  );
};

export default Addproduct;
