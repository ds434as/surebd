import { useState } from "react";
import { FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import Header from "../common/Header";

export default function AddSlider() {
  const [images, setImages] = useState([]);
  const base_url = "https://surebdbackend.arbeittechnology.com"; // Correct base URL for images

  // Handle File Selection
  const handleFileChange = (event) => {
    const files = event.target.files;
    const newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && (file.type.includes("png") || file.type.includes("jpeg") || file.type.includes("jpg"))) {
        const reader = new FileReader();
        reader.onload = () => {
          newImages.push({ file, preview: reader.result });
          setImages([...newImages]);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("Invalid file type! Upload .png, .jpg, or .jpeg");
      }
    }
  };

  // Remove Image from Preview
  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  // Submit Images to Backend
  const handleSubmit = async () => {
    if (images.length === 0) {
      toast.error("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append("images", img.file));

    try {
      const response = await axios.post("https://surebdbackend.arbeittechnology.com/admin/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message || "Images uploaded successfully!");
      setImages([]); // Clear images after successful upload
    } catch (error) {
      toast.error("Error uploading images. Please try again.");
      console.error(error);
    }
  };

  return (
    <section className="w-full font-baji overflow-y-auto min-h-[100vh] bg-gray-100">
        <Toaster/>
      <div className="p-8 w-full flex flex-col items-center">
        <h2  className='text-xl sm:text-2xl md:text-3xl font-bold text-gray-700 mb-2 sm:mb-0'>Upload Slider Images</h2>

        {/* Upload Box */}
        <div className="bg-white border-[1px] border-gray-300 p-8 mt-6 w-full ">
          <div className="flex flex-wrap gap-6 justify-center">
            {/* Image Previews */}
            {images.map((img, index) => (
              <div key={index} className="relative w-[180px] h-[180px] border rounded-lg overflow-hidden shadow-md">
                <img src={img.preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-md hover:bg-red-700 transition"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            ))}

            {/* Upload Button */}
            <label className="relative w-[220px] h-[220px] border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition shadow-md">
              <FaCloudUploadAlt className="text-green-500 text-6xl mb-2" />
              <span className="text-gray-700 font-medium">Upload Images</span>
              <input type="file" accept="image/png, image/jpeg, image/jpg" multiple className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-8 hover:bg-indigo-700 transition text-[17px] md:text-lg font-semibold"
          >
            Upload Images
          </button>
        </div>
      </div>
    </section>
  );
}
